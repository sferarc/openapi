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

		expect(client.api.default.getRoutesRoutesGet).toBeTypeOf("function");
		await expect(client.api.default.getRoutesRoutesGet()).resolves.toEqual({
			data: [],
		});
		expect(calls).toEqual([{ url: "https://api.example.com/routes", method: "GET" }]);
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
		await client.request("POST /key/{key}/regenerate", { pathParams: { key: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/key\/a%2Fb\/regenerate$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("POST /key/{key}/regenerate", { pathParams: { key: "" } }),
		).rejects.toThrow("Missing required path parameter: key");
		expect(urls).toEqual([]);
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /routes", {});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/routes$/);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});

describe("LiteLLMApi.api", () => {
	const fetch: FetchImpl = async () => {
		throw new Error("fetch called");
	};
	const client = new LiteLLMApi({ baseUrl: "https://api.example.com", token: "token", fetch });

	it("ignores Object.prototype names as tags and operations", () => {
		expect(client.api.constructor).toBeUndefined();
		expect(client.api.modelManagement.toString).toBeUndefined();
		expect(client.api.modelManagement.hasOwnProperty).toBeUndefined();
		expect(client.api.modelManagement.modelListModelsGet).toBeTypeOf("function");
	});
});
