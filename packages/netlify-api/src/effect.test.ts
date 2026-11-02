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

	it("pass a call's onResponse the Link header of a list", async () => {
		const link = '<https://api.netlify.com/api/v1/sites?page=2>; rel="next"';
		let received: string | null = null;
		const program = ApiService.site.listSites({
			queryParams: { per_page: 1 },
			config: { onResponse: ({ headers }) => (received = headers.get("Link")) },
		});
		const fetchImpl = async () =>
			new Response("[]", { headers: { "content-type": "application/json", Link: link } });

		await Effect.runPromise(program.pipe(Effect.provide(makeApiLayer({ fetchImpl }))));

		expect(received).toBe(link);
	});

	it("die with the error an onResponse hook threw", async () => {
		const thrown = new Error("no Link header");
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
		expect(defect.message).toMatch(/^onResponse threw on [A-Z]+ \/.*: no Link header$/);
		expect(defect.cause).toBe(thrown);
	});
});
