import { findClient } from "../../../lib/client-page";
import { clients } from "../../../lib/clients";
import { clientMarkdown, markdownResponse } from "../../../lib/markdown";
import { fetchPackageInfo } from "../../../lib/npm";
import { quickStartExamples, readReadme } from "../../../lib/readme";

// Served at /<client>.md and for Accept: text/markdown on /<client>, see markdown-routes.ts.
export const revalidate = 21600;

export const dynamicParams = false;

export function generateStaticParams() {
	return clients.map((client) => ({ client: client.packageName }));
}

export async function GET(_request: Request, { params }: RouteContext<"/md/[client]">) {
	const client = findClient((await params).client);
	if (!client) return new Response("Not found", { status: 404 });

	const [{ version }, readme] = await Promise.all([
		fetchPackageInfo(client.packageName),
		readReadme(client),
	]);
	return markdownResponse(clientMarkdown(client, version, quickStartExamples(readme)));
}
