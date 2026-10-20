import { baseConfig, cleanOperationIds, fetchSpec } from "@sferadev/openapi-utils";
import { defineConfig } from "kubb";

export default defineConfig(async () => {
	let openAPIDocument = await fetchSpec("https://developers.zoom.us/api/zoap/meetings/methods");

	openAPIDocument = cleanOperationIds(openAPIDocument);

	return {
		...baseConfig,
		input: openAPIDocument,
	};
});
