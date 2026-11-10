# Rasyiqi UI/UX & Design Craft Specification

The visual identity and user experience in Rasyiqi projects must feel **designer-crafted, editorial, and human-centered**—the polar opposite of generic AI-generated templates.

Dokumen ini mendefinisikan secara eksplisit **Taste Desain** yang diwajibkan serta **Daftar Hal yang DILARANG / TIDAK DISUKAI (Strict Blacklist)** dalam pengembangan antarmuka (UI/UX).

---

## 1. 5 Dosa Besar AI Slop (Strict Blacklist Desain Generik)

Prinsip dasar: *Jika sebuah antarmuka terlihat seperti template AI instan, maka antarmuka tersebut GAGAL.*

AI coding agents sering kali menghasilkan antarmuka yang technically rapi tetapi hampa, pasaran, dan menjemukan. Berikut 5 penyakit utama AI Slop yang **DIHARAMKAN KERAS** dalam standar Rasyiqi:

### ❌ 1. Palet Warna Pasaran (Gradasi Ungu, Biru Elektrik, dan Pink Neon / Cyber-Gradient)
- **Ciri AI Slop**: Menggunakan perpaduan warna ungu, biru elektrik, atau pink neon secara berlebihan pada background, teks gradient, border, atau tombol CTA agar terlihat "modern" atau "futuristik". Hasilnya generik, murahan, dan tidak memiliki identitas brand yang berjiwa.
- **Standar Rasyiqi**: 
  - Gunakan palette **Layered Neutrals** yang tenang dan matang (`neutral-50` $\to$ `neutral-100` $\to$ `white` di light mode; `neutral-950` $\to$ `neutral-900` $\to$ `neutral-800` di dark mode).
  - Aksen warna dipakai secara disiplin dan fungsional (Emerald untuk uang/sukses, Amber untuk VIP/perhatian, Rose untuk bahaya/hapus, Indigo untuk workspace teknis). **Haram menggunakan gradasi neon ungu/pink tanpa identitas brand yang otentik.**

### ❌ 2. Tipografi yang Itu-Itu Saja (Monoton, Kaku & Tanpa Ritme)
- **Ciri AI Slop**: Memakai font sans-serif default yang sangat umum (Inter/Roboto) secara datar tanpa eksperimen hirarki yang kuat. Ukuran dan ketebalan (*font weight*) terasa kaku, tidak memiliki ritme visual yang enak dibaca mata manusia.
- **Standar Rasyiqi**:
  - Ciptakan kontras ritme yang tajam: Judul utama berkarakter tegas (`tracking-tight font-extrabold text-neutral-900 dark:text-neutral-100`), teks pengantar proporsional (`text-base text-neutral-600 dark:text-neutral-300 leading-relaxed`).
  - **Monospace untuk data teknis & finansial**: Angka rupiah, persentase, kode kupon, nomor invoice, dan token ID **wajib** menggunakan `font-mono tracking-wider font-semibold` agar baris data rapi dan presisi saat dipindai mata.

### ❌ 3. Layout "Kartu di Dalam Kartu" & Hero Section Klise
- **Ciri AI Slop**:
  - **Hero Section Klise**: Hampir selalu formula seragam yang membosankan: Badge kecil di atas $\to$ H1 teks besar di kiri $\to$ Tombol CTA ungu $\to$ Mockup 3D atau ilustrasi melayang di sebelah kanan.
  - **Card-in-Card Monoton**: Menumpuk informasi ke dalam 3 kotak simetris identik yang diulang-ulang tanpa dinamika visual.
- **Standar Rasyiqi**:
  - **Bento Grid Asimetris & Variasi Bobot**: Atur tata letak berdasarkan hierarki kepentingan informasi. Fitur utama mendapat kartu lebar ($2\times2$ atau $2\times1$), sedangkan fitur pendukung mendapat kartu ringkas.
  - **Hero Section Kontekstual**: Gunakan komposisi editorial yang berani—bisa berupa split panel fungsional, live interactive preview langsung di hero, atau minimalis tipografis yang percaya diri tanpa ilustrasi 3D hampa.

