# Toolchain

`mise.toml` pins the Node and pnpm versions, with checksums in `mise.lock`; read the current pins there, since dependency update pull requests move them (#14 took them to Node `26.11.1` and pnpm `12.11.2`, still current on 2026-10-15). `package.json` repeats the pnpm version in `packageManager` and asks for Node 22 or newer in `engines`.

```bash
mise install
pnpm install --frozen-lockfile
pnpm tsc && pnpm check && pnpm test
pnpm generate --filter=<package>
```

## Commands (`package.json`)

| Command | Runs |
| --- | --- |
| `pnpm tsc` | `tsc --noEmit` in every workspace through Turborepo, after building dependencies; the website runs `next typegen` first so route types are checked too |
| `pnpm check` | `biome check .`, `knip --config configs/knip.json`, then `is-tree-shakable` on every package |
| `pnpm check:fix` | `biome check . --write` |
| `pnpm test` | `vitest run` in workspaces that define `test` |
| `pnpm build` | `bunchee` per package, `next build` for the website |
| `pnpm generate` | kubb per client, see [[architecture/pipeline]] |

Biome checks only `.ts`, `.tsx`, `.js`, `.jsx` and `.json` files (`biome.json`), so Markdown is not linted. It skips `packages/cloudflare-api-js/src/generated/types.ts`, which is larger than `files.maxSize` and takes minutes to check, and turns off `noTemplateCurlyInString` under `generated/` directories because upstream spec descriptions contain `${...}` text. `pnpm check` is expected to print no warnings.

Knip analyses generated code like any other file: entry files re-export it, so an `ignore` pattern for `generated/**` is redundant and knip reports it as a hint. The website's `project` glob includes `.css` so knip sees the Tailwind imports in `globals.css`. Configuration hints are treated as noise to fix, not to tolerate.

## Dependencies

`pnpm-workspace.yaml` uses a strict catalog with exact versions: every workspace dependency is `catalog:`. One entry carries a comment that explains why it must not move freely: the `typescript` 7 and `@typescript/typescript6` pair, which bunchee needs to emit declarations. `overrides` pins patched versions of transitive dependencies, and `minimumReleaseAgeExclude` is kept empty on purpose (comment above it).

## Hooks

`lefthook.yml` runs `biome check --write` on staged files before a commit and rejects commit messages that carry Claude Code attribution. `pnpm install` installs the hooks.
