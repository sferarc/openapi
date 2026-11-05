import type { ClientLink } from "./client-page";

export interface Provider {
	id: string;
	name: string;
	packageName: string;
	version: string;
	usage: string;
	specs: ClientLink[];
}
