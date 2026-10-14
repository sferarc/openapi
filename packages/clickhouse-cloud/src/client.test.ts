import { Effect, Layer } from "effect";
import { describe, expect, it, vi } from "vitest";
import { ApiConfig, ApiError, ApiService } from "./effect";
import { basicAuth, ClickHouseCloudApi, organizationGetListResponseSchema } from "./index";
import type { FetchImpl, RequestInit } from "./utils/fetch";
import fetcher from "./utils/fetcher";

const organizationId = "5f2b0a3e-6c2d-4f43-9d8e-6c6a7b1f9a10";
const requestId = "0c1e1f4a-2b3c-4d5e-8f90-123456789abc";

function jsonResponse(status: number, body: unknown) {
	return {
		ok: status >= 200 && status < 300,
		status,
		url: "",
		json: async () => body,
		text: async () => JSON.stringify(body),
		headers: { get: (name: string) => (name === "content-type" ? "application/json" : null) },
	};
}

function mockFetch(status: number, body: unknown) {
	return vi.fn<FetchImpl>(async () => jsonResponse(status, body));
}

function lastCall(fetchImpl: ReturnType<typeof mockFetch>): [string, RequestInit] {
	const [url, init] = fetchImpl.mock.lastCall ?? [];
	if (url === undefined || init === undefined) throw new Error("fetch was not called");
	return [url, init];
}

const organizations = {
	status: 200,
	requestId,
	result: [{ id: organizationId, name: "Acme", createdAt: "2024-01-01T00:00:00Z" }],
};

describe("basicAuth", () => {
	it("encodes the key ID and secret as HTTP basic credentials", () => {
		expect(basicAuth("key-id", "key-secret")).toBe(`Basic ${btoa("key-id:key-secret")}`);
	});
});

describe("ClickHouseCloudApi", () => {
	it("requires a key ID and secret", () => {
		expect(() => new ClickHouseCloudApi({ keyId: "", keySecret: "secret" })).toThrow();
	});

	it("sends tag operations to the ClickHouse Cloud API with basic auth", async () => {
		const fetchImpl = mockFetch(200, organizations);
		const client = new ClickHouseCloudApi({ keyId: "id", keySecret: "secret", fetch: fetchImpl });

		const response = await client.api.organization.organizationGetList();

		const [url, init] = lastCall(fetchImpl);
		expect(url).toBe("https://api.clickhouse.cloud/v1/organizations");
		expect(init.method).toBe("GET");
		expect(init.headers?.Authorization).toBe(basicAuth("id", "secret"));
		expect(init.body).toBeUndefined();
		expect(response).toEqual(organizations);
	});

	it("fills path params, repeats array query params and serializes the body", async () => {
		const fetchImpl = mockFetch(200, { status: 200, requestId, result: [] });
		const client = new ClickHouseCloudApi({ keyId: "id", keySecret: "secret", fetch: fetchImpl });

		await client.api.service.instanceGetList({
			pathParams: { organizationId },
			queryParams: { filter: ["tag:env=prod", "tag:team=data"] },
		});
		expect(lastCall(fetchImpl)[0]).toBe(
			`https://api.clickhouse.cloud/v1/organizations/${organizationId}/services?filter=tag%3Aenv%3Dprod&filter=tag%3Ateam%3Ddata`,
		);

		await client.api.organization.organizationUpdate({
			pathParams: { organizationId },
			body: { name: "Renamed" },
		});
		const [url, init] = lastCall(fetchImpl);
		expect(url).toBe(`https://api.clickhouse.cloud/v1/organizations/${organizationId}`);
		expect(init.method).toBe("PATCH");
		expect(init.headers?.["Content-Type"]).toBe("application/json");
		expect(JSON.parse(String(init.body))).toEqual({ name: "Renamed" });
	});

	it("calls endpoints by path and honours a custom base URL", async () => {
		const fetchImpl = mockFetch(200, organizations);
		const client = new ClickHouseCloudApi({
			keyId: "id",
			keySecret: "secret",
			baseUrl: "http://localhost:8080",
			fetch: fetchImpl,
		});

		await client.request("GET /v1/organizations/{organizationId}", {
			pathParams: { organizationId },
		});

		const [url, init] = lastCall(fetchImpl);
		expect(url).toBe(`http://localhost:8080/v1/organizations/${organizationId}`);
		expect(init.headers?.Authorization).toBe(basicAuth("id", "secret"));
	});

	it("rejects with the API error body on a non-2xx response", async () => {
		const error = { status: 400, requestId, error: "Invalid organization ID" };
		const client = new ClickHouseCloudApi({
			keyId: "id",
			keySecret: "secret",
			fetch: mockFetch(400, error),
		});

		await expect(
			client.api.organization.organizationGet({ pathParams: { organizationId: "nope" } }),
		).rejects.toEqual(error);
	});

	it("rejects before calling fetch when a path param is missing", async () => {
		const fetchImpl = mockFetch(200, organizations);
		const client = new ClickHouseCloudApi({ keyId: "id", keySecret: "secret", fetch: fetchImpl });

		await expect(
			client.api.organization.organizationGet({ pathParams: { organizationId: "" } }),
		).rejects.toThrow("Missing required path parameter: organizationId");
		expect(fetchImpl).not.toHaveBeenCalled();
	});
});

