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

	it("types request() and client.api params from the operation", () => {
		const { client } = setup();
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			// @ts-expect-error pathParams needs key
			client.request("POST /key/{key}/regenerate", { pathParams: {} }),
			// @ts-expect-error pathParams is required
			client.request("POST /key/{key}/regenerate"),
			// @ts-expect-error the operation has no such parameter
			client.request("POST /key/{key}/regenerate", { pathParams: { key: "a" }, nope: 1 }),
			// @ts-expect-error pathParams needs key
			client.api.keyManagement.regenerateKeyFnKeyKeyRegeneratePost({ pathParams: {} }),
		];
		expect(typeChecks).toBeTypeOf("function");
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /routes");
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

describe("LiteLLMApi per-call config", () => {
	function setup() {
		const headers: unknown[] = [];
		const signals: unknown[] = [];
		const fetch: FetchImpl = async (_url, init) => {
			headers.push(init?.headers);
			signals.push(init?.signal);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return {
			headers,
			signals,
			client: new LiteLLMApi({ baseUrl: "https://api.example.com", token: "token", fetch }),
		};
	}

	it("sends the caller's headers from request() alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.request("GET /routes", { config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("sends the caller's headers from the api proxy alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.api.default.getRoutesRoutesGet({ config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("passes the caller's signal to fetch from request() and the api proxy", async () => {
		const { signals, client } = setup();
		const { signal } = new AbortController();
		await client.request("GET /routes", { config: { signal } });
		await client.api.default.getRoutesRoutesGet({ config: { signal } });
		expect(signals).toEqual([signal, signal]);
	});
});
