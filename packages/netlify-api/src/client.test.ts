import { describe, expect, it } from "vitest";
import { NetlifyApi } from "./client";
import type { FetchImpl, RequestInit } from "./utils/fetch";

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

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /sites/{site_id}", { pathParams: { site_id: "" } }),
		).rejects.toThrow("Missing required path parameter: site_id");
		expect(urls).toEqual([]);
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /sites", {});
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

		await expect(client.auth.refreshToken(options)).rejects.toEqual({
			status: 401,
			payload: { error: "invalid_grant" },
		});
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
