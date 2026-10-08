# effect stays on major 3

Recorded 2026-10-08, from the comment on `effect` in `pnpm-workspace.yaml`. The date the choice was first made is not in this repository's history.

## Decision

The catalog keeps `effect` on 3.x, and every client declares `effect: "^3.0.0"` as an optional peer.

## Why

effect 4 replaces `Context.Tag` with `Context.Service`, which `packages/openapi-utils/src/effect/errors.ts` uses for `ApiConfig`. Moving needs a code migration and a major release of every client, so it ships as its own change rather than inside a dependency bump (`pnpm-workspace.yaml`).

## What would reopen it

A planned major release of the clients that migrates the Effect bindings.
