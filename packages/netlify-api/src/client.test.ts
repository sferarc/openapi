import { describe, expect, it } from "vitest";
import { NetlifyApi } from "./client";
import type { FetchImpl, RequestInit } from "./utils/fetch";
import type { ResponseInfo } from "./utils/fetcher";

describe("NetlifyApi.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new NetlifyApi({ token: "token", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /sites/{site_id}", { pathParams: { site_id: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/sites\/a%2Fb$/);
	});

	it("calls getSiteEnvVars under the base path once", async () => {
		const { urls, client } = setup();
		await client.request("GET /sites/{site_id}/env", { pathParams: { site_id: "abc" } });
		expect(urls).toEqual(["https://api.netlify.com/api/v1/sites/abc/env"]);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /sites/{site_id}", { pathParams: { site_id: "" } }),
		).rejects.toThrow("Missing required path parameter: site_id");
		expect(urls).toEqual([]);
	});

	it("types request() and client.api params from the operation", () => {
		const { client } = setup();
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			// @ts-expect-error pathParams needs site_id
			client.request("GET /sites/{site_id}", { pathParams: {} }),
			// @ts-expect-error pathParams is required
			client.request("GET /sites/{site_id}"),
			// @ts-expect-error the operation has no such parameter
			client.request("GET /sites/{site_id}", { pathParams: { site_id: "a" }, nope: 1 }),
			// @ts-expect-error pathParams needs site_id
			client.api.site.getSite({ pathParams: {} }),
		];
		expect(typeChecks).toBeTypeOf("function");
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /sites");
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/sites$/);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});

function recordFetch(status: number, body: unknown) {
	const calls: { url: string; init: RequestInit | undefined }[] = [];
	const fetch: FetchImpl = async (url, init) => {
		calls.push({ url, init });
		return new Response(JSON.stringify(body), {
			status,
			headers: { "content-type": "application/json" },
		}) as never;
	};
	return { calls, fetch };
}

describe("NetlifyApi.auth.refreshToken", () => {
	const options = { refreshToken: "rt", clientId: "cid", clientSecret: "secret" };
	const tokenResponse = {
		token_type: "Bearer",
		access_token: "at",
		refresh_token: "rt2",
		scope: "app",
		created_at: 1700000000,
	};

	it("posts JSON to /oauth/token outside the API base path", async () => {
		const { calls, fetch } = recordFetch(200, tokenResponse);
		const client = new NetlifyApi({ token: "client-token", fetch });

		const result = await client.auth.refreshToken(options);

		expect(calls).toHaveLength(1);
		const [{ url, init }] = calls as [(typeof calls)[number]];
		expect(url).toBe("https://api.netlify.com/oauth/token");
		expect(init?.method).toBe("POST");
		expect(init?.headers).toEqual({
			"Content-Type": "application/json",
			Authorization: "Bearer client-token",
		});
		expect(JSON.parse(init?.body as string)).toEqual({
			grant_type: "refresh_token",
			refresh_token: "rt",
			client_id: "cid",
			client_secret: "secret",
		});
		expect(result).toEqual({
			tokenType: "Bearer",
			accessToken: "at",
			refreshToken: "rt2",
			scope: "app",
			createdAt: 1700000000,
		});
	});

	it("sends authToken instead of the client token when given", async () => {
		const { calls, fetch } = recordFetch(200, tokenResponse);
		const client = new NetlifyApi({ token: "client-token", fetch });

		await client.auth.refreshToken({ ...options, authToken: "override" });

		expect(calls[0]?.init?.headers?.Authorization).toBe("Bearer override");
	});

	it("rejects with the status on a non-2xx response", async () => {
		const { fetch } = recordFetch(401, { error: "invalid_grant" });
		const client = new NetlifyApi({ token: "client-token", fetch });

		await expect(client.auth.refreshToken(options)).rejects.toMatchObject({
			status: 401,
			payload: { error: "invalid_grant" },
		});
	});
});

