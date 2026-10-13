import type { OpenAPIObject } from "openapi3-ts/oas30";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
	addMissingPathParams,
	camelCasePathParams,
	camelCaseProperties,
	cleanOperationIds,
	fetchSpec,
	fixArrayItems,
	fixRegexPatterns,
	fixUnionConstraints,
	renameReservedWords,
	sanitizeEnumValues,
} from "./spec-transforms";

function spec(paths: Record<string, unknown>, extra: Record<string, unknown> = {}): OpenAPIObject {
	return {
		openapi: "3.0.0",
		info: { title: "Test", version: "1.0.0" },
		paths,
		...extra,
	} as OpenAPIObject;
}

describe("fetchSpec", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	function stubFetch(body: unknown, status = 200) {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response(JSON.stringify(body), { status })),
		);
	}

	it("throws with the url and status on a non-OK response", async () => {
		stubFetch({ error: "unavailable" }, 503);
		await expect(fetchSpec("https://example.com/spec.json")).rejects.toThrow(
			/https:\/\/example\.com\/spec\.json.*503/,
		);
	});

	it("throws when the body has no paths", async () => {
		stubFetch({ openapi: "3.0.0", error: "rate limited" });
		await expect(fetchSpec("https://example.com/spec.json")).rejects.toThrow(
			/not an OpenAPI document/,
		);
	});

	it("throws when paths is empty or the version field is missing", async () => {
		stubFetch({ openapi: "3.0.0", paths: {} });
		await expect(fetchSpec("https://example.com/spec.json")).rejects.toThrow();
		stubFetch({ paths: { "/a": {} } });
		await expect(fetchSpec("https://example.com/spec.json")).rejects.toThrow();
	});

	it("returns the document on success", async () => {
		const document = spec({ "/users": { get: {} } });
		stubFetch(document);
		await expect(fetchSpec("https://example.com/spec.json")).resolves.toEqual(document);
	});

	it("accepts swagger 2 documents", async () => {
		const document = { swagger: "2.0", paths: { "/users": { get: {} } } };
		stubFetch(document);
		await expect(fetchSpec("https://example.com/spec.json")).resolves.toEqual(document);
	});
});

describe("cleanOperationIds", () => {
	it("camelCases existing operation ids", () => {
		const result = cleanOperationIds(spec({ "/users": { get: { operationId: "list-users" } } }));
		expect((result.paths["/users"] as any).get.operationId).toBe("listUsers");
	});

	it("uses hardcodedOperationIds for operations without an id", () => {
		const result = cleanOperationIds(spec({ "/users/{id}": { delete: {} } }), {
			hardcodedOperationIds: { "DELETE /users/{id}": "remove_user" },
		});
		expect((result.paths["/users/{id}"] as any).delete.operationId).toBe("removeUser");
	});

	it("deletes head operations only with deleteHead", () => {
		const kept = cleanOperationIds(spec({ "/users": { get: {}, head: {} } }));
		expect((kept.paths["/users"] as any).head).toEqual({});

		const removed = cleanOperationIds(spec({ "/users": { get: {}, head: {} } }), {
			deleteHead: true,
		});
		expect((removed.paths["/users"] as any).head).toBeUndefined();
		expect((removed.paths["/users"] as any).get).toBeDefined();
	});
});

describe("addMissingPathParams", () => {
	it("adds a missing path param and forces required on an existing one", () => {
		const result = addMissingPathParams(
			spec({
				"/orgs/{org}/users/{id}": {
					get: { parameters: [{ name: "org", in: "path", required: false }] },
				},
			}),
		);
		const parameters = (result.paths["/orgs/{org}/users/{id}"] as any).get.parameters;
		expect(parameters).toEqual([
			{ name: "org", in: "path", required: true },
			{ name: "id", in: "path", required: true, schema: { type: "string" } },
		]);
	});
});

describe("fixArrayItems", () => {
	it("gives arrays without items a string item schema", () => {
		const result = fixArrayItems(
			spec(
				{},
				{
					components: {
						schemas: {
							Missing: { type: "array" },
							Empty: { type: "array", items: {} },
							Typed: { type: "array", items: { type: "number" } },
						},
					},
				},
			),
		);
		const schemas = (result.components as any).schemas;
		expect(schemas.Missing.items).toEqual({ type: "string" });
		expect(schemas.Empty.items).toEqual({ type: "string" });
		expect(schemas.Typed.items).toEqual({ type: "number" });
	});
});

describe("fixUnionConstraints", () => {
	it("moves maxLength and maxItems from a oneOf onto its members", () => {
		const result = fixUnionConstraints({
			a: { oneOf: [{ type: "string" }, { type: "number" }], maxLength: 10 },
			b: [{ oneOf: [{ type: "array" }], maxItems: 3 }],
		});
		expect(result.a).toEqual({
			oneOf: [
				{ type: "string", maxLength: 10 },
				{ type: "number", maxLength: 10 },
			],
		});
		expect(result.b).toEqual([{ oneOf: [{ type: "array", maxItems: 3 }] }]);
	});
});

