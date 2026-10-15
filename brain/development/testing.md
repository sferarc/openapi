# Testing

Every test runs with vitest and offline: each one stubs or injects `fetch`, so none calls a real API. Run one package with `pnpm turbo run test --filter=<package>` (the root `pnpm test` hands extra arguments to its trailing `vitest run`, which rejects `--filter`). Nothing has to be built first: the clients with Effect bindings extend the root `vitest.shared.ts`, which aliases `@sferadev/openapi-utils` and `@sferadev/openapi-utils/effect` to `packages/openapi-utils/src`, so `pnpm exec vitest run` inside a client works on a clean checkout and sees edits to openapi-utils without a rebuild. Builds still bundle openapi-utils from its `dist`. The list below was checked against `git ls-files '*.test.ts'` on 2026-10-15.

## Clients

- The OAuth helpers on `client.auth` are tested in the same files (#30): `vercel-api-js` `accessToken`, and `refreshToken` in `netlify-api`, `cloudflare-api-js` and `zoom-api-js`. Each test asserts the URL, method, headers including `Authorization`, the body encoding and the mapped result, and what a non-2xx response does: Vercel and Netlify reject with the status, Zoom rejects with an `Error` naming it, and Cloudflare resolves the raw `Response` for the caller to check.
- `src/effect.test.ts`, in the five published Effect clients (`netlify-api`, `nuki-api-js`, `v0-api`, `vercel-api-js`, `zoom-api-js`): an HTTP error becomes `ApiError` and a failed request becomes `NetworkError` (#8). `vercel-api-js`'s copy also checks that the `NetworkError` message carries the request and the reason.

## `@sferadev/openapi-utils`

Run alone with `pnpm turbo run test --filter=@sferadev/openapi-utils`.

- `src/kubb/spec-transforms.test.ts`: the spec transforms, stubbing the global `fetch` for `fetchSpec` (#18).
- `src/kubb/components/client-operation.test.ts`: `buildUrlTemplate` percent-encodes single-segment path parameters (#17), keeps slashes in file path parameters and does not double-encode a path already passed through `encodeURI` (#23).
- `src/kubb/client/operations.test.ts`: runs kubb with `createConfig` on the fixture `src/kubb/client/fixtures/params.json` into a temp directory, then imports the emitted `components.ts` against a stub fetcher and a fake `fetch`. A path parameter that is not a JS identifier (`team-id`) is read with bracket access and percent-encoded, a falsy required value (`0`) is kept, query and header params are forwarded, an operation without parameters works, and a missing or empty path parameter, or an omitted `pathParams`, rejects with `Missing required path parameter` before `fetch` is called.
- `src/kubb/adapter.test.ts`: `rawRequestBodyFallback` keeps the first raw media type and leaves JSON-like and url-encoded bodies to the JSON parse (#25).
- `src/effect/proxy.test.ts`: the Effect proxies map a rejection with a `status` to `ApiError`, a missing path parameter to `ValidationError` naming the field and anything else to `NetworkError`, pass the `ApiConfig` service to the operation as `config`, and return `undefined` for an unknown tag, operation or endpoint (#33).
- `src/effect/errors.test.ts`: how `ApiError.message` and `NetworkError.message` read each provider's error shape (#33).
- `src/kubb/client/extra.test.ts`: reads every package's committed `src/**/generated/components.ts` and asserts that each exported operation appears in `operationsByTag` (#24).

## Website

`@sferadev/openapi-website` tests the Vercel OAuth profile mapping in `apps/openapi/src/lib/vercel-user-info.test.ts` with an injected `fetch`, so it needs no `DATABASE_URL` or network: a missing access token or a failed request throws, the bearer token is sent, the nested `user` profile maps with `name` falling back to the email and a null avatar omitted, and an un-nested profile is rejected (#31). Run it with `pnpm turbo run test --filter=@sferadev/openapi-website`.

## Changeset script

`.github/workflows/scripts/changeset.test.ts` tests `changeset.ts`, the pure parts that `changes.ts` imports when `update-openapi.yml` writes a changeset: the diff summary, entry resolution and its fallbacks, and changeset rendering (#27). The root `pnpm test` runs it after the turbo tests (`package.json`).

## What is not tested

Beyond those tests, the checks on the clients are type-level and structural: `pnpm tsc` over the generated code and the hand-written client, `knip` for unused exports and dependencies, and `is-tree-shakable` on each built package ([[toolchain]]).

Generated output is not snapshot-tested. `extra.test.ts` reads the committed output and checks only that `operationsByTag` lists every operation; `operations.test.ts` generates from its own fixture and asserts mainly on how the emitted code runs. A regeneration is otherwise reviewed through its diff and the changeset `changes.ts` writes ([[architecture/pipeline]]).
