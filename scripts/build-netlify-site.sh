#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PUBLISH_DIR="$ROOT_DIR/.netlify-site"
SITE_DIRS=(
  "asanorajewels"
  "forever_ammaar"
  "perfume"
  "gifts_shop"
  "fashion_home"
  "zm_cravings"
  "Jewels"
  "latelier"
)

rm -rf "$PUBLISH_DIR"
mkdir -p "$PUBLISH_DIR"

cp "$ROOT_DIR/index.html" "$PUBLISH_DIR/index.html"

for dir in "${SITE_DIRS[@]}"; do
  if [[ ! -f "$ROOT_DIR/$dir/index.html" ]]; then
    echo "Missing entrypoint: $dir/index.html" >&2
    exit 1
  fi

  cp -R "$ROOT_DIR/$dir" "$PUBLISH_DIR/$dir"
done
