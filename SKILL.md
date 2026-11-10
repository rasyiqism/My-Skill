---
name: my-skill
description: >-
  Battle-tested full-stack engineering blueprint and developer standards for modern web applications and SaaS.
  Use when designing, building, scaffolding, or refactoring full-stack applications requiring anti-slop UI/UX,
  tactile micro-interactions, custom vector AppIcon system, Bun runtime, Vue 3 Composition API,
  Tailwind CSS v4 semantic tokens, Drizzle ORM atomic transactions, multi-tier security (anti-SSRF outbound fetcher,
  anti-IDOR multi-tenant guards, HMAC webhook idempotency), SingleFlight SWR caching, and modular i18n architecture.
license: MIT
compatibility: Universal. Compatible with all AI agents supporting the agentskills.io standard (Antigravity, Claude Code, Cursor, OpenAI Codex, GitHub Copilot, Roo Code, Cline, Windsurf).
metadata:
  author: rasyiqi
  version: "1.0.0"
  specification: "https://agentskills.io"
  repository: "https://github.com/rasyiqi-code/My-Skill"
---

# My Skill: The Signature Developer Blueprint

This skill encapsulates the battle-tested engineering standards, architectural patterns, UI/UX philosophy, and developer workflows developed and refined for high-performance modern web applications and SaaS systems.

When building any new application or refactoring an existing project under this skill, treat these principles not merely as suggestions, but as the **default engineering law**.

---

## 1. Quick Navigation & Reference Guides

This skill is designed with progressive disclosure. For deep-dive specifications, refer to the accompanying reference files:

1. [Design System & Tokens](./references/design-system.md): Formal design tokens, CSS variables, concentric radius, spacing grid, and standard component primitives.
2. [UI/UX & Design Craft](./references/ui-ux-craft.md): The Anti-Slop visual system, 5 AI Slop Sins, micro-interactions, mobile ergonomics, typography, and `<AppIcon>` standard.
3. [Architecture & Patterns](./references/architecture-patterns.md): Domain-driven modular structure, atomic transactions, SingleFlight SWR cache, and idempotent webhook pipelines.
4. [Tech Stack & Tooling](./references/stack-tooling.md): Bun ecosystem, Vue 3 Composition API (`<script setup lang="ts">`), Tailwind CSS v4, and Drizzle ORM.
5. [Security & Compliance](./references/security-compliance.md): Anti-SSRF safe outbound fetcher, multi-tenant anti-IDOR guards, token privilege isolation, and cryptographic webhook verification.
6. [Modular i18n Localization](./references/modular-i18n.md): Domain-partitioned JSON localization, initial bundle chunking, automated build compiler, and terminal CLI helpers.
7. [Performance, Lighthouse 100 & SEO](./references/performance-lighthouse-seo.md): The Perfectionist's mandate for Core Web Vitals (LCP < 1.2s, INP < 100ms, CLS = 0), SEO 100, zero memory leaks, and lightweight CPU/RAM resource hygiene.
8. [Android UI/UX & Resource Craft](./references/android-ui-ux-craft.md): Standar antarmuka Android (ergonomi thumb-zone 60%, edge-to-edge full-bleed, haptic feedback, spring physics) dan anggaran RAM <80MB anti-LMK.

---

## 2. Core Pillars of the Rasyiqi Blueprint

### Pillar I: The Tech Stack & Engineering Standards (Fast, Light, Strictly Typed)
- **Matriks Prioritas Stack 1–10 (Berdasarkan SEO & Hemat RAM/CPU VPS)**: Pilihan teknologi disesuaikan dengan kebutuhan proyek, namun wajib mematuhi sistem ranking efisiensi:
  - **Prioritas 1 (Golden Standard)**: **Drizzle ORM** (zero runtime overhead, ~0 MB), **Bun Runtime** (ultra-lightweight ~30 MB idle), **Tailwind CSS v4** (bundle <15KB), **Vue 3 / Astro / Nuxt 3 SSG** (Lighthouse 100, LCP < 1.2s), dan **Elysia / Hono** (TTFB < 5ms).
  - **Prioritas 2–3**: Kysely, Svelte 5.
  - **Hindari Peringkat Bawah (P6–P10)**: Prisma (~200MB RAM daemon), Next.js (~500MB RAM server), dan NestJS (reflection bloat) yang memicu OOM di VPS murah ($4/bulan, 1 vCPU, 1 GB RAM).
