# keycloak-api

## 2.1.9

### Patch Changes

- 4043560: Reject a call cancelled through `signal` with what the signal was aborted with. A call given `AbortSignal.timeout()` now rejects with its `TimeoutError`, and one aborted with `controller.abort(reason)` with `reason`, where both were wrapped in an `Error` reading `GET /path failed: ...`; only an `AbortError` passed through before.

## 2.1.8

### Patch Changes

- 9164550: Accept `signal` in the per-call `config` of `request()` on `KeycloakAdminApi` and `KeycloakAccountApi`, so a call can be cancelled with an `AbortSignal`. The fetcher already passed it to `fetch`, but `FetcherConfig` had no `signal` field, so `{ config: { signal } }` failed to compile.

## 2.1.7

### Patch Changes

- 0e8ba15: Drop trailing slashes from a configured base URL (or Netlify `basePath`) so a value such as `http://localhost:4000/` no longer sends requests to `//path`.

## 2.1.6

### Patch Changes

- b8e5376: Changed response type of GET /admin/realms/{realm}/localization/{locale}/{key} from unknown to string.
- b8e5376: Changed response type of GET /admin/realms/{realm}/identity-provider/instances/{alias}/mapper-types from unknown to an object.
- b8e5376: Changed response type of POST /admin/realms/{realm}/clients/{clientUuid}/certificates/{attr}/download from unknown to Blob.

## 2.1.5

### Patch Changes

- 59d81dd: Send `Accept: application/json, */*;q=0.8` by default instead of `Accept: application/json`. Keycloak answers 406 Not Acceptable when no `@Produces` of an endpoint matches the `Accept` header, so the operations that only produce something else failed on every call: the client certificate `download` and `generate-and-download` (`application/octet-stream`) and the realm localization text `GET /admin/realms/{realm}/localization/{locale}/{key}` (`text/plain`). JSON endpoints still get JSON, and a caller's `accept` header still replaces the default.

## 2.1.4

### Patch Changes

