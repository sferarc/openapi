import { z } from "zod";

export const VERCEL_USERINFO_URL = "https://api.vercel.com/v2/user";

/** Vercel returns the profile nested under `user`, not at the top level. */
const vercelUserInfoSchema = z.object({
	user: z.object({
		id: z.string(),
		name: z.string().nullable(),
		email: z.string(),
		avatar: z.string().nullable(),
	}),
});

export async function getVercelUserInfo(tokens: { accessToken?: string }, fetchImpl: typeof fetch) {
	if (!tokens.accessToken) {
		throw new Error("Vercel token exchange returned no access token");
	}

	const response = await fetchImpl(VERCEL_USERINFO_URL, {
		headers: { Authorization: `Bearer ${tokens.accessToken}` },
	});

	if (!response.ok) {
		throw new Error(`Vercel userinfo request failed with ${response.status}`);
	}

	const { user } = vercelUserInfoSchema.parse(await response.json());

	return {
		id: user.id,
		name: user.name ?? user.email,
		email: user.email,
		image: user.avatar ?? undefined,
		// Vercel only issues tokens for confirmed accounts, so the address is
		// already verified by the time it reaches us.
		emailVerified: true,
	};
}
