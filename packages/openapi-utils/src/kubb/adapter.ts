import { adapterOas } from "@kubb/adapter-oas";
import { ast } from "kubb/kit";

type AdapterOasOptions = NonNullable<Parameters<typeof adapterOas>[0]>;
type Adapter = ReturnType<typeof adapterOas>;

const JSON_MEDIA_TYPE = /[/+]json\b/i;
// The schema types the adapter emits for a response without a usable body schema.
const PLACEHOLDER_SCHEMA_TYPES = new Set(["any", "unknown", "void"]);
// The media types every client's fetcher resolves as a Blob (`isBinary` in `src/utils/fetcher.ts`).
const BINARY_MEDIA_TYPES = new Set([
	"application/gzip",
	"application/octet-stream",
	"application/pdf",
	"application/vnd.tcpdump.pcap",
	"application/wasm",
	"application/x-gzip",
	"application/x-tar",
	"application/zip",
]);

// Media types the client fetchers split into one JSON value per line (`isLineDelimitedJson`).
const LINE_DELIMITED_JSON_MEDIA_TYPES = new Set([
	"application/jsonl",
	"application/jsonlines",
	"application/ndjson",
	"application/stream+json",
	"application/x-jsonlines",
	"application/x-ndjson",
]);

const mediaType = (contentType: string) => contentType.split(";")[0]?.trim().toLowerCase() ?? "";

const isLineDelimitedJson = (contentType: string) =>
	LINE_DELIMITED_JSON_MEDIA_TYPES.has(mediaType(contentType));

function isBinary(contentType: string): boolean {
	const type = mediaType(contentType);
	return BINARY_MEDIA_TYPES.has(type) || /^(image|audio|video|font)\//.test(type);
}

function operationKey(node: ast.OperationNode): string | undefined {
	return ast.isHttpOperationNode(node) ? `${node.method.toUpperCase()} ${node.path}` : undefined;
}

// A JSON suffix type such as application/scim+json keeps its typed schema, so it wins over raw bytes.
function preferredContent(entries: Array<ast.ContentNode>): ast.ContentNode | undefined {
	return entries.find((item) => JSON_MEDIA_TYPE.test(item.contentType)) ?? entries[0];
}

function hasBodySchema(item: ast.ContentNode): boolean {
	return item.schema !== undefined && !PLACEHOLDER_SCHEMA_TYPES.has(item.schema.type);
}

export function requestBodyFallback(
	requestBody: ast.RequestBodyNode | undefined,
): ast.RequestBodyNode | undefined {
	const entry = preferredContent(requestBody?.content?.filter((item) => item.schema) ?? []);
	if (!requestBody || !entry) return undefined;
	return { ...requestBody, content: [entry] };
}

/**
 * The content to type a response with when the spec declares no `application/json` for it, such
 * as a zip download (`Blob`), a `text/plain` body or an `application/scim+json` resource.
 */
export function responseContentFallback(
	response: ast.ResponseNode | undefined,
): Array<ast.ContentNode> | undefined {
	const content = response?.content ?? [];
	if (content.some((item) => item.contentType === "application/json")) return undefined;
	// A line-delimited schema describes one line, and json-seq is not split by the fetchers at all.
	const entry = preferredContent(
		content.filter(
			(item) =>
				hasBodySchema(item) &&
				!isLineDelimitedJson(item.contentType) &&
				mediaType(item.contentType) !== "application/json-seq",
		),
	);
	if (!entry) return undefined;
	// The server picks the media type for `*/*`, so the spec's schema is the best guess (Keycloak sends JSON).
	if (JSON_MEDIA_TYPE.test(entry.contentType) || mediaType(entry.contentType) === "*/*")
		return [entry];
	// Specs often declare bytes as a plain `type: string`, but the fetchers resolve them as a Blob.
	if (isBinary(entry.contentType)) {
		const schema = ast.factory.createSchema({
			type: "blob",
			description: entry.schema?.description,
		});
		return [{ ...entry, schema }];
	}
	// Any other body comes back from `response.text()`, whatever the spec's schema says.
	if (entry.schema?.type === "string") return [entry];
	const schema = ast.factory.createSchema({
		type: "string",
		description: entry.schema?.description,
	});
	return [{ ...entry, schema }];
}

