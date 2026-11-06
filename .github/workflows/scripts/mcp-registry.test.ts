import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The root `pnpm test` runs this from the repository root.
const packageDir = path.join(process.cwd(), "packages", "keycloak-api");

type ServerJson = {
	name: string;
	title: string;
	description: string;
	version: string;
	packages: {
		registryType: string;
		identifier: string;
		version: string;
		runtimeHint: string;
		transport: { type: string };
		environmentVariables: { name: string; isRequired?: boolean; isSecret?: boolean }[];
	}[];
};

type Manifest = {
	name: string;
	version: string;
	mcpName?: string;
	bin?: Record<string, string>;
};

const server: ServerJson = JSON.parse(readFileSync(path.join(packageDir, "server.json"), "utf8"));
const manifest: Manifest = JSON.parse(readFileSync(path.join(packageDir, "package.json"), "utf8"));
const [npmPackage] = server.packages;

describe("keycloak-api server.json", () => {
	it("has one npm package", () => {
		expect(server.packages).toHaveLength(1);
		expect(npmPackage.registryType).toBe("npm");
		expect(npmPackage.transport.type).toBe("stdio");
	});

	// The registry refuses a package whose published package.json lacks the same mcpName.
	it("names the package that declares its mcpName", () => {
		expect(manifest.mcpName).toBe(server.name);
		expect(npmPackage.identifier).toBe(manifest.name);
	});

	// `npx keycloak-api` runs the package's only bin, which is the server.
	it("is started by npx through the package's only bin", () => {
		expect(npmPackage.runtimeHint).toBe("npx");
		expect(Object.keys(manifest.bin ?? {})).toEqual(["keycloak-api-mcp"]);
	});

	it("stays within the registry length limits", () => {
		expect(server.title.length).toBeLessThanOrEqual(100);
		expect(server.description.length).toBeLessThanOrEqual(100);
	});

	it("lists every variable the server reads", () => {
		const source = readFileSync(path.join(packageDir, "src", "mcp", "server.ts"), "utf8");
		const configKeys = [...source.matchAll(/^\t\t(KEYCLOAK_[A-Z_]+):/gm)].map((match) => match[1]);
		expect(configKeys.length).toBeGreaterThan(0);
		expect(npmPackage.environmentVariables.map((variable) => variable.name).sort()).toEqual(
			configKeys.sort(),
		);
	});

	it("marks the credentials secret and the connection required", () => {
		const byName = new Map(
			npmPackage.environmentVariables.map((variable) => [variable.name, variable]),
		);
		for (const name of ["KEYCLOAK_TOKEN", "KEYCLOAK_CLIENT_SECRET"]) {
			expect(byName.get(name)?.isSecret, name).toBe(true);
		}
		for (const name of ["KEYCLOAK_URL", "KEYCLOAK_REALM"]) {
			expect(byName.get(name)?.isRequired, name).toBe(true);
		}
	});
});
