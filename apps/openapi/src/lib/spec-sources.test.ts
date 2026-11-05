import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { clientLinks } from "./client-page";
import { clients } from "./clients";

const packagesDir = new URL("../../../../packages/", import.meta.url);
const rawMain = "https://raw.githubusercontent.com/sferarc/openapi/main/packages";

function readPackageFile(packageName: string, file: string): Promise<string> {
	return readFile(new URL(`${packageName}/${file}`, packagesDir), "utf-8");
}

// Remote specs come from fetchSpec("<url>"), local ones from readFileSync("./specs/<file>").
async function configSpecUrls(packageName: string): Promise<string[]> {
	const config = await readPackageFile(packageName, "kubb.config.ts");
	const remote = Array.from(config.matchAll(/fetchSpec\(\s*"([^"]+)"/g), ([, url]) => url);
	const local = Array.from(
		config.matchAll(/readFileSync\(\s*"\.\/(specs\/[^"]+)"/g),
		([, path]) => `${rawMain}/${packageName}/${path}`,
	);
	return [...remote, ...local];
}

describe("spec sources", () => {
	it.each(clients)("$packageName lists the specs its kubb config reads", async (client) => {
		const specUrls = client.sources.map((source) => source.specUrl);
		expect(specUrls.toSorted()).toEqual((await configSpecUrls(client.packageName)).toSorted());
	});

	it.each(clients)("$packageName README links every spec it is generated from", async (client) => {
		const readme = await readPackageFile(client.packageName, "README.md");
		const line = readme.split("\n").find((text) => text.startsWith("Generated from "));
		expect(line).toBeDefined();
		for (const url of await configSpecUrls(client.packageName)) {
			expect(line).toContain(`<${url}>`);
		}
	});

	it.each(clients)("$packageName page links every spec", (client) => {
		const hrefs = clientLinks(client).map((link) => link.href);
		expect(hrefs).toEqual(expect.arrayContaining(client.sources.map((source) => source.specUrl)));
	});
});
