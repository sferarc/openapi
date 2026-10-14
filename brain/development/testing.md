# Testing


`@sferadev/openapi-utils` unit-tests the spec transforms in `packages/openapi-utils/src/kubb/spec-transforms.test.ts` with vitest, stubbing the global `fetch` for `fetchSpec`. Run it alone with `pnpm test --filter=@sferadev/openapi-utils`.


The OAuth helpers on `client.auth` are tested in each package's `src/client.test.ts`: `vercel-api-js` `accessToken`, and `refreshToken` in `netlify-api`, `cloudflare-api-js` and `zoom-api-js`. Each test asserts the URL, method, headers including `Authorization`, the body encoding and the mapped result, and what a non-2xx response does: Vercel and Netlify reject with the status, Zoom rejects with an `Error` naming it, and Cloudflare resolves the raw `Response` for the caller to check.

Beyond those tests, the checks on the clients are type-level and structural: `pnpm tsc` over the generated code and the hand-written client, `knip` for unused exports and dependencies, and `is-tree-shakable` on each built package ([[toolchain]]).

Generated output is not snapshot-tested. A regeneration is reviewed through its diff and the changeset `changes.ts` writes ([[architecture/pipeline]]). The changeset script's pure parts are tested in `.github/workflows/scripts/changeset.test.ts`, which the root `pnpm test` runs after the turbo tests.
