#!/usr/bin/env bash
# Regenerates BERTIT-SABIR-CV.pdf from _cv/cv.html.
# Uses the playwright-core bundled with the global @playwright/cli install.
set -euo pipefail
export NODE_PATH="${NODE_PATH:-$(npm root -g)/@playwright/cli/node_modules}"
exec node "$(dirname "$0")/build.cjs" "$@"
