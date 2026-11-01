# cloudflare-api-js

## 4.2.4

### Patch Changes

- d61e1e4: A `204` or `205` response is now typed `void` in `types` and `z.void()` in `schemas`, which is what the client resolves its empty body to. It used to be typed `unknown`, which swallowed the other member of a `200 | 204` union, so `getEdgeConfigItem` in `vercel-api-js` and `entitlementsGetAccountEntitlements`, `entitlementsGetZoneEntitlements`, `accountBillingDeletePaymentMethod`, `accountBillingSetDefaultPaymentMethod` and `accountSubscriptionsCancelDelayedDowngrade` in `cloudflare-api-js` returned `unknown` instead of their `200` body or `undefined`. A `204` the spec declares with a body, such as `deleteSecurityFirewallConfigByConfigVersion` in `vercel-api-js` (typed `""`), is `void` as well, and its zod schema now accepts the `undefined` the client returns.

## 4.2.3

### Patch Changes

- d715e7c: The K2 stream data operations now call the stream's own endpoint, `https://<streamId>.k2.cloudflarestorage.com`, as the spec declares for those paths, instead of `https://api.cloudflare.com/client/v4`, where they could not succeed. They take the stream ID as a required `streamId` path parameter: `postK2Produce`, `getK2Subscriptions`, `postK2Subscriptions`, `getK2SubscriptionsBySubscriptionId`, `deleteK2SubscriptionsBySubscriptionId`, `postK2SubscriptionsBySubscriptionIdConsume` and the batch `ack`, `extend` and `nack` calls.

## 4.2.2

### Patch Changes

- 1c6f86d: An operation with a required header parameter now requires `headers` and the required fields in it, so leaving one out fails to compile instead of getting an error from the API. They used to be typed `Partial`, so `spendPoliciesDelete` and `spendPoliciesUpdate` in `cloudflare-api-js` compiled without the `If-Match` header the spec requires, and `uploadArtifact` in `vercel-api-js` without `Content-Length`. The other Cloudflare operations affected are the Logpull log file calls (`R2-Access-Key-Id`, `R2-Secret-Access-Key`), the zone Precursor config calls (`Cloudflare-Version`), `r2PatchBucket` (`cf-r2-storage-class`) and the Stream Tus upload (`Tus-Resumable`, `Upload-Length`). Operations whose header parameters are all optional are unchanged.

## 4.2.1

### Patch Changes

- 93a38cf: Map the subpath entries, such as `/types`, `/schemas`, `/components` and `/effect`, in `typesVersions`. TypeScript's `moduleResolution: node` (`node10`), the TypeScript 5 default for `module: commonjs`, ignores `exports`, so importing a subpath failed with "Cannot find module" there.

## 4.2.0

### Minor Changes

- 64b649e: [BREAKING] MembersDelete now responds with a 200 status and a result object, instead of 204 with no content.
- 64b649e: Added a new operation to delete Zero Trust organization trust settings (zeroTrustOrganizationDeleteTrustSettings).
- 64b649e: Changed the AccessTags type for service tokens, bookmark, SaaS, and related properties to be a key-value object instead of an array of strings.
- 64b649e: [BREAKING] Removed the batch move accounts operation (accountsBatchMoveAccounts) from the API.
- 64b649e: [BREAKING] Removed the tenantsRetrieveTenant, tenantsValidAccountTypes, tenantsListEntitlements, and tenantsListMemberships operations from the API.
- 64b649e: Replaced the 'Dos*' types with new 'BotnetFeedApi*' types for botnet threat feed endpoints.
- 64b649e: [BREAKING] The result in userListUserTenants now returns OrganizationsApiLegacyTenant objects instead of OrganizationsApiOrganization.
- 64b649e: Added a new rule type 'AccessServiceTokenTagRule' for matching Access service tokens by tag key and value.
- 64b649e: [BREAKING] Remove operations no longer in the cloudflare-api-js OpenAPI spec: `accountsBatchMoveAccounts`, `tenantsListEntitlements`, `tenantsListMemberships`, `tenantsRetrieveTenant`, `tenantsValidAccountTypes`.

### Patch Changes

- 64b649e: Added support for HTTP 500 error responses to many organization- and member-related API operations, improving error reporting.
- 64b649e: Renamed legacy response shapes and standardized status type enums for account and tenant objects.
- 64b649e: Allowed partial profile updates with specific rules (null/empty values are ignored and profile is created if not present) for organization and account profile endpoints.
- 64b649e: Added query parameters for filtering and ordering tenant accounts in tenantsListAccounts.
- 64b649e: Added additional fields, types, and documentation to organization and tenant models, including richer profile and pagination types.
- 64b649e: Added support for cursor and legacy offset pagination to endpoints that list accounts and organizations.
- 64b649e: Improved and updated several endpoint descriptions and parameter documentation for clarity.
- 64b649e: Added a new error response type for whois record status 400, dropping CloudforceOneWhoisSchemasSingleResponse from the union.

## 4.1.0

### Minor Changes

- 5ea776d: [BREAKING] Removed deprecated Registrar Domains operations: registrarDomainsListDomains, registrarDomainsGetDomain, and registrarDomainsUpdateDomain, along with their types.
- 5ea776d: Security Center shadow results pagination now uses a cursor parameter instead of page numbers.
- 5ea776d: Added the new GET /accounts/{accountId}/observability/usage/limit operation to report Workers Observability usage limits.
- 5ea776d: [BREAKING] Remove operations no longer in the cloudflare-api-js OpenAPI spec: `registrarDomainsGetDomain`, `registrarDomainsListDomains`, `registrarDomainsUpdateDomain`.
- 5ea776d: Added BotManagementAiAgents configuration with new agent action controls to the Bot Management feature.

