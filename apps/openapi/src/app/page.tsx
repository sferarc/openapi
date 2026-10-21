import Link from "next/link";
import { HeroHeader } from "@/components/hero-header";
import { UnifiedProviderInterface } from "@/components/provider-card";
import { fetchAllPackageVersions } from "@/lib/npm";
import type { Provider } from "@/lib/types";

// ISR: Revalidate every 6 hours
export const revalidate = 21600;

const getProviders = (versions: Record<string, string>) =>
	[
		{
			id: "vercel",
			name: "Vercel",
			packageName: "vercel-api-js",
			version: versions["vercel-api-js"],
			usage: `import { VercelApi } from 'vercel-api-js';

const vercel = new VercelApi({ token: "token" });
const projects = await vercel.api.projects.getProjects({});`,
		},
		{
			id: "v0",
			name: "v0",
			packageName: "v0-api",
			version: versions["v0-api"],
			usage: `import { V0Api } from 'v0-api';

const api = new V0Api({ token: '...' });
const projects = await api.api.projects.projectsFind({});`,
		},
		{
			id: "cloudflare",
			name: "Cloudflare",
			packageName: "cloudflare-api-js",
			version: versions["cloudflare-api-js"],
			usage: `import { CloudflareApi } from 'cloudflare-api-js';

const api = new CloudflareApi({ token: '...' });
const zones = await api.api.zone.zonesGet({});`,
		},
		{
			id: "netlify",
			name: "Netlify",
			packageName: "netlify-api",
			version: versions["netlify-api"],
			usage: `import { NetlifyApi } from 'netlify-api';

const api = new NetlifyApi({ token: '...' });
const sites = await api.api.site.listSites({});`,
		},
		{
			id: "keycloak",
			name: "Keycloak",
			packageName: "keycloak-api",
			version: versions["keycloak-api"],
			usage: `import { KeycloakAdminApi } from 'keycloak-api';

const api = new KeycloakAdminApi({ baseUrl: 'https://keycloak.example.com', token: '...' });
const realms = await api.request('GET /admin/realms', {});`,
		},
		{
			id: "zoom",
			name: "Zoom",
			packageName: "zoom-api-js",
			version: versions["zoom-api-js"],
			usage: `import { ZoomApi } from 'zoom-api-js';

const api = new ZoomApi({ token: '...' });
const files = await api.api.archiving.listArchivedFiles({});`,
		},
		{
			id: "nuki",
			name: "Nuki",
			packageName: "nuki-api-js",
			version: versions["nuki-api-js"],
			usage: `import { NukiApi } from 'nuki-api-js';

const api = new NukiApi({ token: '...' });
const smartLocks = await api.api.smartlock.getSmartlocksResource({});`,
		},
		{
			id: "litellm",
			name: "LiteLLM",
			packageName: "litellm-api",
			version: versions["litellm-api"],
			usage: `import { LiteLLMApi } from 'litellm-api';

const api = new LiteLLMApi({ baseUrl: 'http://localhost:4000', token: '...' });
const routes = await api.request('GET /routes', {});`,
		},
	] satisfies Provider[];

export default async function HomePage() {
	// Fetch versions server-side with ISR
	const versions = await fetchAllPackageVersions();
	const providers = getProviders(versions);

	return (
		<div className="bg-gray-50/50 dark:bg-gray-900/50 text-foreground min-h-screen">
			<HeroHeader />

			<div className="container mx-auto px-4 py-8 max-w-7xl">
				<main>
					<section id="providers" className="mb-16">
						<UnifiedProviderInterface providers={providers} />
					</section>
				</main>

				<footer className="text-center text-muted-foreground mt-16 border-t pt-6">
					<p className="text-sm">
						Built and maintained by{" "}
						<Link
							href="https://github.com/SferaDev"
							className="font-medium underline hover:text-foreground transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							SferaDev
						</Link>
						.
					</p>
				</footer>
			</div>
		</div>
	);
}
