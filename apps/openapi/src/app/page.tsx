import Link from "next/link";
import { HeroHeader } from "@/components/hero-header";
import { JsonLd } from "@/components/json-ld";
import { UnifiedProviderInterface } from "@/components/provider-card";
import { fetchAllPackageStats } from "@/lib/npm";
import { getProviders } from "@/lib/providers";
import { allClientsSoftwareSourceCode } from "@/lib/structured-data";

// ISR: Revalidate every 6 hours
export const revalidate = 21600;

export default async function HomePage() {
	// Fetch npm data server-side with ISR
	const stats = await fetchAllPackageStats();
	const providers = getProviders(stats);

	return (
		<div className="bg-gray-50/50 dark:bg-gray-900/50 text-foreground min-h-screen">
			{allClientsSoftwareSourceCode(stats).map((data) => (
				<JsonLd key={data.name} data={data} />
			))}
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
