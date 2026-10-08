# Effect bindings move to Effect 4 in a major release

Recorded 2026-10-08, from #6.

## Decision


## Why

The catalog had held `effect` on 3.x with a comment saying the move needs a code migration plus a major release of every client, so it should ship as its own change rather than inside a dependency bump (`pnpm-workspace.yaml` before #6). #6 is that change.

## Consequences

- Projects on Effect 3 stay on the previous major of each client (`.changeset/effect-v4.md`).

## What would reopen it

An Effect 5, or a need to support Effect 3 and 4 from one release.
