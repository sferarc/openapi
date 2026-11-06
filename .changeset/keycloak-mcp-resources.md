---
"keycloak-api": minor
---

Add `KEYCLOAK_MCP_RESOURCES` to `keycloak-api-mcp`, a comma separated list of resources such as `users,groups,roles` that limits the listed tools to them, so the server fits under the 128 tools a VS Code chat request can enable.
