import { assert, describe, expect, it } from "vitest";
import { chatCompletionV1ChatCompletionsPost } from "../generated/components";
import type { FetchImpl } from "./fetch";
import client, {
	ApiResponseError,
	isEventStream,
	isJsonLineStream,
	type ServerSentEvent,
} from "./fetcher";

const respond =
	(status: number, body: string, contentType = "application/json"): FetchImpl =>
	async () =>
		new Response(body, { status, headers: { "content-type": contentType } }) as never;

// An ndjson body that stays open until the test closes it, as a log stream would.
const openNdjsonBody = () => {
	const encoder = new TextEncoder();
	let source: ReadableStreamDefaultController<Uint8Array> | undefined;
	const state = { cancelled: false };
	const body = new ReadableStream<Uint8Array>({
		start: (controller) => {
			source = controller;
		},
		cancel: () => {
			state.cancelled = true;
		},
	});
	const fetchImpl: FetchImpl = async () =>
		new Response(body, {
			status: 200,
			headers: { "content-type": "application/x-ndjson" },
		}) as never;
	const push = (chunk: string) => source?.enqueue(encoder.encode(chunk));
	return { fetchImpl, push, state };
};

describe("fetcher", () => {
	it("rejects a 403 with an ApiResponseError that names the request and keeps status and payload", async () => {
		const payload = { error: { code: "forbidden", message: "Not authorized for this team" } };
		const error = await client({
			url: "/v9/projects?token=secret",
			method: "get",
			fetchImpl: respond(403, JSON.stringify(payload)),
		}).catch((e: unknown) => e);

		assert(error instanceof ApiResponseError);
		expect(error).toBeInstanceOf(Error);
		expect(error.name).toBe("ApiResponseError");
		expect(error.message).toBe("GET /v9/projects returned 403: Not authorized for this team");
		const { status, payload: body, method, path } = error;
		expect({ status, payload: body, method, path }).toEqual({
			status: 403,
			payload,
			method: "GET",
			path: "/v9/projects",
		});
	});

	it("puts the first 200 characters of a body with no vendor message in the ApiResponseError message", async () => {
		const text = `<html>${"x".repeat(300)}</html>`;
		const error = await client({
			url: "/thing",
			method: "post",
			fetchImpl: respond(502, text, "text/html"),
		}).catch((e: unknown) => e);

		assert(error instanceof ApiResponseError);
		expect(error.message).toBe(`POST /thing returned 502: ${text.slice(0, 200)}`);
		expect(error.payload).toBe(text);
	});

	it("rejects an HTTP error with its status and parsed body", async () => {
		await expect(
			client({
				url: "/thing",
				method: "get",
				fetchImpl: respond(404, JSON.stringify({ message: "not found" })),
			}),
		).rejects.toMatchObject({ status: 404, payload: { message: "not found" } });
	});

	it("passes the status and headers of an error response to onResponse before rejecting", async () => {
		const seen: { status: number; retryAfter: string | null }[] = [];
		const fetchImpl: FetchImpl = async () =>
			new Response("{}", {
				status: 429,
				headers: { "content-type": "application/json", "retry-after": "30" },
			}) as never;

		await expect(
			client({
				url: "/thing",
				method: "post",
				fetchImpl,
				onResponse: ({ status, headers }) => {
					seen.push({ status, retryAfter: headers.get("Retry-After") });
				},
			}),
		).rejects.toMatchObject({ status: 429, payload: {} });
		expect(seen).toEqual([{ status: 429, retryAfter: "30" }]);
	});

	it("gives onResponse empty headers when a custom fetch returns none", async () => {
		let modelId: string | null | undefined;
		const fetchImpl: FetchImpl = async () => ({
			ok: true,
			status: 200,
			url: "",
			json: async () => ({}),
			text: async () => "{}",
		});

		await client({
			url: "/thing",
			method: "post",
			fetchImpl,
			onResponse: ({ headers }) => {
				modelId = headers.get("x-litellm-model-id");
			},
		});

		expect(modelId).toBeNull();
	});

	it("reports an onResponse that throws as the hook's error, not a failed request", async () => {
		const cause = new Error("no model id");
		const error = await client({
			url: "/thing",
			method: "post",
			queryParams: { secret: "s3cret" },
			fetchImpl: respond(200, "{}"),
			onResponse: () => {
				throw cause;
			},
		}).catch((e: unknown) => e);
		expect(error).toBeInstanceOf(Error);
		expect((error as Error).cause).toBe(cause);
		expect((error as Error).message).toBe("onResponse threw on POST /thing: no model id");
	});

	it("keeps the raw body when the error body is not JSON", async () => {
		await expect(
			client({
				url: "/thing",
				method: "get",
				fetchImpl: respond(502, "<html>Bad gateway</html>", "text/html"),
			}),
		).rejects.toMatchObject({ status: 502, payload: "<html>Bad gateway</html>" });
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

	it('reads a line-delimited body line by line with jsonLines: "stream" while it stays open', async () => {
		const { fetchImpl, push, state } = openNdjsonBody();
		const lines = await client({ url: "/thing", method: "get", jsonLines: "stream", fetchImpl });
		if (!isJsonLineStream(lines)) throw new Error("expected a stream of lines");
		const iterator = lines[Symbol.asyncIterator]();
		push('{"id":1}\r\n{"id"');
		await expect(iterator.next()).resolves.toEqual({ done: false, value: { id: 1 } });
		push(":2}\n\n");
		await expect(iterator.next()).resolves.toEqual({ done: false, value: { id: 2 } });
		await iterator.return?.();
		expect(state.cancelled).toBe(true);
	});

	it('ends a jsonLines: "stream" read with the last line when it has no newline', async () => {
		const lines = await client({
			url: "/thing",
			method: "get",
			jsonLines: "stream",
			fetchImpl: respond(200, '{"id":1}\n{"id":2}', "application/x-ndjson"),
		});
		if (!isJsonLineStream(lines)) throw new Error("expected a stream of lines");
		const values: unknown[] = [];
		for await (const line of lines) values.push(line);
		expect(values).toEqual([{ id: 1 }, { id: 2 }]);
	});

	it('parses a JSON response whole with jsonLines: "stream"', async () => {
		await expect(
			client({
				url: "/thing",
				method: "get",
				jsonLines: "stream",
				fetchImpl: respond(200, '{"ok":true}'),
			}),
		).resolves.toEqual({ ok: true });
	});

	it("joins a base URL that ends in a slash without doubling it", async () => {
		let requested = "";
		const fetchImpl: FetchImpl = async (url) => {
			requested = url;
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		await client({ url: "/thing", method: "get", baseUrl: "https://example.com/v1/", fetchImpl });
		expect(requested).toBe("https://example.com/v1/thing");
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

		it("sends an object as one key per property", async () => {
			expect(
				await searchOf({
					range: { start: "2021-04-01", end: "2021-04-30", skip: undefined, cursor: null },
					limit: 5,
				}),
			).toBe("?start=2021-04-01&end=2021-04-30&limit=5");
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

	it("rejects a timed out request with the signal's TimeoutError, not a wrapped error", async () => {
		const signal = AbortSignal.abort(new DOMException("The operation timed out.", "TimeoutError"));
		const fetchImpl: FetchImpl = async (_url, init) => {
			init?.signal?.throwIfAborted();
			return new Response("{}") as never;
		};
		const error = await client({
			url: "/thing",
			method: "get",
			signal,
			fetchImpl,
		}).catch((e: unknown) => e);
		expect(error).toBe(signal.reason);
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

// An event stream that stays open until the test ends it, as a streamed chat completion does.
const openEventStream = () => {
	const encoder = new TextEncoder();
	let source: ReadableStreamDefaultController<Uint8Array> | undefined;
	const state: { cancelled: boolean; body?: unknown } = { cancelled: false };
	const body = new ReadableStream<Uint8Array>({
		start: (controller) => {
			source = controller;
		},
		cancel: () => {
			state.cancelled = true;
		},
	});
	const fetchImpl: FetchImpl = async (_url, init) => {
		state.body = typeof init?.body === "string" ? JSON.parse(init.body) : undefined;
		return new Response(body, {
			status: 200,
			headers: { "content-type": "text/event-stream; charset=utf-8" },
		}) as never;
	};
	const push = (chunk: string) => source?.enqueue(encoder.encode(chunk));
	const end = () => source?.close();
	return { fetchImpl, push, end, state };
};

const readAll = async (result: unknown) => {
	if (!isEventStream(result)) throw new Error("expected a stream of events");
	const events: ServerSentEvent[] = [];
	for await (const event of result) events.push(event);
	return events;
};

describe("fetcher event streams", () => {
	it('reads a stream: true chat completion chunk by chunk with eventStream: "stream" while the body stays open', async () => {
		const { fetchImpl, push, state } = openEventStream();
		const chunks = await chatCompletionV1ChatCompletionsPost({
			body: { model: "gpt-4o", messages: [{ role: "user", content: "Hi" }], stream: true },
			config: { baseUrl: "http://localhost:4000", eventStream: "stream", fetchImpl },
		});
		expect(state.body).toMatchObject({ stream: true });
		if (!isEventStream(chunks)) throw new Error("expected a stream of events");
		const iterator = chunks[Symbol.asyncIterator]();
		push('data: {"choices":[{"delta":');
		push('{"content":"He"}}]}\n\n');
		await expect(iterator.next()).resolves.toEqual({
			done: false,
			value: { event: "message", data: '{"choices":[{"delta":{"content":"He"}}]}', id: "" },
		});
		push("data: [DONE]\n\n");
		await expect(iterator.next()).resolves.toEqual({
			done: false,
			value: { event: "message", data: "[DONE]", id: "" },
		});
		await iterator.return?.();
		expect(state.cancelled).toBe(true);
	});

	it("joins data lines, skips comments and keeps the last id across events", async () => {
		const { fetchImpl, push, end } = openEventStream();
		const result = client({ url: "/stream", method: "post", eventStream: "stream", fetchImpl });
		push(": keep-alive\r\nid: 7\r\ndata: one\r\ndata:two\r\n\r\n");
		push("data\n\nevent: done\ndata: last\n\n");
		end();
		expect(await readAll(await result)).toEqual([
			{ event: "message", data: "one\ntwo", id: "7" },
			{ event: "message", data: "", id: "7" },
			{ event: "done", data: "last", id: "7" },
		]);
	});

	it("reads a CRLF split across chunks as one line ending", async () => {
		const { fetchImpl, push, end } = openEventStream();
		const result = client({ url: "/stream", method: "post", eventStream: "stream", fetchImpl });
		push("data: a\r");
		push("\ndata: b\r");
		push("\n\r");
		push("\n");
		end();
		expect(await readAll(await result)).toEqual([{ event: "message", data: "a\nb", id: "" }]);
	});

	it("drops an event the body ends before its blank line and ignores events with no data", async () => {
		const { fetchImpl, push, end } = openEventStream();
		const result = client({ url: "/stream", method: "post", eventStream: "stream", fetchImpl });
		push("event: ping\n\ndata: kept\n\ndata: cut off");
		end();
		expect(await readAll(await result)).toEqual([{ event: "message", data: "kept", id: "" }]);
	});

	it("resolves an event stream to its raw text by default", async () => {
		await expect(
			client({
				url: "/v1/chat/completions",
				method: "post",
				fetchImpl: respond(200, "data: [DONE]\n\n", "text/event-stream"),
			}),
		).resolves.toBe("data: [DONE]\n\n");
	});

	it('parses a JSON response whole with eventStream: "stream"', async () => {
		await expect(
			client({
				url: "/v1/chat/completions",
				method: "post",
				eventStream: "stream",
				fetchImpl: respond(200, '{"id":"chatcmpl-1"}'),
			}),
		).resolves.toEqual({ id: "chatcmpl-1" });
	});
});
