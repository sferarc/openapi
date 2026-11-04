import { clients } from "./clients";

type RegistryFailure = { status: number } | { reason: string };

function unavailable(packageName: string, failure: RegistryFailure): Record<string, string> {
	const notPublished = "status" in failure && failure.status === 404;
	console.warn(
		JSON.stringify({
			message: notPublished ? "npm package not published" : "npm registry unavailable",
			package: packageName,
			...failure,
		}),
	);
	return {
		name: packageName,
		version: "unknown",
		description: notPublished ? "Package not published on npm" : "npm registry unavailable",
	};
}

export async function fetchPackageVersion(packageName: string): Promise<Record<string, string>> {
	let response: Response;
	try {
		response = await fetch(`https://registry.npmjs.org/${packageName}/latest`, {
			next: { revalidate: 3600 }, // Cache for 1 hour
		});
	} catch (error) {
		return unavailable(packageName, {
			reason: error instanceof Error ? error.message : String(error),
		});
	}

	if (!response.ok) {
		return unavailable(packageName, { status: response.status });
	}

	let packageInfo: { version?: string; description?: string };
	try {
		packageInfo = await response.json();
	} catch (error) {
		return unavailable(packageName, {
			reason: `invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
		});
	}

	return {
		name: packageName,
		version: packageInfo.version || "unknown",
		description: packageInfo.description || "",
	};
}

export async function fetchAllPackageVersions(): Promise<Record<string, string>> {
	const packageInfos = await Promise.all(
		clients.map((client) => fetchPackageVersion(client.packageName)),
	);

	const versionMap: Record<string, string> = {};
	packageInfos.forEach((info) => {
		versionMap[info.name] = info.version;
	});

	return versionMap;
}
