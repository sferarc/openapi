# Context7

`context7.json` at the repository root tells Context7 (https://context7.com), the docs index coding agents query through its MCP server, what to index for `sferarc/openapi` (#354). Format: https://context7.com/docs/library-owners.

- `folders` limits indexing to `packages` and `skills`, but Context7 always reads every root-level markdown file: `README.md`, `CLAUDE.md` and `AGENTS.md` here.
- Context7 reads only documentation files (`.md`, `.mdx`, `.txt` and similar), so in `packages` it picks up each client's `README.md` and its `OPERATIONS.md` ([[packages]]) and skips the generated TypeScript.
- `skills` adds the Agent Skill ([[agent-skill]]).
- `excludeFolders` drops `packages/openapi-utils`, the bundled Keycloak spec, `apps` and `brain`.
- `excludeFiles` drops `CHANGELOG.md`, `LICENSE`, and the root `CLAUDE.md` and `AGENTS.md`, which are contributor and agent instructions for this repository rather than client docs. Setting either list turns off Context7's default exclusions, which is why `CHANGELOG.md` is listed by hand.
- The Library Owners page does not say whether `excludeFiles` overrides the root-level inclusion; that stays unknown until the first index run shows whether `CLAUDE.md` and `AGENTS.md` are left out.
- `rules` reach agents as recommendations: the clients are unofficial, how to call an operation, where `OPERATIONS.md` sits, the params shape, `ApiResponseError` and tokens from the environment. Context7 reviews rules, title and description before applying them and drops the whole rule set if one is rejected.
- `.github/workflows/scripts/context7.test.ts` checks that every client's README and `OPERATIONS.md` stay indexed ([[development/testing]]).
- The token rule names each constructor's required options other than `token` by class: Cloudflare's `apiKey` plus `email` alternative, `baseUrl` for the Keycloak and LiteLLM classes, and `realm` for `KeycloakAccountApi` (#384). `context7.test.ts` checks it against `packages/*/src/client.ts`, so a client that gains a required option fails the test until the rule names it.
- Whether the repository has been submitted at https://context7.com/add-library, and so whether Context7 serves it, is unknown as of this note.
