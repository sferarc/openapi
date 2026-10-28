import { ast } from "kubb/kit";
import { describe, expect, it } from "vitest";
import { requestBodyFallback, responseContentFallback } from "./adapter";

const content = (contentType: string) =>
	ast.factory.createContent({ contentType, schema: ast.factory.createSchema({ type: "string" }) });

describe("requestBodyFallback", () => {
	it("keeps the first raw media type", () => {
		const body = requestBodyFallback(
			ast.factory.createRequestBody({
				required: true,
				content: [content("application/octet-stream"), content("application/zip")],
			}),
		);
		expect(body?.required).toBe(true);
		expect(body?.content?.map((c) => c.contentType)).toEqual(["application/octet-stream"]);
	});

	it("keeps a url-encoded body", () => {
		const body = requestBodyFallback(
			ast.factory.createRequestBody({ content: [content("application/x-www-form-urlencoded")] }),
		);
		expect(body?.content?.map((c) => c.contentType)).toEqual(["application/x-www-form-urlencoded"]);
	});

	it("keeps a JSON suffix body over a raw one", () => {
		const body = requestBodyFallback(
			ast.factory.createRequestBody({
				content: [content("text/plain"), content("application/scim+json")],
			}),
		);
		expect(body?.content?.map((c) => c.contentType)).toEqual(["application/scim+json"]);
	});

	it("returns nothing without a body schema", () => {
		const body = ast.factory.createRequestBody({
			content: [ast.factory.createContent({ contentType: "application/scim+json" })],
		});
		expect(requestBodyFallback(body)).toBeUndefined();
		expect(requestBodyFallback(undefined)).toBeUndefined();
	});
});

describe("responseContentFallback", () => {
	const response = (...contentTypes: Array<string>) =>
		ast.factory.createResponse({
			statusCode: "200",
			content: contentTypes.map(content),
		});

	it("keeps a JSON suffix type over a raw one", () => {
		const fallback = responseContentFallback(response("text/plain", "application/scim+json"));
		expect(fallback?.map((c) => c.contentType)).toEqual(["application/scim+json"]);
	});

	it("keeps the first raw media type", () => {
		const fallback = responseContentFallback(response("application/zip", "application/x-tar"));
		expect(fallback?.map((c) => c.contentType)).toEqual(["application/zip"]);
	});

	it("types bytes the fetchers resolve as a Blob as a Blob, whatever their schema", () => {
		const fallback = responseContentFallback(response("application/pdf"));
		expect(fallback?.[0]?.schema?.type).toBe("blob");
		expect(responseContentFallback(response("text/plain"))?.[0]?.schema?.type).toBe("string");
	});

	it("skips line-delimited JSON, whose schema describes one line", () => {
		expect(responseContentFallback(response("application/x-ndjson"))).toBeUndefined();
		expect(responseContentFallback(response("application/jsonl"))).toBeUndefined();
		expect(responseContentFallback(response("application/stream+json"))).toBeUndefined();
		const fallback = responseContentFallback(response("application/x-ndjson", "text/csv"));
		expect(fallback?.map((c) => c.contentType)).toEqual(["text/csv"]);
	});

	it("leaves a response the spec declares as application/json alone", () => {
		expect(responseContentFallback(response("application/json", "text/csv"))).toBeUndefined();
	});

	it("returns nothing without a body schema", () => {
		const unknownBody = ast.factory.createResponse({
			statusCode: "204",
			content: [
				ast.factory.createContent({
					contentType: "application/zip",
					schema: ast.factory.createSchema({ type: "unknown" }),
				}),
			],
		});
		expect(responseContentFallback(unknownBody)).toBeUndefined();
		expect(responseContentFallback(undefined)).toBeUndefined();
	});
});
