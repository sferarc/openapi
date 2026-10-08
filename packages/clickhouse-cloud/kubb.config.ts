import { baseConfig, fetchSpec } from "@sferadev/openapi-utils";
import { defineConfig } from "kubb";
import type { OpenAPIObject } from "openapi3-ts/oas30";

export default defineConfig(async () => {
	let openAPIDocument = await fetchSpec("https://api.clickhouse.cloud/v1");

	openAPIDocument = redactSlackWebhookExamples(openAPIDocument);

	return {
		...baseConfig,
		input: openAPIDocument,
	};
});

// The spec's placeholder webhook examples still match GitHub push protection's Slack secret pattern.
function redactSlackWebhookExamples(openAPIDocument: OpenAPIObject): OpenAPIObject {
	return JSON.parse(
		JSON.stringify(openAPIDocument).replace(
			/https:\/\/hooks\.slack\.com\/services\/[A-Za-z0-9/]+/g,
			"https://hooks.slack.com/services/<workspace>/<channel>/<token>",
		),
	);
}
