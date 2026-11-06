import { Client } from "@modelcontextprotocol/client";
import { InMemoryTransport } from "@modelcontextprotocol/server";
import { describe, expect, it } from "vitest";
import { mcpTools } from "../admin/generated/mcp-tools";
import type { FetchImpl, RequestInit } from "../utils/fetch";
import { createKeycloakMcpServer, readKeycloakMcpConfig } from "./server";

const realmTools = mcpTools.filter((tool) => tool.request.includes("{realm}"));

const baseEnv = { KEYCLOAK_URL: "https://keycloak.example.com", KEYCLOAK_REALM: "acme" };

type Call = { url: string; init?: RequestInit };

async function connect(
	env: Record<string, string>,
	respond: (call: Call) => Response | Promise<Response>,
) {
	const calls: Call[] = [];
	const fetch: FetchImpl = async (url, init) => {
		calls.push({ url, init });
		return respond({ url, init });
	};
	const server = createKeycloakMcpServer({ config: readKeycloakMcpConfig(env), fetch });
	const client = new Client({ name: "test", version: "1.0.0" });
	const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
	await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
	return { client, calls };
}

const json = (body: unknown, init?: ResponseInit) =>
	new Response(JSON.stringify(body), { headers: { "content-type": "application/json" }, ...init });

function textOf(result: Awaited<ReturnType<Client["callTool"]>>): string {
	const [first] = "content" in result && Array.isArray(result.content) ? result.content : [];
	return first?.type === "text" ? first.text : "";
}

describe("readKeycloakMcpConfig", () => {
	it("refuses to start without credentials", () => {
		expect(() => readKeycloakMcpConfig(baseEnv)).toThrow(
			"Set KEYCLOAK_TOKEN, or KEYCLOAK_CLIENT_ID and KEYCLOAK_CLIENT_SECRET",
		);
	});

	it("refuses to start without the realm", () => {
		expect(() =>
			readKeycloakMcpConfig({ KEYCLOAK_URL: baseEnv.KEYCLOAK_URL, KEYCLOAK_TOKEN: "t" }),
		).toThrow("KEYCLOAK_REALM");
	});

	it("refuses an unknown resource and names the known ones", () => {
		expect(() =>
			readKeycloakMcpConfig({
				...baseEnv,
				KEYCLOAK_TOKEN: "t",
				KEYCLOAK_MCP_RESOURCES: "users,user",
			}),
		).toThrow(/Unknown resource user; use one of .*\busers\b/);
	});

	it("refuses a resource list that names nothing", () => {
		expect(() =>
			readKeycloakMcpConfig({ ...baseEnv, KEYCLOAK_TOKEN: "t", KEYCLOAK_MCP_RESOURCES: " , " }),
		).toThrow("KEYCLOAK_MCP_RESOURCES names no resource");
	});

	it.each([".", ".."])(
		"refuses the realm %s, which would resolve away its own URL segment",
		(realm) => {
			expect(() =>
				readKeycloakMcpConfig({ ...baseEnv, KEYCLOAK_REALM: realm, KEYCLOAK_TOKEN: "t" }),
			).toThrow("KEYCLOAK_REALM cannot be . or ..");
		},
	);
});

