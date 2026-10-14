import { describe, expect, it } from "vitest";
import { VercelApi } from "./client";
import type { FetchImpl } from "./utils/fetch";

describe("VercelApi.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new VercelApi({ token: "token", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /v9/projects/{idOrName}", { pathParams: { idOrName: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/v9\/projects\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /v9/projects/{idOrName}", { pathParams: { idOrName: "" } }),
		).rejects.toThrow("Missing required path parameter: idOrName");
		expect(urls).toEqual([]);
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /v1/access-groups", {});
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/v1\/access-groups$/);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});
