import type { ClientLink } from "./client-page";

export interface Provider {
	id: string;
	name: string;
	packageName: string;
	version: string;
	publishedAt?: string;
	weeklyDownloads?: number;
	usage: string;
	specs: ClientLink[];
}