describe("sanitizeEnumValues", () => {
	it("drops string values that start with a digit and removes an emptied enum", () => {
		const result = sanitizeEnumValues(
			spec(
				{},
				{
					components: {
						schemas: {
							Mixed: { type: "string", enum: ["1x", "valid", "_ok", "$ok"] },
							Numbers: { type: "string", enum: ["1", "2"] },
							Numeric: { type: "number", enum: [1, 2] },
						},
					},
				},
			),
		);
		const schemas = (result.components as any).schemas;
		expect(schemas.Mixed.enum).toEqual(["valid", "_ok", "$ok"]);
		expect(schemas.Numbers).toEqual({ type: "string" });
		expect(schemas.Numeric.enum).toEqual([1, 2]);
	});
});

describe("camelCasePathParams", () => {
	it("renames the path key and path params at every level", () => {
		const result = camelCasePathParams(
			spec(
				{
					"/projects/{project_id}": {
						parameters: [{ name: "project_id", in: "path" }],
						get: {
							parameters: [
								{ name: "project_id", in: "path" },
								{ name: "page_size", in: "query" },
							],
						},
					},
				},
				{ components: { parameters: { Team: { name: "team_id", in: "path" } } } },
			),
		);
		expect(result.paths["/projects/{project_id}"]).toBeUndefined();
		const pathItem = result.paths["/projects/{projectId}"] as any;
		expect(pathItem.parameters[0].name).toBe("projectId");
		expect(pathItem.get.parameters[0].name).toBe("projectId");
		expect(pathItem.get.parameters[1].name).toBe("page_size");
		expect((result.components as any).parameters.Team.name).toBe("teamId");
	});
});

describe("renameReservedWords", () => {
	it("renames reserved path params in the key and operation params", () => {
		const result = renameReservedWords(
			spec({
				"/items/{default}": {
					get: { parameters: [{ name: "default", in: "path" }] },
				},
			}),
		);
		expect(result.paths["/items/{default}"]).toBeUndefined();
		expect((result.paths["/items/{_default}"] as any).get.parameters[0].name).toBe("_default");
	});

	it("renames reserved path params declared at the path-item level", () => {
		const result = renameReservedWords(
			spec({
				"/items/{class}/{id}": {
					parameters: [
						{ name: "class", in: "path" },
						{ name: "id", in: "path" },
					],
					get: {},
				},
			}),
		);
		const pathItem = result.paths["/items/{_class}/{id}"] as any;
		expect(pathItem.parameters.map((p: any) => p.name)).toEqual(["_class", "id"]);
	});

	it("leaves non-reserved params alone", () => {
		const document = spec({ "/items/{id}": { get: {} } });
		expect(Object.keys(renameReservedWords(document).paths)).toEqual(["/items/{id}"]);
	});
});

describe("fixRegexPatterns", () => {
	function patternOf(pattern: string): string | undefined {
		const result = fixRegexPatterns(
			spec({}, { components: { schemas: { S: { type: "string", pattern } } } }),
		);
		return (result.components as any).schemas.S.pattern;
	}

	it("rewrites a leading slash, escaped or not", () => {
		expect(patternOf("/foo")).toBe("[/]foo");
		expect(patternOf("\\/foo")).toBe("[/]foo");
	});

	it("rewrites a trailing slash escaped by an odd backslash run", () => {
		expect(patternOf("^foo\\/")).toBe("^foo[/]");
		expect(patternOf("^foo\\\\\\/")).toBe("^foo\\\\[/]");
	});

	it("keeps an even backslash run as literal backslashes", () => {
		expect(patternOf("^foo\\\\/")).toBe("^foo\\\\[/]");
	});

	it("drops an invalid pattern", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		expect(patternOf("^(foo")).toBeUndefined();
		expect(warn).toHaveBeenCalledOnce();
		warn.mockRestore();
	});

	it("ignores pattern keys inside instance data", () => {
		const result = fixRegexPatterns(
			spec({}, { components: { schemas: { S: { example: { pattern: "/(" } } } } }),
		);
		expect((result.components as any).schemas.S.example.pattern).toBe("/(");
	});
});

describe("camelCaseProperties", () => {
	it("camelCases keys but keeps path keys under paths", () => {
		const result = camelCaseProperties({
			paths: { "/user_settings/{setting_id}": { get: { operation_id: "x" } } },
			some_key: [{ nested_key: 1 }],
		});
		expect(result).toEqual({
			paths: { "/user_settings/{setting_id}": { get: { operationId: "x" } } },
			someKey: [{ nestedKey: 1 }],
		});
	});
});
