import { type CallToolResult, McpServer, type ToolAnnotations } from "@modelcontextprotocol/server";
import { z } from "zod";
import packageJson from "../../package.json" with { type: "json" };
import { operationsByPath } from "../admin/generated/components";
import { mcpTools } from "../admin/generated/mcp-tools";
import type { FetchImpl } from "../utils/fetch";
import { ApiResponseError, type ResponseInfo } from "../utils/fetcher";
import { findOperation } from "../utils/operation";

const optional = z.string().min(1).optional();

const configSchema = z
	.object({
		KEYCLOAK_URL: z.url(),
		// A dot segment would resolve the realm prefix away, so the URL guard below could not hold.
		KEYCLOAK_REALM: z
			.string()
			.min(1)
			.refine((realm) => realm !== "." && realm !== "..", "KEYCLOAK_REALM cannot be . or .."),
		KEYCLOAK_TOKEN: optional,
		KEYCLOAK_CLIENT_ID: optional,
		KEYCLOAK_CLIENT_SECRET: optional,
		KEYCLOAK_TOKEN_REALM: optional,
		KEYCLOAK_MCP_ALLOW_WRITES: optional,
	})
	.refine((env) => env.KEYCLOAK_TOKEN || (env.KEYCLOAK_CLIENT_ID && env.KEYCLOAK_CLIENT_SECRET), {
		message: "Set KEYCLOAK_TOKEN, or KEYCLOAK_CLIENT_ID and KEYCLOAK_CLIENT_SECRET",
	});

export type KeycloakMcpConfig = z.infer<typeof configSchema>;

/** Reads the server's settings from the environment; credentials are never tool arguments. */
export function readKeycloakMcpConfig(env: Record<string, string | undefined>): KeycloakMcpConfig {
	const result = configSchema.safeParse(env);
	if (!result.success) throw new Error(`keycloak-api-mcp:\n${z.prettifyError(result.error)}`);
	return result.data;
}

type ToolEntry = {
	name: string;
	request: string;
	description: string;
	annotations: ToolAnnotations;
	params: {
		pathParams?: z.ZodObject;
		queryParams?: z.ZodType;
		headers?: z.ZodType;
		body?: z.ZodType;
	};
};

// The instance-level operations (GET and POST /admin/realms) are not scoped to one realm.
const tools: readonly ToolEntry[] = mcpTools.filter((tool) => tool.request.includes("{realm}"));

const tokenResponse = z.object({ access_token: z.string(), expires_in: z.number() });

function tokenSource(config: KeycloakMcpConfig, fetchImpl: FetchImpl): () => Promise<string> {
	const { KEYCLOAK_TOKEN, KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET } = config;
	if (KEYCLOAK_TOKEN) return async () => KEYCLOAK_TOKEN;

	const realm = config.KEYCLOAK_TOKEN_REALM ?? config.KEYCLOAK_REALM;
	const url = `${config.KEYCLOAK_URL.replace(/\/+$/, "")}/realms/${encodeURIComponent(realm)}/protocol/openid-connect/token`;
	let cached: { token: string; expiresAt: number } | undefined;

	return async () => {
		if (cached && Date.now() < cached.expiresAt) return cached.token;
		const response = await fetchImpl(url, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				grant_type: "client_credentials",
				client_id: KEYCLOAK_CLIENT_ID ?? "",
				client_secret: KEYCLOAK_CLIENT_SECRET ?? "",
			}).toString(),
		});
		if (!response.ok) {
			throw new Error(
				`Keycloak token request returned ${response.status}: ${(await response.text()).slice(0, 200)}`,
			);
		}
		const { access_token, expires_in } = tokenResponse.parse(await response.json());
		// Renewed 30 seconds early so a token does not expire between the check and the call.
		cached = { token: access_token, expiresAt: Date.now() + (expires_in - 30) * 1000 };
		return access_token;
	};
}

