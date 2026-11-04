import { type Client, clients } from "./clients";
import { readReadme } from "./readme";
import { siteDescription, siteName, siteUrl } from "./site";

const rawBase = "https://raw.githubusercontent.com/sferarc/openapi/main/packages";

const textHeaders = { "Content-Type": "text/plain; charset=utf-8" };

function rawUrl(client: Client, path: string): string {
	return `${rawBase}/${client.packageName}/${path}`;
}

function clientLine(client: Client): string {
	return `- [${client.packageName} README](${rawUrl(client, "README.md")}): typed client for the ${client.api}, published at https://www.npmjs.com/package/${client.packageName}`;
}

function operationsLines(client: Client): string[] {
	return client.sources.map(
		({ operationsDoc, specUrl }) =>
			`- [${client.packageName} ${operationsDoc}](${rawUrl(client, operationsDoc)}): every operation with its request and summary, generated from ${specUrl}`,
	);
}

export function buildLlmsTxt(): string {
	return [
		`# ${siteName}`,
		"",
		`> ${siteDescription} They are not affiliated with or endorsed by the API vendors.`,
		"",
		`Each README covers install, authentication and usage. Each OPERATIONS.md ships in its npm package and lists every operation the client exposes. Site: ${siteUrl}`,
		"",
		"## Clients",
		"",
		...clients.map(clientLine),
		"",
		"## Operations and upstream specs",
		"",
		...clients.flatMap(operationsLines),
		"",
	].join("\n");
}

export async function buildLlmsFullTxt(): Promise<string> {
	const readmes = await Promise.all(clients.map(readReadme));
	const sections = [buildLlmsTxt(), ...readmes].map((section) => section.trim());
	return `${sections.join("\n\n---\n\n")}\n`;
}

export function textResponse(body: string): Response {
	return new Response(body, { headers: textHeaders });
}