describe("NetlifyApi token function", () => {
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
		const client = new NetlifyApi({ fetch, token: async () => `token-${++current}` });
		await client.request("GET /sites");
		await client.api.site.listSites();
		expect(authorizations).toEqual(["Bearer token-1", "Bearer token-2"]);
	});

	it("takes a synchronous token function", async () => {
		const { authorizations, fetch } = setup();
		const client = new NetlifyApi({ fetch, token: () => "fresh" });
		await client.request("GET /sites");
		expect(authorizations).toEqual(["Bearer fresh"]);
	});

	it("sends no Authorization header when the function returns null", async () => {
		const { authorizations, fetch } = setup();
		const client = new NetlifyApi({ fetch, token: () => null });
		await client.request("GET /sites");
		expect(authorizations).toEqual([undefined]);
	});

	it("lets a call's own config.token win over the function", async () => {
		const { authorizations, fetch } = setup();
		const client = new NetlifyApi({ fetch, token: () => "client" });
		await client.api.site.listSites({ config: { token: "call" } });
		expect(authorizations).toEqual(["Bearer call"]);
	});

	it("rejects with what the token function threw, before calling fetch", async () => {
		const { authorizations, fetch } = setup();
		const failure = new Error("refresh failed");
		const client = new NetlifyApi({
			fetch,
			token: async () => {
				throw failure;
			},
		});
		await expect(client.request("GET /sites")).rejects.toBe(failure);
		await expect(client.api.site.listSites()).rejects.toBe(failure);
		expect(authorizations).toEqual([]);
	});

	it("does not call the function from auth.refreshToken, which it may itself call", async () => {
		const { authorizations, fetch } = setup();
		let calls = 0;
		const client = new NetlifyApi({
			fetch,
			token: () => {
				calls++;
				return "fresh";
			},
		});
		const options = { refreshToken: "rt", clientId: "cid", clientSecret: "secret" };
		await client.auth.refreshToken(options);
		await client.auth.refreshToken({ ...options, authToken: "current" });
		expect(calls).toBe(0);
		expect(authorizations).toEqual([undefined, "Bearer current"]);
	});
});

describe("NetlifyApi.api", () => {
	const fetch: FetchImpl = async () => {
		throw new Error("fetch called");
	};
	const client = new NetlifyApi({ token: "token", fetch });

	it("ignores Object.prototype names as tags and operations", () => {
		expect(client.api.constructor).toBeUndefined();
		expect(client.api.site.toString).toBeUndefined();
		expect(client.api.site.hasOwnProperty).toBeUndefined();
		expect(client.api.site.listSites).toBeTypeOf("function");
	});
});

describe("NetlifyApi per-call config", () => {
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
		return { headers, signals, client: new NetlifyApi({ token: "token", fetch }) };
	}

	it("sends the caller's headers from request() alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.request("GET /sites", { config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("sends the caller's headers from the api proxy alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.api.site.listSites({ config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("passes the caller's signal to fetch from request() and the api proxy", async () => {
		const { signals, client } = setup();
		const { signal } = new AbortController();
		await client.request("GET /sites", { config: { signal } });
		await client.api.site.listSites({ config: { signal } });
		expect(signals).toEqual([signal, signal]);
	});
});

describe("NetlifyApi response headers", () => {
	const link =
		'<https://api.netlify.com/api/v1/sites?page=2&per_page=1>; rel="next", <https://api.netlify.com/api/v1/sites?page=3&per_page=1>; rel="last"';

	function setup() {
		const fetch: FetchImpl = async () =>
			new Response(JSON.stringify([{ id: "site-1" }]), {
				status: 200,
				headers: { "content-type": "application/json", Link: link },
			}) as never;
		return new NetlifyApi({ token: "token", fetch });
	}

	it("reads the Link to the next page of a list from the api proxy", async () => {
		const client = setup();
		const seen: ResponseInfo[] = [];

		const sites = await client.api.site.listSites({
			queryParams: { per_page: 1 },
			config: { onResponse: (response) => seen.push(response) },
		});

		expect(sites).toEqual([{ id: "site-1" }]);
		expect(seen.map(({ status, headers }) => [status, headers.get("Link")])).toEqual([[200, link]]);
	});

	it("passes onResponse through request()", async () => {
		const client = setup();
		const links: (string | null)[] = [];
		await client.request("GET /sites", {
			config: { onResponse: ({ headers }) => links.push(headers.get("link")) },
		});
		expect(links).toEqual([link]);
	});
});
