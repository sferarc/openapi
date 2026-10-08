# Toolchain

`mise.toml` pins Node `26.10.0` and pnpm `12.10.1`, with checksums in `mise.lock`. `package.json` repeats the pnpm version in `packageManager` and asks for Node 22 or newer in `engines`.

```bash
mise install
pnpm install --frozen-lockfile
pnpm tsc && pnpm check && pnpm test
pnpm generate --filter=<package>
```

## Commands (`package.json`)

| Command | Runs |
| --- | --- |
| `pnpm tsc` | `tsc --noEmit` in every workspace through Turborepo, after building dependencies |
| `pnpm check` | `biome check .`, `knip --config configs/knip.json`, then `is-tree-shakable` on every package |
| `pnpm check:fix` | `biome check . --write` |
| `pnpm test` | `vitest run` in workspaces that define `test` |
| `pnpm build` | `bunchee` per package, `next build` for the website |
| `pnpm generate` | kubb per client, see [[architecture/pipeline]] |

Biome checks only `.ts`, `.tsx`, `.js`, `.jsx` and `.json` files (`biome.json`), so Markdown is not linted.

## Dependencies

`pnpm-workspace.yaml` uses a strict catalog with exact versions: every workspace dependency is `catalog:`. Two entries carry comments that explain why they must not move freely: `effect` ([[decisions/2026-10-08-effect-3-kept-back]]) and the `typescript` 7 and `@typescript/typescript6` pair, which bunchee needs to emit declarations. `overrides` pins patched versions of transitive dependencies, and `minimumReleaseAgeExclude` is kept empty on purpose (comment above it).

## Hooks

`lefthook.yml` runs `biome check --write` on staged files before a commit and rejects commit messages that carry Claude Code attribution. `pnpm install` installs the hooks.
