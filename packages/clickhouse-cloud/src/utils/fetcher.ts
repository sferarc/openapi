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

const maxErrorBodyLength = 1000;

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
		const mergedHeaders: Record<string, string | undefined> = {
			"Content-Type": "application/json",
			Authorization: keyId && keySecret ? basicAuth(keyId, keySecret) : undefined,
		};
		// Header names are case-insensitive: a caller's `authorization` replaces the default rather than joining it.
		for (const [name, value] of Object.entries(headers ?? {})) {
			const known = Object.keys(mergedHeaders).find(
				(key) => key.toLowerCase() === name.toLowerCase(),
			);
			mergedHeaders[known ?? name] = value;
		}
		const requestHeaders: HeadersInit = compactObject(mergedHeaders);

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
			const text = await response.text();
			let error: ErrorWrapper<TError>;
			try {
				error = JSON.parse(text);
			} catch {
				error = { status: "unknown" as const, payload: text.slice(0, maxErrorBodyLength) };
			}
			throw new ResponseError(error);
		}

		// A 204 or an empty body (common on DELETE) has nothing to parse.
		const text = await response.text();
		if (!text) return undefined as TData;
		if (response.headers?.get("content-type")?.includes("json")) return JSON.parse(text);
		// if it is not a json response, assume it is a blob and cast it to TData
		return text as unknown as TData;
	} catch (e) {
		// API errors carry the response body (`{ status, requestId, error }`), so they are rethrown as is.
		if (e instanceof ResponseError) throw e.error;
		if (e instanceof Error && e.name === "AbortError") throw e;

		const reason = e instanceof Error ? e.message : String(e);
		// Only the path: query values can carry secrets.
		throw new Error(`${method.toUpperCase()} ${url.split("?")[0]} failed: ${reason}`, { cause: e });
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
