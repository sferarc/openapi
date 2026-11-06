import { clients } from "./clients";

export interface MarkdownPage {
	/** The HTML page's path. */
	path: string;
	/** Its Markdown twin, the path plus .md as llms.txt proposes. */
	markdownPath: string;
	/** The route handler that renders the Markdown. */
	handler: string;
}

interface MarkdownRewrite {
	source: string;
	destination: string;
	has?: { type: "header"; key: string; value: string }[];
}

interface PathHeaders {
	source: string;
	headers: { key: string; value: string }[];
}

// Next anchors the value, so this matches text/markdown anywhere in the Accept list.
const acceptsMarkdown = [{ type: "header" as const, key: "accept", value: ".*text/markdown.*" }];

export const homeMarkdownPath = "/index.html.md";

export function clientMarkdownPath(packageName: string): string {
	return `/${packageName}.md`;
}

export const markdownPages: MarkdownPage[] = [
	{ path: "/", markdownPath: homeMarkdownPath, handler: "/md" },
	...clients.map(({ packageName }) => ({
		path: `/${packageName}`,
		markdownPath: clientMarkdownPath(packageName),
		handler: `/md/${packageName}`,
	})),
];

// beforeFiles, because afterFiles never sees "/" and the client pages that exist as files.
export function markdownRewrites(): MarkdownRewrite[] {
	return markdownPages.flatMap(({ path, markdownPath, handler }) => [
		{ source: markdownPath, destination: handler },
		{ source: path, has: acceptsMarkdown, destination: handler },
	]);
}

export function markdownVaryHeaders(): PathHeaders[] {
	return markdownPages.map(({ path }) => ({
		source: path,
		headers: [{ key: "Vary", value: "Accept" }],
	}));
}
