import { ast } from "kubb/kit";
import { describe, expect, it } from "vitest";
import { rawRequestBodyFallback } from "./adapter";

const content = (contentType: string) =>
	ast.factory.createContent({ contentType, schema: ast.factory.createSchema({ type: "string" }) });

describe("rawRequestBodyFallback", () => {
	it("keeps the first raw media type", () => {
		const body = rawRequestBodyFallback(
			ast.factory.createRequestBody({
				required: true,
				content: [content("application/octet-stream"), content("application/zip")],
			}),
		);
		expect(body?.required).toBe(true);
		expect(body?.content?.map((c) => c.contentType)).toEqual(["application/octet-stream"]);
	});

	it("keeps a url-encoded body", () => {
		const body = rawRequestBodyFallback(
			ast.factory.createRequestBody({ content: [content("application/x-www-form-urlencoded")] }),
		);
		expect(body?.content?.map((c) => c.contentType)).toEqual(["application/x-www-form-urlencoded"]);
	});

	it("leaves JSON-like bodies to the JSON parse", () => {
		const body = ast.factory.createRequestBody({ content: [content("application/vnd.api+json")] });
		expect(rawRequestBodyFallback(body)).toBeUndefined();
		expect(rawRequestBodyFallback(undefined)).toBeUndefined();
	});
});