- **Desktop & Android Resource Optimization**:
  - **Desktop**: Prioritaskan **Tauri v2** (Rust + native OS WebView, RAM ~30–50MB, binary <10MB). Hindari Electron (300MB–600MB+ RAM).
  - **Android**: Prioritaskan **Kotlin + Jetpack Compose** (RAM <60–80MB, proteksi LMK, render 60/120 FPS, WorkManager batched sync).
- **Runtime**: **Bun** secara eksklusif (`bun run`, `bun test`, `bunx`, dan native Bun APIs).
- **Frontend**: **Vue 3 dengan `<script setup lang="ts">`** atau **Astro / Nuxt 3 SSG** untuk portal konten SEO-first. Type-safe props dan emits.
- **Styling**: **Tailwind CSS v4** & Design Tokens. CSS-first design dengan semantic theme tokens.
- **Database & ORM**: **Drizzle ORM** (Prioritas 1) dengan PostgreSQL atau SQLite. Schemas defined strictly in code; atomic mutations executed within transactions.
- **No Database Foreign Keys (Application-Level Integrity)**: Dilarang constraint foreign key di database (`.references()`, `FOREIGN KEY`). Wajib gunakan kolom biasa bertipe dengan index eksplisit, dan kelola integritas referensial di application layer dalam transaksi atomik. Mencegah lock contention, memudahkan sharding, dan anti-cascade delete tak sengaja.
- **No Hardcoded Demo Data $\to$ Seed-First**: Dilarang menaruh array data mock hardcoded di komponen UI. Wajib gunakan skrip seed deterministik & idempoten (`bun run db:seed`).
- **Strict Modularity (<300–400 Baris)**: Dilarang membuat file raksasa (god files). Komponen UI, composable reaktif, dan backend service wajib dipecah menjadi modul kecil berfokus tunggal.
- **Strict Folder Structuring (The 1-File Rule & Sibling Grouping)**: Jika dalam folder hanya ada 1 file, dilarang buat folder khusus (taruh langsung di parent). Jika ada 3+ file dan 2+ diantaranya adalah saudara erat, wajib buatkan subfolder khusus untuk file bersaudara tersebut.
- **Proactive Refactoring, File Relocation & Import Healing**: Seiring proyek berkembang, developer dan AI agen memiliki keleluasaan penuh dan kewajiban proaktif me-rename dan memindahkan file ke folder domain yang rapi, dengan kewajiban mutlak membetulkan seluruh import path yang terpengaruh.
- **Ruthless Dead Code Elimination**: Hapus tuntas file eksperimental lama, backup file, aset usang, dan fungsi/komponen yang sudah tidak digunakan lagi dari repositori. Riwayat Git adalah tempat arsip, bukan folder proyek aktif.
- **DRY & Pure Functions**: Formula kalkulasi dan logika berulang wajib diekstrak menjadi pure functions yang teruji.
- **No Barrel Files (Direct Imports Only)**: Dilarang re-export `index.ts` (`export * from ...`) yang merusak tree-shaking dan memicu circular dependency. Wajib impor langsung secara eksplisit.
- **Zero Circular Dependencies**: Aliran arsitektur wajib satu arah tanpa siklus memutar (`Schemas` $\to$ `Core/Utils` $\to$ `Services` $\to$ `Routes` $\to$ `Views`).
- **Zero-Tolerance Quality Gates & Husky**: Wajib bersih dari `tsc --noEmit` dan linter (0 error). Dilarang `eslint-disable`, dilarang `@ts-ignore`, dilarang menyembunyikan problem (*solve, don't hide*). Wajib Husky git hooks pada `pre-commit` dan `pre-push`.
- **Uji Mutu Lengkap (Unit Test, Test Coverage & Test E2E)**: Seluruh modul kritis wajib memiliki unit test (`bun test`), dimonitor cakupan kodenya (`bun test --coverage` dengan target $\ge 85\%$ untuk logika bisnis dan 100% untuk modul keamanan), serta diverifikasi aliran penuh hulu-ke-hilir melalui test E2E (`bun test src/__tests__/e2e/`).
- **Catat Progres ke File Markdown (.md)**: Setiap implementasi fitur, audit, atau refactoring wajib terdokumentasi secara persisten ke dalam file markdown terstruktur (ruang lingkup, checklist tugas, ADR keputusan arsitektur, hasil uji mutu, dan next steps).
- **In-Stride Documentation Law (Dokumentasi Sambil Lalu)**: Dokumentasi adalah bagian tak terpisahkan dari kode (*first-class deliverable*). Setiap fungsi, modul, atau rute baru wajib didokumentasikan berbarengan saat kode dibuat—baik melalui komentar TSDoc ringkas di kode maupun panduan teknis di `docs/` dengan prinsip "Show, Don't Tell" (contoh konkret *copy-pasteable*). Dilarang menunda penulisan dokumentasi.
- **Higienitas Variabel Lingkungan & Konvensi 4-File Env (.env, .env.sandbox, .env.production, .env.example)**: Jangan semuanya di-.env-kan! Hanya rahasia kriptografis fundamental (DATABASE_URL, JWT_SECRET, private keys) yang masuk `.env`. Untuk integrasi pihak ketiga yang memiliki siklus Sandbox dan Live Production (payment gateway, logistik, SMS/WA), wajib sediakan 4 file env terpisah: `.env.example` (template skema publik di git), `.env.sandbox` (kredensial tes & simulator), `.env.production` (kredensial live riil), dan `.env` (salinan aktif lokal via `cp .env.sandbox .env`). Hal sepele seperti nomor port atau URL default wajib memiliki *sensible defaults* langsung di kode (`port || 3000`). Pengaturan operasional dinamis dikelola via database (`systemSettings`).
- **Komentar Kode Up-to-Date & Anti-Membingungkan (Comment Hygiene)**: Komentar wajib selalu sinkron dengan kondisi kode terbaru (*anti-comment drift*). Dilarang komentar usang yang menjelaskan logika lama, dilarang komentar kontradiktif/ambigu, dan dilarang mengulang hal yang sudah jelas (*Captain Obvious comments*). Komentar bernilai tinggi fokus menjelaskan "WHY" (aturan bisnis, batasan keamanan, alasan performa, jebakan platform), bukan sekadar menarasikan "WHAT".
- **Wajib Berpikir Integratif (Integrative Systems Engineering)**: Dilarang merekayasa fitur di dalam silo terisolasi. Setiap penambahan/perubahan wajib dipikirkan secara holistik dari hulu ke hilir: data lineage (TypeScript DTO $\to$ validasi Zod $\to$ service transaksi atomik $\to$ DB indexed columns), tenant guard (`storeId`), siklus cache SWR SingleFlight, konsistensi token Tailwind v4 (mobile full-edge vs desktop hairline grid), modul lokalisasi i18n, error mapping ramah pengguna, dan pencegahan memory leak di `onBeforeUnmount()`.
- **Fitur Gak Boleh Prematur (Anti-Premature Engineering)**:
  - *Anti-Abstraksi Prematur (YAGNI Presisi)*: Dilarang membuat lapisan abstraksi tebal atau arsitektur spekulatif untuk kebutuhan fiksi yang belum ada. Bangun solusi konkret, teruji, modular (<300 baris), dan mudah di-refactor.
  - *Anti-Fitur Setengah Matang*: Dilarang menganggap fitur selesai hanya karena *happy path* jalan. Dilarang tombol/menu palsu ("Segera hadir", `alert('Coming soon')`). Wajib lengkap dengan validasi form, pencegah double-submit, empty state bermartabat, skeleton anti-CLS, error recovery, dan transaksi atomik.
- **Prinsip Fallback Proporsional (Error UI vs Layer Kedua)**: Tidak semua kegagalan butuh fallback ke layer kedua. Sering kali yang paling benar, transparan, dan bebas bug adalah langsung *fail-fast* dan fallback ke informasi error yang jujur & solutif di UI (misal: pembayaran ditolak, stok habis, kupon kedaluwarsa). Hindari *silent secondary fallbacks* yang menebak-nebak dan menciptakan latensi ganda. Fallback layer kedua HANYA untuk kegagalan infrastruktur kritis yang idempoten (misal: secondary email relay saat SMTP utama timeout).
- **Iconography**: **Custom Inline Vector `<AppIcon>`**. **NEVER use raw emojis** in UI components or marketing cards; emojis look inconsistent and amateurish across OS platforms.

### Pillar II: UI/UX Philosophy & Taste (Strict Anti-Slop)
- **5 Dosa Besar AI Slop (DIHARAMKAN KERAS)**:
  1. ❌ **Palet Warna Pasaran (Gradasi Ungu, Biru Elektrik, Pink Neon)**: Dilarang memakai gradasi neon cyber/AI murahan. Wajib gunakan *Layered Neutrals* yang tenang dengan aksen semantik terarah (Emerald, Amber, Rose, Indigo).
  2. ❌ **Tipografi Monoton & Kaku**: Dilarang hirarki tipografi datar. Wajib kontras ritme yang tajam (*bold tracking-tight* untuk judul) dan `font-mono tracking-wider` untuk data angka rupiah, invoice, dan kode.
  3. ❌ **Layout Card-in-Card Monoton & Hero Klise**: Dilarang formula klise (badge atas $\to$ H1 kiri $\to$ mockup 3D melayang kanan) dan 3 kotak simetris identik yang diulang-ulang. Wajib gunakan **Bento Grid Asimetris**, variasi ukuran kartu sesuai bobot informasi, dan hero kontekstual.
  4. ❌ **Antarmuka Dingin & Tanpa Jiwa (Steril)**: Tampilan tidak boleh kaku seperti robot. Wajib berjiwa dengan sentuhan mikro-interaksi taktil (`hover:scale-[1.02] active:scale-[0.98]`), transisi halus, dan sistem ikon vektor [`<AppIcon>`](./assets/AppIcon.vue) (bukan emoji mentah).
  5. ❌ **Logika UX Dangkal (Abaikan Edge Case)**: Dilarang hanya mendesain *happy path*. Wajib tangani kondisi nyata: nama teks sangat panjang (`truncate`/`line-clamp`), data kosong 0 item (empty state bermartabat), skeleton loader sesuai aspek rasio (anti-CLS), dan error state teknis yang solutif.
- **Strict Blacklist Operasional**:
  - ❌ **No Bare Emojis in UI**: Wajib sistem vektor SVG seragam [`<AppIcon>`](./assets/AppIcon.vue).
  - ❌ **No Low-Contrast / Dead Text**: Dilarang teks abu-abu di atas latar abu-abu (`text-neutral-400` di atas `bg-neutral-100`). Rasio kontras wajib WCAG AA (min 4.5:1). Dark mode wajib neutral layers (`neutral-950`/`900`/`800`).
  - ❌ **No Broken Mobile UX**: Modal desktop wajib beralih menjadi *bottom-sheet drawer* di HP (`max-sm:fixed max-sm:bottom-0 max-sm:rounded-t-2xl`, lihat [`BottomSheet.vue`](./assets/BottomSheet.vue)). Tap target minimal $44 \times 44$ px ($48 \times 48$ dp di Android). Dilarang memaksakan pola desktop (popup dialog tengah layar, hover tooltips, pagination angka sempit) ke perangkat sentuh.
  - ❌ **No Container Inception & Padding Compounding**: Dilarang kotak di dalam kotak berlebihan (maksimal 2 kedalaman: Canvas $\to$ Card Utama $\to$ Well/Input). Radius sudut wajib konsentris ($R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{padding})$). Spasi kelipatan 4px/8px.
  - ❌ **No Verbose Copy & Bloated Buttons ("Kalau Mau Nulis Artikel Bukan Disini")**: Judul halaman 1–2 kata; dilarang paragraf panjang di header. Tombol jika bisa 1 kata WAJIB 1 kata ("Simpan", "Tambah", "Hapus", "Salin", "Ekspor", "Filter", "Bayar"). Aksi tabel wajib berupa ikon mandiri (`<AppIcon>`).
  - ❌ **No Patronizing UX ("Jangan Anggap User Bodoh")**: Asumsikan pengguna kompeten & cerdas. Dilarang tur unskippable 5 langkah; dilarang dialog konfirmasi bawel untuk aksi reversibel (wajib eksekusi instan + Undo toast via [`useToast.ts`](./assets/useToast.ts) dan [`AppToast.vue`](./assets/AppToast.vue)); dilarang teks "Captain Obvious" yang mengulang label; dilarang empty state kartun merengek. Jangan pernah blokir paste password manager. Wajib dukung shortcut keyboard (`Esc`, `Cmd+S`, `Enter`).
  - ❌ **No Jargon Inflation ("Don't Tell, But Show")**: Panggil fitur apa adanya dengan bahasa membumi (misal "Filter", "Unggah", "Ekspor CSV"). Sembunyikan penjelasan teknis di balik Tooltip halus (`<AppIcon name="help-circle" />`). Di UI dan dokumentasi, wajib terapkan **Don't tell, but show** (sertakan contoh kode / live preview).
  - ❌ **No Hardcoded Strings**: Dilarang hardcode teks tampilan di komponen tanpa lokalisasi `$t(...)`.
