# zoom-api-js

## 3.0.6

### Patch Changes

- a4f1437: Send an object query parameter as one key per property (`start=2021-04-01&end=2021-04-30`), OpenAPI's default form style, leaving out nullish entries, instead of `range=[object Object]`, so a spec update that adds one works without a fetcher change.

## 3.0.5

### Patch Changes

- d61e1e4: A `204` or `205` response is now typed `void` in `types` and `z.void()` in `schemas`, which is what the client resolves its empty body to. It used to be typed `unknown`, which swallowed the other member of a `200 | 204` union, so `getEdgeConfigItem` in `vercel-api-js` and `entitlementsGetAccountEntitlements`, `entitlementsGetZoneEntitlements`, `accountBillingDeletePaymentMethod`, `accountBillingSetDefaultPaymentMethod` and `accountSubscriptionsCancelDelayedDowngrade` in `cloudflare-api-js` returned `unknown` instead of their `200` body or `undefined`. A `204` the spec declares with a body, such as `deleteSecurityFirewallConfigByConfigVersion` in `vercel-api-js` (typed `""`), is `void` as well, and its zod schema now accepts the `undefined` the client returns.

## 3.0.4

### Patch Changes

- a6a158d: The fetcher now reads `baseUrl` from its config, as the Vercel, v0 and Cloudflare clients already do, so `makeApiLayer({ baseUrl })` and a call's `config: { baseUrl }` take effect instead of being dropped for the hard-coded host. A Zoom for Government account can point the client at `https://api.zoomgov.com/v2`. A trailing slash on the base URL no longer produces `//path`.

## 3.0.3

### Patch Changes

- 93a38cf: Map the subpath entries, such as `/types`, `/schemas`, `/components` and `/effect`, in `typesVersions`. TypeScript's `moduleResolution: node` (`node10`), the TypeScript 5 default for `module: commonjs`, ignores `exports`, so importing a subpath failed with "Cannot find module" there.

## 3.0.2

### Patch Changes

- 4f6c5ba: Give `require` its own CommonJS type declarations. Every entry pointed both `import` and `require` at one ESM declaration file, so a CommonJS project using `moduleResolution: node16` or `nodenext` got ESM types for the CommonJS build.

## 3.0.1

### Patch Changes

- ebb720d: An operation with a required query parameter now requires `queryParams` and the required fields in it, so leaving one out fails to compile instead of getting a 400 from the API. They used to be typed `Partial`, so `client.request("GET /deployments")` in `v0-api` compiled without the `chatId` and `versionId` the spec requires. Operations whose query parameters are all optional are unchanged.

## 3.0.0

### Major Changes

- 597d8ed: Breaking: `format: int64` fields and parameters are typed `number` instead of `bigint`, and their zod schemas are `z.int()` instead of `z.coerce.bigint()`. The API sends these values as JSON numbers, so a response never held a `bigint` despite its type, and a `bigint` passed in a JSON body, as the types asked for, such as the `ttl` of Netlify's `createDnsRecord`, made `JSON.stringify` throw `Do not know how to serialize a BigInt`. Code that passed a `bigint`, such as a Zoom `meetingId: 123n`, now passes a number.

## 2.1.9

### Patch Changes

- 6f6655c: Accept any RFC 3339 offset in the Zod schemas of `date-time` fields. They used `z.iso.datetime()`, which only accepts a `Z` suffix, so a valid value such as `2026-10-30T12:00:00+00:00` or `2026-10-30T14:00:00+02:00` failed to parse; they now use `z.iso.datetime({ offset: true })`. The TypeScript types are unchanged.
- d4e35ae: Let `request()` omit its params argument when the operation requires none of its fields, as `client.api` already does. Before, `client.request("GET /path")` failed to compile and callers had to pass `{}`.

## 2.1.8

### Patch Changes

- 4043560: Reject a call cancelled through `signal` with what the signal was aborted with. A call given `AbortSignal.timeout()` now rejects with its `TimeoutError`, and one aborted with `controller.abort(reason)` with `reason`, where both were wrapped in an `Error` reading `GET /path failed: ...`; only an `AbortError` passed through before.

## 2.1.7

### Patch Changes

- ef11578: Encode a meeting or webinar UUID that begins with `/` or contains `//` twice in the request path, as the Zoom API documentation requires; it was encoded once, so a UUID passed as Zoom returns it had to be encoded by hand first. A UUID already encoded by hand is still sent as it was.

