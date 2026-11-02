# zoom-api-js

Auto-generated, fully typed client for the [Zoom API](https://developers.zoom.us/docs/api/).

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

Every operation can also be called by method and path:

```ts
const files = await client.request("GET /archive_files");
```

Path parameters are percent-encoded. A meeting or webinar UUID that begins with `/` or contains `//` is encoded twice, as Zoom requires, so pass the UUID as Zoom returns it.

### Custom fetch

```ts
const client = new ZoomApi({
  token: process.env.ZOOM_TOKEN ?? null,
  fetch: myFetchImplementation,
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

A call that gets an HTTP error response rejects with `{ status, payload }`: `status` is the HTTP status code and `payload` is the parsed JSON error body, or the raw body text, up to 1000 characters, when it is not JSON. A request that gets no response at all, for example because the network failed, rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with what the signal was aborted with, as is: the `AbortError`, or the `TimeoutError` of `AbortSignal.timeout()`.

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
