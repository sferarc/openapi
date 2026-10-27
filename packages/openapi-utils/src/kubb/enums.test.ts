import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createKubb } from "kubb";
import type { OpenAPIObject } from "openapi3-ts/oas30";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createConfig } from "./index";

// Values from the Vercel spec that do not start with a letter, `_` or `$`.
const values = ["10.x", "!contains", "*", "#VERCEL_SKIP", "14cpu-28gb", "basic"];

const spec = {
	openapi: "3.0.3",
	info: { title: "Enum fixture", version: "1.0.0" },
	paths: {
		"/machines": {
			get: {
				operationId: "listMachines",
				parameters: [
					{ name: "forceNew", in: "query", schema: { type: "string", enum: ["0", "1"] } },
				],
				responses: {
					"200": {
						description: "OK",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: { machine: { type: "string", enum: values } },
								},
							},
						},
					},
				},
			},
		},
	},
} satisfies OpenAPIObject;

let root: string;
let types: string;
let schemas: string;
let generated: Record<string, unknown>;

beforeAll(async () => {
	root = mkdtempSync(join(tmpdir(), "openapi-utils-enums-"));
	const config = createConfig({ outputPath: "./gen", importPath: "../fetcher" });
	const { diagnostics } = await createKubb({ ...config, root, input: spec }).safeBuild();
	expect(diagnostics.filter((diagnostic) => diagnostic.severity === "error")).toEqual([]);

	// The fixture has no biome config, so the quote style of the output is not fixed.
	types = readFileSync(join(root, "gen/types.ts"), "utf8").replaceAll("'", '"');
	schemas = readFileSync(join(root, "gen/schemas.ts"), "utf8").replaceAll("'", '"');
	generated = await import(join(root, "gen/types.ts"));
}, 60_000);

afterAll(() => {
	rmSync(root, { recursive: true, force: true });
});

describe("generated enums", () => {
	it("keeps values that are not identifiers as quoted keys", () => {
		const enums = Object.values(generated).filter(
			(value): value is Record<string, string> => typeof value === "object" && value !== null,
		);
		expect(enums.map((value) => Object.values(value).sort())).toEqual(
			expect.arrayContaining([[...values].sort(), ["0", "1"]]),
		);
		expect(types).toContain('"10.x": "10.x"');
	});

	it("validates every value in the zod schema", () => {
		expect(schemas).toContain(`z.enum([${values.map((value) => `"${value}"`).join(", ")}])`);
		expect(schemas).toContain('z.enum(["0", "1"])');
	});
});
