#!/usr/bin/env bash
# Pixqui deploy: pulls latest main, rebuilds frontend, installs server deps.
# Run from the repo root on the production box.
#
# Restart the Node process via aaPanel (Node Manager → Restart) AFTER this
# completes so the new server/ code + .env are picked up.

set -euo pipefail

cd "$(dirname "$0")"

echo "==> git pull"
git fetch --prune origin
git checkout main
git pull --ff-only origin main

echo "==> frontend: install + build"
npm ci
npm run build

echo "==> server: install"
cd server
npm ci --omit=dev
cd ..

echo
echo "Done. Now in aaPanel:"
echo "  Node.js Manager → pixqui-api project → Restart"
echo
echo "Frontend is live at the vhost root pointing to: $(pwd)/dist"
