# Shared utils

`packages/openapi-utils` (`@sferadev/openapi-utils`) is private and unpublished (`"private": true` in its `package.json`; `npm view` returns 404). Clients bundle it ([[decisions/2026-10-08-bundle-openapi-utils]]).

## Entry points

- `.` (`src/index.ts`): the kubb side, used only at generation time.
  - `baseConfig` and `createConfig({ outputPath, importPath, skipZod })` (`src/kubb/index.ts`).
  - `pluginClient` (`src/kubb/plugin.ts`) with its generators in `src/kubb/client/` and the operation component in `src/kubb/components/`. kubb 5 stable dropped `@kubb/plugin-client`, so the plugin shell lives here (comment in `plugin.ts`).
  - Spec transforms (`src/kubb/spec-transforms.ts`): `fetchSpec`, `cleanOperationIds`, `sortArrays`, `addMissingPathParams`, `fixArrayItems`, `fixUnionConstraints`, `sanitizeEnumValues`, `camelCasePathParams`, `renameReservedWords`, `fixRegexPatterns`, `camelCaseProperties`.
- `./effect` (`src/effect/index.ts`): the runtime side, shipped inside each client's `effect` entry.
  - Tagged errors `ValidationError`, `ApiError`, `NetworkError`, the `ApiConfig` context tag and `makeApiLayer` (`src/effect/errors.ts`).
  - `createEffectApi` and `createEffectByPath` (`src/effect/proxy.ts`).

## Why it matters

A change here reaches every client at the next generation, and a change to `src/effect/` reaches every client's published `effect` entry at the next build. The `effect` peer is `^4.0.0` since [[decisions/2026-10-08-effect-4-major]].
