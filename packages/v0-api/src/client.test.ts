import { describe, expect, it } from "vitest";
import { V0Api } from "./client";
import type { FetchImpl } from "./utils/fetch";

describe("V0Api.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new V0Api({ token: "token", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /chats/{chatId}", { pathParams: { chatId: "a/b" } });
		expect(urls).toEqual(["https://api.v0.dev/v1/chats/a%2Fb"]);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /chats/{chatId}", { pathParams: { chatId: "" } }),
		).rejects.toThrow("Missing required path parameter: chatId");
		expect(urls).toEqual([]);
	});

	it("types request() and client.api params from the operation", () => {
		const { client } = setup();
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			// @ts-expect-error pathParams needs chatId
			client.request("GET /chats/{chatId}", { pathParams: {} }),
			// @ts-expect-error the operation has no such parameter
			client.request("GET /chats/{chatId}", { pathParams: { chatId: "a" }, nope: 1 }),
			// @ts-expect-error pathParams needs chatId
			client.api.chats.chatsGetById({ pathParams: {} }),
		];
		expect(typeChecks).toBeTypeOf("function");
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /chats", {});
		expect(urls).toEqual(["https://api.v0.dev/v1/chats"]);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});

describe("V0Api.api", () => {
	const fetch: FetchImpl = async () => {
		throw new Error("fetch called");
	};
	const client = new V0Api({ token: "token", fetch });

	it("ignores Object.prototype names as tags and operations", () => {
		expect(client.api.constructor).toBeUndefined();
		expect(client.api.chats.toString).toBeUndefined();
		expect(client.api.chats.hasOwnProperty).toBeUndefined();
		expect(client.api.chats.chatsCreate).toBeTypeOf("function");
	});
});

describe("V0Api per-call config", () => {
	function setup() {
		const headers: unknown[] = [];
		const fetch: FetchImpl = async (_url, init) => {
			headers.push(init?.headers);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { headers, client: new V0Api({ token: "token", fetch }) };
	}

	it("sends the caller's headers from request() alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.request("GET /chats", { config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("sends the caller's headers from the api proxy alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.api.chats.chatsFind({ config: { headers: { "X-Request-Id": "abc" } } });
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});
});
