import { operationsByPath as accountOperationsByPath } from "./account/generated/components";
import { operationsByPath as adminOperationsByPath } from "./admin/generated/components";
import type { FetchImpl } from "./utils/fetch";
import type { FetcherConfig } from "./utils/fetcher";

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

type AdminRequestEndpointParams<T extends keyof typeof adminOperationsByPath> = Omit<
	Parameters<(typeof adminOperationsByPath)[T]>[0],
	keyof FetcherConfig
>;

type AdminRequestEndpointResult<T extends keyof typeof adminOperationsByPath> = ReturnType<
	(typeof adminOperationsByPath)[T]
>;

type AccountRequestEndpointParams<T extends keyof typeof accountOperationsByPath> = Omit<
	Parameters<(typeof accountOperationsByPath)[T]>[0],
	keyof FetcherConfig
>;

type AccountRequestEndpointResult<T extends keyof typeof accountOperationsByPath> = ReturnType<
	(typeof accountOperationsByPath)[T]
>;

type Operation = (params: Record<string, unknown>) => Promise<unknown>;

function findOperation(operations: Record<string, unknown>, endpoint: string): Operation {
	if (!Object.hasOwn(operations, endpoint)) throw new Error(`Unknown endpoint: ${endpoint}`);
	return operations[endpoint] as Operation;
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
		params: AdminRequestEndpointParams<Endpoint>,
	) {
		const operation = findOperation(adminOperationsByPath, endpoint);
		const result = await operation({
			...((params || {}) as Record<string, unknown>),
			config: { baseUrl: this.#baseUrl, token: this.#token, fetchImpl: this.#fetch },
		});
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
		params: AccountRequestEndpointParams<Endpoint>,
	) {
		const operation = findOperation(accountOperationsByPath, endpoint);
		const result = await operation({
			...((params || {}) as Record<string, unknown>),
			config: {
				baseUrl: `${this.#baseUrl}/realms/${this.#realm}`,
				token: this.#token,
				fetchImpl: this.#fetch,
			},
		});
		return result as AccountRequestEndpointResult<Endpoint>;
	}
}