- **The Taste Standard**:
  - **Pola Sentuh & Gestur Khas Mobile**: Wajib adopsi interaksi alami jempol: Bottom Sheet drawer dengan pill drag handle dan swipe-to-dismiss, swipe-to-action pada baris list (kiri: hapus/rose, kanan: edit/emerald) dengan snap-back spring, long-press untuk aksi kontekstual & multi-seleksi diiringi getar haptik, horizontal scroll chips dengan snap alignment & edge fade gradient mask (tanpa scrollbar desktop), collapsing top bar saat scroll, dan scroll-aware FAB.
  - **Full-Edge Mobile (Minimal Round & Compact)**: Di mobile wajib kontainer edge-to-edge menempel penuh ke tepi layar (`w-full border-x-0 border-y`), sudut minimal/tanpa lengkung (`rounded-none` atau `rounded-sm`), kepadatan informasi kompak dan hemat ruang.
  - **Hairline Grid Desktop ("Dipisah Garis-Garis")**: Di desktop antarmuka mengadopsi estetika arsitektural Swiss Grid/Linear: panel, kolom, dan baris menyatu (*docked*) dan dipisahkan oleh garis-garis hairline 1px tajam (`divide-x`, `divide-y`, `border-r`, `border-b` warna `neutral-200 dark:border-neutral-800`), bukan sekumpulan kartu pulau mengambang dengan shadow tebal.
  - Tampilan tenang, editorial, dan berkelas dengan kedalaman berbasis **Layered Surfaces** (`neutral-50` $\to$ `neutral-100` $\to$ `white` pada light mode; `neutral-950` $\to$ `neutral-900` $\to$ `neutral-800` pada dark mode).
  - Warna semantik fungsional: Emerald (keuangan/sukses), Amber (VIP/perhatian), Rose (destruktif), Indigo (editor/teknis).
  - Tipografi tegas: Judul *bold tracking-tight*, angka transaksi dan kode kupon wajib `font-mono tracking-wider`.
  - **Standar UI/UX Android Native (Thumb-Zone, Gestur Mobile & Edge-to-Edge)**: Wajib ergonomi satu tangan (aksi penting di 60% bawah layar, Bottom Sheet pengganti modal pop-up, tap target $\ge 48\times 48$ dp), gestur khas mobile (Drawer, Swipe-to-action, Long Press taktil, Horizontal Snap, Collapsing Top Bar, Pull-to-Refresh), status bar transparan full-bleed (`enableEdgeToEdge`), umpan balik taktil getar (*haptics*), animasi pegas (*spring physics*), dan proteksi RAM <80MB anti-LMK. Detail lengkap di [Android UI/UX & Resource Craft](./references/android-ui-ux-craft.md).
  - Detail lengkap dapat dilihat di [UI/UX & Design Craft Specification](./references/ui-ux-craft.md).

