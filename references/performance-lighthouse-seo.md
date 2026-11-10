# Rasyiqi Performance, Lighthouse 100 & Lightweight Resource Hygiene

> **"Saya itu perfeksionis: Aplikasi tidak hanya harus indah dan aman, tetapi wajib super ringan, hemat CPU & RAM, meraih skor Lighthouse 100, dan mematuhi standar SEO & browser modern."**

Dokumen ini mendefinisikan standar rekayasa tingkat tinggi untuk memastikan setiap proyek web yang dibangun di bawah **Rasyiqi-Skill** mencapai efisiensi sumber daya maksimal dan performa tanpa kompromi.

---

## 1. The Perfectionist's Lighthouse 100 Mandate

Setiap halaman web publik (Landing page, Katalog, Blog, Checkout) wajib menargetkan skor sempurna:

```text
┌─────────────────────────────────────────────────────────────┐
│                      LIGHTHOUSE AUDIT                       │
├─────────────────┬─────────────────┬───────────────┬─────────┤
│ Performance 98+ │ Access. 100/100 │ Best Pract. 100│ SEO 100 │
└─────────────────┴─────────────────┴───────────────┴─────────┘
```

### Ambang Batas Core Web Vitals (CWV) Wajib:
- **LCP (Largest Contentful Paint)**: $< 1.2\text{ detik}$ (Lolos mutlak; threshold standar 2.5s dinilai terlalu lambat).
- **INP (Interaction to Next Paint)**: $< 100\text{ ms}$ (Interaksi seketika tanpa jeda render frame).
- **CLS (Cumulative Layout Shift)**: **$0.00$** (Nol pergeseran layout saat asset atau font dimuat).
- **TTFB (Time to First Byte)**: $< 200\text{ ms}$ (Dibantu oleh cache in-memory SWR).

---

## 2. Core Web Vitals Optimization Law

### A. LCP Optimization (<1.2s):
1. **Hero Asset Preloading**:
   Gambar atau video poster pada hero section wajib memiliki atribut prioritas tinggi:
   ```html
   <link rel="preload" as="image" href="/images/hero-banner.webp" fetchpriority="high" type="image/webp" />
   ```
2. **Font Preloading**:
   Font utama (`woff2`) wajib dimuat terlebih dahulu dengan `font-display: swap` agar teks segera terbaca:
   ```html
   <link rel="preload" href="/fonts/plus-jakarta-sans.woff2" as="font" type="font/woff2" crossorigin />
   ```
3. **Eliminasi Render-Blocking Resources**:
   - CSS Tailwind v4 dikompilasi secara optimal tanpa unused classes.
   - Skrip analitik eksternal (GTM, Meta Pixel, TikTok) wajib dimuat secara `defer` atau `async` setelah event `requestIdleCallback`.

---

### B. INP Optimization (<100ms):
1. **Anti-Long-Tasks**:
   Tidak boleh ada eksekusi JavaScript yang memblokir main thread lebih dari $50\text{ ms}$.
2. **Input Debouncing**:
   Pencarian teks, filter real-time, dan resize listener wajib di-debounce (`150ms–250ms`) agar CPU browser tidak terbebani saat pengguna mengetik cepat.
3. **Gunakan Web Workers / Micro-tasks**:
   Kalkulasi berat (seperti parsing CSV raksasa, kompresi gambar client-side) wajib dijalankan di background worker.

---

### C. CLS Zero Tolerance (CLS = 0.00):
1. **Aspek Rasio Eksplisit**:
   Setiap tag `<img>`, video, iframe, atau slider **wajib** mencantumkan `width`, `height`, atau kelas Tailwind `aspect-[16/9]`, `aspect-square`.
2. **Skeleton Matching**:
   Skeleton loader wajib memiliki dimensi dan padding yang **100% identik** dengan kartu yang akan dimuat. Dilarang kartu melompat ketika data selesai ditarik dari API.
3. **No Late Banner Injections**:
   Dilarang menyisipkan banner pengumuman di atas header yang mendorong seluruh konten ke bawah setelah loading selesai. Jika ada banner, reservasi tingginya sejak awal.

---

## 3. SEO Architecture & Modern Browser Standards

