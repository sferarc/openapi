# The clients are a standalone repository

Recorded 2026-10-08, from commit 8ff9fa1.

## Decision

The generated clients, `openapi-utils` and the website moved out of the `SferaDev/SferaDev` monorepo into this repository so they build, test and release on their own. Packages that belonged elsewhere left the workspace, catalog and overrides; the toolchain moved to Node 26 and pnpm 12 through mise; the dependency update and preview workflows were removed.

Both `release.yml` and the hourly schedule in `update-openapi.yml` stay off until the repository variables `RELEASE_ENABLED` and `SPEC_UPDATES_ENABLED` are `true`.

## Why

A separate repository releases its packages without the rest of the monorepo's CI. Gating the two workflows that write to npm or open pull requests on their own makes the first release and the first scheduled run deliberate steps by the owner (comments in `release.yml` and `update-openapi.yml`).

## Consequences

- Nothing publishes on a merge until `RELEASE_ENABLED` is set ([[development/release]]).
- Spec updates only happen through a manual dispatch until `SPEC_UPDATES_ENABLED` is set.
- The packages already on npm still point at the old repository until each is republished from here.

## What would reopen it

Merging the clients back into a monorepo, or a release path other than changesets from this repository.
