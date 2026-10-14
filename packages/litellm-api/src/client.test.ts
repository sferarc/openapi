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

describe("LiteLLMApi.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return {
			urls,
			client: new LiteLLMApi({ baseUrl: "https://api.example.com", token: null, fetch }),
		};
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /model_catalog/{model_id}", { pathParams: { model_id: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/model_catalog\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /model_catalog/{model_id}", { pathParams: { model_id: "" } }),
		).rejects.toThrow("Missing required path parameter: model_id");
		expect(urls).toEqual([]);
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /billing/usage", {});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/billing\/usage$/);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});
