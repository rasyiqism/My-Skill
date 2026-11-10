# ⚡ My Skill (`my-skill`)

Repositori ini berisi kustom skill untuk **Google Antigravity** dan kumpulan cetak biru arsitektur (*engineering blueprint*) perangkat lunak yang dirancang oleh Rasyiqi.

Skill ini berfungsi sebagai panduan standar dan *second brain* bagi agen AI saat merancang, membangun, dan menyempurnakan aplikasi web maupun sistem full-stack agar langsung menghasilkan kode yang modular, efisien, aman, dan berstandar produksi.

---

## 🎯 Fokus & Tujuan Repositori

Repositori ini bukan buku teks panjang, melainkan paket keahlian terstruktur yang menyediakan:

1. **Manifest AI Agent (`SKILL.md`)**: Instruksi inti yang dibaca langsung oleh Antigravity untuk mengenali aturan desain, arsitektur, dan keamanan.
2. **Panduan Teknis Terarah (`references/`)**: Dokumentasi mendalam yang dipisah per domain agar agen hanya membaca referensi yang dibutuhkan saat tugas tertentu dijalankan.
3. **Template Kode Siap Pakai (`templates/`)**: Modul boilerplate konkret (komponen ikon, token CSS, cache in-memory, validator anti-SSRF, dan skema database).
4. **Skrip Instalasi Cepat (`scripts/`)**: Otomasi pemasangan skill secara global maupun per workspace proyek.

---

## 📁 Struktur Repositori

```text
.
├── SKILL.md                         # Manifest utama skill untuk agen Antigravity
├── README.md                        # Penjelasan repositori dan panduan penggunaan
│
├── references/                      # Panduan teknis mendalam per topik
│   ├── design-system.md             # Token CSS semantik, sistem radius, dan komponen dasar
│   ├── ui-ux-craft.md               # Standar visual, tipografi, dan mikro-interaksi
│   ├── android-ui-ux-craft.md       # Ergonomi sentuh mobile, drawer sheet, dan optimasi memori
│   ├── architecture-patterns.md     # Modul domain, cache SWR, integritas data, dan struktur file
│   ├── stack-tooling.md             # Pilihan stack efisien (Bun, Vue 3, Tailwind v4, Drizzle)
│   ├── security-compliance.md       # Proteksi anti-SSRF, anti-IDOR, dan verifikasi webhook
│   ├── modular-i18n.md              # Partisi kamus multibahasa dan tooling CLI
│   └── performance-lighthouse-seo.md# Core Web Vitals, skor Lighthouse 100, dan higienitas CPU/RAM
│
├── templates/                       # Boilerplate & helper siap pakai
│   ├── AppIcon.vue                  # Komponen ikon vektor SVG terpadu
│   ├── design-system.css            # Variabel token tema Tailwind CSS v4
│   ├── inMemoryCache.ts             # Cache SingleFlight SWR anti-stampede
│   ├── safeOutboundUrl.ts           # Validator URL & IP anti-SSRF
│   ├── split-locales.ts             # Script partisi kamus bahasa
│   ├── i18n-add.ts                  # CLI helper penambah string lokalisasi
│   └── db-schema-starter.ts         # Starter schema & transaksi Drizzle ORM
│
└── scripts/                         # Otomasi instalasi
    ├── install-globally.sh          # Menautkan skill ke ~/.gemini/config/skills/
    └── install-to-workspace.sh      # Menautkan skill ke .agents/skills/ pada proyek tertentu
```

---

## 🧭 Ringkasan 6 Pilar Utama

Materi mendalam tersimpan rapi dalam folder `references/`:

| Pilar | Topik Utama | Rujukan Dokumen |
|---|---|---|
| **UI/UX & Desain** | Layered neutrals, bento grid, mobile bottom-sheet, desktop hairline grid | [ui-ux-craft.md](references/ui-ux-craft.md), [design-system.md](references/design-system.md) |
| **Mobile Native** | Ergonomi jempol 60%, gesture drag, edge-to-edge bleed, proteksi low memory | [android-ui-ux-craft.md](references/android-ui-ux-craft.md) |
| **Arsitektur Sistem** | Domain-driven modularity, batas file <400 baris, transaksi ACID atomik | [architecture-patterns.md](references/architecture-patterns.md) |
| **Stack & Tooling** | Bun runtime, Vue 3 Composition API, Tailwind v4, Drizzle ORM hemat RAM VPS | [stack-tooling.md](references/stack-tooling.md) |
| **Keamanan** | Filter outbound safe fetcher (anti-SSRF), isolasi tenant (anti-IDOR), raw HMAC | [security-compliance.md](references/security-compliance.md) |
| **Performa & i18n** | Target Lighthouse 100, Core Web Vitals (LCP < 1.2s, CLS 0), kamus modular per domain | [performance-lighthouse-seo.md](references/performance-lighthouse-seo.md), [modular-i18n.md](references/modular-i18n.md) |

---

## 🚀 Cara Instalasi & Penggunaan

### 1. Kloning Repositori
```bash
git clone https://github.com/rasyiqi-code/My-Skill.git
cd My-Skill
```

### 2. Pasang Secara Global (Untuk Semua Proyek)
Jalankan skrip berikut untuk menautkan repositori ini ke konfigurasi global Antigravity:
```bash
chmod +x ./scripts/*.sh
./scripts/install-globally.sh
```
*Skill akan langsung terdaftar di `~/.gemini/config/skills/my-skill` dan otomatis terdeteksi di setiap workspace.*

### 3. Pasang Khusus ke Satu Proyek Tertentu
Jika ingin menautkan skill ke dalam workspace proyek tertentu saja:
```bash
./scripts/install-to-workspace.sh /path/ke/proyek-anda
```

### 4. Menjalankan Melalui Agen AI
Pada percakapan dengan Antigravity di proyek Anda, berikan instruksi:
- *"Gunakan standar my-skill untuk membangun modul ini."*
- *"Refactor halaman ini mengikuti aturan UI/UX dan arsitektur pada my-skill."*

Agen akan secara otomatis membaca `SKILL.md` serta dokumen pendukung di `references/` untuk menerapkan standar kode yang sesuai.
