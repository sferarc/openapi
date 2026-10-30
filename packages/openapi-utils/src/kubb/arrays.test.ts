import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createKubb } from "kubb";
import type { OpenAPIObject } from "openapi3-ts/oas30";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createConfig } from "./index";
import { fixArrayItems } from "./spec-transforms";

const spec = {
	openapi: "3.0.3",
	info: { title: "Array fixture", version: "1.0.0" },
	paths: {
		"/flags": {
			get: {
				operationId: "getFlag",
				responses: {
					"200": {
						description: "OK",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										sources: { type: "array" },
										value: { anyOf: [{ type: "string" }, { type: "array", items: {} }] },
									},
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

beforeAll(async () => {
	root = mkdtempSync(join(tmpdir(), "openapi-utils-arrays-"));
	const config = createConfig({ outputPath: "./gen", importPath: "../fetcher" });
	// A spread object type fits kubb's input record; the OpenAPIObject interface does not.
	const input = { ...fixArrayItems(structuredClone(spec)) };
	const { diagnostics } = await createKubb({ ...config, root, input }).safeBuild();
	expect(diagnostics.filter((diagnostic) => diagnostic.severity === "error")).toEqual([]);

	types = readFileSync(join(root, "gen/types.ts"), "utf8");
	schemas = readFileSync(join(root, "gen/schemas.ts"), "utf8");
}, 60_000);

afterAll(() => {
	rmSync(root, { recursive: true, force: true });
});

describe("generated arrays without an item schema", () => {
	it("accepts any item, not only strings", () => {
		expect(types).toMatch(/sources\?: unknown\[\]/);
		expect(types).toMatch(/value\?: \(string \| unknown\[\]\)/);
		expect(schemas).toContain("sources: z.array(z.unknown())");
		expect(schemas).not.toContain("z.array(z.string())");
	});
});
