import type { FetchImpl, RequestInit } from "./fetch";
import { compactObject } from "./lang";

export type FetcherConfig = {
	baseUrl?: string;
	token?: string | null;
	fetchImpl?: FetchImpl;
	headers?: Record<string, any>;
};

/** What a failed request rejects with: the HTTP status and the parsed error body, or the raw body text, truncated, when it is not JSON. */
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

const maxErrorBodyLength = 1000;

const binaryMediaTypes = new Set([
	"application/gzip",
	"application/octet-stream",
	"application/pdf",
	"application/vnd.tcpdump.pcap",
	"application/wasm",
	"application/x-gzip",
	"application/x-tar",
	"application/zip",
]);

const isBinary = (contentType: string) => {
	const mediaType = contentType.split(";")[0]?.trim().toLowerCase() ?? "";
	return binaryMediaTypes.has(mediaType) || /^(image|audio|video|font)\//.test(mediaType);
};

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
		const mergedHeaders: Record<string, string | undefined> = {
			"Content-Type": "application/json",
			Authorization: token ? `Bearer ${token}` : undefined,
			// JAX-RS answers 406 when no @Produces matches, so endpoints that only produce bytes or text must stay acceptable.
			Accept: "application/json, */*;q=0.8",
		};
		// Header names are case-insensitive: a caller's `authorization` replaces the default rather than joining it.
		for (const [name, value] of Object.entries(headers ?? {})) {
			const known = Object.keys(mergedHeaders).find(
				(key) => key.toLowerCase() === name.toLowerCase(),
			);
			mergedHeaders[known ?? name] = value;
		}
		const requestHeaders: HeadersInit = compactObject(mergedHeaders);

		/**
		 * As the fetch API is being used, when multipart/form-data is specified
		 * the Content-Type header must be deleted so that the browser can set
		 * the correct boundary.
		 * https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects#sending_files_using_a_formdata_object
		 */
		if (requestHeaders["Content-Type"]?.toLowerCase().includes("multipart/form-data")) {
			delete requestHeaders["Content-Type"];
		}

		const payload =
			body instanceof FormData
				? body
				: requestHeaders["Content-Type"] === "application/json"
					? JSON.stringify(body)
					: (body as RequestInit["body"]);

		// Every operation path starts with a slash, so one ending the base URL would send `//path`.
		const fullUrl = `${baseUrl.replace(/\/+$/, "")}${resolveUrl(url, queryParams, pathParams)}`;

		const response = await fetchImpl(fullUrl, {
			signal,
			method: method.toUpperCase(),
			body: payload,
			headers: requestHeaders,
			// fetch refuses a stream body unless the request is marked half duplex.
			...(payload instanceof ReadableStream ? { duplex: "half" as const } : {}),
		});

		if (!response.ok) {
			const text = await response.text();
			let payload: TError | string;
			try {
				payload = JSON.parse(text);
			} catch {
				payload = text.slice(0, maxErrorBodyLength);
			}
			throw new ResponseError({ status: response.status, payload });
		}

		const contentType = response.headers?.get("content-type") ?? "";
		// Decoding a zip, an image or other bytes as UTF-8 text would corrupt them.
		if (response.blob && isBinary(contentType)) {
			const blob = await response.blob();
			if (!blob.size) return undefined as TData;
			return blob as unknown as TData;
		}

		// A 204 or an empty body (common on DELETE) has nothing to parse.
		const text = await response.text();
		if (!text) return undefined as TData;
		if (contentType.includes("json")) return JSON.parse(text);
		return text as unknown as TData;
	} catch (e) {
		// Rethrown as is so the HTTP status survives; the Effect bindings map it to ApiError.
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
