# Context7

`context7.json` at the repository root tells Context7 (https://context7.com), the docs index coding agents query through its MCP server, what to index for `sferarc/openapi` (#354). Format: https://context7.com/docs/library-owners.

- `folders` limits indexing to `packages` and `skills`; Context7 also always reads the root `README.md`.
- Context7 reads only documentation files (`.md`, `.mdx`, `.txt` and similar), so in `packages` it picks up each client's `README.md` and its `OPERATIONS.md` ([[packages]]) and skips the generated TypeScript.
- `skills` adds the Agent Skill ([[agent-skill]]).
- `excludeFolders` drops `packages/openapi-utils`, the bundled Keycloak spec, `apps` and `brain`.
- `excludeFiles` drops `CHANGELOG.md` and `LICENSE`. Setting either list turns off Context7's default exclusions, which is why `CHANGELOG.md` is listed by hand.
- `rules` reach agents as recommendations: the clients are unofficial, how to call an operation, where `OPERATIONS.md` sits, the params shape, `ApiResponseError` and tokens from the environment. Context7 reviews rules, title and description before applying them and drops the whole rule set if one is rejected.
- `.github/workflows/scripts/context7.test.ts` checks that every client's README and `OPERATIONS.md` stay indexed ([[development/testing]]).
- Whether the repository has been submitted at https://context7.com/add-library, and so whether Context7 serves it, is unknown as of this note.
