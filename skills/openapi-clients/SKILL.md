---
name: openapi-clients
description: Use when calling the Vercel, Cloudflare, Netlify, Keycloak, Zoom, Nuki, LiteLLM or v0 REST API from TypeScript with the unofficial generated clients from sferarc/openapi (vercel-api-js, cloudflare-api-js, netlify-api, keycloak-api, zoom-api-js, nuki-api-js, litellm-api, v0-api). Covers picking the package, auth, finding an operation, errors, streaming and the Effect bindings.
---

# Calling the sferarc/openapi clients

Each package is generated from the vendor's published OpenAPI spec and regenerated when the spec changes. They are unofficial: not made or endorsed by the vendor. They call the global `fetch`, so they run wherever `fetch` does, and are tree-shakable.

## Pick the client

| API | Package | Class | Required options | Constructor `baseUrl` | Env var in the READMEs | Effect |
| --- | --- | --- | --- | --- | --- | --- |
| Vercel | `vercel-api-js` | `VercelApi` | `token` (string or function) | optional | `VERCEL_TOKEN` | yes |
| Cloudflare | `cloudflare-api-js` | `CloudflareApi` | `token` (string or function), or `apiKey` plus `email` | optional | `CLOUDFLARE_TOKEN` | yes |
| Netlify | `netlify-api` | `NetlifyApi` | `token` (string or function) | none | `NETLIFY_TOKEN` | yes |
| Keycloak | `keycloak-api` | `KeycloakAdminApi`, `KeycloakAccountApi` | `token` (string or function), `baseUrl`, and `realm` for `KeycloakAccountApi` | required | `KEYCLOAK_TOKEN` | yes |
| Zoom | `zoom-api-js` | `ZoomApi` | `token` (string or function) | optional | `ZOOM_TOKEN` | yes |
| Nuki | `nuki-api-js` | `NukiApi` | `token` (string or function) | optional | `NUKI_TOKEN` | yes |
| LiteLLM | `litellm-api` | `LiteLLMApi` | `token`, `baseUrl` | required | `LITELLM_MASTER_KEY` | yes |
| v0 | `v0-api` | `V0Api` | `token` | optional | `V0_API_KEY` | yes |

Install only the one you need, for example `npm install vercel-api-js`. Read the token from the environment; never hard code it. Cloudflare's Global API Key goes in `apiKey` with the account's `email`, and only some operations need it. OAuth and other short-lived tokens expire, so in the Vercel, Cloudflare, Netlify, Keycloak, Zoom and Nuki constructors pass `token` a function (sync or async) that returns a fresh one; it runs before every request, so a refreshed token (such as one from Cloudflare's or Netlify's `auth.refreshToken`) reaches the same client without rebuilding it. LiteLLM and v0 take a string only. Keycloak and LiteLLM are self-hosted, so their constructors need the server's `baseUrl`. The other constructors default to the vendor's host and take a `baseUrl` only for a proxy, except Netlify's: its host is fixed, and its optional `basePath` (`/api/v1` by default) is only the path prefix. A Netlify host override goes in a call's `config: { baseUrl }` or in `makeApiLayer`. `KeycloakAccountApi` is scoped to the one `realm` it is built with.

## Find the operation

Every package ships `OPERATIONS.md`: one table per tag listing the `client.api` call, its `"<METHOD> <path>"` request and the spec's summary. Search it instead of reading the generated types:

```bash
grep -i "deployment" node_modules/vercel-api-js/src/generated/OPERATIONS.md
```

Keycloak has two: `node_modules/keycloak-api/src/admin/generated/OPERATIONS.md` and `.../src/account/generated/OPERATIONS.md`. The package READMEs document client options and quirks per vendor.

## Call it

Two ways to call the same operation, both fully typed:

```ts
import { VercelApi } from "vercel-api-js";

const client = new VercelApi({ token: process.env.VERCEL_TOKEN ?? null });

// By tag and operation name, as OPERATIONS.md lists it.
const projects = await client.api.projects.getProjects({ queryParams: { limit: "10" } });

// By method and path, the way the vendor's docs name the endpoint.
const project = await client.request("GET /v9/projects/{idOrName}", {
  pathParams: { idOrName: "my-project" },
});
```

