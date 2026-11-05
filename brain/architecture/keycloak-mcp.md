# Keycloak MCP server

`keycloak-api-mcp`, a `bin` of `keycloak-api`, is a stdio MCP server over the Keycloak admin API (#387, part of #352). Why it is a bin rather than its own package: [[decisions/2026-11-05-keycloak-mcp-bin]].

- The tools come from `src/admin/generated/mcp-tools.ts`, which `packages/keycloak-api/kubb.config.ts` turns on with `mcpTools: { stripPathPrefix: "/admin/realms/{realm}" }` ([[shared-utils]]), so a regeneration of the admin client updates the tools too.
- `src/mcp/server.ts` registers one tool per entry with `{realm}` in its request and calls the matching `operationsByPath` function through `findOperation` (`src/utils/operation.ts`), the lookup `KeycloakAdminApi.request()` uses.
- `src/bin/keycloak-api-mcp.ts` reads the environment, exits 1 naming what is missing, and serves the server with `serveStdio` from `@modelcontextprotocol/server/stdio`, which also answers clients on the 2025 protocol revisions (an `initialize` with `2025-06-18` was answered with that version on 2026-11-05).
- Only tools whose `readOnlyHint` is true, the `GET` and `HEAD` operations, are registered unless `KEYCLOAK_MCP_ALLOW_WRITES` is `1`.
- `KEYCLOAK_REALM` fills `{realm}` in every call, and `realm` is left out of each tool's `pathParams` schema. `GET /admin/realms` and `POST /admin/realms`, the only operations without `{realm}`, are not registered.
- Every tool request goes through `realmScopedFetch` in `src/mcp/server.ts`, which refuses a URL that does not resolve to `/admin/realms/<encoded KEYCLOAK_REALM>` or below it on the `KEYCLOAK_URL` origin. Leaving out the `realm` argument was not enough: the two `group-by-path` reads encode `path` one segment at a time and keep `.`, `..` and `%2e`, and `fetch` resolves them, so `../../master/users` read `/admin/realms/master/users` (review of #390). A `KEYCLOAK_REALM` of `.` or `..` is refused at startup, as it would resolve the prefix away. The token request does not go through the check; its URL comes only from the environment.
- Credentials are environment only: `KEYCLOAK_TOKEN`, or `KEYCLOAK_CLIENT_ID` and `KEYCLOAK_CLIENT_SECRET` for a client credentials grant at `/realms/<KEYCLOAK_TOKEN_REALM or KEYCLOAK_REALM>/protocol/openid-connect/token`. The minted token is kept until 30 seconds before its `expires_in`.
- A tool's arguments are the client's own `pathParams`, `queryParams`, `headers` and `body`. `queryParams` and `headers` are optional; `body` is required where the operation has one.
- A result is the JSON body as text. An empty body reads `<status> with no body.`, and a `Location` header, such as a created user's URL, is appended.
- An `ApiResponseError` comes back as a tool result with `isError`, its message (method, path, status, Keycloak's error) and the JSON payload; a network or token error comes back the same way with its message.
- `src/mcp/server.test.ts` drives the server with the `@modelcontextprotocol/client` `Client` over `InMemoryTransport` against a mocked fetch.
- Whether Claude Code accepts the longest tool names once it prefixes the server name is unknown ([[shared-utils]]).