### Patch Changes

- 5ea776d: Extended zero trust gateway settings with new forward action and additional keyboard usage control options.
- 5ea776d: Clarified that email security allow policies now also reject a pattern that equals a domain onboarded to the account.
- 5ea776d: Extended Magic LAN configuration types to support remote_subnets with MagicRemoteSubnet type.
- 5ea776d: Security Center partner asset response types now include result_info for pagination and indicate if the result set was truncated.
- 5ea776d: Expanded documentation for Custom Nameserver Set related DNS settings to link to more details.
- 5ea776d: Minor documentation clarifications for PayPerCrawlMsg and PayPerCrawl response types.
- 5ea776d: Added usage limit status enumerations and response types for Workers Observability usage reporting.
- 5ea776d: Added last_used_at field to AIG config provider responses to show last authentication date.
- 5ea776d: Documented that Account names are now limited to 65 UTF-8 bytes in accountsListAccounts and accountsAccountDetails.

## 4.0.5

### Patch Changes

- e040868: A header parameter passed to an operation, such as `headers: { "litellm-changed-by": userId }`, now wins over the same header in `config.headers` or in the headers of an Effect `makeApiLayer`. The config headers used to be spread last, so a layer that set a default `litellm-changed-by` or `X-Nf-Retry-Count` replaced the value given for that one call. A header parameter left `undefined` still falls back to the config value.

## 4.0.4

### Patch Changes

- 4f6c5ba: Give `require` its own CommonJS type declarations. Every entry pointed both `import` and `require` at one ESM declaration file, so a CommonJS project using `moduleResolution: node16` or `nodenext` got ESM types for the CommonJS build.

## 4.0.3

### Patch Changes

- 3ec6a22: Loosened types for request or response payloads in several operations, improving flexibility and compatibility.

## 4.0.2

### Patch Changes

- e66e098: Stop requiring the fields Cloudflare sets itself in request bodies. The spec marks them both `readOnly` and required, so a call did not type-check without them: a new ruleset or ruleset rule needed its `id`, `version` and `last_updated`, an email security allow policy its `id`, `created_at` and `last_modified`, a new or updated Worker its `id`, `created_on`, `updated_on` and `references`, and the same held for Worker previews, Worker domains, the latest Worker version patch, IP access rule updates, managed transforms and the roles of an account member update. Those fields are now optional in request bodies, through new `*Writable` types, and response types are unchanged.

## 4.0.1

### Patch Changes

- ebb720d: An operation with a required query parameter now requires `queryParams` and the required fields in it, so leaving one out fails to compile instead of getting a 400 from the API. They used to be typed `Partial`, so `client.request("GET /deployments")` in `v0-api` compiled without the `chatId` and `versionId` the spec requires. Operations whose query parameters are all optional are unchanged.

## 4.0.0

### Major Changes

- 597d8ed: Breaking: `format: int64` fields and parameters are typed `number` instead of `bigint`, and their zod schemas are `z.int()` instead of `z.coerce.bigint()`. The API sends these values as JSON numbers, so a response never held a `bigint` despite its type, and a `bigint` passed in a JSON body, as the types asked for, such as the `ttl` of Netlify's `createDnsRecord`, made `JSON.stringify` throw `Do not know how to serialize a BigInt`. Code that passed a `bigint`, such as a Zoom `meetingId: 123n`, now passes a number.

### Patch Changes

- 13d2858: Send a raw request body as it is when its Content-Type is `application/json`. The fetcher JSON-encoded every body under that type, so `r2PutObject` with `headers: { "Content-Type": "application/json" }` sent a `Blob` or bytes as `{}` or `{"0":123,...}` and a string such as `'{"a":1}'` as the quoted `"{\"a\":1}"`. Bytes, a `Blob`, a stream or a form are now never encoded, and a string is sent as is when the operation or the caller sets the Content-Type; under the default Content-Type of a JSON operation it is still encoded as a JSON string. A JSON Content-Type with parameters, such as `application/json; charset=utf-8`, now encodes an object body instead of sending `[object Object]`.

## 3.0.1

### Patch Changes

- d4e35ae: Let `request()` omit its params argument when the operation requires none of its fields, as `client.api` already does. Before, `client.request("GET /path")` failed to compile and callers had to pass `{}`.

## 3.0.0

### Major Changes

- 67e01b3: Breaking: `workerScriptUploadWorkerModule` and `namespaceWorkerScriptUploadWorkerModule` upload Workers as `multipart/form-data`. Both sent their body as raw `application/javascript`, which Cloudflare accepts only for service-worker syntax, so an ES module Worker and its `metadata` (bindings, `main_module`, compatibility date) could not be uploaded. The `body` is now `{ metadata, files }`, with each module as a `File` named after it, such as `new File([source], "worker.js", { type: "application/javascript+module" })`. Code that passed the script as a string has to send it as a `File` in `files`, with `body_part` set in `metadata` for a service-worker script.

## 2.5.1

### Patch Changes

- 4043560: Reject a call cancelled through `signal` with what the signal was aborted with. A call given `AbortSignal.timeout()` now rejects with its `TimeoutError`, and one aborted with `controller.abort(reason)` with `reason`, where both were wrapped in an `Error` reading `GET /path failed: ...`; only an `AbortError` passed through before.

## 2.5.0

### Minor Changes

- 5505542: [BREAKING] Remove operations no longer in the cloudflare-api-js OpenAPI spec: `zones0HoldZoneNameGet`.
- 5505542: [BREAKING] Removed the zones0HoldZoneNameGet operation and its associated types.

### Patch Changes

