# Clients bundle openapi-utils

Recorded 2026-10-08, from #1.

## Decision

`@sferadev/openapi-utils` is a devDependency of every client, so `bunchee` bundles it into `dist/`. The built JavaScript imports only `zod` and, from the `effect` entry, `effect`.

## Why

Five published clients declared the private package as a runtime dependency. pnpm rewrote it to `0.0.1` on publish, a version that does not exist on npm, so `npm install vercel-api-js` failed with E404 (#1, `.changeset/bundle-openapi-utils.md`).

## Consequences

- The fix reaches npm only with the next release, which waits on `RELEASE_ENABLED` ([[development/release]]).
- After #1 the `effect` entry's declarations still imported types from `@sferadev/openapi-utils/effect`. #4 inlines them: the Effect clients build with `bunchee --dts-bundle`, and `openapi-utils` maps that subpath in `typesVersions` so the bundler can resolve it. A new Effect client needs both.
- A new client must list `@sferadev/openapi-utils` under `devDependencies`, never `dependencies` (`packages/clickhouse-cloud/package.json` is the current example).

## What would reopen it

Publishing `@sferadev/openapi-utils` to npm.