### Pillar III: Security by Default (Zero Trust)
- **Anti-SSRF (`safeOutboundUrl`)**: Any user-supplied URL (webhooks, logos, feeds) MUST be validated against DNS rebinding and blocked from hitting private/loopback/cloud metadata IPs (`127.0.0.1`, `10.0.0.0/8`, `169.254.169.254`, etc.).
- **Anti-IDOR Multi-Tenancy**: Every database query accessing tenant data must explicitly join or filter by `store_id` or `user_id` authenticated from the session, never trusting request parameters.
- **Role Isolation**: Guest and buyer access tokens (e.g., Customer Hub) must never be able to execute store-owner or superadmin mutations, even if shared DB tables exist.
- **Cryptographic Webhooks**: Webhooks must be verified using raw request body HMAC signatures paired with idempotency and timestamp replay defense (see [`verifyWebhookHmac.ts`](./assets/verifyWebhookHmac.ts)).

### Pillar IV: Perfectionist Performance, Lighthouse 100 & Lightweight Resource Hygiene
- **Lighthouse 100 Target**: Wajib menargetkan skor sempurna di seluruh audit (Performance $\ge 98$, Accessibility 100, Best Practices 100, SEO 100).
- **Core Web Vitals Thresholds**: LCP $< 1.2\text{s}$ (hero preload), INP $< 100\text{ms}$ (anti-long-tasks, debounced inputs), CLS $= 0.00$ (explicit aspect ratios, matching skeleton dimensions).
- **SEO & Browser Compatibility**: Semantic HTML5 (tepat satu `<h1>`), OpenGraph/Twitter card tags, Schema.org JSON-LD structured data, dynamic canonical URL.
- **Hemat Resource (CPU & RAM)**:
  - Runtime Bun ringan tanpa node_modules bloat.
  - Zero memory leaks: Wajib membersihkan seluruh event listener, observer, dan timer di `onBeforeUnmount()`.
  - Animasi CSS hanya boleh mengubah properti GPU (`transform`, `opacity`), haram menganimasikan `width`/`height`/`margin` yang memicu 100% CPU spike.
