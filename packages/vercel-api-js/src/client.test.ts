import { describe, expect, expectTypeOf, it } from "vitest";
import { type ApiOperationByMethod, VercelApi } from "./client";
import type { GlobalConfigItem } from "./types";
import type { FetchImpl, RequestInit } from "./utils/fetch";
import type { ResponseInfo } from "./utils/fetcher";

describe("VercelApi.request", () => {
	function setup() {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new VercelApi({ token: "token", fetch }) };
	}

	it("percent-encodes path params", async () => {
		const { urls, client } = setup();
		await client.request("GET /v9/projects/{idOrName}", { pathParams: { idOrName: "a/b" } });
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/v9\/projects\/a%2Fb$/);
	});

	it("rejects a missing path param before calling fetch", async () => {
		const { urls, client } = setup();
		await expect(
			client.request("GET /v9/projects/{idOrName}", { pathParams: { idOrName: "" } }),
		).rejects.toThrow("Missing required path parameter: idOrName");
		expect(urls).toEqual([]);
	});

	it("types request() and client.api params from the operation", () => {
		const { client } = setup();
		// Never called: tsc fails if a @ts-expect-error below stops finding an error.
		const typeChecks = () => [
			// @ts-expect-error pathParams needs idOrName
			client.request("GET /v9/projects/{idOrName}", { pathParams: {} }),
			// @ts-expect-error pathParams is required
			client.request("GET /v9/projects/{idOrName}"),
			// @ts-expect-error the operation has no such parameter
			client.request("GET /v9/projects/{idOrName}", { pathParams: { idOrName: "a" }, nope: 1 }),
			// @ts-expect-error pathParams needs idOrName
			client.api.projects.getProject({ pathParams: {} }),
			// Header parameters share the name `headers` with the fetcher config but are kept.
			client.api.deployments.uploadFile({ headers: { "x-now-size": 1 } }),
			// @ts-expect-error the spec requires the Content-Length header
			client.api.artifacts.uploadArtifact({ pathParams: { hash: "h" }, body: "" }),
			client.api.artifacts.uploadArtifact({
				pathParams: { hash: "h" },
				body: "",
				headers: { "Content-Length": 0 },
			}),
		];
		expect(typeChecks).toBeTypeOf("function");
	});

	it("calls an endpoint without params", async () => {
		const { urls, client } = setup();
		await client.request("GET /v1/access-groups");
		expect(urls).toHaveLength(1);
		expect(new URL(urls[0] ?? "").pathname).toMatch(/\/v1\/access-groups$/);
	});

	it("rejects an unknown endpoint", async () => {
		const { client } = setup();
		await expect(client.request("GET /nope" as never, {} as never)).rejects.toThrow(
			"Unknown endpoint: GET /nope",
		);
	});
});

function recordFetch(status: number, body: unknown) {
	const calls: { url: string; init: RequestInit | undefined }[] = [];
	const fetch: FetchImpl = async (url, init) => {
		calls.push({ url, init });
		return new Response(JSON.stringify(body), {
			status,
			headers: { "content-type": "application/json" },
		}) as never;
	};
	return { calls, fetch };
}

describe("VercelApi.auth.accessToken", () => {
	const options = {
		code: "the code",
		redirectUri: "https://app.test/cb?x=1",
		clientId: "cid",
		clientSecret: "s&cret",
	};

	it("exchanges the code with a form-encoded POST and no bearer token", async () => {
		const { calls, fetch } = recordFetch(200, {
			access_token: "at",
			token_type: "Bearer",
			installation_id: "icfg_1",
			user_id: "u_1",
			team_id: null,
		});
		const client = new VercelApi({ token: "ignored", fetch });

		const result = await client.auth.accessToken(options);

		expect(calls).toHaveLength(1);
		const [{ url, init }] = calls as [(typeof calls)[number]];
		expect(url).toBe("https://api.vercel.com/v2/oauth/access_token");
		expect(init?.method).toBe("POST");
		expect(init?.headers).toEqual({ "Content-Type": "application/x-www-form-urlencoded" });
		expect(Object.fromEntries(new URLSearchParams(init?.body as string))).toEqual({
			code: "the code",
			redirect_uri: "https://app.test/cb?x=1",
			client_id: "cid",
			client_secret: "s&cret",
		});
		expect(result).toEqual({
			accessToken: "at",
			tokenType: "Bearer",
			installationId: "icfg_1",
			userId: "u_1",
			teamId: null,
		});
	});

	it("rejects with the status on a non-2xx response", async () => {
		const { fetch } = recordFetch(400, { error: "invalid_grant" });
		const client = new VercelApi({ token: null, fetch });

		await expect(client.auth.accessToken(options)).rejects.toMatchObject({
			status: 400,
			payload: { error: "invalid_grant" },
		});
	});
});

