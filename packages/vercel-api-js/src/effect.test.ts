import { Cause, Effect, Exit, Layer } from "effect";
import { assert, describe, expect, it } from "vitest";
import { operationsByPath } from "./components";
import { ApiConfig, ApiError, effectByPath, NetworkError } from "./effect";

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
		expect(error.message).toContain("nope");
	});

	it("fail with NetworkError when the request never completes", async () => {
		const error = await run(async () => {
			throw new TypeError("fetch failed");
		});
		expect(error).toBeInstanceOf(NetworkError);
		expect((error as NetworkError).message).toBe(`Network error: ${endpoint} failed: fetch failed`);
	});

	it("die with the error an onResponse hook threw", async () => {
		const thrown = new Error("no Location header");
		// ApiConfig declares no onResponse; the fetcher still reads it from the layer's config.
		const config = {
			fetchImpl: async () => new Response("{}"),
			onResponse: () => {
				throw thrown;
			},
		};
		const exit = await Effect.runPromise(
			Effect.exit(operation({})).pipe(Effect.provide(Layer.succeed(ApiConfig, config))),
		);

		assert(Exit.isFailure(exit));
		expect(Cause.hasFails(exit.cause)).toBe(false);
		const defect = Cause.squash(exit.cause);
		assert(defect instanceof Error);
		expect(defect.message).toMatch(/^onResponse threw on [A-Z]+ \/.*: no Location header$/);
		expect(defect.cause).toBe(thrown);
	});
});
