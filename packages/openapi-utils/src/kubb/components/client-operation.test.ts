import { describe, expect, it } from "vitest";
import { buildUrlTemplate } from "./client-operation";

function resolve(path: string, pathParams: Record<string, unknown>): string {
	return new Function("pathParams", `return \`${buildUrlTemplate(path)}\`;`)(pathParams);
}

describe("buildUrlTemplate", () => {
	it("percent-encodes single-segment parameters", () => {
		expect(resolve("/sites/{site_id}/forms", { site_id: "a/b?c#d" })).toBe(
			"/sites/a%2Fb%3Fc%23d/forms",
		);
	});

	it("keeps slashes in file path parameters", () => {
		expect(
			resolve("/deploys/{deploy_id}/files/{path}", { deploy_id: "d1", path: "assets/app.js" }),
		).toBe("/deploys/d1/files/assets/app.js");
		expect(
			resolve("/sites/{site_id}/files/{file_path}", { site_id: "s1", file_path: "a b/c#1.txt" }),
		).toBe("/sites/s1/files/a%20b/c%231.txt");
	});

	it("does not double-encode file paths encoded with encodeURI", () => {
		expect(resolve("/files/{path}", { path: encodeURI("my dir/100%.txt") })).toBe(
			"/files/my%20dir/100%25.txt",
		);
		expect(resolve("/files/{path}", { path: "50%/x" })).toBe("/files/50%25/x");
	});
});
