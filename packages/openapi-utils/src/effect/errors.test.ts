import { describe, expect, it } from "vitest";
import { ApiError, NetworkError } from "./errors";

describe("ApiError.message", () => {
	it.each([
		["a top-level message", { message: "x" }],
		["a nested error message", { error: { code: "forbidden", message: "x" } }],
		["an error string", { error: "x" }],
		["the first of errors[]", { errors: [{ code: 10000, message: "x" }, { message: "y" }] }],
		["a text body", "x"],
	])("surfaces %s from the fetcher payload", (_, payload) => {
		const error = new ApiError({ status: 400, error: { status: 400, payload } });
		expect(error.message).toBe("API error 400: x");
	});

	it("reads an unwrapped body with its own status", () => {
		const error = new ApiError({
			status: 400,
			error: { status: 400, requestId: "r1", error: "x" },
		});
		expect(error.message).toBe("API error 400: x");
	});

	it("includes the status and the message of a 403", () => {
		const error = new ApiError({
			status: 403,
			error: { status: 403, payload: { message: "nope" } },
		});
		expect(error.message).toContain("403");
		expect(error.message).toContain("nope");
		expect(error.status).toBe(403);
		expect(error.error).toEqual({ status: 403, payload: { message: "nope" } });
	});

	it.each([
		["an empty object", {}],
		["an empty text body", "  "],
		["null", null],
		["a non-string message", { message: 42 }],
		["an empty errors array", { errors: [] }],
	])("falls back to the status for %s", (_, payload) => {
		expect(new ApiError({ status: 500, error: { status: 500, payload } }).message).toBe(
			"API Error: 500",
		);
	});
});

describe("NetworkError.message", () => {
	it("reads the message of an Error", () => {
		expect(new NetworkError({ cause: new TypeError("fetch failed") }).message).toBe(
			"Network error: fetch failed",
		);
	});

	it("reads the message of a plain object", () => {
		expect(new NetworkError({ cause: { message: "fetch failed" } }).message).toContain(
			"fetch failed",
		);
	});

	it("falls back without a message", () => {
		expect(new NetworkError({ cause: 42 }).message).toBe("Network error");
	});
});