- f1610e4: Type the responses the API sends as something other than `application/json` instead of `unknown`: a download the client resolves as a `Blob` (a zip, PDF, image or `application/octet-stream`) is typed `Blob`, a text body such as `text/plain` or a PEM file is typed `string`, as is any other non-JSON body the client returns as text whatever its schema (Cloudflare's `multipart/form-data` snippet content), and an `application/scim+json` body gets its schema. For example `chatsDownloadVersion` in `v0-api`, `readSessionFile` in `vercel-api-js` and Cloudflare's PDF, screenshot and KV value downloads.

## 2.1.3

### Patch Changes

- 3095560: Type the params of `request()` on `KeycloakAdminApi` and `KeycloakAccountApi` from the operation. They were typed as `{}`, so a missing path parameter, a wrong body or an unknown key compiled and failed only at runtime.

## 2.1.2

### Patch Changes

- 3b61252: Keep the `config` passed to `request()`, such as extra `headers`, instead of replacing it with the client's own.

## 2.1.1

### Patch Changes

- 001eccb: Updated many admin API operation implementations, possibly due to spec changes or internal codegen improvements.

## 2.1.0

### Minor Changes

- e3c84b0: [BREAKING] Several exported type definitions such as GETAdminRealmsRealmIdentityProviderInstancesQuery, GETAdminRealmsRealmUsersQuery, and others were modified, which may affect the expected request or response structure for these operations.

## 2.0.0

### Major Changes

- 49d548e: Breaking: a failed HTTP response now rejects with `{ status, payload }`, where `status` is the HTTP status code and `payload` is the parsed error body (or a description string when the body is not JSON). It used to reject with `{ name: "unknown", message }`, losing both. Code that reads `error.message` from a rejected call should read `error.status` and `error.payload` instead. Requests that never get a response still reject with `{ name: "unknown", message }`. In the Effect bindings, HTTP errors now fail with `ApiError` carrying the status instead of `NetworkError`.

### Minor Changes

- cf4f867: Add POSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUserBody and POSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUserBody types for invite operations.
- b63eee1: Add a `body` parameter to the operations that only take an `application/x-www-form-urlencoded` request body, sent as form fields. Before this, `pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteUser` and `pOSTAdminRealmsRealmOrganizationsOrgIdMembersInviteExistingUser` could not send the `email`, `firstName`, `lastName` or `id` they need.

### Patch Changes

- dc5ea2c: Resolve a binary response, such as a zip, an octet-stream, a PDF or an image, as a `Blob` instead of a string decoded as UTF-8, which corrupted the bytes of downloads like `chatsDownloadVersion` in `v0-api`, `downloadArtifact` in `vercel-api-js` and Workers KV values in `cloudflare-api-js`. A custom `fetchImpl` whose response has no `blob()` still gets the text.
- 9fca3e9: Export the `FetcherConfig` type from `keycloak-api/admin/components` and `keycloak-api/account/components`. The declarations of both entries referenced it from a private chunk, so a consumer emitting declarations for code that inferred an operation's parameters could not name it.
- c80f59d: Resolve a 204 or an empty successful body to `undefined` instead of rejecting with a network error, and let a header such as `authorization` or `content-type` replace the default regardless of case instead of being sent alongside it
- 21eaaa2: Reject a failed request with a real `Error` that names the method and path, gives the reason and keeps the original exception as `cause`, instead of a plain object with no stack, and keep the raw body text (up to 1000 characters) as the payload when an error response is not JSON, instead of the JSON parser's message. An aborted request rejects with the `AbortError` itself, so callers can tell it from a network failure.
- 1fc5b21: Omit undefined query parameters and send arrays as repeated keys
- 9f4c973: Add type PUTAdminRealmsRealmUsersUserIdCredentialsCredentialIdUserLabelBody for request body in the update user credential label operation.
- 9f4c973: Add type PUTAdminRealmsRealmLocalizationLocaleKeyBody for request body in the update locale key operation.
- a761355: Percent-encode path parameters in generated operations, so a value containing `/`, `?`, `#` or `..` can no longer change which endpoint is called. Required path parameters now accept falsy values such as `0`, and multipart bodies send number and boolean fields as strings instead of dropping them. Regenerated from the current upstream spec.
- 1a37cad: Keep the slashes in file path parameters, which the previous release percent-encoded as `%2F`, and leave existing `%XX` escapes in them untouched so values already passed through `encodeURI` are not encoded twice.
- 613be44: `request()` now calls the generated operation instead of the raw fetcher, so path parameters are substituted, validated and percent-encoded the same way as through `api`. An unknown endpoint throws.
- fe64135: Send a `ReadableStream` upload body with `duplex: "half"`. Without it, Node's `fetch` rejected the request with "duplex option is required when sending a body" before sending anything, so raw body operations such as `uploadArtifact` in `vercel-api-js` and `dlpDatasetsUploadVersion` in `cloudflare-api-js` failed whenever they were given a stream.
- 9865850: Expose operations without a tag under `client.api.default` and the Effect `ApiService.default`, and merge tags that differ only in case or separators into one namespace instead of dropping all but the last.

## 1.2.0

### Minor Changes

- 62df07c: Added new organizationLinks field to identity provider schema to support multiple org links.
- 62df07c: Added identityProvider query parameter to organization GET and count endpoints.
- 62df07c: Added support for updating organization member membership type with new PUT endpoint.
- 62df07c: Added client_id query parameter to organization member invite-user endpoint.
- 62df07c: Added identityProviderAlias and autoRedirect fields to organization domain schema.
- 62df07c: Added support for updating organization identity provider links with new PUT endpoint.

### Patch Changes

- 62df07c: Updated several GET /groups endpoints to return groups instead of users in some cases.
- 62df07c: Marked several client certificate endpoints as deprecated and updated summaries to reflect new behavior.

## 1.1.3

### Patch Changes

- 5a0d356: Replaced all uses of z.int() with z.int32() in schemas to clarify integer type handling.

## 1.1.2

### Patch Changes

- 6e2c2ec: Changed POSTAdminRealmsBody and POSTAdminRealmsRealmPartialImportBody schema types from File/Blob to unknown for improved flexibility.

## 1.1.1

### Patch Changes

- 85c2c42: Marked the 'inviteLink' property of OrganizationInvitationRepresentation as deprecated.

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

## 1.0.1

### Patch Changes

- 58d18d6: Republish so the shipped bundle matches the generated sources.

  The `keycloak-api@1.0.0` artifact on npm was built from pre-kubb-5 sources, where the
  self-referential admin schemas were emitted as eager property values instead of lazy getters.
  `policyRepresentationSchema.scopesData` calls `z.array(scopeRepresentationSchema)` while that
  `const` is still in its temporal dead zone, so merely importing the package throws:

  ```
  ReferenceError: Cannot access 'scopeRepresentationSchema' before initialization
  ```

  That kills every consumer at import time — including anyone using only the account API, since
  `KeycloakAccountApi` lives in the same entry point. `src/admin/generated/schemas.ts` in this repo
  already emits `get scopesData()`, so a build from current `main` imports cleanly; only the
  published artifact is broken.

## 1.0.0

### Major Changes

- 05e1980: Migrate from openapi-codegen to kubb for code generation.

  Breaking changes:

  - Generated code is now in `./src/generated/` instead of `./src/api/` or other locations
  - Export structure changed: now exports `Fetchers`, `Helpers`, `Schemas`, `Types` instead of previous structure
  - `FetcherExtraProps` renamed to `FetcherConfig`
  - Added new type exports: `ApiClient`, `ApiOperation`, `ApiOperationParams`, `ApiOperationResult`, `ApiOperationByMethod`

### Minor Changes

- fdb7908: Add organization groups endpoints for managing groups within organizations, including creation, update, delete, subgroup operations, and membership management.
- f930fc9: Added new organization invitation endpoints: list, get, delete, and resend invitations for organizations.
- fdb7908: Add ability to return group memberships for organization members.
- 887cbe1: Added new workflows API endpoints and types for managing workflows in admin realms.
- 887cbe1: Added types and endpoints for organization invitations.
- 74ad091: Migrate OpenAPI clients to SferaDev monorepo with improved build configuration, updated dependencies, and enhanced TypeScript support.
- fdb7908: Add a workflow migration endpoint to migrate scheduled resources between workflow steps.
- 887cbe1: Added postAdminRealmsRealmIdentityProviderUploadCertificate API for uploading identity provider certificates.
- fdb7908: Add identity provider group mapping endpoints for organizations.

### Patch Changes

- fdb7908: [BREAKING] Rename roles composite endpoints from 'clientUuid' to 'targetClientUuid' in both path parameters and function names.
- 02a9856: [BREAKING] Removed effect-based client for Admin API.
- fdb7908: Add description and code fields to policy provider representation.
- fdb7908: Add additional properties to schemas and representations, including fields for SCIM API enablement, secondary auth failures, and workflow step status.
- f930fc9: Removed the optional 'address' property from AccessToken and IDToken types.
- 887cbe1: Added 'capability' and 'type' filters to GetAdminRealmsRealmIdentityProviderInstancesQueryParams.
- 0b9d88a: [BREAKING] Removed enforcement mode, policy enforcer, installation adapter, path config, and related types and schemas from the API.
- 0075a59: Update some export types in schemas.ts to use void instead of undefined for better type semantics.
- 887cbe1: Updated AccessToken and IDToken address property to a generic object instead of AddressClaimSet.
- 887cbe1: Added webOrigins field to ClientInitialAccessCreatePresentation type.
- fdb7908: Add support for filtering users by creation date in user and user count queries.
- 887cbe1: Extended CertificateRepresentation with jwks property.
- 887cbe1: Updated and extended workflow-related types and fields, including WorkflowRepresentation and related subtypes.
- 0075a59: Refactor import statements and API method signatures in account and admin components for greater consistency and clarity.
- 5713c48: [BREAKING] Change 'body' parameter in several mutation requests from optional to required.
- 5713c48: [BREAKING] Change many API schema and type fields from bigint to int or number.
- fdb7908: Add providerId filter to components query parameters.
- b7b7071: [BREAKING] Change all int fields representing int64 values to bigint in generated types.
- 887cbe1: Expanded IdentityProviderRepresentation with 'types' property.
- 02a9856: [BREAKING] Removed effect-based client for Account API.
- b7b7071: [BREAKING] Change all optional int fields representing int64 values to bigint in generated schemas.

## 0.2.6

### Patch Changes

- 9301bf7: Add subGroupsCount parameter to GetAdminRealmsRealmGroupsQueryParams

## 0.2.5

### Patch Changes

- fa00357: Change dateFrom and dateTo to accept timestamps in milliseconds

## 0.2.4

### Patch Changes

- 0ffd14e: Add new query parameters 'direction', 'resourceType', and 'audience' to several endpoint definitions

## 0.2.3

### Patch Changes

- e9199f6: Remove realm from account pathParams

## 0.2.2

### Patch Changes

- 44ab118: Add accept header

## 0.2.1

### Patch Changes

- ae275d0: Export extra

## 0.2.0

### Minor Changes

- 7bbd2fd: Add account API

## 0.1.0

### Minor Changes

- 35374e2: Update bundle mechanism
