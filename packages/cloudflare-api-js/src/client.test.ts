import { describe, expect, it } from "vitest";
import { CloudflareApi } from "./client";
import type { FetchImpl, RequestInit } from "./utils/fetch";

describe("CloudflareApi.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new CloudflareApi({ token: "token", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /accounts/{accountId}", { pathParams: { accountId: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/accounts\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /accounts/{accountId}", { pathParams: { accountId: "" } }),
		).rejects.toThrow("Missing required path parameter: accountId");
		expect(urls).toEqual([]);
	});

	it("types request() and client.api params from the operation", () => {
		const { client } = setup();
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			// @ts-expect-error pathParams needs accountId
			client.request("GET /accounts/{accountId}", { pathParams: {} }),
			// @ts-expect-error pathParams is required
			client.request("GET /accounts/{accountId}"),
			// @ts-expect-error the operation has no such parameter
			client.request("GET /accounts/{accountId}", { pathParams: { accountId: "a" }, nope: 1 }),
			// @ts-expect-error pathParams needs accountId
			client.api.accounts.accountsAccountDetails({ pathParams: {} }),
		];
		expect(typeChecks).toBeTypeOf("function");
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /accounts");
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/accounts$/);
	});

	it("joins a non-exploded array query param into one comma-separated value", async () => {
		const { urls, client } = setup();
		await client.request("GET /zones", { queryParams: { type: ["full", "partial"], page: 2 } });
		expect(new URL(urls[0] ?? "").search).toBe("?type=full%2Cpartial&page=2");
	});

	it("keeps repeated keys for the organization id filter", async () => {
		const { urls, client } = setup();
		await client.request("GET /organizations", { queryParams: { id: ["a", "b"] } });
		expect(new URL(urls[0] ?? "").search).toBe("?id=a&id=b");
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

describe("CloudflareApi.auth.refreshToken", () => {
	const options = {
		refreshToken: "rt",
		clientId: "cid",
		clientSecret: "secret",
	};

	it("posts a form to the dashboard token endpoint and returns the raw response", async () => {
		const { calls, fetch } = recordFetch(200, { access_token: "at" });
		const client = new CloudflareApi({ token: "client-token", fetch });

		const response = await client.auth.refreshToken(options);

		expect(calls).toHaveLength(1);
		const [{ url, init }] = calls as [(typeof calls)[number]];
		expect(url).toBe("https://dash.cloudflare.com/oauth2/token");
		expect(init?.method).toBe("POST");
		expect(init?.headers).toEqual({ "Content-Type": "application/x-www-form-urlencoded" });
		expect(Object.fromEntries(new URLSearchParams(init?.body as string))).toEqual({
			grant_type: "refresh_token",
			refresh_token: "rt",
			client_id: "cid",
			client_secret: "secret",
		});
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ access_token: "at" });
	});

	it("still accepts the ignored authToken option", async () => {
		const { calls, fetch } = recordFetch(200, {});
		const client = new CloudflareApi({ token: "client-token", fetch });

		await client.auth.refreshToken({ ...options, authToken: "at-old" });

		expect(JSON.stringify(calls[0]?.init)).not.toContain("at-old");
	});

	it("hands a non-2xx response back to the caller instead of rejecting", async () => {
		const { fetch } = recordFetch(401, { success: false });
		const client = new CloudflareApi({ token: "client-token", fetch });

		const response = await client.auth.refreshToken(options);

		expect(response.ok).toBe(false);
		expect(response.status).toBe(401);
	});
});

describe("CloudflareApi.api", () => {
	const fetch: FetchImpl = async () => {
		throw new Error("fetch called");
	};
	const client = new CloudflareApi({ token: "token", fetch });

	it("ignores Object.prototype names as tags and operations", () => {
		expect(client.api.constructor).toBeUndefined();
		expect(client.api.health.toString).toBeUndefined();
		expect(client.api.health.hasOwnProperty).toBeUndefined();
		expect(client.api.health.getHeartbeat).toBeTypeOf("function");
	});
});

describe("CloudflareApi per-call config", () => {
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
		return { headers, signals, client: new CloudflareApi({ token: "token", fetch }) };
	}

	it("sends the caller's headers from request() alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.request("GET /accounts", { config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("sends the caller's headers from the api proxy alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.api.accounts.accountsListAccounts({
			config: { headers: { "X-Request-Id": "abc" } },
		});
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("passes the caller's signal to fetch from request() and the api proxy", async () => {
		const { signals, client } = setup();
		const { signal } = new AbortController();
		await client.request("GET /accounts", { config: { signal } });
		await client.api.accounts.accountsListAccounts({ config: { signal } });
		expect(signals).toEqual([signal, signal]);
	});
});

describe("Worker script uploads", () => {
	const metadata = { main_module: "worker.js", compatibility_date: "2026-10-30" };
	const file = () =>
		new File(["export default { fetch: () => new Response('OK') };"], "worker.js", {
			type: "application/javascript+module",
		});

	it.each([
		["PUT /accounts/{accountId}/workers/scripts/{scriptName}", {}],
		[
			"PUT /accounts/{accountId}/workers/dispatch/namespaces/{dispatchNamespace}/scripts/{scriptName}",
			{ dispatchNamespace: "ns" },
		],
	] as const)(
		"sends %s as multipart with the metadata and module files",
		async (endpoint, extraPathParams) => {
			const { calls, fetch } = recordFetch(200, { success: true });
			const client = new CloudflareApi({ token: "token", fetch });
			await client.request(endpoint, {
				pathParams: { accountId: "a", scriptName: "s", ...extraPathParams },
				body: { metadata, files: [file()] },
			});

			const init = calls[0]?.init;
			// fetch sets the multipart boundary only when no Content-Type is given.
			expect(init?.headers?.["Content-Type"]).toBeUndefined();
			const form = init?.body;
			if (!(form instanceof FormData)) throw new Error("expected a FormData body");
			expect(JSON.parse(String(form.get("metadata")))).toEqual(metadata);
			const module = form.get("files");
			if (!(module instanceof File)) throw new Error("expected the module as a File part");
			expect(module.name).toBe("worker.js");
			expect(module.type).toBe("application/javascript+module");
		},
	);
});
