import { Cause, Duration, Effect, Exit, Layer } from "effect";
import { assert, describe, expect, it, vi } from "vitest";
import {
	ApiConfig,
	ApiError,
	type ApiToken,
	makeApiLayer,
	NetworkError,
	ValidationError,
} from "./errors";
import { createEffectApi, createEffectByPath } from "./proxy";

type Params = { limit?: number; config: unknown };

const config = {
	token: "secret",
	baseUrl: "https://api.example.com",
	headers: { "x-extra": "1" },
	fetchImpl: async () => new Response(),
};

const withSignal = { ...config, signal: expect.any(AbortSignal) };

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

		expect(result).toEqual({ limit: 5, config: withSignal });
		expect(op).toHaveBeenCalledWith({ limit: 5, config: withSignal });
	});

	it("calls an operation without params", async () => {
		const op = vi.fn(async (params: Params) => params);
		const api = createEffectApi({ projects: { list: op } });

		await run(api.projects.list());

		expect(op).toHaveBeenCalledWith({ config: withSignal });
	});

	it("returns undefined for an unknown tag or operation", () => {
		const api: Record<string, Record<string, unknown> | undefined> = createEffectApi({
			projects: { list: async () => null },
		});

		expect(api.missing).toBeUndefined();
		expect(api.projects?.missing).toBeUndefined();
	});

	it("returns undefined for Object.prototype keys", () => {
		const api: Record<string, Record<string, unknown> | undefined> = createEffectApi({
			projects: { list: async () => null },
		});

		expect(api.constructor).toBeUndefined();
		expect(api.toString).toBeUndefined();
		expect(api.projects?.constructor).toBeUndefined();
		expect(api.projects?.hasOwnProperty).toBeUndefined();
	});
});

describe("createEffectByPath", () => {
	it("passes the params and the ApiConfig service to the operation", async () => {
		const op = vi.fn(async (params: Params) => params);
		const api = createEffectByPath({ "/projects": op });

		const result = await run(api["/projects"]({ limit: 5 }));

		expect(result).toEqual({ limit: 5, config: withSignal });
	});

	it("returns undefined for an unknown endpoint", () => {
		const api: Record<string, unknown> = createEffectByPath({ "/projects": async () => null });

		expect(api["/missing"]).toBeUndefined();
		expect(api.constructor).toBeUndefined();
		expect(api.toString).toBeUndefined();
	});
});

describe("call config", () => {
	it("layers a call's config over the ApiConfig service and joins their headers", async () => {
		const op = vi.fn(async (params: Params) => params);
		const onResponse = () => {};
		const api = createEffectApi({ projects: { list: op } });

		await run(
			api.projects.list({ config: { token: "call", headers: { "x-call": "2" }, onResponse } }),
		);

		expect(op).toHaveBeenCalledWith({
			config: {
				...withSignal,
				token: "call",
				headers: { "x-extra": "1", "x-call": "2" },
				onResponse,
			},
		});
	});

	it("passes the effect's signal, not one the call config carries", async () => {
		const op = vi.fn(async (params: Params) => params);
		const api = createEffectByPath({ "/projects": op });
		const callSignal = new AbortController().signal;

		await run(api["/projects"]({ config: { signal: callSignal } }));

		expect(op).toHaveBeenCalledWith({ config: withSignal });
		expect(op).not.toHaveBeenCalledWith({ config: { ...config, signal: callSignal } });
	});

	it("types the call config from the operation, without its signal", () => {
		type Config = { onResponse?: (response: { status: number }) => void; signal?: AbortSignal };
		const op = async (_: { limit?: number; config?: Config } = {}) => null;
		const api = createEffectApi({ projects: { list: op } });
		const byPath = createEffectByPath({ "/projects": op });
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			api.projects.list({ config: { onResponse: ({ status }) => void status } }),
			byPath["/projects"]({ config: { onResponse: ({ status }) => void status } }),
			// @ts-expect-error onResponse gets the response, not a string
			api.projects.list({ config: { onResponse: (_: string) => {} } }),
			// @ts-expect-error the effect owns the signal
			byPath["/projects"]({ config: { signal: new AbortController().signal } }),
		];
		expect(typeChecks).toBeTypeOf("function");
	});
});