### ❌ 4. Antarmuka Dingin & Kurang Karakter (Soul-less / Hampa)
- **Ciri AI Slop**: Tampilan secara teknis rapi dan simetris, tetapi terasa steril, kaku, dan seperti dibuat oleh robot tanpa sentuhan desainer manusia. Tidak ada elemen kejutan, tanpa mikro-interaksi bermakna, dan tanpa rasa sentuhan (*tactile sense*).
- **Standar Rasyiqi**:
  - Berikan jiwa (*soul*) melalui **Tactile Micro-Interactions**: Tombol yang terasa membal saat ditekan (`hover:scale-[1.02] active:scale-[0.98] transition-all duration-150`), border halus yang menyala saat input difokuskan, dan transisi antar-state yang halus.
  - Detail visual fungsional: Tag status yang jelas, avatar bertumpuk yang rapi, dan sistem ikon vektor buatan tangan via [`<AppIcon>`](../assets/AppIcon.vue) alih-alih emoji mentah.

### ❌ 5. Logika UX yang Dangkal (Hanya Happy Path, Mengabaikan Edge Case Nyata)
- **Ciri AI Slop**: AI hanya merancang berdasarkan data rata-rata ideal (*happy path*). Ketika dijalankan di dunia nyata, desainnya hancur saat menemui kondisi tak terduga (*edge cases*).
  - Teks nama produk panjang meluap merusak layout (*text overflow*).
  - Tampilan kosong (*empty state*) jelek atau tidak ada tombol aksi pemulihan.
  - Error state tidak memberikan pesan solutif, hanya mengatakan "Gagal".
  - Koneksi lambat/terputus membuat layar beku tanpa indikator loading parsial.
- **Standar Rasyiqi**:
  - **Zero Failure on Edge Cases**: Setiap komponen wajib memiliki perlakuan untuk:
    1. *Data Kosong (0 item)*: Empty state bermartabat dengan tombol buat baru.
    2. *Data Melimpah / Teks Panjang*: Terapkan `truncate` / `line-clamp-2` dan penanganan wrapping yang aman.
    3. *State Loading*: Skeleton loader dengan aspek rasio persis seperti konten asli (mencegah Layout Shift / CLS).
    4. *State Error & Offline*: Pesan kesalahan teknis yang jujur, kode HTTP yang jelas, dan tombol coba lagi (*Retry*).

---

## 2. Strict Blacklist Detail Lainnya

### ❌ 6. Bare Unicode Emojis di UI SaaS / Dashboard
- **Yang Tidak Disukai**: Menaruh emoji mentah di dalam judul, label tombol, badge status, atau navigasi:
  - ❌ `💡 Tips Panduan`, `🚀 Dashboard`, `🔥 Promo Spesial`, `👑 VIP Member`
- **Kenapa Ditolak**: Emoji mentah dirender secara acak dan sangat berbeda oleh sistem operasi (Windows vs Apple vs Android vs Linux), terlihat tidak konsisten, kekanak-kanakan, dan merusak keselarasan tipografi profesional.
- **Standar yang Disukai**: Gunakan komponen vektor SVG seragam [`<AppIcon>`](../assets/AppIcon.vue) dengan warna semantik yang terukur.

### ❌ 7. Kontras Rendah & Teks "Mati" (Accessibility Sins)
- **Yang Tidak Disukai**:
  - Teks abu-abu di atas background abu-abu terang (`text-neutral-400` di atas `bg-neutral-100`) sehingga sulit dibaca.
  - Dark mode hitam pekat OLED `#000000` dengan teks putih murni 100% `#ffffff` yang menusuk mata, atau sebaliknya dark mode abu-abu kabur tanpa kontras.
  - Menghilangkan *focus ring* (`outline: none` tanpa pengganti `focus-visible`), membuat pengguna keyboard buta navigasi.
- **Standar yang Disukai**:
  - Rasio kontras teks minimum 4.5:1 untuk teks normal (WCAG AA).
  - Dark mode elegan menggunakan palette `neutral-950` untuk canvas, `neutral-900` untuk kartu, `neutral-800` untuk wells, dan `neutral-100` untuk teks primer.
  - Selalu sertakan `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`.

### ❌ 8. Container Inception & Kekacauan Padding/Spacing (Matryoshka Box Syndrome)
- **Yang Tidak Disukai**:
  - **Container Inception (Kotak di Dalam Kotak)**: Menaruh kartu di dalam kartu di dalam container di dalam panel (`div.card > div.inner-card > div.sub-box`), masing-masing dengan border, shadow, dan rounded corner sendiri! Ini membuang 50% ruang layar, membuat konten utama terjepit di celah sempit, dan terlihat sangat amatir.
  - **Nested Padding Compounding**: Wadah luar `p-6`, anaknya `p-6`, cucunya `p-6`, sehingga area konten sebenarnya hanya tersisa kolom kecil selebar 150px.
  - **Ruang Hampa Berlebihan (Empty Void)**: Memberikan jarak raksasa (`py-32` atau `space-y-20`) pada form atau dashboard yang memaksa pengguna scroll berkali-kali tanpa isi yang bermakna.

