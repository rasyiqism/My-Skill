<template>
  <svg 
    :class="computedClasses"
    :viewBox="viewBox" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round" 
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <!-- ================= 1. MENU & NAVIGATION ================= -->
    
    <!-- Home / Beranda: Sleek architectural storefront with hearth/door -->
    <g v-if="name === 'home' || name === 'beranda'">
      <path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-9Z" />
      <path v-if="duotone" d="M9 21V12.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5V21" fill="currentColor" fill-opacity="0.18" />
      <path d="M9 21V12.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5V21" />
      <path d="M12 3v3" opacity="0.35" />
    </g>

    <!-- Explore / Jelajah: Stellar discovery compass rose with duotone facet -->
    <g v-else-if="name === 'explore' || name === 'jelajah'">
      <circle cx="12" cy="12" r="9" />
      <polygon points="12,6.5 14.5,12 12,17.5 9.5,12" stroke-linejoin="round" />
      <polygon v-if="duotone" points="12,6.5 14.5,12 12,17.5" fill="currentColor" fill-opacity="0.22" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </g>

    <!-- SiBio: Digital link-in-bio mobile card with profile & link capsules -->
    <g v-else-if="name === 'sibio' || name === 'bio'">
      <rect x="5" y="2.5" width="14" height="19" rx="3" />
      <circle cx="12" cy="7.5" r="2" :fill="duotone ? 'currentColor' : 'none'" :fill-opacity="duotone ? '0.2' : '0'" />
      <rect x="8" y="12" width="8" height="2" rx="1" fill="currentColor" fill-opacity="0.25" stroke="none" />
      <rect x="8" y="15.5" width="8" height="2" rx="1" fill="currentColor" fill-opacity="0.25" stroke="none" />
      <path d="m19 2.5 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" fill="currentColor" stroke="none" />
    </g>

    <!-- Portal Pembeli / Buyer Hub: Verified order tote with check badge -->
    <g v-else-if="name === 'hub' || name === 'portal-pembeli'">
      <path d="M5.5 8h13l1 12a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2L5.5 8Z" />
      <path d="M9 10V5.5a3 3 0 0 1 6 0V10" />
      <path v-if="duotone" d="m9.5 14.5 1.8 1.8 3.5-3.5" :stroke-width="Number(strokeWidth) + 0.2" />
    </g>

    <!-- Blog / Articles -->
    <g v-else-if="name === 'blog'">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M4 6h16" opacity="0.4" />
      <path d="M8 10h8M8 14h5" opacity="0.75" />
    </g>

    <!-- Dashboard: Multi-gauge command center -->
    <g v-else-if="name === 'dashboard' || name === 'overview' || name === 'ringkasan' || name === 'layout-dashboard'">
      <rect x="3" y="3" width="7.5" height="9" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="5" rx="2" />
      <rect x="13.5" y="11" width="7.5" height="10" rx="2" />
      <rect x="3" y="15" width="7.5" height="6" rx="2" />
      <circle v-if="duotone" cx="6.75" cy="7.5" r="1.2" fill="currentColor" />
    </g>

    <!-- ================= 2. DASHBOARD SIDEBAR TABS ================= -->

    <!-- Orders / Pesanan Masuk: Isometric parcel box with tape seal -->
    <g v-else-if="name === 'orders' || name === 'pesanan' || name === 'package' || name === 'box'">
      <path d="M12 3 3.5 7.5 12 12l8.5-4.5L12 3Z" :fill="duotone ? 'currentColor' : 'none'" :fill-opacity="duotone ? '0.15' : '0'" />
      <path d="m3.5 7.5 8.5 4.5v9l-8.5-4.5v-9Z" />
      <path d="m20.5 7.5-8.5 4.5v9l8.5-4.5v-9Z" />
      <path d="M12 12v9" opacity="0.35" />
    </g>

    <!-- Products / Katalog Produk: Layered cards with showcase jewel -->
    <g v-else-if="name === 'products' || name === 'katalog'">
      <rect x="3" y="7" width="14" height="14" rx="2.5" />
      <path d="M7 3h12a2 2 0 0 1 2 2v12" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" />
      <path v-if="duotone" d="m3 17 4-4 3 3 4-4 3 3" opacity="0.4" />
    </g>

    <!-- LP Builder: Studio wireframe canvas with magic spark -->
    <g v-else-if="name === 'lp_builder' || name === 'lp-builder'">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M8 9v11" />
      <path v-if="duotone" d="M5.5 6.5h.01M7.5 6.5h.01" stroke-width="2.5" />
      <path d="m14 13 4 4M17 12l.5 1.5L19 14l-1.5.5L17 16l-.5-1.5L15 14l1.5-.5L17 12Z" fill="currentColor" stroke="none" />
    </g>

    <!-- Coupons / Kupon Promo: Perforated ticket with dashed split -->
    <g v-else-if="name === 'coupons' || name === 'kupon' || name === 'tag' || name === 'ticket'">
      <path d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v2a2 2 0 0 0 0 4v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2a2 2 0 0 0 0-4V8Z" />
      <path d="M12 6v12" stroke-dasharray="2 2" opacity="0.5" />
      <circle cx="8" cy="12" r="1" fill="currentColor" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
    </g>

    <!-- Team / Tim & Akses Staf: Dual workspace members -->
    <g v-else-if="name === 'team' || name === 'tim'">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 19a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5" />
      <path d="M19 19a5 5 0 0 0-5-4" />
      <path v-if="duotone" d="M9 8a1.5 1.5 0 0 0 0-3" fill="currentColor" fill-opacity="0.2" />
    </g>

    <!-- Finance / Dompet & Payout: Digital wallet with chip card -->
    <g v-else-if="name === 'finance' || name === 'dompet' || name === 'wallet'">
      <rect x="2" y="6" width="20" height="14" rx="3" />
      <path d="M2 10.5h20" />
      <rect x="15" y="13.5" width="4" height="3" rx="1" :fill="duotone ? 'currentColor' : 'none'" :fill-opacity="duotone ? '0.25' : '0'" />
      <path v-if="duotone" d="M6 3.5h12a2 2 0 0 1 2 2v.5" opacity="0.45" />
    </g>

    <!-- Analytics / Analitik & Funnel: Precision trend curve with area tint -->
    <g v-else-if="name === 'analytics' || name === 'analitik' || name === 'trend' || name === 'trending-up'">
      <path d="M3 20h18" />
      <path d="M3 15 8.5 9.5l4 4 6.5-7.5" :stroke-width="Number(strokeWidth) + 0.15" />
      <circle cx="19" cy="6" r="2" fill="currentColor" />
      <path v-if="duotone" d="M3 15 8.5 9.5l4 4 6.5-7.5V20H3Z" fill="currentColor" fill-opacity="0.1" stroke="none" />
    </g>

    <!-- Chart / Bar Chart / Stats (replacing 📊) -->
    <g v-else-if="name === 'chart' || name === 'bar-chart' || name === 'stats'">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" opacity="0.4" />
      <rect v-if="duotone" x="10.5" y="4" width="3" height="16" rx="1.5" fill="currentColor" fill-opacity="0.2" stroke="none" />
    </g>

    <!-- Target / Tracking / Goal (replacing 🎯): Telemetry radar crosshair target -->
    <g v-else-if="name === 'target' || name === 'tracking' || name === 'goal' || name === 'funnel'">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </g>

    <!-- Inbox Empty / Mailbox / No Data (replacing 📭) -->
    <g v-else-if="name === 'inbox' || name === 'inbox-empty' || name === 'empty' || name === 'mailbox'">
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <path v-if="duotone" d="M22 12h-6l-2 3h-4l-2-3H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6z" fill="currentColor" fill-opacity="0.15" stroke="none" />
    </g>

    <!-- Domain: Internet network orb with orbital meridian -->
    <g v-else-if="name === 'domain'">
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3.5 9h17M3.5 15h17" />
      <circle v-if="duotone" cx="12" cy="12" r="1.5" fill="currentColor" />
    </g>

    <!-- Logistics / Ekspedisi: Swift cargo transit carrier -->
    <g v-else-if="name === 'logistics' || name === 'ekspedisi'">
      <path d="M2 5h11v10H2z" />
      <path d="M13 8.5h4.5l3.5 3.5v3H13z" />
      <circle cx="6" cy="17.5" r="2.5" />
      <circle cx="17" cy="17.5" r="2.5" />
      <path v-if="duotone" d="M5 8.5h5M5 11.5h3" opacity="0.4" stroke-width="1.5" />
    </g>

    <!-- Marketing: Dynamic loudspeaker / broadcast megaphone -->
    <g v-else-if="name === 'marketing' || name === 'megaphone'">
      <path d="m3 11 12-4v10L3 13H1v-2h2Z" />
      <path d="M15 9.5c1.8.5 3 1.5 3 2.5s-1.2 2-3 2.5" />
      <path d="M17 6.5c3.2 1 5 3 5 5.5s-1.8 4.5-5 5.5" />
      <path d="M6 13v4a2 2 0 0 0 2 2h1v-6" />
    </g>

    <!-- Affiliate / Program Afiliasi: Partner network node branch -->
    <g v-else-if="name === 'affiliate' || name === 'afiliasi'">
      <circle cx="12" cy="5" r="3" />
      <circle cx="5" cy="19" r="3" />
      <circle cx="19" cy="19" r="3" />
      <path d="m7.5 17 3-9M16.5 17l-3-9" />
      <path v-if="duotone" d="M8 19h8" stroke-dasharray="2 2" opacity="0.5" />
    </g>

    <!-- Workspace / Ruang Kerja & Klien: Professional client dossier -->
    <g v-else-if="name === 'workspace' || name === 'ruang-kerja'">
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <rect x="10.5" y="11" width="3" height="2" rx=".5" fill="currentColor" fill-opacity="0.3" />
    </g>

    <!-- Store: Boutique canopy storefront (replacing 🏪) -->
    <g v-else-if="name === 'store' || name === 'toko'">
      <path d="M3 9 4.5 4h15L21 9M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9" />
      <path v-if="duotone" d="M9 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7" fill="currentColor" fill-opacity="0.18" />
      <path d="M9 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7" />
    </g>

    <!-- ================= 3. OVERVIEW STATS KPI BADGES ================= -->

    <!-- Revenue KPI (replacing 💰) -->
    <g v-else-if="name === 'revenue' || name === 'kpi-revenue'">
      <rect x="2" y="5.5" width="20" height="13" rx="2.5" />
      <circle cx="12" cy="12" r="3.2" :fill="duotone ? 'currentColor' : 'none'" :fill-opacity="duotone ? '0.22' : '0'" />
      <path d="M6 12h.01M18 12h.01" stroke-width="2.5" />
    </g>

    <!-- Orders KPI (replacing 📦) -->
    <g v-else-if="name === 'orders-kpi' || name === 'kpi-orders'">
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" :fill="duotone ? 'currentColor' : 'none'" :fill-opacity="duotone ? '0.2' : '0'" />
      <path d="m3 7.5 9 4.5v9L3 16.5v-9Z" />
      <path d="m21 7.5-9 4.5v9l9-4.5v-9Z" />
      <path d="M12 12v9" opacity="0.35" />
      <path d="m7.5 5.25 9 4.5" opacity="0.6" stroke-width="1.3" />
    </g>

    <!-- Conversion KPI (replacing 📈) -->
    <g v-else-if="name === 'conversion' || name === 'kpi-conversion'">
      <polygon points="2,4 22,4 14,14 14,20 10,20 10,14" />
      <polygon v-if="duotone" points="4,5 20,5 13,13.5 13,19 11,19 11,13.5" fill="currentColor" fill-opacity="0.22" stroke="none" />
      <path d="M12 8v3M10.5 9.5h3" stroke-width="1.6" />
    </g>

    <!-- Vault KPI (replacing 🏦) -->
    <g v-else-if="name === 'vault' || name === 'kpi-vault'">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="2" :fill="duotone ? 'currentColor' : 'none'" :fill-opacity="duotone ? '0.25' : '0'" />
      <path d="M12 7.5V6M12 18v-1.5M7.5 12H6M18 12h-1.5" />
      <circle cx="18" cy="5.5" r=".75" fill="currentColor" />
    </g>

    <!-- Payout / Flying Cash / Withdraw (replacing 💸) -->
    <g v-else-if="name === 'payout' || name === 'cash' || name === 'flying-cash' || name === 'withdraw' || name === 'banknote'">
      <rect x="2" y="6" width="15" height="11" rx="2" />
      <circle cx="9.5" cy="11.5" r="2.2" />
      <circle v-if="duotone" cx="9.5" cy="11.5" r="1.2" fill="currentColor" />
      <path d="M5.5 11.5h.01M13.5 11.5h.01" stroke-width="2" />
      <path d="M17 7.5c2-1 4-1 5 0M17 11.5c2 0 4 0 5 0M17 15.5c2 1 4 1 5 0" opacity="0.6" />
    </g>

    <!-- ================= 4. SAAS PLAN EMBLEMS ================= -->

    <!-- Crown (Pro Creator: Royal Prestige Coronet with Gemstone Band & Radiant Velvet Diamond) -->
    <g v-else-if="name === 'crown' || name === 'mahkota' || name === 'pro' || name === 'plan-pro' || name === 'pro-creator' || name === 'pro_creator'">
      <!-- Coronet Body with 5 tiered peaks -->
      <path d="M3.5 17 4.5 7.5 8.5 12 12 4.5 15.5 12 19.5 7.5 20.5 17H3.5Z" stroke-linejoin="round" />
      <path v-if="duotone" d="M3.5 17 4.5 7.5 8.5 12 12 4.5 15.5 12 19.5 7.5 20.5 17H3.5Z" fill="currentColor" fill-opacity="0.18" stroke="none" />
      <!-- Center Velvet Diamond Inset -->
      <polygon v-if="duotone" points="12,4.5 14,12 12,17 10,12" fill="currentColor" fill-opacity="0.32" stroke="none" />
      <!-- Peak Orbs -->
      <circle cx="12" cy="4.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <!-- Imperial Base Band with Inset Jewels -->
      <rect x="3" y="17" width="18" height="3" rx="1" />
      <circle cx="7" cy="18.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="12" cy="18.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17" cy="18.5" r="0.75" fill="currentColor" stroke="none" />
    </g>

    <!-- Medal (Medali: Prestigious Creator Award with V-Ribbon & Radiant Star Medallion) -->
    <g v-else-if="name === 'medal' || name === 'medali'">
      <!-- Ribbon Left Strip -->
      <path d="M7 2.5h4l1.5 6-2 1.5-4-6.5a1 1 0 0 1 .5-1Z" :fill="duotone ? 'currentColor' : 'none'" :fill-opacity="duotone ? '0.22' : '0'" />
      <!-- Ribbon Right Strip -->
      <path d="M17 2.5h-4l-1.5 6 2 1.5 4-6.5a1 1 0 0 0-.5-1Z" :fill="duotone ? 'currentColor' : 'none'" :fill-opacity="duotone ? '0.14' : '0'" />
      <!-- Ribbon Contour Lines -->
      <path d="m6.5 2.5 5.5 9 5.5-9" />
      <!-- Medallion Coin Outer Ring -->
      <circle cx="12" cy="15" r="6.5" />
      <circle v-if="duotone" cx="12" cy="15" r="5" fill="currentColor" fill-opacity="0.25" stroke="none" />
      <!-- Center Star Core -->
      <polygon points="12,11.8 13.1,14.2 15.6,14.5 13.8,16.2 14.3,18.6 12,17.4 9.7,18.6 10.2,16.2 8.4,14.5 10.9,14.2" fill="currentColor" stroke="none" />
    </g>

    <!-- Rocket / Scale (Business Scale: Supersonic Scaling Rocket with Stabilizer Fins & Cockpit Core) -->
    <g v-else-if="name === 'rocket' || name === 'scale' || name === 'business' || name === 'enterprise' || name === 'plan-business' || name === 'plan-enterprise' || name === 'launch'">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" opacity="0.5" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" opacity="0.5" />
      <circle v-if="duotone" cx="15" cy="9" r="1.5" fill="currentColor" />
    </g>

    <!-- Bolt (Kinetic Energy Bolt with Dual-Facet Depth & Power Core) -->
    <g v-else-if="name === 'bolt' || name === 'zap' || name === 'lightning' || name === 'flash'">
      <!-- Outer Contour -->
      <polygon points="13,2 4.5,12.5 11,12.5 8.5,22 19.5,10.5 13,10.5" stroke-linejoin="round" />
      <!-- Left Shaded Facet -->
      <polygon v-if="duotone" points="13,2 4.5,12.5 11,12.5 11.5,11.5" fill="currentColor" fill-opacity="0.22" stroke="none" />
      <!-- Right Vibrant Energy Facet -->
      <polygon v-if="duotone" points="13,2 11.5,11.5 8.5,22 19.5,10.5 13,10.5" fill="currentColor" fill-opacity="0.45" stroke="none" />
      <!-- Central Chiseled Spine -->
      <path d="M13 2 11.5 11.5 8.5 22" opacity="0.45" stroke-linecap="round" />
    </g>

    <!-- Diamond (Basic: Brilliant-Cut Gem with Geometric Facets and Radiant Refraction) -->
    <g v-else-if="name === 'diamond' || name === 'basic' || name === 'plan-basic' || name === 'gem'">
      <!-- Outer Contour -->
      <polygon points="6,3.5 18,3.5 22,9.5 12,21 2,9.5" stroke-linejoin="round" />
      <!-- Girdle Line -->
      <line x1="2" y1="9.5" x2="22" y2="9.5" />
      <!-- Crown & Pavilion Facet Ribs -->
      <polyline points="7.5,3.5 10,9.5 12,21" />
      <polyline points="16.5,3.5 14,9.5 12,21" />
      <!-- Table Facet Tint -->
      <polygon v-if="duotone" points="7.5,3.5 16.5,3.5 14,9.5 10,9.5" fill="currentColor" fill-opacity="0.2" stroke="none" />
      <!-- Pavilion Center Refraction -->
      <polygon v-if="duotone" points="10,9.5 14,9.5 12,21" fill="currentColor" fill-opacity="0.32" stroke="none" />
    </g>

    <!-- Sprout (Starter / Free: Organic Growth Seedling with Vascular Leaf Facets & Fertile Seed Base) -->
    <g v-else-if="name === 'sprout' || name === 'free' || name === 'starter' || name === 'plan-free' || name === 'seed'">
      <!-- Central Stem -->
      <path d="M12 21V10" />
      <!-- Primary Cotyledon Leaf -->
      <path d="M12 10C12 5.5 7.5 3 3 3v3c0 4.5 4.5 6 9 6" stroke-linejoin="round" />
      <!-- Secondary Budding Leaf -->
      <path d="M12 13c3.5-3.5 8-3.5 9-1 0 4-4.5 6-9 4" stroke-linejoin="round" />
      <!-- Duotone Leaf Fills -->
      <path v-if="duotone" d="M12 10C12 5.5 7.5 3 3 3v3c0 4.5 4.5 6 9 6Z" fill="currentColor" fill-opacity="0.22" stroke="none" />
      <path v-if="duotone" d="M12 13c3.5-3.5 8-3.5 9-1 0 4-4.5 6-9 4Z" fill="currentColor" fill-opacity="0.16" stroke="none" />
      <!-- Grounding Seed Base -->
      <ellipse cx="12" cy="21" rx="2.5" ry="1" fill="currentColor" fill-opacity="0.3" stroke="none" />
    </g>

    <!-- ================= 5. ACTIONS & UTILITIES ================= -->

    <!-- Settings / Gear: Mechanical precision gear -->
    <g v-else-if="name === 'settings' || name === 'gear'">
      <circle cx="12" cy="12" r="3" :fill="duotone ? 'currentColor' : 'none'" :fill-opacity="duotone ? '0.2' : '0'" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </g>

    <!-- Copy: Dual layered sheets -->
    <g v-else-if="name === 'copy'">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </g>

    <!-- External Link / Arrow up-right -->
    <g v-else-if="name === 'external' || name === 'external-link'">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </g>

    <!-- Arrow Right -->
    <g v-else-if="name === 'arrow-right'">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </g>

    <!-- Arrow Left / Back -->
    <g v-else-if="name === 'arrow-left' || name === 'back'">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </g>

    <!-- Globe / Web / Domain -->
    <g v-else-if="name === 'globe' || name === 'web' || name === 'domain'">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15 15 0 0 0 0 20M12 2a15 15 0 0 1 0 20M2 12h20" />
    </g>

    <!-- Save: Diskette checkmark -->
    <g v-else-if="name === 'save'">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
      <path v-if="duotone" d="m9 17 2 2 4-4" stroke-width="1.8" />
    </g>

    <!-- Plus / Tambah -->
    <g v-else-if="name === 'plus' || name === 'add'">
      <path d="M12 5v14M5 12h14" />
      <circle v-if="duotone" cx="12" cy="12" r="1.5" fill="currentColor" />
    </g>

    <!-- Help / Bantuan / FAQ -->
    <g v-else-if="name === 'help' || name === 'bantuan' || name === 'faq' || name === 'support'">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2.5" />
      <circle v-if="duotone" cx="12" cy="12" r="5" stroke-dasharray="2 3" opacity="0.3" />
    </g>

    <!-- Info / Information (replacing ℹ️) -->
    <g v-else-if="name === 'info'">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2.5" />
      <circle v-if="duotone" cx="12" cy="12" r="5" stroke-dasharray="2 3" opacity="0.3" />
    </g>

    <!-- Gallery / Photo / Media Image -->
    <g v-else-if="name === 'gallery' || name === 'image' || name === 'photo'">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <path d="m21 15-5-5L5 21" />
      <path v-if="duotone" d="m14 14 2.5-2.5 4.5 4.5" opacity="0.4" />
    </g>

    <!-- Upload / Folder -->
    <g v-else-if="name === 'upload'">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </g>

    <!-- Camera -->
    <g v-else-if="name === 'camera'">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
      <circle v-if="duotone" cx="12" cy="13" r="1.5" fill="currentColor" />
    </g>

    <!-- User / Profile Avatar -->
    <g v-else-if="name === 'user' || name === 'avatar'">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <circle v-if="duotone" cx="12" cy="7" r="1.5" fill="currentColor" opacity="0.4" />
    </g>

    <!-- Link / Tautan -->
    <g v-else-if="name === 'link' || name === 'tautan'">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </g>

    <!-- Share / Bagikan -->
    <g v-else-if="name === 'share' || name === 'bagikan'">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </g>

    <!-- Warning / Alert -->
    <g v-else-if="name === 'warning' || name === 'alert'">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2.5" />
    </g>

    <!-- Filter -->
    <g v-else-if="name === 'filter'">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </g>

    <!-- Chevrons -->
    <g v-else-if="name === 'chevron-down'">
      <polyline points="6 9 12 15 18 9" />
    </g>
    <g v-else-if="name === 'chevron-up'">
      <polyline points="18 15 12 9 6 15" />
    </g>
    <g v-else-if="name === 'chevron-left'">
      <polyline points="15 18 9 12 15 6" />
    </g>
    <g v-else-if="name === 'chevron-right'">
      <polyline points="9 18 15 12 9 6" />
    </g>

    <!-- Eye / Eye-Off -->
    <g v-else-if="name === 'eye'">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </g>
    <g v-else-if="name === 'eye-off'">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </g>

    <!-- Bell / Announcement Notification -->
    <g v-else-if="name === 'bell'">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <circle v-if="duotone" cx="12" cy="8" r="1.5" fill="currentColor" />
    </g>

    <!-- Logout / Keluar -->
    <g v-else-if="name === 'logout' || name === 'exit'">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </g>

    <!-- Spinner: Crisp circular loading indicator -->
    <g v-else-if="name === 'spinner' || name === 'loading' || name === 'loader' || name === 'loader-2' || name === 'loader2'">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </g>

    <!-- Search / Cari: Precision optic lens with subtle interior aperture -->
    <g v-else-if="name === 'search' || name === 'cari'">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
      <path v-if="duotone" d="M8.5 8.5a3.5 3.5 0 0 1 4.5 0" stroke-width="1.2" opacity="0.45" />
    </g>

    <!-- Spacer / Divider / Separator -->
    <g v-else-if="name === 'spacer' || name === 'divider' || name === 'separator'">
      <line x1="3" y1="12" x2="21" y2="12" />
      <polyline points="8 8 12 4 16 8" />
      <polyline points="16 16 12 20 8 16" />
    </g>

    <!-- Carousel / 3-Card Horizontal Scroll / Gallery -->
    <g v-else-if="name === 'carousel' || name === 'scroll' || name === 'gallery-horizontal' || name === 'cards-scroll'">
      <path d="M2 3v18" />
      <rect width="12" height="18" x="6" y="3" rx="2" />
      <path d="M22 3v18" />
    </g>

    <!-- Refresh / Sync (replacing 🔄) -->
    <g v-else-if="name === 'refresh' || name === 'sync' || name === 'refresh-cw' || name === 'rotate-ccw'">
      <path d="M3 12a9 9 0 0 1 15.5-6.36L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.36L3 16M3 21v-5h5" />
    </g>

    <!-- Reschedule / Jadwal Ulang: Dynamic clock within cyclic synchronization loop (custom icon replacing 🔄) -->
    <g v-else-if="name === 'reschedule' || name === 'jadwal-ulang' || name === 'rescheduled'">
      <path d="M3 12a9 9 0 0 1 15.5-6.36L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.36L3 16M3 21v-5h5" />
      <path d="M12 7.5v4.5l3 2" :stroke-width="Number(strokeWidth) - 0.25" />
      <circle v-if="duotone" cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </g>

    <!-- Receipt / Invoice (replacing 🧾) -->
    <g v-else-if="name === 'receipt' || name === 'invoice'">
      <path d="M4 2v20l2.5-1.5L9 22l2.5-1.5L14 22l2.5-1.5 3.5 1.5V2H4Z" />
      <line x1="8" y1="7" x2="16" y2="7" opacity="0.6" />
      <line x1="8" y1="11" x2="16" y2="11" opacity="0.6" />
      <line x1="8" y1="15" x2="12" y2="15" opacity="0.6" />
    </g>

    <!-- Credit Card / Card (replacing 💳) -->
    <g v-else-if="name === 'card' || name === 'credit-card'">
      <rect x="2" y="5" width="20" height="14" rx="2.5" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <rect v-if="duotone" x="5" y="14" width="3.5" height="2.5" rx=".5" fill="currentColor" fill-opacity="0.25" stroke="none" />
      <line x1="12" y1="15" x2="16" y2="15" opacity="0.6" />
    </g>

    <!-- Alert / Warning (replacing ⚠️) -->
    <g v-else-if="name === 'alert' || name === 'warning' || name === 'alert-circle' || name === 'alert-triangle'">
      <path d="m10.29 3.86-8.6 15A2 2 0 0 0 3.43 22h17.14a2 2 0 0 0 1.74-3.14l-8.6-15a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2.5" />
    </g>

    <!-- Trash / Delete (replacing 🗑️) -->
    <g v-else-if="name === 'trash' || name === 'delete' || name === 'trash-2' || name === 'trash2'">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </g>

    <!-- Download (replacing 📥) -->
    <g v-else-if="name === 'download'">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </g>

    <!-- Check / Success (replacing ✓ / ✅) -->
    <g v-else-if="name === 'check' || name === 'success'">
      <path d="m5 12 5 5L20 7" />
    </g>

    <!-- X / Close (replacing ✕ / ❌) -->
    <g v-else-if="name === 'x' || name === 'close'">
      <path d="M18 6 6 18M6 6l12 12" />
    </g>

    <!-- Trophy / Top Performer (replacing 🏆) -->
    <g v-else-if="name === 'trophy'">
      <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
      <path d="M6 3h12v7a6 6 0 0 1-12 0V3ZM12 16v3M8 21h8" />
      <path v-if="duotone" d="M12 6v4" opacity="0.4" />
    </g>

    <!-- Lightbulb / Insight / Tip -->
    <g v-else-if="name === 'lightbulb' || name === 'tip'">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4.5 12.3c.9.8 1.5 2 1.5 3.2h6c0-1.2.6-2.4 1.5-3.2A7 7 0 0 0 12 2Z" />
    </g>

    <!-- Calendar (replacing 📅 / 🗓️) -->
    <g v-else-if="name === 'calendar'">
      <rect x="3" y="4" width="18" height="18" rx="2.5" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <circle v-if="duotone" cx="12" cy="15" r="1.5" fill="currentColor" />
    </g>

    <!-- Clipboard / Document (replacing 📋) -->
    <g v-else-if="name === 'clipboard'">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1Z" />
      <path v-if="duotone" d="M9 11h6M9 15h4" opacity="0.45" stroke-width="1.5" />
    </g>

    <!-- Edit / Pencil (replacing ✏️) -->
    <g v-else-if="name === 'edit' || name === 'pencil' || name === 'ubah'">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
      <path v-if="duotone" d="m15 5 4 4" opacity="0.4" />
    </g>

    <!-- Sparkles / Magic / AI (replacing ✨) -->
    <g v-else-if="name === 'sparkles' || name === 'spark' || name === 'magic' || name === 'ai'">
      <path d="m12 3 1.9 4.7L18.5 9.5l-4.6 1.8L12 16l-1.9-4.7L5.5 9.5l4.6-1.8L12 3Z" />
      <path v-if="duotone" d="m12 3 1.9 4.7L18.5 9.5l-4.6 1.8L12 16l-1.9-4.7L5.5 9.5l4.6-1.8L12 3Z" fill="currentColor" fill-opacity="0.22" stroke="none" />
      <path d="m19 15 .8 1.8 1.7.7-1.7.7-.8 1.8-.8-1.8-1.7-.7 1.7-.7.8-1.8Z" />
    </g>

    <!-- Star / Favorite / Populer (replacing ⭐) -->
    <g v-else-if="name === 'star' || name === 'populer'">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      <polygon v-if="duotone" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 12 2" fill="currentColor" fill-opacity="0.3" stroke="none" />
    </g>

    <!-- Lock / Security (replacing 🔒) -->
    <g v-else-if="name === 'lock' || name === 'security'">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle v-if="duotone" cx="12" cy="16" r="1.5" fill="currentColor" />
    </g>

    <!-- Key / Credential (replacing 🔑) -->
    <g v-else-if="name === 'key'">
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m11 12 9.5-9.5M16 7l2.5 2.5M18.5 4.5l2.5 2.5" />
      <circle v-if="duotone" cx="7.5" cy="15.5" r="1.5" fill="currentColor" />
    </g>

    <!-- Shield / Protection / MFA (replacing 🛡️) -->
    <g v-else-if="name === 'shield' || name === 'protect'">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path v-if="duotone" d="M12 3.2 5 6v6c0 5 5.5 8.5 7 9.5V3.2z" fill="currentColor" fill-opacity="0.2" stroke="none" />
    </g>

    <!-- Smartphone / Mobile / OTP (replacing 📲) -->
    <g v-else-if="name === 'smartphone' || name === 'mobile' || name === 'otp'">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <!-- Mail / Email (replacing ✉️ / 📧) -->
    <g v-else-if="name === 'mail' || name === 'email'">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
      <path v-if="duotone" d="M3 5l9 6 9-6v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z" fill="currentColor" fill-opacity="0.12" stroke="none" />
    </g>

    <!-- Phone / WhatsApp (replacing 📱 / 📞 / 💬) -->
    <g v-else-if="name === 'phone' || name === 'whatsapp'">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </g>

    <!-- Chat / Message / Support (replacing 💬) -->
    <g v-else-if="name === 'chat' || name === 'message' || name === 'support' || name === 'message-square'">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path v-if="duotone" d="M8 12h8M8 9h5" stroke-width="1.5" opacity="0.4" />
    </g>

    <!-- Bank / Financial Institution (replacing 🏛️) -->
    <g v-else-if="name === 'bank' || name === 'building' || name === 'landmark'">
      <path d="m3 9 9-5 9 5v2H3V9zM4 11v8M8 11v8M12 11v8M16 11v8M20 11v8M2 19h20v3H2v-3z" />
      <polygon v-if="duotone" points="12 4 3 9 21 9 12 4" fill="currentColor" fill-opacity="0.2" stroke="none" />
    </g>

    <!-- Clock / Time (replacing ⏰ / ⏳) -->
    <g v-else-if="name === 'clock' || name === 'time'">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </g>

    <!-- Infinity / Unlimited / Semua Waktu (replacing ♾️) -->
    <g v-else-if="name === 'infinity' || name === 'unlimited'">
      <path d="M12 12c-2-2.67-4-4-6.5-4a4.5 4.5 0 1 0 0 9c2.5 0 4.5-1.33 6.5-4 2 2.67 4 4 6.5 4a4.5 4.5 0 1 0 0-9c-2.5 0-4.5 1.33-6.5 4Z" />
      <path v-if="duotone" d="M5.5 10a2 2 0 0 0 0 4c1.2 0 2.2-.7 3.5-2-1.3-1.3-2.3-2-3.5-2Z" fill="currentColor" fill-opacity="0.25" stroke="none" />
      <path v-if="duotone" d="M18.5 10c-1.2 0-2.2.7-3.5 2 1.3 1.3 2.3 2 3.5 2a2 2 0 0 0 0-4Z" fill="currentColor" fill-opacity="0.25" stroke="none" />
    </g>

    <!-- Laptop / Digital (replacing 💻) -->
    <g v-else-if="name === 'laptop' || name === 'digital'">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M2 18h20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1Z" />
      <path v-if="duotone" d="M6 7h12v6H6z" fill="currentColor" fill-opacity="0.18" stroke="none" />
    </g>

    <!-- Briefcase / Service & Project (replacing 💼) -->
    <g v-else-if="name === 'briefcase' || name === 'service'">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2 12h20" />
      <path v-if="duotone" d="M10 11h4v2h-4z" fill="currentColor" fill-opacity="0.3" stroke="none" />
    </g>

    <!-- Graduation Cap / Course (replacing 🎓) -->
    <g v-else-if="name === 'graduation' || name === 'course'">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12.5V17c0 2.5 3 4 6 4s6-1.5 6-4v-4.5" />
      <line x1="22" y1="10" x2="22" y2="16" />
      <circle v-if="duotone" cx="12" cy="10" r="1.5" fill="currentColor" />
    </g>

    <!-- Mentoring / Coaching (replacing 📅 / 👥) -->
    <g v-else-if="name === 'mentoring'">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </g>

    <!-- Sort Ascending / Descending (replacing 🔤 / 💰 / 🏷️) -->
    <g v-else-if="name === 'sort-asc'">
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
      <path d="M15 4h5M15 8h3M15 12h1" />
    </g>
    <g v-else-if="name === 'sort-desc'">
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="M15 4h5M15 8h3M15 12h1" />
    </g>

    <!-- Percent / Discount (replacing 📊 / %) -->
    <g v-else-if="name === 'percent' || name === 'discount'">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
      <circle v-if="duotone" cx="6.5" cy="6.5" r="1" fill="currentColor" />
      <circle v-if="duotone" cx="17.5" cy="17.5" r="1" fill="currentColor" />
    </g>

    <!-- Meta / Facebook (replacing 📘) -->
    <g v-else-if="name === 'meta' || name === 'facebook'">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </g>

    <!-- Video / Play / Media (replacing 🎵 / ▶️) -->
    <g v-else-if="name === 'video' || name === 'play' || name === 'tiktok'">
      <polygon points="5 3 19 12 5 21 5 3" />
      <polygon v-if="duotone" points="5 3 19 12 5 21 5 3" fill="currentColor" fill-opacity="0.15" stroke="none" />
    </g>
    <g v-else-if="name === 'pause'">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </g>

    <!-- Server / Gateway / Plug (replacing 🔌 / ⚙️) -->
    <g v-else-if="name === 'server' || name === 'gateway' || name === 'plug'">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" stroke-width="2.5" />
      <line x1="6" y1="18" x2="6.01" y2="18" stroke-width="2.5" />
    </g>

    <!-- Eye Slash / Hide Password (replacing 🙈) -->
    <g v-else-if="name === 'eye-slash' || name === 'hide'">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </g>

    <!-- Invoice / Receipt / Bill (replacing 🧾 / 📑) -->
    <g v-else-if="name === 'invoice' || name === 'receipt'">
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="16" y2="11" />
      <line x1="8" y1="15" x2="12" y2="15" />
    </g>

    <!-- Gift / Bundle (replacing 🎁) -->
    <g v-else-if="name === 'gift' || name === 'bundle' || name === 'kado'">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </g>

    <!-- Truck / Shipping / Delivery (replacing 🚚) -->
    <g v-else-if="name === 'truck' || name === 'shipping' || name === 'delivery' || name === 'kurir'">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </g>

    <!-- Heart (replacing 💝 / ❤️) -->
    <g v-else-if="name === 'heart' || name === 'cinta'">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </g>

    <!-- Shopping Bag / Cart / Pembeli (replacing 🛍️ / 🛒) -->
    <g v-else-if="name === 'cart' || name === 'bag' || name === 'shopping-bag' || name === 'keranjang'">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </g>

    <!-- ================= 8. AI PROVIDER LOGOS ================= -->

    <!-- Google Gemini: 4-pointed radiant stellar star with curved facets -->
    <g v-else-if="name === 'gemini'">
      <path d="M12 2C12 7.52 7.52 12 2 12c5.48 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10Z" stroke-linejoin="round" />
      <path v-if="duotone" d="M12 2C12 7.52 7.52 12 2 12c5.48 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10Z" fill="currentColor" fill-opacity="0.22" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </g>

    <!-- OpenAI: Geometric rosette whorl -->
    <g v-else-if="name === 'openai' || name === 'chatgpt'">
      <path d="M19.2 9.3a4.5 4.5 0 0 0-3.6-3.8 4.6 4.6 0 0 0-4.6 1.4L9.4 8.6a.7.7 0 0 1-.7 0L6 7A4.6 4.6 0 0 0 1.2 9.6a4.5 4.5 0 0 0 .9 5.2 4.6 4.6 0 0 0 4.6 1.5l2.7-.8a.7.7 0 0 1 .7 0l2.7 1.6a4.6 4.6 0 0 0 4.8-.4 4.5 4.5 0 0 0 1.3-4.7 4.6 4.6 0 0 0-2-3.8l-2.7-1.6" stroke-linejoin="round" />
      <circle v-if="duotone" cx="12" cy="12" r="2.5" fill="currentColor" fill-opacity="0.25" stroke="none" />
    </g>

    <!-- Groq: Ultra-fast LPU lightning glyph -->
    <g v-else-if="name === 'groq'">
      <path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2Z" stroke-linejoin="round" />
      <path v-if="duotone" d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2Z" fill="currentColor" fill-opacity="0.22" stroke="none" />
    </g>

    <!-- OpenRouter: Neural nexus mesh with orbiting router nodes -->
    <g v-else-if="name === 'openrouter'">
      <circle cx="12" cy="12" r="3" :fill="duotone ? 'currentColor' : 'none'" :fill-opacity="duotone ? '0.25' : '0'" />
      <circle cx="4" cy="7" r="2" />
      <circle cx="20" cy="7" r="2" />
      <circle cx="4" cy="17" r="2" />
      <circle cx="20" cy="17" r="2" />
      <path d="m6 8 4 3M18 8l-4 3M6 16l4-3M18 16l-4-3M12 4v5M12 15v5" />
    </g>

    <!-- DeepSeek: Aquatic dorsal fin leaping across neural wave -->
    <g v-else-if="name === 'deepseek'">
      <path d="M3 16c3-1.5 6-1.5 9 0s6 1.5 9 0" />
      <path d="M5 14c2-5 6.5-9 12-10-1.5 4-.5 8.5 2 11" stroke-linejoin="round" />
      <path v-if="duotone" d="M5 14c2-5 6.5-9 12-10-1.5 4-.5 8.5 2 11-4.5 1-9.5 0-14-1Z" fill="currentColor" fill-opacity="0.2" stroke="none" />
      <circle cx="13" cy="8.5" r="1" fill="currentColor" stroke="none" />
    </g>

    <!-- Mistral AI: Stepped wind chevrons -->
    <g v-else-if="name === 'mistral'">
      <rect x="3" y="4" width="5" height="4" rx="1" fill="currentColor" />
      <rect x="16" y="4" width="5" height="4" rx="1" fill="currentColor" />
      <rect x="3" y="10" width="18" height="4" rx="1" fill="currentColor" fill-opacity="0.8" />
      <rect x="6" y="16" width="12" height="4" rx="1" fill="currentColor" fill-opacity="0.6" />
    </g>

    <!-- Anthropic Claude: Symmetric 8-ray geometric radiance mark -->
    <g v-else-if="name === 'anthropic' || name === 'claude'">
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93" stroke-width="2.2" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </g>

    <!-- Palette / Art / Creative -->
    <g v-else-if="name === 'palette' || name === 'art' || name === 'design'">
      <circle cx="13.5" cy="6.5" r=".7" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r=".7" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="7.5" r=".7" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="12.5" r=".7" fill="currentColor" stroke="none" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2Z" />
    </g>

    <!-- Music / Audio -->
    <g v-else-if="name === 'music' || name === 'audio'">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </g>

    <!-- Code / Terminal / Developer -->
    <g v-else-if="name === 'code' || name === 'terminal' || name === 'dev'">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </g>

    <!-- Heart / Wellness / Health -->
    <g v-else-if="name === 'heart' || name === 'health' || name === 'wellness'">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </g>

    <!-- Utensils / Culinary / Food -->
    <g v-else-if="name === 'utensils' || name === 'culinary' || name === 'food'">
      <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
      <path d="M15 2v18" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z" />
    </g>

    <!-- Ollama: Stylized llama silhouette head -->
    <g v-else-if="name === 'ollama'">
      <path d="M8 3v4M12 3v4" />
      <path d="M6 7h8a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-2v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a5 5 0 0 1 5-5Z" stroke-linejoin="round" />
      <circle cx="14" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <path v-if="duotone" d="M6 7h8a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-2v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a5 5 0 0 1 5-5Z" fill="currentColor" fill-opacity="0.18" stroke="none" />
    </g>

    <!-- Bot / Robot / Custom AI Endpoint -->
    <g v-else-if="name === 'bot' || name === 'robot' || name === 'custom-ai'">
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 2v6M9 2h6M2 14h2M20 14h2" />
      <circle cx="9" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <path d="M9 17h6" />
      <path v-if="duotone" d="M4 11h16v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6Z" fill="currentColor" fill-opacity="0.18" stroke="none" />
    </g>

    <!-- Menu / Hamburger -->
    <g v-else-if="name === 'menu' || name === 'hamburger'">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </g>

    <!-- Grid / Matrix / Layout Grid -->
    <g v-else-if="name === 'grid' || name === 'layout-grid' || name === 'matrix'">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect v-if="duotone" x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" fill-opacity="0.15" stroke="none" />
      <rect v-if="duotone" x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" fill-opacity="0.15" stroke="none" />
    </g>

    <!-- List / Table -->
    <g v-else-if="name === 'list' || name === 'table'">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" stroke-width="2.5" />
      <line x1="3" y1="12" x2="3.01" y2="12" stroke-width="2.5" />
      <line x1="3" y1="18" x2="3.01" y2="18" stroke-width="2.5" />
    </g>

    <!-- Unlock / Open Lock -->
    <g v-else-if="name === 'unlock'">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V6a4 4 0 0 1 8 0" />
      <circle v-if="duotone" cx="12" cy="16" r="1.5" fill="currentColor" />
    </g>

    <!-- Book / Book Open -->
    <g v-else-if="name === 'book' || name === 'book-open'">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      <path v-if="duotone" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="currentColor" fill-opacity="0.15" stroke="none" />
    </g>

    <!-- QR Code -->
    <g v-else-if="name === 'qrcode' || name === 'qr'">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="15" width="6" height="6" rx="1" />
      <path d="M15 15h2v2h-2zM19 15h2v2h-2zM15 19h2v2h-2zM19 19h2v2h-2zM6 6h.01M18 6h.01M6 18h.01" stroke-width="2.5" />
    </g>

    <!-- Sliders / Settings Adjust -->
    <g v-else-if="name === 'sliders' || name === 'sliders-horizontal'">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </g>

    <!-- CPU / AI Chip -->
    <g v-else-if="name === 'cpu' || name === 'chip'">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" :fill="duotone ? 'currentColor' : 'none'" :fill-opacity="duotone ? '0.2' : '0'" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </g>

    <!-- Ban / Block -->
    <g v-else-if="name === 'ban' || name === 'block'">
      <circle cx="12" cy="12" r="9" />
      <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
    </g>

    <!-- Badge Check / Verified -->
    <g v-else-if="name === 'badge-check' || name === 'verified'">
      <path d="M12 2l2.4 2.2 3.2-.4 1.2 3 2.8 1.6-1 3.1 1.6 2.8-2.6 1.9-.2 3.2-3.2.8L15 22.5 12 21.2 9 22.5l-1.2-2.3-3.2-.8-.2-3.2L1.8 14.3l1.6-2.8-1-3.1 2.8-1.6 1.2-3 3.2.4L12 2z" />
      <path d="m9 12 2 2 4-4" stroke-width="2" />
    </g>

    <!-- Layers -->
    <g v-else-if="name === 'layers'">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
      <polygon v-if="duotone" points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fill-opacity="0.18" stroke="none" />
    </g>

    <!-- Hard Drive / Storage -->
    <g v-else-if="name === 'hard-drive' || name === 'storage'">
      <line x1="22" y1="12" x2="2" y2="12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" y1="16" x2="6.01" y2="16" stroke-width="2.5" />
      <line x1="10" y1="16" x2="10.01" y2="16" stroke-width="2.5" />
    </g>

    <!-- Radio / Broadcast -->
    <g v-else-if="name === 'radio' || name === 'broadcast'">
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14" />
    </g>

    <!-- Send / Plane -->
    <g v-else-if="name === 'send'">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
      <polygon v-if="duotone" points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" fill-opacity="0.15" stroke="none" />
    </g>

    <!-- Alignments -->
    <g v-else-if="name === 'align-left'">
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="15" y1="12" x2="3" y2="12" />
      <line x1="17" y1="18" x2="3" y2="18" />
    </g>
    <g v-else-if="name === 'align-center'">
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="17" y1="12" x2="7" y2="12" />
      <line x1="19" y1="18" x2="5" y2="18" />
    </g>
    <g v-else-if="name === 'align-right'">
      <line x1="21" y1="6" x2="3" y2="6" />
      <line x1="21" y1="12" x2="9" y2="12" />
      <line x1="21" y1="18" x2="7" y2="18" />
    </g>
    <g v-else-if="name === 'check-circle' || name === 'check-circle-2'">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 5-5" />
      <circle v-if="duotone" cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.1" stroke="none" />
    </g>
    <g v-else-if="name === 'shield-alert'">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2.5" />
    </g>
    <g v-else-if="name === 'shield-check'">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
      <path v-if="duotone" d="M12 3.2 5 6v6c0 5 5.5 8.5 7 9.5V3.2z" fill="currentColor" fill-opacity="0.15" stroke="none" />
    </g>
    <g v-else-if="name === 'user-check'">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </g>
    <g v-else-if="name === 'scroll-text' || name === 'scroll'">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M15 8h-5M15 12h-5" opacity="0.6" />
    </g>
    <g v-else-if="name === 'badge-dollar-sign' || name === 'badge-dollar'">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="M12 7v10" />
      <path d="M14.5 9.5a2.5 2.5 0 0 0-5 0c0 2.5 5 1.5 5 4a2.5 2.5 0 0 1-5 0" />
    </g>
    <g v-else-if="name === 'shopping-cart'">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </g>

    <!-- Default Fallback: Generic Dot -->
    <g v-else>
      <circle cx="12" cy="12" r="6" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
  strokeWidth?: number | string
  duotone?: boolean
  viewBox?: string
}>(), {
  size: '',
  strokeWidth: 1.75,
  duotone: true,
  viewBox: '0 0 24 24'
})

const sizeClasses: Record<string, string> = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  md: 'w-4.5 h-4.5',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6'
}

const computedClasses = computed(() => {
  const base = ['inline-block shrink-0 transition-colors']
  if (props.size && sizeClasses[props.size]) {
    base.push(sizeClasses[props.size])
  }
  return base.join(' ')
})
</script>

