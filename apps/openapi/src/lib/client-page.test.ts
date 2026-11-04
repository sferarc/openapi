import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { clientMetadata, clientTitle, findClient } from "./client-page";
import { clients } from "./clients";
import { quickStartExamples } from "./readme";

const packagesDir = new URL("../../../../packages/", import.meta.url);

function readme(packageName: string): Promise<string> {
	return readFile(new URL(`${packageName}/README.md`, packagesDir), "utf-8");
}

describe("client pages", () => {
	it("gives every client a unique title and description", () => {
		const metadata = clients.map(clientMetadata);
		expect(new Set(metadata.map((entry) => entry.title)).size).toBe(clients.length);
		expect(new Set(metadata.map((entry) => entry.description)).size).toBe(clients.length);
	});

	it("points each page's canonical and Open Graph URL at its own path", () => {
		for (const client of clients) {
			const metadata = clientMetadata(client);
			expect(metadata.alternates?.canonical).toBe(`/${client.packageName}`);
			expect(metadata.openGraph?.url).toBe(`/${client.packageName}`);
			expect(metadata.openGraph?.images).toEqual([
				{ url: "/opengraph-image", alt: "OpenAPI Clients" },
			]);
		}
	});

	it("names the API in the title", () => {
		const vercel = findClient("vercel-api-js");
		expect(vercel && clientTitle(vercel)).toBe("Vercel REST API TypeScript client: vercel-api-js");
		expect(findClient("toString")).toBeUndefined();
	});

	it("takes two or three Quick Start examples from every README, the first importing the package", async () => {
		for (const client of clients) {
			const examples = quickStartExamples(await readme(client.packageName));
			expect(examples.length, client.packageName).toBeGreaterThanOrEqual(2);
			expect(examples.length, client.packageName).toBeLessThanOrEqual(3);
			expect(examples[0], client.packageName).toContain(`from "${client.packageName}"`);
		}
	});
});

describe("quickStartExamples", () => {
	const markdown = [
		"# pkg",
		"",
		"## Installation",
		"",
		"```ts",
		"install();",
		"```",
		"",
		"## Quick Start",
		"",
		"```ts",
		"first();",
		"```",
		"",
		"```bash",
		"echo skipped",
		"```",
		"",
		"### Nested",
		"",
		"```ts",
		"second();",
		"```",
		"",
		"## Errors",
		"",
		"```ts",
		"outside();",
		"```",
		"",
	].join("\n");

	it("keeps TypeScript blocks inside the Quick Start section, nested headings included", () => {
		expect(quickStartExamples(markdown)).toEqual(["first();", "second();"]);
	});

	it("stops at the limit", () => {
		expect(quickStartExamples(markdown, 1)).toEqual(["first();"]);
	});

	it("returns nothing without a Quick Start section", () => {
		expect(quickStartExamples("# pkg\n\n```ts\ncode();\n```\n")).toEqual([]);
	});
});
