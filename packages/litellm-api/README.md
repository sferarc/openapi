# litellm-api

Unofficial. Not made or endorsed by LiteLLM.

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

const routes = await client.api.default.getRoutesRoutesGet();
```

Operations are grouped by tag: `client.api.<tag>.<operation>(params)`. Operations without a tag live under `client.api.default`.

[`OPERATIONS.md`](./src/generated/OPERATIONS.md) lists every operation with its `client.api` call, its `"<METHOD> <path>"` request and the spec's summary, one table per tag. It ships in the package, so `grep` in `node_modules/litellm-api` finds an operation without reading the types.

Every operation can also be called by method and path:

```ts
const routes = await client.request("GET /routes");
```

### Custom fetch

```ts
const client = new LiteLLMApi({
  baseUrl: "http://localhost:4000",
  token: process.env.LITELLM_MASTER_KEY ?? null,
  fetch: myFetchImplementation,
});
```

### Line-delimited JSON

An operation that answers with line-delimited JSON (`application/x-ndjson` and similar), such as the Lens dataset export, resolves to an array with one parsed value per line once the body ends. To read each line as it arrives, for example from a stream the server keeps open, pass `jsonLines: "stream"` in `config` and iterate the result:

```ts
import { isJsonLineStream } from "litellm-api";

const rows = await client.request("GET /lens/datasets/{dataset_id}/export", {
  pathParams: { dataset_id: datasetId },
  config: { jsonLines: "stream" },
});
if (isJsonLineStream(rows)) {
  for await (const line of rows) console.log(line);
}
```

Leaving the loop early cancels the response body. A response of another type resolves as usual, and so does any response when a custom `fetch` returns no `body`.

### Response headers

A call resolves to the parsed body only. To read a response header, pass `onResponse` in `config`; it gets the status and headers of the response before the body is read, an error response included. LiteLLM names the deployment that answered in `x-litellm-model-id`, which `GET /model/info` takes as `litellm_model_id`, and the cache entry in `x-litellm-cache-key`, which `POST /cache/delete` takes:

```ts
import type { ResponseInfo } from "litellm-api";

const responses: ResponseInfo[] = [];
const completion = await client.api.chatCompletions.chatCompletionChatCompletionsPost({
  body: { model: "gpt-4o", messages: [{ role: "user", content: "Hello" }] },
  config: { onResponse: (response) => responses.push(response) },
});
const modelId = responses[0]?.headers.get("x-litellm-model-id");
```

An error thrown inside `onResponse` rejects the call with an `Error` whose message starts with `onResponse threw on` and whose `cause` is what was thrown.

## Errors

A call that gets an HTTP error response rejects with `{ status, payload }`: `status` is the HTTP status code and `payload` is the parsed JSON error body, or the raw body text, up to 1000 characters, when it is not JSON. A request that gets no response at all, for example because the network failed, rejects with an `Error` whose message names the method, the path and the reason, and whose `cause` is the original exception. A request cancelled through `signal` rejects with what the signal was aborted with, as is: the `AbortError`, or the `TimeoutError` of `AbortSignal.timeout()`.

## Entrypoints

| Import | Contents |
| --- | --- |
| `litellm-api` | client class, operations, schemas and types |
| `litellm-api/components` | operations grouped by tag and by path |
| `litellm-api/schemas` | Zod schemas for every operation |
| `litellm-api/types` | TypeScript types for every operation |

## License

ISC
