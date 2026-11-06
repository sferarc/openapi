import { describe, expect, it } from "vitest";
import { V0Api, type V0ApiOptions, type VercelApiOptions } from "./client";
import type { FetchImpl } from "./utils/fetch";
import type { ResponseInfo } from "./utils/fetcher";

describe("V0Api.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new V0Api({ token: "token", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /chats/{chatId}", { pathParams: { chatId: "a/b" } });
		expect(urls).toEqual(["https://api.v0.dev/v1/chats/a%2Fb"]);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /chats/{chatId}", { pathParams: { chatId: "" } }),
		).rejects.toThrow("Missing required path parameter: chatId");
		expect(urls).toEqual([]);
	});

	it("types request() and client.api params from the operation", () => {
		const { client } = setup();
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			// @ts-expect-error pathParams needs chatId
			client.request("GET /chats/{chatId}", { pathParams: {} }),
			// @ts-expect-error pathParams is required
			client.request("GET /chats/{chatId}"),
			// @ts-expect-error the operation has no such parameter
			client.request("GET /chats/{chatId}", { pathParams: { chatId: "a" }, nope: 1 }),
			// @ts-expect-error pathParams needs chatId
			client.api.chats.chatsGetById({ pathParams: {} }),
			// @ts-expect-error the spec requires the chatId and versionId query params
			client.request("GET /deployments"),
			// @ts-expect-error queryParams needs versionId
			client.api.deployments.deploymentsFind({ queryParams: { projectId: "p", chatId: "c" } }),
		];
		expect(typeChecks).toBeTypeOf("function");
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /chats");
		expect(urls).toEqual(["https://api.v0.dev/v1/chats"]);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});

describe("V0Api.api", () => {
	const fetch: FetchImpl = async () => {
		throw new Error("fetch called");
	};
	const client = new V0Api({ token: "token", fetch });

	it("ignores Object.prototype names as tags and operations", () => {
		expect(client.api.constructor).toBeUndefined();
		expect(client.api.chats.toString).toBeUndefined();
		expect(client.api.chats.hasOwnProperty).toBeUndefined();
		expect(client.api.chats.chatsCreate).toBeTypeOf("function");
	});
});

describe("V0Api per-call config", () => {
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
		return { headers, signals, client: new V0Api({ token: "token", fetch }) };
	}

	it("sends the caller's headers from request() alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.request("GET /chats", { config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("sends the caller's headers from the api proxy alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.api.chats.chatsFind({ config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("passes the caller's signal to fetch from request() and the api proxy", async () => {
		const { signals, client } = setup();
		const { signal } = new AbortController();
		await client.request("GET /chats", { config: { signal } });
		await client.api.chats.chatsFind({ config: { signal } });
		expect(signals).toEqual([signal, signal]);
	});
});

describe("V0Api response headers", () => {
	function setup() {
		const fetch: FetchImpl = async () =>
			new Response(
				JSON.stringify({
					error: { message: "Rate limit exceeded", type: "too_many_requests_error" },
				}),
				{
					status: 429,
					headers: { "content-type": "application/json", "retry-after": "60" },
				},
			) as never;
		return new V0Api({ token: "token", fetch });
	}

	it("reads the headers of a rate limited response from the api proxy", async () => {
		const client = setup();
		const seen: ResponseInfo[] = [];

		await expect(
			client.api.chats.chatsFind({ config: { onResponse: (response) => seen.push(response) } }),
		).rejects.toMatchObject({ status: 429 });
		expect(seen.map(({ status, headers }) => [status, headers.get("Retry-After")])).toEqual([
			[429, "60"],
		]);
	});

	it("passes onResponse through request()", async () => {
		const client = setup();
		const retryAfter: (string | null)[] = [];

		await expect(
			client.request("GET /chats", {
				config: { onResponse: ({ headers }) => retryAfter.push(headers.get("retry-after")) },
			}),
		).rejects.toMatchObject({ status: 429 });
		expect(retryAfter).toEqual(["60"]);
	});
});

describe("V0Api baseUrl", () => {
	function setup(options: { baseUrl?: string } = {}) {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new V0Api({ token: "token", fetch, ...options }) };
	}

	it("sends request() and api proxy calls to the constructor's baseUrl", async () => {
		const { urls, client } = setup({ baseUrl: "https://proxy.test/v0/" });
		await client.request("GET /chats");
		await client.api.chats.chatsFind();
		expect(urls).toEqual(["https://proxy.test/v0/chats", "https://proxy.test/v0/chats"]);
	});

	it("lets a call's config.baseUrl replace the constructor's", async () => {
		const { urls, client } = setup({ baseUrl: "https://ignored.test" });
		await client.request("GET /chats", { config: { baseUrl: "https://per-call.test" } });
		expect(urls).toEqual(["https://per-call.test/chats"]);
	});

	it("defaults to the API's own URL", async () => {
		const { urls, client } = setup();
		await client.request("GET /chats");
		expect(urls).toEqual(["https://api.v0.dev/v1/chats"]);
	});
});

describe("V0ApiOptions", () => {
	it("keeps VercelApiOptions as an alias so existing imports compile", () => {
		const options: V0ApiOptions = { token: "token", baseUrl: "https://proxy.test" };
		const legacy: VercelApiOptions = options;
		const client = new V0Api(legacy);
		expect(client.token).toBe("token");
	});
});

describe("V0Api token function", () => {
	function setup() {
		const authorizations: unknown[] = [];
		const fetch: FetchImpl = async (_url, init) => {
			authorizations.push(init?.headers?.Authorization);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { authorizations, fetch };
	}

	it("asks the token function again on every call from request() and the api proxy", async () => {
		const { authorizations, fetch } = setup();
		let current = 0;
		const client = new V0Api({ fetch, token: async () => `v0-${++current}` });
		await client.request("GET /chats");
		await client.api.chats.chatsFind();
		expect(authorizations).toEqual(["Bearer v0-1", "Bearer v0-2"]);
	});

	it("takes a synchronous token function", async () => {
		const { authorizations, fetch } = setup();
		const client = new V0Api({ fetch, token: () => "v0-fresh" });
		await client.request("GET /chats");
		expect(authorizations).toEqual(["Bearer v0-fresh"]);
	});

	it("sends no Authorization header when the function returns null", async () => {
		const { authorizations, fetch } = setup();
		const client = new V0Api({ fetch, token: () => null });
		await client.request("GET /chats");
		expect(authorizations).toEqual([undefined]);
	});

	it("lets a call's own config.token win over the function", async () => {
		const { authorizations, fetch } = setup();
		const client = new V0Api({ fetch, token: () => "v0-client" });
		await client.api.chats.chatsFind({ config: { token: "v0-call" } });
		expect(authorizations).toEqual(["Bearer v0-call"]);
	});

	it("rejects with what the token function threw, before calling fetch", async () => {
		const { authorizations, fetch } = setup();
		const failure = new Error("key revoked");
		const client = new V0Api({
			fetch,
			token: async () => {
				throw failure;
			},
		});
		await expect(client.request("GET /chats")).rejects.toBe(failure);
		await expect(client.api.chats.chatsFind()).rejects.toBe(failure);
		expect(authorizations).toEqual([]);
	});
});