### ❌ 9. Teks Bertele-tele & Tombol Boros Kata ("Kalau Mau Nulis Artikel Bukan Disini")
- **Yang Tidak Disukai**:
  - **Paragraf Dongeng di Header Halaman**: Di bawah judul halaman diberi penjelasan panjang lebar. **Ini aplikasi antarmuka kerja, bukan blog artikel!**
  - **Tombol Boros Kata**: Tombol yang bisa 1 kata dibuat 2 atau 3 kata: *"Simpan Perubahan"*, *"Tambahkan Produk Baru"*, *"Lakukan Pembayaran"*.
  - **Aksi Tabel Dipenuhi Tombol Teks Panjang**: Baris tabel dipenuhi tombol teks panjang yang membuat tabel melebar dan berantakan.
  - **Tombol Dobel Redundan**: Menyediakan 2 tombol untuk hal yang sebenarnya bisa 1 aksi jelas.
- **Standar yang Disukai**:
  - **Header Super Ringkas**: Judul cukup 1–2 kata. Deskripsi maksimal 1 kalimat pendek (<60 karakter) atau hilangkan sama sekali jika sudah jelas.
  - **The One-Word Button Rule**: Jika cukup 1 kata, WAJIB 1 kata! ("Simpan", "Tambah", "Hapus", "Salin", "Ekspor", "Filter", "Batal", "Bayar").
  - **Icon-Only Action**: Aksi berulang di tabel/card wajib berupa tombol ikon bersih (`<AppIcon>`) dengan tooltip & `aria-label`.

### ❌ 10. Menganggap Pengguna Bodoh (Patronizing & Nanny-State UX)
- **Yang Tidak Disukai**:
  - Tur onboarding unskippable yang memblokir layar.
  - Modal konfirmasi bawel untuk setiap klik sepele yang bisa di-undo.
  - Teks penjelasan "Captain Obvious" yang mengulang label input.
  - Empty state kartun dengan teks merengek manja.
  - Memblokir paste pada input kata sandi (merusak password manager).
- **Standar yang Disukai**:
  - **Asumsikan Pengguna Cerdas**: Biarkan pengguna langsung bekerja.
  - **Undo > Dialog Konfirmasi**: Eksekusi instan + toast ringan `[Urungkan]`. Konfirmasi pop-up HANYA untuk aksi destruktif permanen.
  - **Komunikasi Dewasa**: Nada bicara profesional, tenang, dan solutif.
  - **Keyboard First**: Dukung shortcut (`Esc`, `Cmd+S`, `Enter`). Jangan pernah blokir paste.

### ❌ 11. Jargon Bombastis (Bahasa Sok Keren untuk Fitur Biasa)
- **Yang Tidak Disukai**:
  - Memanggil filter biasa sebagai *"AI-Powered Cognitive Intelligence Filter"*.
  - Memanggil unggah file sebagai *"Decentralized Cloud Asset Vault"*.
  - Memanggil ekspor CSV sebagai *"Big Data Enterprise Warehouse Pipeline"*.
- **Standar yang Disukai**:
  - Gunakan bahasa membumi dan jujur: *"Filter"*, *"Unggah Gambar"*, *"Ekspor CSV"*, *"Notifikasi Email"*.

### ❌ 12. Teks Terbuka Memenuhi Layar (Gunakan Tooltip)
- **Yang Tidak Disukai**: Menulis paragraf penjelasan 2–3 baris secara telanjang di bawah setiap opsi form.
- **Standar yang Disukai**: Sembunyikan penjelasan teknis di balik **Tooltip halus** (`<AppIcon name="help-circle" />`).

### ❌ 13. Fitur Prematur & Dead Affordances (Anti-Setengah Matang)
- **Yang Tidak Disukai**:
  - Tombol atau tautan palsu bertuliskan *"Segera Hadir"*, *"Under Construction"*, atau memicu `alert('Coming soon')`.
  - Tombol disabled permanen tanpa penjelasan mengapa tombol tersebut tidak aktif.
  - Form input tanpa status loading (`isSubmitting`) yang membiarkan pengguna mengklik berkali-kali (*double submit*).
  - Elemen antarmuka yang hanya jalan di *happy path*, tapi langsung rusak/hancur saat data kosong atau jaringan bermasalah.
