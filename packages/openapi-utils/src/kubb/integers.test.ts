import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createKubb } from "kubb";
import type { OpenAPIObject, SchemaObject } from "openapi3-ts/oas30";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createConfig } from "./index";

const record: SchemaObject = {
	type: "object",
	required: ["id", "ttl"],
	properties: {
		id: { type: "integer", format: "int64" },
		ttl: { type: "integer", format: "int32" },
		priority: { type: "integer" },
	},
};

const spec = {
	openapi: "3.0.3",
	info: { title: "Integer fixture", version: "1.0.0" },
	paths: {
		"/records/{record_id}": {
			put: {
				operationId: "updateRecord",
				parameters: [
					{
						name: "record_id",
						in: "path",
						required: true,
						schema: { type: "integer", format: "int64" },
					},
				],
				requestBody: { content: { "application/json": { schema: record } } },
				responses: {
					"200": { description: "OK", content: { "application/json": { schema: record } } },
				},
			},
		},
	},
} satisfies OpenAPIObject;

let root: string;
let types: string;
let schemas: Record<string, unknown>;

beforeAll(async () => {
	root = mkdtempSync(join(tmpdir(), "openapi-utils-integers-"));
	const config = createConfig({ outputPath: "./gen", importPath: "../fetcher" });
	const { diagnostics } = await createKubb({ ...config, root, input: spec }).safeBuild();
	expect(diagnostics.filter((diagnostic) => diagnostic.severity === "error")).toEqual([]);

	types = readFileSync(join(root, "gen/types.ts"), "utf8");
	schemas = await import(join(root, "gen/schemas.ts"));
}, 60_000);

afterAll(() => {
	rmSync(root, { recursive: true, force: true });
});

function isSchema(value: unknown): value is { parse(input: unknown): unknown } {
	return typeof value === "object" && value !== null && "parse" in value;
}

describe("generated integers", () => {
	it("types int64 fields and params as number, which is what JSON carries", () => {
		expect(types).not.toContain("bigint");
		expect(types).toMatch(/id: number;/);
		expect(types).toMatch(/record_id: number;/);
	});

	it("validates a JSON number without turning it into a bigint", () => {
		const schema = schemas.updateRecordResponseSchema;
		if (!isSchema(schema)) throw new Error("updateRecordResponseSchema was not generated");
		const parsed = schema.parse(JSON.parse('{"id": 9007199254740991, "ttl": 3600}'));
		expect(parsed).toEqual({ id: 9007199254740991, ttl: 3600 });
		expect(() => JSON.stringify(parsed)).not.toThrow();
	});
});
