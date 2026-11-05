# zoom-api-js

Unofficial. Not made or endorsed by Zoom.

Auto-generated, fully typed client for the [Zoom API](https://developers.zoom.us/docs/api/).

Generated from the OpenAPI spec at <https://developers.zoom.us/api/zoap/meetings/methods/>; before generating, [`kubb.config.ts`](https://github.com/sferarc/openapi/blob/main/packages/zoom-api-js/kubb.config.ts) renames operation IDs.

## Features

- **Fully typed** - every operation, parameter and response is generated from the official OpenAPI spec
- **Tree-shakable** - only the operations you import end up in your bundle
- **Runtime agnostic** - uses the global `fetch`, or bring your own implementation
- **Effect support** - optional [Effect](https://effect.website) bindings via `zoom-api-js/effect`

## Installation

```bash
npm install zoom-api-js
```

## Quick Start

```ts
import { ZoomApi } from "zoom-api-js";

const client = new ZoomApi({ token: process.env.ZOOM_TOKEN ?? null });

const files = await client.api.archiving.listArchivedFiles({});
```

Operations are grouped by tag: `client.api.<tag>.<operation>(params)`.

[`OPERATIONS.md`](./src/generated/OPERATIONS.md) lists every operation with its `client.api` call, its `"<METHOD> <path>"` request and the spec's summary, one table per tag. It ships in the package, so `grep` in `node_modules/zoom-api-js` finds an operation without reading the types.

Every operation can also be called by method and path:

```ts
const files = await client.request("GET /archive_files");
```

Path parameters are percent-encoded. A meeting or webinar UUID that begins with `/` or contains `//` is encoded twice, as Zoom requires, so pass the UUID as Zoom returns it.

### Refreshing the token

Zoom OAuth access tokens expire after an hour. Pass a function as `token`, sync or async, and the client calls it before every request, so each call sends the token it returns; `auth.refreshToken` gets a new one:

```ts
const { auth } = new ZoomApi({ token: null });
let session = { accessToken: "", refreshToken: process.env.ZOOM_REFRESH_TOKEN ?? "", expiresAt: 0 };

const client = new ZoomApi({
  token: async () => {
    if (Date.now() >= session.expiresAt) {
      const result = await auth.refreshToken({
        refreshToken: session.refreshToken,
        clientId: process.env.ZOOM_CLIENT_ID ?? "",
        clientSecret: process.env.ZOOM_CLIENT_SECRET ?? "",
      });
      session = {
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
        expiresAt: Date.now() + (result.expires_in - 60) * 1000,
      };
    }
    return session.accessToken;
  },
});
```

A call rejects with what the function threw, before any request is sent. A call's own `config.token` still wins.

### Custom fetch

```ts
const client = new ZoomApi({
  token: process.env.ZOOM_TOKEN ?? null,
  fetch: myFetchImplementation,
});
```

### Base URL

Calls go to `https://api.zoom.us/v2` unless the client takes a `baseUrl`, for example `https://api.zoomgov.com/v2` for a Zoom for Government account; a single call can pass its own as `config: { baseUrl }`.

```ts
const client = new ZoomApi({
  token: process.env.ZOOM_TOKEN ?? null,
  baseUrl: "https://api.zoomgov.com/v2",
});
```

### Response headers

A call resolves to the parsed body only. To read a response header, pass `onResponse` in `config`; it gets the status and headers of the response before the body is read, an error response included. Zoom's [rate limits](https://developers.zoom.us/docs/api/rate-limits/) page says a `429` for a reached daily limit tells you in the response headers when you may call again:

```ts
import type { ResponseInfo } from "zoom-api-js";

const responses: ResponseInfo[] = [];
await client.api.archiving
  .listArchivedFiles({ config: { onResponse: (response) => responses.push(response) } })
  .catch((error) => {
    if (error.status === 429) console.log(responses[0]?.headers.get("Retry-After"));
    throw error;
  });
```

An error thrown inside `onResponse` rejects the call with an `Error` whose message starts with `onResponse threw on` and whose `cause` is what was thrown.

## Errors

A call that gets an HTTP error response rejects with an `ApiResponseError`, exported from the package, which extends `Error`: `status` is the HTTP status code, `payload` is the parsed JSON error body, or the raw body text, up to 1000 characters, when it is not JSON, and `method` and `path` name the request, without its query string. Its message reads `<METHOD> <path> returned <status>: <detail>`, where the detail is the API's own error message or else the first 200 characters of the body. A request that gets no response at all, for example because the network failed, rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with what the signal was aborted with, as is: the `AbortError`, or the `TimeoutError` of `AbortSignal.timeout()`.

## Effect

The `effect` entrypoint exposes every operation as an `Effect`. It requires `effect` 4 as a peer dependency.

```ts
import { Effect } from "effect";
import { ApiService, makeApiLayer } from "zoom-api-js/effect";

const program = ApiService.archiving.listArchivedFiles();

await Effect.runPromise(
  program.pipe(Effect.provide(makeApiLayer({ token: process.env.ZOOM_TOKEN })))
);
```

`token` can also be a function, sync or async, which each call asks for the current token before its request, so the layer does not need rebuilding when the hourly token is refreshed; what it throws fails the effect as a failed request would.

`makeApiLayer` also takes a `baseUrl`, for example `https://api.zoomgov.com/v2` for a Zoom for Government account; a single call can pass it as `config: { baseUrl }`.

Errors are typed as `ApiError`, `NetworkError` and `ValidationError`. An HTTP error response fails with `ApiError`, which carries the HTTP `status`; a request that never gets a response fails with `NetworkError`.

A call can pass its own `config`, which layers over the layer's: its `headers` join the layer's, and its other fields, such as `onResponse` for the rate limit headers, replace them. An `onResponse` that throws makes the effect die with the `onResponse threw on` error as a defect rather than fail with `NetworkError`.

## Entrypoints

| Import | Contents |
| --- | --- |
| `zoom-api-js` | client class, operations, schemas and types |
| `zoom-api-js/components` | operations grouped by tag and by path |
| `zoom-api-js/schemas` | Zod schemas for every operation |
| `zoom-api-js/types` | TypeScript types for every operation |
| `zoom-api-js/effect` | Effect bindings |

## License

ISC
