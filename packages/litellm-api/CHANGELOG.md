# litellm-api

## 2.0.3

### Patch Changes

- e674864: No exported operations or types were added or removed; only internal changes were made to the generated TypeScript client.

## 2.0.2

### Patch Changes

- 3babd7e: Type an operation's path, query and header parameters with the generated `<Operation>Path`, `<Operation>Query` and `<Operation>Headers` types instead of an inline object. A parameter whose schema is a `$ref`, a `oneOf`/`anyOf` union or an object used to be typed `unknown`, which accepted any value: Cloudflare's `accountId` path parameter and `per_page` query parameter, LiteLLM's nullable filters such as `team_id` and `start_date`, Vercel's `domain`, v0's `metadata` filter on `chatsFind` and Zoom's `meetingId`. Query and header parameters stay optional.

## 2.0.1

### Patch Changes

- f0a7687: Enhanced several response and request types with additional fields for improved detail and flexibility.
- f0a7687: Added new enum values and fields across multiple types to expand configuration options and support new features.

## 2.0.0

### Major Changes

- 49d548e: Breaking: a failed HTTP response now rejects with `{ status, payload }`, where `status` is the HTTP status code and `payload` is the parsed error body (or a description string when the body is not JSON). It used to reject with `{ name: "unknown", message }`, losing both. Code that reads `error.message` from a rejected call should read `error.status` and `error.payload` instead. Requests that never get a response still reject with `{ name: "unknown", message }`. In the Effect bindings, HTTP errors now fail with `ApiError` carrying the status instead of `NetworkError`.
- 04fa8d2: The client now targets the self-hosted LiteLLM proxy API, generated from `docs.litellm.ai/openapi.json`, instead of LiteLLM's hosted billing and model catalog API at `api.litellm.ai`, which no longer resolves.
  
  Breaking: the hosted API's operations are removed, together with their types and schemas: `createCheckoutBillingCheckoutPost`, `checkUsageBillingUsageGet`, `listModelCatalogModelCatalogGet` and `getModelCatalogEntryModelCatalogModelIdGet`, and `CheckoutResponse`, `FreeTierResponse`, `ModelCatalogEntry` and `ModelCatalogListResponse`. Call the hosted API directly if you still need them.

### Minor Changes