describe("VercelApi.api", () => {
	const fetch: FetchImpl = async () => {
		throw new Error("fetch called");
	};
	const client = new VercelApi({ token: "token", fetch });

	it("ignores Object.prototype names as tags and operations", () => {
		expect(client.api.constructor).toBeUndefined();
		expect(client.api.accessGroups.toString).toBeUndefined();
		expect(client.api.accessGroups.hasOwnProperty).toBeUndefined();
		expect(client.api.accessGroups.readAccessGroup).toBeTypeOf("function");
	});
});

describe("VercelApi per-call config", () => {
	function setup() {
		const headers: unknown[] = [];
		const signals: unknown[] = [];
		const fetch: FetchImpl = async (_url, init) => {
			headers.push(init?.headers);
			signals.push(init?.signal);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { headers, signals, client: new VercelApi({ token: "token", fetch }) };
	}

	it("sends the caller's headers from request() alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.request("GET /v1/access-groups", {
			config: { headers: { "X-Request-Id": "abc" } },
		});
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("sends the caller's headers from the api proxy alongside the client's token", async () => {
		const { headers, client } = setup();
		await client.api.accessGroups.listAccessGroups({
			config: { headers: { "X-Request-Id": "abc" } },
		});
		expect(headers).toEqual([
			expect.objectContaining({ Authorization: "Bearer token", "X-Request-Id": "abc" }),
		]);
	});

	it("passes the caller's signal to fetch from request() and the api proxy", async () => {
		const { signals, client } = setup();
		const { signal } = new AbortController();
		await client.request("GET /v1/access-groups", { config: { signal } });
		await client.api.accessGroups.listAccessGroups({ config: { signal } });
		expect(signals).toEqual([signal, signal]);
	});
});

describe("VercelApi sandbox file upload", () => {
	it("sends the tarball as the body of writeSessionFiles", async () => {
		const { calls, fetch } = recordFetch(200, {});
		const client = new VercelApi({ token: "token", fetch });
		const tarball = new Blob([new Uint8Array([0x1f, 0x8b, 0x08])], { type: "application/gzip" });

		await client.api.sandboxes.writeSessionFiles({
			pathParams: { sessionId: "sbx_1" },
			body: tarball,
			headers: { "x-cwd": "/home/vercel-sandbox" },
		});

		expect(calls).toHaveLength(1);
		expect(new URL(calls[0]?.url ?? "").pathname).toBe("/v2/sandboxes/sessions/sbx_1/fs/write");
		expect(calls[0]?.init?.body).toBe(tarball);
		expect(calls[0]?.init?.headers).toEqual(
			expect.objectContaining({
				"Content-Type": "application/gzip",
				"x-cwd": "/home/vercel-sandbox",
			}),
		);
	});
});

