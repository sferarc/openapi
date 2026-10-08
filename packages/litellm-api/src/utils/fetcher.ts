import type { FetchImpl } from "./fetch";
import { compactObject } from "./lang";

export type FetcherConfig = {
	baseUrl?: string;
	token?: string | null;
	fetchImpl?: FetchImpl;
	headers?: Record<string, any>;
};

/** What a failed request rejects with: the HTTP status and the parsed error body, or a description when the body is not JSON. */
export type ErrorWrapper<TError> = { status: number; payload: TError | string };

export type FetcherOptions<TBody, THeaders, TQueryParams, TPathParams> = {
	url: string;
	method: string;
	body?: TBody | undefined;
	headers?: THeaders | undefined;
	queryParams?: TQueryParams | undefined;
	pathParams?: TPathParams | undefined;
	signal?: AbortSignal | undefined;
} & FetcherConfig;

class ResponseError {
	constructor(readonly error: ErrorWrapper<unknown>) {}
}

async function client<TData, TError, TBody, THeaders, TQueryParams, TPathParams>({
	url,
	method,
	body,
	headers,
	pathParams,
	queryParams,
	signal,
	baseUrl = "",
	token = null,
	fetchImpl = fetch as FetchImpl,
}: FetcherOptions<TBody, THeaders, TQueryParams, TPathParams>): Promise<TData> {
	try {
		const requestHeaders: HeadersInit = compactObject({
			"Content-Type": "application/json",
			Authorization: token ? `Bearer ${token}` : undefined,
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
			let payload: TError | string;
			try {
				payload = await response.json();
			} catch (e) {
				payload = e instanceof Error ? `Unexpected error (${e.message})` : "Unexpected error";
			}
			throw new ResponseError({ status: response.status, payload });
		}

		if (response.headers?.get("content-type")?.includes("json")) {
			return await response.json();
		} else {
			return (await response.text()) as unknown as TData;
		}
	} catch (e) {
		// Rethrown as is so the HTTP status survives; the Effect bindings map it to ApiError.
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
	let query = new URLSearchParams(queryParams).toString();
	if (query) query = `?${query}`;
	return url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)] ?? "") + query;
};

export default client;
