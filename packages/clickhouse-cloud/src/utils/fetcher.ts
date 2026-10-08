import type { FetchImpl } from "./fetch";
import { compactObject } from "./lang";

const defaultBaseUrl = "https://api.clickhouse.cloud";

export type FetcherConfig = {
	baseUrl?: string;
	keyId?: string;
	keySecret?: string;
	fetchImpl?: FetchImpl;
	headers?: Record<string, any>;
};

export type ErrorWrapper<TError> = TError | { status: "unknown"; payload: string };

export type FetcherOptions<TBody, THeaders, TQueryParams, TPathParams> = {
	url: string;
	method: string;
	body?: TBody | undefined;
	headers?: THeaders | undefined;
	queryParams?: TQueryParams | undefined;
	pathParams?: TPathParams | undefined;
	signal?: AbortSignal | undefined;
} & FetcherConfig;

export function basicAuth(keyId: string, keySecret: string): string {
	return `Basic ${btoa(`${keyId}:${keySecret}`)}`;
}

class ResponseError {
	constructor(readonly error: unknown) {}
}

async function client<TData, TError, TBody, THeaders, TQueryParams, TPathParams>({
	url,
	method,
	body,
	headers,
	pathParams,
	queryParams,
	signal,
	baseUrl = defaultBaseUrl,
	keyId,
	keySecret,
	fetchImpl = fetch as FetchImpl,
}: FetcherOptions<TBody, THeaders, TQueryParams, TPathParams>): Promise<TData> {
	try {
		const requestHeaders: HeadersInit = compactObject({
			"Content-Type": "application/json",
			Authorization: keyId && keySecret ? basicAuth(keyId, keySecret) : undefined,
			...headers,
		});

		if (requestHeaders["Content-Type"]?.toLowerCase().includes("multipart/form-data")) {
			delete requestHeaders["Content-Type"];
		}

		const payload =
			body instanceof FormData
				? body
				: requestHeaders["Content-Type"] === "application/json"
					? JSON.stringify(body)
					: (body as unknown as string);

		const fullUrl = `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`;

		const response = await fetchImpl(fullUrl, {
			signal,
			method: method.toUpperCase(),
			body: payload,
			headers: requestHeaders,
		});

		if (!response.ok) {
			let error: ErrorWrapper<TError>;
			try {
				error = await response.json();
			} catch (e) {
				error = {
					status: "unknown" as const,
					payload: e instanceof Error ? `Unexpected error (${e.message})` : "Unexpected error",
				};
			}
			throw new ResponseError(error);
		}

		if (response.headers?.get("content-type")?.includes("json")) {
			return await response.json();
		} else {
			return (await response.text()) as unknown as TData;
		}
	} catch (e) {
		// API errors carry the response body (`{ status, requestId, error }`), so they are rethrown as is.
		if (e instanceof ResponseError) throw e.error;

		const errorObject: Error = {
			name: "unknown" as const,
			message: e instanceof Error ? `Network error (${e.message})` : "Network error",
			stack: e as string,
		};
		throw errorObject;
	}
}

const resolveUrl = (url: string, queryParams: any = {}, pathParams: any = {}) => {
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(queryParams ?? {})) {
		if (value === undefined || value === null) continue;
		for (const item of Array.isArray(value) ? value : [value]) search.append(key, String(item));
	}
	const query = search.toString() ? `?${search.toString()}` : "";
	return url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)] ?? "") + query;
};

export default client;
