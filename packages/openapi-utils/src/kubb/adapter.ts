import { adapterOas } from "@kubb/adapter-oas";
import { ast } from "kubb/kit";

type AdapterOasOptions = NonNullable<Parameters<typeof adapterOas>[0]>;
type Adapter = ReturnType<typeof adapterOas>;

const JSON_MEDIA_TYPE = /[/+]json\b/i;

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
 * Parses with `contentType` so JSON operations keep a single JSON body, then backfills the request
 * body of operations that only accept another media type, `application/scim+json` included, which
 * the adapter drops otherwise.
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
			const fallbackBodies = new Map(
				everyMediaType.operations.map((node) => [operationKey(node), node.requestBody]),
			);
			fallbackBodies.delete(undefined);
			return {
				...input,
				operations: input.operations.map((node) => {
					if (node.requestBody?.content?.length) return node;
					const requestBody = requestBodyFallback(fallbackBodies.get(operationKey(node)));
					return requestBody ? { ...node, requestBody } : node;
				}),
			};
		},
	};
}
