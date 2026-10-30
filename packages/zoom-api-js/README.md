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
const files = await client.request("GET /archive_files", {});
```

Path parameters are percent-encoded. A meeting or webinar UUID that begins with `/` or contains `//` is encoded twice, as Zoom requires, so pass the UUID as Zoom returns it.

### Custom fetch

```ts
const client = new ZoomApi({
  token: process.env.ZOOM_TOKEN ?? null,
  fetch: myFetchImplementation,
});
```

## Errors

A call that gets an HTTP error response rejects with `{ status, payload }`: `status` is the HTTP status code and `payload` is the parsed JSON error body, or the raw body text, up to 1000 characters, when it is not JSON. A request that gets no response at all, for example because the network failed, rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with the `AbortError` itself.

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

Errors are typed as `ApiError`, `NetworkError` and `ValidationError`. An HTTP error response fails with `ApiError`, which carries the HTTP `status`; a request that never gets a response fails with `NetworkError`.

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
