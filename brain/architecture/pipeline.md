# Generator pipeline

## Steps

1. `pnpm generate --filter=<package>` runs the package's `generate` script through Turborepo (`package.json`, `turbo.json`). Turborepo builds `@sferadev/openapi-utils` first (`"dependsOn": ["^build"]`).
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
- `packages/clickhouse-cloud/kubb.config.ts` only rewrites placeholder Slack webhook URLs in examples, which GitHub push protection flags as secrets (#2).
- `packages/cloudflare-api-js/package.json` skips regeneration when `src/generated/` is younger than 300 minutes; `generate:force` always regenerates.

## Scheduled regeneration

`.github/workflows/update-openapi.yml` regenerates every client in a matrix, formats with `pnpm check:fix`, and runs `.github/workflows/scripts/changes.ts`, which asks an OpenAI model to classify the diff as `patch` or `minor` and writes a changeset. It then opens or updates one PR per package on the branch `openapi/<package>` and enables auto-merge on it. The hourly schedule only runs when the repository variable `SPEC_UPDATES_ENABLED` is `true`; a manual dispatch always runs (comment in the workflow). See [[development/release]] for what a merged changeset does.

A new client must be added to that matrix, to `apps/openapi/src/lib/npm.ts` and `apps/openapi/src/app/page.tsx`, and to `configs/knip.json`, as #2 did for `clickhouse-cloud`.