- 5505542: Added new types IamTokenPrefix and IamTokenSuffix for IAM tokens.
- 5505542: Extended IamComponentsSchemasAccount to include additional fields from IamAccount.

## 2.4.3

### Patch Changes

- bac71ca: Send `client.auth.refreshToken` to Cloudflare's OAuth token endpoint, `https://dash.cloudflare.com/oauth2/token`, as a form-encoded body. It posted JSON to `https://api.cloudflare.com/client/v4/oauth/token`, which does not exist and answers 404, so every refresh failed. The `authToken` option is now optional and ignored, since the token endpoint authenticates the client by its ID and secret.

## 2.4.2

### Patch Changes

- 9164550: Accept `signal` in the per-call `config` of `request()` and `client.api` operations, so a call can be cancelled with an `AbortSignal`. The fetcher already passed it to `fetch`, but `FetcherConfig` had no `signal` field, so `{ config: { signal } }` failed to compile.

## 2.4.1

### Patch Changes

- 0e8ba15: Drop trailing slashes from a configured base URL (or Netlify `basePath`) so a value such as `http://localhost:4000/` no longer sends requests to `//path`.

## 2.4.0

### Minor Changes

- 02ee659: Added rssArticleReprocess operation to allow reprocessing of RSS articles.
- 02ee659: [BREAKING] Remove operations no longer in the cloudflare-api-js OpenAPI spec: `catalogSyncsCreate`, `catalogSyncsDelete`, `catalogSyncsList`, `catalogSyncsPatch`, `catalogSyncsPrebuiltPoliciesList`, `catalogSyncsRead`, `catalogSyncsRefresh`, `catalogSyncsUpdate`, `onrampsApply`, `onrampsCreate`, `onrampsDelete`, `onrampsExport`, `onrampsList`, `onrampsMwanAddrSpacePatch`, `onrampsMwanAddrSpaceRead`, `onrampsMwanAddrSpaceUpdate`, `onrampsPatch`, `onrampsPlan`, `onrampsRead`, `onrampsUpdate`, `providersCreate`, `providersDelete`, `providersDiscover`, `providersDiscoverAll`, `providersInitialSetup`, `providersList`, `providersPatch`, `providersRead`, `providersUpdate`, `resourcesCatalogExport`, `resourcesCatalogList`, `resourcesCatalogPolicyPreview`, `resourcesCatalogRead`.
- 02ee659: [BREAKING] Removed all catalogSyncs, onramps, and providers operations and types related to MCN (Magic Cloud Network).
- 02ee659: Added spendPoliciesList, spendPoliciesCreate, spendPoliciesActivity, spendPoliciesDelete, spendPoliciesGet, spendPoliciesUpdate, and spendPoliciesListAudit operations for billing spend policies management.
- 02ee659: Added tenantLevelCustomNameserversListTenantCustomNameservers, tenantLevelCustomNameserversAddTenantCustomNameserver, and tenantLevelCustomNameserversDeleteTenantCustomNameserver operations for tenant-level custom nameservers.
- 02ee659: Added emailDomainsChanges operation to fetch changes to email domains.
- 02ee659: Renamed RealtimekitLivestreamBase and related types to RealtimekitLivestream and RealtimekitLivestreamSession, and changed status enum type.
- 02ee659: [BREAKING] Replaced all Dos* types and operations for DDoS protection with new AdvancedDdosProtection* types and related operations.

### Patch Changes

- 02ee659: Removed types RealtimekitOverallStats, RealtimekitWebhookLog, and various types related to RealtimekitIdentity and RealtimekitSecret.
- 02ee659: Changed type AaaFilterOptions from 'unknown[]' to 'object[]'.
- 02ee659: Added new enums to AIGateway config result and request types, introducing 'S14' guardrails enums.
- 02ee659: Changed many API response types (including GetHeartbeatStatus200, SqlApiQuery status codes, ArtifactsReposBlobGetStatus200, etc.) from 'unknown' to more specific types like 'string' or 'Blob'.

## 2.3.2

### Patch Changes

