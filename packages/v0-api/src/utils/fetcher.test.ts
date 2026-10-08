import { describe, expect, it } from "vitest";
import type { FetchImpl } from "./fetch";
import client from "./fetcher";

const respond =
	(status: number, body: string, contentType = "application/json"): FetchImpl =>
	async () =>
		new Response(body, { status, headers: { "content-type": contentType } }) as never;

describe("fetcher", () => {
	it("rejects an HTTP error with its status and parsed body", async () => {
		await expect(
			client({
				url: "/thing",
				method: "get",
				fetchImpl: respond(404, JSON.stringify({ message: "not found" })),
			}),
		).rejects.toEqual({ status: 404, payload: { message: "not found" } });
	});

	it("keeps the status when the error body is not JSON", async () => {
		await expect(
			client({ url: "/thing", method: "get", fetchImpl: respond(502, "<html>", "text/html") }),
		).rejects.toMatchObject({ status: 502, payload: expect.stringContaining("Unexpected error") });
	});

	it("reports a failed request as a network error", async () => {
		const fetchImpl: FetchImpl = async () => {
			throw new TypeError("fetch failed");
		};
		await expect(client({ url: "/thing", method: "get", fetchImpl })).rejects.toMatchObject({
			name: "unknown",
			message: expect.stringContaining("fetch failed"),
		});
	});

	it("resolves a successful JSON response", async () => {
		await expect(
			client({
				url: "/thing",
				method: "get",
				fetchImpl: respond(200, JSON.stringify({ ok: true })),
			}),
		).resolves.toEqual({ ok: true });
	});
});