describe("keycloak-api-mcp", () => {
	it("lists only read tools unless KEYCLOAK_MCP_ALLOW_WRITES is 1", async () => {
		const reads = realmTools
			.filter((tool) => tool.annotations.readOnlyHint)
			.map((tool) => tool.name);

		const readOnly = await connect({ ...baseEnv, KEYCLOAK_TOKEN: "t" }, () => json({}));
		const { tools } = await readOnly.client.listTools();
		expect(tools.map((tool) => tool.name).sort()).toEqual([...reads].sort());
		expect(tools.every((tool) => tool.annotations?.readOnlyHint)).toBe(true);

		const writable = await connect(
			{ ...baseEnv, KEYCLOAK_TOKEN: "t", KEYCLOAK_MCP_ALLOW_WRITES: "1" },
			() => json({}),
		);
		const all = await writable.client.listTools();
		expect(all.tools).toHaveLength(realmTools.length);
		const deleteUser = all.tools.find((tool) => tool.name === "delete_users_by_user_id");
		expect(deleteUser?.annotations).toMatchObject({ readOnlyHint: false, destructiveHint: true });
	});

	it("lists only the tools of the resources in KEYCLOAK_MCP_RESOURCES", async () => {
		const inResources = (request: string) =>
			/^\w+ \/admin\/realms\/\{realm\}(\/(users|groups)(\/.*)?)?$/.test(request) &&
			!/^\w+ \/admin\/realms\/\{realm\}$/.test(request);
		const expected = (writes: boolean) =>
			realmTools
				.filter((tool) => inResources(tool.request) && (writes || tool.annotations.readOnlyHint))
				.map((tool) => tool.name)
				.sort();

		const env = { ...baseEnv, KEYCLOAK_TOKEN: "t", KEYCLOAK_MCP_RESOURCES: "users, groups" };
		const reads = await (await connect(env, () => json({}))).client.listTools();
		expect(reads.tools.map((tool) => tool.name).sort()).toEqual(expected(false));
		expect(reads.tools.map((tool) => tool.name)).not.toContain("get_users_management_permissions");

		const writable = await connect({ ...env, KEYCLOAK_MCP_ALLOW_WRITES: "1" }, () => json({}));
		const all = await writable.client.listTools();
		expect(all.tools.map((tool) => tool.name).sort()).toEqual(expected(true));
		expect(all.tools.length).toBeLessThan(128);
	});

	it("selects the operations on the realm itself as the realm resource", async () => {
		const { client } = await connect(
			{ ...baseEnv, KEYCLOAK_TOKEN: "t", KEYCLOAK_MCP_RESOURCES: "realm" },
			() => json({}),
		);
		const { tools } = await client.listTools();
		expect(tools.map((tool) => tool.name)).toEqual(["get_admin_realms_by_realm"]);
	});

	it("takes the realm from the environment, not from the tool arguments", async () => {
		const { client, calls } = await connect({ ...baseEnv, KEYCLOAK_TOKEN: "t" }, () =>
			json([{ id: "u1", username: "ada" }]),
		);
		const { tools } = await client.listTools();
		const getUser = tools.find((tool) => tool.name === "get_users_by_user_id");
		expect(getUser?.inputSchema.properties?.pathParams).toMatchObject({
			properties: { userId: { type: "string" } },
		});
		expect(JSON.stringify(getUser?.inputSchema)).not.toContain("realm");

		const result = await client.callTool({
			name: "get_users",
			arguments: { queryParams: { search: "ada" } },
		});
		expect(result.isError).toBeFalsy();
		expect(JSON.parse(textOf(result))).toEqual([{ id: "u1", username: "ada" }]);
		expect(calls[0]?.url).toBe("https://keycloak.example.com/admin/realms/acme/users?search=ada");
		expect(calls[0]?.init?.headers).toMatchObject({ Authorization: "Bearer t" });
	});

	it("lists no tool outside the realm, such as listing or importing realms", async () => {
		const { client } = await connect(
			{ ...baseEnv, KEYCLOAK_TOKEN: "t", KEYCLOAK_MCP_ALLOW_WRITES: "1" },
			() => json({}),
		);
		const names = (await client.listTools()).tools.map((tool) => tool.name);
		expect(mcpTools.map((tool) => tool.name)).toContain("get_admin_realms");
		expect(names).not.toContain("get_admin_realms");
		expect(names).not.toContain("post_admin_realms");
	});

	it.each([
		["get_group_by_path_by_path", {}, "../../master/users"],
		["get_group_by_path_by_path", {}, "%2e%2e/%2e%2e/master/users"],
		[
			"get_organizations_groups_group_by_path_by_path",
			{ orgId: "o1" },
			"../../../../../master/users",
		],
	])("refuses %s with a path that leaves the realm (%#)", async (name, pathParams, path) => {
		const { client, calls } = await connect({ ...baseEnv, KEYCLOAK_TOKEN: "t" }, () => json({}));
		const result = await client.callTool({
			name,
			arguments: { pathParams: { ...pathParams, path } },
		});
		expect(result.isError).toBe(true);
		expect(textOf(result)).toContain("outside the realm acme");
		expect(calls).toEqual([]);
	});

	it("still sends a group path inside the realm", async () => {
		const { client, calls } = await connect({ ...baseEnv, KEYCLOAK_TOKEN: "t" }, () =>
			json({ id: "g1" }),
		);
		const result = await client.callTool({
			name: "get_group_by_path_by_path",
			arguments: { pathParams: { path: "parent/child" } },
		});
		expect(result.isError).toBeFalsy();
		expect(calls.map((call) => call.url)).toEqual([
			"https://keycloak.example.com/admin/realms/acme/group-by-path/parent/child",
		]);
	});

	it("scopes the realm under a base URL with a path", async () => {
		const { client, calls } = await connect(
			{ ...baseEnv, KEYCLOAK_URL: "https://keycloak.example.com/auth/", KEYCLOAK_TOKEN: "t" },
			() => json([]),
		);
		expect((await client.callTool({ name: "get_groups", arguments: {} })).isError).toBeFalsy();
		const traversal = await client.callTool({
			name: "get_group_by_path_by_path",
			arguments: { pathParams: { path: "../../master/users" } },
		});
		expect(traversal.isError).toBe(true);
		expect(calls.map((call) => call.url)).toEqual([
			"https://keycloak.example.com/auth/admin/realms/acme/groups",
		]);
	});

	it("returns an HTTP error as a tool error with the status and Keycloak's message", async () => {
		const { client } = await connect({ ...baseEnv, KEYCLOAK_TOKEN: "t" }, () =>
			json({ error: "User not found" }, { status: 404 }),
		);
		const result = await client.callTool({
			name: "get_users_by_user_id",
			arguments: { pathParams: { userId: "missing" } },
		});
		expect(result.isError).toBe(true);
		expect(textOf(result)).toContain("404");
		expect(textOf(result)).toContain("User not found");
	});

	it("gets a client credentials token once and reuses it", async () => {
		const { client, calls } = await connect(
			{ ...baseEnv, KEYCLOAK_CLIENT_ID: "mcp", KEYCLOAK_CLIENT_SECRET: "s3cret" },
			({ url }) =>
				url.endsWith("/protocol/openid-connect/token")
					? json({ access_token: "minted", expires_in: 300 })
					: json([]),
		);
		await client.callTool({ name: "get_groups", arguments: {} });
		await client.callTool({ name: "get_groups", arguments: {} });

		const tokenCalls = calls.filter((call) => call.url.endsWith("/token"));
		expect(tokenCalls).toHaveLength(1);
		expect(tokenCalls[0]?.url).toBe(
			"https://keycloak.example.com/realms/acme/protocol/openid-connect/token",
		);
		expect(new URLSearchParams(String(tokenCalls[0]?.init?.body)).get("grant_type")).toBe(
			"client_credentials",
		);
		const apiCalls = calls.filter((call) => !call.url.endsWith("/token"));
		expect(apiCalls.map((call) => call.init?.headers)).toEqual([
			expect.objectContaining({ Authorization: "Bearer minted" }),
			expect.objectContaining({ Authorization: "Bearer minted" }),
		]);
	});

	const clientCredentials = {
		...baseEnv,
		KEYCLOAK_CLIENT_ID: "mcp",
		KEYCLOAK_CLIENT_SECRET: "s3cret",
	};
	const isTokenCall = (call: Call) => call.url.endsWith("/protocol/openid-connect/token");

	it("shares one token request between parallel calls on a cold cache", async () => {
		const { client, calls } = await connect(clientCredentials, (call) =>
			isTokenCall(call)
				? new Promise((resolve) =>
						setTimeout(() => resolve(json({ access_token: "minted", expires_in: 300 })), 20),
					)
				: json([]),
		);
		const results = await Promise.all([
			client.callTool({ name: "get_groups", arguments: {} }),
			client.callTool({ name: "get_users", arguments: {} }),
		]);

		expect(results.map((result) => result.isError)).toEqual([undefined, undefined]);
		expect(calls.filter(isTokenCall)).toHaveLength(1);
		expect(calls.filter((call) => !isTokenCall(call)).map((call) => call.init?.headers)).toEqual([
			expect.objectContaining({ Authorization: "Bearer minted" }),
			expect.objectContaining({ Authorization: "Bearer minted" }),
		]);
	});

	it("asks for a new token after a failed token request", async () => {
		let attempt = 0;
		const { client, calls } = await connect(clientCredentials, (call) => {
			if (!isTokenCall(call)) return json([]);
			attempt += 1;
			return attempt === 1
				? json({ error: "temporarily_unavailable" }, { status: 503 })
				: json({ access_token: "minted", expires_in: 300 });
		});
		const failed = await client.callTool({ name: "get_groups", arguments: {} });
		expect(failed.isError).toBe(true);
		expect(textOf(failed)).toContain("Keycloak token request returned 503");

		const retried = await client.callTool({ name: "get_groups", arguments: {} });
		expect(retried.isError).toBeFalsy();
		expect(calls.filter(isTokenCall)).toHaveLength(2);
	});

	it("reuses a token whose lifetime is shorter than the renewal margin", async () => {
		const { client, calls } = await connect(clientCredentials, (call) =>
			isTokenCall(call) ? json({ access_token: "short", expires_in: 20 }) : json([]),
		);
		await client.callTool({ name: "get_groups", arguments: {} });
		await client.callTool({ name: "get_groups", arguments: {} });

		expect(calls.filter(isTokenCall)).toHaveLength(1);
	});

	it("reports the Location of a created resource", async () => {
		const { client } = await connect(
			{ ...baseEnv, KEYCLOAK_TOKEN: "t", KEYCLOAK_MCP_ALLOW_WRITES: "1" },
			() =>
				new Response(null, {
					status: 201,
					headers: { Location: "https://keycloak.example.com/admin/realms/acme/users/u2" },
				}),
		);
		const result = await client.callTool({
			name: "post_users",
			arguments: { body: { username: "grace" } },
		});
		expect(textOf(result)).toContain(
			"Location: https://keycloak.example.com/admin/realms/acme/users/u2",
		);
	});
});
