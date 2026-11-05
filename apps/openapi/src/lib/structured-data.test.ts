import { describe, expect, it } from "vitest";
import { findClient } from "./client-page";
import { clients } from "./clients";
import {
	allClientsSoftwareSourceCode,
	serializeJsonLd,
	softwareSourceCode,
} from "./structured-data";

describe("SoftwareSourceCode structured data", () => {
	it("gives one block per client, each with its npm version", () => {
		const versions = Object.fromEntries(
			clients.map((client, index) => [client.packageName, { version: `1.${index}.0` }]),
		);
		const blocks = allClientsSoftwareSourceCode(versions);

		expect(blocks.map((block) => block.name)).toEqual(clients.map((client) => client.packageName));
		blocks.forEach((block, index) => {
			expect(block["@type"]).toBe("SoftwareSourceCode");
			expect(block.version).toBe(`1.${index}.0`);
		});
	});

	it("describes the client as unofficial and links its npm page, source and license", () => {
		const vercel = findClient("vercel-api-js");
		if (!vercel) throw new Error("vercel-api-js is missing from the client list");

		expect(softwareSourceCode(vercel, "2.0.0")).toEqual({
			"@context": "https://schema.org",
			"@type": "SoftwareSourceCode",
			name: "vercel-api-js",
			description:
				"Unofficial, fully typed TypeScript client for the Vercel REST API, generated from its OpenAPI spec and published to npm as vercel-api-js.",
			codeRepository: "https://github.com/sferarc/openapi/tree/main/packages/vercel-api-js",
			programmingLanguage: "TypeScript",
			license: "https://spdx.org/licenses/ISC.html",
			url: "https://www.npmjs.com/package/vercel-api-js",
			version: "2.0.0",
		});
	});

	it("leaves the version out when npm did not answer", () => {
		const blocks = allClientsSoftwareSourceCode({ "vercel-api-js": { version: "unknown" } });
		for (const block of blocks) expect(block).not.toHaveProperty("version");
	});

	it("escapes < so a value cannot close the script tag", () => {
		const vercel = findClient("vercel-api-js");
		if (!vercel) throw new Error("vercel-api-js is missing from the client list");

		const json = serializeJsonLd({ ...softwareSourceCode(vercel, undefined), name: "</script>" });
		expect(json).not.toContain("<");
		expect(JSON.parse(json).name).toBe("</script>");
	});
});
