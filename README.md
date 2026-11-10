# ⚡ My Skill (`my-skill`)

> **The Signature Developer Blueprint & Universal AI Agent Skill by Rasyiqi**

[![Runtime](https://img.shields.io/badge/Runtime-Bun-f472b6.svg)](https://bun.sh)
[![Frontend](https://img.shields.io/badge/Frontend-Vue%203%20%7C%20Tailwind%20v4-42b883.svg)](https://vuejs.org)
[![Database](https://img.shields.io/badge/ORM-Drizzle-c084fc.svg)](https://orm.drizzle.team)
[![Multi-Agent](https://img.shields.io/badge/Compatibility-Universal%20Agents-emerald.svg)](https://github.com/rasyiqi-code/My-Skill)
[![License](https://img.shields.io/badge/License-MIT-gray.svg)](LICENSE)

Repositori ini merangkum seluruh keahlian, filosofi rekayasa perangkat lunak, dan cetak biru arsitektur (*engineering blueprint*) standar **Rasyiqi**. 

Skill ini berfungsi sebagai *second brain* bagi coding agent berbasis AI—seperti **Google Antigravity**, **Claude Code**, **Cursor**, **OpenAI Codex**, **GitHub Copilot**, **Cline**, dan **Roo Code**—maupun bagi developer saat merancang, membangun, dan menyempurnakan aplikasi web full-stack, SaaS, dan antarmuka mobile agar langsung menghasilkan kode yang berstandar produksi tinggi, hemat memori, dan bebas dari desain AI generik (*anti-slop*).

---

## 🎯 Mengapa Repositori Ini Ada?

Saat membangun aplikasi baru dari nol atau bekerja bersama asisten AI:
- ❌ **AI Slop & UI Dingin**: Tampilan antarmuka generik yang membosankan (gradasi ungu/pink klise, card-in-card bertingkat, mengabaikan ergonomi sentuh mobile).
- ❌ **Arsitektur Rapuh**: File monolitik raksasa (>400 baris), circular dependency, mutasi database tanpa transaksi atomik, dan cache stampede (*thundering herd*).
- ❌ **Resource Bloat**: Konsumsi RAM server meledak di VPS hemat resource ($4/bulan, 1 vCPU, 1 GB RAM).
- ❌ **Celah Keamanan Tipikal**: Kerentanan SSRF pada outbound fetcher, celah IDOR pada endpoint multi-tenant, dan replay attack pada webhook.

**My Skill** memastikan agen AI dan pengembang langsung menerapkan hukum rekayasa terbaik sejak baris kode pertama.

---

## 🌐 Kompatibilitas Multi-Agent

Skill ini dirancang fleksibel dan dapat langsung digunakan di berbagai coding agent terkemuka:

| Coding Agent / Platform | Jalur Konfigurasi Global | Jalur Proyek Workspace |
|---|---|---|
| **Universal Agent Standard** | `~/.agents/skills/my-skill` | `.agents/skills/my-skill` |
| **Google Antigravity & Gemini CLI** | `~/.gemini/config/skills/my-skill` | `.agents/skills/my-skill` atau `.gemini/skills/` |
| **Claude Code (Anthropic)** | `~/.claude/skills/my-skill` | `.claude/skills/my-skill` atau `.agents/skills/` |
| **Cursor AI** | `~/.cursor/skills/my-skill` | `.cursor/skills/my-skill` atau `.agents/skills/` |
| **OpenAI Codex CLI** | `~/.codex/skills/my-skill` | `.codex/skills/my-skill` atau `.agents/skills/` |
| **GitHub Copilot, Roo Code, Cline** | Lingkungan standar | `.agents/skills/my-skill` |

---

## 📁 Struktur Repositori

```text
my-skill/
├── SKILL.md                         # Manifest utama instruksi skill yang dibaca agen AI
├── README.md                        # Dokumentasi repositori dan panduan penggunaan
├── LICENSE                          # Lisensi resmi (MIT)
│
├── references/                      # Panduan teknis mendalam per domain (dibaca on-demand)
│   ├── design-system.md             # Token CSS semantik, radius konsentris, spacing grid
│   ├── ui-ux-craft.md               # Standar visual tajam, tipografi, anti-slop, micro-interactions
│   ├── android-ui-ux-craft.md       # Ergonomi sentuh mobile (60% zone), bottom-sheet, edge-to-edge
│   ├── architecture-patterns.md     # Domain-driven modularity, cache SWR, no-FK, transaksi ACID
│   ├── stack-tooling.md             # Golden tier stack (Bun, Vue 3, Tailwind v4, Drizzle)
│   ├── security-compliance.md       # Safe outbound fetcher (anti-SSRF), anti-IDOR, HMAC
│   ├── modular-i18n.md              # Partisi kamus per domain, FCP-first bundle chunking
│   └── performance-lighthouse-seo.md# Core Web Vitals (LCP < 1.2s, CLS 0), skor Lighthouse 100
│
├── assets/                          # Komponen, boilerplate & modul siap pakai
│   ├── AppIcon.vue                  # Komponen ikon vektor SVG terpadu (anti-emoji di UI)
│   ├── BottomSheet.vue              # Modal Bottom Sheet mobile dengan drag handle & swipe-to-dismiss
│   ├── AppToast.vue                 # Toast notifikasi taktil dengan dukungan aksi Undo instan
│   ├── useToast.ts                  # Composable manajemen state toast (antarmuka Undo > konfirmasi)
│   ├── design-system.css            # Token semantic theme Tailwind CSS v4
│   ├── inMemoryCache.ts             # Cache SingleFlight SWR anti-cache-stampede
│   ├── safeOutboundUrl.ts           # Validator URL & DNS outbound anti-SSRF
│   ├── verifyWebhookHmac.ts         # Verifikasi HMAC raw-body & pertahanan timestamp replay
│   ├── db-schema-starter.ts         # Pola skema & transaksi Drizzle ORM tanpa foreign key
│   ├── split-locales.ts             # Skrip generator partisi kamus i18n
│   └── i18n-add.ts                  # CLI helper penambah kunci terjemahan
│
├── scripts/                         # Skrip otomasi & instalasi
│   ├── init-project.sh              # Scaffolder proyek baru lengkap dengan struktur & assets
│   ├── install-globally.sh          # Pasang global ke seluruh agent yang terpasang
│   ├── install-to-workspace.sh      # Pasang lokal ke direktori proyek workspace
│   └── validate-skill.ts            # Skrip validasi integritas tautan, format & perizinan
│
├── evals/                           # Evaluasi & benchmark pemicu agen AI
│   └── evals.json                   # Skenario pengujian prompt positif dan negatif
│
└── .github/workflows/               # Otomasi pengujian CI
    └── ci.yml                       # GitHub Actions verifikasi integritas skill
```

---

## 🧭 Ringkasan 6 Pilar Rekayasa Rasyiqi

Detail lengkap masing-masing pilar tersimpan pada dokumen di folder [`references/`](./references/):

| Pilar | Fokus Rekayasa | Dokumen Rujukan |
|---|---|---|
| **🎨 UI/UX & Design System** | Anti-slop, layered neutrals, bento grid, mobile bottom-sheet, desktop hairline grid | [ui-ux-craft.md](references/ui-ux-craft.md), [design-system.md](references/design-system.md) |
| **📱 Native Mobile Craft** | Ergonomi sentuh 60% bawah layar, gestur drawer/swipe, full-bleed status bar, proteksi RAM <80MB | [android-ui-ux-craft.md](references/android-ui-ux-craft.md) |
| **🏗️ Arsitektur Sistem** | Domain-driven modularity, batas file <400 baris, no-FK di database, transaksi ACID atomik | [architecture-patterns.md](references/architecture-patterns.md) |
| **⚡ Stack & Resource** | Bun-first, Vue 3 Composition API, Tailwind v4, Drizzle ORM (hemat RAM VPS $4/bln) | [stack-tooling.md](references/stack-tooling.md) |
| **🛡️ Zero-Trust Security** | Anti-SSRF safe outbound fetcher, anti-IDOR tenant guard, raw-body HMAC webhook signature | [security-compliance.md](references/security-compliance.md) |
| **🚀 Lighthouse & i18n** | Target skor 100/100, Core Web Vitals ketat (LCP < 1.2s, CLS 0), kamus modular per domain | [performance-lighthouse-seo.md](references/performance-lighthouse-seo.md), [modular-i18n.md](references/modular-i18n.md) |

---

## 🚀 Cara Penggunaan & Instalasi

### 1. Kloning Repositori
```bash
git clone https://github.com/rasyiqi-code/My-Skill.git
cd My-Skill
chmod +x ./scripts/*.sh
```

### 2. Scaffold Proyek Baru Secara Instan
Untuk langsung membuat kerangka proyek baru dengan seluruh struktur folder dan modul standar:
```bash
./scripts/init-project.sh /path/ke/proyek-baru
```
*Perintah ini otomatis membuat struktur folder `src/client`, `src/server`, menyalin komponen dari `assets/`, membuat `package.json` starter berbasis Bun + Tailwind v4 + Drizzle, dan langsung menautkan skill ke workspace tersebut.*

### 3. Pasang Secara Global (Untuk Semua Agent di Komputer)
Jalankan skrip ini untuk menautkan skill ke **semua coding agent** di komputer Anda:
```bash
./scripts/install-globally.sh
```
*Skill akan langsung terdaftar di `~/.gemini/config/skills/my-skill`, `~/.claude/skills/my-skill`, `~/.cursor/skills/my-skill`, `~/.codex/skills/my-skill`, dan `~/.agents/skills/my-skill`.*

### 4. Pasang ke Proyek Workspace Tertentu
Untuk menautkan skill khusus ke dalam suatu folder proyek:
```bash
./scripts/install-to-workspace.sh /path/ke/proyek-anda
```

### 5. Validasi Integritas Skill
Jalankan pengujian integritas untuk memastikan tidak ada tautan yang rusak dan seluruh format terpenuhi:
```bash
bun scripts/validate-skill.ts
```

---

## 🤖 Menjalankan Melalui Coding Agent AI

Setelah terpasang, cukup panggil skill dalam percakapan dengan AI pilihan Anda:

- **Google Antigravity & Gemini CLI**:
  > *"Gunakan standar my-skill untuk merancang arsitektur modul autentikasi dan billing ini."*
- **Claude Code (Anthropic)**:
  > *"Follow the my-skill blueprint to implement the product catalog and apply anti-slop UI tokens."*
- **Cursor AI**:
  > *"Gunakan panduan my-skill untuk refactor schema database dan tambahkan SingleFlight SWR cache."*
- **OpenAI Codex / Copilot / Cline / Roo Code**:
  > *"Apply the rules in .agents/skills/my-skill to build this feature."*

---

## 📄 Lisensi

Dilisensikan di bawah [MIT License](LICENSE). Dibuat dengan dedikasi oleh [Rasyiqi](https://github.com/rasyiqi-code).
