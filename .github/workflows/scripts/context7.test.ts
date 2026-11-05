import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The root `pnpm test` runs this from the repository root.
const root = process.cwd();

type Context7Config = {
	projectTitle: string;
	description: string;
	folders: string[];
	excludeFolders: string[];
	excludeFiles: string[];
	rules: string[];
};

const config: Context7Config = JSON.parse(readFileSync(path.join(root, "context7.json"), "utf8"));

const clients = readdirSync(path.join(root, "packages"), { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && entry.name !== "openapi-utils")
	.map((entry) => entry.name);

// Context7 matches a bare folder name at any depth and a path from the repository root.
function excludedFolder(file: string): boolean {
	const segments = path.dirname(file).split("/");
	return config.excludeFolders.some((pattern) =>
		pattern.includes("/")
			? file.startsWith(`${pattern}/`)
			: segments.some((segment) => segment === pattern),
	);
}

// Root-level markdown is read whatever `folders` says.
function indexed(file: string): boolean {
	if (config.excludeFiles.includes(path.basename(file)) || excludedFolder(file)) return false;
	if (!file.includes("/") && /\.mdx?$/.test(file)) return true;
	return config.folders.some((folder) => file.startsWith(`${folder}/`));
}

function operationsFiles(pkg: string): string[] {
	return readdirSync(path.join(root, "packages", pkg, "src"), { recursive: true, encoding: "utf8" })
		.filter((file) => path.basename(file) === "OPERATIONS.md")
		.map((file) => `packages/${pkg}/src/${file}`);
}

describe("context7.json", () => {
	it("stays within the Context7 length limits", () => {
		expect(config.projectTitle.length).toBeLessThanOrEqual(100);
		expect(config.description.length).toBeLessThanOrEqual(500);
	});

	it.each(clients)("indexes the README and OPERATIONS.md of %s", (pkg) => {
		expect(config.description).toContain(pkg);
		expect(indexed(`packages/${pkg}/README.md`)).toBe(true);
		const operations = operationsFiles(pkg);
		expect(operations).not.toHaveLength(0);
		for (const file of operations) expect(indexed(file)).toBe(true);
	});

	it("leaves out changelogs, the shared utils, the site and the brain notes", () => {
		expect(indexed("packages/vercel-api-js/CHANGELOG.md")).toBe(false);
		expect(indexed("packages/openapi-utils/README.md")).toBe(false);
		expect(indexed("apps/openapi/README.md")).toBe(false);
		expect(indexed("brain/index.md")).toBe(false);
	});

	it("reads the root README and no other root-level markdown", () => {
		expect(indexed("README.md")).toBe(true);
		const rootMarkdown = readdirSync(root).filter(
			(file) => /\.mdx?$/.test(file) && file !== "README.md",
		);
		expect(rootMarkdown).toEqual(expect.arrayContaining(["CLAUDE.md", "AGENTS.md"]));
		for (const file of rootMarkdown) expect(config.excludeFiles).toContain(file);
	});

	it("says the clients are unofficial", () => {
		expect(config.description).toMatch(/^Unofficial/);
		expect(config.rules.some((rule) => rule.includes("unofficial"))).toBe(true);
	});
});
