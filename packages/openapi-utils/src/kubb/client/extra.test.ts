/// <reference types="node" />
import { globSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const packagesDir = join(import.meta.dirname, "../../../..");
const componentFiles = globSync("*/src/**/generated/components.ts", { cwd: packagesDir }).sort();

function block(source: string, name: string): string {
	const start = source.indexOf(`export const ${name} = {`);
	if (start === -1) throw new Error(`missing ${name}`);
	return source.slice(start, source.indexOf("\n}", start));
}

describe("generated operationsByTag", () => {
	it("finds the generated clients", () => {
		expect(componentFiles.length).toBeGreaterThanOrEqual(9);
	});

	it.each(componentFiles)("lists every operation of %s", (file) => {
		const source = readFileSync(join(packagesDir, file), "utf8");
		const operations = Array.from(
			source.matchAll(/^export async function (\w+)/gm),
			(match) => match[1],
		);
		const tagged = new Set(
			Array.from(block(source, "operationsByTag").matchAll(/^\t\t(\w+),?$/gm), (m) => m[1]),
		);

		expect(operations.length).toBeGreaterThan(0);
		expect(operations.filter((name) => !tagged.has(name))).toEqual([]);
	});
});
