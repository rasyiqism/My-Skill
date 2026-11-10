# Rasyiqi Tech Stack & Tooling Guidelines

This document outlines the standard technology stack, tool configurations, and developer workflows enforced in Rasyiqi projects.

---

## 1. Runtime & Package Management: **Bun**

We standardize on **Bun** across all environments (development, testing, scripting, production).

### Why Bun?
- Instant zero-overhead startup and execution.
- Native TypeScript execution without transpile steps (`bun ./scripts/my-script.ts`).
- Blazing-fast test runner (`bun test`).
- Native cryptographic primitives (`Bun.password`, `Bun.CryptoHasher`).

### Standard `package.json` Scripts
```json
{
  "scripts": {
    "dev:server": "bun run --watch src/server/index.ts",
    "dev:client": "vite",
    "clean": "rm -rf node_modules/.vite dist",
    "build": "bun run locales:build && vite build",
    "preview": "vite preview",
    "start": "bun run src/server/index.ts",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:seed": "bun run src/server/core/db/seed.ts",
    "typecheck": "bun run locales:build && tsc --noEmit",
    "locales:build": "bun ./scripts/split-locales.ts",
    "i18n:add": "bun ./scripts/i18n-add.ts",
    "test": "bun test src/__tests__/unit --timeout 30000 --parallel=1",
    "test:unit": "bun test src/__tests__/unit --timeout 30000 --parallel=1"
  }
}
```

---

## 2. Frontend: Vue 3 (Composition API) + TypeScript

### Strict Rules:
1. **`<script setup lang="ts">` exclusively**: Never use Options API (`export default { data() ... }`).
2. **Type-Safe Props and Emits**:
   ```vue
   <script setup lang="ts">
   interface Props {
     title: string;
     amount: number;
     status?: 'PENDING' | 'PAID' | 'EXPIRED';
   }

   const props = withDefaults(defineProps<Props>(), {
     status: 'PENDING'
   });

   const emit = defineEmits<{
     (e: 'update', id: string): void;
     (e: 'close'): void;
   }>();
   </script>
   ```
3. **Reusable Composables**: Extract complex reactive logic into clean composables placed in `src/client/composables/`:
   - `useCurrency()` for localized rupiah/dollar formatting.
   - `useToast()` for uniform tactile feedback.
   - `useAuth()` for session status, token handling, and role verification.

---

## 3. CSS: Tailwind CSS v4

Tailwind CSS v4 is used with CSS-first configuration and `@theme` directives.

### Best Practices:
- Keep styles strictly utility-based. Do not write custom CSS classes unless creating complex keyframe animations.
- Use arbitrary values sparingly; prefer semantic design tokens (`bg-neutral-50 dark:bg-neutral-900`, `border-neutral-200 dark:border-neutral-800`).
- Use container queries (`@sm:`, `@md:`, `@lg:`) for reusable UI widgets and blocks that must adapt to their container width rather than viewport width.

---

## 4. Database & ORM: Drizzle ORM

Drizzle provides end-to-end TypeScript safety with zero runtime code generation overhead.

### Schema Definition Standards:
- Place all table schemas in `src/server/core/db/schema.ts` (or modular `schema/*.ts`).
- Always define UUID primary keys using `defaultRandom()`.
- Explicitly define `created_at` and `updated_at` timestamps on all business entities.
- Store monetary values as integers (e.g., IDR in full units, USD in cents) to prevent floating-point rounding errors.
- **NO FOREIGN KEY CONSTRAINTS (Application-Level Integrity)**:
  - **Dilarang memakai foreign key constraint di database** (`.references()`, `FOREIGN KEY ... REFERENCES`).
  - Kolom relasi didefinisikan sebagai kolom biasa bertipe (misal `userId: text('user_id').notNull()`) dan diberi index eksplisit.
  - Validasi keberadaan entitas relasi dan integritas data dikelola sepenuhnya di **Application Layer** dalam transaksi atomik (`db.transaction`).
  - **Alasan**: Menghindari *lock contention* pada tabel rujukan saat traffic tinggi, memudahkan sharding/pemisahan database, mempercepat proses migrasi tanpa constraint locks, dan mencegah bencana `CASCADE DELETE` yang tidak sengaja menghapus data finansial penting.

