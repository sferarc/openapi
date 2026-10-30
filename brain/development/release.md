# Release

Releases use changesets (`.changeset/config.json`): every client is versioned and published with `access: public`; the website is ignored; private packages are versioned but not tagged.

## Flow

1. A pull request that changes a client adds a changeset (`pnpm changeset`), or `update-openapi.yml` writes one ([[architecture/pipeline]]).
2. On a push to `main`, `.github/workflows/release.yml` runs `changesets/action`. With pending changesets it opens or updates a version PR and enables auto-merge on it; the required `Check` job is that PR's only review (comment in the workflow).
3. Merging the version PR leaves no pending changesets, so the next run publishes: `pnpm release` runs `scripts/release.sh`, which builds every package and runs `changeset publish` for versions npm does not have yet.

Authentication is npm trusted publishing: `id-token: write` lets npm exchange the GitHub OIDC token for a publish credential, and each package's `publishConfig` sets `provenance: true`. No npm token is stored and nothing writes `~/.npmrc`. Each package's trusted publisher on npmjs.com must name this repository and `release.yml` (comments in `release.yml`).

## Publishing is on, and every publish so far failed

The release job only runs when the repository variable `RELEASE_ENABLED` is `true` (`if:` in `release.yml`). The owner set it on 2026-10-28 at 15:30 UTC (`gh variable list`), so every push to `main` now runs the job and every changeset reaches a "Version Packages" PR.

What happened on 2026-10-28 (`gh run list --workflow release.yml`, checked again on 2026-10-29):

1. The version PRs #107, #116, #118, #120, #122 and #131 were opened by `changesets/action` with the `sferarc-hq` App token and merged on their own, so the App token and auto-merge work through the ruleset. They consumed every pending changeset: each client's `package.json` and `CHANGELOG.md` on `main` (c1d8dea) carry the bumped version (`cloudflare-api-js` 2.2.0, `keycloak-api` 2.1.1, `litellm-api` 2.0.3, `netlify-api` 2.0.2, `nuki-api-js` 2.0.2, `v0-api` 1.0.4, `vercel-api-js` 2.1.2, `zoom-api-js` 2.1.2).
2. The publish run after each of those merges failed (runs 40742321131, 40755161663, 40771838753, 40774105723, and 40789102913 after #131). In the last one, `changeset publish` rejected all eight clients with `ERR_PNPM_FAILED_TO_PUBLISH ... (status 404 Not Found)`, so nothing was published, tagged or released.
3. npm still serves the versions published from the earlier monorepo (`npm view <package> version` on 2026-10-28: `cloudflare-api-js` 1.1.0, `keycloak-api` 1.2.0, `litellm-api` 1.1.0, `netlify-api` 1.4.1, `nuki-api-js` 1.2.0, `v0-api` 0.3.1, `vercel-api-js` 1.38.2, `zoom-api-js` 1.3.2). The newest git tags are from those releases too (`git tag -l`). On 2026-10-29 `npm view` still returned 1.1.0 for `cloudflare-api-js`, 1.38.2 for `vercel-api-js` and 0.3.1 for `v0-api`.

Nothing changed through 2026-10-30. Version PRs kept landing (#205 and #207 among them), and every push to `main` that leaves no pending changeset runs the publish, which fails the same way: run 41089606790 after #207 tried `cloudflare-api-js` 4.1.0, `keycloak-api` 3.1.0, `litellm-api` 2.2.2, `netlify-api` 3.0.4, `nuki-api-js` 3.0.1, `v0-api` 1.0.16, `vercel-api-js` 2.5.9 and `zoom-api-js` 3.0.2, the versions in each `package.json` on `main` at c0e3b7a, and got `ERR_PNPM_FAILED_TO_PUBLISH ... (status 404 Not Found)` for all eight. The newest tags are still the earlier monorepo's (`git tag -l`). The 404 is most likely the missing npm trusted publishers from the checklist below, since OIDC is the only credential the job has; that is unconfirmed, because the npm side cannot be read from this repository. Fixing it is the owner's step on npmjs.com. After that, rerunning the last failed run publishes every version npm lacks, the majors from the first version PR included.

## The release sequence

`release.yml` triggers on a push to `main` and on `workflow_dispatch`.

1. A run with pending changesets: `changesets/action` runs `changeset version` and opens the "Version Packages" PR from `changeset-release/main` with a `sferarc-hq` App installation token minted at the start of the job. It bumps the versions, writes each `CHANGELOG.md` and deletes the changesets. The last step then runs `gh pr merge --squash --auto` on that PR. Nothing is published yet.
2. The PR merges once `Check`, `Approved stack` and `No Claude attribution` pass. Auto-merge was enabled with the App token, so the squash commit's push triggers the workflow again, which a `github.token` merge would not.
3. A run with no pending changesets: `pnpm release` builds `./packages/*` through turbo and runs `changeset publish`. It publishes each version npm lacks with provenance over OIDC, tags it `<name>@<version>`, pushes the tags and creates a GitHub release per published package (`createGithubReleases` defaults to true and `release.yml` does not override it). `@sferadev/openapi-utils` is private and is not tagged (`privatePackages.tag`).

If the OIDC publish of one client fails, `changeset publish` exits non-zero after the other clients have published, and the step then fails. `changesets/action` (pinned at `ae32849`) runs the publish script with `ignoreReturnCode: true` in `runPublish` (`src/run.ts`), reads the `CHANGESETS_OUTPUT` ndjson, pushes tags and creates GitHub releases for every package listed there, and only then throws on the non-zero exit in `src/index.ts`. `@changesets/cli` 3.0.3 (`dist/publish.mjs`) tags the successful publishes and writes them to that file before it exits 1, and `scripts/release.sh` calls `pnpm changeset publish`, which inherits the variable. So the clients that succeeded are published, tagged and released. Recovery is to fix the publisher and rerun the workflow, which publishes only versions npm lacks and then tags them.

## Checklist

Checked on 2026-10-28:

- [x] `RELEASE_ENABLED` is `true` (`gh variable list`).
- [x] The `HQ_APP_ID` and `HQ_APP_PRIVATE_KEY` organization secrets are visible to this repository: the release runs mint the App token and open the version PRs.
- [x] "Allow auto-merge" is on, and the version PRs landed through it.
- [ ] Each of the eight published clients has a trusted publisher on npmjs.com naming `sferarc/openapi` and `release.yml`. They were configured for the earlier monorepo; the 404s above suggest they are still missing.
- [x] Nothing in the Release job needs an npm token, so no secret has to be added.

## Pending changesets

As of 2026-10-30 (main at c0e3b7a), `.changeset/` holds no changesets besides `README.md` and `config.json`: the version PRs consumed them, and each client's `CHANGELOG.md` lists what they carried. Every user-facing change now needs its own changeset, because the next push to `main` turns it into a version PR (`pnpm changeset`, or the changeset `update-openapi.yml` writes, [[architecture/pipeline]]).

Before 2026-10-28 the pending changesets accumulated while publishing was off; the first version PR (#107) made a major of every published client, for Effect 4 ([[decisions/2026-10-08-effect-4-major]]) and the `{ status, payload }` HTTP error shape (#8, #9), and `@sferadev/openapi-utils` is bundled into each client since #1, which fixes installing `vercel-api-js` and `netlify-api` from npm once those versions are published.
