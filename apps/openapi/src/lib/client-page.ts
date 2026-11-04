import type { Metadata } from "next";
import { type Client, clients } from "./clients";
import { siteName } from "./site";

const repoTree = "https://github.com/sferarc/openapi/tree/main/packages";
const repoBlob = "https://github.com/sferarc/openapi/blob/main/packages";

const sharedImage = { url: "/opengraph-image", alt: siteName };

export function findClient(packageName: string): Client | undefined {
	return clients.find((client) => client.packageName === packageName);
}

export function clientPath(client: Client): string {
	return `/${client.packageName}`;
}

export function clientTitle(client: Client): string {
	return `${client.api} TypeScript client: ${client.packageName}`;
}

export function clientDescription(client: Client): string {
	return `Unofficial, fully typed TypeScript client for the ${client.api}, generated from its OpenAPI spec and published to npm as ${client.packageName}.`;
}

export function clientLinks(client: Client): { label: string; href: string }[] {
	return [
		{ label: "npm", href: `https://www.npmjs.com/package/${client.packageName}` },
		{ label: "Source", href: `${repoTree}/${client.packageName}` },
		{ label: "Changelog", href: `${repoBlob}/${client.packageName}/CHANGELOG.md` },
	];
}

export function clientMetadata(client: Client): Metadata {
	const title = clientTitle(client);
	const description = clientDescription(client);
	const path = clientPath(client);
	return {
		title,
		description,
		alternates: { canonical: path },
		// A page that sets openGraph does not inherit the root opengraph-image, so it names it.
		openGraph: { type: "website", url: path, siteName, title, description, images: [sharedImage] },
	};
}
