import {
	addMissingPathParams,
	baseConfig,
	cleanOperationIds,
	fetchSpec,
	fixArrayItems,
	fixRegexPatterns,
	fixUnionConstraints,
	sortArrays,
} from "@sferadev/openapi-utils";
import { defineConfig } from "kubb";
import type { OpenAPIObject, OperationObject, PathItemObject } from "openapi3-ts/oas30";

export default defineConfig(async () => {
	let openAPIDocument = await fetchSpec("https://openapi.vercel.sh");

	openAPIDocument = addMissingPathParams(openAPIDocument);
	openAPIDocument = cleanOperationIds(openAPIDocument, {
		deleteHead: true,
		hardcodedOperationIds,
	});

	openAPIDocument = updateMethod(openAPIDocument, "/v1/integrations/search-repo", "get", (op) => ({
		...op,
		operationId: "searchRepo",
	}));
	openAPIDocument = updateMethod(
		openAPIDocument,
		"/v1/projects/{projectId}/promote/aliases",
		"get",
		(op) => ({ ...op, operationId: "listPromoteAliases" }),
	);
	// The spec describes the gzipped tarball upload in prose only, so the operation had no body.
	openAPIDocument = updateMethod(
		openAPIDocument,
		"/v2/sandboxes/sessions/{sessionId}/fs/write",
		"post",
		(op) => ({
			...op,
			requestBody: op.requestBody ?? {
				required: true,
				content: { "application/gzip": { schema: { type: "string", format: "binary" } } },
			},
		}),
	);

	// The registry uploads describe their bodies in prose only; the upload UUID and digest come back in response headers (`onResponse`).
	const registry = "/v2/{teamSlug}/{projectSlug}/{repositoryName}";
	const blobBody = (required: boolean) => ({
		required,
		content: {
			"application/octet-stream": { schema: { type: "string" as const, format: "binary" } },
		},
	});
	openAPIDocument = updateMethod(
		openAPIDocument,
		`${registry}/blobs/uploads/{uuid}`,
		"patch",
		(op) => ({
			...op,
			requestBody: op.requestBody ?? blobBody(true),
		}),
	);
	// Completing an upload may carry its last chunk, or the whole blob in a monolithic upload.
	openAPIDocument = updateMethod(
		openAPIDocument,
		`${registry}/blobs/uploads/{uuid}`,
		"put",
		(op) => ({
			...op,
			requestBody: op.requestBody ?? blobBody(false),
		}),
	);
	openAPIDocument = updateMethod(
		openAPIDocument,
		`${registry}/manifests/{reference}`,
		"put",
		(op) => ({
			...op,
			requestBody: op.requestBody ?? {
				required: true,
				content: {
					"application/vnd.oci.image.manifest.v1+json": {
						schema: { type: "object", additionalProperties: true },
					},
				},
			},
		}),
	);

	openAPIDocument = sortArrays(openAPIDocument);
	openAPIDocument = fixWrongGroupIds(openAPIDocument);
	openAPIDocument = fixArrayItems(openAPIDocument);
	openAPIDocument = fixUnionConstraints(openAPIDocument);
	openAPIDocument = fixRegexPatterns(openAPIDocument);

	return {
		...baseConfig,
		input: openAPIDocument,
	};
});

function updateMethod(
	openAPIDocument: OpenAPIObject,
	path: string,
	method: string,
	update: (operation: OperationObject) => OperationObject,
) {
	const pathItem = openAPIDocument.paths?.[path];
	if (!pathItem) return openAPIDocument;

	const operation = pathItem[method as keyof PathItemObject] as OperationObject;
	if (!operation) return openAPIDocument;

	(openAPIDocument.paths[path] as any)[method] = { ...operation, ...update(operation) };

	return openAPIDocument;
}

function fixWrongGroupIds(openAPIDocument: OpenAPIObject) {
	return JSON.parse(JSON.stringify(openAPIDocument), (key, value) => {
		if (key === "groupIds" && value.maxItems === 0 && value.minItems === 0) {
			return {
				items: { oneOf: [{ type: "string" }, { type: "string" }] },
				maxItems: 2,
				minItems: 2,
				type: "array",
			};
		}
		return value;
	});
}

const hardcodedOperationIds: Record<string, string> = {
	"DELETE /data-cache/purge-all": "purgeAllDataCache",
	"PATCH /data-cache/billing-settings": "updateDataCacheBillingSettings",
	"POST /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items":
		"createExperimentationItem",
	"PATCH /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items/{itemId}":
		"updateExperimentationItem",
	"DELETE /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items/{itemId}":
		"deleteExperimentationItem",
	"PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/edge-config":
		"updateExperimentationEdgeConfig",
	"GET /v9/projects/{idOrName}/custom-environments": "listCustomEnvironments",
	"GET /certs": "listCerts",
};
