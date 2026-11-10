#!/usr/bin/env bash
set -e

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_NAME="my-skill"

echo "=========================================================="
echo "⚡ Installing My Skill ($SKILL_NAME) Globally"
echo "Standard: https://agentskills.io"
echo "Source: $SOURCE_DIR"
echo "=========================================================="

# List of global targets for supported AI agents
TARGETS=(
  "$HOME/.agents/skills/$SKILL_NAME"          # Universal AAIF / agentskills.io standard
  "$HOME/.gemini/config/skills/$SKILL_NAME"  # Google Antigravity & Gemini CLI
  "$HOME/.claude/skills/$SKILL_NAME"         # Claude Code & Anthropic tools
  "$HOME/.cursor/skills/$SKILL_NAME"         # Cursor AI Editor
  "$HOME/.codex/skills/$SKILL_NAME"          # OpenAI Codex CLI
)

INSTALLED_COUNT=0

for TARGET_LINK in "${TARGETS[@]}"; do
  PARENT_DIR="$(dirname "$TARGET_LINK")"
  mkdir -p "$PARENT_DIR"

  if [ -L "$TARGET_LINK" ] || [ -d "$TARGET_LINK" ]; then
    rm -rf "$TARGET_LINK"
  fi

  ln -s "$SOURCE_DIR" "$TARGET_LINK"
  echo "✓ Linked: $TARGET_LINK"
  INSTALLED_COUNT=$((INSTALLED_COUNT + 1))
done

# Keep backwards compatibility link for rasyiqi-skill in antigravity
ANTIGRAVITY_LEGACY="$HOME/.gemini/config/skills/rasyiqi-skill"
if [ ! -e "$ANTIGRAVITY_LEGACY" ]; then
  ln -s "$SOURCE_DIR" "$ANTIGRAVITY_LEGACY"
  echo "✓ Linked legacy alias: $ANTIGRAVITY_LEGACY"
fi

echo "=========================================================="
echo "🎉 Successfully installed My Skill globally to $INSTALLED_COUNT agent environments!"
echo "Supported agents: Antigravity, Claude Code, Cursor, Codex, and Universal (.agents/)."
echo "=========================================================="
