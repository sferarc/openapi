# Website

`apps/openapi` (`@sferadev/openapi-website`, private) is a Next.js app that lists the clients with install and usage snippets (`apps/openapi/src/app/page.tsx`). Changesets ignores it (`.changeset/config.json`).

- The page is statically rendered and revalidates every 6 hours (`revalidate = 21600` in `apps/openapi/src/app/page.tsx`). Each version it shows comes from the npm registry, and each lookup is cached for an hour (`apps/openapi/src/lib/npm.ts`), so a new release can take up to 6 hours to appear. A package missing from npm shows as `unknown`.
- Auth is Better Auth with a Vercel OAuth provider (`apps/openapi/src/lib/auth.ts`, `apps/openapi/src/app/api/auth/[...all]/route.ts`), stored in Postgres through Drizzle (`apps/openapi/src/lib/db.ts`, migrations in `apps/openapi/drizzle/`). The Vercel userinfo fetch and profile mapping live in `apps/openapi/src/lib/vercel-user-info.ts`, apart from Better Auth and the database so they can be unit-tested ([[development/testing]]).
- Its build depends on `vercel-api-js` (`turbo.json`). The environment variables it reads, which `turbo.json` also lists for its build:
  - `DATABASE_URL`: `apps/openapi/src/lib/db.ts` and `apps/openapi/drizzle.config.ts`.
  - `AUTH_VERCEL_ID`, `AUTH_VERCEL_SECRET`, `AUTH_VERCEL_APP_NAME`: the Vercel OAuth provider in `apps/openapi/src/lib/auth.ts`.
  - `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`: read by Better Auth itself, since `auth.ts` passes no `secret` or `baseURL`.

## Hosting

The root `README.md` links the site at `openapi.sferadev.com`, and the repository's homepage field names a `vercel.app` address. Pull requests get a `Vercel` status that deploys a preview (for example #5), so the site deploys through Vercel's Git integration rather than a workflow in this repository; its project settings and environment live in Vercel, not here. The old `preview.yml` published package previews, not the site, and was removed in 8ff9fa1.
