import { describe, expect, it } from "vitest";
import { ZoomApi } from "./client";
import type { FetchImpl } from "./utils/fetch";

describe("ZoomApi.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new ZoomApi({ token: "token", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /devices/{deviceId}", { pathParams: { deviceId: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/devices\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /devices/{deviceId}", { pathParams: { deviceId: "" } }),
		).rejects.toThrow("Missing required path parameter: deviceId");
		expect(urls).toEqual([]);
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /archive_files", {});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/archive_files$/);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});
