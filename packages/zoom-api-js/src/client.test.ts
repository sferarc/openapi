import { describe, expect, it } from "vitest";
import { ZoomApi } from "./client";
import type { FetchImpl, RequestInit } from "./utils/fetch";
import type { ResponseInfo } from "./utils/fetcher";

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

	it("double-encodes a meeting UUID that begins with a slash, as Zoom requires", async () => {
		const { urls, client } = setup();
		await client.request("GET /past_meetings/{meetingId}", {
			pathParams: { meetingId: "/ajXp112QmuoKj4854875==" },
		});
		expect(new URL(urls[0] ?? "").pathname).toBe(
			"/v2/past_meetings/%252FajXp112QmuoKj4854875%253D%253D",
		);
	});

	it("leaves a meeting UUID the caller already double-encoded as it is", async () => {
		const { urls, client } = setup();
		await client.api.meetings.pastMeetingDetails({
			pathParams: { meetingId: encodeURIComponent("/ajXp112QmuoKj4854875==") },
		});
		expect(new URL(urls[0] ?? "").pathname).toBe(
			"/v2/past_meetings/%252FajXp112QmuoKj4854875%253D%253D",
		);
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

describe("ZoomApi token function", () => {
	function setup() {
		const authorizations: unknown[] = [];
		const fetch: FetchImpl = async (_url, init) => {
			authorizations.push((init?.headers as Record<string, string> | undefined)?.Authorization);
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
		const client = new ZoomApi({ fetch, token: async () => `token-${++current}` });
		await client.request("GET /archive_files");
		await client.api.archiving.listArchivedFiles();
		expect(authorizations).toEqual(["Bearer token-1", "Bearer token-2"]);
	});

	it("takes a synchronous token function", async () => {
		const { authorizations, fetch } = setup();
		const client = new ZoomApi({ fetch, token: () => "fresh" });
		await client.request("GET /archive_files");
		expect(authorizations).toEqual(["Bearer fresh"]);
	});

	it("sends no Authorization header when the function returns null", async () => {
		const { authorizations, fetch } = setup();
		const client = new ZoomApi({ fetch, token: () => null });
		await client.request("GET /archive_files");
		expect(authorizations).toEqual([undefined]);
	});

	it("lets a call's own config.token win over the function", async () => {
		const { authorizations, fetch } = setup();
		const client = new ZoomApi({ fetch, token: () => "client" });
		await client.api.archiving.listArchivedFiles({ config: { token: "call" } });
		expect(authorizations).toEqual(["Bearer call"]);
	});

	it("rejects with what the token function threw, before calling fetch", async () => {
		const { authorizations, fetch } = setup();
		const failure = new Error("refresh failed");
		const client = new ZoomApi({
			fetch,
			token: async () => {
				throw failure;
			},
		});
		await expect(client.request("GET /archive_files")).rejects.toBe(failure);
		await expect(client.api.archiving.listArchivedFiles()).rejects.toBe(failure);
		expect(authorizations).toEqual([]);
	});
});

describe("ZoomApi response headers", () => {
	function setup() {
		const fetch: FetchImpl = async () =>
			new Response(
				JSON.stringify({ code: 429, message: "You have reached the maximum daily rate limit" }),
				{
					status: 429,
					headers: { "content-type": "application/json", "retry-after": "2026-11-03T00:00:00Z" },
				},
			) as never;
		return new ZoomApi({ token: "token", fetch });
	}

	it("reads the headers of a rate limited response from the api proxy", async () => {
		const client = setup();
		const seen: ResponseInfo[] = [];

		await expect(
			client.api.archiving.listArchivedFiles({
				config: { onResponse: (response) => seen.push(response) },
			}),
		).rejects.toMatchObject({ status: 429 });
		expect(seen.map(({ status, headers }) => [status, headers.get("Retry-After")])).toEqual([
			[429, "2026-11-03T00:00:00Z"],
		]);
	});

	it("passes onResponse through request()", async () => {
		const client = setup();
		const retryAfter: (string | null)[] = [];

		await expect(
			client.request("GET /archive_files", {
				config: { onResponse: ({ headers }) => retryAfter.push(headers.get("retry-after")) },
			}),
		).rejects.toMatchObject({ status: 429 });
		expect(retryAfter).toEqual(["2026-11-03T00:00:00Z"]);
	});
});

describe("ZoomApi baseUrl", () => {
	function setup(options: { baseUrl?: string } = {}) {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new ZoomApi({ token: "token", fetch, ...options }) };
	}

	it("sends request() and api proxy calls to the constructor's baseUrl", async () => {
		const { urls, client } = setup({ baseUrl: "https://api.zoomgov.com/v2/" });
		await client.request("GET /archive_files");
		await client.api.archiving.listArchivedFiles();
		expect(urls).toEqual([
			"https://api.zoomgov.com/v2/archive_files",
			"https://api.zoomgov.com/v2/archive_files",
		]);
	});

	it("lets a call's config.baseUrl replace the constructor's", async () => {
		const { urls, client } = setup({ baseUrl: "https://ignored.test" });
		await client.request("GET /archive_files", { config: { baseUrl: "https://per-call.test" } });
		expect(urls).toEqual(["https://per-call.test/archive_files"]);
	});

	it("defaults to the API's own URL", async () => {
		const { urls, client } = setup();
		await client.request("GET /archive_files");
		expect(urls).toEqual(["https://api.zoom.us/v2/archive_files"]);
	});
});
