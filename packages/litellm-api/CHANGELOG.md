# litellm-api

## 2.14.0

### Minor Changes

- 3a20a99: Add a `litellm-api/effect` entry that exposes every operation as an `Effect`, with the proxy's `baseUrl` and token in a `makeApiLayer` layer and HTTP errors typed as `ApiError` with their status.

## 2.13.0

### Minor Changes

- 652f740: [BREAKING] The path and query types LensRequestLensPathXXXPath/Query and related response types have been reorganized and renamed to match the switched operations.
- 652f740: [BREAKING] The HTTP method and names for the lensRequestLensPathXXX, lensRequestLensXXX, toolsetMcpRouteToolsetToolsetNameMcpXXX, and dynamicMcpRouteMcpServerNameMcpXXX functions have been rotated/mapped to new methods and paths, and their signatures updated accordingly.

### Patch Changes

- 652f740: Added new types and enums for SVG reasoning and complexity in image generation (e.g., ImageGenerationSvgReasoning, ImageGenerationSvg, ToolImageGenerationSvgReasoning).
- 652f740: Added svg_usage field to ImageGenerationCall and ResponsesAPIRequestParamsImageGenerationCall types to support SVG usage metrics.
- 652f740: Added new fields to ImageGeneration and ToolImageGeneration types, such as svg, complexity, and frame metadata.
- 652f740: Added gif and svg as options to image generation output formats.

## 2.12.1

### Patch Changes

- 21566e4: Link the upstream OpenAPI spec the client is generated from in the README, with the fixups applied before generating.

## 2.12.0

### Minor Changes

- 781c21b: An HTTP error response now rejects with an exported `ApiResponseError`, which extends `Error` and keeps `status` and `payload` as before, adds `method` and `path`, and has a message such as `GET /v9/projects returned 403: Not authorized`, so a logged failure names the call and its status. `instanceof Error` is now true for these rejections. The path has its parameters filled in, so the message carries their values. In the Effect bindings an error body with no `message`, `error` or `errors`, such as `{}`, now gives `ApiError.message` as `API error 429: GET /x returned 429: {}` instead of `API Error: 429`.

## 2.11.2

### Patch Changes

- c2120d7: Add npm keywords, describe the package as an unofficial client generated from the vendor's OpenAPI spec, say it is unofficial under the README title, and point the homepage at the client's page on openapi.sferadev.com.

## 2.11.1

### Patch Changes

- cc1e1a0: Ship a generated `OPERATIONS.md` that lists every operation with its call, its `"<METHOD> <path>"` request and the spec's summary, one table per tag, so a coding agent can find an operation with one search instead of reading the generated types. `keycloak-api` ships one for the admin API and one for the account API.

## 2.11.0

### Minor Changes

