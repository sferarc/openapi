export interface Client {
	packageName: string;
	api: string;
	sources: ClientSource[];
}

// Each generated OPERATIONS.md, relative to the package directory, and the spec it was generated from.
export interface ClientSource {
	operationsDoc: string;
	specUrl: string;
}

function generatedFrom(specUrl: string): ClientSource[] {
	return [{ operationsDoc: "src/generated/OPERATIONS.md", specUrl }];
}

export const clients: Client[] = [
	{
		packageName: "vercel-api-js",
		api: "Vercel REST API",
		sources: generatedFrom("https://openapi.vercel.sh"),
	},
	{
		packageName: "cloudflare-api-js",
		api: "Cloudflare API",
		sources: generatedFrom(
			"https://raw.githubusercontent.com/cloudflare/api-schemas/main/openapi.json",
		),
	},
	{
		packageName: "netlify-api",
		api: "Netlify API",
		sources: generatedFrom("https://open-api.netlify.com/swagger.json"),
	},
	{
		packageName: "keycloak-api",
		api: "Keycloak Admin and Account REST APIs",
		sources: [
			{
				operationsDoc: "src/admin/generated/OPERATIONS.md",
				specUrl: "https://www.keycloak.org/docs-api/latest/rest-api/openapi.json",
			},
			{
				operationsDoc: "src/account/generated/OPERATIONS.md",
				specUrl:
					"https://raw.githubusercontent.com/sferarc/openapi/main/packages/keycloak-api/specs/account.yaml",
			},
		],
	},
	{
		packageName: "zoom-api-js",
		api: "Zoom API",
		sources: generatedFrom("https://developers.zoom.us/api/zoap/meetings/methods/"),
	},
	{
		packageName: "nuki-api-js",
		api: "Nuki Web API",
		sources: generatedFrom("https://api.nuki.io/static/swagger/swagger.json"),
	},
	{
		packageName: "litellm-api",
		api: "LiteLLM proxy API",
		sources: generatedFrom("https://docs.litellm.ai/openapi.json"),
	},
	{
		packageName: "v0-api",
		api: "Vercel v0 API",
		sources: generatedFrom("https://api.v0.dev/v1/openapi.json"),
	},
];
