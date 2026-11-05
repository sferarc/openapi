import { Cause, Effect, Exit, Layer } from "effect";
import { assert, describe, expect, it } from "vitest";
import { operationsByPath } from "./components";
import {
	ApiConfig,
	ApiError,
	ApiService,
	effectByPath,
	makeApiLayer,
	NetworkError,
} from "./effect";

const endpoint = Object.keys(operationsByPath).find((key) => !key.includes("{"));
if (!endpoint) throw new Error("expected an operation without path parameters");

type Operation = (params: object) => Effect.Effect<unknown, ApiError | NetworkError, ApiConfig>;
const operation = (effectByPath as unknown as Record<string, Operation>)[endpoint];

const run = (fetchImpl: (url: string, init?: any) => Promise<any>) =>
	Effect.runPromise(
		Effect.flip(operation({})).pipe(Effect.provide(Layer.succeed(ApiConfig, { fetchImpl }))),
	);

describe("effect bindings", () => {
	it("fail with ApiError carrying the HTTP status", async () => {
		const error = await run(async () => new Response('{"message":"nope"}', { status: 403 }));
		expect(error).toBeInstanceOf(ApiError);
		expect((error as ApiError).status).toBe(403);
	});

	it("fail with NetworkError when the request never completes", async () => {
		const error = await run(async () => {
			throw new TypeError("fetch failed");
		});
		expect(error).toBeInstanceOf(NetworkError);
	});

	it("send the request to the layer's baseUrl", async () => {
		let requested = "";
		const fetchImpl = async (url: string) => {
			requested = url;
			return new Response("{}", { headers: { "content-type": "application/json" } });
		};
		await Effect.runPromise(
			operation({}).pipe(
				Effect.provide(Layer.succeed(ApiConfig, { fetchImpl, baseUrl: "https://proxy.test/" })),
			),
		);
		expect(requested.startsWith("https://proxy.test/")).toBe(true);
		expect(requested).not.toContain("proxy.test//");
	});

	it("send the token a layer's token function returns on every call", async () => {
		const sent: (string | null)[] = [];
		let count = 0;
		const fetchImpl = async (_: string, init?: { headers?: Record<string, string> }) => {
			sent.push(init?.headers?.Authorization ?? null);
			return new Response("{}", { headers: { "content-type": "application/json" } });
		};
		const layer = makeApiLayer({ fetchImpl, token: async () => `token-${++count}` });

		await Effect.runPromise(Effect.all([operation({}), operation({})]).pipe(Effect.provide(layer)));

		expect(sent).toEqual(["Bearer token-1", "Bearer token-2"]);
	});

	it("pass a call's onResponse the headers of a rate limited response", async () => {
		let received: [number, string | null] | undefined;
		const program = ApiService.archiving.listArchivedFiles({
			config: {
				onResponse: ({ status, headers }) => (received = [status, headers.get("Retry-After")]),
			},
		});
		const fetchImpl = async () =>
			new Response("{}", {
				status: 429,
				headers: { "content-type": "application/json", "Retry-After": "30" },
			});

		const error = await Effect.runPromise(
			Effect.flip(program).pipe(Effect.provide(makeApiLayer({ fetchImpl }))),
		);

		expect(error).toBeInstanceOf(ApiError);
		expect(received).toEqual([429, "30"]);
	});

	it("die with the error an onResponse hook threw", async () => {
		const thrown = new Error("no Retry-After");
		const program = operation({
			config: {
				onResponse: () => {
					throw thrown;
				},
			},
		});
		const exit = await Effect.runPromise(
			Effect.exit(program).pipe(
				Effect.provide(makeApiLayer({ fetchImpl: async () => new Response("{}") })),
			),
		);

		assert(Exit.isFailure(exit));
		expect(Cause.hasFails(exit.cause)).toBe(false);
		const defect = Cause.squash(exit.cause);
		assert(defect instanceof Error);
		expect(defect.message).toMatch(/^onResponse threw on [A-Z]+ \/.*: no Retry-After$/);
		expect(defect.cause).toBe(thrown);
	});
});
