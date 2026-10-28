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
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "", "http://localhost").pathname).toMatch(/\/chats\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /chats/{chatId}", { pathParams: { chatId: "" } }),
		).rejects.toThrow("Missing required path parameter: chatId");
		expect(urls).toEqual([]);
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /chats", {});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "", "http://localhost").pathname).toMatch(/\/chats$/);
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
