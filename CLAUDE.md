# decorpu.com — Proje Rehberi (CLAUDE.md)

Poliüretan mimari dekorasyon ürünleri için **mimarlara yönelik B2B**, TR/EN, SEO-öncelikli site + (ileride) CRM. Tam vizyon: `docs/decorpu-master-plan.md`. Rakip/taksonomi analizi: `docs/research/competitor-analysis.md`.

## Stack (Haziran 2026 — kilitli)
- **Next.js 16.2** (App Router, Turbopack) · **React 19.2** · **TypeScript**
- **Tailwind CSS v4** (CSS-first, `@theme` token'ları — `src/app/globals.css`)
- **next-intl v4** (TR varsayılan/prefixsiz, EN `/en`) · **Motion** (`motion/react`, SVG line-art)
- **Supabase** (`@supabase/ssr`) — Faz 2 · **react-hook-form + zod**, **zustand** — Faz 2

## Komutlar
```bash
npm run dev      # geliştirme (Turbopack)
npm run build    # prod build + type-check
npm start        # prod sunucu
npm run lint     # eslint
```

## Mimari
```
src/
  app/[locale]/        layout.tsx (fontlar+provider+Header/Footer), page.tsx (anasayfa), ara/ (kod arama stub), not-found.tsx
  app/globals.css      tasarım token'ları ("Taş & Antrasit")
  components/
    ui/                Button (cva), Container
    site/              Header, Footer, Wordmark, CodeSearch, LocaleSwitcher, MobileMenu, Hero, CategoryGrid, nav.ts
    illustrations/     CategoryGlyph (18 bespoke line-art), HeroLineArt (draw-on-load), ScrollLine (draw-on-scroll)
  i18n/                routing.ts, request.ts, navigation.ts
  lib/                 utils.ts (cn), taxonomy.ts (18 kanonik kategori), supabase/ (client/server)
  proxy.ts             next-intl middleware (Next 16 'proxy.ts')
messages/              tr.json, en.json
tools/scraper/         Faz 0 araştırma scraper'ları (izole; app'e dahil değil)
docs/research/         manifest JSON'lar + analiz (assets/reference gitignore'da)
```

## Konvansiyonlar
- **i18n:** Metinler `messages/tr.json` + `en.json`'a; gezinme için `@/i18n/navigation`'dan `Link`/`useRouter` (next/link DEĞİL).
- **Tasarım tokenları:** `bg-bg/surface/ink/ink-soft/muted/accent`, `border-line/line-strong`, fontlar `font-display` (Fraunces), `font-sans` (Geist), `font-mono` (Geist Mono). Açık tema; ~3 renk disiplini.
- **Line-art = marka imzası:** Çizimler `.line-art` (currentColor stroke) + `.line-art-accent`. Stok ikon yok; ürün glyph'leri özel. "Yapay zeka gibi durmasın" şartı.
- **Kod:** Explicit tipli public API'ler, `interface` obje şekilleri için, `any` yok, immutability, çok-küçük-dosya. Üretim kodunda `console.log` yok (scraper'lar hariç).
- **Kategori verisi:** `src/lib/taxonomy.ts` (18 parent). Faz 2'de Supabase seed buradan + kartonpiyer KD kodlarından (`docs/research/kartonpiyer-manifest.json`, 206 kod).

## Kilitli kararlar (checkpoint)
1. Tasarım: "Taş & Antrasit" + Fraunces/Geist/Geist Mono.
2. IA: 18-parent kanonik ağaç (balustrade + yapıştırıcı/aksesuar dahil).
3. Görsel: Faz 1 görselsiz (line-art); gerçek görseller Faz 2 (kartonpiyer optimize + DWG + stüdyo). polure görselleri yalnız iç referans.
4. Fiyat yok → "teklif al" modeli.

## Faz durumu
- **Faz 0** ✅ Araştırma + scraper (polure 767 ürün metadata, kartonpiyer 945 görsel/206 KD kodu/2 Drive linki) + kanonik taksonomi.
- **Faz 1** ✅ Next.js 16 iskelet + tasarım sistemi + TR/EN + anasayfa (hero line-art, kategori grid, kod-arama, atölye, teklif CTA). Build yeşil, iki locale SSG.
- **Faz 2** ⏳ Supabase şema (master-plan §7) + seed, kategori/ürün sayfaları, pg_trgm kod arama, RFQ sepeti + form → leads + Resend, SEO (schema.org/sitemap/hreflang), analitik.
```
