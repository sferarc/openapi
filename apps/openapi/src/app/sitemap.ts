import type { MetadataRoute } from "next";
import { clientPath } from "../lib/client-page";
import { clients } from "../lib/clients";
import { siteUrl } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const clientPages: MetadataRoute.Sitemap = clients.map((client) => ({
		url: `${siteUrl}${clientPath(client)}`,
		changeFrequency: "daily",
		priority: 0.8,
	}));
	return [{ url: siteUrl, changeFrequency: "daily", priority: 1 }, ...clientPages];
}
