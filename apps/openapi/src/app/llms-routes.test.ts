import { readdir, readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { clients } from "../lib/clients";
import { GET as getLlmsTxt } from "./llms.txt/route";
import { GET as getLlmsFullTxt } from "./llms-full.txt/route";

const packagesDir = new URL("../../../../packages/", import.meta.url);

describe("llms.txt routes", () => {
	it("lists every client package in the repository", async () => {
		const entries = await readdir(packagesDir, { withFileTypes: true });
		const packageDirs = entries
			.filter((entry) => entry.isDirectory() && entry.name !== "openapi-utils")
			.map((entry) => entry.name);
		expect(clients.map((client) => client.packageName).sort()).toEqual(packageDirs.sort());
	});

	it("serves llms.txt as plain text with each client's README, npm page, operations and spec", async () => {
		const response = getLlmsTxt();
		expect(response.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
		const body = await response.text();
		expect(body.startsWith("# OpenAPI Clients\n\n> ")).toBe(true);
		for (const client of clients) {
			const raw = `https://raw.githubusercontent.com/sferarc/openapi/main/packages/${client.packageName}`;
			expect(body).toContain(`(${raw}/README.md)`);
			expect(body).toContain(`https://www.npmjs.com/package/${client.packageName}`);
			for (const { operationsDoc, specUrl } of client.sources) {
				expect(body).toContain(`(${raw}/${operationsDoc}): every operation`);
				expect(body).toContain(`generated from ${specUrl}\n`);
			}
		}
	});

	it("links only OPERATIONS.md files that exist", async () => {
		for (const client of clients) {
			for (const { operationsDoc } of client.sources) {
				await expect(
					readFile(new URL(`${client.packageName}/${operationsDoc}`, packagesDir), "utf-8"),
				).resolves.toContain("|");
			}
		}
	});

	it("serves llms-full.txt as llms.txt followed by every client's README", async () => {
		const response = await getLlmsFullTxt();
		expect(response.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
		const body = await response.text();
		expect(
			body.startsWith(
				await getLlmsTxt()
					.text()
					.then((text) => text.trim()),
			),
		).toBe(true);
		for (const client of clients) {
			const readme = await readFile(
				new URL(`${client.packageName}/README.md`, packagesDir),
				"utf-8",
			);
			expect(body).toContain(readme.trim());
		}
	});
});