```typescript
import { pgTable, text, timestamp, integer, boolean, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const orders = pgTable('orders', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  storeId: text('store_id').notNull(), // No .references() - Plain indexed column
  buyerEmail: text('buyer_email').notNull(),
  totalAmount: integer('total_amount').notNull(), // in whole IDR
  status: text('status').notNull().default('PENDING'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  index('orders_store_id_idx').on(table.storeId)
]);
```

---

## 5. Zero-Tolerance Quality Gates & Git Automation (Husky, Lint, Typecheck)

Standar Rasyiqi adalah **Zero Tolerance**: Tidak ada kompromi terhadap peringatan TypeScript atau linter.

### A. Strict Typecheck & Linting
- **`tsc --noEmit` Wajib 0 Error**: Kompilasi TypeScript wajib lolos tanpa satu pun kesalahan tipe.
- **Strict ESLint / Linter Wajib 0 Error**:
  - ❌ **DILARANG KERAS `eslint-disable`**: Dilarang menggunakan komentar `// eslint-disable-next-line` atau `/* eslint-disable */` untuk menyembunyikan masalah!
  - ❌ **DILARANG `@ts-ignore` / `@ts-nocheck`**: Dilarang membungkam compiler TypeScript.
  - ❌ **DILARANG `any` Liar**: Dilarang memakai tipe `any` sembarangan sebagai jalan pintas.
- **"Solve, Don't Hide"**: Selesaikan masalah hingga ke akar penyebabnya (*solve the root cause*), jangan pernah menyapu bug ke bawah karpet!

### B. Otomasi Git Hooks dengan Husky
Gunakan **Husky** untuk mengunci komitmen kode berkualitas sebelum masuk ke repositori git:
- **`pre-commit` Hook**:
  ```bash
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  bun run locales:build
  bun run typecheck
  bun run lint
  ```
- **`pre-push` Hook**:
  ```bash
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  bun run test:unit
  ```

Dengan hook ini, git commit otomatis ditolak jika ada satu pun tipe error atau pelanggaran linter.

### C. Fast Automated Unit Tests & Test Coverage Mandate
- **Unit Test Komprehensif**: Seluruh logika bisnis kritis (kalkulasi finansial, kupon, verifikasi signature HMAC, middleware otorisasi, sanitasi input) wajib memiliki pengujian unit di `src/__tests__/unit/`.
- **Wajib Monitor Test Coverage**:
  - Jalankan pengujian cakupan kode menggunakan `bun test --coverage`.
  - Fokus cakupan utama:
    - **Logic Coverage $\ge 85\%$** untuk modul kalkulasi finansial, kuota, dan state machine pesanan.
    - **Security Coverage 100%** untuk fungsi verifikasi signature HMAC, validator URL anti-SSRF, dan tenant guard multi-tenant anti-IDOR.
  - Setiap bug yang ditemukan wajib dibuatkan *regression test case* baru sebelum bug diperbaiki (*Test-Driven Bug Fixing*).
- Pengujian dijalankan menggunakan `bun test` dengan target durasi eksekusi cepat di bawah 30 detik.

### D. End-to-End (E2E) Integration Testing
Unit test terisolasi tidak cukup untuk menjamin keandalan sistem produksi. Wajib jalankan pengujian aliran penuh hulu-ke-hilir:
- **E2E Test Suites**: Disimpan di `src/__tests__/e2e/`.
- **Skenario Wajib Diuji**:
  1. *Complete Checkout Flow*: Pembeli memilih produk $\to$ membuat pesanan $\to$ simulasi webhook pembayaran terverifikasi HMAC $\to$ settlement saldo merchant bertambah $\to$ akses produk digital terbuka.
  2. *Authentication & Session Lifecycle*: Registrasi $\to$ login $\to$ proteksi rute terotentikasi $\to$ rotasi sesi $\to$ logout bersih.
  3. *Tenant Isolation E2E*: Memastikan merchant A tidak pernah bisa membaca atau memanipulasi data milik merchant B melalui API.
- Jalankan via `bun test src/__tests__/e2e/` sebelum rilis atau deployment produksi.

