# netlify-api

## 2.1.4

### Patch Changes

- 9164550: Accept `signal` in the per-call `config` of `request()` and `client.api` operations, so a call can be cancelled with an `AbortSignal`. The fetcher already passed it to `fetch`, but `FetcherConfig` had no `signal` field, so `{ config: { signal } }` failed to compile.

## 2.1.3

### Patch Changes

- 0e8ba15: Drop trailing slashes from a configured base URL (or Netlify `basePath`) so a value such as `http://localhost:4000/` no longer sends requests to `//path`.

## 2.1.2

### Patch Changes

- 268b33e: Let `ApiService` and `effectByPath` operations that require no params be called without an argument, as `client.api` operations can. They required one, so `ApiService.<tag>.<operation>()` failed to compile and needed `({})`.

## 2.1.1

### Patch Changes

- 3095560: Type the params of `request()`, `client.api` operations and the Effect `ApiService` and `effectByPath` from the operation. They were typed as `{}`, so a missing path parameter, a wrong body or an unknown key compiled and failed only at runtime. Header parameters are kept under `headers`.

## 2.1.0

### Minor Changes

- d0b6702: Added new operations getIdentityUser and lookupIdentityUser.

### Patch Changes

- d0b6702: Added new types for IdentityUser and parameters and responses for getIdentityUser and lookupIdentityUser operations.

## 2.0.3

### Patch Changes

- 3b61252: Keep the `config` passed to `request()` and `client.api` operations, such as extra `headers`, instead of replacing it with the client's own.

## 2.0.2

### Patch Changes

- 9fcd6a5: No public API changes in this diff.

## 2.0.1

### Patch Changes

- 4810a1b: Added new optional fields to multiple response and request types such as Site, Deploy, DeployFiles, CreateSiteDeployBody, and UpdateSiteDeployBody.
- 4810a1b: Added new optional fields to various environment variable and function config types.

## 2.0.0

### Major Changes

- 619b8c7: Move the `effect` entrypoint to Effect 4. The peer dependency is now `effect@^4.0.0`, and `ApiConfig` is a `Context.Service` key instead of a `Context.Tag`, so projects still on Effect 3 should stay on the previous major. The rest of the client is unchanged.
- 49d548e: Breaking: a failed HTTP response now rejects with `{ status, payload }`, where `status` is the HTTP status code and `payload` is the parsed error body (or a description string when the body is not JSON). It used to reject with `{ name: "unknown", message }`, losing both. Code that reads `error.message` from a rejected call should read `error.status` and `error.payload` instead. Requests that never get a response still reject with `{ name: "unknown", message }`. In the Effect bindings, HTTP errors now fail with `ApiError` carrying the status instead of `NetworkError`.

### Minor Changes

- 254cfe2: Added stopAgentRunner, getAgentRunnerDiff, stopAgentRunnerSession, and answerAgentRunnerSession operations along with related types for enhanced agent runner controls and session interactions.
- 254cfe2: [BREAKING] Renamed archiveAgentRunner operation to stopAgentRunner and updated related types accordingly; use stopAgentRunner instead of archiveAgentRunner.
- 254cfe2: Added new createSiteAgentRunner operation and corresponding types for creating agent runners associated with a site.
- a9fd6ca: Add a `body` parameter to the operations that take a non-JSON request body. `uploadDeployFile`, `uploadDeployFunction`, `uploadDeployServer` and `uploadDeployEdgeFunction` accept a `Blob`, `ArrayBuffer`, `Uint8Array`, `ReadableStream` or string sent as `application/octet-stream`, and `createSiteBuild` accepts a `zip` file sent as multipart form data.

### Patch Changes

