import { describe, expect, it } from "vitest";
import { LiteLLMApi } from "./client";
import type { FetchImpl } from "./utils/fetch";

describe("LiteLLMApi", () => {
	it("reaches untagged operations through the default namespace", async () => {
		const calls: { url: string; method?: string }[] = [];
		const fetch: FetchImpl = async (url, init) => {
			calls.push({ url, method: init?.method });
			return new Response(JSON.stringify({ data: [] }), {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		const client = new LiteLLMApi({ baseUrl: "https://api.example.com", token: null, fetch });

		expect(client.api.default.listModelCatalogModelCatalogGet).toBeTypeOf("function");
		await expect(client.api.default.listModelCatalogModelCatalogGet()).resolves.toEqual({
			data: [],
		});
		expect(calls).toEqual([{ url: "https://api.example.com/model_catalog", method: "GET" }]);
	});
});
