import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The root `pnpm test` runs this from the repository root.
const packagesDir = path.join(process.cwd(), "packages");

type ExportEntry = string | Record<string, unknown>;

const packageNames = readdirSync(packagesDir, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name);

function readExports(name: string): Record<string, ExportEntry> {
	const manifest = JSON.parse(readFileSync(path.join(packagesDir, name, "package.json"), "utf8"));
	return manifest.exports ?? {};
}

describe("package exports", () => {
	// With `"type": "module"`, one `.d.ts` or `.d.mts` for both conditions types the CommonJS build as ESM.
	it.each(packageNames)("%s gives require its own CommonJS declarations", (name) => {
		const entries = Object.entries(readExports(name)).filter(
			([subpath]) => subpath !== "./package.json",
		);
		expect(entries.length).toBeGreaterThan(0);

		for (const [subpath, entry] of entries) {
			expect(entry, subpath).toMatchObject({
				import: {
					types: expect.stringMatching(/\.d\.mts$/),
					default: expect.stringMatching(/\.mjs$/),
				},
				require: {
					types: expect.stringMatching(/\.d\.cts$/),
					default: expect.stringMatching(/\.cjs$/),
				},
			});
		}
	});
});
