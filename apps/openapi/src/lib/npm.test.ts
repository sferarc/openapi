import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { formatDownloads, formatPublishDate } from "./format";
import { fetchAllPackageStats, fetchPackageStats } from "./npm";

const packument = {
	"dist-tags": { latest: "2.22.0" },
	description: "Unofficial typed TypeScript client",
	time: { "2.21.0": "2026-10-01T00:00:00.000Z", "2.22.0": "2026-11-05T05:42:49.376Z" },
};

function respondWith(routes: Record<string, () => Response | Promise<Response>>) {
	vi.stubGlobal(
		"fetch",
		vi.fn(async (url: string) => {
			const route = Object.entries(routes).find(([prefix]) => url.startsWith(prefix));
			if (!route) throw new Error(`unexpected fetch ${url}`);
			return route[1]();
		}),
	);
}

const registry = "https://registry.npmjs.org/";
const downloads = "https://api.npmjs.org/downloads/point/last-week/";

beforeEach(() => {
	vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe("fetchPackageStats", () => {
	it("reads the latest version, its publish date and last week's downloads", async () => {
		respondWith({
			[registry]: () => Response.json(packument),
			[downloads]: () => Response.json({ downloads: 3955, package: "vercel-api-js" }),
		});

		await expect(fetchPackageStats("vercel-api-js")).resolves.toEqual({
			name: "vercel-api-js",
			version: "2.22.0",
			description: "Unofficial typed TypeScript client",
			publishedAt: "2026-11-05T05:42:49.376Z",
			weeklyDownloads: 3955,
		});
	});

	it("keeps the registry data when the downloads API fails", async () => {
		respondWith({
			[registry]: () => Response.json(packument),
			[downloads]: () => new Response("busy", { status: 503 }),
		});

		const stats = await fetchPackageStats("vercel-api-js");
		expect(stats.version).toBe("2.22.0");
		expect(stats.weeklyDownloads).toBeUndefined();
		expect(console.warn).toHaveBeenCalledWith(
			JSON.stringify({
				message: "npm downloads unavailable",
				package: "vercel-api-js",
				status: 503,
			}),
		);
	});

	it("renders unknown with no date or downloads when npm is unreachable", async () => {
		respondWith({
			[registry]: () => Promise.reject(new Error("getaddrinfo ENOTFOUND")),
			[downloads]: () => Promise.reject(new Error("getaddrinfo ENOTFOUND")),
		});

		await expect(fetchPackageStats("vercel-api-js")).resolves.toEqual({
			name: "vercel-api-js",
			version: "unknown",
			description: "npm registry unavailable",
			weeklyDownloads: undefined,
		});
	});

	it("says a 404 package is not published", async () => {
		respondWith({
			[registry]: () => new Response("{}", { status: 404 }),
			[downloads]: () => new Response("{}", { status: 404 }),
		});

		const stats = await fetchPackageStats("not-yet-published");
		expect(stats.description).toBe("Package not published on npm");
		expect(stats.publishedAt).toBeUndefined();
	});

	it("rejects a downloads body without a count", async () => {
		respondWith({
			[registry]: () => Response.json(packument),
			[downloads]: () => Response.json({ error: "package not found" }),
		});

		expect((await fetchPackageStats("vercel-api-js")).weeklyDownloads).toBeUndefined();
	});
});

describe("fetchAllPackageStats", () => {
	it("keys every client by package name", async () => {
		respondWith({
			[registry]: () => Response.json(packument),
			[downloads]: () => Response.json({ downloads: 1 }),
		});

		const stats = await fetchAllPackageStats();
		expect(stats["keycloak-api"]?.name).toBe("keycloak-api");
		expect(stats["vercel-api-js"]?.publishedAt).toBe("2026-11-05T05:42:49.376Z");
	});
});

describe("formatting", () => {
	it("formats the publish date in UTC whatever the local time zone", () => {
		expect(formatPublishDate("2026-11-05T23:30:00.000Z")).toBe("Nov 5, 2026");
		expect(formatPublishDate("not a date")).toBeUndefined();
	});

	it("groups download counts", () => {
		expect(formatDownloads(123456)).toBe("123,456");
	});
});
