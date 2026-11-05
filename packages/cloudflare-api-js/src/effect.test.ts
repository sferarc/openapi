import { Cause, Effect, Exit } from "effect";
import { assert, describe, expect, it } from "vitest";
import { ApiError, ApiService, effectByPath, makeApiLayer, NetworkError } from "./effect";

type FetchImpl = (url: string, init?: any) => Promise<any>;

const json = (body: string, status = 200) =>
	new Response(body, { status, headers: { "content-type": "application/json" } });

const layer = (fetchImpl: FetchImpl) => makeApiLayer({ token: "cf-token", fetchImpl });

describe("effect bindings", () => {
	it("send the request to the Cloudflare API with the layer's token", async () => {
		const requests: [string, Record<string, string>][] = [];
		const fetchImpl: FetchImpl = async (url, init) => {
			requests.push([url, init.headers]);
			return json('{"success":true,"result":[]}');
		};

		const result = await Effect.runPromise(
			ApiService.accounts.accountsListAccounts().pipe(Effect.provide(layer(fetchImpl))),
		);

		expect(result).toEqual({ success: true, result: [] });
		expect(requests).toEqual([
			[
				"https://api.cloudflare.com/client/v4/accounts",
				expect.objectContaining({ Authorization: "Bearer cf-token" }),
			],
		]);
	});

	it("send the Global API Key from the layer's headers without a token", async () => {
		const requests: Record<string, string>[] = [];
		const fetchImpl: FetchImpl = async (_url, init) => {
			requests.push(init.headers);
			return json('{"success":true,"result":{}}');
		};
		const keyLayer = makeApiLayer({
			headers: { "X-Auth-Key": "global-key", "X-Auth-Email": "admin@example.com" },
			fetchImpl,
		});

		await Effect.runPromise(effectByPath["GET /user"]().pipe(Effect.provide(keyLayer)));

		expect(requests).toEqual([
			expect.objectContaining({ "X-Auth-Key": "global-key", "X-Auth-Email": "admin@example.com" }),
		]);
		expect(requests[0]).not.toHaveProperty("Authorization");
	});

	it("fail with ApiError carrying the HTTP status", async () => {
		const fetchImpl = async () =>
			json('{"success":false,"errors":[{"code":10000,"message":"Authentication error"}]}', 403);

		const error = await Effect.runPromise(
			Effect.flip(ApiService.accounts.accountsListAccounts()).pipe(
				Effect.provide(layer(fetchImpl)),
			),
		);

		assert(error instanceof ApiError);
		expect(error.status).toBe(403);
		expect(error.message).toBe("API error 403: Authentication error");
	});

	it("fail with NetworkError when the request never completes", async () => {
		const fetchImpl = async () => {
			throw new TypeError("fetch failed");
		};

		const error = await Effect.runPromise(
			Effect.flip(ApiService.accounts.accountsListAccounts()).pipe(
				Effect.provide(layer(fetchImpl)),
			),
		);

		expect(error).toBeInstanceOf(NetworkError);
	});

	it("pass a call's onResponse the response headers", async () => {
		let etag: string | null = null;
		const program = ApiService.accounts.accountsListAccounts({
			config: { onResponse: ({ headers }) => (etag = headers.get("ETag")) },
		});
		const fetchImpl = async () =>
			new Response("{}", { headers: { "content-type": "application/json", ETag: '"3"' } });

		await Effect.runPromise(program.pipe(Effect.provide(layer(fetchImpl))));

		expect(etag).toBe('"3"');
	});

	it("die with the error an onResponse hook threw", async () => {
		const thrown = new Error("no etag");
		const program = ApiService.accounts.accountsListAccounts({
			config: {
				onResponse: () => {
					throw thrown;
				},
			},
		});

		const exit = await Effect.runPromise(
			Effect.exit(program).pipe(Effect.provide(layer(async () => json("{}")))),
		);

		assert(Exit.isFailure(exit));
		expect(Cause.hasFails(exit.cause)).toBe(false);
		const defect = Cause.squash(exit.cause);
		assert(defect instanceof Error);
		expect(defect.cause).toBe(thrown);
	});
});
