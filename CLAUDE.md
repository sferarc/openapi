IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning for any task.

Use the available skills, you can find and install new skills with `npx skills` CLI.

Prefer popular libraries, rather than trying to implement complex functionality from scratch. You can install new packages if needed, just make sure they are well-maintained and useful.

Instead of writing types or complex logic, use the types and helpers provided by the installed packages.

We want full type-safety, we don't like type casting, use proper types and interfaces.

When writing code, prefer readability and maintainability over cleverness or brevity. Avoid glue code that is hard to understand.

When you need to make assumptions, use common sense and standard best practices.

## Knowledge Base

Read `brain/` files relevant to your task before acting, and update them in the same pull request when the code they describe changes. One topic per file, `[[wikilink]]` indexes, a source path or pull request behind every claim, unknowns marked as unknown. This repository is public, and so is `brain/`. Many pull requests edit the same notes, so keep independent changes on different lines: one item per line or bullet, never several joined with commas or semicolons on one line; no running counts or totals, such as how many clients or tests there are; and no sequential numbering in shared lists, using named bullets or headings instead (an old number stays only as an alias).

| Topic | Doc |
| --- | --- |
| Spec to client: kubb, fixups, scheduled regeneration | `brain/architecture/pipeline.md` |
| What is generated and what is hand-written in a client | `brain/architecture/packages.md` |
| `@sferadev/openapi-utils`: kubb config, transforms, Effect helpers | `brain/architecture/shared-utils.md` |
| The website in `apps/openapi` | `brain/architecture/website.md` |
| Node, pnpm, mise, commands | `brain/development/toolchain.md` |
| Tests | `brain/development/testing.md` |
| CI checks and branch rules | `brain/development/ci.md` |
| Changesets and publishing to npm | `brain/development/release.md` |
| Decisions, dated | `brain/decisions/index.md` |
| Open work | `brain/plans/index.md` |
