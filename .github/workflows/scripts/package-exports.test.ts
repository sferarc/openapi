import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The root `pnpm test` runs this from the repository root.
const packagesDir = path.join(process.cwd(), "packages");

type ExportEntry = string | { require?: { types?: string } };

type Manifest = {
	private?: boolean;
	exports?: Record<string, ExportEntry>;
	typesVersions?: Record<string, Record<string, string[]>>;
};

const packageNames = readdirSync(packagesDir, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => entry.name);

function readManifest(name: string): Manifest {
	return JSON.parse(readFileSync(path.join(packagesDir, name, "package.json"), "utf8"));
}

function readExports(name: string): Record<string, ExportEntry> {
	return readManifest(name).exports ?? {};
}

const publishedPackageNames = packageNames.filter((name) => !readManifest(name).private);

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

	// TypeScript's `node10` resolution ignores `exports`, so only `typesVersions` leads it to a subpath's declarations.
	it.each(publishedPackageNames)("%s maps every subpath in typesVersions", (name) => {
		const { exports = {}, typesVersions } = readManifest(name);
		const expected = Object.fromEntries(
			Object.entries(exports)
				.filter(([subpath]) => subpath !== "." && subpath !== "./package.json")
				.map(([subpath, entry]) => [
					subpath.slice("./".length),
					[typeof entry === "string" ? entry : entry.require?.types],
				]),
		);

		expect(typesVersions).toEqual({ "*": expected });
	});
});
