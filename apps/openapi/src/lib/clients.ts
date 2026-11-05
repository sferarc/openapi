export interface Client {
	packageName: string;
	vendor: string;
	api: string;
	auth: string;
	sources: ClientSource[];
}

// Each generated OPERATIONS.md, relative to the package directory, and the spec it was generated from.
export interface ClientSource {
	operationsDoc: string;
	specUrl: string;
	specLabel: string;
}

function generatedFrom(specUrl: string): ClientSource[] {
	return [{ operationsDoc: "src/generated/OPERATIONS.md", specUrl, specLabel: "OpenAPI spec" }];
}

export const clients: Client[] = [
	{
		packageName: "vercel-api-js",
		vendor: "Vercel",
		api: "Vercel REST API",
		auth: "Pass a Vercel access token as the token option.",
		sources: generatedFrom("https://openapi.vercel.sh"),
	},
	{
		packageName: "cloudflare-api-js",
		vendor: "Cloudflare",
		api: "Cloudflare API",
		auth: "Pass an API token as the token option, or, for operations that accept only the legacy Global API Key, pass apiKey with the email of its account.",
		sources: generatedFrom(
			"https://raw.githubusercontent.com/cloudflare/api-schemas/main/openapi.json",
		),
	},
	{
		packageName: "netlify-api",
		vendor: "Netlify",
		api: "Netlify API",
		auth: "Pass a Netlify access token as the token option; client.auth.refreshToken exchanges an OAuth refresh token for a new pair.",
		sources: generatedFrom("https://open-api.netlify.com/swagger.json"),
	},
	{
		packageName: "keycloak-api",
		vendor: "Keycloak",
		api: "Keycloak Admin and Account REST APIs",
		auth: "Keycloak is self-hosted, so pass the baseUrl of your server and an access token as token, or a function that returns a fresh token before every request.",
		sources: [
			{
				operationsDoc: "src/admin/generated/OPERATIONS.md",
				specUrl: "https://www.keycloak.org/docs-api/latest/rest-api/openapi.json",
				specLabel: "Admin OpenAPI spec",
			},
			{
				operationsDoc: "src/account/generated/OPERATIONS.md",
				specUrl:
					"https://raw.githubusercontent.com/sferarc/openapi/main/packages/keycloak-api/specs/account.yaml",
				specLabel: "Account OpenAPI spec",
			},
		],
	},
	{
		packageName: "zoom-api-js",
		vendor: "Zoom",
		api: "Zoom API",
		auth: "Pass a Zoom OAuth access token as the token option, or a function that refreshes it, since Zoom access tokens expire after an hour.",
		sources: generatedFrom("https://developers.zoom.us/api/zoap/meetings/methods/"),
	},
	{
		packageName: "nuki-api-js",
		vendor: "Nuki",
		api: "Nuki Web API",
		auth: "Pass a Nuki Web API token as the token option.",
		sources: generatedFrom("https://api.nuki.io/static/swagger/swagger.json"),
	},
	{
		packageName: "litellm-api",
		vendor: "LiteLLM",
		api: "LiteLLM proxy API",
		auth: "LiteLLM is self-hosted, so pass the baseUrl of your proxy and its master key as the token option.",
		sources: generatedFrom("https://docs.litellm.ai/openapi.json"),
	},
	{
		packageName: "v0-api",
		vendor: "v0",
		api: "Vercel v0 API",
		auth: "Pass a v0 API key as the token option.",
		sources: generatedFrom("https://api.v0.dev/v1/openapi.json"),
	},
];
