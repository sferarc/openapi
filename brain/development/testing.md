# Testing


For the other clients the checks are type-level and structural: `pnpm tsc` over the generated code and the hand-written client, `knip` for unused exports and dependencies, and `is-tree-shakable` on each built package ([[toolchain]]).

Generated output is not snapshot-tested. A regeneration is reviewed through its diff and the changeset `changes.ts` writes ([[architecture/pipeline]]).
