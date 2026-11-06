import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clients } from "../lib/clients";
import { markdownPages, markdownRewrites, markdownVaryHeaders } from "../lib/markdown-routes";
import { siteUrl } from "../lib/site";
import { GET as getLlmsTxt } from "./llms.txt/route";
import { GET as getClientMarkdown } from "./md/[client]/route";
import { GET as getHomeMarkdown } from "./md/route";
import sitemap from "./sitemap";

const publishedAt = "2026-11-01T00:00:00.000Z";

function fakeNpm(input: string | URL | Request): Response {
	const url = input instanceof Request ? input.url : input.toString();
	if (url.startsWith("https://api.npmjs.org/downloads/")) return Response.json({ downloads: 4321 });
	return Response.json({ "dist-tags": { latest: "9.8.7" }, time: { "9.8.7": publishedAt } });
}

function clientRequest(client: string) {
	return getClientMarkdown(new Request(`${siteUrl}/md/${client}`), {
		params: Promise.resolve({ client }),
	});
}

beforeEach(() => {
	vi.stubGlobal("fetch", vi.fn(fakeNpm));
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe("Markdown twins", () => {
	it("gives every sitemap page a .md twin served by a route handler", () => {
		const sitemapPaths = sitemap().map((entry) => new URL(entry.url).pathname);
		expect(markdownPages.map((page) => page.path).sort()).toEqual(sitemapPaths.sort());
		for (const page of markdownPages) {
			expect(page.markdownPath).toBe(page.path === "/" ? "/index.html.md" : `${page.path}.md`);
		}
	});

	it("rewrites each .md path and each page asked for text/markdown to its handler", () => {
		const rewrites = markdownRewrites();
		for (const { path, markdownPath, handler } of markdownPages) {
			expect(rewrites).toContainEqual({ source: markdownPath, destination: handler });
			const negotiated = rewrites.find((rewrite) => rewrite.source === path && rewrite.has);
			expect(negotiated?.destination).toBe(handler);
			const accept = new RegExp(`^${negotiated?.has?.[0]?.value}$`);
			expect(accept.test("text/markdown")).toBe(true);
			expect(accept.test("text/markdown, text/html;q=0.9")).toBe(true);
			expect(accept.test("text/html,application/xhtml+xml,*/*;q=0.8")).toBe(false);
		}
	});

	it("varies every page on Accept", () => {
		expect(markdownVaryHeaders()).toEqual(
			markdownPages.map(({ path }) => ({
				source: path,
				headers: [{ key: "Vary", value: "Accept" }],
			})),
		);
	});

	it("serves the home page as Markdown with every client's install, usage and page", async () => {
		const response = await getHomeMarkdown();
		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
		expect(response.headers.get("Vary")).toBe("Accept");
		const body = await response.text();
		expect(body.startsWith("# OpenAPI Clients\n\n> ")).toBe(true);
		expect(body).toContain("Version 9.8.7, published Nov 1, 2026, 4,321 downloads last week.");
		for (const client of clients) {
			expect(body).toContain(`npm install ${client.packageName}\n`);
			expect(body).toContain(`(${siteUrl}/${client.packageName}.md)`);
			expect(body).toContain(`from '${client.packageName}'`);
		}
	});

	it("serves each client page as Markdown with its install, authentication and examples", async () => {
		for (const client of clients) {
			const response = await clientRequest(client.packageName);
			expect(response.status).toBe(200);
			expect(response.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
			const body = await response.text();
			expect(body).toContain(`Version 9.8.7. Not affiliated with or endorsed by ${client.vendor}.`);
			expect(body).toContain(`\`\`\`bash\nnpm install ${client.packageName}\n\`\`\``);
			expect(body).toContain(`## Authentication\n\n${client.auth}`);
			expect(body).toContain(`from "${client.packageName}"`);
			expect(body).toContain(`(https://www.npmjs.com/package/${client.packageName})`);
		}
	});

	it("answers 404 for a name that is not a client", async () => {
		expect((await clientRequest("toString")).status).toBe(404);
	});

	it("links every .md twin from llms.txt", async () => {
		const body = await getLlmsTxt().text();
		for (const { markdownPath } of markdownPages) {
			expect(body).toContain(`(${siteUrl}${markdownPath})`);
		}
	});
});
