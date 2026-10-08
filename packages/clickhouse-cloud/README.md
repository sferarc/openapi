# clickhouse-cloud

Auto-generated, fully typed client for the [ClickHouse Cloud API](https://clickhouse.com/docs/cloud/manage/api/api-overview).

## Features

- **Fully typed**: every operation, parameter and response is generated from the official OpenAPI spec
- **Tree-shakable**: only the operations you import end up in your bundle
- **Runtime agnostic**: uses the global `fetch`, or bring your own implementation
- **Effect support**: optional [Effect](https://effect.website) bindings via `clickhouse-cloud/effect`

## Installation

```bash
npm install clickhouse-cloud
```

## Authentication

ClickHouse Cloud authenticates with HTTP basic auth: the username is the API key ID and the password is the key secret. Create a key in the ClickHouse Cloud console ([docs](https://clickhouse.com/docs/cloud/manage/openapi)). Each operation needs the key to hold the permissions it lists.

## Quick Start

```ts
import { ClickHouseCloudApi } from "clickhouse-cloud";

const client = new ClickHouseCloudApi({
  keyId: process.env.CLICKHOUSE_KEY_ID!,
  keySecret: process.env.CLICKHOUSE_KEY_SECRET!,
});

const { result: organizations } = await client.api.organization.organizationGetList();

const { result: services } = await client.api.service.instanceGetList({
  pathParams: { organizationId: organizations?.[0]?.id ?? "" },
});
```

Operations are grouped by tag: `client.api.<tag>.<operation>(params)`. Every endpoint is also reachable by method and path:

```ts
await client.request("GET /v1/organizations/{organizationId}", {
  pathParams: { organizationId },
});
```

A failed request rejects with the API's error body, `{ status, requestId, error }`.

### Custom fetch or base URL

```ts
const client = new ClickHouseCloudApi({
  keyId: "...",
  keySecret: "...",
  baseUrl: "https://api.clickhouse.cloud",
  fetch: myFetchImplementation,
});
```

## Effect

The `effect` entrypoint exposes every operation as an `Effect`. It requires `effect` as a peer dependency.

```ts
import { Effect } from "effect";
import { basicAuth } from "clickhouse-cloud";
import { ApiService, makeApiLayer } from "clickhouse-cloud/effect";

const program = ApiService.organization.organizationGetList({});

await Effect.runPromise(
  program.pipe(
    Effect.provide(
      makeApiLayer({
        headers: { Authorization: basicAuth(process.env.CLICKHOUSE_KEY_ID!, process.env.CLICKHOUSE_KEY_SECRET!) },
      }),
    ),
  ),
);
```

Errors are typed as `ApiError`, `NetworkError` and `ValidationError`.

## Entrypoints

| Import | Contents |
| --- | --- |
| `clickhouse-cloud` | client class, `basicAuth`, operations, schemas and types |
| `clickhouse-cloud/components` | operations grouped by tag and by path |
| `clickhouse-cloud/schemas` | Zod schemas for every operation |
| `clickhouse-cloud/types` | TypeScript types for every operation |
| `clickhouse-cloud/effect` | Effect bindings |

## Spec source

The client is generated with [kubb](https://kubb.dev) from the OpenAPI document ClickHouse serves at [`https://api.clickhouse.cloud/v1`](https://api.clickhouse.cloud/v1). The only fixup rewrites the placeholder Slack webhook URLs in its examples, which GitHub push protection otherwise blocks as secrets. The hourly `Update OpenAPI` workflow regenerates it from that URL and opens a PR with a changeset when the spec changes. To regenerate locally:

```bash
pnpm generate --filter=clickhouse-cloud
```

## License

ISC