### E. Catat Progres ke File Markdown (`.md`) Secara Persisten
Pengembangan sistem profesional **dilarang berjalan tanpa jejak dokumentasi yang transparan**:
- **Work Log & Progress File**: Setiap pengerjaan fitur besar, proses refactoring arsitektur, atau sesi perbaikan sistem wajib mencatat status dan pencapaiannya ke dalam file markdown terstruktur (misal `docs/progress.md`, `ROADMAP.md`, atau file rencana kerja di repositori).
- **Format Catatan Progres Standar**:
  1. **Tujuan & Ruang Lingkup**: Apa yang dikerjakan dan apa batasan masalahnya.
  2. **Daftar Tugas (*Checklist*)**: `[x]` untuk yang selesai, `[ ]` untuk yang tertunda.
  3. **Keputusan Rekayasa (*Architectural Decision Records - ADR*)**: Mengapa memilih solusi A dibanding solusi B.
  4. **Hasil Pengujian**: Status unit test, test coverage, dan verifikasi typecheck.
  5. **Next Steps**: Panduan jelas untuk langkah kerja berikutnya agar tidak terjadi disorientasi konteks.

### F. In-Stride Documentation Law: Dokumentasi Dibuat Berbarengan dengan Kode
Dokumentasi teknis adalah **bagian integral dari kode itu sendiri (*first-class engineering deliverable*)**, bukan pekerjaan sampingan yang ditunda-tunda hingga akhir proyek:
- ❌ **DILARANG Menunda Dokumentasi (*Documentation Debt*)**:
  - Dilarang merilis modul atau endpoint API baru tanpa memperbarui dokumentasi teknisnya seketika. Menunda dokumentasi berakibat pada dokumentasi yang basi, tidak akurat, atau bahkan tidak pernah ditulis sama sekali.
- ✅ **STANDAR WAJIB: Dokumentasi "Sambil Lalu" (Continuous In-Stride)**:
  1. **In-Code Documentation (TSDoc)**: Setiap composable, fungsi helper, interface DTO, atau service method wajib memiliki komentar TSDoc ringkas saat fungsi tersebut ditulis, menerangkan maksud bisnis (*intent*), parameter penting, dan potensi side-effect.
  2. **Technical Markdown Guides (`docs/`)**: Saat membuat fitur integrasi (misal: webhook payment gateway, modul tracking CAPI, sistem otorisasi multi-tenant), dokumen panduan di folder `docs/` wajib dibuat atau disinkronkan pada siklus pengerjaan yang sama.
  3. **Prinsip "Show, Don't Tell"**: Dokumentasi teknis wajib menyertakan contoh kode nyata yang dapat disalin (*copy-pasteable examples*), skema payload JSON, dan alur eksekusi konkret, bukan sekadar paragraf narasi kosong.

---

## 6. Higienitas Variabel Lingkungan & Anti-Polusi `.env` (Zero `.env` Bloat)

Prinsip tegas Rasyiqi: **"Jangan semuanya di-.env-kan! Hanya variabel yang benar-benar rahasia (secrets), mendesak (urgent), dan fundamental yang masuk ke `.env`."**

### A. Apa yang BOLEH Masuk ke `.env`? (Hanya yang Urgent & Fundamental)
1. **Kredensial & Rahasia Kriptografis Sejati (*True Secrets*)**:
   - String koneksi database privat (`DATABASE_URL`).
   - Kunci enkripsi / rahasia sesi & token (`JWT_SECRET`, `SESSION_SECRET`).
   - Kunci privat atau server key API pihak ketiga (payment gateway server secret, AWS S3 secret key, Resend API key).
2. **Pembeda Lingkungan Produksi (*Core Environment Flags*)**:
   - `NODE_ENV=production` atau `APP_ENV=production`.

### B. Apa yang DILARANG Masuk ke `.env`? (Anti-Polusi `.env`)
- ❌ **DILARANG**: Memasukkan konfigurasi sepele seperti port (`PORT=3000`), URL default lokal (`APP_URL=http://localhost:3000`), atau rute internal.
  - *Standar Wajib*: Gunakan **nilai bawaan yang masuk akal (*sensible in-code defaults*)**:
    ```typescript
    // ✅ STANDAR RASYIQI: Nilai bawaan langsung di kode
    const port = Number(process.env.PORT) || 3000;
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    ```
- ❌ **DILARANG**: Memasukkan batas waktu timeout, limit paginasi, parameter warna, label teks UI, atau toggle fitur minor ke dalam `.env`.
- ❌ **DILARANG**: Memaksa developer menyalin puluhan baris variabel non-krusial di `.env.example` hanya untuk menjalankan server lokal. Proyek yang sehat harus bisa langsung berjalan dengan konfigurasi paling mendasar (`DATABASE_URL`).

