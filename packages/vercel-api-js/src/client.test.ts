import { describe, expect, it } from "vitest";
import { VercelApi } from "./client";
import type { FetchImpl, RequestInit } from "./utils/fetch";

describe("VercelApi.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new VercelApi({ token: "token", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /v9/projects/{idOrName}", { pathParams: { idOrName: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/v9\/projects\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /v9/projects/{idOrName}", { pathParams: { idOrName: "" } }),
		).rejects.toThrow("Missing required path parameter: idOrName");
		expect(urls).toEqual([]);
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /v1/access-groups", {});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/v1\/access-groups$/);
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

describe("VercelApi.auth.accessToken", () => {
	const options = {
		code: "the code",
		redirectUri: "https://app.test/cb?x=1",
		clientId: "cid",
		clientSecret: "s&cret",
	};

	it("exchanges the code with a form-encoded POST and no bearer token", async () => {
		const { calls, fetch } = recordFetch(200, {
			access_token: "at",
			token_type: "Bearer",
			installation_id: "icfg_1",
			user_id: "u_1",
			team_id: null,
		});
		const client = new VercelApi({ token: "ignored", fetch });

		const result = await client.auth.accessToken(options);

		expect(calls).toHaveLength(1);
		const [{ url, init }] = calls as [(typeof calls)[number]];
		expect(url).toBe("https://api.vercel.com/v2/oauth/access_token");
		expect(init?.method).toBe("POST");
		expect(init?.headers).toEqual({ "Content-Type": "application/x-www-form-urlencoded" });
		expect(Object.fromEntries(new URLSearchParams(init?.body as string))).toEqual({
			code: "the code",
			redirect_uri: "https://app.test/cb?x=1",
			client_id: "cid",
			client_secret: "s&cret",
		});
		expect(result).toEqual({
			accessToken: "at",
			tokenType: "Bearer",
			installationId: "icfg_1",
			userId: "u_1",
			teamId: null,
		});
	});

	it("rejects with the status on a non-2xx response", async () => {
		const { fetch } = recordFetch(400, { error: "invalid_grant" });
		const client = new VercelApi({ token: null, fetch });

		await expect(client.auth.accessToken(options)).rejects.toEqual({
			status: 400,
			payload: { error: "invalid_grant" },
		});
	});
});

describe("VercelApi.api", () => {
	const fetch: FetchImpl = async () => {
		throw new Error("fetch called");
	};
	const client = new VercelApi({ token: "token", fetch });

	it("ignores Object.prototype names as tags and operations", () => {
		expect(client.api.constructor).toBeUndefined();
		expect(client.api.accessGroups.toString).toBeUndefined();
		expect(client.api.accessGroups.hasOwnProperty).toBeUndefined();
		expect(client.api.accessGroups.readAccessGroup).toBeTypeOf("function");
	});
});
