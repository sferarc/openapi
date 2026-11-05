import { Cause, Effect, Exit } from "effect";
import { assert, describe, expect, it } from "vitest";
import { AdminApiService, ApiError, adminEffectByPath, makeApiLayer, NetworkError } from "./effect";

type FetchImpl = (url: string, init?: any) => Promise<any>;

const json = (body: string, init?: ResponseInit) =>
	new Response(body, {
		...init,
		headers: { "content-type": "application/json", ...init?.headers },
	});

const layer = (fetchImpl: FetchImpl) =>
	makeApiLayer({ baseUrl: "https://keycloak.example.com/", token: "admin-token", fetchImpl });

describe("effect bindings", () => {
	it("send an admin request to the layer's baseUrl with its token", async () => {
		const requests: [string, Record<string, string>][] = [];
		const fetchImpl: FetchImpl = async (url, init) => {
			requests.push([url, init.headers]);
			return json('[{"realm":"master"}]');
		};

		const result = await Effect.runPromise(
			AdminApiService.realmsAdmin.gETAdminRealms().pipe(Effect.provide(layer(fetchImpl))),
		);

		expect(result).toEqual([{ realm: "master" }]);
		expect(requests).toEqual([
			[
				"https://keycloak.example.com/admin/realms",
				expect.objectContaining({ Authorization: "Bearer admin-token" }),
			],
		]);
	});

	it("reach an operation by path with its path params encoded", async () => {
		const urls: string[] = [];
		const fetchImpl: FetchImpl = async (url) => {
			urls.push(url);
			return json('{"realm":"my realm"}');
		};

		await Effect.runPromise(
			adminEffectByPath["GET /admin/realms/{realm}"]({ pathParams: { realm: "my realm" } }).pipe(
				Effect.provide(layer(fetchImpl)),
			),
		);

		expect(urls).toEqual(["https://keycloak.example.com/admin/realms/my%20realm"]);
	});

	it("ask a token function for the current token on every call", async () => {
		let issued = 0;
		const authorizations: string[] = [];
		const fetchImpl: FetchImpl = async (_url, init) => {
			authorizations.push(init.headers.Authorization);
			return json("[]");
		};
		const refreshing = makeApiLayer({
			baseUrl: "https://keycloak.example.com",
			token: async () => `token-${++issued}`,
			fetchImpl,
		});

		const call = AdminApiService.realmsAdmin.gETAdminRealms();
		await Effect.runPromise(Effect.andThen(call, call).pipe(Effect.provide(refreshing)));

		expect(authorizations).toEqual(["Bearer token-1", "Bearer token-2"]);
	});

	it("fail with ApiError carrying the HTTP status", async () => {
		const fetchImpl = async () => json('{"error":"HTTP 401 Unauthorized"}', { status: 401 });

		const error = await Effect.runPromise(
			Effect.flip(AdminApiService.realmsAdmin.gETAdminRealms()).pipe(
				Effect.provide(layer(fetchImpl)),
			),
		);

		assert(error instanceof ApiError);
		expect(error.status).toBe(401);
	});

	it("fail with NetworkError when the request never completes", async () => {
		const fetchImpl = async () => {
			throw new TypeError("fetch failed");
		};

		const error = await Effect.runPromise(
			Effect.flip(AdminApiService.realmsAdmin.gETAdminRealms()).pipe(
				Effect.provide(layer(fetchImpl)),
			),
		);

		expect(error).toBeInstanceOf(NetworkError);
	});

	it("pass a call's onResponse the Location of a created user", async () => {
		let location: string | null = null;
		const program = adminEffectByPath["POST /admin/realms/{realm}/users"]({
			pathParams: { realm: "master" },
			body: { username: "ada", enabled: true },
			config: { onResponse: ({ headers }) => (location = headers.get("Location")) },
		});
		const fetchImpl = async () =>
			new Response(null, {
				status: 201,
				headers: { Location: "https://keycloak.example.com/admin/realms/master/users/42" },
			});

		await Effect.runPromise(program.pipe(Effect.provide(layer(fetchImpl))));

		expect(location).toBe("https://keycloak.example.com/admin/realms/master/users/42");
	});

	it("die with the error an onResponse hook threw", async () => {
		const thrown = new Error("no Location");
		const program = AdminApiService.realmsAdmin.gETAdminRealms({
			config: {
				onResponse: () => {
					throw thrown;
				},
			},
		});

		const exit = await Effect.runPromise(
			Effect.exit(program).pipe(Effect.provide(layer(async () => json("[]")))),
		);

		assert(Exit.isFailure(exit));
		expect(Cause.hasFails(exit.cause)).toBe(false);
		const defect = Cause.squash(exit.cause);
		assert(defect instanceof Error);
		expect(defect.cause).toBe(thrown);
	});
});
