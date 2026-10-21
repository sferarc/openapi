# Release

Releases use changesets (`.changeset/config.json`): every client is versioned and published with `access: public`; the website is ignored; private packages are versioned but not tagged.

## Flow

1. A pull request that changes a client adds a changeset (`pnpm changeset`), or `update-openapi.yml` writes one ([[architecture/pipeline]]).
2. On a push to `main`, `.github/workflows/release.yml` runs `changesets/action`. With pending changesets it opens or updates a version PR and enables auto-merge on it; the required `Check` job is that PR's only review (comment in the workflow).
3. Merging the version PR leaves no pending changesets, so the next run publishes: `pnpm release` runs `scripts/release.sh`, which builds every package and runs `changeset publish` for versions npm does not have yet.

Authentication is npm trusted publishing: `id-token: write` lets npm exchange the GitHub OIDC token for a publish credential, and each package's `publishConfig` sets `provenance: true`. No npm token is stored and nothing writes `~/.npmrc`. Each package's trusted publisher on npmjs.com must name this repository and `release.yml` (comments in `release.yml`).

## Publishing is off

The release job only runs when the repository variable `RELEASE_ENABLED` is `true` (`if:` in `release.yml`), so the first release from this repository is the owner's decision (8ff9fa1). Only the owner sets that variable, and only once the publish path is proven, which needs the trusted publishers below. Until then pending changesets accumulate in `.changeset/`.

## What setting `RELEASE_ENABLED` triggers

Setting the variable runs nothing by itself. `release.yml` triggers on a push to `main` and on `workflow_dispatch`, so the first run is the next merge to `main` or a manual run, whichever comes first.

2. The PR merges once `Check`, `Approved stack` and `No Claude attribution` pass. `GIT_TOKEN` pushes the squash commit, so that push triggers the workflow again.
3. Second run, with no pending changesets: `pnpm release` builds `./packages/*` through turbo and runs `changeset publish`. It publishes each version npm lacks with provenance over OIDC, tags it `<name>@<version>`, pushes the tags and creates a GitHub release per published package (`createGithubReleases` defaults to true and `release.yml` does not override it). `@sferadev/openapi-utils` is private and is not tagged (`privatePackages.tag`).

Versions `changeset version` produces from the current changesets (dry run on 2026-10-20, reverted afterwards):

| Package | Now | Next | Bump |
| --- | --- | --- | --- |
| `cloudflare-api-js` | 1.1.0 | 2.0.0 | major (`http-errors-as-api-error`) |
| `keycloak-api` | 1.2.0 | 2.0.0 | major (same) |
| `litellm-api` | 1.1.0 | 2.0.0 | major (same, and `litellm-spec-source` from #64) |
| `netlify-api` | 1.4.1 | 2.0.0 | major (`effect-v4`, `http-errors-as-api-error`) |
| `nuki-api-js` | 1.2.0 | 2.0.0 | major (same) |
| `vercel-api-js` | 1.38.2 | 2.0.0 | major (same) |
| `zoom-api-js` | 1.3.2 | 2.0.0 | major (same); `zoom-spec-source` from #64 is a patch |
| `v0-api` | 0.3.1 | 1.0.0 | major (same); a major on a `0.x` version lands on 1.0.0 |

### Checklist before setting it

Checked on 2026-10-20 unless noted; the changeset count was refreshed on 2026-10-21:

- [x] The repository variable `RELEASE_ENABLED` is not set, and neither is any other repository variable but the `HQ_*` ones (`gh variable list`).
- [x] `GIT_TOKEN` exists as an organization secret for all repositories. The token opens PRs and enables auto-merge: the PAT path ran in run 39485625102 (see Scheduled regeneration in [[architecture/pipeline]]). Whether it can push the squash commit of the version PR to `main` through the ruleset is unknown until the first run.
- [x] The repository setting "Allow auto-merge" is on, so `gh pr merge --auto` on the version PR works. Evidence: `gh api repos/sferarc/openapi --jq .allow_auto_merge` returns `true`; #56 to #61 also had auto-merge enabled on 2026-10-20 (`gh pr list --state all --json number,autoMergeRequest`), which GitHub only allows while the setting is on.
- [x] Nothing in the Release job needs an npm token, so no secret has to be added.

Not run: `pnpm release` itself, because `changeset publish` has no dry-run mode and would publish.

## Current state

As of 2026-10-14 (`npm view <package> version`, unchanged since the 2026-10-08 check):

- Eight clients are on npm at the versions in their `package.json`. Those versions were published from the earlier monorepo (`repository.url` on npm still names it).
- `vercel-api-js` and `netlify-api` on npm declare `@sferadev/openapi-utils@0.0.1` as a dependency, which does not exist on npm, so installing them fails. The pending changeset from #1 fixes this for the five affected clients at their next release.

## Pending changesets

As of 2026-10-21 (main at ee89dec), `.changeset/` holds 85 changesets besides `README.md` and `config.json`. The first release will be a major for all eight published clients:

- `litellm-spec-source.md`, a major for `litellm-api` that removes the hosted billing and model catalog operations when the client moves to the self-hosted proxy spec (#64).
- Patches: `bundle-openapi-utils.md` (#1), `inline-effect-types.md` (#4), `fetcher-query-serialization.md` (#16), `path-encoding-*.md` for the other seven clients (#17), `path-params-keep-slashes-*.md` for `cloudflare-api-js`, `keycloak-api` and `netlify-api` (#23), `untagged-operations-*.md` for `cloudflare-api-js`, `keycloak-api`, `litellm-api` and `vercel-api-js` (#24), `request-via-operations-*.md` for all nine clients (#26), `fetcher-empty-body-header-case.md` for all nine clients (#28), `zoom-refresh-basic-auth.md` (#30), `effect-error-message-*.md` for the six Effect clients (#33), `fetcher-failure-detail-*.md` for all nine clients (#37), `dts-private-types-*.md` for `keycloak-api` and `v0-api` (#42), `effect-abort-signal-*.md` for the six Effect clients (#46), and `stream-upload-duplex-netlify-api.md`, which sends a `ReadableStream` upload body with `duplex: "half"` so Node's `fetch` accepts it (#50, `packages/netlify-api/src/utils/fetcher.ts`).
