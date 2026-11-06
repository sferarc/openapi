# CI

`.github/workflows/ci.yml` runs one job, `Check`, on pull requests to `main` and on pushes to `main`, on GitHub-hosted runners because the repository is public (comment in the workflow):

1. `.github/actions/setup`: mise installs Node and pnpm, then `pnpm install --frozen-lockfile --prefer-offline`, with `node_modules` cached on `pnpm-lock.yaml` and `mise.lock`.
2. `pnpm tsc`: every workspace's `tsc` through turbo, then `tsc -p .github/workflows/scripts` for the spec pipeline scripts, which sit outside every workspace.
3. `pnpm check`
4. `pnpm exec lefthook validate`, since CI never runs the hooks themselves.
5. `pnpm test`
6. `pnpm audit --prod --audit-level high`: fails on a high or critical advisory in the dependencies the published packages and apps ship, across every workspace from the one lockfile; devDependencies are left out. Accepted advisories go in `auditConfig.ignoreGhsas` in `pnpm-workspace.yaml`, one GHSA per entry with a comment giving the reason and what ends the exception; `pnpm audit --ignore <GHSA>` writes to that same list, so a separate ignore file would drift from it. It is the last step so a registry outage does not hide the other results. Empty and passing on main on 2026-11-06 (#421).

## Branch rules

The `main` ruleset requires a pull request, linear history, and squash or rebase merges, and blocks deletion and force pushes. Required statuses are `Check`, `Approved stack` and `No Claude attribution` (repository ruleset `main-default`, read through the GitHub API on 2026-10-08).

## Other workflows

- `release.yml`: see [[release]].
- `update-openapi.yml`: see [[architecture/pipeline]].
- `hq-stack.yml`: the `Approved stack` and `No Claude attribution` jobs (#3). Its header says it is a rendered copy that is not edited here.
