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

1. First run, with pending changesets: `changesets/action` runs `changeset version` and opens the "Version Packages" PR from `changeset-release/main` with a `sferarc-hq` App installation token minted at the start of the job. It bumps the versions below, writes each `CHANGELOG.md` and deletes the changesets. The last step then runs `gh pr merge --squash --auto` on that PR. Nothing is published yet.
2. The PR merges once `Check`, `Approved stack` and `No Claude attribution` pass. Auto-merge was enabled with the App token, so the squash commit's push triggers the workflow again, which a `github.token` merge would not.
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

Checked on 2026-10-20 unless noted; the changeset count was refreshed on 2026-10-24:

- [x] `.changeset/` holds 73 changesets (main at e2e247e), as listed under Pending changesets. `pnpm changeset status` reports a major for the eight published clients, so the Effect 4 and `ApiError` majors from [[plans/index]] are present.
- [x] The repository variable `RELEASE_ENABLED` is not set, and neither is any other repository variable but the `HQ_*` ones (`gh variable list`).
- [ ] The `HQ_APP_ID` and `HQ_APP_PRIVATE_KEY` organization secrets are visible to this repository. They were not on 2026-10-27: their selected repositories are declared in sferarc/infra `github/adopted.ts` and did not include `openapi` (see Scheduled regeneration in [[architecture/pipeline]]). `release.yml` used the org PAT `GIT_TOKEN` until GitHub started rejecting it around 2026-10-23. Whether the App token's auto-merge lands the version PR through the ruleset is unknown until the first run.
- [x] The repository setting "Allow auto-merge" is on, so `gh pr merge --auto` on the version PR works. Evidence: `gh api repos/sferarc/openapi --jq .allow_auto_merge` returns `true`; #56 to #61 also had auto-merge enabled on 2026-10-20 (`gh pr list --state all --json number,autoMergeRequest`), which GitHub only allows while the setting is on.
- [ ] Each of the eight published clients has a trusted publisher on npmjs.com naming `sferarc/openapi` and `release.yml`. This cannot be checked from the repository. They were configured for the earlier monorepo. Do this before setting `RELEASE_ENABLED`: if the OIDC publish of one client fails, `changeset publish` exits non-zero after the other clients have published, and the step then fails. `changesets/action` (pinned at `ae32849`) runs the publish script with `ignoreReturnCode: true` in `runPublish` (`src/run.ts`), reads the `CHANGESETS_OUTPUT` ndjson, pushes tags and creates GitHub releases for every package listed there, and only then throws on the non-zero exit in `src/index.ts`. `@changesets/cli` 3.0.3 (`dist/publish.mjs`) tags the successful publishes and writes them to that file before it exits 1, and `scripts/release.sh` calls `pnpm changeset publish`, which inherits the variable. So the clients that succeeded are published, tagged and released, and the step then fails. Recovery is to fix the publisher and rerun the workflow, which publishes only versions npm lacks and then tags them.
- [x] Nothing in the Release job needs an npm token, so no secret has to be added.

Not run: `pnpm release` itself, because `changeset publish` has no dry-run mode and would publish.

## Current state

As of 2026-10-14 (`npm view <package> version`, unchanged since the 2026-10-08 check):

- Eight clients are on npm at the versions in their `package.json`. Those versions were published from the earlier monorepo (`repository.url` on npm still names it).
- `vercel-api-js` and `netlify-api` on npm declare `@sferadev/openapi-utils@0.0.1` as a dependency, which does not exist on npm, so installing them fails. The pending changeset from #1 fixes this for the five affected clients at their next release.

## Pending changesets

As of 2026-10-24 (main at e2e247e), `.changeset/` holds 73 changesets besides `README.md` and `config.json`. The first release will be a major for all eight published clients:

- Majors: `effect-v4.md` for the five published Effect clients (#6, [[decisions/2026-10-08-effect-4-major]]), and `http-errors-as-api-error.md` for all eight published clients, the new `{ status, payload }` rejection shape (#8, made a major in #9).
- `spec-keys-kept-vercel-api-js.md` and `spec-keys-kept-v0-api.md`, majors that type and send JSON request bodies as JSON and switch the types to the API's own property names ([[decisions/2026-10-27-keep-spec-keys]]).
- `litellm-spec-source.md`, a major for `litellm-api` that removes the hosted billing and model catalog operations when the client moves to the self-hosted proxy spec (#64).
- Minors: `path-encoding-vercel-api-js.md`, a minor because its regenerated spec adds operations (#17); `raw-request-bodies-netlify-api.md`, the `body` parameter for non-JSON request bodies (#25); `url-encoded-bodies-*.md` for `cloudflare-api-js`, `keycloak-api` and `litellm-api`, the `body` parameter for url-encoded request bodies; `json-suffix-bodies-cloudflare-api-js.md`, the `body` parameter for `application/scim+json` request bodies.
- Patches: `bundle-openapi-utils.md` (#1), `inline-effect-types.md` (#4), `fetcher-query-serialization.md` (#16), `path-encoding-*.md` for the other seven clients (#17), `path-params-keep-slashes-*.md` for `cloudflare-api-js`, `keycloak-api` and `netlify-api` (#23), `untagged-operations-*.md` for `cloudflare-api-js`, `keycloak-api`, `litellm-api` and `vercel-api-js` (#24), `request-via-operations-*.md` for all eight clients (#26), `fetcher-empty-body-header-case.md` for all eight clients (#28), `zoom-refresh-basic-auth.md` (#30), `effect-error-message-*.md` for the five Effect clients (#33), `fetcher-failure-detail-*.md` for all eight clients (#37), `dts-private-types-*.md` for `keycloak-api` and `v0-api` (#42), `effect-abort-signal-*.md` for the five Effect clients (#46), and `stream-upload-duplex-netlify-api.md`, which sends a `ReadableStream` upload body with `duplex: "half"` so Node's `fetch` accepts it (#50, `packages/netlify-api/src/utils/fetcher.ts`). `multipart-arrays-objects-*.md` for `cloudflare-api-js`, `litellm-api`, `netlify-api` and `zoom-api-js` send the array and object fields of a multipart body (#91). `api-own-keys-*.md` for the seven clients with a `client.api` proxy make it return `undefined` for `Object.prototype` names (`packages/*/src/client.ts`). `binary-responses-as-blob.md` for all eight clients resolves a binary response as a `Blob` instead of UTF-8 text (`packages/*/src/utils/fetcher.ts`). `param-types-from-spec.md` for `cloudflare-api-js`, `litellm-api`, `v0-api`, `vercel-api-js` and `zoom-api-js` types path, query and header parameters with the generated plugin-ts types instead of `unknown` ([[architecture/shared-utils]]). `stream-upload-duplex.md` extends the `duplex: "half"` fix of #50 to `cloudflare-api-js`, `keycloak-api` and `vercel-api-js`, whose raw body operations have been typed to accept a `ReadableStream` since the raw body fallback in `adapterOasWithRawBodies` (`packages/*/src/utils/fetcher.ts`). `line-delimited-json-*.md` for `cloudflare-api-js`, `litellm-api` and `vercel-api-js` resolve an ndjson, jsonl or `stream+json` response to an array of its lines ([[architecture/packages]]).
- Spec updates: 19 generated `<package>-<uuid>.md` changesets from the regeneration PRs #56 to #61 (2026-10-20): minors for `netlify-api` (3), `nuki-api-js` (1), `v0-api` (7), and `vercel-api-js` (4), and patches for `keycloak-api` (2) and `vercel-api-js` (2). `zoom-spec-source.md` is a patch for `zoom-api-js` that regenerates from Zoom's current spec (#64).
