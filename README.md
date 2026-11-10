# ⚡ My Skill (`my-skill`)

[![Agent Skills Standard](https://img.shields.io/badge/Standard-agentskills.io-blue.svg)](https://agentskills.io)
[![Runtime](https://img.shields.io/badge/Runtime-Bun-f472b6.svg)](https://bun.sh)
[![Frontend](https://img.shields.io/badge/Frontend-Vue%203%20%7C%20Tailwind%20v4-42b883.svg)](https://vuejs.org)
[![Database](https://img.shields.io/badge/ORM-Drizzle-c084fc.svg)](https://orm.drizzle.team)
[![Multi-Agent](https://img.shields.io/badge/Compatibility-Universal%20Agents-emerald.svg)](https://agentskills.io)
[![License](https://img.shields.io/badge/License-MIT-gray.svg)](LICENSE)

Kustom skill dan cetak biru rekayasa (*engineering blueprint*) perangkat lunak berstandar terbuka [**Agent Skills (`agentskills.io`)**](https://agentskills.io). Dirancang untuk digunakan secara universal oleh berbagai AI coding agent—termasuk **Google Antigravity**, **Claude Code**, **Cursor**, **OpenAI Codex**, **GitHub Copilot**, **Cline**, dan **Roo Code**.

Skill ini membakukan DNA rekayasa sistem produksi, filosofi anti-slop UI/UX, arsitektur modular, dan prinsip zero-trust security ke dalam paket terstruktur yang hemat token melalui mekanisme *progressive disclosure*.

---

## 🌐 Kompatibilitas Multi-Agent

Skill ini mematuhi spesifikasi terbuka Linux Foundation (AAIF) pada `agentskills.io`, sehingga dapat langsung dikenali di berbagai platform:

| AI Agent / Tool | Lokasi Global | Lokasi Proyek Workspace |
|---|---|---|
| **Universal (AAIF / Spec)** | `~/.agents/skills/my-skill` | `.agents/skills/my-skill` |
| **Google Antigravity / Gemini** | `~/.gemini/config/skills/my-skill` | `.agents/skills/my-skill` atau `.gemini/skills/` |
| **Claude Code (Anthropic)** | `~/.claude/skills/my-skill` | `.claude/skills/my-skill` atau `.agents/skills/` |
| **Cursor AI** | `~/.cursor/skills/my-skill` | `.cursor/skills/my-skill` atau `.agents/skills/` |
| **OpenAI Codex CLI** | `~/.codex/skills/my-skill` | `.codex/skills/my-skill` atau `.agents/skills/` |
| **GitHub Copilot / Cline / Roo** | Standard environment | `.agents/skills/my-skill` |

---

## 📁 Struktur Standar Repositori (`agentskills.io`)

Repositori ini mengikuti struktur 4-bagian yang direkomendasikan spesifikasi Agent Skills:

```text
my-skill/
├── SKILL.md                         # Wajib: Frontmatter YAML + instruksi master skill
├── README.md                        # Dokumentasi repositori & panduan lintas-agent
│
├── references/                      # Opsional: Pengetahuan domain teknis mendalam (on-demand)
│   ├── design-system.md             # Token CSS semantik, radius konsentris, spacing grid
│   ├── ui-ux-craft.md               # Standar visual, tipografi tajam, anti-slop, micro-interactions
│   ├── android-ui-ux-craft.md       # Ergonomi jempol mobile, bottom-sheet, edge-to-edge, LMK
│   ├── architecture-patterns.md     # Domain modularity, SWR cache, no-FK, transaksi ACID
│   ├── stack-tooling.md             # Golden tier stack (Bun, Vue 3, Tailwind v4, Drizzle)
│   ├── security-compliance.md       # Safe outbound fetcher (anti-SSRF), anti-IDOR, HMAC
│   ├── modular-i18n.md              # Partisi kamus per domain, FCP-first chunking, CLI
│   └── performance-lighthouse-seo.md# Core Web Vitals (LCP < 1.2s, CLS 0), skor Lighthouse 100
│
├── assets/                          # Opsional: Boilerplate, template kode & komponen siap pakai
│   ├── AppIcon.vue                  # Komponen ikon vektor SVG terpadu (anti-emoji di UI)
│   ├── design-system.css            # Variabel token tema Tailwind CSS v4
│   ├── inMemoryCache.ts             # Cache SingleFlight SWR anti-cache-stampede
│   ├── safeOutboundUrl.ts           # Validator URL & inspeksi DNS anti-SSRF
│   ├── split-locales.ts             # Compiler otomatis i18n modular
│   ├── i18n-add.ts                  # CLI helper penambah kunci terjemahan
│   └── db-schema-starter.ts         # Pola skema & transaksi Drizzle ORM tanpa foreign key
│
└── scripts/                         # Opsional: Skrip otomasi & instalasi universal
    ├── install-globally.sh          # Pasang global ke seluruh agent yang terpasang
    └── install-to-workspace.sh      # Pasang ke workspace proyek (.agents/skills/ + link agent)
```

---

## 🧭 Ringkasan 6 Pilar Rekayasa

Agen AI hanya akan memuat dokumen di `references/` saat tugas relevan sedang dikerjakan (*progressive disclosure*):

| Pilar | Fokus Rekayasa | Dokumen Rujukan |
|---|---|---|
| **🎨 UI/UX & Design System** | Anti-slop, layered neutrals, bento grid, mobile bottom-sheet, desktop hairline grid | [ui-ux-craft.md](references/ui-ux-craft.md), [design-system.md](references/design-system.md) |
| **📱 Native Mobile Craft** | Ergonomi sentuh 60% bawah layar, gestur drawer/swipe, full bleed status bar, proteksi RAM <80MB | [android-ui-ux-craft.md](references/android-ui-ux-craft.md) |
| **🏗️ Arsitektur Sistem** | Domain-driven modularity, batas file <400 baris, no-FK di database, transaksi ACID atomik | [architecture-patterns.md](references/architecture-patterns.md) |
| **⚡ Stack & Resource** | Bun-first, Vue 3 Composition API, Tailwind v4, Drizzle ORM (hemat RAM VPS $4/bln) | [stack-tooling.md](references/stack-tooling.md) |
| **🛡️ Zero-Trust Security** | Anti-SSRF safe outbound fetcher, anti-IDOR tenant guard, raw-body HMAC webhook signature | [security-compliance.md](references/security-compliance.md) |
| **🚀 Lighthouse & i18n** | Target skor 100/100, Core Web Vitals ketat (LCP < 1.2s, CLS 0), kamus modular per domain | [performance-lighthouse-seo.md](references/performance-lighthouse-seo.md), [modular-i18n.md](references/modular-i18n.md) |

---

## 🚀 Cara Instalasi

### 1. Kloning Repositori
```bash
git clone https://github.com/rasyiqi-code/My-Skill.git
cd My-Skill
chmod +x ./scripts/*.sh
```

### 2. Opsi A: Instalasi Global (Untuk Semua Agent di Komputer Anda)
Jalankan skrip ini untuk menautkan skill ke **semua AI agent** yang didukung secara otomatis:
```bash
./scripts/install-globally.sh
```
*Skrip ini akan menautkan skill ke `~/.agents/skills/my-skill`, `~/.gemini/config/skills/my-skill`, `~/.claude/skills/my-skill`, `~/.cursor/skills/my-skill`, dan `~/.codex/skills/my-skill`.*

### 3. Opsi B: Pasang ke Proyek Workspace Tertentu
Untuk mengaktifkan skill pada suatu repositori proyek:
```bash
./scripts/install-to-workspace.sh /path/ke/proyek-anda
```
*Skrip ini akan membuat direktori standar `.agents/skills/my-skill` dan symlink kompatibilitas untuk Claude, Cursor, Gemini, dan Codex.*

---

## 🤖 Cara Menggunakan di Berbagai AI Agent

Setelah terpasang, panggil atau picu skill pada AI agent pilihan Anda:

### Google Antigravity & Gemini CLI
```text
"Gunakan standar my-skill untuk merancang arsitektur modul autentikasi dan billing ini."
```

### Claude Code (Anthropic)
```text
"Follow the my-skill blueprint to implement the product catalog and apply anti-slop UI tokens."
```

### Cursor AI
```text
"Gunakan panduan my-skill untuk refactor schema database dan tambahkan SingleFlight SWR cache."
```

### OpenAI Codex / Copilot / Cline / Roo Code
```text
"Apply the rules in .agents/skills/my-skill to build this feature."
```

Setiap agen yang kompatibel akan membaca metadata `SKILL.md`, mengaktifkan instruksi rekayasa, dan merujuk ke file `references/` serta `assets/` sesuai kebutuhan tugas secara efisien.

---

## 📄 Lisensi

Dilisensikan di bawah [MIT License](LICENSE). Standar spesifikasi berbasis [agentskills.io](https://agentskills.io).