- 7c0f626: [BREAKING] Remove operations no longer in the litellm-api OpenAPI spec: `activityAvailableLensActivityAvailableGet`, `buildDatasetCasesLensDatasetsBuildPost`, `cachedReviewsLensWorkerLensIdJobIdReviewsGet`, `cancelLensLensLensIdCancelPost`, `claimLensWorkerClaimPost`, `contentLensWorkerLensIdJobIdContentGet`, `createDatasetLensDatasetsPost`, `createIngestionKeyLensTracingKeysPost`, `createLensLensPost`, `deleteFeedbackLensFeedbackDelete`, `evalCasesLensDatasetsDatasetIdRevisionsRevisionCasesGet`, `evidenceContentLensLensIdExecutionsExecutionIdGet`, `exportDatasetLensDatasetsDatasetIdExportGet`, `feedbackSummaryLensFeedbackSummaryPost`, `getSignalsLensSignalsGet`, `heartbeatLensWorkerLensIdJobIdHeartbeatPost`, `ingestionCredentialsLensInternalIngestionCredentialsGet`, `listAgentsLensAgentsGet`, `listDatasetsLensDatasetsGet`, `listIngestionKeysLensTracingKeysGet`, `listLensesLensGet`, `listRunsLensLensIdRunsGet`, `modelLensWorkerLensIdJobIdModelPost`, `previewSampleLensPreviewSamplePost`, `progressLensWorkerLensIdJobIdProgressPost`, `putSignalsLensSignalsPut`, `readDatasetLensDatasetsDatasetIdGet`, `readFeedbackLensFeedbackGet`, `readLensLensLensIdGet`, `readReviewsLensLensIdRunsJobIdReviewsGet`, `readRunLensLensIdRunsJobIdGet`, `registerWorkerLensWorkersRegisterPost`, `resultLensWorkerLensIdJobIdResultPost`, `revokeIngestionKeyLensTracingKeysKeyIdDelete`, `revokeWorkerLensWorkersWorkerIdDelete`, `runLensLensLensIdRunsPost`, `sampleLensWorkerLensIdJobIdSampleGet`, `saveRevisionLensDatasetsDatasetIdRevisionsPost`, `setWorkerBillingLensWorkersWorkerIdBillingKeyPut`, `submitFeedbackLensFeedbackPut`, `traceFindingsLensTracesFindingsPost`, `traceSignalStatusesLensTracesSignalsPost`, `updateFindingLensLensIdFindingsFindingIdPatch`, `updateLensLensLensIdPut`, `watchAllLensWatchAllPost`.
- 7c0f626: [BREAKING] All Lens API operations under /lens and /lens/worker have been consolidated and replaced with generic lensRequest operations using flexible paths and methods.
- 7c0f626: Added operation to delete a user connection via DELETE /credentials/{credential_name}/user_connection.
- 7c0f626: Added operation to get aggregated user daily activity via GET /user/daily/activity/aggregated/users.
- 7c0f626: Added operation to record UI events via POST /telemetry/ui_events.
- 7c0f626: Added operation to update deployment warning ignore status via PATCH /health/deployment_warnings/{warning_id}.
- 7c0f626: Added operation to start a user connection device flow via POST /credentials/{credential_name}/user_connection/start.
- 7c0f626: Added operation to get deployment warnings via GET /health/deployment_warnings.
- 7c0f626: Added operation to list user connections via GET /credentials/user_connections.
- 7c0f626: Added operation to poll user connection device flow via POST /credentials/{credential_name}/user_connection/poll.
- 7c0f626: Added operation to get gateway request error activity via GET /gateway/errors/activity.
- 7c0f626: [BREAKING] Removed all specific Lens Datasets, Feedback, Tracing Keys, Lens, Agents, and Worker API operations in favor of generic LensRequest methods.
- 7c0f626: Added operation to export telemetry reports via GET /telemetry/reports.
- 7c0f626: Added operation to get telemetry settings via GET /telemetry/settings.

### Patch Changes

- 7c0f626: Documented caching behavior for supported providers and endpoints retrieval operations.
- 7c0f626: Documented details for key deletion and per-model budgets in API comments.
- 7c0f626: The `blocked` field was added to filter by routing status in transformRequestUtils operations.
- 7c0f626: Documented that `model_info.successor_model` may now be present for models in model info endpoints.

## 2.10.0

### Minor Changes

- a487d84: `request()` and the Effect `effectByPath` binding reach HEAD and OPTIONS operations, which only `client.api` did before: `client.request("HEAD /v8/artifacts/{hash}", ...)` in `vercel-api-js` and `client.request("OPTIONS /mcp")` in `litellm-api` compiled to an error and threw `Unknown endpoint` at runtime. `ApiOperationByMethod` accepts `"HEAD"` and `"OPTIONS"` in every client.

## 2.9.1

### Patch Changes

- 640c586: Type the MCP route HEAD operations' responses as `void`, which is what the fetcher resolves a HEAD response to: their `200` was `unknown` and their `422` the GET's `HTTPValidationError` body.

## 2.9.0

### Minor Changes

