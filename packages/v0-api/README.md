# v0-api

Unofficial. Not made or endorsed by Vercel.

Auto-generated, fully typed client for the [Vercel v0 API](https://v0.dev/docs/api).

## Features

- **Fully typed** - every operation, parameter and response is generated from the official OpenAPI spec
- **Tree-shakable** - only the operations you import end up in your bundle
- **Runtime agnostic** - uses the global `fetch`, or bring your own implementation
- **Effect support** - optional [Effect](https://effect.website) bindings via `v0-api/effect`

## Installation

```bash
npm install v0-api
```

## Quick Start

```ts
import { V0Api } from "v0-api";

const client = new V0Api({ token: process.env.V0_API_KEY ?? null });

const chats = await client.api.chats.chatsFind();
```

Operations are grouped by tag: `client.api.<tag>.<operation>(params)`.

[`OPERATIONS.md`](./src/generated/OPERATIONS.md) lists every operation with its `client.api` call, its `"<METHOD> <path>"` request and the spec's summary, one table per tag. It ships in the package, so `grep` in `node_modules/v0-api` finds an operation without reading the types.

Every operation can also be called by method and path:

```ts
const chats = await client.request("GET /chats");
```

### Custom fetch

```ts
const client = new V0Api({
  token: process.env.V0_API_KEY ?? null,
  fetch: myFetchImplementation,
});
```

### Base URL

Calls go to `https://api.v0.dev/v1` unless the client takes a `baseUrl`, such as a proxy; a single call can pass its own as `config: { baseUrl }`.

### Server-Sent Events

`chatsResume` answers with Server-Sent Events (`text/event-stream`), and so do `chatsCreate`, `chatsSendMessage` and `chatsResolveTask` when the body sets `responseMode: "experimental_stream"`. By default such a call resolves to the raw text of the stream once it ends. To read each event as it arrives, pass `eventStream: "stream"` in `config` and iterate the result:

```ts
import { isEventStream } from "v0-api";

const events = await client.api.chats.chatsResume({
  pathParams: { chatId, messageId },
  config: { eventStream: "stream" },
});
if (isEventStream(events)) {
  for await (const { event, data } of events) console.log(event, data);
}
```

Each event has its `event` type (`message` unless the stream names one), its `data` lines joined by newlines, and the last `id` the stream sent. Leaving the loop early cancels the response body. A response of another type resolves as usual, and so does any response when a custom `fetch` returns no `body`.

### Response headers

A call resolves to the parsed body only. To read a response header, pass `onResponse` in `config`; it gets the status and headers of the response before the body is read, an error response included. Every operation in the v0 spec can answer `429 Too Many Requests`, and the spec names no response headers, so this is how you see what a rate limited response carries:

```ts
import type { ResponseInfo } from "v0-api";

const responses: ResponseInfo[] = [];
await client.api.chats
  .chatsFind({ config: { onResponse: (response) => responses.push(response) } })
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
import { ApiService, makeApiLayer } from "v0-api/effect";

const program = ApiService.chats.chatsFind();

await Effect.runPromise(
  program.pipe(Effect.provide(makeApiLayer({ token: process.env.V0_API_KEY })))
);
```

Errors are typed as `ApiError`, `NetworkError` and `ValidationError`. An HTTP error response fails with `ApiError`, which carries the HTTP `status`; a request that never gets a response fails with `NetworkError`.

A call can pass its own `config`, which layers over the layer's: its `headers` join the layer's, and its other fields, such as `onResponse` for the rate limit headers, replace them. An `onResponse` that throws makes the effect die with the `onResponse threw on` error as a defect rather than fail with `NetworkError`.

## Entrypoints

| Import | Contents |
| --- | --- |
| `v0-api` | client class, operations, schemas and types |
| `v0-api/components` | operations grouped by tag and by path |
| `v0-api/schemas` | Zod schemas for every operation |
| `v0-api/types` | TypeScript types for every operation |
| `v0-api/effect` | Effect bindings |

## License

ISC
