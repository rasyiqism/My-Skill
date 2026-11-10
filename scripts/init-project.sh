#!/usr/bin/env bash
set -e

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="${1:-}"

if [ -z "$TARGET_DIR" ]; then
  echo "Usage: ./scripts/init-project.sh /path/to/new-project"
  exit 1
fi

mkdir -p "$TARGET_DIR"
RESOLVED_TARGET="$(cd "$TARGET_DIR" && pwd)"

echo "=========================================================="
echo "⚡ Scaffolding New Project with Rasyiqi Developer Blueprint"
echo "Target Directory: $RESOLVED_TARGET"
echo "=========================================================="

# 1. Create Clean Domain Folder Structure
echo "Creating directory structure..."
mkdir -p "$RESOLVED_TARGET/src/client/components/common"
mkdir -p "$RESOLVED_TARGET/src/client/composables"
mkdir -p "$RESOLVED_TARGET/src/client/styles"
mkdir -p "$RESOLVED_TARGET/src/client/views"
mkdir -p "$RESOLVED_TARGET/src/server/core/cache"
mkdir -p "$RESOLVED_TARGET/src/server/core/utils"
mkdir -p "$RESOLVED_TARGET/src/server/db"
mkdir -p "$RESOLVED_TARGET/src/server/routes"
mkdir -p "$RESOLVED_TARGET/src/locales/core"
mkdir -p "$RESOLVED_TARGET/scripts"

# 2. Copy Starter Assets & Primitives
echo "Copying standard primitives & boilerplates from assets/..."
cp "$SOURCE_DIR/assets/AppIcon.vue" "$RESOLVED_TARGET/src/client/components/common/AppIcon.vue"
cp "$SOURCE_DIR/assets/BottomSheet.vue" "$RESOLVED_TARGET/src/client/components/common/BottomSheet.vue"
cp "$SOURCE_DIR/assets/AppToast.vue" "$RESOLVED_TARGET/src/client/components/common/AppToast.vue"
cp "$SOURCE_DIR/assets/useToast.ts" "$RESOLVED_TARGET/src/client/composables/useToast.ts"
cp "$SOURCE_DIR/assets/design-system.css" "$RESOLVED_TARGET/src/client/styles/design-system.css"

cp "$SOURCE_DIR/assets/inMemoryCache.ts" "$RESOLVED_TARGET/src/server/core/cache/inMemoryCache.ts"
cp "$SOURCE_DIR/assets/safeOutboundUrl.ts" "$RESOLVED_TARGET/src/server/core/utils/safeOutboundUrl.ts"
cp "$SOURCE_DIR/assets/verifyWebhookHmac.ts" "$RESOLVED_TARGET/src/server/core/utils/verifyWebhookHmac.ts"
cp "$SOURCE_DIR/assets/db-schema-starter.ts" "$RESOLVED_TARGET/src/server/db/schema.ts"

cp "$SOURCE_DIR/assets/split-locales.ts" "$RESOLVED_TARGET/scripts/split-locales.ts"
cp "$SOURCE_DIR/assets/i18n-add.ts" "$RESOLVED_TARGET/scripts/i18n-add.ts"

# 3. Create starter locale dictionaries
if [ ! -f "$RESOLVED_TARGET/src/locales/core/id.json" ]; then
  cat <<'EOF' > "$RESOLVED_TARGET/src/locales/core/id.json"
{
  "app_name": "Rasyiqi App",
  "save": "Simpan",
  "cancel": "Batal",
  "delete": "Hapus",
  "edit": "Ubah",
  "search": "Cari",
  "loading": "Memuat...",
  "empty": "Belum ada data."
}
EOF
fi

if [ ! -f "$RESOLVED_TARGET/src/locales/core/en.json" ]; then
  cat <<'EOF' > "$RESOLVED_TARGET/src/locales/core/en.json"
{
  "app_name": "Rasyiqi App",
  "save": "Save",
  "cancel": "Cancel",
  "delete": "Delete",
  "edit": "Edit",
  "search": "Search",
  "loading": "Loading...",
  "empty": "No data available."
}
EOF
fi

# 4. Generate package.json if not present
if [ ! -f "$RESOLVED_TARGET/package.json" ]; then
  echo "Generating starter package.json..."
  PROJECT_NAME="$(basename "$RESOLVED_TARGET")"
  cat <<EOF > "$RESOLVED_TARGET/package.json"
{
  "name": "$PROJECT_NAME",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "bun run locales:build && vite build",
    "preview": "vite preview",
    "typecheck": "bun run locales:build && tsc --noEmit",
    "test": "bun test",
    "test:coverage": "bun test --coverage",
    "locales:build": "bun scripts/split-locales.ts",
    "i18n:add": "bun scripts/i18n-add.ts"
  },
  "dependencies": {
    "vue": "^3.5.0",
    "vue-router": "^4.4.0",
    "drizzle-orm": "^0.38.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0"
  }
}
EOF
fi

# 5. Link My Skill into the Project
echo "Linking My Skill into project agent workspace..."
"$SOURCE_DIR/scripts/install-to-workspace.sh" "$RESOLVED_TARGET"

echo "=========================================================="
echo "🎉 Project scaffolded successfully at $RESOLVED_TARGET!"
echo "To get started:"
echo "  cd $RESOLVED_TARGET"
echo "  bun install"
echo "  bun run dev"
echo "=========================================================="