- 76653f2: Return `undefined` from `client.api` for `Object.prototype` names such as `constructor` or `toString`, instead of a namespace or an operation wrapper that calls the inherited method.
- dc5ea2c: Resolve a binary response, such as a zip, an octet-stream, a PDF or an image, as a `Blob` instead of a string decoded as UTF-8, which corrupted the bytes of downloads like `chatsDownloadVersion` in `v0-api`, `downloadArtifact` in `vercel-api-js` and Workers KV values in `cloudflare-api-js`. A custom `fetchImpl` whose response has no `blob()` still gets the text.
- 20d1462: Bundle the shared runtime helpers instead of depending on `@sferadev/openapi-utils`, which is private and was never published, so installing the package from npm failed with a 404.
- 6f3d266: Abort the HTTP request when an operation from the `effect` entry is interrupted, for example by `Effect.timeout` or `Fiber.interrupt`. The request used to keep running after the effect gave up on it. `makeApiLayer` now also accepts `fetchImpl`, and `ApiService` and `effectByPath` return `undefined` for `Object.prototype` keys such as `constructor` instead of a broken operation.
- 443e396: Show the API's own error message in the `effect` entry's errors. `ApiError.message` read only a top-level `message` on the rejection, which HTTP errors never have, so every failure read `API Error: <status>`. It now reads `API error <status>: <message>`, taking the message from the error body's `message`, `error`, `error.message` or `errors[0].message`, or the body itself when it is text, and keeps the old text when none is found. `NetworkError.message` also reads `message` from a cause that is not an `Error`. `status`, `error` and `cause` are unchanged.
- c80f59d: Resolve a 204 or an empty successful body to `undefined` instead of rejecting with a network error, and let a header such as `authorization` or `content-type` replace the default regardless of case instead of being sent alongside it
- 21eaaa2: Reject a failed request with a real `Error` that names the method and path, gives the reason and keeps the original exception as `cause`, instead of a plain object with no stack, and keep the raw body text (up to 1000 characters) as the payload when an error response is not JSON, instead of the JSON parser's message. An aborted request rejects with the `AbortError` itself, so callers can tell it from a network failure.
- 1fc5b21: Omit undefined query parameters and send arrays as repeated keys
- 861d6c9: Inline the Effect helper types into `effect.d.mts` instead of importing them from `@sferadev/openapi-utils/effect`, which is not published, so TypeScript resolves `ApiConfig`, `ApiError`, `makeApiLayer` and the `ApiService` shape for consumers instead of failing with a missing module.
- 40d8746: Send array and object fields of a multipart body instead of dropping them: an array is sent as one part per item and an object as a JSON part, and a bigint field as a string.
- 6af8503: Added fields to UpdateSiteDeployBody type.
- 3fd4e55: Added query parameters for the listHookTypes operation.
- 8f4a159: Added optional 'plugins' property to the input parameters of 'createSiteBuild'.
- 3fd4e55: Defined response types for CreateAgentRunnerUploadUrl, AgentRunnerPullRequest, AgentRunnerCommitToBranch, and MarkDevServerActivity operations instead of using unknown.
- 6af8503: Added fields to CreateSiteDeployBody type.
- 6af8503: Added fields to DeployFiles type.
- a761355: Percent-encode path parameters in generated operations, so a value containing `/`, `?`, `#` or `..` can no longer change which endpoint is called. Required path parameters now accept falsy values such as `0`, and multipart bodies send number and boolean fields as strings instead of dropping them. Regenerated from the current upstream spec.
- 1a37cad: Keep the slashes in file path parameters, which the previous release percent-encoded as `%2F`, and leave existing `%XX` escapes in them untouched so values already passed through `encodeURI` are not encoded twice.
- 613be44: `request()` now calls the generated operation instead of the raw fetcher, so path parameters are substituted, validated and percent-encoded the same way as through `api`. An unknown endpoint throws.
- 5a88630: Send a `ReadableStream` upload body with `duplex: "half"`. Without it, Node's `fetch` rejected the request with "duplex option is required when sending a body" before sending anything, so `uploadDeployFile` and the other octet-stream uploads failed whenever they were given a stream.

## 1.4.1

### Patch Changes

- 63b5781: Updated zip field in DeployFiles, CreateSiteDeployBody, and UpdateSiteDeployBody types from unknown to Blob, and in schemas to z.instanceof(File).
- 63b5781: Changed form, submission, snippet, and pagination fields from z.int() to z.int32() in schemas to enforce 32-bit integer types.

## 1.4.0

### Minor Changes

- 20182f1: Add uploadDeployServer endpoint for uploading Netlify Server bundles for deploys.

### Patch Changes

- 20182f1: Add required_server field to various deploy and site schemas and types to track Netlify Server bundle state.
- 20182f1: Add server object to deploy files and deploy body types to represent Netlify Server bundle metadata.

## 1.3.1

### Patch Changes

- 3a6a5c6: Relaxed type of 'zip' field in DeployFiles, CreateSiteDeployBody, and UpdateSiteDeployBody schemas and types from File/Blob to unknown.

## 1.3.0

### Minor Changes

- 5223c4e: Migrated code generation to kubb v5.
  
  The generated client functions are unchanged — same names, same signatures, same behaviour — so
  calling code needs no updates. Auxiliary type exports were restructured by kubb v5: `*RequestConfig`
  is now `*Options`, and per-parameter types are now grouped (`FooPathBarId` → `FooPath`,
  `FooQueryLimit` → `FooQuery`). Only code importing those helper types directly is affected.

## 1.2.0

### Minor Changes

