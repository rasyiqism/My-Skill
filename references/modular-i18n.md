# Rasyiqi Scalable Modular Localization (i18n)

This specification details the domain-partitioned localization architecture designed for large-scale multilingual web applications. It eliminates massive monolithic 7,000+ line JSON dictionary files while maintaining 100% backward compatibility and optimized initial bundle sizes.

---

## 1. The Monolithic Dictionary Problem

Standard i18n architectures store all translations in giant monolithic files (`locales/id.json`, `locales/en.json`). In large applications, these files grow beyond 7,000 lines:
- **Merge Conflicts**: Multiple developers editing different features collide in the same giant JSON file.
- **Cognitive Overload**: Searching and scrolling through 300KB+ JSON files is slow and error-prone.
- **Bloated First Contentful Paint (FCP)**: The browser is forced to download thousands of admin and internal strings on initial landing page load.

---

## 2. Domain-Partitioned Architecture

Instead of single monolithic files, translations are organized into **focused domain files** (each 200–1,500 lines):

```text
src/client/locales/
├── id/
│   ├── core.json         # common, nav, footer, home, features, legal, help (~1,300 lines)
│   ├── auth.json         # login, register, reset password, passkey, OTP (~200 lines)
│   ├── dashboard.json    # products, orders, finance, coupons, affiliate (~1,400 lines)
│   ├── admin.json        # superadmin layout, analytics, moderation, gateways (~1,500 lines)
│   ├── builder.json      # visual landing page studio, block editors (~890 lines)
│   ├── checkout.json     # checkout flow, payment finish, paywalls (~430 lines)
│   ├── hub.json          # customer hub, LMS courses, appointments (~720 lines)
│   └── storefront.json   # bio link tree, storefront themes, directory (~500 lines)
│
└── en/
    ├── core.json
    ├── auth.json
    ├── dashboard.json
    ├── admin.json
    ├── builder.json
    ├── checkout.json
    ├── hub.json
    └── storefront.json
```

---

## 3. Progressive Loading Strategy

To optimize Core Web Vitals (CWV):
1. **`id-core.json` (~26 KB)**: Contains only the critical `CORE_KEYS` (`common`, `nav`, `footer`, `home`, `features`, `about`, `legal`, `auth`). This is bundled synchronously into the initial client chunk for instant FCP.
2. **`id-extended.json`**: Contains heavier administrative and builder keys. It is imported dynamically in the background after the initial route mounts.

```typescript
// Runtime Loader Pattern (src/client/i18n/index.ts)
import { createI18n } from 'vue-i18n';
import idCore from '../locales/id-core.json';

const i18n = createI18n({
  legacy: false,
  locale: 'id',
  fallbackLocale: 'en',
  messages: {
    id: idCore
  }
});

// Asynchronously load extended keys after hydration
export async function loadExtendedLocales() {
  const extended = await import('../locales/id-extended.json');
  i18n.global.mergeLocaleMessage('id', extended.default);
}
```

---

## 4. Automated Build Compiler (`split-locales.ts`)

A fast build-step compiler merges all modular files into the master dictionaries and generates the optimized core/extended chunks automatically before build or typecheck:

```bash
bun ./scripts/split-locales.ts
# ✓ Successfully compiled modular locales into id.json, en.json, id-core.json, and id-extended.json
```

This ensures that adding or modifying keys inside `locales/id/*.json` automatically propagates across the whole application without touching monolithic files.

---

## 5. Developer CLI Helper (`i18n:add`)

Never manually scroll through JSON files to add translation keys. Use the terminal CLI helper:

```bash
# Syntax: bun run i18n:add <keyPath> "<indonesianText>" "[englishText]"
bun run i18n:add orders.trackShipping "Lacak Pengiriman" "Track Shipment"
bun run i18n:add bio.customTheme "Tema Kustom" "Custom Theme"
bun run i18n:add common.retry "Coba Lagi" "Retry"
```

The CLI tool:
1. Detects which domain file owns the top-level section (e.g., `orders` $\to$ `dashboard.json`).
2. Inserts the nested key into both `locales/id/` and `locales/en/`.
3. Recompiles all master files in under 15ms.

See [split-locales.ts](../templates/split-locales.ts) and [i18n-add.ts](../templates/i18n-add.ts) for implementation details.