- 87b10ad: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpPut to toolsetMcpRouteToolsetToolsetNameMcpHead and its HTTP method from PUT to HEAD.
- 87b10ad: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpGet to toolsetMcpRouteToolsetToolsetNameMcpOptions and its HTTP method from GET to OPTIONS.
- 87b10ad: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpPut to dynamicMcpRouteMcpServerNameMcpHead and its HTTP method from PUT to HEAD.
- 87b10ad: [BREAKING] Renamed dynamicMcpRouteMcpServerNameMcpPatch to dynamicMcpRouteMcpServerNameMcpGet and changed its HTTP method from PATCH to GET.
- 87b10ad: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpDelete to toolsetMcpRouteToolsetToolsetNameMcpPut and its HTTP method from DELETE to PUT.
- 87b10ad: [BREAKING] Renamed the toolsetMcpRouteToolsetToolsetNameMcpPatch function to toolsetMcpRouteToolsetToolsetNameMcpGet and changed its HTTP method from PATCH to GET.
- 87b10ad: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpDelete to dynamicMcpRouteMcpServerNameMcpPut and its HTTP method from DELETE to PUT.
- 87b10ad: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpHead to toolsetMcpRouteToolsetToolsetNameMcpPost and its HTTP method from HEAD to POST.
- 87b10ad: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpPost to dynamicMcpRouteMcpServerNameMcpPatch and its HTTP method from POST to PATCH.
- 87b10ad: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpHead to dynamicMcpRouteMcpServerNameMcpPost and its HTTP method from HEAD to POST.
- 87b10ad: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpOptions to dynamicMcpRouteMcpServerNameMcpDelete and its HTTP method from OPTIONS to DELETE.
- 87b10ad: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpPost to toolsetMcpRouteToolsetToolsetNameMcpPatch and its HTTP method from POST to PATCH.
- 87b10ad: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpGet to dynamicMcpRouteMcpServerNameMcpOptions and its HTTP method from GET to OPTIONS.
- 87b10ad: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpOptions to toolsetMcpRouteToolsetToolsetNameMcpDelete and its HTTP method from OPTIONS to DELETE.

### Patch Changes

- 87b10ad: Updated operation type and path definitions to match the changed operation and HTTP method names.

## 2.8.0

### Minor Changes

- d026169: Added new type FormatEnum2Key and constant formatEnum2 for enumerated formats (png, jpg, jpeg).
- d026169: [BREAKING] Changed SystemoneV1SystemonePostBody and related types to use FormatEnum2Key for the format field with a new enum {png, jpg, jpeg}, potentially affecting clients relying on previous formatting logic.

### Patch Changes

- d026169: Changed many numeric type constraints (e.g., @minLength/@maxLength) to @minimum/@maximum for numeric validation, aligning with JSON Schema.
- d026169: Relaxed some object properties to use Partial<Record<K, V>> for tier_labels and roles fields to allow partial keys and make object shapes more flexible.

## 2.7.0

### Minor Changes

- 26ea237: Add an `onResponse` call option that gets the status and headers of each response before its body is read, and export its `ResponseInfo` type. LiteLLM returns the deployment that answered in `x-litellm-model-id`, which `GET /model/info` takes as `litellm_model_id`, and the cache key in `x-litellm-cache-key`, which `POST /cache/delete` takes; a caller could not read either before. An error thrown inside `onResponse` rejects the call as `onResponse threw on <METHOD> <path>` with the thrown value as its `cause`.

## 2.6.0

### Minor Changes

