# Website

`apps/openapi` (`@sferadev/openapi-website`, private) is a Next.js app that lists the clients with install and usage snippets (`apps/openapi/src/app/page.tsx`). Changesets ignores it (`.changeset/config.json`).

- Versions shown on the page come from the npm registry at request time, cached for an hour (`apps/openapi/src/lib/npm.ts`). A failed lookup renders `unknown` and logs one JSON line naming the package: `npm package not published` with `status: 404`, or `npm registry unavailable` with the other status, or a `reason` for a network or JSON parse error.
- `GET /api/health` (`apps/openapi/src/app/api/health/route.ts`) runs `select 1` through the Drizzle `db` with a 3 second limit and returns `{ status, checks: { database } }`: 200 when it succeeds, 503 otherwise. A failure is logged server side with the driver error's name and message, never the connection string. The route is dynamic and sends `Cache-Control: no-store`, takes no auth and reads no new environment variables.
- Auth is Better Auth with a Vercel OAuth provider (`apps/openapi/src/lib/auth.ts`, `apps/openapi/src/app/api/auth/[...all]/route.ts`), stored in Postgres through Drizzle (`apps/openapi/src/lib/db.ts`, migrations in `apps/openapi/drizzle/`). The Vercel userinfo fetch and profile mapping live in `apps/openapi/src/lib/vercel-user-info.ts`, apart from Better Auth and the database so they can be unit-tested ([[development/testing]]).
- Its build depends on `vercel-api-js` (`turbo.json`) and reads the environment variables listed in `turbo.json`.

## Hosting

The root `README.md` links the site at `openapi.sferadev.com`, and the repository's homepage field names a `vercel.app` address. Pull requests get a `Vercel` status that deploys a preview (for example #5), so the site deploys through Vercel's Git integration rather than a workflow in this repository; its project settings and environment live in Vercel, not here. The old `preview.yml` published package previews, not the site, and was removed in 8ff9fa1.
