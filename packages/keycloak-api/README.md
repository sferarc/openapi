# keycloak-api

Unofficial. Not made or endorsed by Keycloak.

Auto-generated, fully typed client for the [Keycloak Admin and Account REST APIs](https://www.keycloak.org/docs-api/latest/rest-api/index.html).

Generated from the admin OpenAPI spec at <https://www.keycloak.org/docs-api/latest/rest-api/openapi.json> and the account spec kept in this repository at <https://raw.githubusercontent.com/sferarc/openapi/main/packages/keycloak-api/specs/account.yaml>; before generating, [`kubb.config.ts`](https://github.com/sferarc/openapi/blob/main/packages/keycloak-api/kubb.config.ts) renames operation IDs, camel-cases path parameters, sends raw string bodies unquoted and types the workflow resource path parameter as its enum.

## Features

- **Fully typed** - every endpoint, parameter and response is generated from the official OpenAPI specs
- **Admin and Account APIs** - separate clients for the two Keycloak surfaces
- **Tree-shakable** - only the operations you import end up in your bundle
- **Runtime agnostic** - uses the global `fetch`, or bring your own implementation

## Installation

```bash
npm install keycloak-api
```

## Quick Start

Keycloak is self-hosted, so both clients require the `baseUrl` of your server. Endpoints are addressed
as `"<METHOD> <path>"`.

[`src/admin/generated/OPERATIONS.md`](./src/admin/generated/OPERATIONS.md) and [`src/account/generated/OPERATIONS.md`](./src/account/generated/OPERATIONS.md) list every admin and account operation with its `"<METHOD> <path>"` request and the spec's summary, one table per tag. They ship in the package, so `grep` in `node_modules/keycloak-api` finds an operation without reading the types.

### Admin API

```ts
import { KeycloakAdminApi } from "keycloak-api";

const admin = new KeycloakAdminApi({
  baseUrl: "https://keycloak.example.com",
  token: process.env.KEYCLOAK_TOKEN ?? null,
});

const realms = await admin.request("GET /admin/realms");
const realm = await admin.request("GET /admin/realms/{realm}", {
  pathParams: { realm: "master" },
});
```

### Account API

The Account API is scoped to a single realm, passed at construction time.

```ts
import { KeycloakAccountApi } from "keycloak-api";

const account = new KeycloakAccountApi({
  baseUrl: "https://keycloak.example.com",
  realm: "master",
  token: process.env.KEYCLOAK_TOKEN ?? null,
});

const me = await account.request("GET /account/");
```

### Refreshing the token

Keycloak access tokens expire after a few minutes. Pass a function as `token`, sync or async, and both clients call it before every request, so each call sends the token it returns:

```ts
const admin = new KeycloakAdminApi({
  baseUrl: "https://keycloak.example.com",
  token: () => tokenStore.getAccessToken(),
});
```

A call rejects with what the function threw, before any request is sent. A call's own `config.token` still wins.

### Custom fetch

```ts
const admin = new KeycloakAdminApi({
  baseUrl: "https://keycloak.example.com",
  token: process.env.KEYCLOAK_TOKEN ?? null,
  fetch: myFetchImplementation,
});
```

### Response headers

A call resolves to the parsed body only. To read a response header, pass `onResponse` in `config`; it gets the status and headers of the response before the body is read, an error response included. Keycloak answers a create call, such as a new user or client, with `201`, an empty body and the new resource's URL, which ends in its id, in `Location`:

```ts
let userId: string | undefined;
await admin.request("POST /admin/realms/{realm}/users", {
  pathParams: { realm: "master" },
  body: { username: "ada", enabled: true },
  config: { onResponse: ({ headers }) => (userId = headers.get("Location")?.split("/").pop()) },
});
```

An error thrown inside `onResponse` rejects the call with an `Error` whose message starts with `onResponse threw on` and whose `cause` is what was thrown.

## Errors

A call that gets an HTTP error response rejects with an `ApiResponseError`, exported from the package, which extends `Error`: `status` is the HTTP status code, `payload` is the parsed JSON error body, or the raw body text, up to 1000 characters, when it is not JSON, and `method` and `path` name the request, without its query string. Its message reads `<METHOD> <path> returned <status>: <detail>`, where the detail is the API's own error message or else the first 200 characters of the body. A request that gets no response at all, for example because the network failed, rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with what the signal was aborted with, as is: the `AbortError`, or the `TimeoutError` of `AbortSignal.timeout()`.

## MCP server

The package ships `keycloak-api-mcp`, a stdio [MCP](https://modelcontextprotocol.io) server with one tool per admin operation, so an agent can answer questions such as which users of a realm hold a role. It lists only the read (`GET`) tools; set `KEYCLOAK_MCP_ALLOW_WRITES=1` to add the others, which carry `destructiveHint` on `DELETE`. Every tool acts on `KEYCLOAK_REALM`, which is not a tool argument, and an HTTP error comes back as a tool error with the status and Keycloak's message.

| Variable | |
| --- | --- |
| `KEYCLOAK_URL` | Base URL of the server, such as `https://keycloak.example.com` |
| `KEYCLOAK_REALM` | Realm the tools act on |
| `KEYCLOAK_TOKEN` | A fixed access token, or else: |
| `KEYCLOAK_CLIENT_ID`, `KEYCLOAK_CLIENT_SECRET` | A confidential client with a service account; the server gets a token with the client credentials grant and renews it before it expires |
| `KEYCLOAK_TOKEN_REALM` | Realm of that client, if not `KEYCLOAK_REALM` (for example `master`) |
| `KEYCLOAK_MCP_ALLOW_WRITES` | `1` to list the tools that change data |

The service account needs the `realm-management` roles for what the tools should read, such as `view-users`.

Claude Code, in `.mcp.json`:

```json
{
  "mcpServers": {
    "keycloak": {
      "command": "npx",
      "args": ["-y", "-p", "keycloak-api", "keycloak-api-mcp"],
      "env": {
        "KEYCLOAK_URL": "https://keycloak.example.com",
        "KEYCLOAK_REALM": "acme",
        "KEYCLOAK_CLIENT_ID": "mcp",
        "KEYCLOAK_CLIENT_SECRET": "${KEYCLOAK_CLIENT_SECRET}"
      }
    }
  }
}
```

VS Code, in `.vscode/mcp.json`:

```json
{
  "inputs": [
    { "type": "promptString", "id": "keycloak-secret", "description": "Keycloak client secret", "password": true }
  ],
  "servers": {
    "keycloak": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "-p", "keycloak-api", "keycloak-api-mcp"],
      "env": {
        "KEYCLOAK_URL": "https://keycloak.example.com",
        "KEYCLOAK_REALM": "acme",
        "KEYCLOAK_CLIENT_ID": "mcp",
        "KEYCLOAK_CLIENT_SECRET": "${input:keycloak-secret}"
      }
    }
  }
}
```

## Entrypoints

| Import | Contents |
| --- | --- |
| `keycloak-api` | both client classes, plus admin/account operations, schemas and types |
| `keycloak-api/admin/components` | admin operations grouped by tag and by path |
| `keycloak-api/admin/schemas` | Zod schemas for admin operations |
| `keycloak-api/admin/types` | TypeScript types for admin operations |
| `keycloak-api/account/components` | account operations grouped by tag and by path |
| `keycloak-api/account/schemas` | Zod schemas for account operations |
| `keycloak-api/account/types` | TypeScript types for account operations |

## License

ISC