- f1610e4: Type the responses the API sends as something other than `application/json` instead of `unknown`: a download the client resolves as a `Blob` (a zip, PDF, image or `application/octet-stream`) is typed `Blob`, a text body such as `text/plain` or a PEM file is typed `string`, as is any other non-JSON body the client returns as text whatever its schema (Cloudflare's `multipart/form-data` snippet content), and an `application/scim+json` body gets its schema. For example `chatsDownloadVersion` in `v0-api`, `readSessionFile` in `vercel-api-js` and Cloudflare's PDF, screenshot and KV value downloads.

## 2.3.1

### Patch Changes

- 3095560: Type the params of `request()` and `client.api` operations from the operation. They were typed as `{}`, so a missing path parameter, a wrong body or an unknown key compiled and failed only at runtime. Header parameters are kept under `headers`.

## 2.3.0

### Minor Changes

- 2c6705d: [BREAKING] Changed 200 response types for SQL and Analytics Engine query operations to be a union of JSON and X-NDJSON (string array) response types.

## 2.2.3

### Patch Changes

- 2c60bfb: Resolve a line-delimited JSON response (`application/x-ndjson`) to an array with one parsed value per line. Before this, the fetcher parsed the whole body as one JSON document, so `getCollectionExportEndpoint` rejected with a JSON syntax error as soon as the export had two lines.

## 2.2.2

### Patch Changes

- 3b61252: Keep the `config` passed to `request()` and `client.api` operations, such as extra `headers`, instead of replacing it with the client's own.

## 2.2.1

### Patch Changes

- 5104b70: Send an array query parameter that the spec marks `explode: false` as one comma-separated value (`?type=full,partial`) instead of repeating the key, so filters such as `type` on `zonesGet`, `ids` on `getZonesZoneIdentifierZarazConfigHistory` and `fields` on `d1GetDatabase` reach the API as documented. `id` on `GET /organizations` keeps repeated keys, as its description asks.

## 2.2.0

### Minor Changes

- f619306: Added multiple new types and components for additional API data coverage and improved schema detail.
- f619306: Added many new fields to various response types to provide richer and more detailed data across numerous API endpoints, especially in the Radar API responses.

## 2.1.2

### Patch Changes

- c80b578: Send an object query parameter as one key per property (`start=2021-04-01&end=2021-04-30`), the spec's default form style, instead of `start_end_params=[object Object]`, so the date range on `passiveDnsByIpGetPassiveDnsByIp` reaches the API.

## 2.1.1

### Patch Changes

- 3babd7e: Type an operation's path, query and header parameters with the generated `<Operation>Path`, `<Operation>Query` and `<Operation>Headers` types instead of an inline object. A parameter whose schema is a `$ref`, a `oneOf`/`anyOf` union or an object used to be typed `unknown`, which accepted any value: Cloudflare's `accountId` path parameter and `per_page` query parameter, LiteLLM's nullable filters such as `team_id` and `start_date`, Vercel's `domain`, v0's `metadata` filter on `chatsFind` and Zoom's `meetingId`. Query and header parameters stay optional.

## 2.1.0

### Minor Changes

- bbd22b5: [BREAKING] Removed and re-added the operations sqlApiQueryGetAccountScoped, sqlApiQueryPostAccountScoped, and sqlApiIntrospectionAccountScoped.

### Patch Changes

- bbd22b5: Simplified multiple type definitions by dropping excessive parentheses around intersections and unions.

## 2.0.0

### Major Changes

- 49d548e: Breaking: a failed HTTP response now rejects with `{ status, payload }`, where `status` is the HTTP status code and `payload` is the parsed error body (or a description string when the body is not JSON). It used to reject with `{ name: "unknown", message }`, losing both. Code that reads `error.message` from a rejected call should read `error.status` and `error.payload` instead. Requests that never get a response still reject with `{ name: "unknown", message }`. In the Effect bindings, HTTP errors now fail with `ApiError` carrying the status instead of `NetworkError`.

### Minor Changes

- 2f77dce: Added endpoint to update a custom nameserver set for an account.
- 5d38a89: Added several Cloudflare Workers Store (CWS) category operations such as cwsListCategoryApis, cwsListCategoryApplications, cwsListCategoryOperations, and cwsGetFilterSchema.
- 5d38a89: Added user analytics dashboard operation userAnalyticsGetDashboard.
- 5d38a89: Added new Radar annotation and anomaly retrieval operations (e.g., radarGetAnnotationById, radarGetTrafficAnomalyByUuid).
- 5d38a89: Added new operation getHeartbeat for retrieving heartbeat status.
- 5d38a89: Added new operation billingValidateAddress for validating billing addresses.
- 5d38a89: Added support for Access SCIM group and user resource management (delete and get operations).
- 5d38a89: Added new Artifacts API operations for namespace, repo, and file management (e.g., artifactsNamespacesCreate, artifactsNamespacesDelete, artifactsReposCreate).
- 5d38a89: Added new aiSearchNamespace operations including delete, fetch, update, and multi-instance chat completion.
- 5d38a89: [BREAKING] Remove operations no longer in the cloudflare-api-js OpenAPI spec: `accountBillingPayBadDebt`, `brapiGetDevtoolsBrowser`, `brapiGetDevtoolsBrowserAcquire`, `brapiGetDevtoolsPage`, `createLivestream`, `deleteImageDelete`, `getAccountsAccountIdV2Images`, `getImageGet`, `getImageGetBlob`, `getImageList`, `listPolicyLogs`, `metricsExportDelete`, `monolithHealthCheck`, `patchImageEdit`, `postDirectUploadLink`, `postImageUpload`, `putImageDirectUpload`, `streamMP4DownloadsCreateDownloads`, `streamMP4DownloadsDeleteDownloads`, `streamMP4DownloadsListDownloads`, `worSubscribeWorkflowInstanceEvents`.
- 5d38a89: Added argoSmartRoutingGetCountZonesEnabledForUser and argoSmartRoutingGetCountZonesEnabledForAccount.
- 5d38a89: Added workersAiAiGatewayWebSearch operation.
- 5d38a89: Added K2-related operations including postK2Produce, getK2Subscriptions, and postK2Subscriptions.
- 2f77dce: Added operations to set, get, and delete firewall payload logging keys for accounts and zones.
- 5d38a89: Added support for managing Access user populations and users with new CRUD operations.
- 5d38a89: Added new origin certificate operations: originCaListCertificates and originCaCreateCertificate.
- 5d38a89: [BREAKING] Removed Image API operations including getImageList, postImageUpload, deleteImageDelete, getImageGet, patchImageEdit, putImageDirectUpload, getImageGetBlob, getAccountsAccountIdV2Images, and postDirectUploadLink, and replaced them with SQL API operations.
- 5d38a89: [BREAKING] Removed aiSearch namespace management operations and re-added with possibly updated signatures or capabilities.
- 5d38a89: Added postVerify operation for verification processes.
- 5d38a89: Added abuse report management operations: listAbuseReports, listSubmittedAbuseReports, getSubmittedAbuseReport, and listSubmittedAbuseReportEmails.
- 5164013: Add type UrlscannerGetScanV2Status200 for enhanced URL scanner scan status responses.
- 5d38a89: Added domain- and account-related operations: zonesGet, zonesPost, accountDeletion, accountsAccountDetails, accountsUpdateAccount.
- 5d38a89: Added ip address management operations for bulk IP and zone management (e.g. add/remove multiple IPs or zones).
- 5d38a89: Added operations for provider templates and configurations (getProviderTemplate, getProviderConfiguration, getDomainSettings).
- 2f77dce: Added Zero Trust Organization trust settings operations: get, update, and replace.
- 952e2c8: Added operation deleteIndicatorDeleteBulk for bulk deletion of indicators.
- 3684854: Add a `body` parameter to the operations that only take an `application/scim+json` request body, sent as JSON with that `Content-Type`. Before this, `scimUsersCreate`, `scimUsersPatch`, `scimUsersPut`, `scimGroupsCreate`, `scimGroupsPatch` and `scimGroupsPut` could not send the user or group they create or change.
- b63eee1: Add a `body` parameter to `postAccountsAccountIdBrandProtectionLogos`, which had none. Its spec declares an `application/x-www-form-urlencoded` body with a binary `image` field, which form fields cannot carry, so the `image` `Blob` is sent as `multipart/form-data` instead. Whether Cloudflare accepts the multipart upload is unknown: no upload was tried against the API.

### Patch Changes

- 76653f2: Return `undefined` from `client.api` for `Object.prototype` names such as `constructor` or `toString`, instead of a namespace or an operation wrapper that calls the inherited method.
- dc5ea2c: Resolve a binary response, such as a zip, an octet-stream, a PDF or an image, as a `Blob` instead of a string decoded as UTF-8, which corrupted the bytes of downloads like `chatsDownloadVersion` in `v0-api`, `downloadArtifact` in `vercel-api-js` and Workers KV values in `cloudflare-api-js`. A custom `fetchImpl` whose response has no `blob()` still gets the text.
- 0cccd4d: Added the type PostAccountsAccountIdBrandProtectionLogosBody for the request body in the Brand Protection Logos endpoint.
- 952e2c8: Added types for the deleteIndicatorDeleteBulk operation, including request and response types.
- 2f77dce: Added new types and request bodies for R2 Data Catalog catalog activation and credential requests.
- 2f77dce: Added new severity enums to RSS article/relevance/severity workflows and responses.
- c3517ac: Added optional logging to various upload, patch, and create operations for improved diagnostics.
- c80f59d: Resolve a 204 or an empty successful body to `undefined` instead of rejecting with a network error, and let a header such as `authorization` or `content-type` replace the default regardless of case instead of being sent alongside it
- 21eaaa2: Reject a failed request with a real `Error` that names the method and path, gives the reason and keeps the original exception as `cause`, instead of a plain object with no stack, and keep the raw body text (up to 1000 characters) as the payload when an error response is not JSON, instead of the JSON parser's message. An aborted request rejects with the `AbortError` itself, so callers can tell it from a network failure.
- 1fc5b21: Omit undefined query parameters and send arrays as repeated keys
- 40d8746: Send array and object fields of a multipart body instead of dropping them: an array is sent as one part per item and an object as a JSON part, and a bigint field as a string. Before this, `workerScriptPutContent` and `workerVersionsUploadVersion` sent neither `files` nor `metadata`.
- a761355: Percent-encode path parameters in generated operations, so a value containing `/`, `?`, `#` or `..` can no longer change which endpoint is called. Required path parameters now accept falsy values such as `0`.
- 1a37cad: Keep the slashes in file path parameters, which the previous release percent-encoded as `%2F`, and leave existing `%XX` escapes in them untouched so values already passed through `encodeURI` are not encoded twice.
- 613be44: `request()` now calls the generated operation instead of the raw fetcher, so path parameters are substituted, validated and percent-encoded the same way as through `api`. An unknown endpoint throws.
- fe64135: Send a `ReadableStream` upload body with `duplex: "half"`. Without it, Node's `fetch` rejected the request with "duplex option is required when sending a body" before sending anything, so raw body operations such as `uploadArtifact` in `vercel-api-js` and `dlpDatasetsUploadVersion` in `cloudflare-api-js` failed whenever they were given a stream.
- 9865850: Expose operations without a tag under `client.api.default` and the Effect `ApiService.default`, and merge tags that differ only in case or separators into one namespace instead of dropping all but the last.

## 1.1.0

### Minor Changes

- 5223c4e: Migrated code generation to kubb v5.
  
  The generated client functions are unchanged — same names, same signatures, same behaviour — so
  calling code needs no updates. Auxiliary type exports were restructured by kubb v5: `*RequestConfig`
  is now `*Options`, and per-parameter types are now grouped (`FooPathBarId` → `FooPath`,
  `FooQueryLimit` → `FooQuery`). Only code importing those helper types directly is affected.
- 5223c4e: Refreshed the generated clients against the current upstream OpenAPI specs.
  
  The kubb v5 migration required regenerating every client, which also picked up spec changes that
  had accumulated since each was last generated:
  
  - **cloudflare-api-js** — last generated 2026-02-19, so this is six months of drift: **1022
    operations added and 209 removed**. `[BREAKING]` for anyone calling one of the removed
    operations; they no longer exist in Cloudflare's published schema.
  - **keycloak-api** — 12 operations added, none removed.
  - **zoom-api-js** — 2 operations added, none removed.

## 1.0.0

### Major Changes

- 05e1980: Migrate from openapi-codegen to kubb for code generation.

  Breaking changes:

  - Generated code is now in `./src/generated/` instead of `./src/api/` or other locations
  - Export structure changed: now exports `Fetchers`, `Helpers`, `Schemas`, `Types` instead of previous structure
  - `FetcherExtraProps` renamed to `FetcherConfig`
  - Added new type exports: `ApiClient`, `ApiOperation`, `ApiOperationParams`, `ApiOperationResult`, `ApiOperationByMethod`

### Minor Changes

- 74ad091: Migrate OpenAPI clients to SferaDev monorepo with improved build configuration, updated dependencies, and enhanced TypeScript support.

## 0.18.1

### Patch Changes

- 33ccecb: Add the 'indicatorType' field to POST request body types.
- d78d3d4: Add `dlp` property to gateway response types.

## 0.18.0

### Minor Changes

- 3bd766d: Add new endpoint to list all IP leases owned by an account

### Patch Changes

- 05df1f4: Introduce types for bulk operation statuses in Lists API.
- 941bf80: Default viewport added to multiple request bodies.
- 8a6bbfc: Increase default and maximum value for max_num_results in AutoragConfigAiSearchRequestBody.
- d94b4e1: Remove default annotation from rule description comments.
- 39a4d16: Add new AI search model '@cf/moonshotai/kimi-k2-instruct' to AutoragConfigAiSearchRequestBody
- 25fc971: Change terraform configurability to computed_optional for various schema settings
- f677999: Add system_prompt field to AutoragConfigAiSearchRequestBody type
- 1bb5971: [BREAKING] Remove optional custom AI models configuration from BrapiPostJsonRequestBody
- 5e1fa8c: Add new endpoint to list autorag jobs.
- c86bd08: Add optional store_id field to AigConfig types.
- 6158bfa: [BREAKING] Rename ListsCompletedBulkOperation to ListsBulkOperationCompleted.
- 362df9a: Add new endpoints for GPT OSS 120b and 20b under Workers AI CF OpenAI.
- 070fe4f: Add 'scopes' attribute to the SecretsStoreSecretsListQueryParams.
- 5c54f53: Add new function to retrieve AI bot traffic distribution by user agent
- 860e35a: Update x-stainless-terraform-configurability for ZeroTrustGatewayDnsDestinationIpv6BlockId to computed_optional.
- 2688eb8: Add support for Python module content types in Worker script uploads
- 57e1e90: Add AutoragConfigSyncError type for error handling with status 400
- 5f6b93c: Add new API endpoint for bulk creation of saved string queries in Brand Protection.
- cc6194a: Extend 'limitType' to include 'cost' for various AigConfig responses and requests.
- 8aba99a: Add pagination support to several Access API list endpoints with page and per_page query parameters

## 0.17.0

### Minor Changes

- 606106d: Add new endpoints for binary data upload and retrieval

## 0.16.1

### Patch Changes

- 8a73b10: Add @x-stainless-terraform-configurability computed_optional metadata to various endpoint schemas
- bf2f229: [BREAKING] Allow ZeroTrustGatewayEndpoints to be null
- 6784a24: Add default false value to LogpushJobFlagEnabled flag.
- aa8c1d0: Add 'creator' field to CloudflareImagesListImagesQueryParams and V2QueryParams.
- b158961: Update comment on reportType parameter in SubmitAbuseReportPathParams
- 582e994: [BREAKING] Change IamResources type to support nested objects with string values

## 0.16.0

### Minor Changes

- 99de2dc: Add auditability annotations to WorkersAi API response types
- f38416b: Add 'memberships' option to resource_scope parameter in AuditLogsV2GetAccountAuditLogsQueryParams

### Patch Changes

- fbc5a20: [BREAKING] Remove several deprecated `api/` endpoints in Brand Protection.
- d67852a: Add ListsCompleted type for operation completion timestamp.
- d060f3d: Add 'insight' and 'raw' properties to PatchEventUpdateRequestBody and PostEventUpdateRequestBody

## 0.15.3

### Patch Changes

- 5909a0a: [OpenAPI] Spec updates for cloudflare-api-js

## 0.15.2

### Patch Changes

- 8ae636d: Add 'webp' option to the polish configuration
- 06a9d2a: [BREAKING] Change CIDRs to IPv4 only and note that IPv6 CIDRs are currently unsupported
- ede8536: Add x-auditable flag to CustomIndicatorFeedsDescription type
- a44aa65: Add new endpoint to fetch all DEX tests
- 22b8ffe: [BREAKING] Add new x-auditable attribute to StreamSchemasIdentifier type definition
- 4ee2ac1: Add detailed result information to ApiShieldApiResponseCollection
- 9c610a7: Change InfraApiResponseCollection to include result_info as a nested object
- 2c9fe89: Add x-auditable property to DnsSettingsIdentifier schema

## 0.15.1

### Patch Changes

- 55fee33: [BREAKING] Add new query parameter 'forceRefresh' to 'GetEventListGetQueryParams'
- 676de5b: List Catalog Syncs (Closed Beta) - fix typo in endpoint description
- ad1807f: [BREAKING] Change type of virtual_network_id in TunnelRouteCreateATunnelRouteRequestBody and TunnelRouteUpdateATunnelRouteRequestBody to TunnelVirtualNetworkIdComputedOptional
- 5e07130: Add sccm_vpn_boundary_support field to TeamsDevicesDefaultDeviceSettingsPolicy and TeamsDevicesDeviceSettingsPolicy
- b0fb688: Add 'x-auditable' property to RumIdentifier and SpectrumAnalyticsIdentifier types
- 2a0cc51: [BREAKING] Change pattern for LogcontrolRegions from ^[a-z,]_$ to ^[a-z]_$
- a3b53bf: Make script property optional in WorkersRoute type
- 0a8ee17: Update result type from R2LifecycleRule to R2QueuesConfig
- cf68a5d: [BREAKING] Removed DnsRecordsResultInfo type and moved its properties to DnsRecordsApiResponseCollection type
- e922b8d: Update workers endpoints
- 9803c5b: [BREAKING] Remove AddressingResultInfo interface, replace with nested result_info in AddressingApiResponseCollection

## 0.15.0

### Minor Changes

- 18102a2: Add new endpoint to get a single event notification rule

## 0.14.0

### Minor Changes

- ba95cf1: Add TeamsDevicesAccessSerialNumberListInputRequest

### Patch Changes

- 12473b8: Add new endpoint to get event list
- 2cb75b8: Add new endpoint to delete a workflow
- 03c3941: [BREAKING] Add support for zstd compression algorithm
- eeee8d0: Add new field 'filter' to request bodies for log push jobs
- 9bcf0d3: Add new endpoint to update access application settings
- dfa0d59: Change type and structure of errors and messages in Whois API response
- 0ff63aa: [BREAKING] Change CloudConnectorRules to CloudConnectorRule in the schemas
- 25c4794: Change type of body in AccountResourceGroupCreateVariables from Schemas.IamCreateResourceGroup to Schemas.IamRequestCreateResourceGroup
- 022df88: Change type of 'period' property to 'number' in RulesetsBlockRule, RulesetsChallengeRule, RulesetsCompressResponseRule, ...
- f46b555: Defines the state of the rules contained in the rule group. When `on`, the rules in the group are configurable/usable.

## 0.13.1

### Patch Changes

- 3cc92fe: Add x-auditable flag to Logpush API schemas
- 6f4798a: Add new endpoint to update LAN device settings policy
- 438e0b9: Updates properties of an existing R2 bucket
- 78060c9: Disable Content Scanning.
- 61a1bd4: Creates a new GRE tunnel. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.
- dfac69b: Add x-auditable metadata to multiple types

## 0.13.0

### Minor Changes

- b70b4e3: Refactor WorkersRoute type to use a more descriptive pattern property
- 787a5bd: [BREAKING] Remove deviceDEXTests endpoints

### Patch Changes

- 2893835: Add new field 'data_time' to RadarGetBgpRoutesRealtimeResponse

## 0.12.1

### Patch Changes

- bdaac6f: Add x-auditable field to various types in schemas

## 0.12.0

### Minor Changes

- 3a597c4: Add 'include_context' option to ZeroTrustGatewayNotificationSettings

### Patch Changes

- 780d445: Add x-auditable field to StreamWatermarkProfileDeleteWatermarkProfilesResponse
- 5ec4235: Fix type in RumSchemasMessages code field
- 6abb2fa: Fix typo in spectrum analytics API response comments

## 0.11.2

### Patch Changes

- 03f9eb5: Change WorkersSecretResponse to use WorkersSecret type

## 0.11.1

### Patch Changes

- ab47f1f: Add x-auditable field to various DNS settings types
- 04d82ef: Removed MagicTransitResultInfo from MagicTransitApiResponseCollection
- ece05e3: [BREAKING] Add support for 'internal' type in ZonesType
- 832b72f: [BREAKING] Fix typo in LogpushApiResponseCommon and LogpushApiResponseCommonFailure
- 4d46ca9: [BREAKING] Add new endpoint to send event for workflow instance
- 54f7337: [BREAKING] Add new property `maxdurationseconds` to StreamUploadMetadata
- d28b04d: Add new endpoints to check source and target connectivity

## 0.11.0

### Minor Changes

- c59d758: Add new optional 'pooling' field to WorkersAiPostRunCfBaaiBgeM3Response
- 593c6de: Add ZeroTrustGatewayAccountLogOptions type for gateway account logging

### Patch Changes

- 6ed62b6: Add 'x-auditable' attribute to multiple types

## 0.10.1

### Patch Changes

- 6bef323: [BREAKING] Change type enum values in AaaAuditLogsV2 schema
- 6cd4bfb: Add x-auditable metadata to various schema fields

## 0.10.0

### Minor Changes

- d55f18f: Add new endpoint to get multiple KV pairs from a namespace
- 297a985: Add new endpoint to update partial Queue details

### Patch Changes

- 7fb3398: Add 'LabelDiscovery' to ApiShieldApiDiscoveryOrigin enum
- 2fadebb: Add new 'crawler_protection' attribute to BotManagementBaseConfig
- 5d56a2f: [BREAKING] Add 'x-auditable' attribute to various schemas for auditing purposes
- 1091d4b: Add new endpoint to retrieve Global WARP override state
- fc542f8: [BREAKING] Remove 'accountLevelCustomNameserversGetEligibleZonesForAccountCustomNameservers' API endpoint
- 971aff0: Add beta field to WorkersKvNamespace type
- 0909d1e: [BREAKING] Remove default values for batch_prefix, batch_suffix, field_delimiter, record_delimiter, record_prefix, and record_suffix in LogpushOutputOptions

## 0.9.2

### Patch Changes

- 025e4fd: [BREAKING] Add @x-auditable metadata to various types for auditing purposes
- fbfb377: Add new endpoint to convert to markdown
- d90845e: Add documentation for required parameter `datasetId` in postEventList, postEventCreate, postEventCreateBulk, and deleteEventDelete endpoints

## 0.9.1

### Patch Changes

- b0b6a88: Add new attribute for configuring OAuth Bearer Token authentication scheme for SCIM provisioning to an application
- cd026ab: [BREAKING] Mark 'CallsSecret', 'CallsTurnKey', 'StreamInputRtmpsStreamKey', 'StreamInputSrtStreamPassphrase', 'StreamJwk', 'StreamPem', 'StreamPlaybackRtmpsStreamKey', 'StreamPlaybackSrtStreamPassphrase', 'StreamSignedTokenRequest.pem', 'StreamSignedTokenResponse.token' as sensitive data
- a4ed428: Remove deprecated 'attack' field in RadarGetAttacksLayer7TimeseriesQueryParams
- 225a36a: Add new endpoint to list waiting rooms for an account

## 0.9.0

### Minor Changes

- 173c962: Add new endpoint to post event list
- 755540e: Add new properties for high availability state in MconnSnapshot
- 8daa84e: Add new endpoint to get indicator types list

### Patch Changes

- 57cb3fd: Add new endpoint to delete scans for a cloudforce-one account
- 3bb0299: [BREAKING] Change type of tunnelId in CloudflareTunnelConfigurationGetConfigurationPathParams
- e9274c9: Add new endpoint to get list of configurations
- 4bb88ae: Add x-sensitive property to LogpushOwnershipChallenge type
- c88bde2: Add new query parameter 'direct_user' to initiate video uploads using Tus
- 81f32ae: Change response type for WorkersAiPostRunCfOpenaiWhisperLargeV3Turbo endpoint
- 5a57464: Add 'warp' as a valid value for subnet_types in ZeroTrustNetworksSubnetsListQueryParams
- e438f6b: Replace individual response fields with shared common response schema for GetConfig and PostConfigCreate endpoints

## 0.8.2

### Patch Changes

- 265d09c: Add x-auditable true to ImagesApiResponseCollectionV2 success field
- 1c8df70: Add new endpoint to run AI with llama guard 3-8b
- 01c8316: [BREAKING] Remove doh_in_tunnel field from TeamsDevicesDefaultDeviceSettingsPolicy and TeamsDevicesDeviceSettingsPolicy

## 0.8.1

### Patch Changes

- 779ddfb: Change type of body in webAnalyticsUpdateSiteVariables from RumCreateSiteRequest to RumUpdateSiteRequest

## 0.8.0

### Minor Changes

- 03f4813: [BREAKING] Remove `auditLogsGetOrganizationAuditLogs` endpoint

### Patch Changes

- 49a966e: Add x-auditable true to various record types

## 0.7.0

### Minor Changes

- 3d1f1a7: Add new query parameter 'status' to AccessPolicyTestsGetAUserPageQueryParams type

### Patch Changes

- 87a7226: Add LoadBalancingComponentsSchemasZoneName type for zone name
- 634a913: [BREAKING] Change rules property to optional in RulesetsCreateRuleset, RulesetsUpdateEntrypointRuleset, and RulesetsUpdateRuleset
- 802c4c6: Add new endpoint to get Internet services categories

## 0.6.2

### Patch Changes

- d285a4c: Add register_interface_ip_with_dns field to TeamsDevicesDeviceSettingsPolicy and related request bodies
- 8fe0d4b: Add log_management_strategy field to AigConfig types
- fbf7deb: [OpenAPI] Spec updates for cloudflare-api-js

## 0.6.1

### Patch Changes

- bc404b2: [BREAKING] Change return type of zoneSnippetsSnippetContent to string
- 519029f: [BREAKING] Modify AaaAlertType and AaaFilters to include new alert types and filter options
- d409b04: Add internal_dns field to DnsSettingsDnsSettings
- 2caab64: Restructure AaaMechanisms schema for better organization

## 0.6.0

### Minor Changes

- 5afee48: Add usage statistics for the inference request in multiple endpoints

### Patch Changes

- b386d6c: [BREAKING] Change maximum value for CacheRulesOriginH2MaxStreamsValue from 200 to 1000
- 64a94ef: Add active_delivery_mode filter to EmailSecurityListDomainsQueryParams
- 726d3e1: Add 'suspended' status to WaitingroomStatus type
- 77b0376: [BREAKING] Deprecated serve_directly option in WorkersMultipartScript
- 625d213: Add x-auditable annotation to various schema types

## 0.5.1

### Patch Changes

- 9bf32a4: Add 'last_seen_at' field to AccessServiceTokens schema
- 81691fb: [BREAKING] Rename 'TurnstileMode' to 'TurnstileWidgetMode'
- 5b848a1: Add ZonesCacheRulesAegis to zone settings

## 0.5.0

### Minor Changes

- 9678a0a: Add new endpoint to get Origin H2 Max Streams Setting

## 0.4.1

### Patch Changes

- d299717: Add unidirectional option to MagicAcl, MagicAclUpdateRequest, and MagicAclsAddSingleRequest
- 707dd62: Lists and sorts an account’s targets. Filters are optional and are ANDed together.

## 0.4.0

### Minor Changes

- b2f3d1f: Refactor query_string structure to support both include and exclude options

### Patch Changes

- 71cc81b: [BREAKING] Add new configuration for resolving DNS internally
- 45e8197: [OpenAPI] Spec updates for cloudflare-api-js
- efbdc12: [BREAKING] Add new parameters 'prompts.prompt_id' and 'prompts.version_id' to AigConfigDeleteGatewayLogsQueryParams and AigConfigListGatewayLogsQueryParams

## 0.3.0

### Minor Changes

- 3889330: [BREAKING] Add new endpoints getCommandsEligibleDevices and getCommandsEligibleUsers

### Patch Changes

- 81c233b: [OpenAPI] Spec updates for cloudflare-api-js
- 62e0e1d: Remove order_by and order_by_direction from AigConfigListGatewayQueryParams

## 0.2.1

### Patch Changes

- 86867c1: [OpenAPI] Spec updates for cloudflare-api-js

## 0.2.0

### Minor Changes

- a547faf: Add limitPerGroup property to several query parameters

### Patch Changes

- 9fd8237: Update EmailSecurityCreateDisplayNameResponse result structure

## 0.1.0

### Minor Changes

- 0a971e3: Initial release