- 51047aa: [BREAKING] Replaced dynamicMcpRouteMcpServerNameMcpHead with dynamicMcpRouteMcpServerNameMcpGet, updating types as necessary.
- b657b4b: [BREAKING] Changed HTTP method for dynamicMcpRouteMcpServerNameMcpPatch to PUT and renamed to dynamicMcpRouteMcpServerNameMcpPut.
- b657b4b: [BREAKING] Changed HTTP method for toolsetMcpRouteToolsetToolsetNameMcpOptions to HEAD and renamed to toolsetMcpRouteToolsetToolsetNameMcpHead.
- b657b4b: [BREAKING] Changed HTTP method for toolsetMcpRouteToolsetToolsetNameMcpPut to POST and renamed to toolsetMcpRouteToolsetToolsetNameMcpPost.
- 51047aa: [BREAKING] Replaced toolsetMcpRouteToolsetToolsetNameMcpOptions with toolsetMcpRouteToolsetToolsetNameMcpPost, updating all related types.
- 51047aa: [BREAKING] Replaced toolsetMcpRouteToolsetToolsetNameMcpDelete with toolsetMcpRouteToolsetToolsetNameMcpPut, and associated types were updated accordingly.
- b657b4b: [BREAKING] Changed HTTP method for dynamicMcpRouteMcpServerNameMcpPost to GET and renamed to dynamicMcpRouteMcpServerNameMcpGet.
- 51047aa: [BREAKING] Replaced toolsetMcpRouteToolsetToolsetNameMcpPatch with toolsetMcpRouteToolsetToolsetNameMcpOptions, and renamed associated types.
- 51047aa: Added enums for token count response sources and related types.
- b657b4b: [BREAKING] Changed HTTP method for dynamicMcpRouteMcpServerNameMcpPut to POST and renamed to dynamicMcpRouteMcpServerNameMcpPost.
- b657b4b: [BREAKING] Changed HTTP method for dynamicMcpRouteMcpServerNameMcpDelete to OPTIONS and renamed to dynamicMcpRouteMcpServerNameMcpOptions.
- 51047aa: [BREAKING] Replaced dynamicMcpRouteMcpServerNameMcpPatch with dynamicMcpRouteMcpServerNameMcpOptions, and updated associated types.
- 51047aa: [BREAKING] Replaced toolsetMcpRouteToolsetToolsetNameMcpHead with toolsetMcpRouteToolsetToolsetNameMcpGet, updating all related types.
- b657b4b: [BREAKING] Changed HTTP method for dynamicMcpRouteMcpServerNameMcpHead to PATCH and renamed to dynamicMcpRouteMcpServerNameMcpPatch.
- b657b4b: [BREAKING] Changed HTTP method for toolsetMcpRouteToolsetToolsetNameMcpPatch to PUT and renamed to toolsetMcpRouteToolsetToolsetNameMcpPut.
- 51047aa: [BREAKING] Replaced dynamicMcpRouteMcpServerNameMcpPost with dynamicMcpRouteMcpServerNameMcpDelete, with corresponding type updates.
- 51047aa: [BREAKING] Replaced dynamicMcpRouteMcpServerNameMcpPut with dynamicMcpRouteMcpServerNameMcpHead, and updated types accordingly.
- 51047aa: [BREAKING] Replaced toolsetMcpRouteToolsetToolsetNameMcpGet with toolsetMcpRouteToolsetToolsetNameMcpPatch, and renamed associated types.
- 51047aa: [BREAKING] Replaced toolsetMcpRouteToolsetToolsetNameMcpPut with toolsetMcpRouteToolsetToolsetNameMcpHead, with corresponding type updates.
- 51047aa: [BREAKING] Replaced dynamicMcpRouteMcpServerNameMcpGet with dynamicMcpRouteMcpServerNameMcpPatch, and renamed associated types.
- b657b4b: [BREAKING] Changed HTTP method for dynamicMcpRouteMcpServerNameMcpOptions to HEAD and renamed to dynamicMcpRouteMcpServerNameMcpHead.
- b657b4b: [BREAKING] Changed HTTP method for toolsetMcpRouteToolsetToolsetNameMcpGet to DELETE and renamed to toolsetMcpRouteToolsetToolsetNameMcpDelete.
- b657b4b: [BREAKING] Changed HTTP method for toolsetMcpRouteToolsetToolsetNameMcpHead to PATCH and renamed to toolsetMcpRouteToolsetToolsetNameMcpPatch.
- 51047aa: [BREAKING] Replaced toolsetMcpRouteToolsetToolsetNameMcpPost with toolsetMcpRouteToolsetToolsetNameMcpDelete, and updated types to match.
- b657b4b: [BREAKING] Changed HTTP method for toolsetMcpRouteToolsetToolsetNameMcpDelete to OPTIONS and renamed to toolsetMcpRouteToolsetToolsetNameMcpOptions.
- b657b4b: [BREAKING] Changed HTTP method for toolsetMcpRouteToolsetToolsetNameMcpPost to GET and renamed to toolsetMcpRouteToolsetToolsetNameMcpGet.
- 51047aa: [BREAKING] Replaced dynamicMcpRouteMcpServerNameMcpOptions with dynamicMcpRouteMcpServerNameMcpPost, updating all related types.
- 51047aa: [BREAKING] Replaced dynamicMcpRouteMcpServerNameMcpDelete with dynamicMcpRouteMcpServerNameMcpPut, and associated types were changed.
- b657b4b: [BREAKING] Changed HTTP method for dynamicMcpRouteMcpServerNameMcpGet to DELETE and renamed to dynamicMcpRouteMcpServerNameMcpDelete.
- b63eee1: Add a `body` parameter to the operations that only take an `application/x-www-form-urlencoded` request body, sent as form fields. Before this, the OAuth operations `tokenEndpointTokenPost`, `tokenEndpointMcpServerNameTokenPost`, `introspectEndpointIntrospectPost`, `revokeEndpointRevokePost` and `authorizeCompleteAuthorizeCompletePost` could not send their form fields, such as `grant_type` and `code`.

### Patch Changes

