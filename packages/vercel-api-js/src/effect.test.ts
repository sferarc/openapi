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
		expect(error.message).toContain("nope");
	});

	it("fail with NetworkError when the request never completes", async () => {
		const error = await run(async () => {
			throw new TypeError("fetch failed");
		});
		expect(error).toBeInstanceOf(NetworkError);
		expect((error as NetworkError).message).toBe(`Network error: ${endpoint} failed: fetch failed`);
	});

	it("pass a call's onResponse the headers of the registry upload response", async () => {
		const location = "/v2/team/project/repo/blobs/uploads/42";
		let received: string | null = null;
		const program = ApiService.vcr.createByTeamSlugByProjectSlugByRepositoryNameBlobsUploads({
			pathParams: { teamSlug: "team", projectSlug: "project", repositoryName: "repo" },
			config: { onResponse: ({ headers }) => (received = headers.get("Location")) },
		});
		const fetchImpl = async () =>
			new Response(null, { status: 202, headers: { Location: location } });

		await Effect.runPromise(program.pipe(Effect.provide(makeApiLayer({ fetchImpl }))));

		expect(received).toBe(location);
	});

	it("die with the error an onResponse hook threw", async () => {
		const thrown = new Error("no Location header");
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
		expect(defect.message).toMatch(/^onResponse threw on [A-Z]+ \/.*: no Location header$/);
		expect(defect.cause).toBe(thrown);
	});
});
