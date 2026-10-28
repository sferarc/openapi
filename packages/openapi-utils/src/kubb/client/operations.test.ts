import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createKubb } from "kubb";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { createConfig } from "../index";
import spec from "./fixtures/params.json" with { type: "json" };

const FETCHER = `
export type FetcherConfig = { fetchImpl: (url: string, init: RequestInit) => Promise<Response> };
export type ErrorWrapper<T> = { status: number; payload: T };

export default async function client({ url, method, queryParams, headers, body, fetchImpl }: any) {
	const query = new URLSearchParams(
		Object.entries(queryParams ?? {}).filter(([, value]) => value != null) as [string, string][],
	).toString();
	const response = await fetchImpl(\`https://api.test\${url}\${query ? \`?\${query}\` : ""}\`, { method, headers, body });
	return response.json();
}
`;

type Operation = (params?: Record<string, unknown>) => Promise<unknown>;

let root: string;
let source: string;
let operations: Record<
	"getMember" | "getHealth" | "uploadScript" | "inviteMember" | "uploadLogo" | "createScimUser",
	Operation
>;

beforeAll(async () => {
	root = mkdtempSync(join(tmpdir(), "openapi-utils-operations-"));
	writeFileSync(join(root, "fetcher.ts"), FETCHER);

	const config = createConfig({ outputPath: "./gen", importPath: "../fetcher", skipZod: true });
	const { diagnostics } = await createKubb({ ...config, root, input: spec }).safeBuild();
	expect(diagnostics.filter((diagnostic) => diagnostic.severity === "error")).toEqual([]);

	source = readFileSync(join(root, "gen/components.ts"), "utf8");
	operations = await import(join(root, "gen/components.ts"));
}, 60_000);

afterAll(() => {
	rmSync(root, { recursive: true, force: true });
});

function fakeFetch() {
	return vi.fn(async (_url: string, _init: RequestInit) => Response.json({ ok: true }));
}

describe("generated operations", () => {
	it("reads non-identifier path parameters with bracket access", () => {
		expect(source).toContain('pathParams["team-id"]');
		expect(source).not.toContain("pathParams.team-id");
	});

	it("encodes path parameters, keeps a falsy value and forwards query and header params", async () => {
		const fetchImpl = fakeFetch();
		await operations.getMember({
			pathParams: { "team-id": "a/b c", member_id: 0 },
			queryParams: { fields: "id,name", limit: undefined },
			headers: { "X-Trace-Id": "trace-1" },
			config: { fetchImpl },
		});

		expect(fetchImpl).toHaveBeenCalledOnce();
		const [url, init] = fetchImpl.mock.calls[0]!;
		expect(url).toBe("https://api.test/teams/a%2Fb%20c/members/0?fields=id%2Cname");
		expect(init).toMatchObject({ method: "GET", headers: { "X-Trace-Id": "trace-1" } });
	});

	it.each([
		["a missing parameter", { pathParams: { member_id: 1 } }, "team-id"],
		["an empty parameter", { pathParams: { "team-id": "t", member_id: "" } }, "member_id"],
		["omitted pathParams", {}, "team-id"],
	])("rejects %s before calling fetch", async (_, params, field) => {
		const fetchImpl = fakeFetch();
		await expect(operations.getMember({ ...params, config: { fetchImpl } })).rejects.toThrow(
			`Missing required path parameter: ${field}`,
		);
		expect(fetchImpl).not.toHaveBeenCalled();
	});

	it("calls an operation without parameters", async () => {
		const fetchImpl = fakeFetch();
		await expect(operations.getHealth({ config: { fetchImpl } })).resolves.toEqual({ ok: true });
		expect(fetchImpl.mock.calls[0]![0]).toBe("https://api.test/health");
	});

	it("sends array items as repeated parts and objects as JSON in a multipart body", async () => {
		const fetchImpl = fakeFetch();
		const worker = new Blob(["export default {}"], { type: "application/javascript+module" });
		await operations.uploadScript({
			pathParams: { name: "app" },
			body: {
				files: [worker, worker],
				metadata: { main_module: "worker.js" },
				tags: ["a", "b"],
				size: 3,
				draft: false,
				note: null,
			},
			config: { fetchImpl },
		});

		const form = fetchImpl.mock.calls[0]![1].body;
		expect(form).toBeInstanceOf(FormData);
		if (!(form instanceof FormData)) return;
		expect(form.getAll("files")).toHaveLength(2);
		expect(form.get("metadata")).toBe('{"main_module":"worker.js"}');
		expect(form.getAll("tags")).toEqual(["a", "b"]);
		expect(form.get("size")).toBe("3");
		expect(form.get("draft")).toBe("false");
		expect(form.has("note")).toBe(false);
	});

	it("sends a url-encoded body as form fields with its content type", async () => {
		const fetchImpl = fakeFetch();
		await operations.inviteMember({
			pathParams: { org: "acme" },
			body: {
				email: "a+b@example.com",
				roles: ["admin", "billing"],
				profile: { firstName: "Ada" },
				notify: false,
				note: null,
			},
			config: { fetchImpl },
		});

		const init = fetchImpl.mock.calls[0]![1];
		expect(init.headers).toMatchObject({ "Content-Type": "application/x-www-form-urlencoded" });
		expect(init.body).toBeInstanceOf(URLSearchParams);
		expect(String(init.body)).toBe(
			"email=a%2Bb%40example.com&roles=admin&roles=billing&profile=%7B%22firstName%22%3A%22Ada%22%7D&notify=false",
		);
	});

	it("refuses a file in a url-encoded body instead of sending it as text", async () => {
		const fetchImpl = fakeFetch();
		await expect(
			operations.inviteMember({
				pathParams: { org: "acme" },
				body: { email: "a@example.com", avatar: new Blob(["png"]) },
				config: { fetchImpl },
			}),
		).rejects.toThrow("Cannot send the file in field avatar as application/x-www-form-urlencoded");
		expect(fetchImpl).not.toHaveBeenCalled();
	});

	it("sends a url-encoded body with a binary field as multipart", async () => {
		const fetchImpl = fakeFetch();
		const image = new Blob(["png"], { type: "image/png" });
		await operations.uploadLogo({
			pathParams: { org: "acme" },
			body: { image, tag: "brand" },
			config: { fetchImpl },
		});

		const init = fetchImpl.mock.calls[0]![1];
		expect(init.headers).toMatchObject({ "Content-Type": "multipart/form-data" });
		const form = init.body as FormData;
		expect(form).toBeInstanceOf(FormData);
		expect(await (form.get("image") as Blob).text()).toBe("png");
		expect(form.get("tag")).toBe("brand");
	});

	it("sends a JSON suffix body as JSON with its content type", async () => {
		const fetchImpl = fakeFetch();
		await operations.createScimUser({
			pathParams: { org: "acme" },
			body: { userName: "ada@example.com", active: true },
			config: { fetchImpl },
		});

		const init = fetchImpl.mock.calls[0]![1];
		expect(init).toMatchObject({
			method: "POST",
			headers: { "Content-Type": "application/scim+json" },
			body: '{"userName":"ada@example.com","active":true}',
		});
	});
});
