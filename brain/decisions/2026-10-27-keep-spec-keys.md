# Keep the spec's keys

Recorded 2026-10-27, from the branch `fix/camelcase-media-types`.

## Decision

`packages/vercel-api-js/kubb.config.ts` and `packages/v0-api/kubb.config.ts` pass the spec to kubb with its keys unchanged. The `camelCaseProperties` transform, which both configs ran last, is deleted from `packages/openapi-utils/src/kubb/spec-transforms.ts`.

## Why

`camelCaseProperties` ran `case.camel` on every key outside `paths`, so it renamed keys that are not names at all:

- Media types: `application/json` became `applicationJson`. kubb no longer saw a JSON body, so 181 `vercel-api-js` and 22 `v0-api` operations typed `body` as raw bytes or a string and sent `Content-Type: applicationJson`. The fetcher only serializes a body when the content type is `application/json` (`src/utils/fetcher.ts`), so an object body went out unserialized. Output generated before #25 had no `body` parameter on them at all (`createDeployment` until #61).
- `$ref` became `ref`, so no reference resolved. On the live specs of 2026-10-27 that was 2,901 references in Vercel's and 507 in v0's.
- Property names: `deployment_id` became `deploymentId` in the types while the fetcher sends keys as written, so the types named fields the APIs do not read. Vercel's spec had 795 such renames under `properties`, v0's had 4.

Counts come from walking the live specs with the same `case.camel` call on 2026-10-27. `extra.test.ts` in `packages/openapi-utils/src/kubb/client/` now fails if any committed client sends a `Content-Type` that is not `type/subtype`.

## Consequences

- Both clients get a major (`.changeset/spec-keys-kept-vercel-api-js.md`, `.changeset/spec-keys-kept-v0-api.md`). Callers that used the camelCased property names have to use the API's names.
- `vercel-api-js`'s `types.ts` grows from about 1.9 MB to 4.9 MB and `schemas.ts` from 1.6 MB to 4.0 MB, because bodies and referenced schemas are typed now. The build and `is-tree-shakable` still pass.

## What would reopen it

A client that wants camelCase names in its types would need the fetcher to map keys on the way out and back, not a rename of the spec.
