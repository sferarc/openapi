import {
	baseConfig,
	fetchSpec,
	renameReservedWords,
	stripBasePathPrefix,
} from "@sferadev/openapi-utils";
import { defineConfig } from "kubb";

export default defineConfig(async () => {
	let openAPIDocument = await fetchSpec("https://open-api.netlify.com/swagger.json");

	openAPIDocument = renameReservedWords(openAPIDocument);
	// The spec lists getSiteEnvVars as /api/v1/sites/{site_id}/env under the /api/v1 base path.
	openAPIDocument = stripBasePathPrefix(openAPIDocument, "/api/v1");

	return {
		...baseConfig,
		input: openAPIDocument,
	};
});
