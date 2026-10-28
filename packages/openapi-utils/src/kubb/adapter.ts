import { adapterOas } from "@kubb/adapter-oas";
import { ast } from "kubb/kit";

type AdapterOasOptions = NonNullable<Parameters<typeof adapterOas>[0]>;
type Adapter = ReturnType<typeof adapterOas>;

const JSON_MEDIA_TYPE = /[/+]json\b/i;
// The schema types the adapter emits for a response without a usable body schema.
const PLACEHOLDER_SCHEMA_TYPES = new Set(["any", "unknown", "void"]);
// One JSON value per line: the schema describes a line, not the body the fetchers resolve.
const LINE_DELIMITED_JSON = /ndjson|jsonl|json-seq|stream\+json/i;
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

function isBinary(contentType: string): boolean {
	const mediaType = contentType.split(";")[0]?.trim().toLowerCase() ?? "";
	return BINARY_MEDIA_TYPES.has(mediaType) || /^(image|audio|video|font)\//.test(mediaType);
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
	const entry = preferredContent(
		content.filter((item) => hasBodySchema(item) && !LINE_DELIMITED_JSON.test(item.contentType)),
	);
	if (!entry) return undefined;
	if (!isBinary(entry.contentType)) return [entry];
	// Specs often declare bytes as a plain `type: string`, but the fetchers resolve them as a Blob.
	const schema = ast.factory.createSchema({ type: "blob", description: entry.schema?.description });
	return [{ ...entry, schema }];
}

function withFallbackResponses(
	node: ast.OperationNode,
	everyMediaType: ast.OperationNode | undefined,
): ast.OperationNode {
	if (!ast.isHttpOperationNode(node) || !everyMediaType || !ast.isHttpOperationNode(everyMediaType))
		return node;
	let changed = false;
	const responses = node.responses.map((response) => {
		if (response.content?.some(hasBodySchema)) return response;
		const content = responseContentFallback(
			everyMediaType.responses.find((other) => other.statusCode === response.statusCode),
		);
		if (!content) return response;
		changed = true;
		return { ...response, content };
	});
	return changed ? { ...node, responses } : node;
}

/**
 * Parses with `contentType` so JSON operations keep a single JSON body, then backfills what the
 * adapter drops otherwise: the request body of operations that only accept another media type,
 * `application/scim+json` included, and the type of responses that are not `application/json`.
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
				operations: input.operations.map((primaryNode) => {
					const fallbackNode = fallbackOperations.get(operationKey(primaryNode));
					const node = withFallbackResponses(primaryNode, fallbackNode);
					if (node.requestBody?.content?.length) return node;
					const requestBody = requestBodyFallback(fallbackNode?.requestBody);
					return requestBody ? { ...node, requestBody } : node;
				}),
			};
		},
	};
}
