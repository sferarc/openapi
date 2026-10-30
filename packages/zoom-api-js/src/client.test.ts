import { describe, expect, it } from "vitest";
import { ZoomApi } from "./client";
import type { FetchImpl, RequestInit } from "./utils/fetch";

describe("ZoomApi.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new ZoomApi({ token: "token", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /devices/{deviceId}", { pathParams: { deviceId: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/devices\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /devices/{deviceId}", { pathParams: { deviceId: "" } }),
		).rejects.toThrow("Missing required path parameter: deviceId");
		expect(urls).toEqual([]);
	});

	it("types request() and client.api params from the operation", () => {
		const { client } = setup();
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			// @ts-expect-error pathParams needs deviceId
			client.request("GET /devices/{deviceId}", { pathParams: {} }),
			// @ts-expect-error pathParams is required
			client.request("GET /devices/{deviceId}"),
			// @ts-expect-error the operation has no such parameter
			client.request("GET /devices/{deviceId}", { pathParams: { deviceId: "a" }, nope: 1 }),
			// @ts-expect-error pathParams needs deviceId
			client.api.devices.getDevice({ pathParams: {} }),
		];
		expect(typeChecks).toBeTypeOf("function");
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /archive_files");
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/archive_files$/);
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

describe("ZoomApi.auth.refreshToken", () => {
	const options = { refreshToken: "rt", clientId: "cid", clientSecret: "secret" };

	it("authenticates the client with HTTP basic auth and form-encodes the grant", async () => {
		const { calls, fetch } = recordFetch(200, {
			access_token: "at",
			token_type: "bearer",
			expires_in: 3599,
			refresh_token: "rt2",
			scope: "user:read",
		});
		const client = new ZoomApi({ token: null, fetch });

		const result = await client.auth.refreshToken(options);

		expect(calls).toHaveLength(1);
		const [{ url, init }] = calls as [(typeof calls)[number]];
		expect(url).toBe("https://zoom.us/oauth/token");
		expect(init?.method).toBe("POST");
		expect(init?.headers).toEqual({ Authorization: `Basic ${btoa("cid:secret")}` });
		expect(init?.body).toBeInstanceOf(URLSearchParams);
		expect(Object.fromEntries(init?.body as URLSearchParams)).toEqual({
			grant_type: "refresh_token",
			refresh_token: "rt",
		});
		expect(result).toEqual({ access_token: "at", expires_in: 3599, refresh_token: "rt2" });
	});

	it("rejects with the HTTP status on a non-2xx response", async () => {
		const { fetch } = recordFetch(401, { reason: "Invalid Token!", error: "invalid_grant" });
		const client = new ZoomApi({ token: null, fetch });

		await expect(client.auth.refreshToken(options)).rejects.toThrow(
			"Failed to refresh Zoom token: HTTP 401",
		);
	});
});

describe("ZoomApi.api", () => {
	const fetch: FetchImpl = async () => {
		throw new Error("fetch called");
	};
	const client = new ZoomApi({ token: "token", fetch });

	it("ignores Object.prototype names as tags and operations", () => {
		expect(client.api.constructor).toBeUndefined();
		expect(client.api.archiving.toString).toBeUndefined();
		expect(client.api.archiving.hasOwnProperty).toBeUndefined();
		expect(client.api.archiving.listArchivedFiles).toBeTypeOf("function");
	});
});

describe("ZoomApi per-call config", () => {
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
		return { headers, signals, client: new ZoomApi({ token: "token", fetch }) };
	}

	it("sends the caller's headers from request() alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.request("GET /archive_files", { config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("sends the caller's headers from the api proxy alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.api.archiving.listArchivedFiles({
			config: { headers: { "X-Request-Id": "abc" } },
		});
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("passes the caller's signal to fetch from request() and the api proxy", async () => {
		const { signals, client } = setup();
		const { signal } = new AbortController();
		await client.request("GET /archive_files", { config: { signal } });
		await client.api.archiving.listArchivedFiles({ config: { signal } });
		expect(signals).toEqual([signal, signal]);
	});
});
