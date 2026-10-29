import { Effect } from "effect";
import { ApiConfig, ApiError, NetworkError, ValidationError } from "./errors";

// ============================================================================
// Type System
// ============================================================================

type RequiredKeys<T> = {
	[K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// The params argument is optional when the operation requires none of its fields, as in the Promise clients.
type EffectOperation<Op> = Op extends (params: infer P) => Promise<infer R>
	? Omit<NonNullable<P>, "config"> extends infer Params
		? [RequiredKeys<Params>] extends [never]
			? (params?: Params) => Effect.Effect<R, ApiError | ValidationError | NetworkError, ApiConfig>
			: (params: Params) => Effect.Effect<R, ApiError | ValidationError | NetworkError, ApiConfig>
		: never
	: never;

export type EffectApi<Tags extends Record<string, Record<string, (...args: any[]) => any>>> = {
	[Tag in keyof Tags]: {
		[Op in keyof Tags[Tag]]: EffectOperation<Tags[Tag][Op]>;
	};
};

export type EffectByPath<Paths extends Record<string, (...args: any[]) => any>> = {
	[K in keyof Paths]: EffectOperation<Paths[K]>;
};

// ============================================================================
// Error Conversion
// ============================================================================

function convertError(error: unknown): ApiError | NetworkError | ValidationError {
	if (error instanceof Error && error.message.includes("Missing required path parameter")) {
		const field = error.message.replace("Missing required path parameter: ", "");
		return new ValidationError({ field, reason: "Missing required path parameter" });
	}
	if (typeof error === "object" && error !== null && "status" in error) {
		return new ApiError({ status: (error as any).status, error });
	}
	return new NetworkError({ cause: error });
}

// ============================================================================
// Proxy Factories
// ============================================================================

function ownValue(target: object, key: string | symbol): any {
	return Object.hasOwn(target, key) ? (target as any)[key] : undefined;
}

function toEffect(op: (params: Record<string, unknown>) => Promise<unknown>) {
	return (params?: Record<string, unknown>) =>
		Effect.gen(function* () {
			const config = yield* ApiConfig;
			return yield* Effect.tryPromise({
				try: (signal) => op({ ...(params ?? {}), config: { ...config, signal } }),
				catch: convertError,
			});
		});
}

export function createEffectApi<
	Tags extends Record<string, Record<string, (...args: any[]) => any>>,
>(operationsByTag: Tags): EffectApi<Tags> {
	return new Proxy({} as any, {
		get: (_, tag: string | symbol) => {
			const tagOps = ownValue(operationsByTag, tag);
			if (!tagOps) return undefined;

			return new Proxy({} as any, {
				get: (_, operation: string | symbol) => {
					const op = ownValue(tagOps, operation);
					return op ? toEffect(op) : undefined;
				},
			});
		},
	});
}

export function createEffectByPath<Paths extends Record<string, (...args: any[]) => any>>(
	operationsByPath: Paths,
): EffectByPath<Paths> {
	return new Proxy({} as any, {
		get: (_, endpoint: string | symbol) => {
			const op = ownValue(operationsByPath, endpoint);
			return op ? toEffect(op) : undefined;
		},
	});
}
