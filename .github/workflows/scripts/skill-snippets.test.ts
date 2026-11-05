import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { constructorOptions } from "./client-options";

// The root `pnpm test` runs this from the repository root.
const root = process.cwd();
const skillPath = path.join(root, "skills/openapi-clients/SKILL.md");
const tsc = path.join(root, "node_modules/.bin/tsc");
const effectEntry = createRequire(path.join(root, "packages/openapi-utils/package.json")).resolve(
	"effect",
);

function extractSnippets(markdown: string): string[] {
	return [...markdown.matchAll(/^```ts\n([\s\S]*?)^```$/gm)].map(([, code]) => code ?? "");
}

// Each client resolves to its source, as the root vitest config does, so the check needs no build.
function sourcePaths(): Record<string, string[]> {
	const paths: Record<string, string[]> = {
		"@sferadev/openapi-utils": [path.join(root, "packages/openapi-utils/src/index.ts")],
		"@sferadev/openapi-utils/effect": [
			path.join(root, "packages/openapi-utils/src/effect/index.ts"),
		],
		// The samples sit outside the workspace, so `effect` points at the declarations of the copy the clients use.
		effect: [effectEntry.replace(/\.js$/, ".d.ts")],
	};
	for (const entry of readdirSync(path.join(root, "packages"), { withFileTypes: true })) {
		if (!entry.isDirectory() || entry.name === "openapi-utils") continue;
		const src = path.join(root, "packages", entry.name, "src");
		paths[entry.name] = [path.join(src, "index.ts")];
		paths[`${entry.name}/effect`] = [path.join(src, "effect.ts")];
	}
	return paths;
}

type ClientRow = { pkg: string; classes: string[]; required: string[]; baseUrl: string };

function clientRows(markdown: string): ClientRow[] {
	const table = markdown.split("## Pick the client")[1]?.split("\n\n")[1] ?? "";
	return table
		.split("\n")
		.slice(2)
		.map((line) => {
			const [, pkg = "", classes = "", required = "", baseUrl = ""] = line
				.split("|")
				.slice(1)
				.map((cell) => cell.trim());
			const names = (cell: string) =>
				[...cell.matchAll(/`([^`]+)`/g)].map(([, name]) => name ?? "");
			return {
				pkg: names(pkg)[0] ?? "",
				classes: names(classes),
				required: names(required),
				baseUrl,
			};
		});
}

describe("openapi-clients skill", () => {
	const skill = readFileSync(skillPath, "utf8");
	const snippets = extractSnippets(skill);
	const dir = mkdtempSync(path.join(tmpdir(), "skill-snippets-"));

	afterAll(() => rmSync(dir, { recursive: true, force: true }));

	it("starts with the name and a description saying when to use it", () => {
		expect(skill).toMatch(
			/^---\nname: openapi-clients\ndescription: Use when calling the .+\n---\n/,
		);
		expect(skill.split("\n").length).toBeLessThan(150);
	});

	it("lists every client package", () => {
		const packages = readdirSync(path.join(root, "packages"), { withFileTypes: true })
			.filter((entry) => entry.isDirectory() && entry.name !== "openapi-utils")
			.map((entry) => entry.name);
		expect(
			clientRows(skill)
				.map(({ pkg }) => pkg)
				.sort(),
		).toEqual(packages.sort());
	});

	it("names each constructor's required options and whether it takes a baseUrl", () => {
		for (const { pkg, classes, required, baseUrl } of clientRows(skill)) {
			const options = classes.map((className) => constructorOptions(root, pkg, className));
			const known = new Set(options.flatMap((props) => [...props.keys()]));
			for (const props of options) {
				const requiredProps = [...props].filter(([, optional]) => !optional).map(([name]) => name);
				expect(required, pkg).toEqual(expect.arrayContaining(requiredProps));
			}
			expect(
				required.filter((name) => !classes.includes(name) && !known.has(name)),
				pkg,
			).toEqual([]);
			const baseUrlKinds = options.map((props) =>
				!props.has("baseUrl") ? "none" : props.get("baseUrl") ? "optional" : "required",
			);
			expect(new Set(baseUrlKinds), pkg).toEqual(new Set([baseUrl]));
		}
	});

	it("type checks every TypeScript sample against the client sources", () => {
		expect(snippets.length).toBeGreaterThan(0);
		const files = snippets.map((code, index) => {
			const file = path.join(dir, `snippet-${index}.ts`);
			writeFileSync(file, code);
			return file;
		});
		writeFileSync(
			path.join(dir, "tsconfig.json"),
			JSON.stringify({
				compilerOptions: {
					module: "esnext",
					moduleResolution: "bundler",
					target: "esnext",
					strict: true,
					noEmit: true,
					skipLibCheck: true,
					typeRoots: [path.join(root, "node_modules/@types")],
					types: ["node"],
					paths: sourcePaths(),
				},
				files,
			}),
		);

		const result = (() => {
			try {
				return execFileSync(tsc, ["-p", dir], { encoding: "utf8" });
			} catch (error) {
				return error instanceof Error && "stdout" in error ? String(error.stdout) : String(error);
			}
		})();
		expect(result).toBe("");
	}, 120_000);
});