- Params are one object with `pathParams`, `queryParams`, `body` and `headers` as the operation declares them, plus `config`. An operation with no required params can be called with no argument.
- Untagged operations live under `client.api.default`. `keycloak-api` has only `request()`.
- `config` changes one call: `headers`, `signal` (cancel, `AbortSignal.timeout()`), `baseUrl`, `token`, and `onResponse`, which gets the status and headers before the body is read. A call resolves to the parsed body only, so `onResponse` is how to read a header such as `Location` or `Retry-After`.
- Pass `fetch` to the constructor to use another fetch implementation, such as a mock in tests.

## Handle errors

An HTTP error response rejects with `ApiResponseError`, exported from every package. It has `status`, `payload` (the parsed JSON error body, or up to 1000 characters of raw text), `method` and `path`. A request that never got a response rejects with a plain `Error` whose `cause` is the original exception. A cancelled request rejects with the signal's reason as is.

```ts
import { ApiResponseError, VercelApi } from "vercel-api-js";

const client = new VercelApi({ token: process.env.VERCEL_TOKEN ?? null });

try {
  await client.request("GET /v13/deployments/{idOrUrl}", {
    pathParams: { idOrUrl: "dpl_missing" },
  });
} catch (error) {
  if (error instanceof ApiResponseError && error.status === 404) {
    console.log(`${error.method} ${error.path} not found`, error.payload);
  } else {
    throw error;
  }
}
```

## Stream responses

Line-delimited JSON (`application/x-ndjson` and similar) resolves to an array once the body ends. In `vercel-api-js`, `cloudflare-api-js` and `litellm-api`, pass `jsonLines: "stream"` to read each line as it arrives:

```ts
import { isJsonLineStream, VercelApi } from "vercel-api-js";

const client = new VercelApi({ token: process.env.VERCEL_TOKEN ?? null });

const logs = await client.api.logs.getRuntimeLogs({
  pathParams: { projectId: "prj_123", deploymentId: "dpl_123" },
  config: { jsonLines: "stream" },
});
if (isJsonLineStream(logs)) {
  for await (const line of logs) console.log(line);
}
```

Server-Sent Events in `v0-api` (`chatsResume`, and `chatsCreate`, `chatsSendMessage` or `chatsResolveTask` with `responseMode: "experimental_stream"`) resolve to the raw text unless `config` sets `eventStream: "stream"`:

```ts
import { isEventStream, V0Api } from "v0-api";

const client = new V0Api({ token: process.env.V0_API_KEY ?? null });

const events = await client.api.chats.chatsResume({
  pathParams: { chatId: "chat_123", messageId: "msg_123" },
  config: { eventStream: "stream" },
});
if (isEventStream(events)) {
  for await (const { event, data } of events) console.log(event, data);
}
```

Breaking out of either loop cancels the response body.

## Effect

Clients marked "yes" above have a `<package>/effect` entry point that exposes every operation as an `Effect` (needs `effect` 4 as a peer dependency). Auth goes in a layer, and failures are typed as `ApiError` (with `status`), `NetworkError` and `ValidationError`:

```ts
import { Effect } from "effect";
import { ApiService, makeApiLayer } from "vercel-api-js/effect";

const program = ApiService.projects.getProjects({ queryParams: { limit: "10" } }).pipe(
  Effect.catchTag("ApiError", (error) =>
    Effect.succeed({ projects: [], failedWith: error.status }),
  ),
);

await Effect.runPromise(
  program.pipe(Effect.provide(makeApiLayer({ token: process.env.VERCEL_TOKEN }))),
);
```

`keycloak-api/effect` names its exports `AdminApiService` and `adminEffectByPath` for the Admin API and `AccountApiService` and `accountEffectByPath` for the Account API; the layer needs the server `baseUrl`, and account effects also need `Effect.provide(makeAccountLayer(realm))`.

Cancel through Effect (`Effect.timeout`, interruption) rather than a `signal`.

## Gotchas

- Operation names come from the spec's operation IDs, cleaned up by the generator. Copy them from `OPERATIONS.md` rather than guessing.
- Query values are typed as the spec declares them, so a numeric looking parameter can be a string (`limit: "10"` in Vercel).
- Problems with a client go to https://github.com/sferarc/openapi/issues, not to the vendor.