### C. Konfigurasi Dinamis Menggunakan Database Setting
Untuk konfigurasi operasional yang dapat berubah sewaktu-waktu di masa produksi (misal: toggle gateway pembayaran, batas kuota paket, template pengumuman, tag pelacakan analitik):
- Simpan di tabel database terpusat (`systemSettings` berbasis JSON terstruktur), bukan mengotori file `.env` server yang memerlukan *restart process* atau deployment ulang setiap kali diubah.

### D. Konvensi 4-File Env untuk Integrasi Sandbox & Production
Ketika aplikasi berintegrasi dengan layanan pihak ketiga yang memiliki siklus Sandbox/Staging dan Production (misal: payment gateway, ekspedisi/logistik, perbankan, SMS/WhatsApp gateway), **WAJIB menerapkan konvensi 4-file environment**:

```text
├── .env.example       # Template skema publik dengan nilai dummy/placeholder (dicomit ke git)
├── .env.sandbox       # Konfigurasi & kredensial lengkap khusus lingkungan Sandbox / Uji Coba
├── .env.production    # Konfigurasi & kredensial lengkap khusus lingkungan Live Production
└── .env               # File aktif lokal saat ini (diabaikan oleh git / .gitignore)
```

#### Aturan Pelaksanaan:
1. **`.env.example` (Template Dokumentasi & CI/CD)**:
   - Dicomit ke git sebagai sumber kebenaran (*source of truth*) seluruh variabel yang dibutuhkan sistem.
   - **DILARANG menaruh rahasia asli**. Gunakan placeholder yang jelas (`REPLACE_WITH_SANDBOX_KEY`).
2. **`.env.sandbox` (Isolasi Lingkungan Pengujian)**:
   - Berisi kredensial sandbox, URL callback uji coba, dan simulator endpoints.
   - Mengeliminasi risiko kepanikan akibat transaksi uang riil terpanggil di lingkungan development.
3. **`.env.production` (Kredensial Produksi Riil)**:
   - Berisi kunci privat produksi, URL webhook live, dan kredensial database utama.
   - Dikelola melalui secret manager atau pipeline CI/CD produksi yang terlindungi.
4. **`.env` (Active Local Working Copy)**:
   - File lingkungan aktif yang dibaca langsung oleh runtime saat proses startup default (`bun run dev`).
   - Developer dapat menyalin langsung dari sandbox untuk kebutuhan lokal harian:
     ```bash
     cp .env.sandbox .env
     ```
   - File `.env`, `.env.sandbox`, dan `.env.production` **wajib terdaftar di `.gitignore`** agar rahasia tidak pernah bocor ke repositori publik.
5. **Native Multi-Env Runner via Bun**:
   - Bun menyediakan opsi native `--env-file` tanpa memerlukan paket `dotenv` eksternal:
     ```bash
     # Jalankan dengan profil sandbox
     bun --env-file=.env.sandbox run dev

     # Jalankan dengan profil production
     bun --env-file=.env.production run start
     ```

---

## 7. Matriks Prioritas Tech Stack 1–10 (Berdasarkan Kualitas SEO & Efisiensi RAM/CPU VPS)

Dalam ekosistem rekayasa Rasyiqi, pemilihan teknologi **tidak dilakukan secara dogmatis buta**, melainkan disesuaikan dengan kebutuhan proyek nyata. Namun, setiap teknologi dinilai dan diranking secara ketat berdasarkan dua parameter non-negosiasi:

1. **Kualitas SEO & Performa Web**: Kemampuan menghantarkan HTML instan untuk bot/crawler, TTFB (<50ms), Core Web Vitals (LCP < 1.2s, CLS = 0), dan kecepatan render browser.
2. **Efisiensi RAM & CPU VPS**: Konsumsi memori minimal (bisa berjalan lancar di VPS murah $4/bulan dengan spesifikasi 1 vCPU & 1–2 GB RAM), *zero memory leak*, dan tidak memicu CPU spike saat idle maupun traffic tinggi.

---

### A. Tabel Peringkat Prioritas Stack (Tingkat 1 Hingga 10)

