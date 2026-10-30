import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createKubb } from "kubb";
import type { OpenAPIObject } from "openapi3-ts/oas30";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createConfig } from "./index";

const spec = {
	openapi: "3.0.3",
	info: { title: "Date fixture", version: "1.0.0" },
	paths: {
		"/keys": {
			get: {
				operationId: "listKeys",
				responses: {
					"200": {
						description: "OK",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										expires: { type: "string", format: "date-time" },
										day: { type: "string", format: "date" },
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
	root = mkdtempSync(join(tmpdir(), "openapi-utils-dates-"));
	const config = createConfig({ outputPath: "./gen", importPath: "../fetcher" });
	const { diagnostics } = await createKubb({ ...config, root, input: spec }).safeBuild();
	expect(diagnostics.filter((diagnostic) => diagnostic.severity === "error")).toEqual([]);

	types = readFileSync(join(root, "gen/types.ts"), "utf8");
	schemas = readFileSync(join(root, "gen/schemas.ts"), "utf8");
}, 60_000);

afterAll(() => {
	rmSync(root, { recursive: true, force: true });
});

describe("generated dates", () => {
	it("accepts any RFC 3339 offset on a date-time, not only Z", () => {
		expect(schemas).toContain("z.iso.datetime({ offset: true })");
		expect(schemas).not.toContain("z.iso.datetime()");
	});

	it("keeps date-time and date typed as strings", () => {
		expect(types).toMatch(/expires\?: string/);
		expect(types).toMatch(/day\?: string/);
		expect(schemas).toContain("z.iso.date()");
	});
});
