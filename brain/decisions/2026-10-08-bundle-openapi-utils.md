# Clients bundle openapi-utils

Recorded 2026-10-08, from #1.

## Decision

`@sferadev/openapi-utils` is a devDependency of every client, so `bunchee` bundles it into `dist/`. The built JavaScript imports only `zod` and, from the `effect` entry, `effect`.

## Why

Five published clients declared the private package as a runtime dependency. pnpm rewrote it to `0.0.1` on publish, a version that does not exist on npm, so `npm install vercel-api-js` failed with E404 (#1, `.changeset/bundle-openapi-utils.md`).

## Consequences

- The fix reaches npm only with the next release, which waits on `RELEASE_ENABLED` ([[development/release]]).
- The `effect` entry's declaration file still re-exports types from `@sferadev/openapi-utils/effect`, so those types stay unresolved for consumers until the types are inlined or the package is published (#1). See [[plans/index]].
- A new client must list `@sferadev/openapi-utils` under `devDependencies`, never `dependencies` (`packages/clickhouse-cloud/package.json` is the current example).

## What would reopen it

Publishing `@sferadev/openapi-utils` to npm.
