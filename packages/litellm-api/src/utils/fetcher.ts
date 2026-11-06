import type { FetchImpl } from "./fetch";
import { compactObject } from "./lang";

export type FetcherConfig = {
	baseUrl?: string;
	token?: string | null;
	fetchImpl?: FetchImpl;
	headers?: Record<string, any>;
	signal?: AbortSignal | undefined;
	/** How a line-delimited JSON response resolves: `"array"` (the default) once the body ends, `"stream"` as an async iterable of each line as it arrives. */
	jsonLines?: "array" | "stream";
	/** How a `text/event-stream` response, such as a chat completion sent with `stream: true`, resolves: `"text"` (the default) as its raw text once the body ends, `"stream"` as an async iterable of each event as it arrives. */
	eventStream?: "text" | "stream";
	/** Called with the status and headers of the response before its body is read, for headers such as `x-litellm-model-id`. */
	onResponse?: (response: ResponseInfo) => void;
};

/** The status and headers of a response, which the parsed result leaves out. */
export type ResponseInfo = { status: number; headers: { get(name: string): string | null } };

// A custom fetch may return a response without headers.
const noHeaders: ResponseInfo["headers"] = { get: () => null };

/** The HTTP status and error body of a failed request, which `ApiResponseError` carries. */
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

/** Whether a call made with `jsonLines: "stream"` resolved to a stream of parsed lines rather than a body read whole. */
export const isJsonLineStream = (value: unknown): value is AsyncIterable<unknown> =>
	typeof value === "object" && value !== null && Symbol.asyncIterator in value;

// Yields each line as soon as its newline arrives, so a body the server keeps open is read while it grows.
async function* readJsonLines(body: ReadableStream<Uint8Array>): AsyncGenerator<unknown> {
	const reader = body.getReader();
	const decoder = new TextDecoder();
	let pending = "";
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			const lines = (pending + decoder.decode(value, { stream: true })).split(/\r?\n/);
			pending = lines.pop() ?? "";
			for (const line of lines) if (line.trim()) yield JSON.parse(line);
		}
		pending += decoder.decode();
		if (pending.trim()) yield JSON.parse(pending);
	} finally {
		// Releases the connection when the caller stops early; on a failed read the read's own error is the one thrown.
		await reader.cancel().catch(() => {});
	}
}

/** One Server-Sent Event: its type (`message` unless the stream names one), its data lines joined by newlines, and the last event id seen. */
export type ServerSentEvent = { event: string; data: string; id: string };

const isEventStreamMediaType = (contentType: string) =>
	contentType.split(";")[0]?.trim().toLowerCase() === "text/event-stream";

/** Whether a call made with `eventStream: "stream"` resolved to a stream of events rather than a body read whole. */
export const isEventStream = (value: unknown): value is AsyncIterable<ServerSentEvent> =>
	typeof value === "object" && value !== null && Symbol.asyncIterator in value;

// Parses the stream by the WHATWG rules, yielding each event once the blank line that ends it arrives.
async function* readEvents(body: ReadableStream<Uint8Array>): AsyncGenerator<ServerSentEvent> {
	const reader = body.getReader();
	const decoder = new TextDecoder();
	let pending = "";
	let event = "";
	let data: string[] = [];
	let id = "";
	const readLine = (line: string): ServerSentEvent | undefined => {
		if (!line) {
			const dispatched = data.length
				? { event: event || "message", data: data.join("\n"), id }
				: undefined;
			event = "";
			data = [];
			return dispatched;
		}
		if (line.startsWith(":")) return undefined;
		const colon = line.indexOf(":");
		const field = colon === -1 ? line : line.slice(0, colon);
		const value = colon === -1 ? "" : line.slice(colon + 1).replace(/^ /, "");
		if (field === "event") event = value;
		else if (field === "data") data.push(value);
		else if (field === "id" && !value.includes("\0")) id = value;
		return undefined;
	};
	try {
		while (true) {
			const { done, value } = await reader.read();
			const text = pending + (done ? decoder.decode() : decoder.decode(value, { stream: true }));
			// A CR that ends a chunk may be the first half of a CRLF, so it waits for the next one.
			const complete = done || !text.endsWith("\r") ? text : text.slice(0, -1);
			const lines = complete.split(/\r\n|\r|\n/);
			pending = (lines.pop() ?? "") + text.slice(complete.length);
			for (const line of lines) {
				const dispatched = readLine(line);
				if (dispatched) yield dispatched;
			}
			// What is left has no line ending, so its event is dropped, as the WHATWG rules say.
			if (done) break;
		}
	} finally {
		// Releases the connection when the caller stops early; on a failed read the read's own error is the one thrown.
		await reader.cancel().catch(() => {});
	}
}

const maxErrorMessageLength = 200;

// Error bodies vary by API: `{ message }`, `{ error: { message } }`, `{ errors: [{ message }] }`, `{ error_description }`, `{ detail }` or text.
const vendorMessage = (value: unknown): string | undefined => {
	if (typeof value === "string") return value.trim() || undefined;
	if (Array.isArray(value)) return vendorMessage(value[0]);
	if (typeof value !== "object" || value === null) return undefined;
	const fields = new Map(Object.entries(value));
	for (const field of [
		"message",
		"error_description",
		"errorMessage",
		"detail",
		"msg",
		"error",
		"errors",
	]) {
		const found = vendorMessage(fields.get(field));
		if (found) return found;
	}
	return undefined;
};

