# Website

`apps/openapi` (`@sferadev/openapi-website`, private) is a Next.js app that lists the clients with install and usage snippets (`apps/openapi/src/app/page.tsx`). Changesets ignores it (`.changeset/config.json`).

- Versions shown on the page come from the npm registry at request time, cached for an hour (`apps/openapi/src/lib/npm.ts`). A package missing from npm shows as `unknown`.
- Auth is Better Auth with a Vercel OAuth provider (`apps/openapi/src/lib/auth.ts`, `apps/openapi/src/app/api/auth/[...all]/route.ts`), stored in Postgres through Drizzle (`apps/openapi/src/lib/db.ts`, migrations in `apps/openapi/drizzle/`).
- Its build depends on `vercel-api-js` (`turbo.json`) and reads the environment variables listed in `turbo.json`.

## Hosting

The root `README.md` links the site at `openapi.sferadev.com`, and the repository's homepage field names a `vercel.app` address. Pull requests get a `Vercel` status that deploys a preview (for example #5), so the site deploys through Vercel's Git integration rather than a workflow in this repository; its project settings and environment live in Vercel, not here. The old `preview.yml` published package previews, not the site, and was removed in 8ff9fa1.