describe("VercelApi container registry uploads", () => {
	const repository = { teamSlug: "team", projectSlug: "project", repositoryName: "app" };

	function registryFetch(status: number, headers: Record<string, string>) {
		const calls: { url: string; init: RequestInit | undefined }[] = [];
		const fetch: FetchImpl = async (url, init) => {
			calls.push({ url, init });
			return new Response(null, { status, headers }) as never;
		};
		return { calls, client: new VercelApi({ token: "token", fetch }) };
	}

	it("uploads a blob in chunks and reads the upload Location from the response headers", async () => {
		const location = "/v2/team/project/app/blobs/uploads/uuid-1";
		const { calls, client } = registryFetch(202, { Location: location });
		const locations: (string | null)[] = [];
		const config = {
			onResponse: ({ headers }: ResponseInfo) => {
				locations.push(headers.get("Location"));
			},
		};
		const chunk = new Uint8Array([1, 2, 3]);

		await client.api.vcr.createByTeamSlugByProjectSlugByRepositoryNameBlobsUploads({
			pathParams: repository,
			config,
		});
		await client.api.vcr.updateByTeamSlugByProjectSlugByRepositoryNameBlobsUploadsByUuid({
			pathParams: { ...repository, uuid: "uuid-1" },
			body: chunk,
			config,
		});
		await client.api.vcr.replaceByTeamSlugByProjectSlugByRepositoryNameBlobsUploadsByUuid({
			pathParams: { ...repository, uuid: "uuid-1" },
			queryParams: { digest: "sha256:abc" },
			config,
		});

		expect(locations).toEqual([location, location, location]);
		expect(calls[1]?.init?.method).toBe("PATCH");
		expect(calls[1]?.init?.body).toBe(chunk);
		expect(calls[1]?.init?.headers).toEqual(
			expect.objectContaining({ "Content-Type": "application/octet-stream" }),
		);
		expect(new URL(calls[2]?.url ?? "").search).toBe("?digest=sha256%3Aabc");
		expect(calls[2]?.init?.body).toBeUndefined();
	});

	it("pushes a manifest as OCI JSON and reads its digest from Docker-Content-Digest", async () => {
		const { calls, client } = registryFetch(201, { "Docker-Content-Digest": "sha256:def" });
		const manifest = { schemaVersion: 2, mediaType: "application/vnd.oci.image.manifest.v1+json" };
		let digest: string | null = null;

		await client.api.vcr.replaceByTeamSlugByProjectSlugByRepositoryNameManifestsByReference({
			pathParams: { ...repository, reference: "latest" },
			body: manifest,
			config: {
				onResponse: ({ headers }) => {
					digest = headers.get("Docker-Content-Digest");
				},
			},
		});

		expect(digest).toBe("sha256:def");
		expect(calls[0]?.init?.body).toBe(JSON.stringify(manifest));
		expect(calls[0]?.init?.headers).toEqual(
			expect.objectContaining({ "Content-Type": "application/vnd.oci.image.manifest.v1+json" }),
		);
	});

	it("pushes manifest bytes by digest as is, under the Content-Type the caller gives", async () => {
		const { calls, client } = registryFetch(201, {});
		const index = new TextEncoder().encode(
			'{"schemaVersion":2,"mediaType":"application/vnd.oci.image.index.v1+json","manifests":[]}',
		);

		await client.api.vcr.replaceByTeamSlugByProjectSlugByRepositoryNameManifestsByReference({
			pathParams: { ...repository, reference: "sha256:0123" },
			body: index,
			config: { headers: { "Content-Type": "application/vnd.oci.image.index.v1+json" } },
		});

		expect(new URL(calls[0]?.url ?? "").pathname).toBe(
			"/v2/team/project/app/manifests/sha256%3A0123",
		);
		expect(calls[0]?.init?.body).toBe(index);
		expect(calls[0]?.init?.headers).toEqual(
			expect.objectContaining({ "Content-Type": "application/vnd.oci.image.index.v1+json" }),
		);
	});

	it("checks whether a blob exists with HEAD and reads its digest from the headers", async () => {
		const { calls, client } = registryFetch(200, { "Docker-Content-Digest": "sha256:abc" });
		let digest: string | null = null;

		await client.api.vcr.headByTeamSlugByProjectSlugByRepositoryNameBlobsByDigest({
			pathParams: { ...repository, digest: "sha256:abc" },
			config: {
				onResponse: ({ headers }) => {
					digest = headers.get("Docker-Content-Digest");
				},
			},
		});

		expect(calls[0]?.init?.method).toBe("HEAD");
		expect(new URL(calls[0]?.url ?? "").pathname).toBe("/v2/team/project/app/blobs/sha256%3Aabc");
		expect(digest).toBe("sha256:abc");
	});
});

