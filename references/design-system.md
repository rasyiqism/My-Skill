# Rasyiqi Design System: Tokenized Architecture & Component Primitives

The **Rasyiqi Design System** provides a strict, tokenized foundation for all user interfaces. It eliminates arbitrary styling decisions, enforces visual consistency across apps, and prevents AI slop by formalizing every color, spacing unit, corner radius, elevation level, and interactive state into a cohesive design language.

---

## 1. Design Tokens Architecture (Tailwind CSS v4 + CSS Variables)

All styles must derive from semantic design tokens, never from raw arbitrary hex colors or haphazard spacing values.

### A. Surface & Canvas Tokens (Layered Depth)

| Token | CSS Variable | Light Mode | Dark Mode | Fungsi |
| :--- | :--- | :--- | :--- | :--- |
| **`bg-canvas`** | `--color-canvas` | `#f8fafc` (`neutral-50` / `slate-50`) | `#09090b` (`neutral-950` / `zinc-950`) | Latar belakang utama seluruh viewport. |
| **`bg-surface`** | `--color-surface` | `#ffffff` (`white`) | `#18181b` (`neutral-900` / `zinc-900`) | Kontainer utama, kartu, dialog modal, dropdown. |
| **`bg-surface-raised`** | `--color-surface-raised` | `#f1f5f9` (`neutral-100` / `slate-100`) | `#27272a` (`neutral-800` / `zinc-800`) | Well, blok kode, input form, badge container. |
| **`border-subtle`** | `--color-border-subtle` | `#e2e8f0` (`neutral-200` / `slate-200`) | `#27272a` (`neutral-800` / `zinc-800`) | Garis tepi kartu dan divider standar. |
| **`border-strong`** | `--color-border-strong` | `#cbd5e1` (`neutral-300` / `slate-300`) | `#3f3f46` (`neutral-700` / `zinc-700`) | Garis tepi saat hover, input aktif, header modal. |

---

### B. Semantic Accent & Feedback Tokens

Warna bukan dekorasi acak; setiap aksen terikat langsung pada status operasional:

| Semantic Token | Text Token | Background Token | Border Token | Penggunaan |
| :--- | :--- | :--- | :--- | :--- |
| **Brand Primary** | `text-white`<br>`dark:text-neutral-950` | `bg-neutral-900`<br>`dark:bg-white` | `border-neutral-900`<br>`dark:border-white` | Tombol CTA utama, tab aktif. |
| **Success / Finance** | `text-emerald-700 dark:text-emerald-400` | `bg-emerald-50 dark:bg-emerald-950/40` | `border-emerald-200 dark:border-emerald-800` | Transaksi lunas, saldo masuk, verifikasi akun. |
| **VIP / Warning** | `text-amber-800 dark:text-amber-400` | `bg-amber-50 dark:bg-amber-950/40` | `border-amber-200 dark:border-amber-800` | Membership VIP, masa trial habis, tips penting. |
| **Destructive** | `text-rose-700 dark:text-rose-400` | `bg-rose-50 dark:bg-rose-950/40` | `border-rose-200 dark:border-rose-800` | Hapus permanen, refund, dispute, batalkan. |
| **Studio / Flow** | `text-indigo-700 dark:text-indigo-400` | `bg-indigo-50 dark:bg-indigo-950/40` | `border-indigo-200 dark:border-indigo-800` | Visual builder, blok landing page, webhook. |

---

### C. Spacing Scale (4px / 8px Base Grid)

Dilarang keras memakai margin atau gap acak (`gap-7`, `mt-9`, `p-[13px]`). Semua jarak wajib mengikuti kelipatan 4px/8px:

| Token | Nilai Piksel | Tailwind Class | Penggunaan Standar |
| :--- | :--- | :--- | :--- |
| `--space-1` | 4px | `p-1`, `gap-1` | Padding mikro pada icon wrapper atau tag status. |
| `--space-2` | 8px | `p-2`, `gap-2` | Jarak antara ikon dan label teks pada tombol. |
| `--space-3` | 12px | `p-3`, `gap-3` | Padding dalam tombol kecil, jarak antar-input form. |
| `--space-4` | 16px | `p-4`, `gap-4` | **Padding standar kartu mobile**, jarak antar-kartu kecil. |
| `--space-6` | 24px | `p-6`, `gap-6` | **Padding standar kartu desktop**, jarak kolom grid. |
| `--space-8` | 32px | `p-8`, `gap-8` | Padding kartu hero / dashboard section. |
| `--space-12` | 48px | `py-12`, `gap-12` | Jarak antar-section besar pada landing page. |

---

### D. Concentric Border-Radius Tokens

Sudut melengkung elemen anak wajib konsentris terhadap kontainer induknya:

$$R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{padding})$$

