# v0-api

## 1.0.16

### Patch Changes

- ebb720d: An operation with a required query parameter now requires `queryParams` and the required fields in it, so leaving one out fails to compile instead of getting a 400 from the API. They used to be typed `Partial`, so `client.request("GET /deployments")` in `v0-api` compiled without the `chatId` and `versionId` the spec requires. Operations whose query parameters are all optional are unchanged.

## 1.0.15

### Patch Changes

- bc0c0ab: Type the arrays the spec leaves without an item schema as `unknown[]` instead of `string[]`, and let their zod schemas accept any item. A Vercel feature flag variant whose `value` is a JSON array of numbers or objects failed `createFlagBodySchema` and the flag response schemas, and the `gitSources` and `deploymentSources` of a user event, the billing `add` and `edit` adjustments and the AST nodes of v0's `experimental_content` were typed as strings they are not.

## 1.0.14

### Patch Changes

- 6f6655c: Accept any RFC 3339 offset in the Zod schemas of `date-time` fields. They used `z.iso.datetime()`, which only accepts a `Z` suffix, so a valid value such as `2026-10-30T12:00:00+00:00` or `2026-10-30T14:00:00+02:00` failed to parse; they now use `z.iso.datetime({ offset: true })`. The TypeScript types are unchanged.
- d4e35ae: Let `request()` omit its params argument when the operation requires none of its fields, as `client.api` already does. Before, `client.request("GET /path")` failed to compile and callers had to pass `{}`.

## 1.0.13

### Patch Changes

- 4043560: Reject a call cancelled through `signal` with what the signal was aborted with. A call given `AbortSignal.timeout()` now rejects with its `TimeoutError`, and one aborted with `controller.abort(reason)` with `reason`, where both were wrapped in an `Error` reading `GET /path failed: ...`; only an `AbortError` passed through before.

## 1.0.12

### Patch Changes

- 9164550: Accept `signal` in the per-call `config` of `request()` and `client.api` operations, so a call can be cancelled with an `AbortSignal`. The fetcher already passed it to `fetch`, but `FetcherConfig` had no `signal` field, so `{ config: { signal } }` failed to compile.

## 1.0.11

### Patch Changes

- 0e8ba15: Drop trailing slashes from a configured base URL (or Netlify `basePath`) so a value such as `http://localhost:4000/` no longer sends requests to `//path`.

## 1.0.10

### Patch Changes

- 7da7d51: Changed ChatsResumeStatus200 response type from unknown to string.
- 7da7d51: Changed ChatsDownloadVersionStatus200 response type from unknown to Blob.

## 1.0.9

### Patch Changes

- 268b33e: Let `ApiService` and `effectByPath` operations that require no params be called without an argument, as `client.api` operations can. They required one, so `ApiService.<tag>.<operation>()` failed to compile and needed `({})`.

## 1.0.8

### Patch Changes

