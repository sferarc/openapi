import { operationsByPath as accountOperationsByPath } from "./account/generated/components";
import { operationsByPath as adminOperationsByPath } from "./admin/generated/components";
import type { FetchImpl } from "./utils/fetch";
import type { FetcherConfig } from "./utils/fetcher";
import type { RequiredKeys } from "./utils/types";

export interface KeycloakAdminApiOptions {
	baseUrl: string;
	token: string | null;
	fetch?: FetchImpl;
}

export interface KeycloakAccountApiOptions {
	baseUrl: string;
	realm: string;
	token: string | null;
	fetch?: FetchImpl;
}

type AdminRequestEndpointParams<T extends keyof typeof adminOperationsByPath> = NonNullable<
	Parameters<(typeof adminOperationsByPath)[T]>[0]
>;

type AdminRequestEndpointResult<T extends keyof typeof adminOperationsByPath> = ReturnType<
	(typeof adminOperationsByPath)[T]
>;

// The params argument is optional when the operation requires none of its fields.
type AdminRequestEndpointArgs<T extends keyof typeof adminOperationsByPath> = [
	RequiredKeys<AdminRequestEndpointParams<T>>,
] extends [never]
	? [params?: AdminRequestEndpointParams<T>]
	: [params: AdminRequestEndpointParams<T>];

type AccountRequestEndpointParams<T extends keyof typeof accountOperationsByPath> = NonNullable<
	Parameters<(typeof accountOperationsByPath)[T]>[0]
>;

type AccountRequestEndpointResult<T extends keyof typeof accountOperationsByPath> = ReturnType<
	(typeof accountOperationsByPath)[T]
>;

type AccountRequestEndpointArgs<T extends keyof typeof accountOperationsByPath> = [
	RequiredKeys<AccountRequestEndpointParams<T>>,
] extends [never]
	? [params?: AccountRequestEndpointParams<T>]
	: [params: AccountRequestEndpointParams<T>];

type CallParams = Record<string, unknown> & { config?: Partial<FetcherConfig> };

type Operation = (params: CallParams) => Promise<unknown>;

function findOperation(operations: Record<string, unknown>, endpoint: string): Operation {
	if (!Object.hasOwn(operations, endpoint)) throw new Error(`Unknown endpoint: ${endpoint}`);
	return operations[endpoint] as Operation;
}

// The caller's per-call config, such as extra headers, layers over the client's own.
function withConfig(params: unknown, clientConfig: FetcherConfig): CallParams {
	const { config, ...rest } = (params ?? {}) as CallParams;
	return { ...rest, config: { ...clientConfig, ...config } };
}

export class KeycloakAdminApi {
	#baseUrl: string;
	#token: string | null;
	#fetch: FetchImpl;

	constructor(options: KeycloakAdminApiOptions) {
		this.#baseUrl = options.baseUrl;
		this.#token = options.token;

		this.#fetch = options.fetch || (fetch as FetchImpl);
		if (!this.#fetch) throw new Error("Fetch is required");
	}

	public async request<Endpoint extends keyof typeof adminOperationsByPath>(
		endpoint: Endpoint,
		...[params]: AdminRequestEndpointArgs<Endpoint>
	) {
		const operation = findOperation(adminOperationsByPath, endpoint);
		const result = await operation(
			withConfig(params, { baseUrl: this.#baseUrl, token: this.#token, fetchImpl: this.#fetch }),
		);
		return result as AdminRequestEndpointResult<Endpoint>;
	}
}

export class KeycloakAccountApi {
	#baseUrl: string;
	#realm: string;
	#token: string | null;
	#fetch: FetchImpl;

	constructor(options: KeycloakAccountApiOptions) {
		this.#baseUrl = options.baseUrl;
		this.#realm = options.realm;
		this.#token = options.token;

		this.#fetch = options.fetch || (fetch as FetchImpl);
		if (!this.#fetch) throw new Error("Fetch is required");
	}

	public async request<Endpoint extends keyof typeof accountOperationsByPath>(
		endpoint: Endpoint,
		...[params]: AccountRequestEndpointArgs<Endpoint>
	) {
		const operation = findOperation(accountOperationsByPath, endpoint);
		const result = await operation(
			withConfig(params, {
				baseUrl: `${this.#baseUrl.replace(/\/+$/, "")}/realms/${this.#realm}`,
				token: this.#token,
				fetchImpl: this.#fetch,
			}),
		);
		return result as AccountRequestEndpointResult<Endpoint>;
	}
}
