import type { FetchImpl, RequestInit } from "./fetch";
import { compactObject } from "./lang";

const defaultBaseUrl = "https://api.cloudflare.com/client/v4";

export type FetcherConfig = {
	baseUrl?: string;
	token?: string | null;
	fetchImpl?: FetchImpl;
	headers?: Record<string, any>;
	signal?: AbortSignal | undefined;
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

// One JSON value per line, which a single JSON.parse rejects as soon as there are two lines.
const lineDelimitedJsonMediaTypes = new Set([
	"application/jsonl",
	"application/jsonlines",
	"application/ndjson",
	"application/stream+json",
	"application/x-jsonlines",
	"application/x-ndjson",
]);

const isLineDelimitedJson = (contentType: string) =>
	lineDelimitedJsonMediaTypes.has(contentType.split(";")[0]?.trim().toLowerCase() ?? "");

const parseJsonLines = (text: string): unknown[] =>
	text
		.split(/\r?\n/)
		.filter((line) => line.trim())
		.map((line) => JSON.parse(line));

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
	baseUrl = defaultBaseUrl,
	token = null,
	fetchImpl = fetch as FetchImpl,
}: FetcherOptions<TBody, THeaders, TQueryParams, TPathParams>): Promise<TData> {
	try {
		const mergedHeaders: Record<string, string | undefined> = {
			"Content-Type": "application/json",
			Authorization: token ? `Bearer ${token}` : undefined,
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

		const fullUrl = `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`;

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
		if (isLineDelimitedJson(contentType)) return parseJsonLines(text) as unknown as TData;
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
	let pathUrl = url;
	for (const [key, value] of Object.entries(pathParams)) {
		pathUrl = pathUrl.replace(`{${key}}`, encodeURIComponent(String(value)));
	}
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(queryParams ?? {})) {
		if (value === undefined || value === null) continue;
		if (Array.isArray(value)) {
			for (const item of value) search.append(key, String(item));
		} else if (typeof value === "object") {
			// No object parameter in the spec sets `style`, so the default form explode sends each property as its own key.
			for (const [name, item] of Object.entries(value)) {
				if (item !== undefined && item !== null) search.append(name, String(item));
			}
		} else {
			search.append(key, String(value));
		}
	}
	const query = search.toString() ? `?${search.toString()}` : "";
	return pathUrl + query;
};

export default client;