- f1610e4: Type the responses the API sends as something other than `application/json` instead of `unknown`: a download the client resolves as a `Blob` (a zip, PDF, image or `application/octet-stream`) is typed `Blob`, a text body such as `text/plain` or a PEM file is typed `string`, as is any other non-JSON body the client returns as text whatever its schema (Cloudflare's `multipart/form-data` snippet content), and an `application/scim+json` body gets its schema. For example `chatsDownloadVersion` in `v0-api`, `readSessionFile` in `vercel-api-js` and Cloudflare's PDF, screenshot and KV value downloads.

## 1.0.7

### Patch Changes

- 0f6b5ec: Send requests to `https://api.v0.dev/v1` when no `baseUrl` is configured. Since the move to kubb the generated operations carry only the path and the fetcher defaulted to an empty base URL, so `new V0Api({ token }).api.chats.chatsFind()` fetched the relative URL `/chats`, which Node's `fetch` rejects as an invalid URL and a browser sends to the page's own origin. The Effect bindings had the same problem unless the layer set `baseUrl`.

## 1.0.6

### Patch Changes

- 3095560: Type the params of `request()`, `client.api` operations and the Effect `ApiService` and `effectByPath` from the operation. They were typed as `{}`, so a missing path parameter, a wrong body or an unknown key compiled and failed only at runtime.

## 1.0.5

### Patch Changes

- 3b61252: Keep the `config` passed to `request()` and `client.api` operations, such as extra `headers`, instead of replacing it with the client's own.

## 1.0.4

### Patch Changes

- f554012: Improved import organization in generated component types for maintainability and clarity.

## 1.0.3

### Patch Changes

- 1455ffd: Send an object query parameter as `deepObject` keys (`metadata[env]=prod`) instead of `metadata=[object Object]`, so the `metadata` filter on `chatsFind` reaches the API.

## 1.0.2

### Patch Changes

- 3babd7e: Type an operation's path, query and header parameters with the generated `<Operation>Path`, `<Operation>Query` and `<Operation>Headers` types instead of an inline object. A parameter whose schema is a `$ref`, a `oneOf`/`anyOf` union or an object used to be typed `unknown`, which accepted any value: Cloudflare's `accountId` path parameter and `per_page` query parameter, LiteLLM's nullable filters such as `team_id` and `start_date`, Vercel's `domain`, v0's `metadata` filter on `chatsFind` and Zoom's `meetingId`. Query and header parameters stay optional.

## 1.0.1

### Patch Changes

- 6276ad0: Added new optional fields to ChatsSendMessageBody type.
- 6276ad0: Added new optional fields to ChatsFindQuery type.
- 6276ad0: Added new optional fields to ChatsResolveTaskBody type.
- 6276ad0: Added new optional fields to ChatsCreateBody type.

## 1.0.0

### Major Changes

- 619b8c7: Move the `effect` entrypoint to Effect 4. The peer dependency is now `effect@^4.0.0`, and `ApiConfig` is a `Context.Service` key instead of a `Context.Tag`, so projects still on Effect 3 should stay on the previous major. The rest of the client is unchanged.
- 49d548e: Breaking: a failed HTTP response now rejects with `{ status, payload }`, where `status` is the HTTP status code and `payload` is the parsed error body (or a description string when the body is not JSON). It used to reject with `{ name: "unknown", message }`, losing both. Code that reads `error.message` from a rejected call should read `error.status` and `error.payload` instead. Requests that never get a response still reject with `{ name: "unknown", message }`. In the Effect bindings, HTTP errors now fail with `ApiError` carrying the status instead of `NetworkError`.
- 0b8c00e: Breaking: JSON request bodies are typed from the spec and sent as JSON with `Content-Type: application/json`. The generator used to rename every key in the spec to camelCase, which turned `application/json` into `applicationJson` and `$ref` into `ref`: 22 operations, `chatsCreate` among them, typed their body as raw bytes or a string and sent it with `Content-Type: applicationJson`, so a body passed as an object was never serialized. Types now use the API's own property names, such as `experimental_content`, and schemas behind a `$ref` are typed instead of loose.

### Minor Changes

- f8bfc5f: Added request body types and enums for deployments creation.
- f8bfc5f: Added request body types and enums for integrations Vercel projects creation.
- f8bfc5f: Added request body types and enums for chat creation, initialization, update, favorite, fork, sendMessage, version update, delete version files, resume, stop, resolveTask, and their corresponding parameters.
- 532c19e: [BREAKING] Removed model configuration model ID enums and their keys from ChatDetail, ChatsCreateRequest, ChatsSendMessageRequest, and ChatsResolveTaskRequest types.
- f8bfc5f: Added request body types and enums for MCP servers creation and update, as well as for creating OAuth authorization URLs.
- f8bfc5f: Added request body types and enums for project creation, update, assign, createEnvVars, updateEnvVars, and deleteEnvVars operations.
- f8bfc5f: Added request body types and enums for hooks creation and hooks update.
- f8bfc5f: Added response union types and response key types for chat message finding, resuming, stopping, and task resolving endpoints.

### Patch Changes

- 76653f2: Return `undefined` from `client.api` for `Object.prototype` names such as `constructor` or `toString`, instead of a namespace or an operation wrapper that calls the inherited method.
- dc5ea2c: Resolve a binary response, such as a zip, an octet-stream, a PDF or an image, as a `Blob` instead of a string decoded as UTF-8, which corrupted the bytes of downloads like `chatsDownloadVersion` in `v0-api`, `downloadArtifact` in `vercel-api-js` and Workers KV values in `cloudflare-api-js`. A custom `fetchImpl` whose response has no `blob()` still gets the text.
- 20d1462: Bundle the shared runtime helpers instead of depending on `@sferadev/openapi-utils`, which is private and was never published, so installing the package from npm failed with a 404.
- 9fca3e9: Export the `FetchImpl` and `FetcherConfig` types from the package root. The bundled declarations referenced them from a private chunk, so a consumer emitting declarations for code that inferred one of the client's types failed with "cannot be named without a reference to ... This is likely not portable".
- 6f3d266: Abort the HTTP request when an operation from the `effect` entry is interrupted, for example by `Effect.timeout` or `Fiber.interrupt`. The request used to keep running after the effect gave up on it. `makeApiLayer` now also accepts `fetchImpl`, and `ApiService` and `effectByPath` return `undefined` for `Object.prototype` keys such as `constructor` instead of a broken operation.
- 443e396: Show the API's own error message in the `effect` entry's errors. `ApiError.message` read only a top-level `message` on the rejection, which HTTP errors never have, so every failure read `API Error: <status>`. It now reads `API error <status>: <message>`, taking the message from the error body's `message`, `error`, `error.message` or `errors[0].message`, or the body itself when it is text, and keeps the old text when none is found. `NetworkError.message` also reads `message` from a cause that is not an `Error`. `status`, `error` and `cause` are unchanged.
- c80f59d: Resolve a 204 or an empty successful body to `undefined` instead of rejecting with a network error, and let a header such as `authorization` or `content-type` replace the default regardless of case instead of being sent alongside it
- 21eaaa2: Reject a failed request with a real `Error` that names the method and path, gives the reason and keeps the original exception as `cause`, instead of a plain object with no stack, and keep the raw body text (up to 1000 characters) as the payload when an error response is not JSON, instead of the JSON parser's message. An aborted request rejects with the `AbortError` itself, so callers can tell it from a network failure.
- 1fc5b21: Omit undefined query parameters and send arrays as repeated keys
- 861d6c9: Inline the Effect helper types into `effect.d.mts` instead of importing them from `@sferadev/openapi-utils/effect`, which is not published, so TypeScript resolves `ApiConfig`, `ApiError`, `makeApiLayer` and the `ApiService` shape for consumers instead of failing with a missing module.
- a761355: Percent-encode path parameters in generated operations, so a value containing `/`, `?`, `#` or `..` can no longer change which endpoint is called. Required path parameters now accept falsy values such as `0`, and multipart bodies send number and boolean fields as strings instead of dropping them. Regenerated from the current upstream spec.
- 613be44: `request()` now calls the generated operation instead of the raw fetcher, so path parameters are substituted, validated and percent-encoded the same way as through `api`. An unknown endpoint throws.

## 0.3.1

### Patch Changes

- 2772ca5: Use zod's strictObject in all schemas to enforce strict object validation.

## 0.3.0

### Minor Changes

- 5223c4e: Migrated code generation to kubb v5.
  
  The generated client functions are unchanged — same names, same signatures, same behaviour — so
  calling code needs no updates. Auxiliary type exports were restructured by kubb v5: `*RequestConfig`
  is now `*Options`, and per-parameter types are now grouped (`FooPathBarId` → `FooPath`,
  `FooQueryLimit` → `FooQuery`). Only code importing those helper types directly is affected.

## 0.2.1

### Patch Changes

- 724e03b: Added optional thinkingEffort field to chatDetailSchema and ChatDetail type.
- 724e03b: Added optional fast field to chatDetailSchema and ChatDetail type.

## 0.2.0

### Minor Changes

- b6dbfa9: Add support for filtering chats by metadata key-value pairs in chatsFind API endpoint.

### Patch Changes

- b6dbfa9: Add metadata field to ChatDetail, ChatSummary, and ProjectDetail types and schemas.

## 0.1.4

### Patch Changes

- fb6be6d: Updated the description for the Fork Chat endpoint to clarify usage based on chat version and API.

## 0.1.3

### Patch Changes

- a41e2d8: Updated the description of the Delete Chat endpoint to clarify that chats are moved to trash for 30 days before permanent removal.
- 1cf6572: Add deprecation notice for `v0-auto` in model description, specifying fallback to `v0-pro`.

## 0.1.2

### Patch Changes

- 89915c1: Added 'v0Availability' field to product detail, list, and summary schemas to indicate product availability status.
- 89915c1: Added supporting enums for product 'v0Availability' values in the API types and exports.

## 0.1.1

### Patch Changes

- de0bcad: Expanded and clarified description for the 'limit' query parameter in reportsGetUsage.
- de0bcad: Added more detailed description to 'startDate' and 'endDate' in reportsGetUserActivity query parameters.

## 0.1.0

### Minor Changes

- e5834f1: Added new /mcp-servers/{mcpServerId}/oauth/authorize endpoint to create an OAuth authorization URL for MCP servers.
- 7df1e11: Refactor API response and error types for strict enums and schema typing.
- fc77930: Add optional vercelProjectId field to chatDetail, chatSummary, and projectDetail schemas and types.
- e5834f1: Added new /chats/{chatId}/tasks/resolve endpoint to resolve pending tasks in a chat.
- a83f157: Added a metadata field to the chat detail schema, allowing arbitrary key-value data to be associated with a chat.
- e5834f1: Added support for model IDs v0-opus-4.7 and v0-opus-4.7-fast in chat model configuration.
- e5834f1: Added new /chats/{chatId}/versions/{versionId}/restore endpoint to restore a chat block to a specific version.
- 0d767c3: Added the chatsStop endpoint to stop in-flight message generation in a chat.
- 977c417: Added filtering by Vercel project ID and Git branch to the chats list endpoint.
- 80a51db: Add API endpoint to delete source files from a specific chat version via POST /chats/{chatId}/versions/{versionId}/files/delete.
- af02574: Added the GET /reports/user-activity endpoint to retrieve aggregated user activity data for Enterprise team members.
- 74ad091: Migrate OpenAPI clients to SferaDev monorepo with improved build configuration, updated dependencies, and enhanced TypeScript support.
- 27942ed: Added 'design-mode' as a new enum value to message type schemas and types.
- 39a0e91: Added MCP Servers API endpoints for listing, creating, retrieving, updating, and deleting MCP server configurations.
- 173d136: Added the GET /reports/usage/ai endpoint for retrieving v0 AI usage events for the authenticated user or active team.

### Patch Changes

- c003f79: Added 'v0-auto' as a valid modelId value in schemas and types.
- 39a0e91: Added schema and types for the new MCP Servers API operations.
- e5834f1: Made projectId field optional in DeploymentDetail, DeploymentSummary, and deploymentsFind query parameters.
- 2e5e8b3: Added 'manual-commit' as a new message/event type to schemas and types enums.
- 7df1e11: Switch to stricter and more descriptive Zod schemas for all API objects and enums.
- 7df1e11: Replace deprecated export type names and redundant JSDoc comments in generated types.
- 7df1e11: Update API function signatures to accept destructured arguments and add stricter type checking.
- 4bd6171: Updated the description for the chatsResume endpoint to clarify it reconnects to an active assistant message stream and does not continue stopped generation.
- e5834f1: Updated description for modelId in chat model configuration to clarify its usage.

## 0.0.4

### Patch Changes

- 0477f31: Update constructor

## 0.0.3

### Patch Changes

- ee3042e: Fix baseUrl and updates

## 0.0.2

### Patch Changes

- d0d14c3: Initial release