const describeResponseError = (method: string, path: string, status: number, payload: unknown) => {
	const detail =
		vendorMessage(payload) ??
		(typeof payload === "object" && payload !== null ? JSON.stringify(payload) : "");
	const summary = detail.slice(0, maxErrorMessageLength);
	return `${method} ${path} returned ${status}${summary ? `: ${summary}` : ""}`;
};

/** What a failed request rejects with: an `Error` naming the request that keeps the HTTP status and the parsed error body, or the raw body text, truncated, when it is not JSON. */
export class ApiResponseError<TError = unknown> extends Error implements ErrorWrapper<TError> {
	override readonly name = "ApiResponseError";

	constructor(
		readonly method: string,
		/** The operation path without the query string, which can carry secrets. */
		readonly path: string,
		readonly status: number,
		readonly payload: TError | string,
	) {
		super(describeResponseError(method, path, status, payload));
	}
}

// What the caller's onResponse threw, kept apart from a failed request.
class ResponseHookError {
	constructor(readonly error: unknown) {}
}

const errorReason = (error: unknown) => (error instanceof Error ? error.message : String(error));

async function client<TData, TError, TBody, THeaders, TQueryParams, TPathParams>({
	url,
	method,
	body,
	headers,
	pathParams,
	queryParams,
	signal,
	onResponse,
	jsonLines = "array",
	eventStream = "text",
	baseUrl = "",
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

		if (requestHeaders["Content-Type"]?.toLowerCase().includes("multipart/form-data")) {
			delete requestHeaders["Content-Type"];
		}

		const payload =
			body instanceof FormData
				? body
				: requestHeaders["Content-Type"] === "application/json"
					? JSON.stringify(body)
					: (body as unknown as string);

		// Every operation path starts with a slash, so one ending the base URL would send `//path`.
		const fullUrl = `${baseUrl.replace(/\/+$/, "")}${resolveUrl(url, queryParams, pathParams)}`;

		const response = await fetchImpl(fullUrl, {
			signal,
			method: method.toUpperCase(),
			body: payload,
			headers: requestHeaders,
		});

		try {
			onResponse?.({ status: response.status, headers: response.headers ?? noHeaders });
		} catch (e) {
			throw new ResponseHookError(e);
		}

		if (!response.ok) {
			const text = await response.text();
			let payload: TError | string;
			try {
				payload = JSON.parse(text);
			} catch {
				payload = text.slice(0, maxErrorBodyLength);
			}
			throw new ApiResponseError<TError>(
				method.toUpperCase(),
				url.split("?")[0] ?? url,
				response.status,
				payload,
			);
		}

		const contentType = response.headers?.get("content-type") ?? "";
		// Decoding a zip, an image or other bytes as UTF-8 text would corrupt them.
		if (response.blob && isBinary(contentType)) {
			const blob = await response.blob();
			if (!blob.size) return undefined as TData;
			return blob as unknown as TData;
		}

		if (jsonLines === "stream" && response.body && isLineDelimitedJson(contentType)) {
			return readJsonLines(response.body) as unknown as TData;
		}

		if (eventStream === "stream" && response.body && isEventStreamMediaType(contentType)) {
			return readEvents(response.body) as unknown as TData;
		}

		// A 204 or an empty body (common on DELETE) has nothing to parse.
		const text = await response.text();
		if (!text) return undefined as TData;
		if (isLineDelimitedJson(contentType)) return parseJsonLines(text) as unknown as TData;
		if (contentType.includes("json")) return JSON.parse(text);
		return text as unknown as TData;
	} catch (e) {
		// Rethrown as is so the HTTP status survives; the Effect bindings map it to ApiError.
		if (e instanceof ApiResponseError) throw e;
		// Only the path: query values can carry secrets.
		const request = `${method.toUpperCase()} ${url.split("?")[0]}`;
		if (e instanceof ResponseHookError) {
			throw new Error(`onResponse threw on ${request}: ${errorReason(e.error)}`, {
				cause: e.error,
			});
		}
		// A cancelled call rejects with the signal's reason as is, such as the TimeoutError of AbortSignal.timeout().
		if (signal?.aborted || (e instanceof Error && e.name === "AbortError")) throw e;

		throw new Error(`${request} failed: ${errorReason(e)}`, { cause: e });
	}
}

const resolveUrl = (url: string, queryParams: any = {}, pathParams: any = {}) => {
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(queryParams ?? {})) {
		if (value === undefined || value === null) continue;
		if (Array.isArray(value)) {
			for (const item of value) search.append(key, String(item));
		} else if (typeof value === "object") {
			// OpenAPI's default query style, form with explode, sends each property as its own key.
			for (const [name, item] of Object.entries(value)) {
				if (item !== undefined && item !== null) search.append(name, String(item));
			}
		} else {
			search.append(key, String(value));
		}
	}
	const query = search.toString() ? `?${search.toString()}` : "";
	return url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)] ?? "") + query;
};

export default client;
