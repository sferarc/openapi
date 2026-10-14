# Testing

`clickhouse-cloud` has tests: `packages/clickhouse-cloud/src/client.test.ts`, run with vitest and offline through an injected `fetch`. It covers the client, basic auth and the Effect bindings (#2).

`@sferadev/openapi-utils` unit-tests the spec transforms in `packages/openapi-utils/src/kubb/spec-transforms.test.ts` with vitest, stubbing the global `fetch` for `fetchSpec`. Run it alone with `pnpm turbo run test --filter=@sferadev/openapi-utils`.

Every other client except `clickhouse-cloud` has `src/utils/fetcher.test.ts`, which tests its hand-written fetcher offline with a stubbed `fetch`: an HTTP error status surfaces with that status (#8), and query strings omit nullish values, repeat a key for each array item, and encode reserved characters (#16). Only `vercel-api-js`'s copy also checks that a generated operation percent-encodes its path parameters (#17). The five published Effect clients (`netlify-api`, `nuki-api-js`, `v0-api`, `vercel-api-js`, `zoom-api-js`) also have `src/effect.test.ts`, which checks that an HTTP error becomes `ApiError` and a failed request becomes `NetworkError` (#8). Run one package with `pnpm turbo run test --filter=<package>` (the root `pnpm test` hands extra arguments to its trailing `vitest run`, which rejects `--filter`); turbo builds `@sferadev/openapi-utils` first, and running vitest directly in a client fails until it is built.

The website (`@sferadev/openapi-website`) tests the Vercel OAuth profile mapping in `apps/openapi/src/lib/vercel-user-info.test.ts` with an injected `fetch`, so it needs no `DATABASE_URL` or network: a missing access token or a failed request throws, the bearer token is sent, the nested `user` profile maps with `name` falling back to the email and a null avatar omitted, and an un-nested profile is rejected. Run it with `pnpm turbo run test --filter=@sferadev/openapi-website`.

Beyond those tests, the checks on the clients are type-level and structural: `pnpm tsc` over the generated code and the hand-written client, `knip` for unused exports and dependencies, and `is-tree-shakable` on each built package ([[toolchain]]).

Generated output is not snapshot-tested. A regeneration is reviewed through its diff and the changeset `changes.ts` writes ([[architecture/pipeline]]). The changeset script's pure parts are tested in `.github/workflows/scripts/changeset.test.ts`, which the root `pnpm test` runs after the turbo tests.