- **SingleFlight SWR In-Memory Cache**: Coalesces concurrent cache misses into a single background promise to eliminate thundering herd spikes on external APIs or database queries.
- **Modular i18n Architecture**: Never allow monolithic 7,000+ line translation files. Translations are partitioned by domain (`core`, `auth`, `dashboard`, `checkout`, `hub`, `admin`), compiled automatically on build, and supplemented with terminal CLI tools.
- **Zero-Warning Quality Gates**: Code must pass `bun run typecheck` (`tsc --noEmit`), unit test suites (`bun test`), and production Vite builds before every commit.

---

## 3. How to Apply this Skill in a New Project

When starting a new repository or feature:
1. **Automated Scaffolding (Recommended)**:
   Run the project scaffolder to set up directories and copy standard primitives:
   ```bash
   ./scripts/init-project.sh /path/to/new-project
   ```
2. **Manual Installation of Common Primitives**:
   - Copy [`AppIcon.vue`](./assets/AppIcon.vue), [`BottomSheet.vue`](./assets/BottomSheet.vue), and [`AppToast.vue`](./assets/AppToast.vue) to `src/client/components/common/`.
   - Copy [`useToast.ts`](./assets/useToast.ts) to `src/client/composables/useToast.ts`.
   - Copy [`inMemoryCache.ts`](./assets/inMemoryCache.ts) to `src/server/core/cache/inMemoryCache.ts`.
   - Copy [`safeOutboundUrl.ts`](./assets/safeOutboundUrl.ts) and [`verifyWebhookHmac.ts`](./assets/verifyWebhookHmac.ts) to `src/server/core/utils/`.
   - Setup modular locales using [`split-locales.ts`](./assets/split-locales.ts) and [`i18n-add.ts`](./assets/i18n-add.ts).
3. **Execute Pre-Commit Verification**: Chain typecheck, locale compile, and build into `package.json` scripts:
   ```json
   "build": "bun run locales:build && vite build",
   "typecheck": "bun run locales:build && tsc --noEmit"
   ```