| Token | Nilai | Tailwind | Penerapan |
| :--- | :--- | :--- | :--- |
| `--radius-sm` | 4px | `rounded-xs` / `rounded-sm` | Badge mikro, tombol kecil di dalam well. |
| `--radius-md` | 6px | `rounded-md` | Sub-item list di dalam kartu level 2. |
| `--radius-lg` | 8px | `rounded-lg` / `rounded-xl` | Input form, tombol utama, sub-card dalam bento. |
| `--radius-xl` | 16px | `rounded-2xl` | **Standar kartu utama Level 1**, dialog modal desktop. |
| `--radius-2xl` | 24px | `rounded-3xl` | Kontainer hero besar, floating action bar. |
| `--radius-full` | 9999px | `rounded-full` | Avatar bulat, pill status badge. |

---

### E. Elevation & Shadows (Halus & Bersih)

Dilarang bayangan hitam pekat yang kotor. Gunakan ambient shadow berlapis yang lembut:

| Token | Tailwind | Nilai CSS |
| :--- | :--- | :--- |
| **`shadow-2xs`** | `shadow-2xs` | `0 1px 2px rgba(15, 23, 42, 0.04)` |
| **`shadow-xs`** | `shadow-xs` | `0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)` |
| **`shadow-sm`** | `shadow-sm` | `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.04)` |
| **`shadow-md`** | `shadow-md` | `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)` |

---

## 2. Component Primitives Specification

Setiap aplikasi yang dibangun harus menggunakan komponen primitif seragam ini:

### A. Button Primitive (Tactile & One-Word)

```html
<!-- 1. Primary Button (Aksi Utama) -->
<button
  type="button"
  class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
         bg-neutral-900 text-white dark:bg-white dark:text-neutral-950
         hover:bg-neutral-800 dark:hover:bg-neutral-100
         hover:scale-[1.02] active:scale-[0.98]
         transition-all duration-150 ease-out
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
         shadow-2xs hover:shadow-xs
         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
>
  <AppIcon name="plus" class="w-4 h-4" />
  <span>Tambah</span>
</button>

<!-- 2. Secondary Button (Aksi Pendukung) -->
<button
  type="button"
  class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
         bg-white text-neutral-800 border border-neutral-200 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-800
         hover:bg-neutral-50 dark:hover:bg-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700
         hover:scale-[1.01] active:scale-[0.98]
         transition-all duration-150 ease-out
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500
         shadow-2xs"
>
  <span>Filter</span>
</button>

<!-- 3. Icon-Only Action Button (Untuk Baris Tabel / Header) -->
<button
  type="button"
  aria-label="Salin"
  title="Salin"
  class="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
>
  <AppIcon name="copy" class="w-4 h-4" />
</button>
```

---

### B. Badge & Status Pill Primitive

```html
<!-- Success / Verified -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800">
  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
  <span>Lunas</span>
</span>

<!-- Warning / Pending -->
<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800">
  <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
  <span>Tertunda</span>
</span>
```

---

### C. Input Field Primitive

```html
<div class="space-y-1.5">
  <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300">
    Nama Produk
  </label>
  <input
    type="text"
    class="w-full px-3.5 py-2.5 rounded-xl text-sm
           bg-neutral-50 dark:bg-neutral-900
           border border-neutral-200 dark:border-neutral-800
           text-neutral-900 dark:text-neutral-100
           placeholder:text-neutral-400 dark:placeholder:text-neutral-500
           focus:bg-white dark:focus:bg-neutral-950
           focus:border-indigo-500 dark:focus:border-indigo-400
           focus:outline-none focus:ring-3 focus:ring-indigo-500/15
           transition-all duration-150"
    placeholder="Contoh: Ebook Mastering Vue 3"
  />
</div>
```

---

### D. Card / Container Primitive (Rule of 2 Levels)

```html
<!-- Level 1: Primary Card -->
<div class="p-5 @sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs">
  <h3 class="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
    Kupon Diskon
  </h3>

  <!-- Level 2: Interactive Well (Sub-item) -->
  <div class="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/40 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="font-mono font-semibold text-sm text-neutral-900 dark:text-neutral-100 tracking-wider">HEMAT50</span>
      <span class="text-xs text-neutral-500">Diskon 50%</span>
    </div>
    <button type="button" class="text-xs font-medium text-rose-600 hover:underline">Hapus</button>
  </div>
</div>
```

---

## 3. Responsive Layout & Bento Grid Architecture

1. **Bento Grid Asimetris (Anti-Card Monoton)**:
   Gunakan grid dengan variasi bobot informasi (`grid grid-cols-1 @md:grid-cols-3 gap-5`):
   - Kolom 1 (Span 2): Grafik penjualan utama dengan metrik interaktif.
   - Kolom 2 (Span 1): Daftar transaksi terbaru atau quick actions.
2. **Mobile Bottom Sheet Clearance**:
   Pada aplikasi mobile dengan bottom bar navigasi:
   ```css
   .has-bottom-nav {
     padding-bottom: calc(56px + env(safe-area-inset-bottom, 16px));
   }
   ```
3. **Container Queries (`@container`)**:
   Setiap kartu yang dirancang mandiri wajib menggunakan prefix `@sm:`, `@md:`, `@lg:` agar beradaptasi terhadap lebar wadahnya, bukan lebar layar window browser.
