# netlify-api

Unofficial. Not made or endorsed by Netlify.

Auto-generated, fully typed client for the [Netlify API](https://docs.netlify.com/api/get-started/).

Generated from the OpenAPI spec at <https://open-api.netlify.com/swagger.json>; before generating, [`kubb.config.ts`](https://github.com/sferarc/openapi/blob/main/packages/netlify-api/kubb.config.ts) renames identifiers that are reserved words and drops the `/api/v1` prefix a path repeats from the base path.

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
  authToken: currentAccessToken, // optional, defaults to the client's token when it is a string
});
```

This posts to `https://api.netlify.com/oauth/token` and returns the new token pair, with `createdAt` as a Unix timestamp.

### Refreshing the token on every call

Pass a function as `token`, sync or async, and the client calls it before every request, so each call sends the token it returns:

```ts
const { auth } = new NetlifyApi({ token: process.env.NETLIFY_TOKEN ?? "" });
let session = { accessToken: "", refreshToken: process.env.NETLIFY_REFRESH_TOKEN ?? "", expiresAt: 0 };
const refreshEveryMs = 50 * 60 * 1000; // your choice: the token endpoint returns no expiry

const client = new NetlifyApi({
  token: async () => {
    if (Date.now() >= session.expiresAt) {
      const result = await auth.refreshToken({
        refreshToken: session.refreshToken,
        clientId: process.env.NETLIFY_CLIENT_ID ?? "",
        clientSecret: process.env.NETLIFY_CLIENT_SECRET ?? "",
      });
      session = {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresAt: Date.now() + refreshEveryMs,
      };
    }
    return session.accessToken;
  },
});
```

A call rejects with what the function threw, before any request is sent, and a call's own `config.token` still wins. `auth.refreshToken` never calls the function, so it sends `authToken` only when you pass one. The token endpoint returns no expiry, so pick a refresh interval that suits your OAuth application.

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

A request that gets an HTTP error response rejects with an `ApiResponseError`, exported from the package, which extends `Error`: `status` is the HTTP status code, `payload` is the parsed error body, or the raw body text, up to 1000 characters, when it is not JSON, and `method` and `path` name the request, without its query string. Its message reads `<METHOD> <path> returned <status>: <detail>`, where the detail is the API's own error message or else the first 200 characters of the body. A request that never gets a response rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with what the signal was aborted with, as is: the `AbortError`, or the `TimeoutError` of `AbortSignal.timeout()`.

```ts
import { ApiResponseError } from "netlify-api";

try {
  await client.api.site.getSite({ pathParams: { site_id: "missing" } });
} catch (error) {
  if (error instanceof ApiResponseError) {
    console.error(error.message, error.status, error.payload);
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
