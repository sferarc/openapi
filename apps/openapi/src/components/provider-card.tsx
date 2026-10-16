"use client";

import { CodeXml } from "lucide-react";
import { useEffect, useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Provider } from "@/lib/types";

const STORAGE_KEY = "activeProviderTab";

interface UnifiedProviderInterfaceProps {
	providers: Provider[];
}

export function UnifiedProviderInterface({ providers }: UnifiedProviderInterfaceProps) {
	const [activeTab, setActiveTab] = useState(providers[0]?.id ?? "");
	const selectedTab = providers.some((p) => p.id === activeTab)
		? activeTab
		: (providers[0]?.id ?? "");

	// Restore after mount so the first client render matches the server HTML.
	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored && providers.some((p) => p.id === stored)) setActiveTab(stored);
		} catch {}
	}, [providers]);

	const selectTab = (id: string) => {
		setActiveTab(id);
		try {
			localStorage.setItem(STORAGE_KEY, id);
		} catch {}
	};

	return (
		<div className="w-full">
			{/* Provider Selection Tabs */}
			<div className="mb-6">
				<Tabs value={selectedTab} onValueChange={selectTab} className="w-full">
					<TabsList className="flex h-auto w-full flex-wrap gap-1 p-1">
						{providers.map((provider) => (
							<TabsTrigger
								key={provider.id}
								value={provider.id}
								className="h-auto py-2 text-sm font-medium"
							>
								{provider.name}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>

			{/* Content Sections */}
			{providers.map((provider) => (
				<div key={provider.id} className={selectedTab === provider.id ? "block" : "hidden"}>
					<div className="grid grid-cols-1 gap-6 h-full">
						{/* TypeScript SDK Section */}
						<Card className="flex flex-col">
							<CardHeader className="flex flex-row items-center justify-center gap-3 pb-4">
								<CodeXml className="h-6 w-6" />
								<CardTitle className="text-xl font-bold tracking-tight">TypeScript SDK</CardTitle>
								<Badge variant="outline" className="text-xs">
									v{provider.version}
								</Badge>
							</CardHeader>
							<CardContent className="flex-1 space-y-5">
								<div>
									<h3 className="text-base font-semibold mb-2">Installation</h3>
									<Tabs defaultValue="pnpm" className="w-full">
										<TabsList className="grid w-full grid-cols-3 h-8">
											<TabsTrigger value="pnpm" className="text-xs">
												pnpm
											</TabsTrigger>
											<TabsTrigger value="npm" className="text-xs">
												npm
											</TabsTrigger>
											<TabsTrigger value="yarn" className="text-xs">
												yarn
											</TabsTrigger>
										</TabsList>
										<TabsContent value="pnpm" className="mt-3">
											<CodeBlock language="bash" code={`pnpm add ${provider.packageName}`} />
										</TabsContent>
										<TabsContent value="npm" className="mt-3">
											<CodeBlock language="bash" code={`npm install ${provider.packageName}`} />
										</TabsContent>
										<TabsContent value="yarn" className="mt-3">
											<CodeBlock language="bash" code={`yarn add ${provider.packageName}`} />
										</TabsContent>
									</Tabs>
								</div>
								<div>
									<h3 className="text-base font-semibold mb-2">Usage Example</h3>
									<CodeBlock language="typescript" code={provider.usage} />
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			))}
		</div>
	);
}
