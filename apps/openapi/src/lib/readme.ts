import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Client } from "./clients";

// Next runs this in the app directory, so the READMEs come from the same commit as the packages.
const packagesDir = join(process.cwd(), "..", "..", "packages");

const typeScriptBlock = /^```ts\n([\s\S]*?)\n```$/gm;

export async function readReadme(client: Client): Promise<string> {
	return readFile(join(packagesDir, client.packageName, "README.md"), "utf-8");
}

export function quickStartExamples(readme: string, limit = 3): string[] {
	const start = readme.indexOf("\n## Quick Start\n");
	if (start === -1) return [];
	const end = readme.indexOf("\n## ", start + 1);
	const section = readme.slice(start, end === -1 ? undefined : end);
	return Array.from(section.matchAll(typeScriptBlock), ([, code]) => code).slice(0, limit);
}
