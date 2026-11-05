import { Client } from "@modelcontextprotocol/client";
import { InMemoryTransport } from "@modelcontextprotocol/server";
import { describe, expect, it } from "vitest";
import { mcpTools } from "../admin/generated/mcp-tools";
import type { FetchImpl, RequestInit } from "../utils/fetch";
import { createKeycloakMcpServer, readKeycloakMcpConfig } from "./server";

const baseEnv = { KEYCLOAK_URL: "https://keycloak.example.com", KEYCLOAK_REALM: "acme" };

type Call = { url: string; init?: RequestInit };

async function connect(env: Record<string, string>, respond: (call: Call) => Response) {
	const calls: Call[] = [];
	const fetch: FetchImpl = async (url, init) => {
		calls.push({ url, init });
		return respond({ url, init }) as never;
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
});

describe("keycloak-api-mcp", () => {
	it("lists only read tools unless KEYCLOAK_MCP_ALLOW_WRITES is 1", async () => {
		const reads = mcpTools.filter((tool) => tool.annotations.readOnlyHint).map((tool) => tool.name);

		const readOnly = await connect({ ...baseEnv, KEYCLOAK_TOKEN: "t" }, () => json({}));
		const { tools } = await readOnly.client.listTools();
		expect(tools.map((tool) => tool.name).sort()).toEqual([...reads].sort());
		expect(tools.every((tool) => tool.annotations?.readOnlyHint)).toBe(true);

		const writable = await connect(
			{ ...baseEnv, KEYCLOAK_TOKEN: "t", KEYCLOAK_MCP_ALLOW_WRITES: "1" },
			() => json({}),
		);
		const all = await writable.client.listTools();
		expect(all.tools).toHaveLength(mcpTools.length);
		const deleteUser = all.tools.find((tool) => tool.name === "delete_users_by_user_id");
		expect(deleteUser?.annotations).toMatchObject({ readOnlyHint: false, destructiveHint: true });
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
