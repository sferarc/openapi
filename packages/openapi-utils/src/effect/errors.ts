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
		const message = errorMessage(this.error);
		return message ? `API error ${this.status}: ${message}` : `API Error: ${this.status}`;
	}
}

// Error bodies vary by API: `{ message }`, `{ error }`, `{ error: { message } }`, `{ errors: [{ message }] }` or text.
function errorMessage(value: unknown): string | undefined {
	if (isRecord(value) && "payload" in value) {
		const fromPayload = errorMessage(value.payload);
		if (fromPayload) return fromPayload;
	}
	if (typeof value === "string") return value.trim() || undefined;
	if (!isRecord(value)) return undefined;
	if (typeof value.message === "string" && value.message) return value.message;
	if ("error" in value) {
		const fromError = errorMessage(value.error);
		if (fromError) return fromError;
	}
	if (Array.isArray(value.errors)) return errorMessage(value.errors[0]);
	return undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
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
		if (isRecord(this.cause) && typeof this.cause.message === "string" && this.cause.message) {
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
type ApiConfigShape = {
	token?: string;
	baseUrl?: string;
	fetchImpl?: (url: string, init?: any) => Promise<any>;
	headers?: Record<string, string>;
};

export class ApiConfig extends Context.Service<ApiConfig, ApiConfigShape>()("ApiConfig") {}

/**
 * Create a Layer providing ApiConfig values.
 */
export const makeApiLayer = (config: ApiConfigShape): Layer.Layer<ApiConfig> =>
	Layer.succeed(ApiConfig, config);