- 9c56512: [BREAKING] The operation dynamicMcpRouteMcpServerNameMcpPost has been renamed to dynamicMcpRouteMcpServerNameMcpDelete, and its method changed from POST to DELETE.
- 9c56512: [BREAKING] The operation toolsetMcpRouteToolsetToolsetNameMcpGet has been renamed to toolsetMcpRouteToolsetToolsetNameMcpOptions, and its method changed from GET to OPTIONS.
- 9c56512: [BREAKING] The operation toolsetMcpRouteToolsetToolsetNameMcpPut has been renamed to toolsetMcpRouteToolsetToolsetNameMcpPatch, and its method changed from PUT to PATCH.
- 9c56512: [BREAKING] The operation toolsetMcpRouteToolsetToolsetNameMcpPost has been renamed to toolsetMcpRouteToolsetToolsetNameMcpDelete, and its method changed from POST to DELETE.
- 9c56512: [BREAKING] The operation dynamicMcpRouteMcpServerNameMcpOptions has been renamed to dynamicMcpRouteMcpServerNameMcpHead, and its method changed from OPTIONS to HEAD.
- 9c56512: [BREAKING] The operation dynamicMcpRouteMcpServerNameMcpDelete has been renamed to dynamicMcpRouteMcpServerNameMcpPut, and its method changed from DELETE to PUT.
- 9c56512: [BREAKING] The operation toolsetMcpRouteToolsetToolsetNameMcpPatch has been renamed to toolsetMcpRouteToolsetToolsetNameMcpPost, and its method changed from PATCH to POST.
- 9c56512: [BREAKING] The operation dynamicMcpRouteMcpServerNameMcpPatch has been renamed to dynamicMcpRouteMcpServerNameMcpPost, and its method changed from PATCH to POST.
- 9c56512: [BREAKING] The operation toolsetMcpRouteToolsetToolsetNameMcpDelete has been renamed to toolsetMcpRouteToolsetToolsetNameMcpPut, and its method changed from DELETE to PUT.
- 9c56512: [BREAKING] The operation dynamicMcpRouteMcpServerNameMcpHead has been renamed to dynamicMcpRouteMcpServerNameMcpGet, and its method changed from HEAD to GET.
- 9c56512: [BREAKING] The operation toolsetMcpRouteToolsetToolsetNameMcpOptions has been renamed to toolsetMcpRouteToolsetToolsetNameMcpHead, and its method changed from OPTIONS to HEAD.
- 9c56512: [BREAKING] The operation dynamicMcpRouteMcpServerNameMcpPut has been renamed to dynamicMcpRouteMcpServerNameMcpPatch, and its method changed from PUT to PATCH.
- 9c56512: [BREAKING] The operation dynamicMcpRouteMcpServerNameMcpGet has been renamed to dynamicMcpRouteMcpServerNameMcpOptions, and its method changed from GET to OPTIONS.
- 9c56512: [BREAKING] The operation toolsetMcpRouteToolsetToolsetNameMcpHead has been renamed to toolsetMcpRouteToolsetToolsetNameMcpGet, and its method changed from HEAD to GET.

## 2.5.1

### Patch Changes

- a4f1437: Send an object query parameter as one key per property (`start=2021-04-01&end=2021-04-30`), OpenAPI's default form style, leaving out nullish entries, instead of `range=[object Object]`, so a spec update that adds one works without a fetcher change.

## 2.5.0

### Minor Changes

- bd90676: Add a `jsonLines: "stream"` call option that resolves a line-delimited JSON response (`application/x-ndjson` and similar) to an async iterable of its parsed lines as they arrive, and export `isJsonLineStream` to narrow the result. Before this, the body was always read whole, so the lines of a long response such as the Lens dataset export arrived only once it ended, and a stream the server keeps open never resolved. Without the option a response still resolves to an array of lines.

## 2.4.0

### Minor Changes

- ab25c6a: [BREAKING] Path and response types for /toolset/{toolset_name}/mcp and /{mcp_server_name}/mcp have been renamed and swapped to match new HTTP methods for each operation.
- ab25c6a: [BREAKING] The HTTP methods for /toolset/{toolset_name}/mcp and /{mcp_server_name}/mcp operations have changed, leading to renamed and reshuffled function exports for these endpoints.

### Patch Changes

- ab25c6a: Response and parameter types for GET, POST, PUT, PATCH, HEAD, DELETE, and OPTIONS operations on toolset and mcp routes were updated for consistency with the new HTTP method mapping.

## 2.3.2

### Patch Changes

