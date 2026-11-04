# netlify-api

Auto-generated, fully typed client for the [Netlify API](https://docs.netlify.com/api/get-started/).

## Features

- **Fully typed** - every operation, parameter and response is generated from the official OpenAPI spec
- **Tree-shakable** - only the operations you import end up in your bundle
- **Runtime agnostic** - uses the global `fetch`, or bring your own implementation
- **Effect support** - optional [Effect](https://effect.website) bindings via `netlify-api/effect`

## Installation

```bash
npm install netlify-api
```

## Quick Start

```ts
import { NetlifyApi } from "netlify-api";

const client = new NetlifyApi({ token: process.env.NETLIFY_TOKEN ?? "" });

const sites = await client.api.site.listSites({});
```

Operations are grouped by tag: `client.api.<tag>.<operation>(params)`.

[`OPERATIONS.md`](./src/generated/OPERATIONS.md) lists every operation with its `client.api` call, its `"<METHOD> <path>"` request and the spec's summary, one table per tag. It ships in the package, so `grep` in `node_modules/netlify-api` finds an operation without reading the types.

### Options

```ts
const client = new NetlifyApi({
  token: process.env.NETLIFY_TOKEN ?? "",
  basePath: "/api/v1", // optional, the default
  fetch: myFetchImplementation, // optional
});
```

`basePath` is the path prefix appended to `https://api.netlify.com`, not a full URL. The host is fixed and cannot be configured.

### Calling by method and path

`client.request()` addresses an operation by its HTTP method and path instead of its tag and name. Parameters and the result are typed the same way as through `client.api`.

```ts
const sites = await client.request("GET /sites", { queryParams: { per_page: 10 } });
```

An endpoint that is not in the spec throws.

### Refreshing an OAuth token

```ts
const { tokenType, accessToken, refreshToken, scope, createdAt } = await client.auth.refreshToken({
  refreshToken: storedRefreshToken,
  clientId: process.env.NETLIFY_CLIENT_ID ?? "",
  clientSecret: process.env.NETLIFY_CLIENT_SECRET ?? "",
  authToken: currentAccessToken, // optional, defaults to the client's token
});
```

This posts to `https://api.netlify.com/oauth/token` and returns the new token pair, with `createdAt` as a Unix timestamp.

### Response headers

A call resolves to the parsed body only. To read a response header, pass `onResponse` in `config`; it gets the status and headers of the response before the body is read, an error response included. Netlify pages its lists with `page` and `per_page` and links the next page in the `Link` header:

```ts
import type { ResponseInfo } from "netlify-api";

const responses: ResponseInfo[] = [];
const sites = await client.api.site.listSites({
  queryParams: { per_page: 100 },
  config: { onResponse: (response) => responses.push(response) },
});
const hasNextPage = responses[0]?.headers.get("Link")?.includes('rel="next"') ?? false;
```

An error thrown inside `onResponse` rejects the call with an `Error` whose message starts with `onResponse threw on` and whose `cause` is what was thrown.

### Errors

A request that gets an HTTP error response rejects with `{ status, payload }`: `status` is the HTTP status code and `payload` is the parsed error body, or the raw body text, up to 1000 characters, when it is not JSON. A request that never gets a response rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with what the signal was aborted with, as is: the `AbortError`, or the `TimeoutError` of `AbortSignal.timeout()`.

```ts
try {
  await client.api.site.getSite({ pathParams: { site_id: "missing" } });
} catch (error) {
  if (typeof error === "object" && error !== null && "status" in error && "payload" in error) {
    console.error(error.status, error.payload);
  }
}
```

## Effect

The `effect` entrypoint exposes every operation as an `Effect`. It requires `effect` 4 as a peer dependency.

```ts
import { Effect } from "effect";
import { ApiService, makeApiLayer } from "netlify-api/effect";

const program = ApiService.site.listSites();

await Effect.runPromise(
  program.pipe(Effect.provide(makeApiLayer({ token: process.env.NETLIFY_TOKEN })))
);
```

Errors are typed as `ApiError`, `NetworkError` and `ValidationError`.

A call can pass its own `config`, which layers over the layer's: its `headers` join the layer's, and its other fields, such as `onResponse` for the `Link` header, replace them. An `onResponse` that throws makes the effect die with the `onResponse threw on` error as a defect rather than fail with `NetworkError`.

`makeApiLayer` accepts `token`, `headers` and `baseUrl`. `baseUrl` is the host only, such as a proxy or a test server, and defaults to `https://api.netlify.com`; the `/api/v1` base path is added to it. A single call can pass it as `config: { baseUrl }`.

## Entrypoints

| Import | Contents |
| --- | --- |
| `netlify-api` | client class, operations, schemas and types |
| `netlify-api/components` | operations grouped by tag and by path |
| `netlify-api/schemas` | Zod schemas for every operation |
| `netlify-api/types` | TypeScript types for every operation |
| `netlify-api/effect` | Effect bindings |

## License

ISC
