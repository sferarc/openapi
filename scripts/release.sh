#!/bin/bash
set -euo pipefail

# Build every package, then publish the versions npm does not have yet (private packages are skipped).
pnpm turbo run build --filter="./packages/*"
pnpm changeset publish