- **Standar yang Disukai**:
  - **Kematangan Menyeluruh**: Jika suatu fitur belum siap dipakai secara utuh, **jangan tampilkan tombol atau menu palsu di UI!**
  - **State Lengkap Wajib Ada**: Setiap interaksi wajib memiliki state lengkap: idle, hover, loading/submitting, disabled, empty state bermartabat, dan error recovery.

---

## 3. Layout Law: Full-Edge Mobile & Hairline Grid Desktop ("Dipisah Garis-Garis")

Ini adalah hukum tata letak fundamental Rasyiqi yang membedakannya dari template AI mengambang:

### A. Mobile: Full-Edge (Edge-to-Edge Full-Bleed), Minimal Round, & Compact Density
Layar smartphone (375px–414px) sangat berharga. Dilarang keras membuang ruang layar dengan kartu mengambang yang memiliki margin samping tebal (`mx-4`) dan sudut membulat balon (`rounded-2xl`).

- **Full-Edge Container**: Kontainer kartu di mobile menempel penuh dari ujung kiri ke ujung kanan layar (`w-full border-x-0 border-y border-neutral-200 dark:border-neutral-800` atau `-mx-4 px-4`).
- **Minimal / No Round**: Sudut kartu di mobile tidak perlu membulat besar. Gunakan `rounded-none` (0px) untuk panel docked, atau maksimal `rounded-xs` / `rounded-sm` (2px–4px) jika kartu terpisah.
- **Kompak & Padat**: Padding vertikal dan horizontal dibuat efisien (`py-3 px-4`). Informasi disajikan rapat, padat, dan mudah dipindai jempol tanpa perlu scroll bermil-mil.

```html
<!-- Contoh Standar Kartu Mobile: Full-Edge & Minimal Round -->
<div class="w-full @sm:max-w-xl @sm:mx-auto border-y @sm:border @sm:rounded-lg border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 @sm:p-6">
  <!-- Di mobile: Menempel penuh ke tepi layar, tanpa margin samping yang membuang ruang -->
  <!-- Di tablet/desktop: Menjadi kartu terpusat dengan border rapi -->
</div>
```

---

### B. Desktop: The Hairline Divider & Architectural Grid Aesthetic ("Dipisah Garis-Garis")
Di desktop, antarmuka **TIDAK BOLEH** terlihat seperti sekumpulan kartu pulau yang mengambang terpisah di atas background abu-abu dengan drop-shadow tebal.

Antarmuka desktop Rasyiqi mengadopsi **Estetika Arsitektural Garis Hairline (Swiss Grid / Linear / Bloomberg Precision)**:
- **Pemisah Garis Hairline 1px**: Panel, kolom navigasi, dan seksi konten disatukan dan dipisahkan oleh garis rambut 1px yang tajam (`border-r border-neutral-200 dark:border-neutral-800` atau kelas `divide-x divide-neutral-200 dark:divide-neutral-800`).
- **Garis Horizontal Bersih**: Baris data, tabel, dan item list dipisah dengan garis horizontal 1px tipis (`divide-y divide-neutral-200 dark:divide-neutral-800` atau `border-b`).
- **Unified Docked Panels**: Header, sidebar, panel filter, dan kanvas utama menempel rapat satu sama lain (*docked*), hanya dipisahkan oleh garis vertikal dan horizontal 1px.
- **Sudut Tegas (Bukan Balon)**: Sudut kontainer desktop maksimal `rounded-lg` (8px) atau `rounded-none` saat panel menempel ke tepi viewport. Hindari sudut membulat berlebihan (`rounded-3xl` / 24px) yang membuat software pro terlihat seperti mainan.