| Peringkat | Layer & Teknologi | Skor SEO | Efisiensi RAM/CPU VPS | Alasan Rekayasa & Rekomendasi Kasus |
| :---: | :--- | :---: | :---: | :--- |
| **P-1** | **Drizzle ORM** (+ PostgreSQL / SQLite) | 10 / 10 | **10 / 10** (~0 MB runtime) | **Prioritas Utama Database**. Zero runtime overhead. Query builder murni yang menghasilkan raw SQL string. Mengeliminasi lock contention (no database foreign keys) dan tidak memakan RAM server. |
| **P-1** | **Bun Runtime** | 10 / 10 | **10 / 10** (~25–40 MB idle) | **Prioritas Utama Runtime**. Start instan, native TypeScript tanpa build step lambat, 3x–4x lebih hemat CPU & RAM dibanding Node.js. Menangani ribuan req/sec di VPS 1 vCPU. |
| **P-1** | **Tailwind CSS v4** | 10 / 10 | **10 / 10** (0 MB runtime) | **Prioritas Utama Styling**. CSS-first compiler, menghasilkan bundle CSS mungil (<15KB) tanpa class tak terpakai, mengeliminasi render-blocking resource pada skor Lighthouse. |
| **P-1** | **Vue 3 (Vite) + Bot Prerender** / **Astro** / **Nuxt 3 SSG** | **10 / 10** | **9.5 / 10** (~30 KB gzip) | **Prioritas Utama Frontend**. Untuk web publik/blog/landing gunakan Astro/Nuxt SSG (HTML murni di awal). Untuk SaaS interaktif gunakan Vue 3 Composition API dengan bot prerender middleware. |
| **P-1** | **Elysia.js / Hono** (di atas Bun) | 10 / 10 | **10 / 10** (TTFB < 5ms) | **Prioritas Utama Web Framework**. Type-safe end-to-end, ultra-ringan, tidak membutuhkan reflection metadata yang membebani CPU. |
| **P-2** | **Kysely (TypeScript SQL Builder)** | 9.5 / 10 | **9.5 / 10** (~0 MB runtime) | Sangat baik sebagai alternatif Drizzle jika proyek membutuhkan query builder SQL bertipe murni tanpa abstraksi schema-as-code. |
| **P-3** | **Svelte 5 / SvelteKit** | 9.5 / 10 | 9.0 / 10 (~20 KB gzip) | Pilihan sangat baik untuk frontend web publik. Reaktif tanpa virtual DOM, bundle kecil, dan ramah SEO. |
| **P-4** | **Node.js LTS + Fastify** | 8.5 / 10 | 7.5 / 10 (~75–120 MB RAM) | Pilihan alternatif jika VPS belum mendukung Bun dan terpaksa menggunakan ekosistem Node.js tradisional. |
| **P-5** | **PostgreSQL Raw SQL (`postgres.js`)** | 9.5 / 10 | 9.5 / 10 (~5 MB RAM) | Sangat cepat dan efisien, namun developer harus mengelola migrasi dan type safety secara manual. |
| **P-6** | **Prisma ORM** | 7.0 / 10 | **4.0 / 10** (~150–250 MB RAM) | **HINDARI di Low-Spec VPS**. Prisma menjalankan daemon Rust Engine terpisah yang rakus memori dan menambah query latency. Sering memicu OOM (*Out of Memory*) di VPS 1 GB. |
| **P-7** | **Node.js + Express.js** | 7.0 / 10 | 5.0 / 10 (~90–150 MB RAM) | Arsitektur lama berbasis callback/promise yang lambat di bawah konkurensi tinggi, tidak type-safe secara native. |
| **P-8** | **Next.js (React Server Components)** | 8.5 / 10 | **3.0 / 10** (~350–600 MB RAM) | Bagus untuk SEO, namun **sangat boros resource VPS**. Server Node.js Next.js rakus memori, build-time memicu 100% CPU spike, dan bundle React besar (~150KB+ gzip) memperlambat INP mobile. |
| **P-9** | **TypeORM / MikroORM** | 6.0 / 10 | 3.5 / 10 (~180–300 MB RAM) | Berat, arsitektur OOP warisan dengan refleksi dekorator lambat, rawan memory leak pada long-running process. |
| **P-10** | **NestJS Enterprise Monolith** | 6.0 / 10 | **2.0 / 10** (~250–500 MB RAM) | **HINDARI untuk Startup / Low-Spec VPS**. Terlalu banyak abstraksi Spring-like, dependensi refleksi raksasa, konsumsi RAM idle sangat tinggi bahkan sebelum ada traffic masuk. |

---

### B. Pedoman Penyesuaian Stack Sesuai Kebutuhan Nyata

Saat merancang proyek baru, pilih kombinasi stack dari **Tingkat Prioritas 1–3**:

1. **Skenario Web Publik, Portal Berita, atau Landing Page (SEO Adalah Segalanya)**:
   - **Pilihan Utama**: **Astro** atau **Nuxt 3 (SSG Prerender)** + **Tailwind CSS v4** + **Drizzle ORM** (jika butuh data dinamis).
   - **Hasil**: Skor Lighthouse 100/100, FCP < 0.5s, LCP < 0.8s, disajikan sebagai file statis dengan beban RAM server 0 MB.
2. **Skenario Aplikasi SaaS, Dashboard Merchant, & Sistem Transaksi Tinggi (Hemat VPS & Real-Time UX)**:
   - **Pilihan Utama**: **Bun** + **Elysia / Hono** + **Vue 3 Composition API** + **Drizzle ORM (Zero-FK)** + **SingleFlight SWR Cache**.
   - **Hasil**: Satu VPS $4/bulan (1 vCPU, 1 GB RAM) mampu melayani jutaan transaksi per bulan dengan penggunaan RAM stabil di bawah 150 MB total. Bot crawler tetap terlayani secara instan via bot-prerender middleware.
3. **Aturan Evaluasi Teknologi Baru**:
   - Jika developer ingin mengusulkan pustaka atau framework baru ke dalam proyek, tanyakan 2 filter wajib:
     1. *"Berapa megabyte RAM yang dibutuhkan saat idle dan traffic penuh?"* (Jika >100 MB untuk fitur sepele $\to$ TOLAK).
     2. *"Bagaimana dampaknya terhadap Core Web Vitals (LCP, INP, CLS) dan crawler indexing?"* (Jika memperlambat browser $\to$ TOLAK).

---

### C. Matriks Prioritas Stack Desktop & Android (Efisiensi Resource Client)

Tidak hanya backend dan web yang wajib hemat resource, aplikasi **Desktop dan Android** juga wajib mematuhi anggaran resource yang ketat:

#### 1. Prioritas Stack Desktop (Hemat RAM & Ukuran Installer):
| Peringkat | Teknologi | Konsumsi RAM Idle | Ukuran Binary | Alasan Rekayasa |
| :---: | :--- | :---: | :---: | :--- |
| **D-1** | **Tauri v2 (Rust + Native OS WebView)** | **~30–50 MB** | **< 10 MB** | **Prioritas Utama Desktop**. Memanfaatkan WebView bawaan OS (WebKit di macOS, WebView2 di Windows) dan backend Rust. Start <200ms, tanpa overhead Chromium. |
| **D-2** | **Flutter Desktop (C++ / Skia)** | ~60–80 MB | ~25–40 MB | Sangat konsisten antar platform, render GPU langsung tanpa webview, performa tinggi. |
| **D-9** | **Electron (Node.js + Chromium)** | **350–600 MB+** | **120–200 MB+** | **HINDARI JIKA MEMUNGKINKAN**. Memaketkan browser Chromium penuh dan Node.js untuk aplikasi sederhana adalah pemborosan RAM dan baterai pengguna. |

#### 2. Prioritas Stack Android (Hemat Baterai, Anti-LMK, 60/120 FPS):
| Peringkat | Teknologi | Konsumsi RAM Idle | FPS & Responsivitas | Alasan Rekayasa |
| :---: | :--- | :---: | :---: | :--- |
| **A-1** | **Kotlin + Jetpack Compose** | **~40–60 MB** | **60/120 FPS Flawless** | **Prioritas Utama Android**. UI deklaratif native modern, kontrol memori penuh, bebas overhead bridge, proteksi LMK terbaik di low-end devices. Lihat [Panduan Android UI/UX Craft](./android-ui-ux-craft.md). |
| **A-2** | **Flutter (Dart AOT + Impeller)** | ~65–85 MB | 60/120 FPS | Kompilasi Ahead-of-Time langsung ke mesin ARM, performa rendering konsisten, ekosistem UI matang. |
| **A-4** | **React Native (Hermes Engine)** | ~90–130 MB | 60 FPS (Tergantung JSI bridge) | Cukup baik dengan engine Hermes, namun jejak RAM lebih tinggi dan bundle JS lebih besar. |
| **A-8** | **Capacitor / Cordova WebView Wrapper** | ~140–200 MB+ | Sering Jank / Frame Drop | **HINDARI untuk Core App**. Terasa lambat dan lag di Android murah, gesture tidak responsif, animasi sering tersendat. |
