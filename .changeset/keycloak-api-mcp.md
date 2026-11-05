---
"keycloak-api": minor
---

Add a `keycloak-api-mcp` bin, a stdio MCP server with one tool per Keycloak admin operation on a realm. It lists only read tools unless `KEYCLOAK_MCP_ALLOW_WRITES=1`, takes the server, realm and credentials from the environment, refuses a call whose URL resolves outside that realm, and returns an HTTP error as a tool error with the status and Keycloak's message. The MCP SDK is bundled into the bin, so importing the client pulls in nothing new.
