import { ast } from "kubb/kit";
import { describe, expect, it } from "vitest";
import { requestBodyFallback } from "./adapter";

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