## 2.1.6

### Patch Changes

- 9164550: Accept `signal` in the per-call `config` of `request()` and `client.api` operations, so a call can be cancelled with an `AbortSignal`. The fetcher already passed it to `fetch`, but `FetcherConfig` had no `signal` field, so `{ config: { signal } }` failed to compile.

## 2.1.5

### Patch Changes

- 268b33e: Let `ApiService` and `effectByPath` operations that require no params be called without an argument, as `client.api` operations can. They required one, so `ApiService.<tag>.<operation>()` failed to compile and needed `({})`.

## 2.1.4

### Patch Changes

- 3095560: Type the params of `request()`, `client.api` operations and the Effect `ApiService` and `effectByPath` from the operation. They were typed as `{}`, so a missing path parameter, a wrong body or an unknown key compiled and failed only at runtime.

## 2.1.3

### Patch Changes

- 3b61252: Keep the `config` passed to `request()` and `client.api` operations, such as extra `headers`, instead of replacing it with the client's own.

## 2.1.2

### Patch Changes

- 8ddf0e9: Added several new type imports and extended type usages in components, enhancing type coverage and OpenAPI spec alignment in the client.

## 2.1.1

### Patch Changes

- 3babd7e: Type an operation's path, query and header parameters with the generated `<Operation>Path`, `<Operation>Query` and `<Operation>Headers` types instead of an inline object. A parameter whose schema is a `$ref`, a `oneOf`/`anyOf` union or an object used to be typed `unknown`, which accepted any value: Cloudflare's `accountId` path parameter and `per_page` query parameter, LiteLLM's nullable filters such as `team_id` and `start_date`, Vercel's `domain`, v0's `metadata` filter on `chatsFind` and Zoom's `meetingId`. Query and header parameters stay optional.

## 2.1.0

### Minor Changes

- c42b0b2: [BREAKING] Several response, request, and query types in meeting, webinar, and recording APIs have new required fields and structural changes which may affect deserialization and required fields.

### Patch Changes

- c42b0b2: Expanded multiple response and request types with new fields across meeting, webinar, recording, device, and report schemas to support additional data and settings.

## 2.0.0

### Major Changes

- 619b8c7: Move the `effect` entrypoint to Effect 4. The peer dependency is now `effect@^4.0.0`, and `ApiConfig` is a `Context.Service` key instead of a `Context.Tag`, so projects still on Effect 3 should stay on the previous major. The rest of the client is unchanged.
- 49d548e: Breaking: a failed HTTP response now rejects with `{ status, payload }`, where `status` is the HTTP status code and `payload` is the parsed error body (or a description string when the body is not JSON). It used to reject with `{ name: "unknown", message }`, losing both. Code that reads `error.message` from a rejected call should read `error.status` and `error.payload` instead. Requests that never get a response still reject with `{ name: "unknown", message }`. In the Effect bindings, HTTP errors now fail with `ApiError` carrying the status instead of `NetworkError`.

### Minor Changes

- cdbca18: Added uploadWebinarBrandingVB operation to support uploading webinar branding virtual backgrounds.
- cdbca18: Added uploadWebinarBrandingWallpaper operation to support uploading webinar branding wallpapers.

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
- a761355: Percent-encode path parameters in generated operations, so a value containing `/`, `?`, `#` or `..` can no longer change which endpoint is called. Required path parameters now accept falsy values such as `0`, and multipart bodies send number and boolean fields as strings instead of dropping them. Regenerated from the current upstream spec.
- 613be44: `request()` now calls the generated operation instead of the raw fetcher, so path parameters are substituted, validated and percent-encoded the same way as through `api`. An unknown endpoint throws.
- ecd5ede: `auth.refreshToken` now authenticates the client with `Authorization: Basic` as Zoom's token endpoint requires, instead of sending the client ID and secret in the body, and a failed refresh names the HTTP status in its error.
- 04fa8d2: Regenerate from Zoom's current Meetings spec, since the old `api-hub` spec URL now returns 404. Operations gain newer query parameters such as `file_type` on archived file listings.

## 1.3.2

### Patch Changes

- 7d60f42: Use strict object schemas for upgradeZpasAppBodySchema discriminated union types.

## 1.3.1

### Patch Changes

