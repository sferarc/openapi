import { Effect } from "effect";
import { ApiConfig, ApiError, NetworkError, ValidationError } from "./errors";

// ============================================================================
// Type System
// ============================================================================

export type EffectApi<Tags extends Record<string, Record<string, (...args: any[]) => any>>> = {
	[Tag in keyof Tags]: {
		[Op in keyof Tags[Tag]]: Tags[Tag][Op] extends (params: infer P) => Promise<infer R>
			? (
					params: Omit<P, "config">,
				) => Effect.Effect<R, ApiError | ValidationError | NetworkError, ApiConfig>
			: Tags[Tag][Op] extends () => Promise<infer R>
				? () => Effect.Effect<R, ApiError | ValidationError | NetworkError, ApiConfig>
				: never;
	};
};

export type EffectByPath<Paths extends Record<string, (...args: any[]) => any>> = {
	[K in keyof Paths]: Paths[K] extends (params: infer P) => Promise<infer R>
		? (
				params: Omit<P, "config">,
			) => Effect.Effect<R, ApiError | ValidationError | NetworkError, ApiConfig>
		: Paths[K] extends () => Promise<infer R>
			? () => Effect.Effect<R, ApiError | ValidationError | NetworkError, ApiConfig>
			: never;
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
