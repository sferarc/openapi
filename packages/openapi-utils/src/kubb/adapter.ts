import { adapterOas } from "@kubb/adapter-oas";
import { ast } from "kubb/kit";

type AdapterOasOptions = NonNullable<Parameters<typeof adapterOas>[0]>;
type Adapter = ReturnType<typeof adapterOas>;

const JSON_MEDIA_TYPE = /[/+]json\b/i;

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

function operationKey(node: ast.OperationNode): string | undefined {
	return ast.isHttpOperationNode(node) ? `${node.method.toUpperCase()} ${node.path}` : undefined;
}

export function requestBodyFallback(
	requestBody: ast.RequestBodyNode | undefined,
): ast.RequestBodyNode | undefined {
	const withSchema = requestBody?.content?.filter((item) => item.schema) ?? [];
	// A JSON suffix type such as application/scim+json keeps its typed schema, so it wins over raw bytes.
	const entry = withSchema.find((item) => JSON_MEDIA_TYPE.test(item.contentType)) ?? withSchema[0];
	if (!requestBody || !entry) return undefined;
	return { ...requestBody, content: [entry] };
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

/**
 * Parses with `contentType` so JSON operations keep a single JSON body, then backfills the request
 * body of operations that only accept another media type, `application/scim+json` included, which
 * the adapter drops otherwise, and adds the line-delimited variants of a JSON response.
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
						responseWithLineDelimitedJson(
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
