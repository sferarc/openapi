import { clientDescription, npmUrl, sourceUrl } from "./client-page";
import { type Client, clients } from "./clients";

// https://schema.org/SoftwareSourceCode, limited to what the site can state as fact.
export interface SoftwareSourceCode {
	"@context": "https://schema.org";
	"@type": "SoftwareSourceCode";
	name: string;
	description: string;
	codeRepository: string;
	programmingLanguage: "TypeScript";
	license: string;
	url: string;
	version?: string;
}

const iscLicense = "https://spdx.org/licenses/ISC.html";

export function softwareSourceCode(
	client: Client,
	version: string | undefined,
): SoftwareSourceCode {
	return {
		"@context": "https://schema.org",
		"@type": "SoftwareSourceCode",
		name: client.packageName,
		description: clientDescription(client),
		codeRepository: sourceUrl(client),
		programmingLanguage: "TypeScript",
		license: iscLicense,
		url: npmUrl(client),
		// npm.ts reports "unknown" when the registry did not answer, which is not a version.
		...(version && version !== "unknown" ? { version } : {}),
	};
}

export function allClientsSoftwareSourceCode(
	packages: Record<string, { version: string }>,
): SoftwareSourceCode[] {
	return clients.map((client) => softwareSourceCode(client, packages[client.packageName]?.version));
}

// JSON.stringify leaves "<" as is, so a "</script>" in any value would close the tag.
export function serializeJsonLd(data: SoftwareSourceCode): string {
	return JSON.stringify(data).replace(/</g, "\\u003c");
}