### A. Hierarki Semantik HTML5
- **Tepat Satu `<h1>`**: Setiap halaman hanya boleh memiliki satu `<h1>` yang mendefinisikan topik utama.
- **Hierarki Berurutan**: `<h1>` $\to$ `<h2>` $\to$ `<h3>`. Dilarang melompat dari `<h1>` langsung ke `<h4>`.
- **Elemen Semantik Murni**: Gunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, dan `<footer>`, bukan sekadar lautan `<div>`.

### B. Meta & Social Graph Lengkap
Setiap halaman wajib menginjeksi metadata dinamis:
```html
<title>Solusi E-Commerce & Kursus Online | Brand</title>
<meta name="description" content="Platform terpadu monetisasi produk digital, visual landing page studio, dan customer hub otomatis." />
<link rel="canonical" href="https://domain.com/halaman" />

<!-- OpenGraph (Facebook / WhatsApp / LinkedIn) -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Solusi E-Commerce & Kursus Online" />
<meta property="og:description" content="Platform terpadu monetisasi produk digital dan kursus online." />
<meta property="og:image" content="https://domain.com/og-banner.jpg" />
<meta property="og:url" content="https://domain.com/halaman" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Solusi E-Commerce & Kursus Online" />
<meta name="twitter:image" content="https://domain.com/og-banner.jpg" />
```

### C. Structured Data JSON-LD (Schema.org)
Sertakan rich schema untuk membantu Googlebot mengindeks data:
- `Product` (dengan harga, ketersediaan, rating).
- `Course` (dengan modul dan materi pembelajaran).
- `Organization` & `BreadcrumbList`.
- `FAQPage` pada seksi tanya jawab.

---

## 4. Stack Ringan & Efisiensi Resource (Hemat CPU & RAM)

### A. Runtime Bun & Zero Dependency Bloat
- Gunakan **Bun** karena footprint RAM-nya yang kecil dan startup instan (<10ms).
- **Haram Mengimpor Pustaka Raksasa**:
  - ❌ Dilarang `moment.js` (65KB) $\to$ ✅ Gunakan native `Intl.DateTimeFormat` atau Day.js ringan jika butuh helper.
  - ❌ Dilarang `lodash` (70KB) $\to$ ✅ Gunakan JavaScript ES2024 native (`structuredClone`, `Array.prototype.findLast`, `Object.groupBy`).
  - ❌ Dilarang library ikon raksasa 2MB $\to$ ✅ Gunakan komponen SVG mandiri [`<AppIcon>`](../templates/AppIcon.vue).

---

### B. Zero Client Memory Leaks (Pembersihan Siklus Hidup)
Kebocoran memori (memory leaks) menyebabkan browser lambat dan crash pada penggunaan jangka panjang.

**Aturan Mutlak di Vue 3**:
Setiap event listener global, timer, atau observer yang dipasang pada saat `onMounted()` **WAJIB** dibersihkan pada saat `onBeforeUnmount()`:

```vue
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

let resizeTimer: NodeJS.Timeout | null = null;
const handleResize = () => { /* ... */ };

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  // WAJIB: Bersihkan seluruh listener dan timer agar RAM tidak bocor!
  window.removeEventListener('resize', handleResize);
  if (resizeTimer) clearTimeout(resizeTimer);
});
</script>
```

---

### C. Asset Pipeline: Format Modern & Lazy Loading
1. **Format Gambar**:
   - Selalu gunakan **WebP** atau **AVIF** (kompresi 30–50% lebih hemat daripada JPG/PNG).
   - Seluruh gambar di bawah lipatan layar (*below-the-fold*) wajib menggunakan `loading="lazy"` dan `decoding="async"`.
2. **Kompilasi CSS & Chunking**:
   - CSS wajib dipisah: critical CSS dimuat instan, sisanya di-chunk.
   - Dictionary i18n dipisah: `id-core.json` (~26KB) dimuat sinkron, kamus admin dimuat dinamis saat rute dibuka.

---

### D. Hardware-Accelerated Animations (Anti-CPU Throttle)
- Animasi transisi CSS **hanya boleh** mengubah properti GPU-accelerated:
  - ✅ `transform: translate3d(x, y, z)` / `scale()`
  - ✅ `opacity`
- ❌ **DILARANG MENGANIMASIKAN**: `width`, `height`, `top`, `left`, `margin`, `padding`. Mengubah properti ini memaksa browser menghitung ulang reflow/layout pada setiap frame (60fps), menyebabkan CPU melonjak 100% dan baterai perangkat pengguna cepat terkuras.
