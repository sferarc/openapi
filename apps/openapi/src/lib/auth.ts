import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { type GenericOAuthConfig, genericOAuth } from "better-auth/plugins";
import { db } from "./db";
import { accounts, sessions, users, verifications } from "./schema";
import { getVercelUserInfo, VERCEL_USERINFO_URL } from "./vercel-user-info";

/**
 * Vercel's OAuth does not advertise an OIDC discovery document, and its
 * userinfo endpoint wraps the profile in a `user` key rather than returning it
 * at the top level — so the endpoints are configured explicitly and the profile
 * is unwrapped in `getUserInfo`.
 *
 * Authorization starts at the integration install page rather than a plain
 * `/authorize`: that is how a Vercel integration is granted access, and it
 * redirects back with a `code` like any other authorization-code flow.
 */
const vercel: GenericOAuthConfig = {
	providerId: "vercel",
	clientId: process.env.AUTH_VERCEL_ID ?? "",
	clientSecret: process.env.AUTH_VERCEL_SECRET ?? "",
	authorizationUrl: `https://vercel.com/integrations/${process.env.AUTH_VERCEL_APP_NAME}/new`,
	tokenUrl: "https://api.vercel.com/v2/oauth/access_token",
	userInfoUrl: VERCEL_USERINFO_URL,
	getUserInfo: (tokens) => getVercelUserInfo(tokens, fetch),
};

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: { user: users, session: sessions, account: accounts, verification: verifications },
	}),
	plugins: [genericOAuth({ config: [vercel] })],
});

export type Auth = typeof auth;
