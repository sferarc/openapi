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

	it("types request() params from the operation", () => {
		const { client } = setup();
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			// @ts-expect-error pathParams needs realm
			client.request("GET /admin/realms/{realm}", { pathParams: {} }),
			// @ts-expect-error the operation has no such parameter
			client.request("GET /admin/realms/{realm}", { pathParams: { realm: "a" }, nope: 1 }),
		];
		expect(typeChecks).toBeTypeOf("function");
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

	it("types request() params from the operation", () => {
		const { client } = setup();
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			// @ts-expect-error pathParams needs providerId
			client.request("GET /account/linked-accounts/{providerId}", { pathParams: {} }),
			client.request("GET /account/linked-accounts/{providerId}", {
				pathParams: { providerId: "a" },
				// @ts-expect-error the operation has no such parameter
				nope: 1,
			}),
		];
		expect(typeChecks).toBeTypeOf("function");
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /account/", {});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/realms\/main\/account\/$/);
	});

	it("joins a base URL that ends in a slash without doubling it", async () => {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		const client = new KeycloakAccountApi({
			baseUrl: "https://keycloak.example.com/",
			realm: "main",
			token: "token",
			fetch,
		});
		await client.request("GET /account/", {});
		expect(urls).toEqual(["https://keycloak.example.com/realms/main/account/"]);
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
		const signals: unknown[] = [];
		const fetch: FetchImpl = async (_url, init) => {
			headers.push(init?.headers);
			signals.push(init?.signal);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		const options = { baseUrl: "https://keycloak.example.com", token: "token", fetch };
		return {
			headers,
			signals,
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

	it("passes the caller's signal to fetch from the admin and account clients", async () => {
		const { signals, admin, account } = setup();
		const { signal } = new AbortController();
		await admin.request("GET /admin/realms", { config: { signal } });
		await account.request("GET /account/", { config: { signal } });
		expect(signals).toEqual([signal, signal]);
	});
});

describe("Keycloak raw string bodies", () => {
	function setup() {
		const requests: { headers: unknown; body: unknown }[] = [];
		const fetch: FetchImpl = async (_url, init) => {
			requests.push({ headers: init?.headers, body: init?.body });
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return {
			requests,
			admin: new KeycloakAdminApi({
				baseUrl: "https://keycloak.example.com",
				token: "token",
				fetch,
			}),
		};
	}

	const pathParams = { realm: "realm", clientUuid: "client" };
	const policy = { name: "admins", type: "role", logic: "POSITIVE" as const };

	it.each([
		"POST /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/policy",
		"POST /admin/realms/{realm}/clients/{clientUuid}/authz/resource-server/permission",
	] as const)("sends %s a policy as a JSON object", async (endpoint) => {
		const { requests, admin } = setup();
		await admin.request(endpoint, { pathParams, body: policy });
		// PolicyService parses the raw text, so a JSON-quoted string would fail to deserialize.
		expect(requests).toEqual([
			{
				headers: expect.objectContaining({ "Content-Type": "application/json" }),
				body: JSON.stringify(policy),
			},
		]);
	});

	it("sends a client description as unquoted text", async () => {
		const { requests, admin } = setup();
		const description = '{"client_name":"app","redirect_uris":["https://app.example.com/cb"]}';
		await admin.request("POST /admin/realms/{realm}/client-description-converter", {
			pathParams: { realm: "realm" },
			body: description,
		});
		expect(requests).toEqual([
			{ headers: expect.objectContaining({ "Content-Type": "text/plain" }), body: description },
		]);
	});
});

describe("Keycloak workflow resource type", () => {
	function setup() {
		const requests: { url: string; method: string | undefined }[] = [];
		const fetch: FetchImpl = async (url, init) => {
			requests.push({ url, method: init?.method });
			return new Response(null, { status: 204 }) as never;
		};
		return {
			requests,
			admin: new KeycloakAdminApi({
				baseUrl: "https://keycloak.example.com",
				token: "token",
				fetch,
			}),
		};
	}

	it.each(["activate", "deactivate"] as const)(
		"sends the resource type of %s by its enum name",
		async (action) => {
			const { requests, admin } = setup();
			await admin.request(
				`POST /admin/realms/{realm}/workflows/{id}/${action}/{type}/{resourceId}`,
				{
					pathParams: { realm: "realm", id: "workflow", type: "USERS", resourceId: "user" },
				},
			);
			// JAX-RS binds the segment with ResourceType.valueOf, so it must be the bare name.
			expect(requests).toEqual([
				{
					url: `https://keycloak.example.com/admin/realms/realm/workflows/workflow/${action}/USERS/user`,
					method: "POST",
				},
			]);
		},
	);

	it("types the resource type as the ResourceType names", () => {
		const { admin } = setup();
		const endpoint = "POST /admin/realms/{realm}/workflows/{id}/activate/{type}/{resourceId}";
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			admin.request(endpoint, {
				pathParams: { realm: "realm", id: "workflow", type: "CLIENTS", resourceId: "client" },
			}),
			admin.request(endpoint, {
				// @ts-expect-error ResourceType has no such name
				pathParams: { realm: "realm", id: "workflow", type: "users", resourceId: "user" },
			}),
		];
		expect(typeChecks).toBeTypeOf("function");
	});
});