```html
<!-- Contoh: Dashboard Desktop dengan Garis-Garis Hairline (Docked Architecture) -->
<div class="grid grid-cols-12 min-h-screen bg-white dark:bg-neutral-900 border-x border-neutral-200 dark:border-neutral-800">
  <!-- Sidebar: Dipisah garis tegak 1px di kanan -->
  <aside class="col-span-3 border-r border-neutral-200 dark:border-neutral-800 p-6 space-y-4">
    <div class="font-bold text-sm tracking-tight text-neutral-900 dark:text-neutral-100">Navigasi</div>
    <!-- Menu items dipisah rapi -->
  </aside>

  <!-- Area Konten Utama -->
  <main class="col-span-9 flex flex-col">
    <!-- Header: Dipisah garis horizontal 1px di bawah -->
    <header class="h-14 border-b border-neutral-200 dark:border-neutral-800 px-6 flex items-center justify-between">
      <h1 class="font-bold text-base tracking-tight text-neutral-900 dark:text-neutral-100">Pesanan</h1>
      <button class="px-3 py-1.5 rounded-md text-xs font-semibold bg-neutral-900 text-white">Ekspor</button>
    </header>

    <!-- Baris Metrik: Dipisah garis tegak 1px antar metrik (Swiss Grid) -->
    <div class="grid grid-cols-3 border-b border-neutral-200 dark:border-neutral-800 divide-x divide-neutral-200 dark:divide-neutral-800">
      <div class="p-5">
        <span class="text-xs text-neutral-500 font-medium">Total Omzet</span>
        <div class="text-xl font-bold font-mono mt-1 text-neutral-900 dark:text-neutral-100">Rp 48.250.000</div>
      </div>
      <div class="p-5">
        <span class="text-xs text-neutral-500 font-medium">Pesanan Sukses</span>
        <div class="text-xl font-bold font-mono mt-1 text-emerald-600 dark:text-emerald-400">1.284</div>
      </div>
      <div class="p-5">
        <span class="text-xs text-neutral-500 font-medium">Konversi</span>
        <div class="text-xl font-bold font-mono mt-1 text-indigo-600 dark:text-indigo-400">4.8%</div>
      </div>
    </div>

    <!-- Tabel Data: Dipisah garis horizontal tipis per baris -->
    <div class="divide-y divide-neutral-200 dark:divide-neutral-800">
      <!-- Table rows -->
    </div>
  </main>
</div>
```

---

### C. Mobile Gestures & Interaction Parity (Pola Sentuh Khas Mobile)
Dilarang memaksakan pola interaksi desktop (hover tooltip, dropdown klik kecil, pagination tabel angka sempit, dialog pop-up tengah layar) ke dalam tampilan mobile. Antarmuka mobile wajib mengadopsi gestur alami jempol:

1. **Modal Bottom Sheet Over Center Dialog**:
   - Pada layar sentuh / mobile (`<640px`), modal di tengah layar wajib diganti dengan **Bottom Sheet** yang menempel di bawah.
   - Sediakan pegangan visual (*pill drag handle*: `w-10 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 mx-auto mb-3`) dan dukung sapuan ke bawah (*swipe-to-dismiss*).
2. **Swipe-to-Action pada Baris Data**:
   - Di perangkat sentuh (`@media (pointer: coarse)`), baris daftar dapat disapu:
     - **Swipe Kiri (Destruktif)**: Menampilkan latar merah mawar (`bg-rose-600`) dan aksi hapus dengan peringatan.
     - **Swipe Kanan (Konstruktif)**: Menampilkan latar hijau zamrud (`bg-emerald-600`) dan aksi edit/pin.
     - Dilengkapi *snap-back physics* jika tarikan tidak melampaui batas ambang (*threshold*).
3. **Long Press untuk Aksi Kontekstual & Multi-Seleksi**:
   - Tekan-lama (350–500ms) pada item mobile memicu menu kontekstual atau mengaktifkan mode multi-seleksi (checklist massal), diiringi haptic feedback halus (`navigator.vibrate?.(40)` pada web).
4. **Horizontal Scroll Chips dengan Snap Alignment**:
   - Filter status, kategori, atau tag disusun mendatar dalam kontainer `overflow-x-auto snap-x snap-mandatory scrollbar-none`.
   - Pasang gradient fade mask di ujung kanan (`mask-image: linear-gradient(to right, black 85%, transparent 100%)`) agar pengguna tahu ada konten kelanjutan tanpa perlu scrollbar tebal yang merusak pemandangan.
5. **Collapsible Header & Smooth Accordion**:
   - Header halaman yang besar meluruh (*collapse*) menjadi top bar ramping saat scroll ke bawah untuk memaksimalkan area baca.
   - Konten detail tersembunyi disajikan dalam *accordion* yang melipat/membuka dengan rotasi chevron halus ($180^\circ$) dan transisi tinggi tanpa memicu layout shift mendadak.

---

## 4. Aturan Box Container, Spacing & Padding Presisi

