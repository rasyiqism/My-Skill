#!/usr/bin/env bash
set -e

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="${1:-.}"
SKILL_NAME="my-skill"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Target directory '$TARGET_DIR' does not exist."
  echo "Usage: ./scripts/install-to-workspace.sh [path/to/project]"
  exit 1
fi

RESOLVED_TARGET="$(cd "$TARGET_DIR" && pwd)"

echo "=========================================================="
echo "⚡ Installing My Skill ($SKILL_NAME) into Project Workspace"
echo "Standard: https://agentskills.io"
echo "Project: $RESOLVED_TARGET"
echo "=========================================================="

# 1. Primary Target: Universal AAIF / agentskills.io standard
PRIMARY_SKILLS_DIR="$RESOLVED_TARGET/.agents/skills"
mkdir -p "$PRIMARY_SKILLS_DIR"
PRIMARY_LINK="$PRIMARY_SKILLS_DIR/$SKILL_NAME"

if [ -L "$PRIMARY_LINK" ] || [ -d "$PRIMARY_LINK" ]; then
  rm -rf "$PRIMARY_LINK"
fi

ln -s "$SOURCE_DIR" "$PRIMARY_LINK"
echo "✓ [Universal Standard] Linked: $PRIMARY_LINK"

# 2. Agent-Specific Convenience Links (Claude, Cursor, Gemini, Codex)
AGENT_DIRS=(
  "$RESOLVED_TARGET/.claude/skills/$SKILL_NAME"
  "$RESOLVED_TARGET/.cursor/skills/$SKILL_NAME"
  "$RESOLVED_TARGET/.gemini/skills/$SKILL_NAME"
  "$RESOLVED_TARGET/.codex/skills/$SKILL_NAME"
)

for AGENT_LINK in "${AGENT_DIRS[@]}"; do
  PARENT_DIR="$(dirname "$AGENT_LINK")"
  mkdir -p "$PARENT_DIR"
  if [ -L "$AGENT_LINK" ] || [ -d "$AGENT_LINK" ]; then
    rm -rf "$AGENT_LINK"
  fi
  ln -s "$SOURCE_DIR" "$AGENT_LINK"
  echo "✓ [Agent Compatibility] Linked: $AGENT_LINK"
done

echo "=========================================================="
echo "🎉 Successfully installed My Skill into project workspace!"
echo "Any AI agent (Antigravity, Claude Code, Cursor, Codex, Copilot) opening this workspace will auto-detect the skill."
echo "=========================================================="
