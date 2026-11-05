import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createKubb, type UserConfig } from "kubb";
import { afterEach, describe, expect, it } from "vitest";
import { createConfig } from "../index";
import type { McpTools } from "../plugin";
import { toolName } from "./mcp-tools";

const ok = { "200": { description: "ok" } };
const realm = { name: "realm", in: "path", required: true, schema: { type: "string" } };
const userId = { name: "user-id", in: "path", required: true, schema: { type: "string" } };

const spec = {
	openapi: "3.0.3",
	info: { title: "Test API", version: "1.0.0" },
	paths: {
		"/admin/realms": {
			get: { operationId: "listRealms", summary: "List realms", responses: ok },
		},
		"/admin/realms/{realm}/users": {
			get: {
				operationId: "listUsers",
				summary: "List users. Filters by query.",
				parameters: [realm, { name: "max", in: "query", schema: { type: "integer" } }],
				responses: ok,
			},
			post: {
				operationId: "createUser",
				description: "Creates a user\nin the realm\n\nSecond paragraph.",
				parameters: [realm],
				requestBody: {
					content: { "application/json": { schema: { type: "object" } } },
				},
				responses: ok,
			},
		},
		"/admin/realms/{realm}/users/{user-id}": {
			delete: { operationId: "deleteUser", parameters: [realm, userId], responses: ok },
		},
		"/admin/realms/{realm}/members/{user-id}/groups": {
			get: { operationId: "memberGroups", parameters: [realm, userId], responses: ok },
		},
		"/admin/realms/{realm}/teams/members/groups": {
			get: { operationId: "teamGroups", parameters: [realm], responses: ok },
		},
		"/admin/realms/{realm}/teams/{team}/members/groups": {
			get: {
				operationId: "teamMemberGroups",
				parameters: [
					realm,
					{ name: "team", in: "path", required: true, schema: { type: "string" } },
				],
				responses: ok,
			},
		},
	},
};

const roots: string[] = [];

afterEach(() => {
	for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

async function generate(mcpTools?: McpTools, input: UserConfig["input"] = spec) {
	const root = mkdtempSync(join(tmpdir(), "openapi-utils-mcp-tools-"));
	roots.push(root);
	const config = createConfig({ outputPath: "./gen", importPath: "../fetcher", mcpTools });
	const { diagnostics } = await createKubb({ ...config, root, input }).safeBuild();
	const file = join(root, "gen/mcp-tools.ts");
	return {
		errors: diagnostics.filter((diagnostic) => diagnostic.severity === "error"),
		source: existsSync(file) ? readFileSync(file, "utf8") : undefined,
	};
}

describe("toolName", () => {
	const options = { stripPathPrefix: "/admin/realms/{realm}" };

	it("keeps literal segments and a param that ends the path", () => {
		expect(toolName("GET", "/admin/realms/{realm}/users/{user-id}/groups", options)).toBe(
			"get_users_groups",
		);
		expect(toolName("DELETE", "/admin/realms/{realm}/users/{user-id}", options)).toBe(
			"delete_users_by_user_id",
		);
		expect(toolName("GET", "/admin/realms/{realm}/localization/{locale}/{key}", options)).toBe(
			"get_localization_by_locale_by_key",
		);
	});

	it("strips the prefix only at a segment boundary", () => {
		expect(toolName("GET", "/admin/realms", options)).toBe("get_admin_realms");
		expect(toolName("GET", "/admin/realms/{realm}", options)).toBe("get_admin_realms_by_realm");
		expect(toolName("GET", "/admin/realms/{realm}-events", options)).toBe(
			"get_admin_realms_realm_events",
		);
	});
});

describe("mcp-tools.ts", () => {
	it("is not written unless a client opts in", async () => {
		const { errors, source } = await generate();
		expect(errors).toEqual([]);
		expect(source).toBeUndefined();
	});

	it("lists one tool per operation with its request, annotations and zod schemas", async () => {
		const { errors, source } = await generate({ stripPathPrefix: "/admin/realms/{realm}" });
		expect(errors).toEqual([]);

		expect(source).toMatch(/import \{[^}]*listUsersQuerySchema[^}]*\} from '\.\/schemas'/);
		expect(source).toContain(`\t{
		name: "get_users",
		request: "GET /admin/realms/{realm}/users",
		description: "List users. Path parameters: realm.",
		annotations: { readOnlyHint: true },
		params: { pathParams: listUsersPathSchema, queryParams: listUsersQuerySchema },
	}`);
		expect(source).toContain(`\t{
		name: "post_users",
		request: "POST /admin/realms/{realm}/users",
		description: "Creates a user in the realm. Path parameters: realm.",
		annotations: { readOnlyHint: false, destructiveHint: false },
		params: { pathParams: createUserPathSchema, body: createUserBodySchema },
	}`);
		expect(source).toContain(`name: "delete_users_by_user_id",
		request: "DELETE /admin/realms/{realm}/users/{user-id}",
		description: "Path parameters: realm, user-id.",
		annotations: { readOnlyHint: false, destructiveHint: true },`);
		expect(source).toContain(`name: "get_admin_realms",
		request: "GET /admin/realms",
		description: "List realms.",
		annotations: { readOnlyHint: true },
		params: {},`);
	});

	it("names every path param of the operations whose short names collide", async () => {
		const { source } = await generate({ stripPathPrefix: "/admin/realms/{realm}" });

		expect(source).toContain('name: "get_members_groups"');
		expect(source).toContain('name: "get_teams_members_groups"');
		expect(source).toContain('name: "get_teams_by_team_members_groups"');
	});

	it("fails the build when a name is still taken", async () => {
		const clash = {
			...spec,
			paths: {
				"/a-b": { get: { operationId: "dash", responses: ok } },
				"/a_b": { get: { operationId: "underscore", responses: ok } },
			},
		};
		const { errors } = await generate({}, clash);
		expect(errors.map((error) => error.message).join("\n")).toContain(
			'GET /a_b: "get_a_b" is already taken',
		);
	});
});
