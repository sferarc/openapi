import { execFileSync, spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import {
	type ChangeEntry,
	createEntries,
	type DiffSummary,
	renderChangeset,
	summarizeDiff,
} from "./changeset";

const changelogSchema = z.object({
	changes: z.array(
		z.object({
			description: z.string(),
			type: z.enum(["patch", "minor"]),
		}),
	),
});

function hasChanges(packagePath: string): boolean {
	const status = execFileSync("git", ["status", "--porcelain", "--", packagePath], {
		encoding: "utf8",
	});
	return status.trim().length > 0;
}

// Streamed so that no regeneration, however large, can hit a buffer limit.
async function summarizePackageDiff(packagePath: string): Promise<DiffSummary> {
	const git = spawn(
		"git",
		["diff", "--ignore-all-space", "--ignore-blank-lines", "--", packagePath],
		{ stdio: ["ignore", "pipe", "inherit"] },
	);
	const exited = new Promise<number | null>((resolve, reject) => {
		git.on("error", reject);
		git.on("close", resolve);
	});

	const summary = await summarizeDiff(createInterface({ input: git.stdout, crlfDelay: Infinity }));
	const code = await exited;
	if (code !== 0) throw new Error(`git diff exited with code ${code}`);
	return summary;
}

async function generateEntries(system: string, prompt: string): Promise<ChangeEntry[]> {
	const { object } = await generateObject({
		model: openai("gpt-4.1"),
		schema: changelogSchema,
		system,
		prompt,
	});
	return object.changes;
}

function writeChangeset(projectName: string, entry: ChangeEntry) {
	const changesetDir = path.join(process.cwd(), ".changeset");
	fs.mkdirSync(changesetDir, { recursive: true });
	const changesetPath = path.join(changesetDir, `${projectName}-${randomUUID()}.md`);
	fs.writeFileSync(changesetPath, renderChangeset(projectName, entry), { flag: "wx" });
	console.log(`Wrote ${path.relative(process.cwd(), changesetPath)} (${entry.type})`);
}

async function main() {
	const projectName = process.argv[2];
	if (!projectName) throw new Error("Project name not provided");

	const packagePath = `packages/${projectName}`;
	if (!hasChanges(packagePath)) {
		console.log("No changes detected");
		return;
	}

	let summary: DiffSummary;
	try {
		summary = await summarizePackageDiff(packagePath);
	} catch (error) {
		console.error("Could not summarise the diff, writing the fallback changeset:", error);
		summary = { text: "", truncated: false, removedOperations: [] };
	}
	if (summary.truncated) console.log("Diff summary truncated before sending it to the model");

	const generate = process.env.OPENAI_API_KEY ? generateEntries : undefined;
	if (!generate) console.log("OPENAI_API_KEY is not set, writing the fallback changeset");

	for (const entry of await createEntries(projectName, summary, generate)) {
		writeChangeset(projectName, entry);
	}
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