describe("param types", () => {
	it("keeps the params of an operation whose params argument is optional", () => {
		// Generated operations default their params to {}, so Parameters gives `params | undefined`.
		const op = async ({ limit }: { limit?: number; config?: unknown } = {}) => limit;
		const api = createEffectApi({ projects: { list: op } });
		const byPath = createEffectByPath({ "/projects": op });
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			// @ts-expect-error limit is a number
			api.projects.list({ limit: "5" }),
			// @ts-expect-error limit is a number
			byPath["/projects"]({ limit: "5" }),
		];
		expect(typeChecks).toBeTypeOf("function");
	});

	it("makes params optional only when the operation requires none", () => {
		const list = async (_: { limit?: number; config?: unknown } = {}) => null;
		const get = async (_: { pathParams: { id: string }; config?: unknown }) => null;
		const api = createEffectApi({ projects: { list, get } });
		const byPath = createEffectByPath({ "/projects": list, "/projects/{id}": get });
		const typeChecks = () => [
			api.projects.list(),
			byPath["/projects"](),
			// @ts-expect-error pathParams is required
			api.projects.get(),
			// @ts-expect-error pathParams is required
			byPath["/projects/{id}"](),
		];
		expect(typeChecks).toBeTypeOf("function");
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

	it("maps an Error with a status to ApiError even when the vendor text names a missing parameter", async () => {
		const payload = "Missing required path parameter: id";
		const rejection = Object.assign(new Error(`GET /projects/{id} returned 400: ${payload}`), {
			status: 400,
			payload,
		});
		const error = await failWith(rejection);

		assert(error instanceof ApiError);
		expect(error.status).toBe(400);
		expect(error.error).toBe(rejection);
		expect(error.message).toBe(`API error 400: ${payload}`);
	});

	it("maps a missing path parameter to ValidationError", async () => {
		const error = await failWith(new Error("Missing required path parameter: projectId"));

		assert(error instanceof ValidationError);
		expect(error.field).toBe("projectId");
	});

	it("dies with the error an onResponse hook threw instead of failing with NetworkError", async () => {
		const thrown = new Error("no Location header");
		const rejection = new Error("onResponse threw on POST /thing: no Location header", {
			cause: thrown,
		});
		const api = createEffectByPath({
			"/thing": (_: Params): Promise<never> => Promise.reject(rejection),
		});

		const exit = await run(Effect.exit(api["/thing"]({})));

		assert(Exit.isFailure(exit));
		expect(Cause.hasFails(exit.cause)).toBe(false);
		expect(Cause.squash(exit.cause)).toBe(rejection);
	});

	it("maps any other rejection to NetworkError", async () => {
		const cause = new TypeError("fetch failed");
		const error = await failWith(cause);

		assert(error instanceof NetworkError);
		expect(error.cause).toBe(cause);
	});
});

describe("interruption", () => {
	// Mimics a fetch that settles only when its signal aborts.
	const hangingOp = (received: AbortSignal[]) => (params: { config: { signal: AbortSignal } }) =>
		new Promise<never>((_, reject) => {
			received.push(params.config.signal);
			params.config.signal.addEventListener("abort", () => reject(params.config.signal.reason));
		});

	it("aborts the request signal when createEffectApi times out", async () => {
		const received: AbortSignal[] = [];
		const api = createEffectApi({ projects: { list: hangingOp(received) } });

		const result = await run(
			Effect.flip(api.projects.list({}).pipe(Effect.timeout(Duration.millis(10)))),
		);

		expect(result._tag).toBe("TimeoutError");
		expect(received).toHaveLength(1);
		expect(received[0]?.aborted).toBe(true);
	});

	it("aborts the request signal when createEffectByPath times out", async () => {
		const received: AbortSignal[] = [];
		const api = createEffectByPath({ "/projects": hangingOp(received) });

		await run(Effect.flip(api["/projects"]({}).pipe(Effect.timeout(Duration.millis(10)))));

		expect(received[0]?.aborted).toBe(true);
	});
});

describe("makeApiLayer", () => {
	it("provides fetchImpl to the operation", async () => {
		const fetchImpl = vi.fn(async () => new Response());
		const op = vi.fn(
			async (params: { config: { fetchImpl?: unknown } }) => params.config.fetchImpl,
		);
		const api = createEffectByPath({ "/projects": op });

		const result = await Effect.runPromise(
			api["/projects"]({}).pipe(Effect.provide(makeApiLayer({ token: "secret", fetchImpl }))),
		);

		expect(result).toBe(fetchImpl);
	});
});

describe("token function", () => {
	const tokenOp = () =>
		vi.fn(async (params: { config: { token?: unknown } }) => params.config.token);
	const withToken = (token: ApiToken) =>
		makeApiLayer({ token, fetchImpl: async () => new Response() });

	it("asks a function for the token before every call", async () => {
		let count = 0;
		const op = tokenOp();
		const api = createEffectByPath({ "/projects": op });
		const program = Effect.all([api["/projects"](), api["/projects"]()]);

		const tokens = await Effect.runPromise(
			program.pipe(Effect.provide(withToken(() => `token-${++count}`))),
		);

		expect(tokens).toEqual(["token-1", "token-2"]);
	});

	it("awaits a function that returns a promise", async () => {
		const api = createEffectApi({ projects: { list: tokenOp() } });

		const token = await Effect.runPromise(
			api.projects.list().pipe(Effect.provide(withToken(async () => "fresh"))),
		);

		expect(token).toBe("fresh");
	});

	it("passes a fixed token as before", async () => {
		const api = createEffectByPath({ "/projects": tokenOp() });

		const token = await Effect.runPromise(
			api["/projects"]().pipe(Effect.provide(withToken("fixed"))),
		);

		expect(token).toBe("fixed");
	});

	it("uses a call's own token without asking the layer's function", async () => {
		const getToken = vi.fn(() => "layer");
		const api = createEffectByPath({ "/projects": tokenOp() });

		const token = await Effect.runPromise(
			api["/projects"]({ config: { token: "call" } }).pipe(Effect.provide(withToken(getToken))),
		);

		expect(token).toBe("call");
		expect(getToken).not.toHaveBeenCalled();
	});

	it("fails with NetworkError, not a defect, when the function throws", async () => {
		const cause = new Error("refresh failed");
		const op = tokenOp();
		const api = createEffectByPath({ "/projects": op });
		const getToken = () => {
			throw cause;
		};

		const error = await Effect.runPromise(
			Effect.flip(api["/projects"]()).pipe(Effect.provide(withToken(getToken))),
		);

		assert(error instanceof NetworkError);
		expect(error.cause).toBe(cause);
		expect(op).not.toHaveBeenCalled();
	});

	it("fails with ApiError when the function rejects with an HTTP status", async () => {
		const rejection = { status: 401, payload: { error: "invalid_grant" } };
		const api = createEffectByPath({ "/projects": tokenOp() });

		const error = await Effect.runPromise(
			Effect.flip(api["/projects"]()).pipe(
				Effect.provide(withToken(() => Promise.reject(rejection))),
			),
		);

		assert(error instanceof ApiError);
		expect(error.status).toBe(401);
	});

	it("lets a timeout end a call whose token function never settles", async () => {
		const op = tokenOp();
		const api = createEffectByPath({ "/projects": op });
		const program = api["/projects"]().pipe(Effect.timeout(Duration.millis(10)));

		const error = await Effect.runPromise(
			Effect.flip(program).pipe(Effect.provide(withToken(() => new Promise<string>(() => {})))),
		);

		expect(error._tag).toBe("TimeoutError");
		expect(op).not.toHaveBeenCalled();
	});

	it("types the token function", () => {
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			makeApiLayer({ token: () => "sync" }),
			makeApiLayer({ token: async () => "async" }),
			// @ts-expect-error the function returns the token string
			makeApiLayer({ token: () => 42 }),
		];
		expect(typeChecks).toBeTypeOf("function");
	});
});
