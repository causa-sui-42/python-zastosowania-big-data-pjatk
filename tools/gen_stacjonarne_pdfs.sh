#!/usr/bin/env bash
# Renders all stacjonarne Marp decks to PDF with the real Marp CLI
# (same renderer as the zaoczne decks / VS Code "Marp: Export Slide Deck").
set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p website/static/stacjonarne/pdfs

for f in presentations/stacjonarne/wyk*.md; do
  out="website/static/stacjonarne/pdfs/$(basename "$f" .md).pdf"
  echo "Converting $f -> $out"
  npx --yes @marp-team/marp-cli@latest "$f" --pdf --allow-local-files -o "$out"
done
