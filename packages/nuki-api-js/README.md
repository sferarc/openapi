# nuki-api-js

Auto-generated, fully typed client for the [Nuki Web API](https://api.nuki.io/).

## Features

- **Fully typed** - every operation, parameter and response is generated from the official OpenAPI spec
- **Tree-shakable** - only the operations you import end up in your bundle
- **Runtime agnostic** - uses the global `fetch`, or bring your own implementation
- **Effect support** - optional [Effect](https://effect.website) bindings via `nuki-api-js/effect`

## Installation

```bash
npm install nuki-api-js
```

## Quick Start

```ts
import { NukiApi } from "nuki-api-js";

const client = new NukiApi({ token: process.env.NUKI_TOKEN ?? null });

const accounts = await client.api.account.getAccountsResource({});
```

Operations are grouped by tag: `client.api.<tag>.<operation>(params)`.

Every operation can also be called by method and path:

```ts
const accounts = await client.request("GET /account");
```

### Custom fetch

```ts
const client = new NukiApi({
  token: process.env.NUKI_TOKEN ?? null,
  fetch: myFetchImplementation,
});
```

## Errors

A call that gets an HTTP error response rejects with `{ status, payload }`: `status` is the HTTP status code and `payload` is the parsed JSON error body, or the raw body text, up to 1000 characters, when it is not JSON. A request that gets no response at all, for example because the network failed, rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with the `AbortError` itself.

## Effect

The `effect` entrypoint exposes every operation as an `Effect`. It requires `effect` 4 as a peer dependency.

```ts
import { Effect } from "effect";
import { ApiService, makeApiLayer } from "nuki-api-js/effect";

const program = ApiService.account.getAccountsResource();

await Effect.runPromise(
  program.pipe(Effect.provide(makeApiLayer({ token: process.env.NUKI_TOKEN })))
);
```

Errors are typed as `ApiError`, `NetworkError` and `ValidationError`. An HTTP error response fails with `ApiError`, which carries the HTTP `status`; a request that never gets a response fails with `NetworkError`.

## Entrypoints

| Import | Contents |
| --- | --- |
| `nuki-api-js` | client class, operations, schemas and types |
| `nuki-api-js/components` | operations grouped by tag and by path |
| `nuki-api-js/schemas` | Zod schemas for every operation |
| `nuki-api-js/types` | TypeScript types for every operation |
| `nuki-api-js/effect` | Effect bindings |

## License

ISC
