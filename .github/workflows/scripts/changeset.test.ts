import { describe, expect, it } from "vitest";
import {
	createEntries,
	type DiffSummary,
	fallbackEntry,
	renderChangeset,
	resolveEntries,
	summarizeDiff,
} from "./changeset";

const diff =
	`diff --git a/packages/demo/src/generated/components.ts b/packages/demo/src/generated/components.ts
index 1111111..2222222 100644
--- a/packages/demo/src/generated/components.ts
+++ b/packages/demo/src/generated/components.ts
@@ -10,20 +10,20 @@ import type * as Types from "./types";
-export async function deleteWidget(
-	params: Types.DeleteWidgetParams,
+export async function getWidget(
+	params: Types.GetWidgetParams,
@@ -40,3 +40,3 @@
-export async function listWidgets(
+export async function listWidgets(
 	params: Types.ListWidgetsParams,
diff --git a/packages/demo/src/generated/schemas.ts b/packages/demo/src/generated/schemas.ts
--- a/packages/demo/src/generated/schemas.ts
+++ b/packages/demo/src/generated/schemas.ts
@@ -1,1 +1,1 @@
-export async function notAnOperation(
+export const widgetSchema = z.object({});
diff --git a/packages/demo/src/generated/types.ts b/packages/demo/src/generated/types.ts
--- a/packages/demo/src/generated/types.ts
+++ b/packages/demo/src/generated/types.ts
@@ -5,2 +5,2 @@
-	name: string;
+	name?: string;
+export type GetWidgetParams = { id: string };`.split("\n");

const emptySummary: DiffSummary = { text: "", truncated: false, removedOperations: [] };

describe("summarizeDiff", () => {
	it("keeps only headers and export lines of the generated types and components", async () => {
		const summary = await summarizeDiff(diff);

		expect(summary.text).toBe(
			[
				"diff packages/demo/src/generated/components.ts",
				'@@ -10,20 +10,20 @@ import type * as Types from "./types";',
				"-export async function deleteWidget(",
				"+export async function getWidget(",
				"@@ -40,3 +40,3 @@",
				"-export async function listWidgets(",
				"+export async function listWidgets(",
				"diff packages/demo/src/generated/types.ts",
				"@@ -5,2 +5,2 @@",
				"+export type GetWidgetParams = { id: string };",
			].join("\n"),
		);
		expect(summary.truncated).toBe(false);
	});

	it("reports operations that were removed and not re-added", async () => {
		const summary = await summarizeDiff(diff);
		expect(summary.removedOperations).toEqual(["deleteWidget"]);
	});

	it("truncates the text but still detects removals past the cap", async () => {
		const summary = await summarizeDiff(diff, 60);
		expect(summary.truncated).toBe(true);
		expect(summary.text.length).toBeLessThanOrEqual(60);
		expect(summary.removedOperations).toEqual(["deleteWidget"]);
	});

	it("returns an empty summary for an empty diff", async () => {
		expect(await summarizeDiff([])).toEqual(emptySummary);
	});
});

describe("resolveEntries", () => {
	it("falls back to one patch entry when the model returned nothing", () => {
		expect(resolveEntries("demo", [], [])).toEqual([fallbackEntry("demo")]);
		expect(resolveEntries("demo", undefined, [])).toEqual([
			{ type: "patch", description: "Regenerate from the latest demo OpenAPI spec." },
		]);
	});

	it("adds a breaking minor entry for removed operations whatever the model said", () => {
		const entries = resolveEntries(
			"demo",
			[{ type: "patch", description: "Add getWidget." }],
			["deleteWidget", "purgeWidgets"],
		);
		expect(entries).toEqual([
			{
				type: "minor",
				description:
					"[BREAKING] Remove operations no longer in the demo OpenAPI spec: `deleteWidget`, `purgeWidgets`.",
			},
			{ type: "patch", description: "Add getWidget." },
		]);
	});
});

describe("createEntries", () => {
	const summary: DiffSummary = {
		text: "+export async function getWidget(",
		truncated: false,
		removedOperations: [],
	};

	it("writes the fallback when the model call fails", async () => {
		const entries = await createEntries("demo", summary, async () => {
			throw new Error("429 Too Many Requests");
		});
		expect(entries).toEqual([fallbackEntry("demo")]);
	});

	it("writes the fallback without calling a model when there is none", async () => {
		expect(await createEntries("demo", summary, undefined)).toEqual([fallbackEntry("demo")]);
	});

	it("does not call the model when the summary is empty", async () => {
		let called = false;
		const entries = await createEntries("demo", emptySummary, async () => {
			called = true;
			return [];
		});
		expect(called).toBe(false);
		expect(entries).toEqual([fallbackEntry("demo")]);
	});

	it("keeps the breaking entry when the model call fails", async () => {
		const entries = await createEntries(
			"demo",
			{ ...summary, removedOperations: ["deleteWidget"] },
			async () => {
				throw new Error("context length exceeded");
			},
		);
		expect(entries.map((entry) => entry.type)).toEqual(["minor", "patch"]);
		expect(entries[0].description).toMatch(/^\[BREAKING\]/);
	});

	it("passes the model's entries through", async () => {
		const entries = await createEntries("demo", summary, async (system, prompt) => {
			expect(system).not.toContain("0.x");
			expect(prompt).toBe(summary.text);
			return [{ type: "minor", description: "Add getWidget." }];
		});
		expect(entries).toEqual([{ type: "minor", description: "Add getWidget." }]);
	});
});

describe("renderChangeset", () => {
	it("renders changeset front matter for the package", () => {
		expect(renderChangeset("demo", { type: "patch", description: " Fix it. " })).toBe(
			'---\n"demo": patch\n---\n\nFix it.\n',
		);
	});
});
