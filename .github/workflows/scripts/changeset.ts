export type BumpType = "patch" | "minor";

export interface ChangeEntry {
	type: BumpType;
	description: string;
}

export interface DiffSummary {
	text: string;
	truncated: boolean;
	removedOperations: string[];
}

export const MAX_SUMMARY_LENGTH = 60_000;

const exportPattern =
	/^([+-]?)export (?:async function|function|const|type|interface|enum|class) (\w+)/;
const operationPattern = /^([+-])export async function (\w+)/;
const relevantFilePattern = /(?:^|\/)generated\/(?:types|components)\.ts$/;

/**
 * Reduces a unified diff to file headers, added or removed export lines, and the lines changed
 * inside an export that both sides keep, each group under a `~` line naming that export. Hunk
 * headers are dropped: git puts the enclosing export in them, which reads as a change to it when
 * it is only context. Capped at `maxLength`; removed operations are collected from the whole diff.
 */
export async function summarizeDiff(
	diff: AsyncIterable<string> | Iterable<string>,
	maxLength = MAX_SUMMARY_LENGTH,
): Promise<DiffSummary> {
	const lines: string[] = [];
	const removed = new Set<string>();
	const added = new Set<string>();
	let length = 0;
	let truncated = false;
	let relevant = false;
	// Whether changed lines are kept: only inside an export, whose `~` line goes out before the first.
	let inExport = false;
	let pending: string | undefined;
	let announced: string | undefined;

	const push = (line: string) => {
		if (truncated) return;
		if (length + line.length + 1 > maxLength) {
			truncated = true;
			return;
		}
		lines.push(line);
		length += line.length + 1;
	};
	const enter = (declaration: string | undefined) => {
		inExport = declaration !== undefined;
		pending = declaration === announced ? undefined : declaration && `~${declaration}`;
	};

	for await (const line of diff) {
		if (line.startsWith("diff --git ")) {
			const file = line.split(" b/").at(-1) ?? "";
			relevant = relevantFilePattern.test(file);
			if (relevant) push(`diff ${file}`);
			announced = undefined;
			enter(undefined);
			continue;
		}
		if (!relevant) continue;

		if (line.startsWith("@@")) {
			const context = line.replace(/^@@[^@]*@@ ?/, "").trim();
			enter(exportPattern.test(context) ? context : undefined);
			continue;
		}
		if (/^(?:\+\+\+|---) (?:[ab]\/|\/dev\/null)/.test(line)) continue;

		const operation = operationPattern.exec(line);
		if (operation) {
			(operation[1] === "-" ? removed : added).add(operation[2]);
		}

		const declared = exportPattern.exec(line);
		if (declared?.[1]) {
			push(line);
			inExport = true;
			pending = undefined;
			announced = line.slice(1).trim();
			continue;
		}
		if (line.startsWith(" ")) {
			if (exportPattern.test(line.slice(1))) enter(line.trim());
			continue;
		}

		if (inExport && (line.startsWith("+") || line.startsWith("-"))) {
			if (pending) {
				push(pending);
				announced = pending.slice(1);
				pending = undefined;
			}
			push(`${line[0]}${line.slice(1).trim()}`);
		}
	}

	return {
		text: lines.join("\n"),
		truncated,
		removedOperations: [...removed].filter((name) => !added.has(name)).sort(),
	};
}

export function fallbackEntry(projectName: string): ChangeEntry {
	return {
		type: "patch",
		description: `Regenerate from the latest ${projectName} OpenAPI spec.`,
	};
}

/**
 * Turns the model's entries into the ones to write: falls back when there are none, and forces a
 * `[BREAKING]` minor entry when operations were removed, whatever the model said.
 */
export function resolveEntries(
	projectName: string,
	entries: ChangeEntry[] | undefined,
	removedOperations: string[],
): ChangeEntry[] {
	const result = entries?.length ? [...entries] : [fallbackEntry(projectName)];
	if (removedOperations.length === 0) return result;

	const breaking: ChangeEntry = {
		type: "minor",
		description: `[BREAKING] Remove operations no longer in the ${projectName} OpenAPI spec: ${removedOperations.map((name) => `\`${name}\``).join(", ")}.`,
	};
	return [breaking, ...result];
}

export function renderChangeset(projectName: string, entry: ChangeEntry): string {
	return `---\n"${projectName}": ${entry.type}\n---\n\n${entry.description.trim()}\n`;
}

export function buildPrompt(projectName: string): string {
	return [
		`You write changelog entries for "${projectName}", a TypeScript client generated from an OpenAPI spec.`,
		'The input is a summary of the git diff of the generated code, and it may be truncated. "diff <path>" starts a file. A line starting "-export" or "+export" is an exported operation or type removed or added; the same name on both a "-export" and a "+export" line is a changed signature, not a removal.',
		'A line starting "~export" names an export that still exists, and the "-" and "+" lines under it are what changed inside it, such as a parameter that became required. That is a change to it, never a removal.',
		"Write one entry per meaningful API change, each a single short sentence.",
		'Start the description with "[BREAKING]" when an operation, parameter or field was removed or renamed.',
		'Use "minor" for new operations and for breaking changes, and "patch" for everything else. Never use "major".',
	].join("\n");
}

type GenerateEntries = (system: string, prompt: string) => Promise<ChangeEntry[]>;

/**
 * Asks the model for entries when it can, and falls back to a deterministic patch entry when
 * there is no model, nothing worth sending, or the call fails.
 */
export async function createEntries(
	projectName: string,
	summary: DiffSummary,
	generate: GenerateEntries | undefined,
): Promise<ChangeEntry[]> {
	let entries: ChangeEntry[] | undefined;
	if (generate && summary.text.length > 0) {
		try {
			entries = await generate(buildPrompt(projectName), summary.text);
		} catch (error) {
			console.error("Changelog generation failed, writing the fallback changeset:", error);
		}
	}
	return resolveEntries(projectName, entries, summary.removedOperations);
}
