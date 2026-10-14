import { describe, expect, it } from "vitest";
import { NetlifyApi } from "./client";
import type { FetchImpl } from "./utils/fetch";

describe("NetlifyApi.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new NetlifyApi({ token: "token", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /sites/{site_id}", { pathParams: { site_id: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/sites\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /sites/{site_id}", { pathParams: { site_id: "" } }),
		).rejects.toThrow("Missing required path parameter: site_id");
		expect(urls).toEqual([]);
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /sites", {});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/sites$/);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});