- a9cd323: Fixed location of getMeetingTranscript and deleteMeetingTranscript endpoint definitions in the codebase, but no functional change to API.

## 1.3.0

### Minor Changes

- 8a62f39: Added additional metadata fields (service_name, rc_zone, instance_id, share_url, external_storage_addr) to the recordings list response objects.
- 8a62f39: Added support for a body parameter to meetingAppAdd to allow sharing an app with specific participants and audience filters.
- 8a62f39: Added new optional query parameters zra_status and recording_source_type to recordingsList for filtering by Zoom Revenue Accelerator status and recording source type.
- 8a62f39: Added share_url and status fields to webinar registrant create and get responses for on-demand webinar recordings.
- 8a62f39: Added disable_recording_control setting option to meeting create, update, and get APIs to control in-meeting host recording options.

### Patch Changes

- 8a62f39: Improved and clarified several descriptions related to AI Companion, renaming some to Zoom AI and updating help text for clarity.
- 8a62f39: Added support for '96' type, representing recordings generated by My Notes, across recording APIs and types.

## 1.2.1

### Patch Changes

- 0675ced: Moved 'getMeetingTranscript' operation from 'recording' tag to new 'meetingTranscript' tag in the OpenAPI components.

## 1.2.0

### Minor Changes

- 342740f: Added occurrence_id field to PastMeetingsStatus200 and PastWebinarsStatus200 schemas and types.

### Patch Changes

- 342740f: Improved description for uuid field in PastMeetingsStatus200 and PastWebinarsStatus200 schemas and types.

## 1.1.2

### Patch Changes

- 1b3d442: Updated 'data' property in upgradeZpasAppBodySchema to use discriminatedUnion on 'upgrade_type' instead of union.

## 1.1.1

### Patch Changes

- b8cc03d: Updated example format for download_timestamps in listArchiveFileDownloadAuditStatus200Schema.

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

- 63774f3: Added new API endpoint getdisclaimerreport to retrieve a list of disclaimer records.
- 34f871b: Added is_events_webinar boolean field to webinar objects to indicate if created from Zoom events.
- 34f871b: Added close_caption option to webinar live stream session settings to specify closed caption type (burnt-in, embedded, or off).
- 74ad091: Migrate OpenAPI clients to SferaDev monorepo with improved build configuration, updated dependencies, and enhanced TypeScript support.
- 34f871b: Added include_events_webinar boolean option to webinars query parameters to include Zoom events webinars in searches.
- 34f871b: Added optional query parameters 'from' and 'to' to the pastMeetings API endpoint for filtering past meeting instances by date range.

### Patch Changes

- 34f871b: Added support for 401 Unauthorized errors to the pastMeetings API endpoint.
- ec0dcc0: Updated descriptions for from and to parameters to clarify time field is specified by time_filter_field.
- 9f53922: Changed link for timezone documentation in 'meetingsQueryParams.timezone' description to use a relative path.
- 34f871b: Improved documentation for 429 rate-limit errors on pastMeetings and webinars endpoints.
- ec0dcc0: Added time_filter_field parameter to ListmeetingsummariesQueryParams to specify which summary time field to use for filtering.
- 9f53922: Changed rate limits documentation link for meetings429 schema to use an absolute path.
- 5d138a3: Added show_join_info setting to Webinar settings objects for controlling if join info appears on the registration confirmation page.
- 5d138a3: Added additional_data_center_regions field to Meeting and Webinar settings for creating, updating, and responding with extra allowed data center regions.
- 63774f3: Added support for HTTP 401 Unauthorized error to the meetingUpdate API endpoint.
- 1d4a15e: Refactored import statements in extra.ts for improved readability and organization.
- 80bc453: [BREAKING] Changed meetingId and webinarId fields and related IDs from number/int to bigint in schema and types to support long IDs exceeding 10 digits.
- f859715: Updated example for UploadWebinarBrandingVBRequestBody.file property to reflect a new binary string value.
- 5d138a3: Added visible property to Webinar tracking field responses indicating portal visibility status.
- 9f53922: Updated description of 'meetingsQueryParams.type' for clarity about previous meetings.
- 443257e: Added descriptive comments to several type definitions to improve API documentation clarity.
- 2326fa2: [BREAKING] Change meeting and webinar IDs from bigint to int/number in all schemas and types.
- 80bc453: [BREAKING] Changed all int fields representing durations, PIN codes, conference IDs, and similar large values from number/int to bigint in schema and types.
- 5d138a3: Added template_id field to MeetingResponse, MeetingCreateResponse, WebinarResponse, and WebinarCreateResponse types for tracking meeting and webinar templates used.
- 9f53922: Changed link for Personal Meeting ID in meeting response to use a relative path.
- 63774f3: Updated meeting template documentation link in meeting update and create types.
- 5d138a3: Added registrants_confirmation_email to WebinarCreateRequestBody settings for sending confirmation emails to webinar registrants.
- 63774f3: Added 'users_not_in_org' value to waiting_room_options.who_goes_to_waiting_room for meeting creation and update APIs.
- 5d138a3: Improved various field descriptions and documentation in WebinarCreateResponse for clarity and consistency.
- f859715: Added retain_meeting_transcript option to InMeetingControlRequestBody to control retention of meeting transcripts related to AI Companion meeting summaries.
- 928998e: Fixed incorrect documentation link in Meetings429 error type to use the correct rate limits URL.
- 5d138a3: Added registration_url field to MeetingResponse and WebinarResponse types for returning the registration link when registration is enabled.
- f859715: Clarified and reformatted prerequisites and API documentation for in-meeting controls.
- 928998e: Added Meetings403 error type and response handling for meetings API to support HTTP 403 errors.
- 63774f3: Improved descriptions for waiting room options and watermark fields in meeting APIs.

