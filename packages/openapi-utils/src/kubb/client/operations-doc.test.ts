import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createKubb } from "kubb";
import { afterEach, describe, expect, it } from "vitest";
import { createConfig } from "../index";
import type { OperationsDoc } from "../plugin";

const spec = {
	openapi: "3.0.3",
	info: { title: "Test API", version: "1.2.3" },
	paths: {
		"/zones": {
			get: {
				operationId: "listZones",
				tags: ["DNS Zones"],
				summary: "List zones | paginated",
				responses: { "200": { description: "ok" } },
			},
			head: {
				operationId: "checkZones",
				tags: ["DNS Zones", "Health"],
				description: "Checks the zones exist.\nSecond line.\n\nIgnored paragraph.",
				responses: { "200": { description: "ok" } },
			},
		},
		"/ping": {
			post: { operationId: "ping", responses: { "204": { description: "none" } } },
		},
	},
};

const roots: string[] = [];

afterEach(() => {
	for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

async function generate(operationsDoc?: OperationsDoc): Promise<string> {
	const root = mkdtempSync(join(tmpdir(), "openapi-utils-operations-doc-"));
	roots.push(root);
	const config = createConfig({
		outputPath: "./gen",
		importPath: "../fetcher",
		skipZod: true,
		operationsDoc,
	});
	const { diagnostics } = await createKubb({ ...config, root, input: spec }).safeBuild();
	expect(diagnostics.filter((diagnostic) => diagnostic.severity === "error")).toEqual([]);
	return readFileSync(join(root, "gen/OPERATIONS.md"), "utf8");
}

describe("OPERATIONS.md", () => {
	it("lists every operation under its client.api tag with request and summary", async () => {
		const doc = await generate();

		expect(doc).toContain(
			"Generated from the Test API 1.2.3 OpenAPI spec; do not edit. 3 operations.",
		);
		expect(doc).toContain(
			'`client.api.<tag>.<operation>(params)`, or by its request as `client.request("<METHOD> <path>", params)`',
		);
		expect(doc).toContain(
			"## dnsZones\n\n| Call | Request | Summary |\n| --- | --- | --- |\n" +
				"| `client.api.dnsZones.listZones` | `GET /zones` | List zones \\| paginated |\n" +
				"| `client.api.dnsZones.checkZones` | `HEAD /zones` | Checks the zones exist. Second line. |\n",
		);
		expect(doc).toContain("| `client.api.health.checkZones` | `HEAD /zones` |");
		expect(doc).toContain(
			"## default\n\n| Call | Request | Summary |\n| --- | --- | --- |\n| `client.api.default.ping` | `POST /ping` |  |",
		);
	});

	it("drops the call column for a client reached only through request()", async () => {
		const doc = await generate({ callPrefix: false, requestTarget: "admin" });

		expect(doc).toContain(
			'Call an operation by its request as `admin.request("<METHOD> <path>", params)`.',
		);
		expect(doc).toContain(
			"| Request | Summary |\n| --- | --- |\n| `GET /zones` | List zones \\| paginated |",
		);
		expect(doc).not.toContain("client.api");
	});
});
