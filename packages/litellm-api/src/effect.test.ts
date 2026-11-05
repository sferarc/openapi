import { Cause, Effect, Exit } from "effect";
import { assert, describe, expect, it } from "vitest";
import { ApiError, ApiService, makeApiLayer, NetworkError } from "./effect";

type FetchImpl = (url: string, init?: any) => Promise<any>;

const layer = (fetchImpl: FetchImpl) =>
	makeApiLayer({ baseUrl: "http://localhost:4000/", token: "sk-master", fetchImpl });

describe("effect bindings", () => {
	it("send the request to the layer's baseUrl with its token", async () => {
		const requests: [string, Record<string, string>][] = [];
		const fetchImpl: FetchImpl = async (url, init) => {
			requests.push([url, init.headers]);
			return new Response('{"routes":[]}', { headers: { "content-type": "application/json" } });
		};

		const result = await Effect.runPromise(
			ApiService.default.getRoutesRoutesGet().pipe(Effect.provide(layer(fetchImpl))),
		);

		expect(result).toEqual({ routes: [] });
		expect(requests).toEqual([
			[
				"http://localhost:4000/routes",
				expect.objectContaining({ Authorization: "Bearer sk-master" }),
			],
		]);
	});

	it("fail with ApiError carrying the HTTP status", async () => {
		const fetchImpl = async () =>
			new Response('{"error":{"message":"Invalid proxy server token"}}', {
				status: 401,
				headers: { "content-type": "application/json" },
			});

		const error = await Effect.runPromise(
			Effect.flip(ApiService.default.getRoutesRoutesGet()).pipe(Effect.provide(layer(fetchImpl))),
		);

		assert(error instanceof ApiError);
		expect(error.status).toBe(401);
	});

	it("fail with NetworkError when the request never completes", async () => {
		const fetchImpl = async () => {
			throw new TypeError("fetch failed");
		};

		const error = await Effect.runPromise(
			Effect.flip(ApiService.default.getRoutesRoutesGet()).pipe(Effect.provide(layer(fetchImpl))),
		);

		expect(error).toBeInstanceOf(NetworkError);
	});

	it("pass a call's onResponse the LiteLLM response headers", async () => {
		let modelId: string | null = null;
		const program = ApiService.default.getRoutesRoutesGet({
			config: { onResponse: ({ headers }) => (modelId = headers.get("x-litellm-model-id")) },
		});
		const fetchImpl = async () =>
			new Response("{}", {
				headers: { "content-type": "application/json", "x-litellm-model-id": "abc" },
			});

		await Effect.runPromise(program.pipe(Effect.provide(layer(fetchImpl))));

		expect(modelId).toBe("abc");
	});

	it("die with the error an onResponse hook threw", async () => {
		const thrown = new Error("no model id");
		const program = ApiService.default.getRoutesRoutesGet({
			config: {
				onResponse: () => {
					throw thrown;
				},
			},
		});

		const exit = await Effect.runPromise(
			Effect.exit(program).pipe(Effect.provide(layer(async () => new Response("{}")))),
		);

		assert(Exit.isFailure(exit));
		expect(Cause.hasFails(exit.cause)).toBe(false);
		const defect = Cause.squash(exit.cause);
		assert(defect instanceof Error);
		expect(defect.cause).toBe(thrown);
	});
});