describe("schemas", () => {
	it("parses an organization list response", () => {
		expect(organizationGetListResponseSchema.parse(organizations)).toEqual(organizations);
	});

	it("rejects a malformed organization ID", () => {
		const result = organizationGetListResponseSchema.safeParse({
			...organizations,
			result: [{ id: "not-a-uuid" }],
		});
		expect(result.success).toBe(false);
	});
});

describe("effect", () => {
	const layer = (fetchImpl: FetchImpl) =>
		Layer.succeed(ApiConfig, { headers: { Authorization: basicAuth("id", "secret") }, fetchImpl });

	it("runs operations with the configured credentials", async () => {
		const fetchImpl = mockFetch(200, organizations);

		const response = await Effect.runPromise(
			ApiService.organization.organizationGetList({}).pipe(Effect.provide(layer(fetchImpl))),
		);

		const [url, init] = lastCall(fetchImpl);
		expect(url).toBe("https://api.clickhouse.cloud/v1/organizations");
		expect(init.headers?.Authorization).toBe(basicAuth("id", "secret"));
		expect(response).toEqual(organizations);
	});

	it("fails with a typed ApiError carrying the status", async () => {
		const fetchImpl = mockFetch(404, { status: 404, requestId, error: "Not found" });

		const error = await Effect.runPromise(
			ApiService.organization
				.organizationGet({ pathParams: { organizationId } })
				.pipe(Effect.flip, Effect.provide(layer(fetchImpl))),
		);

		expect(error).toBeInstanceOf(ApiError);
		expect(error).toMatchObject({ status: 404 });
	});
});

describe("ClickHouseCloudApi.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new ClickHouseCloudApi({ keyId: "id", keySecret: "secret", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /v1/organizations/{organizationId}", {
			pathParams: { organizationId: "a/b" },
		});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/v1\/organizations\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /v1/organizations/{organizationId}", {
				pathParams: { organizationId: "" },
			}),
		).rejects.toThrow("Missing required path parameter: organizationId");
		expect(urls).toEqual([]);
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /v1/whoami", {});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/v1\/whoami$/);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});

describe("fetcher failures", () => {
	it("keeps the raw body when the error body is not JSON", async () => {
		const fetchImpl: FetchImpl = async () =>
			new Response("<html>Bad gateway</html>", {
				status: 502,
				headers: { "content-type": "text/html" },
			}) as never;
		await expect(fetcher({ url: "/thing", method: "get", fetchImpl })).rejects.toEqual({
			status: "unknown",
			payload: "<html>Bad gateway</html>",
		});
	});

	it("truncates a long non-JSON error body", async () => {
		const fetchImpl: FetchImpl = async () =>
			new Response("x".repeat(5000), { status: 502 }) as never;
		await expect(fetcher({ url: "/thing", method: "get", fetchImpl })).rejects.toEqual({
			status: "unknown",
			payload: "x".repeat(1000),
		});
	});

	it("reports a failed request as an Error naming the request and keeping the cause", async () => {
		const cause = new TypeError("fetch failed");
		const fetchImpl: FetchImpl = async () => {
			throw cause;
		};
		const error = await fetcher({
			url: "/thing",
			method: "get",
			queryParams: { secret: "s3cret" },
			fetchImpl,
		}).catch((e: unknown) => e);
		expect(error).toBeInstanceOf(Error);
		expect((error as Error).cause).toBe(cause);
		expect((error as Error).message).toBe("GET /thing failed: fetch failed");
	});
});

describe("fetcher edge responses and headers", () => {
	const sent = async (options: { headers: Record<string, string>; body?: unknown }) => {
		let init: Parameters<FetchImpl>[1];
		const fetchImpl: FetchImpl = async (_url, requestInit) => {
			init = requestInit;
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		await fetcher({
			url: "/thing",
			method: "post",
			keyId: "id",
			keySecret: "secret",
			fetchImpl,
			...options,
		});
		return { headers: new Headers(init?.headers), body: init?.body };
	};

	it("resolves a 204 without a content type to undefined", async () => {
		const fetchImpl: FetchImpl = async () => new Response(null, { status: 204 }) as never;
		await expect(fetcher({ url: "/thing", method: "delete", fetchImpl })).resolves.toBeUndefined();
	});

	it("resolves an empty JSON body to undefined instead of a network error", async () => {
		const fetchImpl: FetchImpl = async () =>
			new Response("", { status: 200, headers: { "content-type": "application/json" } }) as never;
		await expect(fetcher({ url: "/thing", method: "delete", fetchImpl })).resolves.toBeUndefined();
	});

	it("lets a lowercase authorization header replace the default", async () => {
		const { headers } = await sent({ headers: { authorization: "Bearer caller" } });
		expect(headers.get("authorization")).toBe("Bearer caller");
	});

	it("lets a lowercase content-type header replace the default", async () => {
		const { headers, body } = await sent({
			headers: { "content-type": "text/plain" },
			body: "raw",
		});
		expect(headers.get("content-type")).toBe("text/plain");
		expect(body).toBe("raw");
	});

	it("drops a lowercase multipart content-type so fetch sets the boundary", async () => {
		const { headers } = await sent({
			headers: { "content-type": "multipart/form-data" },
			body: new FormData(),
		});
		expect(headers.get("content-type")).toBeNull();
	});
});
