import { operationsByPath, operationsByTag, type tagDictionary } from "./generated/components";
import type { FetchImpl } from "./utils/fetch";
import type { FetcherConfig } from "./utils/fetcher";
import type { RequiredKeys } from "./utils/types";

export interface ZoomApiOptions {
	token: string | null;
	fetch?: FetchImpl;
}

export type ApiClient = {
	[Tag in keyof typeof operationsByTag]: {
		[Method in keyof (typeof operationsByTag)[Tag]]: (typeof operationsByTag)[Tag][Method] extends infer Operation extends
			(...args: any) => any
			? NonNullable<Parameters<Operation>[0]> extends infer Params
				? RequiredKeys<Params> extends never
					? (params?: Params) => ReturnType<Operation>
					: (params: Params) => ReturnType<Operation>
				: never
			: never;
	};
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type ApiOperation = {
	[Tag in keyof typeof operationsByTag]: keyof (typeof operationsByTag)[Tag] extends string
		? `${Tag}.${keyof (typeof operationsByTag)[Tag]}`
		: never;
}[keyof typeof operationsByTag];

export type ApiOperationByMethod<Method extends HttpMethod> = {
	[Tag in keyof typeof tagDictionary]: {
		[TagMethod in keyof (typeof tagDictionary)[Tag]]: TagMethod extends Method
			? (typeof tagDictionary)[Tag][TagMethod] extends readonly any[]
				? `${Tag}.${(typeof tagDictionary)[Tag][TagMethod][number]}`
				: never
			: never;
	}[keyof (typeof tagDictionary)[Tag]];
}[keyof typeof tagDictionary];

export type ApiOperationParams<T extends ApiOperation> = T extends `${infer Tag}.${infer Operation}`
	? Tag extends keyof typeof operationsByTag
		? Operation extends keyof (typeof operationsByTag)[Tag]
			? (typeof operationsByTag)[Tag][Operation] extends infer Operation extends (
					...args: any
				) => any
				? NonNullable<Parameters<Operation>[0]>
				: never
			: never
		: never
	: never;

export type ApiOperationResult<T extends ApiOperation> = T extends `${infer Tag}.${infer Operation}`
	? Tag extends keyof typeof operationsByTag
		? Operation extends keyof (typeof operationsByTag)[Tag]
			? (typeof operationsByTag)[Tag][Operation] extends (...args: any) => any
				? Awaited<ReturnType<(typeof operationsByTag)[Tag][Operation]>>
				: never
			: never
		: never
	: never;

type RequestEndpointParams<T extends keyof typeof operationsByPath> = NonNullable<
	Parameters<(typeof operationsByPath)[T]>[0]
>;

type RequestEndpointResult<T extends keyof typeof operationsByPath> = ReturnType<
	(typeof operationsByPath)[T]
>;

type CallParams = Record<string, unknown> & { config?: Partial<FetcherConfig> };

export class ZoomApi {
	#token: string | null;
	#fetch: FetchImpl;

	constructor(options: ZoomApiOptions) {
		this.#token = options.token;

		this.#fetch = options.fetch || (fetch as FetchImpl);
		if (!this.#fetch) throw new Error("Fetch is required");
	}

	#config(): FetcherConfig {
		return {
			token: this.#token,
			fetchImpl: this.#fetch,
		};
	}

	// The caller's per-call config, such as extra headers, layers over the client's own.
	#withConfig(params: CallParams | undefined): CallParams {
		const { config, ...rest } = params ?? {};
		return { ...rest, config: { ...this.#config(), ...config } };
	}

	get api() {
		return new Proxy(
			{},
			{
				get: (_target, namespace: keyof typeof operationsByTag) => {
					// Own keys only: Object.prototype names such as `constructor` are not tags or operations.
					if (!Object.hasOwn(operationsByTag, namespace)) {
						return undefined;
					}

					return new Proxy(
						{},
						{
							get: (
								_target,
								operation: keyof (typeof operationsByTag)[keyof typeof operationsByTag],
							) => {
								if (!Object.hasOwn(operationsByTag[namespace], operation)) {
									return undefined;
								}

								const method = operationsByTag[namespace][operation] as any;

								return async (params?: CallParams) => {
									return await method(this.#withConfig(params));
								};
							},
						},
					);
				},
			},
		) as ApiClient;
	}

	get auth() {
		return {
			refreshToken: async ({
				refreshToken,
				clientId,
				clientSecret,
			}: RefreshTokenOptions): Promise<RefreshTokenResult> => {
				const response = await this.#fetch("https://zoom.us/oauth/token", {
					method: "POST",
					headers: { Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}` },
					body: new URLSearchParams({
						grant_type: "refresh_token",
						refresh_token: refreshToken,
					}),
				});

				if (!response.ok) {
					throw new Error(`Failed to refresh Zoom token: HTTP ${response.status}`);
				}

				const result = await response.json();

				return {
					access_token: result.access_token,
					expires_in: result.expires_in,
					refresh_token: result.refresh_token,
				};
			},
		};
	}

	public async request<Endpoint extends keyof typeof operationsByPath>(
		endpoint: Endpoint,
		params: RequestEndpointParams<Endpoint>,
	) {
		const operation = Object.hasOwn(operationsByPath, endpoint)
			? (operationsByPath[endpoint] as (params: Record<string, unknown>) => Promise<unknown>)
			: undefined;
		if (!operation) throw new Error(`Unknown endpoint: ${endpoint}`);

		const result = await operation(this.#withConfig(params as CallParams | undefined));
		return result as RequestEndpointResult<Endpoint>;
	}
}

type RefreshTokenOptions = {
	refreshToken: string;
	clientId: string;
	clientSecret: string;
};

type RefreshTokenResult = {
	access_token: string;
	expires_in: number;
	refresh_token: string;
};
