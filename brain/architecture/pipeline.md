# Generator pipeline

## Steps

1. `pnpm generate --filter=<package>` runs the package's `generate` script through Turborepo (`package.json`, `turbo.json`). Turborepo builds `@sferadev/openapi-utils` first (`"dependsOn": ["^build"]`). The task is uncached (`"cache": false`) because it reads a remote spec, so every run fetches the live spec.
2. The script deletes `src/generated/` and runs `kubb generate` (for example `packages/clickhouse-cloud/package.json`).
3. The package's `kubb.config.ts` fetches the live spec with `fetchSpec` (a URL, with a timeout; `packages/openapi-utils/src/kubb/spec-transforms.ts`), applies whichever transforms that spec needs, and spreads `baseConfig` from [[shared-utils]].
4. kubb writes three files into `src/generated/` (`packages/openapi-utils/src/kubb/index.ts`):
   - `types.ts` from `@kubb/plugin-ts`, enums as `as const` objects.
   - `components.ts` from the repository's own client plugin (`packages/openapi-utils/src/kubb/plugin.ts`), which emits one function per operation plus `operationsByTag`, `operationsByPath` and `tagDictionary`.
   - `schemas.ts` from `@kubb/plugin-zod`, with a `// @ts-nocheck` banner, unless the config passes `skipZod`.
5. kubb's `postGenerate` runs `biome check --write` on the output, because CI gates on `biome check` and kubb's own formatting leaves import order unsorted (comment in `packages/openapi-utils/src/kubb/index.ts`).

## Per-spec fixups

Each `kubb.config.ts` carries the transforms its spec needs, so the fixups differ per package:

- `packages/vercel-api-js/kubb.config.ts` uses most of the shared transforms, renames a few operation IDs and repairs a malformed `groupIds` schema.
- `packages/keycloak-api/kubb.config.ts` generates twice: the admin API from Keycloak's published spec and the account API from the checked-in `specs/account.yaml`, selected by `KUBB_TARGET` (`packages/keycloak-api/package.json`).
- `packages/zoom-api-js/kubb.config.ts` fetches the Meetings spec from `https://developers.zoom.us/api/zoap/meetings/methods`. Zoom's redesigned developer site dropped the old `/api-hub/meetings/methods/endpoints.json` path, which now returns 404 (checked 2026-10-20).
- `packages/litellm-api/kubb.config.ts` fetches `https://api.litellm.ai/openapi.json`, whose host does not resolve in DNS (NXDOMAIN, checked 2026-10-20 from a local machine). Unknown whether it resolves from CI; the BerriAI repo's `litellm/proxy/openapi.json` is a minimal stub and not an equivalent.
- `packages/clickhouse-cloud/kubb.config.ts` only rewrites placeholder Slack webhook URLs in examples, which GitHub push protection flags as secrets (#2).

## Scheduled regeneration

`.github/workflows/update-openapi.yml` regenerates every client in a matrix, formats with `pnpm check:fix`, and runs `.github/workflows/scripts/changes.ts`, which writes at least one changeset whenever the package has changes. It streams `git diff`, reduces it to hunk headers and exported declarations of `src/generated/{types,components}.ts` capped at 60,000 characters (`summarizeDiff` in `scripts/changeset.ts`), and asks an OpenAI model for `patch` or `minor` entries (`generateText` with `Output.object`). The root `pnpm tsc` typechecks the script through `.github/workflows/scripts/tsconfig.json`, so a breaking `ai` or `@ai-sdk/openai` bump fails CI instead of the next spec run. Without `OPENAI_API_KEY`, or when the call fails or returns nothing, it writes `"<package>": patch` "Regenerate from the latest <package> OpenAPI spec." A removed `export async function` always adds a `[BREAKING]` minor entry, whatever the model says. Only a failure to read git state exits non-zero, which stops the job before the PR is opened. It then opens or updates one PR per package on the branch `openapi/<package>` and enables auto-merge on it. The hourly schedule only runs when the repository variable `SPEC_UPDATES_ENABLED` is `true`; a manual dispatch always runs (comment in the workflow). See [[development/release]] for what a merged changeset does.

A new client must be added to that matrix, to `apps/openapi/src/lib/npm.ts` and `apps/openapi/src/app/page.tsx`, and to `configs/knip.json`, as #2 did for `clickhouse-cloud`.