## 0.6.4

### Patch Changes

- fe9b002: Fix description format for end date parameter.

## 0.6.3

### Patch Changes

- 9d02e30: Add 'push_change_to_calendar' option to MeetingUpdateRequestBody.
- 5ebc0ca: Add getMeetingTranscript API endpoint to retrieve meeting transcripts
- edc8a7c: Add example for the 'userId' field in WebinarCreatePathParams
- fa20faf: [BREAKING] Change type of userId in ReportMeetingsPathParams to a specific string

## 0.6.2

### Patch Changes

- ca1fe30: Add AIC_CONVERSATION type to ListArchivedFilesResponse and GetArchivedFilesResponse.

## 0.6.1

### Patch Changes

- 57f2658: Replace single quotes with double quotes for consistency

## 0.6.0

### Minor Changes

- 8e307db: Added new actions 'pause' and 'resume' to MeetingRTMSStatusUpdateRequestBody.

## 0.5.0

### Minor Changes

- 428dd8e: Add new endpoint to update Real-Time Media Streams (RTMS) status for a specific participant in a meeting

## 0.4.5

### Patch Changes

- 93af0c9: Update URL in comments for double encode UUID
- 58398e6: [BREAKING] Deprecated and replaced legacy meeting summary fields with a unified 'summary_content' field in GetameetingsummaryResponse

## 0.4.4

### Patch Changes

- 71999cd: Add summary_template_id to MeetingResponse, MeetingUpdateRequestBody, MeetingCreateResponse, MeetingCreateRequestBody

## 0.4.3

### Patch Changes

- 6bad508: Change in the meeting UUID description

## 0.4.2

### Patch Changes

- ab0a9f5: Change 'approval type' to 'registration approval type'
- ec9d82c: Update link to List groups API documentation

## 0.4.1

### Patch Changes

- d4c62b3: [OpenAPI] Spec updates for zoom-api-js

## 0.4.0

### Minor Changes

- 547d18b: Add new endpoint to list SIP phones on an account

### Patch Changes

- fb17c28: Fix a typo in the example for telephony report
- c09c7b9: Change meeting API response to include fields for who will receive meeting summary and who can ask questions about meeting transcript

## 0.3.2

### Patch Changes

- a0a2535: Add prerequisites for various endpoints

## 0.3.1

### Patch Changes

- 552b3b0: [OpenAPI] Spec updates for zoom-api-js

## 0.3.0

### Minor Changes

- 4ce9f11: Add new endpoint to assign a device to a new group

## 0.2.0

### Minor Changes

- 35374e2: Update bundle mechanism

## 0.1.3

### Patch Changes

- c62c402: Update spec

## 0.1.2

### Patch Changes

- 9e0fcd1: Update OAuth refresh token logic

## 0.1.1

### Patch Changes

- 9349c03: Add a way to refresh token

## 0.1.0

### Minor Changes

- bc329fc: Initial release
