import type { ResolverTs } from "@kubb/plugin-ts";
import { File, Function as JSXFunction, type KubbReactNode } from "kubb/jsx";
import { ast } from "kubb/kit";

type SchemaName = { name: string };

export type TypeSchemas = {
	response: SchemaName;
	request: SchemaName | undefined;
	errors: Array<SchemaName>;
	path: SchemaName | undefined;
	query: SchemaName | undefined;
	headers: SchemaName | undefined;
};

export function resolveTypeSchemas(
	node: ast.HttpOperationNode,
	tsResolver: ResolverTs,
): TypeSchemas {
	const dataSchema = node.requestBody?.content?.[0]?.schema;

	const errorResponses = node.responses.filter((res) => {
		if (res.statusCode === "default") return false;
		const code = Number(res.statusCode);
		return Number.isFinite(code) && code >= 400;
	});

	const firstParam = (where: ast.ParameterLocation) =>
		node.parameters.find((param) => param.in === where);
	const path = firstParam("path");
	const query = firstParam("query");
	const header = firstParam("header");

	return {
		response: { name: tsResolver.response.response(node) },
		request: dataSchema ? { name: tsResolver.response.body(node) } : undefined,
		errors: errorResponses.map((res) => ({
			name: tsResolver.response.status(node, res.statusCode),
		})),
		path: path ? { name: tsResolver.param.path(node, path) } : undefined,
		query: query ? { name: tsResolver.param.query(node, query) } : undefined,
		headers: header ? { name: tsResolver.param.headers(node, header) } : undefined,
	};
}

const MULTI_SEGMENT_PARAM = /^(path|file_?path)$/i;
const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

function pathParam(name: string, optionalChain = false): string {
	if (IDENTIFIER.test(name)) return `pathParams${optionalChain ? "?." : "."}${name}`;
	return `pathParams${optionalChain ? "?." : ""}[${JSON.stringify(name)}]`;
}

export function buildUrlTemplate(path: string): string {
	return path.replace(/\{([^}]+)\}/g, (_, raw: string) =>
		MULTI_SEGMENT_PARAM.test(raw)
			? // Keeps slashes and existing %XX escapes so file paths and encodeURI'd values pass through unchanged.
				`\${String(${pathParam(raw)}).replace(/[^/%]+|%(?![0-9A-Fa-f]{2})/g, encodeURIComponent)}`
			: `\${encodeURIComponent(String(${pathParam(raw)}))}`,
	);
}

function getJSDocComments(node: ast.HttpOperationNode): string[] {
	const comments: string[] = [];
	if (node.summary) comments.push(`@summary ${node.summary}`);
	if (node.description) comments.push(`@description ${node.description}`);
	if (node.deprecated) comments.push("@deprecated");
	comments.push(`@link ${node.path}`);
	return comments;
}

type Param = { name: string; optional: boolean };

const DELIMITERS: Partial<Record<ast.ParameterStyle, string>> = {
	form: ",",
	spaceDelimited: " ",
	pipeDelimited: "|",
};

type DelimitedParam = { name: string; delimiter: string };

// OpenAPI explodes a form array into repeated keys by default; with `explode: false`, or a delimited style, it is one joined value.
function delimitedQueryParams(node: ast.HttpOperationNode): DelimitedParam[] {
	return node.parameters.flatMap((param) => {
		if (param.in !== "query") return [];
		const style = param.style ?? "form";
		const explode = param.explode ?? style === "form";
		const delimiter = DELIMITERS[style];
		if (explode || !delimiter) return [];
		const isArray = ast.findSchema(param.schema, {
			predicate: (schema) => schema.type === "array",
			followRefs: true,
		});
		return isArray ? [{ name: param.name, delimiter }] : [];
	});
}

function queryParam(name: string): string {
	return IDENTIFIER.test(name) ? `queryParams.${name}` : `queryParams[${JSON.stringify(name)}]`;
}

function paramsAt(node: ast.HttpOperationNode, where: ast.ParameterLocation): Param[] {
	return node.parameters
		.filter((param) => param.in === where)
		.map((param) => ({ name: param.name, optional: !param.required }));
}

const RAW_BODY_TYPE = "Blob | ArrayBuffer | Uint8Array | ReadableStream | string";
const IS_RAW_BODY =
	'(typeof body === "string" || body instanceof Blob || body instanceof ArrayBuffer || ArrayBuffer.isView(body) || body instanceof ReadableStream)';

const URL_ENCODED = "application/x-www-form-urlencoded";
const MULTIPART = "multipart/form-data";
const JSON_MEDIA_TYPE = /^application\/(?:[^;]*\+)?json\b/i;

