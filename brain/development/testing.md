# Testing

Only `clickhouse-cloud` has tests: `packages/clickhouse-cloud/src/client.test.ts`, run with vitest and offline through an injected `fetch`. It covers the client, basic auth and the Effect bindings (#2). No other package defines a `test` script.

For the other clients the checks are type-level and structural: `pnpm tsc` over the generated code and the hand-written client, `knip` for unused exports and dependencies, and `is-tree-shakable` on each built package ([[toolchain]]).

Generated output is not snapshot-tested. A regeneration is reviewed through its diff and the changeset `changes.ts` writes ([[architecture/pipeline]]).
