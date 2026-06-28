# DecorPU — Proje Durum Özeti

> Son güncelleme: 2026-06-27 (gece, otonom oturum). Bu dosya projenin güncel durumunu, nasıl çalıştırılacağını ve sıradaki adımları özetler.

decorpu.com — poliüretan mimari dekorasyon, **mimarlara yönelik B2B**, TR/EN, SEO-öncelikli site + **Supabase tabanlı CMS/CRM**.

---

## 1. TEKNOLOJİ
- **Next.js 16.2** (App Router, Turbopack) · React 19.2 · TypeScript · **Tailwind v4**
- **next-intl v4** (TR varsayılan/prefixsiz, EN `/en`) · **Motion** (line-art/animasyon)
- **Supabase** (Postgres + Auth + Storage) · **@supabase/ssr**
- CMS UI: **Radix UI** (Dialog/Select/AlertDialog) · **Recharts** (grafikler) · **yet-another-react-lightbox** (galeri)

## 2. KOMUTLAR
```bash
npm run dev      # geliştirme (3000)
npm run build    # prod build + type-check
npm start        # prod sunucu (3000 kullan)
npm run lint     # eslint
```
Ortam değişkenleri `.env.local` içinde (Supabase URL + anon key) — hazır.

---

## 3. NE YAPILDI

### 3.1 Faz 0 — Araştırma & Veri (`docs/research/`)
- **Rakip analizi & kanonik taksonomi** (`competitor-analysis.md`): 18-parent kategori ağacı.
- **kartonpiyer scraper**: 945 görsel / 206 KD kodu / 2 Drive (katalog+DWG) linki (Mustafa'nın kendi ürünleri).
- **polure scraper** (Playwright): 767 ürün metadata + örnek görseller.
- **polure public API harvest** (`docs/research/polure-api/`): rakibin açık API'sinden **807 ürün + 83 kategori** → **`polure-catalog.xlsx`** (Ürünler/Kategoriler/Özet) + ham JSON. *(Yalnız iç analiz; yayımlanmaz.)*
- **İllüstrasyon/asset pipeline** (`tools/scraper/`): görseller WebP'ye optimize, `src/lib/catalog-images.ts` üretildi.

### 3.2 Public Site (anasayfa)
- **Marka**: "Decor" (siyah) + "PU" (kırmızı #E11B23), beyaz zemin, Fraunces/Geist fontlar.
- **Hero**: ortalanmış başlık + **otomatik dönen görsel slider** (6 gerçek interior fotoğraf, ~4 sn).
- **Referans şeridi**: hero altında demo logolar (Godiva, Ağaoğlu, Rixos, Demirören, Torunlar, NEF) — *gerçek logolar yazılı izinle eklenecek*.
- **Görselli kategori grid** (polure tarzı, polure ürün çekimleri — geçici placeholder).
- **Galeri + lightbox** (zoom, kaydır, hover aksiyonlar).
- **Projeler/Uygulamalar** (kartonpiyer gerçek montaj fotoğrafları).
- **Mega menü** (18 kategori + alt kategoriler), kod-arama kutusu, TR/EN, responsive.
- Routing route-group'lara ayrıldı: `app/[locale]/(site)` (public) · `(admin)` (CMS) · `(auth)` (giriş).

### 3.3 CMS / Admin Panel — `http://localhost:3000/admin`
**Supabase tabloları** (`public`): `categories` (32), `products` (10 örnek), `product_images`, `leads` (4 örnek). `pg_trgm` kod-arama, `moddatetime` trigger'ları.

**Admin sayfaları** (hepsi canlı Supabase'e bağlı, server actions ile CRUD):
- **Panel**: 6 istatistik kartı + 3 grafik (kategoriye göre ürün / talep durumları / son 14 gün).
- **Ürünler**: tablo + **canlı arama** + kategori/durum **filtreleri** + **pagination** (10/sayfa) + **modal ekle/düzenle** + **onaylı silme** + **Storage'a görsel yükleme**.
- **Kategoriler**: net ana/alt kart ağacı + satır içi "alt ekle" + modal düzenle + onaylı silme.
- **Talepler**: İletişim/Teklif Talebi (Türkçe terimler) + canlı arama + tür/durum filtre + durum güncelle + onaylı silme.
- UI: Radix modal/confirm/**stilli select** (native değil), minimal sade tasarım.

### 3.4 Güvenlik & Auth (CMS v3)
- **Supabase Auth** ile giriş: `/giris` (e-posta/şifre). `(admin)` layout korumalı — oturum yoksa `/giris`'e yönlendirir. Sidebar'da çıkış.
- **Session middleware**: `proxy.ts` next-intl + Supabase oturum yenilemeyi birlikte yapar.
- **RLS kilitlendi** (rol bazlı): katalog **herkese okuma**; `leads` **herkese ekleme** (public form) ama **sadece staff okuma/yönetme**; ürün/kategori/görsel **yazma = sadece authenticated**.
- **Storage**: `products` bucket (public read, authenticated write) — ürün görselleri buraya yüklenir.

**ADMIN GİRİŞ:**
- Kimlik bilgileri Supabase Auth üzerinde tutulur; bu dokümana **yazılmaz** (gizli).
- Erişim için proje sahibinden talep edin. *(Lansmandan önce şifreyi değiştirin / yeni kullanıcılar ekleyin.)*

---

## 4. ÖNEMLİ DOSYALAR
```
src/app/[locale]/(site)/      public anasayfa
src/app/[locale]/(admin)/admin/  CMS (page'ler) — korumalı
src/app/[locale]/(auth)/giris/   giriş
src/components/admin/         AdminSidebar, ProductsManager, CategoriesManager, LeadsManager, DashboardCharts, ProductForm, CategoryForm, LoginForm, ui/{Dialog,Select,ConfirmDelete}
src/lib/admin/               actions.ts (CRUD), auth.ts (signOut)
src/lib/supabase/            client.ts, server.ts, middleware.ts, types.ts
src/proxy.ts                 next-intl + Supabase session middleware
docs/research/               araştırma + polure-api/polure-catalog.xlsx
```

## 5. SUPABASE
- Project ref: `yrjjbbhcyyqjjcarwpak` · URL: `https://yrjjbbhcyyqjjcarwpak.supabase.co`
- Tablolar + RLS + Storage `products` bucket + admin user kuruldu.

---

## 6. SIRADAKİ ADIMLAR (Faz 2)
1. **Public siteyi Supabase'e bağla**: kategori/ürün sayfalarını DB'den üret (şu an statik/placeholder).
2. **RFQ + iletişim formu** → `leads` tablosuna yaz (+ Resend e-posta bildirimi).
3. **Kod arama** (pg_trgm RPC) → gerçek ürün sonuçları.
4. **SEO**: schema.org (Product), sitemap, hreflang, OG görselleri.
5. **Gerçek görseller**: kartonpiyer optimize + yeni stüdyo çekimleri (placeholder polure görsellerinin yerine).
6. **Referans izinleri** (Godiva/Ağaoğlu) → gerçek logolar.
7. **CMS**: çoklu kullanıcı/rol, ürün görsel galerisi (çoklu), toplu içe aktarma (polure-catalog.xlsx'ten seed).

## 7. NOTLAR
- `tools/scraper/` ve `docs/research/assets|reference` **gitignore'da** (büyük); manifest JSON + analiz MD'leri repoda kalır.
- Build **yeşil**, app lint **temiz** (uyarılar sadece scraper araçlarında).
- Auth + RLS + CRUD + görsel yükleme **uçtan uca test edildi** (giriş → ürün ekle/sil çalışıyor).
