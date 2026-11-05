# Architecture

A pnpm and Turborepo workspace (`pnpm-workspace.yaml`, `turbo.json`) of TypeScript API clients generated from public OpenAPI specs, the private package they are generated with, and a Next.js website that lists them (`README.md`).

- [[pipeline]]: how a spec becomes a client, from `kubb.config.ts` to `src/generated/`
- [[packages]]: what each client package contains, which files are generated and which are hand-written
- [[shared-utils]]: `packages/openapi-utils`, the kubb config, spec transforms and Effect helpers
- [[website]]: `apps/openapi`, the site that lists the clients
- [[agent-skill]]: `skills/openapi-clients`, the Agent Skill that teaches coding agents to call the clients
- [[context7]]: `context7.json`, what Context7 indexes for coding agents
- [[keycloak-mcp]]: `keycloak-api-mcp`, the stdio MCP server over the Keycloak admin API
