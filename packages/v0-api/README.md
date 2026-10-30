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

## Errors

A call that gets an HTTP error response rejects with `{ status, payload }`: `status` is the HTTP status code and `payload` is the parsed JSON error body, or the raw body text, up to 1000 characters, when it is not JSON. A request that gets no response at all, for example because the network failed, rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with the `AbortError` itself.

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
