#!/usr/bin/env node
/// <reference types="node" />
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { createKeycloakMcpServer, readKeycloakMcpConfig } from "../mcp/server";

let config: ReturnType<typeof readKeycloakMcpConfig>;
try {
	config = readKeycloakMcpConfig(process.env);
} catch (error) {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
}

serveStdio(() => createKeycloakMcpServer({ config }), {
	onerror: (error) => console.error(error),
});