/**
 * Adds the line-delimited JSON entries of `everyMediaType` to a response that already has a JSON
 * body, each typed as an array of its line schema because that is what the fetcher resolves to, so
 * plugin-ts emits the JSON body and the array of lines as one union.
 */
export function responseWithLineDelimitedJson(
	response: ast.ResponseNode,
	everyMediaType: ast.ResponseNode | undefined,
): ast.ResponseNode {
	const everyEntry = everyMediaType?.content ?? [];
	// Without an application/json body the JSON parse leaves an `unknown` placeholder, which absorbs any union.
	const hasJsonBody = everyEntry.some(
		(entry) => entry.schema && mediaType(entry.contentType) === "application/json",
	);
	if (!response.content || !hasJsonBody) return response;
	const lines = everyEntry.flatMap((entry) =>
		entry.schema && isLineDelimitedJson(entry.contentType)
			? [{ ...entry, schema: ast.factory.createSchema({ type: "array", items: [entry.schema] }) }]
			: [],
	);
	if (!lines.length) return response;
	return { ...response, content: [...response.content, ...lines] };
}

// RFC 9110 forbids content in a 204 or 205 response.
const NO_CONTENT_STATUS_CODES = new Set<ast.StatusCode>(["204", "205"]);

/**
 * Types a 204 or 205 response as `void`, since the fetchers resolve its empty body to `undefined`.
 * The adapter's `unknown` placeholder absorbed a typed 200 in the same union, so an operation
 * answering 200 or 204 returned `unknown`.
 */
export function responseWithoutContent(response: ast.ResponseNode): ast.ResponseNode {
	if (!NO_CONTENT_STATUS_CODES.has(response.statusCode)) return response;
	const schema = ast.factory.createSchema({ type: "void" });
	const content = response.content?.length
		? response.content.map((entry) => ({ ...entry, schema }))
		: [ast.factory.createContent({ contentType: "application/json", schema })];
	return { ...response, content };
}

function withFallbackResponse(
	response: ast.ResponseNode,
	everyMediaType: ast.ResponseNode | undefined,
): ast.ResponseNode {
	if (NO_CONTENT_STATUS_CODES.has(response.statusCode)) return responseWithoutContent(response);
	const content = response.content?.some(hasBodySchema)
		? undefined
		: responseContentFallback(everyMediaType);
	return responseWithLineDelimitedJson(
		content ? { ...response, content } : response,
		everyMediaType,
	);
}

/**
 * Parses with `contentType` so JSON operations keep a single JSON body, then backfills what the
 * adapter drops otherwise: the request body of operations that only accept another media type,
 * `application/scim+json` included, the type of responses that are not `application/json`, and the
 * line-delimited variants of a JSON response.
 */
export function adapterOasWithRawBodies(options: AdapterOasOptions): Adapter {
	const primary = adapterOas(options);
	const fallback = adapterOas({ ...options, contentType: undefined, validate: false });

	return {
		...primary,
		get document() {
			return primary.document;
		},
		async parse(source, parseOptions) {
			const [input, everyMediaType] = await Promise.all([
				primary.parse(source, parseOptions),
				fallback.parse(source, parseOptions),
			]);
			const fallbackOperations = new Map(
				everyMediaType.operations.map((node) => [operationKey(node), node]),
			);
			fallbackOperations.delete(undefined);
			return {
				...input,
				operations: input.operations.map((node) => {
					const fallback = fallbackOperations.get(operationKey(node));
					const responses = node.responses.map((response) =>
						withFallbackResponse(
							response,
							fallback?.responses.find((other) => other.statusCode === response.statusCode),
						),
					);
					if (node.requestBody?.content?.length) return { ...node, responses };
					const requestBody = requestBodyFallback(fallback?.requestBody);
					return requestBody ? { ...node, responses, requestBody } : { ...node, responses };
				}),
			};
		},
	};
}
