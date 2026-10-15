import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const utilsSrc = fileURLToPath(new URL("./packages/openapi-utils/src", import.meta.url));

// Clients bundle openapi-utils from its dist at build time; tests read its source so they need no build.
export default defineConfig({
	resolve: {
		alias: {
			"@sferadev/openapi-utils/effect": `${utilsSrc}/effect/index.ts`,
			"@sferadev/openapi-utils": `${utilsSrc}/index.ts`,
		},
	},
	// knip's vitest plugin only adds the default test files as entries when `test` is set.
	test: {},
});
