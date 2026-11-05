# The Keycloak MCP server is a bin of keycloak-api

Recorded 2026-11-05, from #387.

## Decision

`keycloak-api-mcp` ships as a `bin` of `keycloak-api` (`packages/keycloak-api/package.json`), not as a sibling package. `@modelcontextprotocol/server` is a devDependency, so `bunchee` bundles it into `dist/bin/keycloak-api-mcp.js`, which imports only `zod` and Node builtins. The client entries do not import it.

## Why

- #352 asked for a sibling package only if the bin would make the MCP SDK a dependency of every client user; bundling avoids that, the same way [[2026-10-08-bundle-openapi-utils]] bundles the private utils.
- A new npm package needs its trusted publisher set on npmjs.com before `release.yml` can publish it, which the owner does ([[development/release]]); a bin of a published package ships with the next release.

## Consequences

- The command is `npx -p keycloak-api keycloak-api-mcp`; a bare `npx keycloak-api-mcp` would need a package of that name, which does not exist on npm (`npm view keycloak-api-mcp`, 404 on 2026-11-05).
- A fix in the MCP SDK reaches users only through a `keycloak-api` release.

## What would reopen it

The owner registering a `keycloak-api-mcp` package and its trusted publisher, or the bin outgrowing the client (an HTTP transport, its own release cadence).