describe("VercelApi remote cache artifactExists", () => {
	it("sends HEAD for the artifact and resolves a found one to undefined", async () => {
		const calls: { url: string; init: RequestInit | undefined }[] = [];
		const fetch: FetchImpl = async (url, init) => {
			calls.push({ url, init });
			return new Response(null, { status: 200 }) as never;
		};
		const client = new VercelApi({ token: "token", fetch });

		const found = await client.api.artifacts.artifactExists({
			pathParams: { hash: "abc123" },
			queryParams: { teamId: "team_1" },
		});

		expect(found).toBeUndefined();
		expectTypeOf(found).toEqualTypeOf<void>();
		expect(calls[0]?.init?.method).toBe("HEAD");
		const url = new URL(calls[0]?.url ?? "");
		expect(url.pathname).toBe("/v8/artifacts/abc123");
		expect(url.search).toBe("?teamId=team_1");
	});

	it("sends HEAD for the artifact through request()", async () => {
		const calls: { url: string; init: RequestInit | undefined }[] = [];
		const fetch: FetchImpl = async (url, init) => {
			calls.push({ url, init });
			return new Response(null, { status: 200 }) as never;
		};
		const client = new VercelApi({ token: "token", fetch });

		const found = await client.request("HEAD /v8/artifacts/{hash}", {
			pathParams: { hash: "abc123" },
		});

		expect(found).toBeUndefined();
		expectTypeOf(found).toEqualTypeOf<void>();
		expect(calls[0]?.init?.method).toBe("HEAD");
		expect(new URL(calls[0]?.url ?? "").pathname).toBe("/v8/artifacts/abc123");
		expectTypeOf<"artifacts.artifactExists">().toExtend<ApiOperationByMethod<"HEAD">>();
	});

	it("rejects a missing artifact with its 404 status", async () => {
		const fetch: FetchImpl = async () => new Response(null, { status: 404 }) as never;
		const client = new VercelApi({ token: "token", fetch });

		await expect(
			client.api.artifacts.artifactExists({ pathParams: { hash: "missing" } }),
		).rejects.toMatchObject({ status: 404 });
	});
});

describe("VercelApi responses without content", () => {
	it("resolves getEdgeConfigItem's 204 to undefined and keeps the item type for its 200", async () => {
		const fetch: FetchImpl = async () => new Response(null, { status: 204 }) as never;
		const client = new VercelApi({ token: "token", fetch });

		const item = await client.api.globalConfig.getEdgeConfigItem({
			pathParams: { edgeConfigId: "ecfg_1", edgeConfigItemKey: "missing" },
		});

		expect(item).toBeUndefined();
		expectTypeOf(item).toEqualTypeOf<GlobalConfigItem | void>();
	});

	it("types the experimentation global config HEAD check as void, not the GET body the spec copies", async () => {
		const calls: { url: string; init: RequestInit | undefined }[] = [];
		const fetch: FetchImpl = async (url, init) => {
			calls.push({ url, init });
			return new Response(null, { status: 200 }) as never;
		};
		const client = new VercelApi({ token: "token", fetch });

		const config =
			await client.api.marketplace.headInstallationsByIntegrationConfigurationIdResourcesByResourceIdExperimentationGlobalConfig(
				{ pathParams: { integrationConfigurationId: "icfg_1", resourceId: "res_1" } },
			);

		expect(config).toBeUndefined();
		expectTypeOf(config).toEqualTypeOf<void>();
		expect(calls[0]?.init?.method).toBe("HEAD");
		expect(new URL(calls[0]?.url ?? "").pathname).toBe(
			"/v1/installations/icfg_1/resources/res_1/experimentation/global-config",
		);
	});
});