- 85d8e5e: Added required_edge_functions and edge_functions fields to Deploy, Site, and related types, as well as to schemas to track edge-function bundles for deploys.
- 85d8e5e: Added support for the uploadDeployEdgeFunction API endpoint and related types, schemas, and exports.

## 1.1.0

### Minor Changes

- 1df64e3: Add CRUD API endpoints and type definitions for Site Agent Runner Hooks.

## 1.0.0

### Major Changes

- 05e1980: Migrate from openapi-codegen to kubb for code generation.

  Breaking changes:

  - Generated code is now in `./src/generated/` instead of `./src/api/` or other locations
  - Export structure changed: now exports `Fetchers`, `Helpers`, `Schemas`, `Types` instead of previous structure
  - `FetcherExtraProps` renamed to `FetcherConfig`
  - Added new type exports: `ApiClient`, `ApiOperation`, `ApiOperationParams`, `ApiOperationResult`, `ApiOperationByMethod`

### Minor Changes

- 084345c: Add functions_region and functions_region_overrides fields to site, deploy, and related schemas to specify deployment region information for functions.
- c1218f3: Add listing endpoint for all branches on a site's database, including status, compute, and metadata fields.
- 40a6757: Added an optional 'vcpu' property to function configuration schemas, allowing configuration of vCPUs for functions.
- f40175d: Added API endpoint to reset a non-production database branch by re-forking it from a source branch.
- f40175d: Added API endpoint to list all migrations for a specified site database branch.
- f40175d: Added API endpoint to fetch the contents of a named migration for a specified site database branch.
- d00bfdd: Add database management API, including endpoints for creating, listing, deleting, and restoring databases, branches, and snapshots for sites.
- 74ad091: Migrate OpenAPI clients to SferaDev monorepo with improved build configuration, updated dependencies, and enhanced TypeScript support.
- c1218f3: Add endpoint for running site database migrations, including support for dry-run, migration conflict, and validation errors.
- c1218f3: Allow role-based queries for database and branch connection strings via query parameters.
- 00ded01: Added new API endpoint getAccountAIGatewayToken to retrieve AI Gateway token scoped to an account.
- c1218f3: Add support for database branch and snapshot metadata, including new types and fields for branch and snapshot creation, retrieval, and listing.
- c1218f3: Add endpoints and types for managing database compute settings at the branch and project level, including get, set, and clear operations, and corresponding settings types.
- 084345c: Add region field to functionSchema, functionConfigSchema, and deployFilesSchema for specifying regional deployment of individual functions.
- 2914e61: Added support for specifying deploy-specific environment variable data in deploy APIs.
- 792bd66: Bump OpenAPI codegen version to 2.46.0 in generated API files.

### Patch Changes

- 4ef19de: Added or updated JSDoc comments on API functions for improved documentation.
- d925126: Added optional memory allocation (in MB) to function configuration objects in DeployFiles, FunctionConfig, CreateSiteDeployData, and UpdateSiteDeployData schemas and types.
- 0e8e708: Changed the BuildLogMsg.section type to use a multi-line union for clarity.
- 4ef19de: Changed several URL and documentation tags for consistency (e.g., @link /sites instead of {@link /sites}).
- 0e8e708: Refactored API function parameter formatting to use multi-line style for improved readability.
- c43fac7: Add CreateTicketMutationRequest type to support body when creating a ticket.
- 250ff6a: Updated types to allow null values and added min/max constraints for compute settings fields.
- 18d73c2: [BREAKING] Changed all schema and type definitions that used bigint for integer properties (such as size, ttl, priority, etc.) to use int/number instead.
- 4ef19de: Standardized argument passing and error handling across all generated API endpoint functions.
- 4ef19de: Added explicit passing of request headers (including spreading default and user headers) in all endpoint calls.
- 40a6757: Updated function memory description to clarify it is mutually exclusive with 'vcpu'.
- c43fac7: Improve error typing for createTicket endpoint to specify possible 401 and 422 errors.
- c43fac7: Add CreateTicket401 and CreateTicket422 error types for ticket creation endpoint.
- 4ef19de: Updated zod schemas to use 'bigint' and improved property optionality for better type safety on properties such as sizes, timestamps, and enum values.
- c43fac7: Update createTicket API function to accept and pass a body in the request.
- 4ef19de: Updated all function imports and response typings to match new generated API type conventions (e.g., Response instead of MutationResponse).
- 250ff6a: Removed duplicate setSiteDatabaseBranchComputeSettingsComputesettingsSchema and corresponding type definitions.
- ba7618b: Changed integer fields (such as size, ttl, priority, code, etc.) in schemas and types to bigint to support larger values.
- 744dda1: Added optional event_subscriptions field to DeployFiles, FunctionConfig, CreateSiteDeployMutationRequest, and UpdateSiteDeployMutationRequest schemas and types.
- 0e8e708: Reformated union string types in query parameters for better readability.
- c43fac7: Add createTicketMutationRequestSchema with optional message field for ticket creation.
- f2384dc: [BREAKING] Change is_secret field from optional to required in schemas and types for deploy environment variables and related objects.
- 250ff6a: Added validation for min and max values for min_cu, max_cu, and sleep_timeout_seconds in database compute settings schemas.
- c1218f3: Enhance branch, snapshot, and compute-related schemas and types for richer API response details and documentation.
- 4ef19de: Renamed schema and exported types for consistency and clarity in generated/types.ts and schemas.ts.
- 0e8e708: Ensured consistent ordering and grouping of exports in api/extra.ts for maintainability.
- 00ded01: Added type definitions and schemas for the getAccountAIGatewayToken endpoint and its responses.
- bcb7969: Bump generated OpenAPI version from 2.48.0 to 2.49.0 across API source files.
- 4ef19de: Refactored all API function signatures to use named arguments with destructuring and improved default values.
- 4ef19de: Updated query parameter shapes on API functions to inline objects instead of imported types.
- 18d73c2: [BREAKING] The body parameter is now required for several mutation functions in the API, instead of being optional.
- c1218f3: Change database branch identification from deploy_id to branch_id in branch-related endpoints, schemas, and types. [BREAKING]

