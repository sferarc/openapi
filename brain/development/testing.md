# Testing


`@sferadev/openapi-utils` unit-tests the spec transforms in `packages/openapi-utils/src/kubb/spec-transforms.test.ts` with vitest, stubbing the global `fetch` for `fetchSpec`. Run it alone with `pnpm test --filter=@sferadev/openapi-utils`.


Beyond those tests, the checks on the clients are type-level and structural: `pnpm tsc` over the generated code and the hand-written client, `knip` for unused exports and dependencies, and `is-tree-shakable` on each built package ([[toolchain]]).

Generated output is not snapshot-tested. A regeneration is reviewed through its diff and the changeset `changes.ts` writes ([[architecture/pipeline]]).
