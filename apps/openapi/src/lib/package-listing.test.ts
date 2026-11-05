import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { clients } from "./clients";
import { siteUrl } from "./site";

const packagesDir = new URL("../../../../packages/", import.meta.url);

interface Manifest {
	description?: string;
	homepage?: string;
	keywords?: string[];
	exports?: Record<string, unknown>;
}

async function readManifest(packageName: string): Promise<Manifest> {
	return JSON.parse(await readFile(new URL(`${packageName}/package.json`, packagesDir), "utf-8"));
}

describe("npm listings", () => {
	it.each(clients)("$packageName says it is unofficial in its description", async (client) => {
		const { description } = await readManifest(client.packageName);
		expect(description).toMatch(
			new RegExp(`^Unofficial typed TypeScript client for the ${client.api}, generated from `),
		);
	});

	it.each(clients)("$packageName links its page on the site as homepage", async (client) => {
		const { homepage } = await readManifest(client.packageName);
		expect(homepage).toBe(`${siteUrl}/${client.packageName}`);
	});

	it.each(clients)("$packageName has the search keywords", async (client) => {
		const { keywords = [], exports = {} } = await readManifest(client.packageName);
		const vendor = client.vendor.toLowerCase();
		expect(keywords).toEqual(
			expect.arrayContaining([
				vendor,
				`${vendor}-api`,
				"api-client",
				"sdk",
				"typescript",
				"openapi",
				"rest",
			]),
		);
		expect(keywords.includes("effect")).toBe("./effect" in exports);
	});

	it.each(clients)("$packageName README says it is unofficial under its title", async (client) => {
		const readme = await readFile(new URL(`${client.packageName}/README.md`, packagesDir), "utf-8");
		expect(readme).toMatch(
			new RegExp(`^# ${client.packageName}\\n\\nUnofficial\\. Not made or endorsed by \\w+\\.\\n`),
		);
	});
});
