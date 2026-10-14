# Shared utils

`packages/openapi-utils` (`@sferadev/openapi-utils`) is private and unpublished (`"private": true` in its `package.json`; `npm view` returns 404). Clients bundle it ([[decisions/2026-10-08-bundle-openapi-utils]]).

## Entry points

- `.` (`src/index.ts`): the kubb side, used only at generation time.
  - `baseConfig` and `createConfig({ outputPath, importPath, skipZod })` (`src/kubb/index.ts`).
  - `adapterOasWithRawBodies` (`src/kubb/adapter.ts`) wraps `adapterOas`. With `contentType: "application/json"` the adapter drops every other media type, so operations that only accept a non-JSON body had no `body` parameter. The wrapper parses a second time without `contentType` and copies the first non-JSON, non-url-encoded request body onto those operations only; JSON operations are unchanged. The operation component types such a body as `Blob | ArrayBuffer | Uint8Array | ReadableStream | string` and multipart bodies as a `FormData` built from the fields.
  - `pluginClient` (`src/kubb/plugin.ts`) with its generators in `src/kubb/client/` and the operation component in `src/kubb/components/`. kubb 5 stable dropped `@kubb/plugin-client`, so the plugin shell lives here (comment in `plugin.ts`).
    - Tag namespaces (`src/kubb/client/extra.tsx`, #24): an operation without a tag goes under `default` in `operationsByTag` and `tagDictionary`, so `client.api.default` and the Effect `ApiService.default` reach it. Each tag is lower-cased and camel-cased into a key, and tags that land on the same key (Cloudflare's `brand_protection` and `Brand Protection`) share one namespace; before #24 the last such tag replaced the others. An operation with several tags appears under each.
    - Path parameters (`buildUrlTemplate` in `src/kubb/components/client-operation.tsx`, #17, #23): a parameter named `path`, `file_path` or `filepath` (any case) is encoded segment by segment, keeping slashes and existing `%XX` escapes, so file paths and values already passed through `encodeURI` arrive unchanged. Every other path parameter goes through `encodeURIComponent` in full.
  - Spec transforms (`src/kubb/spec-transforms.ts`): `fetchSpec` (throws on a non-OK status or a body without an `openapi`/`swagger` version and non-empty `paths`), `cleanOperationIds`, `sortArrays`, `addMissingPathParams`, `fixArrayItems`, `fixUnionConstraints`, `sanitizeEnumValues`, `camelCasePathParams`, `renameReservedWords`, `fixRegexPatterns`, `camelCaseProperties`.
- `./effect` (`src/effect/index.ts`): the runtime side, shipped inside each client's `effect` entry.
  - Tagged errors `ValidationError`, `ApiError`, `NetworkError`, the `ApiConfig` context tag and `makeApiLayer` (`src/effect/errors.ts`).
  - `createEffectApi` and `createEffectByPath` (`src/effect/proxy.ts`).

## Why it matters

A change here reaches every client at the next generation, and a change to `src/effect/` reaches every client's published `effect` entry at the next build. The `effect` peer is `^4.0.0` since [[decisions/2026-10-08-effect-4-major]].
