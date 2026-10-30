import c from "case";
import type { OpenAPIObject, OperationObject, PathItemObject } from "openapi3-ts/oas30";

const HTTP_METHODS = ["get", "put", "post", "patch", "delete"] as const;
const FETCH_TIMEOUT_MS = 30_000;

const JS_RESERVED_WORDS = new Set([
	"break",
	"case",
	"catch",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"else",
	"finally",
	"for",
	"function",
	"if",
	"in",
	"instanceof",
	"new",
	"return",
	"switch",
	"this",
	"throw",
	"try",
	"typeof",
	"var",
	"void",
	"while",
	"with",
	"class",
	"const",
	"enum",
	"export",
	"extends",
	"import",
	"super",
	"implements",
	"interface",
	"let",
	"package",
	"private",
	"protected",
	"public",
	"static",
	"yield",
]);

export async function fetchSpec(url: string, timeout = FETCH_TIMEOUT_MS): Promise<OpenAPIObject> {
	let response: Response;
	try {
		response = await fetch(url, { signal: AbortSignal.timeout(timeout) });
	} catch (error) {
		throw fetchFailure(url, error, timeout);
	}
	if (!response.ok) {
		throw new Error(`Failed to fetch OpenAPI spec from ${url}: HTTP ${response.status}`);
	}

	let document: unknown;
	try {
		document = await response.json();
	} catch (error) {
		if (!(error instanceof SyntaxError)) throw fetchFailure(url, error, timeout);
		const contentType = response.headers.get("content-type") ?? "no content-type";
		throw new Error(`Response from ${url} is not valid JSON (${contentType}): ${error.message}`, {
			cause: error,
		});
	}
	if (!isOpenAPIDocument(document)) {
		throw new Error(`Response from ${url} is not an OpenAPI document with paths`);
	}
	return document;
}

function fetchFailure(url: string, error: unknown, timeout: number): Error {
	let reason: string;
	if (error instanceof Error && error.name === "TimeoutError") {
		reason = `timed out after ${timeout} ms`;
	} else {
		reason = error instanceof Error ? error.message : String(error);
		// undici reports DNS and connection errors as "fetch failed" with the detail in cause.
		const cause = error instanceof Error ? error.cause : undefined;
		if (cause instanceof Error) reason += ` (${cause.message})`;
	}
	return new Error(`Failed to fetch OpenAPI spec from ${url}: ${reason}`, { cause: error });
}

function isOpenAPIDocument(value: unknown): value is OpenAPIObject {
	if (value === null || typeof value !== "object") return false;
	const { openapi, swagger, paths } = value as Record<string, unknown>;
	const hasVersion = typeof openapi === "string" || typeof swagger === "string";
	const hasPaths =
		paths !== null &&
		typeof paths === "object" &&
		!Array.isArray(paths) &&
		Object.keys(paths).length > 0;
	return hasVersion && hasPaths;
}

export function cleanOperationIds(
	openAPIDocument: OpenAPIObject,
	options?: {
		deleteHead?: boolean;
		hardcodedOperationIds?: Record<string, string>;
	},
): OpenAPIObject {
	const methods = options?.deleteHead ? ([...HTTP_METHODS, "head"] as const) : HTTP_METHODS;
	const usedOperationIds = new Set<string>();

	for (const [key, pathItem] of Object.entries(
		openAPIDocument.paths as Record<string, PathItemObject>,
	)) {
		for (const method of methods) {
			if (method === "head") {
				delete (openAPIDocument.paths[key] as any)[method];
				continue;
			}

			const operation = pathItem[method as keyof PathItemObject] as OperationObject | undefined;
			if (!operation) continue;

			const fallback = getDefaultOperationId(key, method, options?.hardcodedOperationIds);
			const operationId = uniqueOperationId(
				c.camel(operation.operationId ?? fallback),
				key,
				method,
				usedOperationIds,
			);
			usedOperationIds.add(operationId);
			(openAPIDocument.paths[key] as any)[method] = {
				...openAPIDocument.paths[key][method],
				operationId,
			};
		}
	}

	return openAPIDocument;
}

/** kubb keeps only the first function per operation id, so a later duplicate is renamed after its method and path. */
function uniqueOperationId(
	operationId: string,
	path: string,
	method: string,
	usedOperationIds: ReadonlySet<string>,
): string {
	if (!usedOperationIds.has(operationId)) return operationId;

	const pathOperationId = c.camel(`${method} ${path}`.replace(/[^a-zA-Z0-9]/g, " "));
	let candidate = pathOperationId;
	for (let suffix = 2; usedOperationIds.has(candidate); suffix++) {
		candidate = `${pathOperationId}${suffix}`;
	}
	console.warn(
		`Operation id ${operationId} of ${method.toUpperCase()} ${path} is already used. Using ${candidate}.`,
	);
	return candidate;
}

