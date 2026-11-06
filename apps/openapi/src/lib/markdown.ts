import { clientDescription, clientLinks, clientTitle } from "./client-page";
import type { Client } from "./clients";
import { formatDownloads, formatPublishDate } from "./format";
import { clientMarkdownPath, homeMarkdownPath } from "./markdown-routes";
import { siteDescription, siteName, siteUrl, updateWorkflowUrl } from "./site";
import type { Provider } from "./types";

const markdownHeaders = {
	"Content-Type": "text/markdown; charset=utf-8",
	Vary: "Accept",
};

function codeBlock(language: string, code: string): string {
	return `\`\`\`${language}\n${code}\n\`\`\``;
}

function linkList(links: { label: string; href: string }[]): string {
	return links.map(({ label, href }) => `- [${label}](${href})`).join("\n");
}

function npmLine(provider: Provider): string {
	const publishDate = provider.publishedAt ? formatPublishDate(provider.publishedAt) : undefined;
	return [
		`Version ${provider.version}`,
		publishDate && `published ${publishDate}`,
		provider.weeklyDownloads !== undefined &&
			`${formatDownloads(provider.weeklyDownloads)} downloads last week`,
	]
		.filter(Boolean)
		.join(", ");
}

function providerSection(provider: Provider): string {
	const pageUrl = `${siteUrl}${clientMarkdownPath(provider.packageName)}`;
	return [
		`## ${provider.name}: ${provider.packageName}`,
		`${npmLine(provider)}.`,
		codeBlock("bash", `npm install ${provider.packageName}`),
		codeBlock("typescript", provider.usage),
		linkList([
			{ label: `${provider.packageName}: authentication, examples and links`, href: pageUrl },
			...provider.specs,
		]),
	].join("\n\n");
}

export function homeMarkdown(providers: Provider[]): string {
	return `${[
		`# ${siteName}`,
		`> ${siteDescription} They are not affiliated with or endorsed by the API vendors.`,
		`Regenerated from each spec by the [Update OpenAPI workflow](${updateWorkflowUrl}).`,
		...providers.map(providerSection),
	].join("\n\n")}\n`;
}

export function clientMarkdown(client: Client, version: string, examples: string[]): string {
	return `${[
		`# ${clientTitle(client)}`,
		`> ${clientDescription(client)}`,
		`Version ${version}. Not affiliated with or endorsed by ${client.vendor}.`,
		linkList(clientLinks(client)),
		"## Installation",
		codeBlock("bash", `npm install ${client.packageName}`),
		"## Authentication",
		client.auth,
		"## Examples",
		...examples.map((code) => codeBlock("typescript", code)),
		`[All clients](${siteUrl}${homeMarkdownPath})`,
	].join("\n\n")}\n`;
}

export function markdownResponse(body: string): Response {
	return new Response(body, { headers: markdownHeaders });
}
