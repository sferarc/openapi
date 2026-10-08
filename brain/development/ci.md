# CI

`.github/workflows/ci.yml` runs one job, `Check`, on pull requests to `main` and on pushes to `main`, on GitHub-hosted runners because the repository is public (comment in the workflow):

1. `.github/actions/setup`: mise installs Node and pnpm, then `pnpm install --frozen-lockfile --prefer-offline`, with `node_modules` cached on `pnpm-lock.yaml` and `mise.lock`.
2. `pnpm tsc`
3. `pnpm check`
4. `pnpm exec lefthook validate`, since CI never runs the hooks themselves.
5. `pnpm test`

## Branch rules

The `main` ruleset requires a pull request, linear history, and squash or rebase merges, and blocks deletion and force pushes. Required statuses are `Check`, `Approved stack` and `No Claude attribution`; the last two come from a workflow proposed in #3, not yet on `main` (repository ruleset `main-default`, read through the GitHub API on 2026-10-08).

## Other workflows

- `release.yml`: see [[release]].
- `update-openapi.yml`: see [[architecture/pipeline]].
