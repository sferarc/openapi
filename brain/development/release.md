# Release

Releases use changesets (`.changeset/config.json`): every client is versioned and published with `access: public`; the website is ignored; private packages are versioned but not tagged.

## Flow

1. A pull request that changes a client adds a changeset (`pnpm changeset`), or `update-openapi.yml` writes one ([[architecture/pipeline]]).
2. On a push to `main`, `.github/workflows/release.yml` runs `changesets/action`. With pending changesets it opens or updates a version PR and enables auto-merge on it; the required `Check` job is that PR's only review (comment in the workflow).
3. Merging the version PR leaves no pending changesets, so the next run publishes: `pnpm release` runs `scripts/release.sh`, which builds every package and runs `changeset publish` for versions npm does not have yet.

Authentication is npm trusted publishing: `id-token: write` lets npm exchange the GitHub OIDC token for a publish credential, and each package's `publishConfig` sets `provenance: true`. No npm token is stored and nothing writes `~/.npmrc`. Each package's trusted publisher on npmjs.com must name this repository and `release.yml` (comments in `release.yml`).

## Publishing is off

The release job only runs when the repository variable `RELEASE_ENABLED` is `true` (`if:` in `release.yml`), so the first release from this repository is the owner's decision (8ff9fa1). Only the owner sets that variable. Until then pending changesets accumulate in `.changeset/`.

## Current state

As of 2026-10-14 (`npm view <package> version`, unchanged since the 2026-10-08 check):

- Eight clients are on npm at the versions in their `package.json`. Those versions were published from the earlier monorepo (`repository.url` on npm still names it).
- `vercel-api-js` and `netlify-api` on npm declare `@sferadev/openapi-utils@0.0.1` as a dependency, which does not exist on npm, so installing them fails. The pending changeset from #1 fixes this for the five affected clients at their next release.

## Pending changesets

As of 2026-10-16, `.changeset/` holds 57 changesets besides `README.md` and `config.json`. The first release will be a major for all eight published clients:

- Patches: `bundle-openapi-utils.md` (#1), `inline-effect-types.md` (#4), `fetcher-query-serialization.md` (#16), `path-encoding-*.md` for the other seven clients (#17), `path-params-keep-slashes-*.md` for `cloudflare-api-js`, `keycloak-api` and `netlify-api` (#23), `untagged-operations-*.md` for `cloudflare-api-js`, `keycloak-api`, `litellm-api` and `vercel-api-js` (#24), `request-via-operations-*.md` for all nine clients (#26), `fetcher-empty-body-header-case.md` for all nine clients (#28), `zoom-refresh-basic-auth.md` (#30), `effect-error-message-*.md` for the six Effect clients (#33), `fetcher-failure-detail-*.md` for all nine clients (#37), `dts-private-types-*.md` for `keycloak-api` and `v0-api` (#42), and `effect-abort-signal-*.md` for the six Effect clients (#46).
