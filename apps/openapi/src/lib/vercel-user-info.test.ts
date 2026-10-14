import { describe, expect, it, vi } from "vitest";
import { getVercelUserInfo, VERCEL_USERINFO_URL } from "./vercel-user-info";

function respondWith(body: unknown, status = 200) {
	return vi.fn<typeof fetch>(async () => Response.json(body, { status }));
}

describe("getVercelUserInfo", () => {
	it("throws without an access token and makes no request", async () => {
		const fetchImpl = respondWith({});

		await expect(getVercelUserInfo({}, fetchImpl)).rejects.toThrow("no access token");
		expect(fetchImpl).not.toHaveBeenCalled();
	});

	it("throws with the status when the request fails", async () => {
		const fetchImpl = respondWith({ error: "forbidden" }, 403);

		await expect(getVercelUserInfo({ accessToken: "token" }, fetchImpl)).rejects.toThrow(
			"failed with 403",
		);
	});

	it("sends the access token as a bearer token", async () => {
		const fetchImpl = respondWith({
			user: { id: "u1", name: "Ada", email: "ada@example.com", avatar: null },
		});

		await getVercelUserInfo({ accessToken: "token-123" }, fetchImpl);

		expect(fetchImpl).toHaveBeenCalledWith(VERCEL_USERINFO_URL, {
			headers: { Authorization: "Bearer token-123" },
		});
	});

	it("maps the nested profile", async () => {
		const fetchImpl = respondWith({
			user: { id: "u1", name: "Ada", email: "ada@example.com", avatar: "abc123" },
		});

		await expect(getVercelUserInfo({ accessToken: "token" }, fetchImpl)).resolves.toEqual({
			id: "u1",
			name: "Ada",
			email: "ada@example.com",
			image: "abc123",
			emailVerified: true,
		});
	});

	it("falls back to the email for a null name and omits a null avatar", async () => {
		const fetchImpl = respondWith({
			user: { id: "u1", name: null, email: "ada@example.com", avatar: null },
		});

		await expect(getVercelUserInfo({ accessToken: "token" }, fetchImpl)).resolves.toEqual({
			id: "u1",
			name: "ada@example.com",
			email: "ada@example.com",
			image: undefined,
			emailVerified: true,
		});
	});

	it("rejects a profile that is not nested under user", async () => {
		const fetchImpl = respondWith({
			id: "u1",
			name: "Ada",
			email: "ada@example.com",
			avatar: null,
		});

		await expect(getVercelUserInfo({ accessToken: "token" }, fetchImpl)).rejects.toThrow();
	});
});