### A. The "Rule of 2 Levels" (Batas Maksimal Kedalaman Kontainer)
Jangan pernah membuat lebih dari 2 lapisan wadah visual:
- **Level 0 (Canvas)**: Background seluruh halaman (`bg-neutral-50 dark:bg-neutral-950`).
- **Level 1 (Card / Panel Utama)**: Kontainer pengelompokan fitur (`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 @sm:p-6 shadow-2xs`).
- **Level 2 (Well / Konten Tertanam)**: Form input, blok kode, atau item list interaktif (`bg-neutral-100 dark:bg-neutral-800/60 rounded-md p-3`).
- **Level 3+ (STRICTLY FORBIDDEN)**: Jangan pernah membungkus Level 2 ke dalam box lain lagi! Gunakan garis pemisah tipis (`divide-y divide-neutral-200`) atau spasi (`space-y-3`), bukan kotak ber-border baru.

### B. Formula Radius Konsentris
Jika elemen anak diberi sudut melengkung di dalam kontainer yang ber-padding:
$$R_{\text{inner}} = \max(0, R_{\text{outer}} - \text{padding})$$

### C. Sistem Spacing Kelipatan 4px / 8px (No Arbitrary Gaps)
Gunakan spasi yang konsisten berdasarkan grid 4px/8px: `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), `gap-6` (24px). Dilarang margin arbitrer acak (`gap-7`, `gap-11`, `mb-[13px]`, `mt-9`).

---

## 5. Brevity & Micro-Copy Law: Ringkas, Padat, To-the-Point ("Kalau Mau Nulis Artikel Bukan Disini")

- **Header Halaman**: Judul 1–2 kata. Deskripsi maksimal 1 baris pendek (<60 karakter) atau hilangkan jika sudah jelas.
- **The One-Word Button Rule**: Jika cukup 1 kata, WAJIB 1 kata! ("Simpan", "Tambah", "Hapus", "Salin", "Ekspor", "Filter", "Batal", "Bayar").
- **Icon-First Action**: Aksi berulang di tabel/card wajib berupa tombol ikon bersih (`<AppIcon>`) dengan tooltip & `aria-label`.
- **Single Primary Action**: Hanya 1 aksi primer dominan per layar. Hilangkan tombol redundan.

---

## 6. The "Respect User Intelligence" Law ("Jangan Anggap User Bodoh")

- **Undo Over Nanny Confirmations**: Aksi reversibel dieksekusi langsung secara optimistis + toast notifikasi singkat `[Urungkan / Undo]`. Konfirmasi pop-up HANYA untuk aksi destruktif permanen.
- **Fallback ke Informasi Error di UI > Silent Secondary Fallback**: Jangan diam-diam mengalihkan pilihan pengguna ke provider/metode lain saat terjadi kegagalan (misal pembayaran kartu ditolak). Langsung tampilkan pesan error yang jujur, jelas, dan solutif di UI agar pengguna memahami apa yang terjadi dan memegang kendali penuh atas keputusan selanjutnya.
- **No "Captain Obvious" Explanations**: Jangan mengulang label di dalam helper text.
- **Komunikasi Dewasa**: Empty state bermartabat tanpa kartun merengek. Pesan error teknis jujur dan solutif.
- **Keyboard-First**: Dukung `Esc`, `Cmd+S`, `Enter`, `Cmd+K`. Jangan pernah blokir paste password manager.

---

## 7. The "Show, Don't Tell" & Plain Language Law (Tunjukkan Bukti & Bahasa Membumi)

- **Anti-Jargon Matrix**: Gunakan kata jujur dan bersahaja ("Cari", "Ekspor CSV", "Unggah Berkas", "Notifikasi Email"), bukan istilah sok canggih.
- **Don't Tell, But Show**: Dokumentasi wajib memberikan contoh kode nyata (*copy-pasteable*) dan input $\to$ output konkret. Antarmuka wajib menyediakan live preview seketika.

---

## 8. Pola Komponen & Tombol Ideal (Contoh Implementasi)

```html
<!-- Contoh: Tombol Utama Rasyiqi Standar -->
<button
  type="button"
  class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
         bg-neutral-900 text-white dark:bg-white dark:text-neutral-950
         hover:bg-neutral-800 dark:hover:bg-neutral-100
         hover:scale-[1.02] active:scale-[0.98]
         transition-all duration-150 ease-out
         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
         shadow-2xs hover:shadow-xs
         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
>
  <AppIcon name="plus" class="w-4 h-4" />
  <span>{{ $t('common.create') }}</span>
</button>
```