- d61e1e4: A `204` or `205` response is now typed `void` in `types` and `z.void()` in `schemas`, which is what the client resolves its empty body to. It used to be typed `unknown`, which swallowed the other member of a `200 | 204` union, so `getEdgeConfigItem` in `vercel-api-js` and `entitlementsGetAccountEntitlements`, `entitlementsGetZoneEntitlements`, `accountBillingDeletePaymentMethod`, `accountBillingSetDefaultPaymentMethod` and `accountSubscriptionsCancelDelayedDowngrade` in `cloudflare-api-js` returned `unknown` instead of their `200` body or `undefined`. A `204` the spec declares with a body, such as `deleteSecurityFirewallConfigByConfigVersion` in `vercel-api-js` (typed `""`), is `void` as well, and its zod schema now accepts the `undefined` the client returns.

## 2.3.1

### Patch Changes

- 93a38cf: Map the subpath entries, such as `/types`, `/schemas`, `/components` and `/effect`, in `typesVersions`. TypeScript's `moduleResolution: node` (`node10`), the TypeScript 5 default for `module: commonjs`, ignores `exports`, so importing a subpath failed with "Cannot find module" there.

## 2.3.0

### Minor Changes

- 366ccf5: [BREAKING] Types for path, responses, and options for the affected operations were renamed or replaced to reflect the new method bindings.
- 366ccf5: [BREAKING] The HTTP method bindings for several route operations under /toolset/{toolset_name}/mcp and /{mcp_server_name}/mcp were swapped, changing the operation signatures for GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.

## 2.2.2

### Patch Changes

- e040868: A header parameter passed to an operation, such as `headers: { "litellm-changed-by": userId }`, now wins over the same header in `config.headers` or in the headers of an Effect `makeApiLayer`. The config headers used to be spread last, so a layer that set a default `litellm-changed-by` or `X-Nf-Retry-Count` replaced the value given for that one call. A header parameter left `undefined` still falls back to the config value.

## 2.2.1

### Patch Changes

- 4f6c5ba: Give `require` its own CommonJS type declarations. Every entry pointed both `import` and `require` at one ESM declaration file, so a CommonJS project using `moduleResolution: node16` or `nodenext` got ESM types for the CommonJS build.

## 2.2.0

### Minor Changes

- 66ec126: [BREAKING] Dynamic MCP route operations have been renamed and reordered: the PUT, OPTIONS, POST, DELETE, GET, HEAD, and PATCH methods now appear in different positions and with different names.
- 66ec126: [BREAKING] Toolset MCP route operations have been renamed and reordered: the PUT, OPTIONS, POST, DELETE, GET, HEAD, and PATCH methods now appear in different positions and with different names.
- 66ec126: [BREAKING] Several type exports for Toolset MCP and Dynamic MCP routes have been removed and replaced with differently named type exports to match the new operation order and names.

## 2.1.10

### Patch Changes

- ebb720d: An operation with a required query parameter now requires `queryParams` and the required fields in it, so leaving one out fails to compile instead of getting a 400 from the API. They used to be typed `Partial`, so `client.request("GET /deployments")` in `v0-api` compiled without the `chatId` and `versionId` the spec requires. Operations whose query parameters are all optional are unchanged.

## 2.1.9

### Patch Changes

- 6f6655c: Accept any RFC 3339 offset in the Zod schemas of `date-time` fields. They used `z.iso.datetime()`, which only accepts a `Z` suffix, so a valid value such as `2026-10-30T12:00:00+00:00` or `2026-10-30T14:00:00+02:00` failed to parse; they now use `z.iso.datetime({ offset: true })`. The TypeScript types are unchanged.
- d4e35ae: Let `request()` omit its params argument when the operation requires none of its fields, as `client.api` already does. Before, `client.request("GET /path")` failed to compile and callers had to pass `{}`.

## 2.1.8

### Patch Changes

