import { describe, expect, expectTypeOf, it } from "vitest";
import { createAccessGroup, readAccessGroup, runSessionCommand } from "../generated/components";
import type {
	RunSessionCommandStatus200Json,
	RunSessionCommandStatus200XNdjson,
} from "../generated/types";
import type { FetchImpl, RequestInit } from "./fetch";
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

	it("keeps the raw body when the error body is not JSON", async () => {
		await expect(
			client({
				url: "/thing",
				method: "get",
				fetchImpl: respond(502, "<html>Bad gateway</html>", "text/html"),
			}),
		).rejects.toEqual({ status: 502, payload: "<html>Bad gateway</html>" });
	});

	it("truncates a long non-JSON error body", async () => {
		const error = await client({
			url: "/thing",
			method: "get",
			fetchImpl: respond(502, "x".repeat(5000), "text/html"),
		}).catch((e: { payload: string }) => e);
		expect(error).toMatchObject({ status: 502, payload: "x".repeat(1000) });
	});

	it("reports a failed request as an Error naming the request and keeping the cause", async () => {
		const cause = new TypeError("fetch failed");
		const fetchImpl: FetchImpl = async () => {
			throw cause;
		};
		const error = await client({
			url: "/thing",
			method: "get",
			queryParams: { secret: "s3cret" },
			fetchImpl,
		}).catch((e: unknown) => e);
		expect(error).toBeInstanceOf(Error);
		expect((error as Error).cause).toBe(cause);
		expect((error as Error).message).toBe("GET /thing failed: fetch failed");
	});

	it("resolves a binary response as a Blob with its bytes intact", async () => {
		const bytes = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0xff, 0x00, 0x80]);
		const fetchImpl: FetchImpl = async () =>
			new Response(bytes, {
				status: 200,
				headers: { "content-type": "application/zip" },
			}) as never;
		const result = await client<Blob, unknown, unknown, unknown, unknown, unknown>({
			url: "/thing",
			method: "get",
			fetchImpl,
		});
		expect(result).toBeInstanceOf(Blob);
		expect(new Uint8Array(await result.arrayBuffer())).toEqual(bytes);
	});

	it("resolves an empty binary response to undefined", async () => {
		await expect(
			client({
				url: "/thing",
				method: "get",
				fetchImpl: respond(200, "", "application/octet-stream"),
			}),
		).resolves.toBeUndefined();
	});

	it("keeps a text response as a string", async () => {
		await expect(
			client({ url: "/thing", method: "get", fetchImpl: respond(200, "a,b\n1,2", "text/csv") }),
		).resolves.toBe("a,b\n1,2");
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

	it.each(["application/x-ndjson", "application/jsonl", "application/stream+json; charset=utf-8"])(
		"resolves a %s response to one value per line",
		async (contentType) => {
			await expect(
				client({
					url: "/thing",
					method: "get",
					fetchImpl: respond(200, '{"id":1}\r\n{"id":2}\n\n', contentType),
				}),
			).resolves.toEqual([{ id: 1 }, { id: 2 }]);
		},
	);

	it("types runSessionCommand as its JSON body or the ndjson lines it resolves to with wait", async () => {
		const line = { command: { id: "cmd_1", exitCode: 0 }, data: "", stream: "status" };
		const result = await runSessionCommand({
			pathParams: { sessionId: "sbx_1" },
			body: { command: "npm", wait: true },
			config: { fetchImpl: respond(200, `${JSON.stringify(line)}\n`, "application/x-ndjson") },
		});
		expectTypeOf(result).toEqualTypeOf<
			RunSessionCommandStatus200Json | RunSessionCommandStatus200XNdjson
		>();
		expect(result).toEqual([line]);
	});

	it("percent-encodes path parameters in generated operations", async () => {
		let calledUrl = "";
		const fetchImpl: FetchImpl = async (url) => {
			calledUrl = String(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		await readAccessGroup({ pathParams: { idOrName: "../v2/user" }, config: { fetchImpl } });
		expect(calledUrl).toContain("/v1/access-groups/..%2Fv2%2Fuser");
	});

	it("sends a generated operation's JSON body as JSON", async () => {
		let init: RequestInit | undefined;
		const fetchImpl: FetchImpl = async (_url, requestInit) => {
			init = requestInit;
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		await createAccessGroup({ body: { name: "Engineering" }, config: { fetchImpl } });
		expect(init?.headers).toMatchObject({ "Content-Type": "application/json" });
		expect(init?.body).toBe(JSON.stringify({ name: "Engineering" }));
	});

	describe("query string", () => {
		const searchOf = async (queryParams: Record<string, unknown>) => {
			let requested = "";
			const fetchImpl: FetchImpl = async (url) => {
				requested = String(url);
				return new Response("{}", {
					status: 200,
					headers: { "content-type": "application/json" },
				}) as never;
			};
			await client({ url: "/thing", method: "get", queryParams, fetchImpl });
			return new URL(requested, "http://localhost").search;
		};

		it("omits undefined and null values", async () => {
			expect(await searchOf({ teamId: undefined, slug: null, limit: 5 })).toBe("?limit=5");
		});

		it("sends an array as repeated keys", async () => {
			expect(await searchOf({ ids: ["a", "b"] })).toBe("?ids=a&ids=b");
		});

		it("encodes reserved characters and spaces", async () => {
			expect(await searchOf({ q: "a&b c" })).toBe("?q=a%26b+c");
		});
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
		await client({ url: "/thing", method: "post", token: "default", fetchImpl, ...options });
		return { headers: new Headers(init?.headers), body: init?.body };
	};

	it("resolves a 204 with a JSON content type to undefined", async () => {
		const fetchImpl: FetchImpl = async () =>
			new Response(null, { status: 204, headers: { "content-type": "application/json" } }) as never;
		await expect(client({ url: "/thing", method: "delete", fetchImpl })).resolves.toBeUndefined();
	});

	it("rejects an aborted request with the AbortError itself", async () => {
		const controller = new AbortController();
		controller.abort();
		const fetchImpl: FetchImpl = async (_url, init) => {
			init?.signal?.throwIfAborted();
			return new Response("{}") as never;
		};
		const error = await client({
			url: "/thing",
			method: "get",
			signal: controller.signal,
			fetchImpl,
		}).catch((e: unknown) => e);
		expect((error as Error).name).toBe("AbortError");
	});

	it("resolves a 204 without a content type to undefined", async () => {
		const fetchImpl: FetchImpl = async () => new Response(null, { status: 204 }) as never;
		await expect(client({ url: "/thing", method: "delete", fetchImpl })).resolves.toBeUndefined();
	});

	it("resolves an empty JSON body to undefined instead of a network error", async () => {
		const fetchImpl: FetchImpl = async () =>
			new Response("", { status: 200, headers: { "content-type": "application/json" } }) as never;
		await expect(client({ url: "/thing", method: "delete", fetchImpl })).resolves.toBeUndefined();
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

describe("fetcher stream uploads", () => {
	it("sends a stream body in a form fetch accepts", async () => {
		let init: RequestInit | undefined;
		const fetchImpl: FetchImpl = async (_url, requestInit) => {
			init = requestInit;
			return new Response(null, { status: 204 }) as never;
		};
		const stream = new ReadableStream<Uint8Array>({
			start(controller) {
				controller.enqueue(new Uint8Array([1, 2, 3]));
				controller.close();
			},
		});
		await client({
			url: "/upload",
			method: "put",
			headers: { "Content-Type": "application/octet-stream" },
			body: stream,
			fetchImpl,
		});
		expect(init?.body).toBe(stream);
		// fetch rejects a stream body without `duplex: "half"` before sending anything.
		expect(init?.duplex).toBe("half");
		// The DOM RequestInit type does not declare `duplex` yet, though Node's fetch requires it.
		const streamInit = { method: init?.method, body: stream, duplex: init?.duplex };
		const request = new Request("https://example.com/upload", streamInit);
		expect(new Uint8Array(await request.arrayBuffer())).toEqual(new Uint8Array([1, 2, 3]));
	});

	it("leaves duplex unset for a non-stream body", async () => {
		let init: RequestInit | undefined;
		const fetchImpl: FetchImpl = async (_url, requestInit) => {
			init = requestInit;
			return new Response(null, { status: 204 }) as never;
		};
		await client({ url: "/upload", method: "put", body: { a: 1 }, fetchImpl });
		expect(init?.duplex).toBeUndefined();
	});
});
