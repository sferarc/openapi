# Testing

`clickhouse-cloud` has tests: `packages/clickhouse-cloud/src/client.test.ts`, run with vitest and offline through an injected `fetch`. It covers the client, basic auth and the Effect bindings (#2).

`@sferadev/openapi-utils` unit-tests the spec transforms in `packages/openapi-utils/src/kubb/spec-transforms.test.ts` with vitest, stubbing the global `fetch` for `fetchSpec`. Run it alone with `pnpm test --filter=@sferadev/openapi-utils`.

Every other client except `clickhouse-cloud` has `src/utils/fetcher.test.ts`, which tests its hand-written fetcher offline with a stubbed `fetch`: an HTTP error status surfaces with that status (#8), and query strings omit nullish values, repeat a key for each array item, and encode reserved characters (#16). Only `vercel-api-js`'s copy also checks that a generated operation percent-encodes its path parameters (#17). The five published Effect clients (`netlify-api`, `nuki-api-js`, `v0-api`, `vercel-api-js`, `zoom-api-js`) also have `src/effect.test.ts`, which checks that an HTTP error becomes `ApiError` and a failed request becomes `NetworkError` (#8). Run one package with `pnpm test --filter=<package>`; turbo builds `@sferadev/openapi-utils` first, and running vitest directly in a client fails until it is built.

The OAuth helpers on `client.auth` are tested in each package's `src/client.test.ts`: `vercel-api-js` `accessToken`, and `refreshToken` in `netlify-api`, `cloudflare-api-js` and `zoom-api-js`. Each test asserts the URL, method, headers including `Authorization`, the body encoding and the mapped result, and what a non-2xx response does: Vercel and Netlify reject with the status, Zoom rejects with an `Error` naming it, and Cloudflare resolves the raw `Response` for the caller to check.

Beyond those tests, the checks on the clients are type-level and structural: `pnpm tsc` over the generated code and the hand-written client, `knip` for unused exports and dependencies, and `is-tree-shakable` on each built package ([[toolchain]]).

Generated output is not snapshot-tested. A regeneration is reviewed through its diff and the changeset `changes.ts` writes ([[architecture/pipeline]]). The changeset script's pure parts are tested in `.github/workflows/scripts/changeset.test.ts`, which the root `pnpm test` runs after the turbo tests.
