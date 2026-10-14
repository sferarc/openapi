import { Context, Data, Layer } from "effect";

// ============================================================================
// Error Types
// ============================================================================

/**
 * Validation error for client-side input validation failures.
 * Use this for missing required parameters or invalid input formats.
 */
export class ValidationError extends Data.TaggedError("ValidationError")<{
	readonly field: string;
	readonly reason: string;
}> {
	override get message(): string {
		return `Validation error for '${this.field}': ${this.reason}`;
	}
}

/**
 * API error with status code and error payload.
 * Uses Effect's Data.TaggedError for pattern matching support.
 */
export class ApiError extends Data.TaggedError("ApiError")<{
	readonly status: number;
	readonly error: unknown;
}> {
	override get message(): string {
		const payload =
			this.error && typeof this.error === "object" && "payload" in this.error
				? this.error.payload
				: undefined;
		return messageOf(this.error) ?? messageOf(payload) ?? `API Error: ${this.status}`;
	}
}

// Error bodies vary by API: `{ message }`, `{ error: "..." }`, `{ error: { message } }` or plain text.
function messageOf(value: unknown): string | undefined {
	if (typeof value === "string") return value || undefined;
	if (!value || typeof value !== "object") return undefined;
	if ("message" in value && typeof value.message === "string" && value.message)
		return value.message;
	if ("error" in value) return messageOf(value.error);
	return undefined;
}

/**
 * Network error for fetch failures (timeouts, DNS errors, etc).
 */
export class NetworkError extends Data.TaggedError("NetworkError")<{
	readonly cause: unknown;
}> {
	override get message(): string {
		if (this.cause instanceof Error) {
			return `Network error: ${this.cause.message}`;
		}
		return "Network error";
	}
}

// ============================================================================
// ApiConfig: service key for proxy-based Effect APIs
// ============================================================================

/**
 * Effect service key for API configuration.
 * Used by the proxy-based Effect API to inject config into operations.
 */
export class ApiConfig extends Context.Service<
	ApiConfig,
	{
		token?: string;
		baseUrl?: string;
		fetchImpl?: (url: string, init?: any) => Promise<any>;
		headers?: Record<string, string>;
	}
>()("ApiConfig") {}

/**
 * Create a Layer providing ApiConfig values.
 */
export const makeApiLayer = (config: {
	token?: string;
	baseUrl?: string;
	headers?: Record<string, string>;
}): Layer.Layer<ApiConfig> => Layer.succeed(ApiConfig, config);
