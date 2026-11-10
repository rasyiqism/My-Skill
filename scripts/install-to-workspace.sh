#!/usr/bin/env bash
set -e

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="${1:-.}"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Target directory '$TARGET_DIR' does not exist."
  echo "Usage: ./scripts/install-to-workspace.sh [path/to/project]"
  exit 1
fi

DEST_SKILLS_DIR="$(cd "$TARGET_DIR" && pwd)/.agents/skills"
TARGET_LINK="$DEST_SKILLS_DIR/my-skill"

echo "=========================================================="
echo "Installing My Skill into project workspace..."
echo "Project: $TARGET_DIR"
echo "Skills Destination: $TARGET_LINK"
echo "=========================================================="

mkdir -p "$DEST_SKILLS_DIR"

if [ -L "$TARGET_LINK" ] || [ -d "$TARGET_LINK" ]; then
  echo "Removing existing symlink / folder at $TARGET_LINK..."
  rm -rf "$TARGET_LINK"
fi

ln -s "$SOURCE_DIR" "$TARGET_LINK"

echo "✓ Successfully linked My Skill into $TARGET_LINK"
echo "The project's AI agent now has full access to the My Skill engineering blueprint."
