import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	transpilePackages: ["@mcpauth/auth", "vercel-api-js"],
	// The client pages read their README again on every ISR revalidation.
	outputFileTracingIncludes: {
		"/\\[client\\]": ["../../packages/*/README.md"],
	},
	experimental: {
		authInterrupts: true,
	},
	async rewrites() {
		return [
			{
				source: "/.well-known/:slug*",
				destination: "/api/oauth/.well-known/:slug*",
			},
		];
	},
};

export default nextConfig;