describe("VercelApi baseUrl", () => {
	function setup(options: { baseUrl?: string } = {}) {
		const urls: string[] = [];
		const fetch: FetchImpl = async (url) => {
			urls.push(url);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { urls, client: new VercelApi({ token: "token", fetch, ...options }) };
	}

	it("sends request() and api proxy calls to the constructor's baseUrl", async () => {
		const { urls, client } = setup({ baseUrl: "https://proxy.test/vercel/" });
		await client.request("GET /v1/access-groups");
		await client.api.accessGroups.listAccessGroups();
		expect(urls).toEqual([
			"https://proxy.test/vercel/v1/access-groups",
			"https://proxy.test/vercel/v1/access-groups",
		]);
	});

	it("lets a call's config.baseUrl replace the constructor's", async () => {
		const { urls, client } = setup({ baseUrl: "https://ignored.test" });
		await client.request("GET /v1/access-groups", { config: { baseUrl: "https://per-call.test" } });
		expect(urls).toEqual(["https://per-call.test/v1/access-groups"]);
	});

	it("defaults to the API's own URL", async () => {
		const { urls, client } = setup();
		await client.request("GET /v1/access-groups");
		expect(urls).toEqual(["https://api.vercel.com/v1/access-groups"]);
	});

	it("exchanges an OAuth code at the constructor's baseUrl", async () => {
		const { urls, client } = setup({ baseUrl: "https://proxy.test/vercel" });
		await client.auth.accessToken({
			code: "c",
			redirectUri: "r",
			clientId: "i",
			clientSecret: "s",
		});
		expect(urls).toEqual(["https://proxy.test/vercel/v2/oauth/access_token"]);
	});
});

describe("VercelApi token function", () => {
	function setup() {
		const authorizations: unknown[] = [];
		const fetch: FetchImpl = async (_url, init) => {
			authorizations.push(init?.headers?.Authorization);
			return new Response("{}", {
				status: 200,
				headers: { "content-type": "application/json" },
			}) as never;
		};
		return { authorizations, fetch };
	}

	it("asks the token function again on every call from request() and the api proxy", async () => {
		const { authorizations, fetch } = setup();
		let current = 0;
		const client = new VercelApi({ fetch, token: async () => `token-${++current}` });
		await client.request("GET /v1/access-groups");
		await client.api.accessGroups.listAccessGroups();
		expect(authorizations).toEqual(["Bearer token-1", "Bearer token-2"]);
	});

	it("takes a synchronous token function", async () => {
		const { authorizations, fetch } = setup();
		const client = new VercelApi({ fetch, token: () => "fresh" });
		await client.request("GET /v1/access-groups");
		expect(authorizations).toEqual(["Bearer fresh"]);
	});

	it("sends no Authorization header when the function returns null", async () => {
		const { authorizations, fetch } = setup();
		const client = new VercelApi({ fetch, token: () => null });
		await client.request("GET /v1/access-groups");
		expect(authorizations).toEqual([undefined]);
	});

	it("uses a function assigned to the token field after construction", async () => {
		const { authorizations, fetch } = setup();
		const client = new VercelApi({ fetch, token: "first" });
		client.token = () => "second";
		await client.request("GET /v1/access-groups");
		expect(authorizations).toEqual(["Bearer second"]);
	});

	it("lets a call's own config.token win over the function", async () => {
		const { authorizations, fetch } = setup();
		const client = new VercelApi({ fetch, token: () => "client" });
		await client.api.accessGroups.listAccessGroups({ config: { token: "call" } });
		expect(authorizations).toEqual(["Bearer call"]);
	});

	it("rejects with what the token function threw, before calling fetch", async () => {
		const { authorizations, fetch } = setup();
		const failure = new Error("token expired");
		const client = new VercelApi({
			fetch,
			token: async () => {
				throw failure;
			},
		});
		await expect(client.request("GET /v1/access-groups")).rejects.toBe(failure);
		await expect(client.api.accessGroups.listAccessGroups()).rejects.toBe(failure);
		expect(authorizations).toEqual([]);
	});
});
