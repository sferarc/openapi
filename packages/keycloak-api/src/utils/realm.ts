// Encoded like the admin API's `{realm}`: Keycloak allows `%` and spaces in a realm name.
export function realmBaseUrl(baseUrl: string, realm: string): string {
	return `${baseUrl.replace(/\/+$/, "")}/realms/${encodeURIComponent(realm)}`;
}