- 4043560: Reject a call cancelled through `signal` with what the signal was aborted with. A call given `AbortSignal.timeout()` now rejects with its `TimeoutError`, and one aborted with `controller.abort(reason)` with `reason`, where both were wrapped in an `Error` reading `GET /path failed: ...`; only an `AbortError` passed through before.

## 2.1.7

### Patch Changes

- 9164550: Accept `signal` in the per-call `config` of `request()` and `client.api` operations, so a call can be cancelled with an `AbortSignal`. The fetcher already passed it to `fetch`, but `FetcherConfig` had no `signal` field, so `{ config: { signal } }` failed to compile.

## 2.1.6

### Patch Changes

- 0e8ba15: Drop trailing slashes from a configured base URL (or Netlify `basePath`) so a value such as `http://localhost:4000/` no longer sends requests to `//path`.

## 2.1.5

### Patch Changes

- ea94748: Changed the response type of AgentSkillsArchiveV1SkillsSkillIdArchiveGetStatus200 from unknown to Blob.

## 2.1.4

### Patch Changes

- f1610e4: Type the responses the API sends as something other than `application/json` instead of `unknown`: a download the client resolves as a `Blob` (a zip, PDF, image or `application/octet-stream`) is typed `Blob`, a text body such as `text/plain` or a PEM file is typed `string`, as is any other non-JSON body the client returns as text whatever its schema (Cloudflare's `multipart/form-data` snippet content), and an `application/scim+json` body gets its schema. For example `chatsDownloadVersion` in `v0-api`, `readSessionFile` in `vercel-api-js` and Cloudflare's PDF, screenshot and KV value downloads.

## 2.1.3

### Patch Changes

- 3095560: Type the params of `request()` and `client.api` operations from the operation. They were typed as `{}`, so a missing path parameter, a wrong body or an unknown key compiled and failed only at runtime. Header parameters are kept under `headers`.

## 2.1.2

### Patch Changes

- 2c60bfb: Resolve a line-delimited JSON response (`application/x-ndjson`) to an array with one parsed value per line. Before this, the fetcher parsed the whole body as one JSON document, so `exportDatasetLensDatasetsDatasetIdExportGet` rejected with a JSON syntax error as soon as the export had two rows.

## 2.1.1

### Patch Changes

- 3b61252: Keep the `config` passed to `request()` and `client.api` operations, such as extra `headers`, instead of replacing it with the client's own.

## 2.1.0

### Minor Changes

- ca9b8c5: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpPut to toolsetMcpRouteToolsetToolsetNameMcpPatch, and updated its types accordingly.
- ca9b8c5: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpPatch to toolsetMcpRouteToolsetToolsetNameMcpDelete, and updated its types accordingly.
- ca9b8c5: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpHead to dynamicMcpRouteMcpServerNameMcpPost, and updated its types accordingly.
- ca9b8c5: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpOptions to toolsetMcpRouteToolsetToolsetNameMcpPut, and updated its types accordingly.
- ca9b8c5: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpHead to toolsetMcpRouteToolsetToolsetNameMcpPost, and updated its types accordingly.
- ca9b8c5: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpPut to dynamicMcpRouteMcpServerNameMcpPatch, and updated its types accordingly.
- ca9b8c5: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpPatch to dynamicMcpRouteMcpServerNameMcpDelete, and updated its types accordingly.
- ca9b8c5: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpDelete to toolsetMcpRouteToolsetToolsetNameMcpHead, and updated its types accordingly.
- ca9b8c5: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpPost to dynamicMcpRouteMcpServerNameMcpOptions, and updated its types accordingly.
- ca9b8c5: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpOptions to dynamicMcpRouteMcpServerNameMcpPut, and updated its types accordingly.
- ca9b8c5: [BREAKING] Changed toolsetMcpRouteToolsetToolsetNameMcpPost to toolsetMcpRouteToolsetToolsetNameMcpOptions, and updated its types accordingly.
- ca9b8c5: [BREAKING] Changed dynamicMcpRouteMcpServerNameMcpDelete to dynamicMcpRouteMcpServerNameMcpHead, and updated its types accordingly.

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
