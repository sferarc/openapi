import { Effect, Layer } from "effect";
import { assert, describe, expect, it, vi } from "vitest";
import { ApiConfig, ApiError, NetworkError, ValidationError } from "./errors";
import { createEffectApi, createEffectByPath } from "./proxy";

type Params = { limit?: number; config: unknown };

const config = {
	token: "secret",
	baseUrl: "https://api.example.com",
	headers: { "x-extra": "1" },
	fetchImpl: async () => new Response(),
};

const run = <A, E>(effect: Effect.Effect<A, E, ApiConfig>) =>
	Effect.runPromise(effect.pipe(Effect.provide(Layer.succeed(ApiConfig, config))));

const failWith = (rejection: unknown) => {
	const api = createEffectByPath({
		"/thing": (_: Params): Promise<never> => Promise.reject(rejection),
	});
	return run(Effect.flip(api["/thing"]({})));
};

describe("createEffectApi", () => {
	it("passes the params and the ApiConfig service to the operation", async () => {
		const op = vi.fn(async (params: Params) => params);
		const api = createEffectApi({ projects: { list: op } });

		const result = await run(api.projects.list({ limit: 5 }));

		expect(result).toEqual({ limit: 5, config });
		expect(op).toHaveBeenCalledWith({ limit: 5, config });
	});

	it("calls an operation without params", async () => {
		const op = vi.fn(async (params: Params) => params);
		const api = createEffectApi({ projects: { list: op } });
		// The types require params, but JavaScript callers can omit them.
		const list = api.projects.list as () => ReturnType<typeof api.projects.list>;

		await run(list());

		expect(op).toHaveBeenCalledWith({ config });
	});

	it("returns undefined for an unknown tag or operation", () => {
		const api: Record<string, Record<string, unknown> | undefined> = createEffectApi({
			projects: { list: async () => null },
		});

		expect(api.missing).toBeUndefined();
		expect(api.projects?.missing).toBeUndefined();
	});
});

describe("createEffectByPath", () => {
	it("passes the params and the ApiConfig service to the operation", async () => {
		const op = vi.fn(async (params: Params) => params);
		const api = createEffectByPath({ "/projects": op });

		const result = await run(api["/projects"]({ limit: 5 }));

		expect(result).toEqual({ limit: 5, config });
	});

	it("returns undefined for an unknown endpoint", () => {
		const api: Record<string, unknown> = createEffectByPath({ "/projects": async () => null });

		expect(api["/missing"]).toBeUndefined();
	});
});

describe("error mapping", () => {
	it("maps a rejection with a status to ApiError", async () => {
		const rejection = { status: 403, payload: { error: { code: "forbidden" } } };
		const error = await failWith(rejection);

		assert(error instanceof ApiError);
		expect(error.status).toBe(403);
		expect(error.error).toBe(rejection);
		expect(error.message).toBe("API Error: 403");
	});

	it("maps a missing path parameter to ValidationError", async () => {
		const error = await failWith(new Error("Missing required path parameter: projectId"));

		assert(error instanceof ValidationError);
		expect(error.field).toBe("projectId");
	});

	it("maps any other rejection to NetworkError", async () => {
		const cause = new TypeError("fetch failed");
		const error = await failWith(cause);

		assert(error instanceof NetworkError);
		expect(error.cause).toBe(cause);
	});
});
