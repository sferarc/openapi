# openapi

Type-safe TypeScript clients generated from public OpenAPI specs, plus the site at [openapi.sferadev.com](https://openapi.sferadev.com) that lists them.

| Package | API |
| --- | --- |
| [`clickhouse-cloud`](packages/clickhouse-cloud) | ClickHouse Cloud |
| [`cloudflare-api-js`](packages/cloudflare-api-js) | Cloudflare |
| [`keycloak-api`](packages/keycloak-api) | Keycloak |
| [`litellm-api`](packages/litellm-api) | LiteLLM |
| [`netlify-api`](packages/netlify-api) | Netlify |
| [`nuki-api-js`](packages/nuki-api-js) | Nuki |
| [`v0-api`](packages/v0-api) | Vercel v0 |
| [`vercel-api-js`](packages/vercel-api-js) | Vercel |
| [`zoom-api-js`](packages/zoom-api-js) | Zoom |

`packages/openapi-utils` holds the shared kubb config, spec fetching and runtime helpers every client is generated with. `apps/openapi` is the website.

## Development

The toolchain is pinned in `mise.toml`. With [mise](https://mise.jdx.dev) installed:

```bash
mise install
pnpm install
pnpm tsc && pnpm check && pnpm test
pnpm generate --filter=<package>   # regenerate one client from its live spec
```

The `Update OpenAPI` workflow regenerates each client from its upstream spec and opens a PR with a changeset written from the diff. Releases go through changesets: merging the version PR publishes to npm.
