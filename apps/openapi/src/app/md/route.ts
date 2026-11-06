import { homeMarkdown, markdownResponse } from "../../lib/markdown";
import { fetchAllPackageStats } from "../../lib/npm";
import { getProviders } from "../../lib/providers";

// Served at /index.html.md and for Accept: text/markdown on /, see markdown-routes.ts.
export const revalidate = 21600;

export async function GET(): Promise<Response> {
	return markdownResponse(homeMarkdown(getProviders(await fetchAllPackageStats())));
}
