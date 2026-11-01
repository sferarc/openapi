import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createKubb } from "kubb";
import type { OpenAPIObject } from "openapi3-ts/oas30";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createConfig } from "./index";

const spec = {
	openapi: "3.0.3",
	info: { title: "No content fixture", version: "1.0.0" },
	paths: {
		"/items/{key}": {
			get: {
				operationId: "getItem",
				parameters: [{ name: "key", in: "path", required: true, schema: { type: "string" } }],
				responses: {
					"200": {
						description: "The item",
						content: {
							"application/json": {
								schema: {
									type: "object",
									required: ["key"],
									properties: { key: { type: "string" } },
								},
							},
						},
					},
					"204": { description: "No item under that key" },
				},
			},
			delete: {
				operationId: "deleteItem",
				parameters: [{ name: "key", in: "path", required: true, schema: { type: "string" } }],
				responses: { "204": { description: "Deleted" } },
			},
		},
		"/items": {
			put: {
				operationId: "replaceItems",
				responses: { "200": { description: "Replaced, body undocumented" } },
			},
		},
	},
} satisfies OpenAPIObject;

let root: string;
let types: string;
let components: string;
let schemas: Record<string, unknown>;

beforeAll(async () => {
	root = mkdtempSync(join(tmpdir(), "openapi-utils-no-content-"));
	const config = createConfig({ outputPath: "./gen", importPath: "../fetcher" });
	const { diagnostics } = await createKubb({ ...config, root, input: spec }).safeBuild();
	expect(diagnostics.filter((diagnostic) => diagnostic.severity === "error")).toEqual([]);

	types = readFileSync(join(root, "gen/types.ts"), "utf8");
	components = readFileSync(join(root, "gen/components.ts"), "utf8");
	schemas = await import(join(root, "gen/schemas.ts"));
}, 60_000);

afterAll(() => {
	rmSync(root, { recursive: true, force: true });
});

function isSchema(value: unknown): value is { safeParse(input: unknown): { success: boolean } } {
	return typeof value === "object" && value !== null && "safeParse" in value;
}

describe("generated no content responses", () => {
	it("types a 204 as void, so a typed 200 in the same response union survives", () => {
		expect(types).toContain("export type GetItemStatus204 = void;");
		expect(types).toContain("export type GetItemResponse = GetItemStatus200 | GetItemStatus204;");
		expect(types).toContain("export type DeleteItemStatus204 = void;");
		expect(components).toMatch(/request<\s*GetItemResponse,/);
	});

	it("keeps a 200 without a documented body as unknown", () => {
		expect(types).toContain("export type ReplaceItemsStatus200 = unknown;");
	});

	it("validates the item or the empty body the fetchers resolve a 204 to", () => {
		const schema = schemas.getItemResponseSchema;
		if (!isSchema(schema)) throw new Error("getItemResponseSchema was not generated");
		expect(schema.safeParse({ key: "greeting" }).success).toBe(true);
		expect(schema.safeParse(undefined).success).toBe(true);
		expect(schema.safeParse({}).success).toBe(false);
	});
});
