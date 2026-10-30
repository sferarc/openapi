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

### Custom fetch

```ts
const client = new CloudflareApi({
  token: process.env.CLOUDFLARE_TOKEN ?? "",
  fetch: myFetchImplementation,
});
```

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