## 0.10.2

### Patch Changes

- c65b4e0: Change single quotes to double quotes in code for consistency

## 0.10.1

### Patch Changes

- 33fce81: [BREAKING] Change GetAccountResponse type from array to object

## 0.10.0

### Minor Changes

- f169446: Bump API version to 2.37.0

## 0.9.2

### Patch Changes

- fc8b392: Bump version to 2.36.0

## 0.9.1

### Patch Changes

- b53c98c: Update API version to 2.35.1

## 0.9.0

### Minor Changes

- 35374e2: Update bundle mechanism

## 0.8.0

### Minor Changes

- f22345e: Bump version to 2.35.0

### Patch Changes

- 4e146a9: Add query parameters support to listAccountsForUser endpoint

## 0.7.0

### Minor Changes

- a64ae61: Add getAllCertificates endpoint to fetch SSL certificates for a site

## 0.6.1

### Patch Changes

- 8397d02: Remove mention of Enterprise plans from environment variable documentation

## 0.6.0

### Minor Changes

- 7478d2e: Bump API version to 2.34.0
- a86c18e: Add account_id field to Site and SiteSetup schemas

### Patch Changes

- c7990bb: Returns all environment variables for an account or site. An account corresponds to a team in the Netlify UI.

## 0.5.1

### Patch Changes

- 09038be: Update OpenAPI codegen to version 2.33.1

## 0.5.0

### Minor Changes

- 2c6c5a4: Bump version to 2.32.0
- 8580858: Bump API version to 2.33.0

## 0.4.2

### Patch Changes

- 14f1b45: Bump version to 2.31.0

## 0.4.1

### Patch Changes

- e6e9dd3: Update dependencies

## 0.4.0

### Minor Changes

- 213a4c0: Add new endpoint to list site dev servers

## 0.3.2

### Patch Changes

- 3584599: [BREAKING] Updated roles in AddMemberToAccount and UpdateAccountMember endpoints

## 0.3.1

### Patch Changes

- 1eaed14: Update OpenAPI codegen version to 2.28.0

## 0.3.0

### Minor Changes

- 201584c: Update site capabilities schema

### Patch Changes

- e3ad5fd: Update OpenAPI codegen version to 2.26.1

## 0.2.1

### Patch Changes

- d441527: [OpenAPI] Add site functions

## 0.2.0

### Minor Changes

- 8512044: Add new get site env vars

## 0.1.9

### Patch Changes

- 605bae6: [OpenAPI] Spec updates for netlify-api
- 0be29c9: Export `types`

## 0.1.8

### Patch Changes

- 5e1feed: [OpenAPI] Spec updates for netlify-api

## 0.1.7

### Patch Changes

- e922990: [OpenAPI] Spec updates for netlify-api

## 0.1.6

### Patch Changes

- 5da1e9e: [OpenAPI] Add context branch parameter

## 0.1.5

### Patch Changes

- bd49651: Add `branch_deploy_custom_domain` and `deploy_preview_custom_domain`

## 0.1.4

### Patch Changes

- 32af887: Update return type for refresh token

## 0.1.3

### Patch Changes

- 3400a10: Add `request` helper method

## 0.1.2

### Patch Changes

- ca612f6: Add refresh token helper
- 719f021: Add base path
