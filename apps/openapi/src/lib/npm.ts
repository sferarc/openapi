import { z } from "zod";
import { clients } from "./clients";

export interface PackageInfo {
	name: string;
	version: string;
	description: string;
	/** ISO date the latest version was published, absent when npm did not answer. */
	publishedAt?: string;
}

export interface PackageStats extends PackageInfo {
	/** Downloads in the last week, absent when the downloads API did not answer. */
	weeklyDownloads?: number;
}

type RegistryFailure = { status: number } | { reason: string };

const packumentSchema = z.object({
	"dist-tags": z.object({ latest: z.string() }).partial().optional(),
	description: z.string().optional(),
	time: z.record(z.string(), z.string()).optional(),
});

const downloadsSchema = z.object({ downloads: z.number() });

function logFailure(message: string, packageName: string, failure: RegistryFailure) {
	console.warn(JSON.stringify({ message, package: packageName, ...failure }));
}

function reasonOf(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

function unavailable(packageName: string, failure: RegistryFailure): PackageInfo {
	const notPublished = "status" in failure && failure.status === 404;
	logFailure(
		notPublished ? "npm package not published" : "npm registry unavailable",
		packageName,
		failure,
	);
	return {
		name: packageName,
		version: "unknown",
		description: notPublished ? "Package not published on npm" : "npm registry unavailable",
	};
}

async function fetchJson(
	url: string,
): Promise<{ ok: true; body: unknown } | { ok: false; failure: RegistryFailure }> {
	let response: Response;
	try {
		response = await fetch(url, {
			next: { revalidate: 3600 }, // Cache for 1 hour
		});
	} catch (error) {
		return { ok: false, failure: { reason: reasonOf(error) } };
	}
	if (!response.ok) return { ok: false, failure: { status: response.status } };
	try {
		return { ok: true, body: await response.json() };
	} catch (error) {
		return { ok: false, failure: { reason: `invalid JSON: ${reasonOf(error)}` } };
	}
}

export async function fetchPackageInfo(packageName: string): Promise<PackageInfo> {
	// The full document, unlike /latest, carries the publish time of each version.
	const result = await fetchJson(`https://registry.npmjs.org/${packageName}`);
	if (!result.ok) return unavailable(packageName, result.failure);

	const parsed = packumentSchema.safeParse(result.body);
	if (!parsed.success) {
		return unavailable(packageName, { reason: `unexpected document: ${parsed.error.message}` });
	}

	const { "dist-tags": distTags, description, time } = parsed.data;
	const version = distTags?.latest;
	return {
		name: packageName,
		version: version || "unknown",
		description: description || "",
		publishedAt: version ? time?.[version] : undefined,
	};
}

async function fetchWeeklyDownloads(packageName: string): Promise<number | undefined> {
	const result = await fetchJson(`https://api.npmjs.org/downloads/point/last-week/${packageName}`);
	if (!result.ok) {
		logFailure("npm downloads unavailable", packageName, result.failure);
		return undefined;
	}

	const parsed = downloadsSchema.safeParse(result.body);
	if (!parsed.success) {
		logFailure("npm downloads unavailable", packageName, {
			reason: `unexpected document: ${parsed.error.message}`,
		});
		return undefined;
	}
	return parsed.data.downloads;
}

export async function fetchPackageStats(packageName: string): Promise<PackageStats> {
	const [info, weeklyDownloads] = await Promise.all([
		fetchPackageInfo(packageName),
		fetchWeeklyDownloads(packageName),
	]);
	return { ...info, weeklyDownloads };
}

export async function fetchAllPackageStats(): Promise<Record<string, PackageStats>> {
	const stats = await Promise.all(clients.map((client) => fetchPackageStats(client.packageName)));
	return Object.fromEntries(stats.map((entry) => [entry.name, entry]));
}
