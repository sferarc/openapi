# Effect bindings move to Effect 4 in a major release

Recorded 2026-10-08, from #6.

## Decision

The catalog moves `effect` from 3.22.2 to 4.0.0, and every client with an `effect` entry declares `effect: "^4.0.0"` as an optional peer. `ApiConfig` in `packages/openapi-utils/src/effect/errors.ts` is a `Context.Service` key, since Effect 4 removed `Context.Tag`. The five published Effect clients (`netlify-api`, `nuki-api-js`, `v0-api`, `vercel-api-js`, `zoom-api-js`) get a major changeset (`.changeset/effect-v4.md`); `clickhouse-cloud` is unreleased and keeps its pending minor.

## Why

The catalog had held `effect` on 3.x with a comment saying the move needs a code migration plus a major release of every client, so it should ship as its own change rather than inside a dependency bump (`pnpm-workspace.yaml` before #6). #6 is that change.

## Consequences

- Projects on Effect 3 stay on the previous major of each client (`.changeset/effect-v4.md`).
- An HTTP error status still surfaces as `NetworkError` rather than `ApiError` in the older clients' fetchers; `clickhouse-cloud`'s fetcher returns `ApiError` (#6).

## What would reopen it

An Effect 5, or a need to support Effect 3 and 4 from one release.
