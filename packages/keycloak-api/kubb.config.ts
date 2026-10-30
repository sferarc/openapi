import fs from "node:fs";
import {
	camelCasePathParams,
	cleanOperationIds,
	createConfig,
	fetchSpec,
	sortArrays,
} from "@sferadev/openapi-utils";
import { defineConfig } from "kubb";
import type {
	OpenAPIObject,
	PathItemObject,
	ReferenceObject,
	SchemaObject,
} from "openapi3-ts/oas30";
import yaml from "yaml";

export default defineConfig(async () => {
	let adminSpec = await fetchSpec("https://www.keycloak.org/docs-api/latest/rest-api/openapi.json");
	adminSpec = fixStringBodies(adminSpec);
	adminSpec = transformSpec(adminSpec);

	const accountYaml = fs.readFileSync("./specs/account.yaml", "utf-8");
	let accountSpec = yaml.parse(accountYaml);
	accountSpec = transformSpec(accountSpec);

	const target = process.env.KUBB_TARGET;

	if (target === "account") {
		return {
			...createConfig({
				outputPath: "./src/account/generated",
				importPath: "../../utils/fetcher",
			}),
			input: accountSpec,
		};
	}

	return {
		...createConfig({
			outputPath: "./src/admin/generated",
			importPath: "../../utils/fetcher",
		}),
		input: adminSpec,
	};
});

function transformSpec(spec: OpenAPIObject): OpenAPIObject {
	spec = cleanOperationIds(spec);
	spec = camelCasePathParams(spec);
	spec = sortArrays(spec);
	warnForDuplicatedPathParameters(spec);
	return spec;
}

// Keycloak reads these bodies as a raw String, so the JSON-encoded string the spec asks for arrives quoted.
function fixStringBodies(spec: OpenAPIObject): OpenAPIObject {
	const authz = "/admin/realms/{realm}/clients/{client-uuid}/authz/resource-server";
	// PolicyService.create parses the payload as a PolicyRepresentation; PermissionService inherits it.
	for (const path of [`${authz}/policy`, `${authz}/permission`]) {
		setRequestBody(spec, path, {
			"application/json": { schema: { $ref: "#/components/schemas/PolicyRepresentation" } },
		});
	}
	// The converters inspect the text itself (OIDC JSON or SAML XML), which text/plain sends unquoted.
	setRequestBody(spec, "/admin/realms/{realm}/client-description-converter", {
		"text/plain": { schema: { type: "string" } },
	});
	return spec;
}

function setRequestBody(
	spec: OpenAPIObject,
	path: string,
	content: Record<string, { schema: SchemaObject | ReferenceObject }>,
) {
	const operation = spec.paths[path]?.post;
	if (!operation) {
		console.warn(`No POST ${path} in the Keycloak spec to fix the request body of`);
		return;
	}
	operation.requestBody = { content };
}

function warnForDuplicatedPathParameters(openAPIDocument: OpenAPIObject) {
	for (const path of Object.keys(openAPIDocument.paths as Record<string, PathItemObject>)) {
		const pathParameters = path.match(/{([^}]+)}/g)?.map((param) => param.slice(1, -1)) ?? [];
		const duplicated = pathParameters.filter(
			(param, index) => pathParameters.indexOf(param) !== index,
		);
		if (duplicated.length > 0) {
			console.warn(`Duplicated path parameters in path "${path}": ${duplicated.join(", ")}`);
		}
	}
}
