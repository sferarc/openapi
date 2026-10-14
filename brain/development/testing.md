# Testing

Every test runs with vitest and offline: each one stubs or injects `fetch`, so none calls a real API. Run one package with `pnpm turbo run test --filter=<package>` (the root `pnpm test` hands extra arguments to its trailing `vitest run`, which rejects `--filter`); turbo builds `@sferadev/openapi-utils` first, and running vitest directly in a client fails until it is built. The list below was checked against `git ls-files '*.test.ts'` on 2026-10-15.

## Clients

- `src/client.test.ts`, in every client: `request()` percent-encodes path parameters, rejects a missing one before calling `fetch`, calls an endpoint without parameters and rejects an unknown endpoint (#26). `litellm-api`'s copy also reaches untagged operations through the `default` namespace (#24). `clickhouse-cloud`'s copy, added with the client (#2), also covers basic auth, path, query and body serialization, the generated schemas, the Effect bindings, and its fetcher's empty bodies and header case (#28) and failure paths: a non-JSON error body kept as raw text up to 1000 characters, and a failed request rejected as an `Error` naming the method and path with the original exception as `cause`.
- The OAuth helpers on `client.auth` are tested in the same files (#30): `vercel-api-js` `accessToken`, and `refreshToken` in `netlify-api`, `cloudflare-api-js` and `zoom-api-js`. Each test asserts the URL, method, headers including `Authorization`, the body encoding and the mapped result, and what a non-2xx response does: Vercel and Netlify reject with the status, Zoom rejects with an `Error` naming it, and Cloudflare resolves the raw `Response` for the caller to check.
- `src/utils/fetcher.test.ts`, in every client except `clickhouse-cloud`: the hand-written fetcher surfaces an HTTP error with its status (#8); query strings omit nullish values, repeat a key for each array item and encode reserved characters (#16); a 204 or an empty JSON body resolves to `undefined`, and a lowercase `authorization` or `content-type` header replaces the default (#28); a non-JSON error body such as a proxy's HTML 502 is kept as raw text up to 1000 characters, and a failed request rejects with an `Error` whose message names the method, the path without its query string and the reason, with the original exception as `cause`. `vercel-api-js`'s copy also checks that a generated operation percent-encodes its path parameters (#17). `netlify-api`'s copy also checks that deploy file paths keep their slashes (#23), and that an octet-stream upload is sent as raw bytes and a site build zip as multipart form data while JSON bodies stay JSON (#25).
- `src/effect.test.ts`, in the five published Effect clients (`netlify-api`, `nuki-api-js`, `v0-api`, `vercel-api-js`, `zoom-api-js`): an HTTP error becomes `ApiError` and a failed request becomes `NetworkError` (#8). `vercel-api-js`'s copy also checks that the `NetworkError` message carries the request and the reason.

## `@sferadev/openapi-utils`

Run alone with `pnpm turbo run test --filter=@sferadev/openapi-utils`.

- `src/kubb/spec-transforms.test.ts`: the spec transforms, stubbing the global `fetch` for `fetchSpec` (#18).
- `src/kubb/components/client-operation.test.ts`: `buildUrlTemplate` percent-encodes single-segment path parameters (#17), keeps slashes in file path parameters and does not double-encode a path already passed through `encodeURI` (#23).
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

Generated output is not snapshot-tested. `extra.test.ts` is the only test that reads it, and it checks only that `operationsByTag` lists every operation. A regeneration is otherwise reviewed through its diff and the changeset `changes.ts` writes ([[architecture/pipeline]]).