function requestContentType(content: ast.ContentNode | undefined): string {
	const declared = content?.contentType ?? "application/json";
	if (declared !== URL_ENCODED || !content?.schema) return declared;
	const binary = ast.findSchema(content.schema, {
		predicate: (schema) => schema.type === "blob",
		followRefs: true,
	});
	// A url-encoded body cannot carry a file, so a body with a binary field is sent as multipart.
	return binary ? MULTIPART : declared;
}

type Props = {
	name: string;
	node: ast.HttpOperationNode;
	typeSchemas: TypeSchemas;
};

export function ClientOperation({ name, node, typeSchemas }: Props): KubbReactNode {
	const pathParams = paramsAt(node, "path");
	const queryParams = paramsAt(node, "query");
	const delimitedParams = delimitedQueryParams(node);
	const headerParams = paramsAt(node, "header");

	const requestBodyContent = node.requestBody?.content?.[0];
	const contentType = requestContentType(requestBodyContent);
	const isFormData = contentType === MULTIPART;
	const isUrlEncoded = contentType === URL_ENCODED;
	// The fetchers stringify only application/json, so application/scim+json and the like are serialized here.
	const isOtherJson = contentType !== "application/json" && JSON_MEDIA_TYPE.test(contentType);
	const hasBody = Boolean(typeSchemas.request);
	const isRawBody =
		hasBody && !isFormData && !isUrlEncoded && !isOtherJson && contentType !== "application/json";

	// plugin-ts types each parameter from its schema, refs and unions included.
	const pathParamsType = typeSchemas.path?.name ?? "Record<string, never>";
	const requiresQueryParams = queryParams.some((param) => !param.optional);
	const queryParamsType = requiresQueryParams
		? (typeSchemas.query?.name ?? "Record<string, never>")
		: `Partial<${typeSchemas.query?.name ?? "Record<string, never>"}>`;
	const requiresHeaderParams = headerParams.some((param) => !param.optional);
	const headersName = typeSchemas.headers?.name ?? "Record<string, never>";
	// The fetcher gets the headers merged with config ones, whose type no longer proves the required keys.
	const fetcherHeadersType = `Partial<${headersName}>`;
	const headerParamsType = requiresHeaderParams ? headersName : fetcherHeadersType;
	// A JSON suffix body may also be given already encoded, such as manifest bytes that must hash to their digest.
	const bodyType = isRawBody
		? RAW_BODY_TYPE
		: isOtherJson && typeSchemas.request
			? `${typeSchemas.request.name} | ${RAW_BODY_TYPE}`
			: typeSchemas.request?.name;

	const fields: string[] = [];
	if (pathParams.length > 0) {
		fields.push(`pathParams: ${pathParamsType}`);
	}
	if (hasBody && bodyType) {
		const required = node.requestBody?.required;
		fields.push(`body${required ? "" : "?"}: ${bodyType}`);
	}
	if (queryParams.length > 0) {
		fields.push(`queryParams${requiresQueryParams ? "" : "?"}: ${queryParamsType}`);
	}
	if (headerParams.length > 0) {
		fields.push(`headers${requiresHeaderParams ? "" : "?"}: ${headerParamsType}`);
	}
	fields.push("config?: Partial<FetcherConfig> & { client?: typeof defaultClient }");

	const paramsSignature = `{ ${fields
		.map((f) => f.split(":")[0]!.replace(/\?$/, "").trim())
		.join(", ")} }: { ${fields.join("; ")} } = {} as any`;

	const errorType =
		typeSchemas.errors.length > 0
			? `ErrorWrapper<${typeSchemas.errors.map((e) => e.name).join(" | ")}>`
			: "ErrorWrapper<Error>";

	const generics = [
		typeSchemas.response.name,
		errorType,
		bodyType
			? isFormData
				? "FormData"
				: isUrlEncoded
					? "URLSearchParams"
					: isOtherJson
						? RAW_BODY_TYPE
						: bodyType
			: "null",
		headerParams.length > 0 ? fetcherHeadersType : "Record<string, string>",
		delimitedParams.length > 0
			? "Record<string, unknown>"
			: queryParams.length > 0
				? queryParamsType
				: "Record<string, string>",
		pathParams.length > 0 ? pathParamsType : "Record<string, string>",
	];

	const requiresPathParamChecks = pathParams
		.filter((p) => !p.optional)
		.map(
			(p) =>
				`if (${pathParam(p.name, true)} == null || String(${pathParam(p.name)}) === '') {
\t\tthrow new Error(\`Missing required path parameter: ${p.name}\`);
\t}`,
		)
		.join("\n\n");

	const headerEntries: string[] = [];
	if (contentType !== "application/json") {
		headerEntries.push(`'Content-Type': '${contentType}'`);
	}
	headerEntries.push("...requestConfig.headers");
	// The call's own header params win over config-wide headers, such as an Effect layer's; an undefined one keeps the default.
	if (headerParams.length > 0) {
		headerEntries.push(
			"...Object.fromEntries(Object.entries(headers ?? {}).filter(([, value]) => value !== undefined))",
		);
	}

	// OpenAPI multipart encoding: an array is one part per item, an object is a JSON part.
	const formDataBlock =
		isFormData && bodyType
			? `\tconst formData = new FormData();
\tif (body) {
\t\tfor (const [key, value] of Object.entries(body as Record<string, unknown>)) {
\t\t\tfor (const item of Array.isArray(value) ? value : [value]) {
\t\t\t\tif (typeof item === "string" || item instanceof Blob) {
\t\t\t\t\tformData.append(key, item);
\t\t\t\t} else if (typeof item === "number" || typeof item === "boolean" || typeof item === "bigint") {
\t\t\t\t\tformData.append(key, String(item));
\t\t\t\t} else if (item != null) {
\t\t\t\t\tformData.append(key, JSON.stringify(item));
\t\t\t\t}
\t\t\t}
\t\t}
\t}\n`
			: "";

	// As in multipart bodies: an array repeats its key, an object is sent as JSON.
	const urlEncodedBlock =
		isUrlEncoded && bodyType
			? `\tconst form = new URLSearchParams();
\tif (body) {
\t\tfor (const [key, value] of Object.entries(body as Record<string, unknown>)) {
\t\t\tfor (const item of Array.isArray(value) ? value : [value]) {
\t\t\t\tif (item == null) continue;
\t\t\t\tif (item instanceof Blob) throw new Error(\`Cannot send the file in field \${key} as application/x-www-form-urlencoded\`);
\t\t\t\tform.append(key, typeof item === "object" ? JSON.stringify(item) : String(item));
\t\t\t}
\t\t}
\t}\n`
			: "";

	const delimitedQueryBlock =
		delimitedParams.length > 0
			? `\tconst query = queryParams && {
\t\t...queryParams,
${delimitedParams
	.map(
		({ name, delimiter }) =>
			`\t\t${JSON.stringify(name)}: Array.isArray(${queryParam(name)}) ? ${queryParam(name)}.join(${JSON.stringify(delimiter)}) : ${queryParam(name)},`,
	)
	.join("\n")}
\t};\n`
			: "";

	const bodyExpression = hasBody
		? isFormData
			? "formData"
			: isUrlEncoded
				? "form"
				: isOtherJson
					? `body === undefined || ${IS_RAW_BODY} ? body : JSON.stringify(body)`
					: "body"
		: undefined;

	const urlTemplate = buildUrlTemplate(node.path);

	const clientCallParts: string[] = [
		`method: ${JSON.stringify(node.method.toUpperCase())}`,
		`url: \`${urlTemplate}\``,
	];
	if (delimitedParams.length > 0) clientCallParts.push("queryParams: query");
	else if (queryParams.length > 0) clientCallParts.push("queryParams");
	if (bodyExpression !== undefined) clientCallParts.push(`body: ${bodyExpression}`);
	clientCallParts.push("...requestConfig");
	// An operation served from its own host (`inlinePathServers`) ignores the client's base URL.
	const serverUrl: unknown = node.extensions?.["x-server-url"];
	if (typeof serverUrl === "string") {
		clientCallParts.push(`baseUrl: \`${buildUrlTemplate(serverUrl)}\``);
	}
	clientCallParts.push(`headers: { ${headerEntries.join(", ")} }`);

	const callArgs = `{\n\t\t${clientCallParts.join(",\n\t\t")},\n\t}`;

	const body = `\tconst { client: request = defaultClient, ...requestConfig } = config ?? {};

${requiresPathParamChecks ? `\t${requiresPathParamChecks}\n` : ""}${delimitedQueryBlock}${formDataBlock}${urlEncodedBlock}\tconst data = await request<${generics.join(", ")}>(${callArgs});

\treturn data;`;

	return (
		<File.Source name={name} isExportable isIndexable>
			<JSXFunction
				name={name}
				async
				export
				params={paramsSignature}
				JSDoc={{ comments: getJSDocComments(node) }}
			>
				{body}
			</JSXFunction>
		</File.Source>
	);
}
