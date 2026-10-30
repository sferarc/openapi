# vercel-api-js

Auto-generated, fully typed client for the [Vercel REST API](https://vercel.com/docs/rest-api).

## Features

- **Fully typed** - every operation, parameter and response is generated from the official OpenAPI spec
- **Tree-shakable** - only the operations you import end up in your bundle
- **Runtime agnostic** - uses the global `fetch`, or bring your own implementation
- **Effect support** - optional [Effect](https://effect.website) bindings via `vercel-api-js/effect`

## Installation

```bash
npm install vercel-api-js
```

## Quick Start

```ts
import { VercelApi } from "vercel-api-js";

const client = new VercelApi({ token: process.env.VERCEL_TOKEN ?? null });

const accessGroups = await client.api.accessGroups.listAccessGroups({});
```

Operations are grouped by tag: `client.api.<tag>.<operation>(params)`. Operations without a tag live under `client.api.default`, and under `ApiService.default` in the Effect bindings.

Every operation can also be called by method and path:

```ts
const accessGroups = await client.request("GET /v1/access-groups", {});
```

### Custom fetch

```ts
const client = new VercelApi({
  token: process.env.VERCEL_TOKEN ?? null,
  fetch: myFetchImplementation,
});
```

## Errors

A call that gets an HTTP error response rejects with `{ status, payload }`: `status` is the HTTP status code and `payload` is the parsed JSON error body, or the raw body text, up to 1000 characters, when it is not JSON. A request that gets no response at all, for example because the network failed, rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with what the signal was aborted with, as is: the `AbortError`, or the `TimeoutError` of `AbortSignal.timeout()`.

## Effect

The `effect` entrypoint exposes every operation as an `Effect`. It requires `effect` 4 as a peer dependency.

```ts
import { Effect } from "effect";
import { ApiService, makeApiLayer } from "vercel-api-js/effect";

const program = ApiService.accessGroups.listAccessGroups();

await Effect.runPromise(
  program.pipe(Effect.provide(makeApiLayer({ token: process.env.VERCEL_TOKEN })))
);
```

Errors are typed as `ApiError`, `NetworkError` and `ValidationError`. An HTTP error response fails with `ApiError`, which carries the HTTP `status`; a request that never gets a response fails with `NetworkError`.

## Entrypoints

| Import | Contents |
| --- | --- |
| `vercel-api-js` | client class, operations, schemas and types |
| `vercel-api-js/components` | operations grouped by tag and by path |
| `vercel-api-js/schemas` | Zod schemas for every operation |
| `vercel-api-js/types` | TypeScript types for every operation |
| `vercel-api-js/effect` | Effect bindings |

## License

ISC
