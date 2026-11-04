# cloudflare-api-js

Auto-generated, fully typed client for the [Cloudflare API](https://developers.cloudflare.com/api/).

## Features

- **Fully typed** - every operation, parameter and response is generated from the official OpenAPI spec
- **Tree-shakable** - only the operations you import end up in your bundle
- **Runtime agnostic** - uses the global `fetch`, or bring your own implementation

## Installation

```bash
npm install cloudflare-api-js
```

## Quick Start

```ts
import { CloudflareApi } from "cloudflare-api-js";

const client = new CloudflareApi({ token: process.env.CLOUDFLARE_TOKEN ?? "" });

const accounts = await client.api.accounts.accountsListAccounts({});
```

Operations are grouped by tag: `client.api.<tag>.<operation>(params)`.

Every operation can also be called by method and path:

```ts
const accounts = await client.request("GET /accounts");
```

### Global API Key

Some operations, such as the Cloudforce One requests, accept only the legacy Global API Key. Pass it with the email of its account instead of a token; the client sends them as `X-Auth-Key` and `X-Auth-Email`:

```ts
const client = new CloudflareApi({
  apiKey: process.env.CLOUDFLARE_API_KEY ?? "",
  email: process.env.CLOUDFLARE_EMAIL ?? "",
});
```

### Custom fetch

```ts
const client = new CloudflareApi({
  token: process.env.CLOUDFLARE_TOKEN ?? "",
  fetch: myFetchImplementation,
});
```

### Base URL

Calls go to `https://api.cloudflare.com/client/v4` unless the client takes a `baseUrl`, such as a proxy; a single call can pass its own as `config: { baseUrl }`.

### Line-delimited JSON

An operation that answers with line-delimited JSON (`application/x-ndjson` and similar), such as `getCollectionExportEndpoint`, resolves to an array with one parsed value per line once the body ends. To read each line as it arrives, for example from a stream the server keeps open, pass `jsonLines: "stream"` in `config` and iterate the result:

```ts
import { isJsonLineStream } from "cloudflare-api-js";

const items = await client.request(
  "GET /accounts/{accountId}/cloudforce-one/v2/collections/{collectionId}/export",
  { pathParams: { accountId, collectionId }, config: { jsonLines: "stream" } },
);
if (isJsonLineStream(items)) {
  for await (const line of items) console.log(line);
}
```

Leaving the loop early cancels the response body. A response of another type resolves as usual, and so does any response when a custom `fetch` returns no `body`.

### Response headers

A call resolves to the parsed body only. To read a response header, pass `onResponse` in `config`; it gets the status and headers of the response before the body is read, an error response included. A spend policy returns its version in `ETag` for the `If-Match` of a later update, and an R2 object returns its metadata in headers:

```ts
let etag: string | null = null;
const policy = await client.api.spendPolicies.spendPoliciesGet({
  pathParams: { accountId, policyId },
  config: { onResponse: ({ headers }) => (etag = headers.get("ETag")) },
});
```

An error thrown inside `onResponse` rejects the call with an `Error` whose message starts with `onResponse threw on` and whose `cause` is what was thrown.

## Errors

A call that gets an HTTP error response rejects with `{ status, payload }`: `status` is the HTTP status code and `payload` is the parsed JSON error body, or the raw body text, up to 1000 characters, when it is not JSON. A request that gets no response at all, for example because the network failed, rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with what the signal was aborted with, as is: the `AbortError`, or the `TimeoutError` of `AbortSignal.timeout()`.

## Entrypoints

| Import | Contents |
| --- | --- |
| `cloudflare-api-js` | client class, operations and types |
| `cloudflare-api-js/components` | operations grouped by tag and by path |
| `cloudflare-api-js/types` | TypeScript types for every operation |

## License

ISC
