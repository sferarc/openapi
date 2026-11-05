# Agent skill

`skills/openapi-clients/SKILL.md` is an Agent Skill (format at https://agentskills.io) for coding agents that call one of the clients (#355). Its front matter `name` matches the folder and its `description` names every API with a client, so an agent loads it only when one of them comes up. `npx skills add sferarc/openapi` installs it from the `skills/` folder; that the command picks it up was not tried before the merge.

- It covers picking the package and class, the auth option and the env var each README uses, finding an operation in `OPERATIONS.md` ([[packages]]), `client.api` versus `client.request()`, `ApiResponseError`, line-delimited JSON and Server-Sent Events streams, and the `effect` entry.
- Its samples use `vercel-api-js` and `v0-api`; everything it states comes from the client READMEs and `src/utils/fetcher.ts`, so a change there that alters a documented behaviour should update the skill too.
- `.github/workflows/scripts/skill-snippets.test.ts` type checks every `ts` sample against the client sources ([[development/testing]]).
- It is not part of any npm package and needs no changeset.
