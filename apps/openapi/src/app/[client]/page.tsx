import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	clientDescription,
	clientLinks,
	clientMetadata,
	clientTitle,
	findClient,
} from "@/lib/client-page";
import { clients } from "@/lib/clients";
import { fetchPackageInfo } from "@/lib/npm";
import { quickStartExamples, readReadme } from "@/lib/readme";

// ISR: Revalidate every 6 hours, like the home page
export const revalidate = 21600;

export const dynamicParams = false;

export function generateStaticParams() {
	return clients.map((client) => ({ client: client.packageName }));
}

export async function generateMetadata({ params }: PageProps<"/[client]">): Promise<Metadata> {
	const client = findClient((await params).client);
	return client ? clientMetadata(client) : {};
}

export default async function ClientPage({ params }: PageProps<"/[client]">) {
	const client = findClient((await params).client);
	if (!client) notFound();

	const [{ version }, readme] = await Promise.all([
		fetchPackageInfo(client.packageName),
		readReadme(client),
	]);
	const examples = quickStartExamples(readme);

	return (
		<div className="bg-gray-50/50 dark:bg-gray-900/50 text-foreground min-h-screen">
			<div className="container mx-auto px-4 py-12 max-w-4xl">
				<nav className="mb-8 text-sm">
					<Link href="/" className="text-muted-foreground underline hover:text-foreground">
						All clients
					</Link>
				</nav>

				<main className="space-y-6">
					<header className="space-y-3">
						<div className="flex flex-wrap items-center gap-3">
							<h1 className="text-3xl md:text-4xl font-bold tracking-tight">
								{clientTitle(client)}
							</h1>
							<Badge variant="outline">v{version}</Badge>
						</div>
						<p className="text-muted-foreground text-lg">{clientDescription(client)}</p>
						<p className="text-muted-foreground text-sm">
							Not affiliated with or endorsed by {client.vendor}.
						</p>
						<ul className="flex flex-wrap gap-4 text-sm font-medium">
							{clientLinks(client).map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="underline hover:text-muted-foreground"
										target="_blank"
										rel="noopener noreferrer"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</header>

					<Card>
						<CardHeader>
							<CardTitle className="text-xl">Installation</CardTitle>
						</CardHeader>
						<CardContent>
							<CodeBlock language="bash" code={`npm install ${client.packageName}`} />
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-xl">Authentication</CardTitle>
						</CardHeader>
						<CardContent>
							<p>{client.auth}</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-xl">Examples</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{examples.map((code) => (
								<CodeBlock key={code} language="typescript" code={code} />
							))}
						</CardContent>
					</Card>
				</main>
			</div>
		</div>
	);
}
