import { pluginTsName } from "@kubb/plugin-ts";
import { defineExtension, type Output, type PluginType } from "kubb/kit";
import { extraGenerator } from "./client/extra";
import { mcpToolsGenerator } from "./client/mcp-tools";
import { clientGenerator } from "./client/operations";
import { operationsDocGenerator } from "./client/operations-doc";

/**
 * kubb 5 stable dropped `@kubb/plugin-client` (it never left the 5.0.0 beta line and its
 * published `latest` is still on 4.x). Everything we used it for was the plugin shell — the
 * two generators below have always been ours — so the shell now lives here.
 */
export type OperationsDoc = {
	/** Where the tag namespaces hang, such as `client.api`; `false` leaves the call column out. */
	callPrefix: string | false;
	/** The object whose `request()` takes `"<METHOD> <path>"`, named in the doc's usage line. */
	requestTarget: string;
};

export type McpTools = {
	/** A leading path, such as `/admin/realms/{realm}`, left out of every tool name. */
	stripPathPrefix?: string;
};

type Options = {
	output: Output;
	/** Module the generated operations import `defaultClient`, `FetcherConfig` and `ErrorWrapper` from. */
	importPath: string;
	/** How `OPERATIONS.md` tells a caller to reach each operation. */
	operationsDoc?: OperationsDoc;
	/** Writes `mcp-tools.ts`, one MCP tool per operation over the plugin-zod schemas. */
	mcpTools?: McpTools;
};

export const pluginClientName = "plugin-client";

export type PluginClient = PluginType<typeof pluginClientName, Options, Options>;

declare global {
	namespace Kubb {
		interface PluginRegistry {
			"plugin-client": PluginClient;
		}
	}
}

export const pluginClient = defineExtension<PluginClient>({
	kind: "plugin",
	meta: { name: pluginClientName },
	dependencies: [pluginTsName],
	setup(options, ctx) {
		ctx.addGenerator(clientGenerator, extraGenerator, operationsDocGenerator, mcpToolsGenerator);
		return options;
	},
});