function getDefaultOperationId(
	path: string,
	method: string,
	hardcodedOperationIds?: Record<string, string>,
): string {
	const operationId = `${method.toUpperCase()} ${path}`;
	if (hardcodedOperationIds?.[operationId]) {
		return hardcodedOperationIds[operationId];
	}

	if (hardcodedOperationIds) {
		console.warn(`No operationId found for ${operationId}. Using default.`);
	}

	return operationId.replace(/[^a-zA-Z0-9/]/g, " ");
}

export function sortArrays(openAPIDocument: OpenAPIObject): OpenAPIObject {
	function sortRecursively<T>(obj: T): T {
		if (Array.isArray(obj)) {
			return obj.sort() as T;
		}
		if (typeof obj === "object" && obj) {
			return Object.fromEntries(
				Object.entries(obj as any).map(([key, value]) => [key, sortRecursively(value)]),
			) as T;
		}
		return obj;
	}

	return sortRecursively(openAPIDocument);
}

export function addMissingPathParams(openAPIDocument: OpenAPIObject): OpenAPIObject {
	for (const path in openAPIDocument.paths) {
		const pathItem = openAPIDocument.paths[path];
		if (!pathItem) continue;

		const pathParams = path.match(/\{([^}]+)\}/g);
		if (!pathParams) continue;

		for (const method of HTTP_METHODS) {
			const operation = pathItem[method as keyof PathItemObject] as OperationObject | undefined;
			if (!operation) continue;

			if (!operation.parameters) {
				operation.parameters = [];
			}

			for (const pathParam of pathParams) {
				const paramName = pathParam.slice(1, -1);
				const existingParam = operation.parameters.find(
					(p: any) => p.in === "path" && p.name === paramName,
				);
				if (!existingParam) {
					operation.parameters.push({
						name: paramName,
						in: "path",
						required: true,
						schema: { type: "string" },
					} as any);
				} else {
					(existingParam as any).required = true;
				}
			}
		}
	}
	return openAPIDocument;
}

/** Drops a base path prefix that a spec path repeats, since the fetcher already prepends the base path. */
export function stripBasePathPrefix(
	openAPIDocument: OpenAPIObject,
	basePath: string,
): OpenAPIObject {
	const prefix = basePath.replace(/\/+$/, "");
	const paths: Record<string, PathItemObject> = {};
	for (const [path, pathItem] of Object.entries(
		openAPIDocument.paths as Record<string, PathItemObject>,
	)) {
		const stripped = path.startsWith(`${prefix}/`) ? path.slice(prefix.length) : path;
		// An operation the spec already lists under the unprefixed path wins over the repeated one.
		paths[stripped] =
			stripped === path ? { ...paths[stripped], ...pathItem } : { ...pathItem, ...paths[stripped] };
	}
	return { ...openAPIDocument, paths };
}

// kubb types an array without `items` as the empty tuple `[]`; an empty schema allows any item, as the spec means.
export function fixArrayItems(openAPIDocument: OpenAPIObject): OpenAPIObject {
	return JSON.parse(JSON.stringify(openAPIDocument), (_key, value) => {
		if (
			value &&
			typeof value === "object" &&
			value.type === "array" &&
			!value.items &&
			!value.prefixItems
		) {
			return { ...value, items: {} };
		}
		return value;
	});
}

export function fixUnionConstraints(obj: any): any {
	if (Array.isArray(obj)) {
		return obj.map(fixUnionConstraints);
	}
	if (obj !== null && typeof obj === "object") {
		if (obj.oneOf && (obj.maxLength || obj.maxItems)) {
			const { maxLength, maxItems, ...rest } = obj;
			const constraint = maxLength ? { maxLength } : { maxItems };
			return {
				...rest,
				oneOf: rest.oneOf.map((item: any) => ({ ...item, ...constraint })),
			};
		}
		return Object.keys(obj).reduce((result, key) => {
			result[key] = fixUnionConstraints(obj[key]);
			return result;
		}, {} as any);
	}
	return obj;
}

export function camelCasePathParams(openAPIDocument: OpenAPIObject): OpenAPIObject {
	const pathRenames: Array<[string, string]> = [];

	// Rename path parameters in components/parameters (handles $ref)
	const componentParams = (openAPIDocument.components as any)?.parameters;
	if (componentParams) {
		for (const param of Object.values(componentParams) as any[]) {
			if (param.in === "path" && param.name !== c.camel(param.name)) {
				param.name = c.camel(param.name);
			}
		}
	}

	for (const [pathKey, pathItem] of Object.entries(openAPIDocument.paths ?? {})) {
		const paramMatches = pathKey.match(/\{([^}]+)\}/g)?.map((p) => p.slice(1, -1)) ?? [];
		const needsRename = paramMatches.filter((p) => p !== c.camel(p));
		if (needsRename.length === 0) continue;

		let newPathKey = pathKey;
		for (const param of needsRename) {
			newPathKey = newPathKey.replace(`{${param}}`, `{${c.camel(param)}}`);
		}

		if (newPathKey !== pathKey) {
			pathRenames.push([pathKey, newPathKey]);
		}

		// Rename in pathItem-level parameters
		const pathItemObj = pathItem as any;
		if (pathItemObj.parameters) {
			for (const param of pathItemObj.parameters) {
				if (param.in === "path" && param.name !== c.camel(param.name)) {
					param.name = c.camel(param.name);
				}
			}
		}

		// Rename in operation-level parameters
		for (const method of HTTP_METHODS) {
			const operation = pathItemObj?.[method] as OperationObject | undefined;
			if (!operation?.parameters) continue;
			for (const param of operation.parameters) {
				const p = param as any;
				if (p.in === "path" && p.name !== c.camel(p.name)) {
					p.name = c.camel(p.name);
				}
			}
		}
	}

	// Apply path renames after iteration to avoid mutation during iteration
	for (const [oldPath, newPath] of pathRenames) {
		openAPIDocument.paths[newPath] = openAPIDocument.paths[oldPath];
		delete openAPIDocument.paths[oldPath];
	}

	return openAPIDocument;
}

