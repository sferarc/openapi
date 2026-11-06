import type { NextConfig } from "next";
import { markdownRewrites, markdownVaryHeaders } from "./src/lib/markdown-routes";

const nextConfig: NextConfig = {
	transpilePackages: ["@mcpauth/auth", "vercel-api-js"],
	// The client pages and their Markdown twins read their README again on every ISR revalidation.
	outputFileTracingIncludes: {
		"/\\[client\\]": ["../../packages/*/README.md"],
		"/md/\\[client\\]": ["../../packages/*/README.md"],
	},
	experimental: {
		authInterrupts: true,
	},
	async headers() {
		return markdownVaryHeaders();
	},
	async rewrites() {
		return {
			beforeFiles: markdownRewrites(),
			afterFiles: [
				{
					source: "/.well-known/:slug*",
					destination: "/api/oauth/.well-known/:slug*",
				},
			],
			fallback: [],
		};
	},
};

export default nextConfig;
