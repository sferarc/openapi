# v0-api

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

A call that gets an HTTP error response rejects with `{ status, payload }`: `status` is the HTTP status code and `payload` is the parsed JSON error body, or the raw body text, up to 1000 characters, when it is not JSON. A request that gets no response at all, for example because the network failed, rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with what the signal was aborted with, as is: the `AbortError`, or the `TimeoutError` of `AbortSignal.timeout()`.

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
