import { describe, expect, it } from "vitest";
import { KeycloakAccountApi, KeycloakAdminApi } from "./client";
import type { FetchImpl } from "./utils/fetch";

describe("KeycloakAdminApi.request", () => {
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
			client: new KeycloakAdminApi({
				baseUrl: "https://keycloak.example.com",
				token: "token",
				fetch,
			}),
		};
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /admin/realms/{realm}", { pathParams: { realm: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/admin\/realms\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /admin/realms/{realm}", { pathParams: { realm: "" } }),
		).rejects.toThrow("Missing required path parameter: realm");
		expect(urls).toEqual([]);
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /admin/realms", {});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/admin\/realms$/);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});

describe("KeycloakAccountApi.request", () => {
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
			client: new KeycloakAccountApi({
				baseUrl: "https://keycloak.example.com",
				realm: "main",
				token: "token",
				fetch,
			}),
		};
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /account/linked-accounts/{providerId}", {
			pathParams: { providerId: "a/b" },
		});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(
			/\/realms\/main\/account\/linked-accounts\/a%2Fb$/,
		);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /account/linked-accounts/{providerId}", {
				pathParams: { providerId: "" },
			}),
		).rejects.toThrow("Missing required path parameter: providerId");
		expect(urls).toEqual([]);
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /account/", {});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/realms\/main\/account\/$/);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});

describe("Keycloak per-call config", () => {
	function setup() {
		const headers: unknown[] = [];
		const fetch: FetchImpl = async (_url, init) => {
			headers.push(init?.headers);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		const options = { baseUrl: "https://keycloak.example.com", token: "token", fetch };
		return {
			headers,
			admin: new KeycloakAdminApi(options),
			account: new KeycloakAccountApi({ ...options, realm: "realm" }),
		};
	}

	it("sends the caller's headers from the admin client alongside its token", async () => {
		const { headers, admin } = setup();
		await admin.request("GET /admin/realms", { config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("sends the caller's headers from the account client alongside its token", async () => {
		const { headers, account } = setup();
		await account.request("GET /account/", { config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});
});