export function renameReservedWords(openAPIDocument: OpenAPIObject): OpenAPIObject {
	const renames = new Map<string, string>();

	// Rename reserved word path parameters throughout the spec
	for (const [pathKey, pathItem] of Object.entries(openAPIDocument.paths ?? {})) {
		const paramMatches = pathKey.match(/\{([^}]+)\}/g)?.map((p) => p.slice(1, -1)) ?? [];
		const reservedParams = paramMatches.filter((p) => JS_RESERVED_WORDS.has(p));
		if (reservedParams.length === 0) continue;

		// Rename the path key
		let newPathKey = pathKey;
		for (const param of reservedParams) {
			const safe = `_${param}`;
			renames.set(param, safe);
			newPathKey = newPathKey.replace(`{${param}}`, `{${safe}}`);
		}

		if (newPathKey !== pathKey) {
			openAPIDocument.paths[newPathKey] = openAPIDocument.paths[pathKey];
			delete openAPIDocument.paths[pathKey];
		}

		const pathItemObj = pathItem as any;
		const parameterLists = [
			pathItemObj?.parameters,
			...HTTP_METHODS.map(
				(method) => (pathItemObj?.[method] as OperationObject | undefined)?.parameters,
			),
		];
		for (const parameters of parameterLists) {
			if (!parameters) continue;
			for (const param of parameters) {
				if (param.in === "path" && renames.has(param.name)) {
					param.name = renames.get(param.name);
				}
			}
		}

		renames.clear();
	}

	return openAPIDocument;
}

/** Keys whose values are instance data rather than schemas, so a `pattern` inside them is not a regex. */
const NON_SCHEMA_KEYS = new Set(["example", "examples", "default", "enum", "const"]);

/**
 * JSON Schema `pattern` values are plain ECMA-262 sources, but kubb's plugin-zod treats a leading
 * or trailing `/` (escaped or not) as regex literal delimiters and strips it before calling
 * `new RegExp`. A valid pattern such as `^\\/` then loses its last two characters, becomes `^\`,
 * and throws "\ at end of pattern", which fails the whole zod plugin for the package.
 *
 * An edge slash is rewritten as the equivalent `[/]` class so nothing is left for kubb to strip,
 * and a pattern that still is not a valid JS regex is dropped with a warning: generating the rest
 * of the client beats failing on one unenforceable constraint.
 */
export function fixRegexPatterns(openAPIDocument: OpenAPIObject): OpenAPIObject {
	function visit(node: unknown, path: string): void {
		if (Array.isArray(node)) {
			for (const [index, item] of node.entries()) {
				visit(item, `${path}/${index}`);
			}
			return;
		}
		if (node === null || typeof node !== "object") return;

		const record = node as Record<string, unknown>;
		for (const [key, value] of Object.entries(record)) {
			if (key === "pattern" && typeof value === "string") {
				const pattern = protectEdgeSlashes(value);
				if (isValidRegex(pattern)) {
					record[key] = pattern;
				} else {
					console.warn(`Dropping invalid regex pattern at ${path}: ${value}`);
					delete record[key];
				}
				continue;
			}
			if (NON_SCHEMA_KEYS.has(key)) continue;
			visit(value, `${path}/${key}`);
		}
	}

	visit(openAPIDocument, "#");
	return openAPIDocument;
}

function protectEdgeSlashes(pattern: string): string {
	// A leading `/` and a leading `\/` both match one literal slash.
	let result = pattern.replace(/^\\?\//, "[/]");

	// A trailing slash is escaped only by an odd run of backslashes; an even run is literal backslashes.
	const trailing = result.match(/(\\*)\/$/);
	if (trailing) {
		const literalBackslashes = trailing[1].length - (trailing[1].length % 2);
		result = `${result.slice(0, -trailing[0].length)}${"\\".repeat(literalBackslashes)}[/]`;
	}

	return result;
}

function isValidRegex(pattern: string): boolean {
	try {
		new RegExp(pattern);
		return true;
	} catch {
		return false;
	}
}
