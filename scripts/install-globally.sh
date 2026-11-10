#!/usr/bin/env bash
set -e

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GLOBAL_SKILLS_DIR="$HOME/.gemini/config/skills"
TARGET_LINK="$GLOBAL_SKILLS_DIR/rasyiqi-skill"

echo "=========================================================="
echo "Installing Rasyiqi-Skill globally into Antigravity..."
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_LINK"
echo "=========================================================="

mkdir -p "$GLOBAL_SKILLS_DIR"

if [ -L "$TARGET_LINK" ] || [ -d "$TARGET_LINK" ]; then
  echo "Removing existing symlink / folder at $TARGET_LINK..."
  rm -rf "$TARGET_LINK"
fi

ln -s "$SOURCE_DIR" "$TARGET_LINK"

echo "✓ Successfully symlinked Rasyiqi-Skill globally!"
echo "Antigravity will now automatically detect 'rasyiqi-skill' in any workspace."