- 76653f2: Return `undefined` from `client.api` for `Object.prototype` names such as `constructor` or `toString`, instead of a namespace or an operation wrapper that calls the inherited method.
- dc5ea2c: Resolve a binary response, such as a zip, an octet-stream, a PDF or an image, as a `Blob` instead of a string decoded as UTF-8, which corrupted the bytes of downloads like `chatsDownloadVersion` in `v0-api`, `downloadArtifact` in `vercel-api-js` and Workers KV values in `cloudflare-api-js`. A custom `fetchImpl` whose response has no `blob()` still gets the text.
- c80f59d: Resolve a 204 or an empty successful body to `undefined` instead of rejecting with a network error, and let a header such as `authorization` or `content-type` replace the default regardless of case instead of being sent alongside it
- 21eaaa2: Reject a failed request with a real `Error` that names the method and path, gives the reason and keeps the original exception as `cause`, instead of a plain object with no stack, and keep the raw body text (up to 1000 characters) as the payload when an error response is not JSON, instead of the JSON parser's message. An aborted request rejects with the `AbortError` itself, so callers can tell it from a network failure.
- 1fc5b21: Omit undefined query parameters and send arrays as repeated keys
- b657b4b: Added export types for response bodies for several endpoints: AuthorizeCompleteAuthorizeCompletePost, IntrospectEndpointIntrospectPost, RevokeEndpointRevokePost, TokenEndpointTokenPost, and TokenEndpointMcpServerNameTokenPost.
- 04e3208: Added new optional parameters to several POST operations, including audio transcriptions, video generation, image edit, file creation, logo upload, and prompt file conversion.
- 40d8746: Send array and object fields of a multipart body instead of dropping them: an array is sent as one part per item and an object as a JSON part, and a bigint field as a string. Before this, the image edit operations sent no `image` or `mask`.
- a761355: Percent-encode path parameters in generated operations, so a value containing `/`, `?`, `#` or `..` can no longer change which endpoint is called. Required path parameters now accept falsy values such as `0`, and multipart bodies send number and boolean fields as strings instead of dropping them. Regenerated from the current upstream spec.
- 613be44: `request()` now calls the generated operation instead of the raw fetcher, so path parameters are substituted, validated and percent-encoded the same way as through `api`. An unknown endpoint throws.
- 9865850: Expose operations without a tag under `client.api.default` and the Effect `ApiService.default`, and merge tags that differ only in case or separators into one namespace instead of dropping all but the last.

## 1.1.0

### Minor Changes

- 5223c4e: Migrated code generation to kubb v5.
  
  The generated client functions are unchanged — same names, same signatures, same behaviour — so
  calling code needs no updates. Auxiliary type exports were restructured by kubb v5: `*RequestConfig`
  is now `*Options`, and per-parameter types are now grouped (`FooPathBarId` → `FooPath`,
  `FooQueryLimit` → `FooQuery`). Only code importing those helper types directly is affected.

## 1.0.0

### Major Changes

- 05e1980: Migrate from openapi-codegen to kubb for code generation.

  Breaking changes:

  - Generated code is now in `./src/generated/` instead of `./src/api/` or other locations
  - Export structure changed: now exports `Fetchers`, `Helpers`, `Schemas`, `Types` instead of previous structure
  - `FetcherExtraProps` renamed to `FetcherConfig`
  - Added new type exports: `ApiClient`, `ApiOperation`, `ApiOperationParams`, `ApiOperationResult`, `ApiOperationByMethod`

- a4be685: Switched the OpenAPI source from `www.demo.litellm.ai` (suspended) to the LiteLLM Model Catalog API at `api.litellm.ai`. The generated client now exposes `model_catalog` and `billing` endpoints instead of the previous proxy admin surface.

### Minor Changes

- 74ad091: Migrate OpenAPI clients to SferaDev monorepo with improved build configuration, updated dependencies, and enhanced TypeScript support.

### Patch Changes

- 9c69bd2: Update video generation schemas to allow input_reference to accept File instances.
- 9c69bd2: Add documentation comments to type definitions in types file for improved clarity.
- 33a8b3a: [BREAKING] Made the 'body' parameter required for multiple mutation request functions instead of optional.

## 0.0.3

### Patch Changes

- 4140a48: Fix baseUrl injection

## 0.0.2

### Patch Changes

- 33a1365: Initial release
