# litellm-api

Auto-generated, fully typed client for the [LiteLLM proxy API](https://docs.litellm.ai/docs/proxy/quick_start).

## Features

- **Fully typed** - every operation, parameter and response is generated from the official OpenAPI spec
- **Tree-shakable** - only the operations you import end up in your bundle
- **Runtime agnostic** - uses the global `fetch`, or bring your own implementation

## Installation

```bash
npm install litellm-api
```

## Quick Start

LiteLLM is self-hosted, so the client requires the `baseUrl` of your proxy:

```ts
import { LiteLLMApi } from "litellm-api";

const client = new LiteLLMApi({
  baseUrl: "http://localhost:4000",
  token: process.env.LITELLM_MASTER_KEY ?? null,
});

const usage = await client.api.billing.checkUsageBillingUsageGet();
```

Operations are grouped by tag: `client.api.<tag>.<operation>(params)`. Operations without a tag live under `client.api.default`.

Every operation can also be called by method and path:

```ts
const usage = await client.request("GET /billing/usage", {});
```

### Custom fetch

```ts
const client = new LiteLLMApi({
  baseUrl: "http://localhost:4000",
  token: process.env.LITELLM_MASTER_KEY ?? null,
  fetch: myFetchImplementation,
});
```

## Errors

A call that gets an HTTP error response rejects with `{ status, payload }`: `status` is the HTTP status code and `payload` is the parsed JSON error body, or the raw body text, up to 1000 characters, when it is not JSON. A request that gets no response at all, for example because the network failed, rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with the `AbortError` itself.

## Entrypoints

| Import | Contents |
| --- | --- |
| `litellm-api` | client class, operations, schemas and types |
| `litellm-api/components` | operations grouped by tag and by path |
| `litellm-api/schemas` | Zod schemas for every operation |
| `litellm-api/types` | TypeScript types for every operation |

## License

ISC
