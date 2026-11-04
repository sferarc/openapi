import { describe, expect, it } from "vitest";
import { NukiApi } from "./client";
import type { FetchImpl } from "./utils/fetch";
import type { ResponseInfo } from "./utils/fetcher";

describe("NukiApi.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new NukiApi({ token: "token", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /service/{serviceId}", { pathParams: { serviceId: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/service\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /service/{serviceId}", { pathParams: { serviceId: "" } }),
		).rejects.toThrow("Missing required path parameter: serviceId");
		expect(urls).toEqual([]);
	});

	it("types request() and client.api params from the operation", () => {
		const { client } = setup();
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			// @ts-expect-error pathParams needs serviceId
			client.request("GET /service/{serviceId}", { pathParams: {} }),
			// @ts-expect-error pathParams is required
			client.request("GET /service/{serviceId}"),
			// @ts-expect-error the operation has no such parameter
			client.request("GET /service/{serviceId}", { pathParams: { serviceId: "a" }, nope: 1 }),
			// @ts-expect-error pathParams needs serviceId
			client.api.service.getServiceResource({ pathParams: {} }),
		];
		expect(typeChecks).toBeTypeOf("function");
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /account");
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/account$/);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});

describe("NukiApi.api", () => {
	const fetch: FetchImpl = async () => {
		throw new Error("fetch called");
	};
	const client = new NukiApi({ token: "token", fetch });

	it("ignores Object.prototype names as tags and operations", () => {
		expect(client.api.constructor).toBeUndefined();
		expect(client.api.account.toString).toBeUndefined();
		expect(client.api.account.hasOwnProperty).toBeUndefined();
		expect(client.api.account.getAccountsResource).toBeTypeOf("function");
	});
});

describe("NukiApi per-call config", () => {
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
		return { headers, signals, client: new NukiApi({ token: "token", fetch }) };
	}

	it("sends the caller's headers from request() alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.request("GET /account", { config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("sends the caller's headers from the api proxy alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.api.account.getAccountsResource({
			config: { headers: { "X-Request-Id": "abc" } },
		});
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("passes the caller's signal to fetch from request() and the api proxy", async () => {
		const { signals, client } = setup();
		const { signal } = new AbortController();
		await client.request("GET /account", { config: { signal } });
		await client.api.account.getAccountsResource({ config: { signal } });
		expect(signals).toEqual([signal, signal]);
	});
});

describe("NukiApi response headers", () => {
	function setup() {
		const fetch: FetchImpl = async () =>
			new Response(JSON.stringify({ message: "Too many requests" }), {
				status: 429,
				headers: { "content-type": "application/json", "retry-after": "30" },
			}) as never;
		return new NukiApi({ token: "token", fetch });
	}

	it("reads the headers of a rate limited response from the api proxy", async () => {
		const client = setup();
		const seen: ResponseInfo[] = [];

		await expect(
			client.api.account.getAccountsResource({
				config: { onResponse: (response) => seen.push(response) },
			}),
		).rejects.toMatchObject({ status: 429 });
		expect(seen.map(({ status, headers }) => [status, headers.get("Retry-After")])).toEqual([
			[429, "30"],
		]);
	});

	it("passes onResponse through request()", async () => {
		const client = setup();
		const retryAfter: (string | null)[] = [];

		await expect(
			client.request("GET /account", {
				config: { onResponse: ({ headers }) => retryAfter.push(headers.get("retry-after")) },
			}),
		).rejects.toMatchObject({ status: 429 });
		expect(retryAfter).toEqual(["30"]);
	});
});

describe("NukiApi baseUrl", () => {
	function setup(options: { baseUrl?: string } = {}) {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new NukiApi({ token: "token", fetch, ...options }) };
	}

	it("sends request() and api proxy calls to the constructor's baseUrl", async () => {
		const { urls, client } = setup({ baseUrl: "https://proxy.test/nuki/" });
		await client.request("GET /account");
		await client.api.account.getAccountsResource();
		expect(urls).toEqual(["https://proxy.test/nuki/account", "https://proxy.test/nuki/account"]);
	});

	it("lets a call's config.baseUrl replace the constructor's", async () => {
		const { urls, client } = setup({ baseUrl: "https://ignored.test" });
		await client.request("GET /account", { config: { baseUrl: "https://per-call.test" } });
		expect(urls).toEqual(["https://per-call.test/account"]);
	});

	it("defaults to the API's own URL", async () => {
		const { urls, client } = setup();
		await client.request("GET /account");
		expect(urls).toEqual(["https://api.nuki.io/account"]);
	});
});