// Dot segments in a path parameter survive encoding and fetch resolves them, so check the resolved URL.
function realmScopedFetch(config: KeycloakMcpConfig, fetchImpl: FetchImpl): FetchImpl {
	const base = config.KEYCLOAK_URL.replace(/\/+$/, "");
	const scope = new URL(`${base}/admin/realms/${encodeURIComponent(config.KEYCLOAK_REALM)}`);
	return (url, init) => {
		const target = new URL(url);
		const inRealm =
			target.origin === scope.origin &&
			(target.pathname === scope.pathname || target.pathname.startsWith(`${scope.pathname}/`));
		if (!inRealm) {
			return Promise.reject(
				new Error(`Refused ${target.pathname}: it is outside the realm ${config.KEYCLOAK_REALM}`),
			);
		}
		return fetchImpl(url, init);
	};
}

// The realm comes from KEYCLOAK_REALM and is not a tool argument.
function inputSchema({ params }: ToolEntry): z.ZodObject {
	const pathParams = params.pathParams?.omit({ realm: true });
	return z.object({
		...(pathParams && Object.keys(pathParams.shape).length > 0 ? { pathParams } : {}),
		...(params.queryParams ? { queryParams: params.queryParams.optional() } : {}),
		...(params.headers ? { headers: params.headers.optional() } : {}),
		...(params.body ? { body: params.body } : {}),
	});
}

function objectOf(value: unknown): Record<string, unknown> {
	return typeof value === "object" && value !== null
		? Object.fromEntries(Object.entries(value))
		: {};
}

function resultText(result: unknown, response: ResponseInfo | undefined): string {
	const status = response?.status ?? 200;
	const location = response?.headers.get("Location");
	let text: string;
	if (result === undefined || result === null || result === "") text = `${status} with no body.`;
	else if (result instanceof Blob)
		text = `${status} with ${result.size} bytes of ${result.type || "binary data"}.`;
	else text = typeof result === "string" ? result : JSON.stringify(result, null, 2);
	return location ? `${text}\nLocation: ${location}` : text;
}

function errorResult(error: unknown): CallToolResult {
	let text = error instanceof Error ? error.message : String(error);
	if (error instanceof ApiResponseError && typeof error.payload !== "string") {
		text += `\n${JSON.stringify(error.payload)}`;
	}
	return { isError: true, content: [{ type: "text", text }] };
}

export interface KeycloakMcpServerOptions {
	config: KeycloakMcpConfig;
	fetch?: FetchImpl;
}

/** An MCP server with one tool per Keycloak admin operation on KEYCLOAK_REALM, read-only unless KEYCLOAK_MCP_ALLOW_WRITES is 1. */
export function createKeycloakMcpServer({
	config,
	fetch: fetchImpl = fetch as FetchImpl,
}: KeycloakMcpServerOptions): McpServer {
	const allowWrites = config.KEYCLOAK_MCP_ALLOW_WRITES === "1";
	const realm = config.KEYCLOAK_REALM;
	const token = tokenSource(config, fetchImpl);
	const toolFetch = realmScopedFetch(config, fetchImpl);

	const server = new McpServer(
		{ name: "keycloak-api-mcp", version: packageJson.version },
		{
			capabilities: { tools: {} },
			instructions: `Tools call the Keycloak admin REST API of the realm ${realm}.${allowWrites ? "" : " Only read tools are enabled."}`,
		},
	);

	for (const tool of tools) {
		if (!allowWrites && !tool.annotations.readOnlyHint) continue;
		const operation = findOperation(operationsByPath, tool.request);

		server.registerTool(
			tool.name,
			{
				description: tool.description,
				inputSchema: inputSchema(tool),
				annotations: tool.annotations,
			},
			async (args) => {
				let response: ResponseInfo | undefined;
				try {
					const result = await operation({
						...args,
						pathParams: { ...objectOf(args.pathParams), realm },
						config: {
							baseUrl: config.KEYCLOAK_URL,
							token: await token(),
							fetchImpl: toolFetch,
							onResponse: (info) => {
								response = info;
							},
						},
					});
					return { content: [{ type: "text", text: resultText(result, response) }] };
				} catch (error) {
					return errorResult(error);
				}
			},
		);
	}

	return server;
}
