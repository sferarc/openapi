# nuki-api-js

## 2.0.1

### Patch Changes

- 7f1a20d: No API changes detected, only type formatting or code style updates were made.

## 2.0.0

### Major Changes

- 619b8c7: Move the `effect` entrypoint to Effect 4. The peer dependency is now `effect@^4.0.0`, and `ApiConfig` is a `Context.Service` key instead of a `Context.Tag`, so projects still on Effect 3 should stay on the previous major. The rest of the client is unchanged.
- 49d548e: Breaking: a failed HTTP response now rejects with `{ status, payload }`, where `status` is the HTTP status code and `payload` is the parsed error body (or a description string when the body is not JSON). It used to reject with `{ name: "unknown", message }`, losing both. Code that reads `error.message` from a rejected call should read `error.status` and `error.payload` instead. Requests that never get a response still reject with `{ name: "unknown", message }`. In the Effect bindings, HTTP errors now fail with `ApiError` carrying the status instead of `NetworkError`.

### Minor Changes

- e09029f: [BREAKING] Removed several exported operations related to account, address, API key, notification, opener, service, smartlock, and smartdoor resources.

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
- a761355: Percent-encode path parameters in generated operations, so a value containing `/`, `?`, `#` or `..` can no longer change which endpoint is called. Required path parameters now accept falsy values such as `0`, and multipart bodies send number and boolean fields as strings instead of dropping them. Regenerated from the current upstream spec.
- 613be44: `request()` now calls the generated operation instead of the raw fetcher, so path parameters are substituted, validated and percent-encoded the same way as through `api`. An unknown endpoint throws.

## 1.2.0

### Minor Changes

- fdb31d7: Add keypadMountingState property to SmartlockState schema and type.

### Patch Changes

- fdb31d7: Switch all Zod integer fields from int to int32 in schemas for better compatibility and type safety.
- fdb31d7: Add missing properties and reorder some fields in Request and Response types to match schema changes.
- fdb31d7: Fix order and structure of properties in Application and Restlet types for consistency with schema.
- fdb31d7: Improve description of AdvancedApiKey and AdvancedApiKeyCreate name to clarify visibility in device logs.

## 1.1.1

### Patch Changes

- 9c499a4: Reordered the properties allEncodingExtensionNames and allExtensionNames in MetadataService schema and type definition to match other field orderings.

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

### Minor Changes

- 5499d31: Improved smartlock types to add support for Smartlock 5 and clarified numbering in types and logs.
- 2b048c3: Added includeEmail optional field to GetSmartlockAuthsResourceQueryParams schema and type definition.
- 74ad091: Migrate OpenAPI clients to SferaDev monorepo with improved build configuration, updated dependencies, and enhanced TypeScript support.
- c615ad1: Added the optional field 'annotations' to AccountSettingWeb for storing additional generic settings.

### Patch Changes

- 5130e70: Re-ordered Metadata, CharacterSet, Encoding, Language, MediaType, and MetadataService types and schemas for clarity and consistency.
- bb09568: Update OpenAPI generated code version from 4.4.1 to 4.5.0 in components, requestBodies, and schemas files.
- 5130e70: Fixed the order of currentlyIssuingAuth and currentlyRevokingAuth fields in AddressReservation type and schema.
- 2b048c3: Reordered currentlyIssuingAuth and currentlyRevokingAuth fields in AddressReservation schema and type definition.
- bb09568: Reorder 'currentlyRevokingAuth' and 'currentlyIssuingAuth' in AddressReservation type to match updated schema.
- 9cd39b3: [BREAKING] Make body parameter required for several API resource mutation functions.
- 5130e70: Re-ordered fields in ObjectId type and schema to match usage consistency.
- bb09568: Reorder fields in Application, Request, Response, and Restlet types to match updated schema.
- 887d4d2: Changed the types for 'offset' and 'limit' in GetAccountUsersResourceQueryParams from undefined to void for increased type clarity.
- 8c8e5d6: Changed various API fields from number (int) to bigint (int64) for improved large integer support.
- c615ad1: Reordered some properties in Application, ClientInfo, Request, Response, Status, and related schemas/types to match updated model definitions.
- 5130e70: Moved RangeService schema and type to a new position for consistency with other services.
- 5130e70: Re-ordered properties in Status type and schema for sequential logic: error category booleans now appear before generic/global/error flags.
- 5499d31: Fixed various language issues, such as replacing 'Bad Parameter' with 'Bad parameter' and 'Account not payed' with 'Account not paid', for clarity and correctness.
- 5499d31: Corrected and clarified API descriptions and parameter names for consistency, including email, Smartlock types, and ID terminology.
- 5130e70: Re-ordered and improved clarity for Protocol and Reference schemas and types.
- 2b048c3: Reordered machineIdentifier, processIdentifier, and timeSecond fields in ObjectId schema and type definition.
- c615ad1: Changed descriptions for smartlockLogSchema.trigger and smartlockLogSchema.state to add more trigger/state details.
- 5499d31: Moved optional properties in Restlet, Reference, Application, and Response types to match schema correctness.
- c615ad1: Reordered and refactored schema and type definitions for Protocol, Reference, Metadata, RangeService, and others to improve code structure.
- 5130e70: Moved confidential field to a better position in Request and Response schemas and types.
- 5130e70: Re-ordered properties in Application type and schema for consistency.
- 9cd39b3: [BREAKING] Replace all use of bigint with number for smartlockId and related fields in types and schemas.
- cec32f5: Reordered several optional properties in schemas and types for better consistency with generated API definitions.
- bb09568: Add 'identifier' field to Reference type and adjust field order to match updated schema.
- 5130e70: Moved upstreamAddress field in ClientInfo type and schema for better logical grouping.

## 0.2.1

### Patch Changes

- abac583: Update version to 3.13.1.

## 0.2.0

### Minor Changes

- e290087: Add pagination support for smartlock authorizations

## 0.1.1

### Patch Changes

- 3a8c590: Standardize import statements by changing single quotes to double quotes

## 0.1.0

### Minor Changes

- 3098c23: [BREAKING] Remove subscription-related APIs and data types

## 0.0.6

### Patch Changes

- 8e2667e: Bump version to 3.8.1

## 0.0.5

### Patch Changes

- c518729: Update API version to 3.8.0

## 0.0.4

### Patch Changes

- d5dedd9: Bump version to 3.7.0

## 0.0.3

### Patch Changes

- 66d3d00: Update API version to 3.6.0

## 0.0.2

### Patch Changes

- 236410a: Bump version to 3.5.1

## 0.0.1

### Patch Changes

- 5571d9d: Initial release
