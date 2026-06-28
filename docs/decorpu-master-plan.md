# DECORPU.COM — MASTER PLAN & BUILD ROADMAP
**Poliüretan mimari dekorasyon ürünleri · Proje bazlı imalat · B2B (mimarlar)**
İmalatçı: Mustafa Tiryaki · Proje lideri: (sen) · Domain: decorpu.com
Stack: Next.js + Supabase + Vercel · Diller: TR / EN

---

## 0. YÖNETİCİ ÖZETİ

Mustafa'nın mevcut siteleri (poluretan.com, kartonpiyerdeposu.com) SEO'da çok iyi sıralanıyor ama **marka algısı amatör**. Rakipler de aynı durumda: yüksek arama görünürlüğü + düşük profesyonellik. En gelişmiş Türk rakibi **polure.com** ürün kod sistemine (P1462, P5830 gibi) ve TR/EN yapıya sahip ama yine de mimara özel bir "tasarımdaki parçayı kodla bul → proje bazlı teklif al" akışı sunmuyor.

**decorpu'nun kazanma tezi:** Aynı (veya daha iyi) SEO gücünü koru + Orac seviyesinde profesyonel marka algısı + **mimara özel RFQ (teklif sepeti) akışı** + gerçek referans hikayeleri (Godiva, Ağaoğlu) + sağlam CRM. Rakiplerin hiçbirinde bu dördü bir arada yok.

---

## 1. REKABET ANALİZİ

### 1.1 Mustafa'nın siteleri — poluretan.com / kartonpiyerdeposu.com
**Teknik:** WordPress + kendi teması. Eski, ağır, mobil/Core Web Vitals zayıf.
**SEO neden iyi:** Yüksek keyword yoğunluğu, 81 il adının sayfalara serpiştirilmesi, kategori başına çok sayıda indekslenmiş ürün sayfası, domain yaşı, Instagram (kartonpiyerdeposu) + YouTube uygulama videoları ile destek.
**Neden amatör görünüyor:** İçerikler insan için değil arama motoru için yazılmış (aşırı tekrar), tasarım dili tutarsız, marka hikayesi yok, görsel hiyerarşi zayıf, referanslar/proje vakaları öne çıkmıyor.
**Kategoriler (mevcut envanter):** söve, sütun & başlık, kiriş, mertek, kütük, kartonpiyer, çıta/lambri, kemer, taç, göbek, kubbe, niş, panel, payanda, pencere söve, pilaster/plaster, şömine, süpürgelik, denizlik, prekast dış cephe.

### 1.2 polure.com — en güçlü Türk rakip (geçilecek hedef)
- **Ürün kod sistemi var:** P1462, P5830, P5840B, P2839… URL ve başlıklara gömülü. (Bizim "kod ile aratma" için birebir model.)
- TR/EN yapı (`/c/en/` ile İngilizce).
- Her ürün sayfasında SEO için kuyruk keyword listeleri.
- "450 yıl mukavemet" gibi laboratuvar/dayanıklılık iddiaları (pazarlama kancası).
- 3D tasarım hizmeti, uygulama galerileri, SEO blog içerikleri.
- Polyester & silikon kalıp imalatı vurgusu (özel proje yeteneği).
- **Eksiği:** Marka algısı hâlâ "katalog sitesi"; mimara özel toplu-teklif akışı ve güçlü vaka çalışmaları zayıf; UX dağınık.

### 1.3 Diğer Türk rakipler
- **poliuretandekorasyon.com** — geniş kategori ağacı, ürün sayıları yüksek (ör. çerçeve/pervaz 126 ürün). Klasik katalog yapısı.
- **poliuretankartonpiyer.com** — kategori + ürün sayısı odaklı, benzer SEO yapısı.
- Bu siteler bize **kategori derinliği ve ürün adedi** hedefini gösteriyor: ciddi görünmek için her kategoride yeterli sayıda iyi çekilmiş ürün gerekiyor.

### 1.4 oracdecor.com — global altın standart (taklit edilecek seviye)
- Net kategori navigasyonu: baseboards, crown moldings, wall moldings, 3D wall covering, lighting, decorative elements, adhesives & tools.
- Güçlü marka hikayesi ("Architectural elements, made for walls").
- **Tasarımcı işbirlikleri** (Roelfien Vos, Art Deco koleksiyonları) — bizim Godiva/Ağaoğlu eşdeğeri.
- "Unexpected Possibilities" ilham galerisi: kullanım alanına (Residential, Hospitality, Retail, Corporate) ve stile (Trendy/Timeless × Modern/Classic) göre filtrelenebilir.
- Profesyoneller için ayrı B2B bölümü, yapıştırıcı hesaplama aracı, çok dilli/çok ülkeli yapı, WebP optimize görseller.
- **Bizim çıkaracağımız ders:** Editöryel görsel dil + kullanım alanına göre ilham + B2B ayrımı + araç (kod arama/teklif) = premium algı.

### 1.5 Özet — fırsat haritası
| Yetenek | Mustafa eski | polure | orac | **decorpu hedef** |
|---|---|---|---|---|
| SEO gücü | Yüksek | Yüksek | Yüksek | **Yüksek (koru)** |
| Profesyonel marka | Düşük | Orta | Çok yüksek | **Çok yüksek** |
| Ürün kod arama | Yok | Var | Yok | **Var (gelişmiş)** |
| Mimara özel RFQ akışı | Yok | Zayıf | Yok | **Ana özellik** |
| Gerçek referans vakaları | Yok | Zayıf | Güçlü | **Güçlü (Godiva/Ağaoğlu)** |
| TR/EN | Kısmen | Var | Çok dilli | **Tam TR/EN** |
| CRM / satış ekibi | Yok | Yok | (kurumsal) | **Var (Supabase)** |
| Core Web Vitals | Zayıf | Orta | İyi | **İyi (Next.js SSG/ISR)** |

---

## 2. KONUMLANDIRMA & MARKA

**Tek cümle:** "Mimarın çizgisini imalata dönüştüren poliüretan mimari dekorasyon atölyesi."

**Konumlandırma sütunları:**
1. **Proje bazlı imalat** — sadece katalog satışı değil; mimarın tasarımındaki parçaları kodla eşleştirip projeye özel üretim. Premium ayrışma noktası.
2. **Mühendislik güveni** — yoğunluk/dayanıklılık verileri (polure'un "450 yıl" iddiası gibi ama dürüst ve test belgeli), uygulama kolaylığı, hafiflik (prekast betona alternatif).
3. **Referans kanıtı** — Godiva, Ağaoğlu vb. (yazılı izinle logo + vaka çalışması). E-E-A-T için kritik.
4. **Mimar dostu süreç:** tasarım → kodla parça eşleştirme → teklif sepeti → proje bazlı fiyat → imalat → montaj.

**Ton:** Sade, editöryel, kendinden emin. Aşırı sıfat yığını yok (rakiplerin hatası). Görsel öncelikli.

**İsim/kimlik kararları (kilitlenecek):** Marka adı "Decorpu", logo, renk paleti (öneri: nötr taş/krem + tek koyu vurgu + bir metalik aksан), tipografi (bir serif başlık + bir nötr sans gövde — mimari/editöryel his).

---

## 3. BİLGİ MİMARİSİ (IA)

### 3.1 Sayfa yapısı
- **Ana sayfa:** Hero banner → referans logoları (Godiva/Ağaoğlu…) → kategori grid → öne çıkan projeler → kod arama kutusu → kısa marka hikayesi → CTA (teklif al).
- **Kategoriler** (liste + her biri kendi sayfası, filtreli galeri).
- **Ürün/parça detay sayfası** (kod, görseller galeri, ölçüler, teknik özellik, "teklife ekle").
- **Projeler / Referanslar** (vaka çalışmaları; hangi kodlar kullanıldı).
- **Hakkımızda / Atölye** (marka hikayesi, üretim süreci, kapasite).
- **Uygulama & Montaj** (rehber içerik, SEO).
- **Blog / Rehberler** (SEO motoru).
- **İletişim / Teklif** (RFQ formu).
- **Teklif sepeti** (toplanan kodlar → tek formla gönder).
- Tüm sayfalar TR/EN.

### 3.2 Kategori taksonomisi (kanonik liste — slug'lar)
İç + dış cephe mimari profiller:
`sove` (jamb), `pencere-sove` (window jamb), `denizlik` (sill), `kartonpiyer` (cornice), `kat-silmesi` (string course), `sutun-baslik` (column & capital — Dor/İyon/Korint/Osmanlı), `pilaster` (pilaster), `kemer` (arch), `tac` (crown/pediment), `gobek` (ceiling rose), `kubbe` (dome), `nis` (niche), `cerceve-pervaz` (frame/architrave), `supurgelik` (skirting/baseboard), `cita-lambri` (wall moulding/panel strip), `panel-kaplama` (3D wall panel), `payanda` (bracket/corbel), `kiris` (beam), `mertek` (rafter), `kutuk` (faux log/timber), `somine` (fireplace surround), `aplik` (decorative element/light surround), `prekast-dis-cephe` (precast facade).
> Not: Her kategori için TR + EN ad, açıklama, SEO başlık/açıklama ve hero görseli olacak. Alt kategoriler `parent_id` ile (ör. sütun → başlık tipleri).

### 3.3 Ürün kod sistemi (kod ile aratma — ANA ÖZELLİK)
- Her ürün benzersiz **kod** taşır (ör. `DP-1462`, kategori öneki opsiyonel).
- Kod hem URL'de hem başlıkta hem şemada SKU olarak.
- Arama: tam eşleşme + bulanık (pg_trgm) — mimar tasarımdan kodu yazar, parçayı bulur.
- Kod araması her sayfada erişilebilir (header'da kalıcı arama kutusu).
- Mimar birden çok kodu **teklif sepetine** ekler → tek RFQ gönderir.

---

## 4. ÇEKİRDEK KULLANICI AKIŞLARI

### 4.1 Mimar RFQ akışı (en kritik — kimsede yok)
1. Mimar elindeki proje/tasarımdaki parça kodlarını siteye girer (kod arama).
2. Eşleşen parçaları görür, **"Teklife ekle"** ile listeye atar (sepet mantığı ama satış/ödeme yok).
3. Sepette kodlar + adetler + opsiyonel ölçü notları toplanır.
4. Tek formla gönderir (ad, firma, proje, e-posta, telefon, mesaj).
5. Kayıt `leads` tablosuna düşer (kodlar `product_codes` dizisi olarak) + satış ekibine e-posta bildirimi.
6. Satış ekibi CRM'den görür, projeye özel fiyat hazırlar, imalat başlar.

### 4.2 Keşif akışı (kategori → galeri → detay → teklif)
Kategori → filtre (stil, kullanım alanı, ölçü) → ürün galerisi → detay → teklife ekle.

### 4.3 İlham akışı (referans projeler)
Projeler → vaka çalışması → "bu projede kullanılan kodlar" → ilgili ürünlere link → teklife ekle.

---

## 5. ÖZELLİK LİSTESİ (önceliklendirilmiş)

**MVP (olmazsa olmaz):**
- TR/EN i18n
- Kategori + ürün detay sayfaları (Supabase'den)
- Kod arama (tam + bulanık)
- Teklif sepeti + RFQ formu → leads
- Ana sayfa: banner, referanslar, kategori grid, kod arama
- Temel SEO: metadata, Product/Breadcrumb şema, sitemap, robots, hreflang
- Görsel optimizasyonu (next/image + WebP/AVIF)
- Lead e-posta bildirimi
- GA4 + Search Console + Clarity entegrasyonu

**v2 (marka & içerik):**
- Marka hikayesi/Atölye sayfaları
- Referans/vaka çalışmaları (Godiva, Ağaoğlu)
- Filtrelenebilir ilham galerisi (kullanım alanı/stil)
- Blog/rehber motoru + ilk SEO makaleleri
- Tam bilingual içerik
- Uygulama/montaj rehberleri (+YouTube gömme)

**v3 (CRM/admin):**
- Supabase Auth (satış ekibi)
- Admin dashboard: lead gelen kutusu, atama, durum pipeline, aktivite logu
- Ürün/içerik yönetimi (başta Supabase Studio, sonra özel panel)
- Lead → teklif (quote) takibi, dışa aktarma

**v4 (ölçek & optimizasyon):**
- Tüm katalog migrasyonu
- Programatik SEO (ürün/kategori otomatik landing)
- Core Web Vitals ince ayar, CTA A/B testleri
- İhracat/EN pazarı (polyurethane cornice/moulding/column anahtarları)

---

## 6. TEKNİK MİMARİ

**Frontend:** Next.js 14+ (App Router), TypeScript, **Tailwind CSS**, shadcn/ui bileşenleri.
**Hosting:** Vercel (önizleme dağıtımları + ISR).
**Backend/DB:** Supabase — Postgres, Auth, Storage, Row Level Security (RLS), Edge Functions.
**Görsel:** Supabase Storage + next/image (WebP/AVIF, responsive srcset). Çok yüksek hacimde Cloudflare Images / Cloudinary alternatifi değerlendirilir.
**i18n:** `next-intl` (App Router uyumlu) — TR/EN, hreflang.
**Form:** React Hook Form + Zod → Supabase insert (anon RLS ile sadece INSERT).
**Arama:** Postgres FTS (tsvector) + `pg_trgm` (kod bulanık arama). İleride hacim artarsa Typesense/Meilisearch.
**E-posta:** Resend / Supabase + webhook (yeni lead bildirimi).
**Analytics:** GA4, Google Search Console, Microsoft Clarity, (opsiyonel) Vercel Analytics.
**Admin/CRM:** Özel Next.js admin (Supabase Auth korumalı route'lar). Başlangıçta Supabase Studio yeterli; CRM olgunlaştıkça özel panel.

**Neden bu stack:** Next.js SSG/ISR = rakiplerden hızlı + SEO dostu. Supabase = tek çatıda DB+Auth+Storage+RLS, hızlı kurulum, ucuz başlangıç. Vercel = sıfır-konfig deploy + önizleme. Tailwind = ThemeForest teması ve custom bileşenlerle uyumlu.

---

## 7. SUPABASE VERİ MODELİ (DDL taslağı)

> Aşağıdaki şema doğrudan başlangıç noktası. `gen_random_uuid()` için pgcrypto, bulanık arama için pg_trgm açılmalı.

```sql
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- KATEGORİLER
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  parent_id uuid references categories(id),
  name_tr text not null,
  name_en text not null,
  description_tr text,
  description_en text,
  hero_image_path text,
  icon text,
  sort_order int default 0,
  seo_title_tr text, seo_title_en text,
  seo_description_tr text, seo_description_en text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ÜRÜNLER / PARÇALAR
create table products (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,                 -- ör. DP-1462 (kod ile aratma)
  slug text unique not null,
  category_id uuid references categories(id),
  name_tr text not null,
  name_en text not null,
  short_description_tr text,
  short_description_en text,
  description_tr text,
  description_en text,
  dimensions jsonb,                          -- {width_mm,height_mm,length_mm,depth_mm,diameter_mm}
  material text default 'polyurethane',
  density text,                              -- yoğunluk sınıfı
  weight_kg numeric,
  style_tags text[],                         -- {klasik,modern,art-deco,osmanli,...}
  application_areas text[],                  -- {ic-cephe,dis-cephe,tavan,pencere,...}
  technical_specs jsonb,
  is_featured boolean default false,
  is_active boolean default true,
  sort_order int default 0,
  seo_title_tr text, seo_title_en text,
  seo_description_tr text, seo_description_en text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ÜRÜN GÖRSELLERİ
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  storage_path text not null,
  alt_tr text, alt_en text,
  image_type text default 'studio',          -- studio | application | technical | drawing
  is_primary boolean default false,
  sort_order int default 0,
  width int, height int
);

-- REFERANS MARKALAR (Godiva, Ağaoğlu...)
create table clients (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  logo_path text,
  sector text,
  website text,
  description_tr text, description_en text,
  is_featured boolean default false,
  sort_order int default 0
);

-- PROJELER / VAKA ÇALIŞMALARI
create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_tr text not null, title_en text not null,
  client_id uuid references clients(id),
  client_name text,
  location text,
  year int,
  summary_tr text, summary_en text,
  description_tr text, description_en text,
  cover_image_path text,
  is_featured boolean default false,
  is_active boolean default true,
  sort_order int default 0,
  seo_title_tr text, seo_title_en text,
  seo_description_tr text, seo_description_en text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  storage_path text not null,
  alt_tr text, alt_en text,
  sort_order int default 0
);

-- PROJEDE KULLANILAN ÜRÜN KODLARI (ilham → ürün linki)
create table project_products (
  project_id uuid references projects(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  note text,
  primary key (project_id, product_id)
);

-- SATIŞ EKİBİ / PERSONEL (Supabase Auth ile)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'sales',                 -- admin | sales | editor
  avatar_path text,
  created_at timestamptz default now()
);

-- LEADS (CRM çekirdeği) — site formundan gelenler
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  full_name text,
  email text,
  phone text,
  company text,
  role text,                                 -- architect | contractor | individual...
  message text,
  product_codes text[],                      -- RFQ sepetindeki kodlar
  quantities jsonb,                          -- {code: adet}
  locale text default 'tr',
  source text,                               -- hangi sayfa/form
  referrer text,
  utm_source text, utm_medium text, utm_campaign text, utm_term text, utm_content text,
  status text default 'new',                 -- new|contacted|quoted|won|lost
  assigned_to uuid references auth.users(id),
  estimated_value numeric
);

-- CRM AKTİVİTE LOGU
create table lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references leads(id) on delete cascade,
  user_id uuid references auth.users(id),
  type text,                                 -- note|call|email|status_change|quote_sent
  content text,
  metadata jsonb,
  created_at timestamptz default now()
);

-- BLOG / REHBER (SEO motoru)
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_tr text, title_en text,
  excerpt_tr text, excerpt_en text,
  content_tr text, content_en text,          -- markdown/html
  cover_image_path text,
  author_id uuid references profiles(id),
  category text,
  tags text[],
  published_at timestamptz,
  is_published boolean default false,
  seo_title_tr text, seo_title_en text,
  seo_description_tr text, seo_description_en text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- İNDEKSLER
create index on products (category_id);
create index on products using gin (code gin_trgm_ops);   -- kod bulanık arama
create index on products using gin (style_tags);
create index on products using gin (application_areas);
create index on leads (status);
create index on leads (assigned_to);
create index on leads (created_at desc);
```

**RLS (özet):**
- `products, categories, clients, projects, project_images, product_images, blog_posts`: anon **SELECT** (yalnız `is_active=true` / `is_published=true`).
- `leads`: anon **INSERT** (form gönderimi) — SELECT/UPDATE yok. Sadece authenticated personel SELECT/UPDATE.
- `lead_activities, profiles`: yalnız authenticated personel.
- Yazma işlemleri (ürün/içerik ekleme): yalnız `admin/editor` rolü.

**Kod arama RPC (örnek mantık):** `code ILIKE '%aranan%'` + `similarity(code, 'aranan')` ile sıralama; ayrıca isim/açıklama FTS ile birleşik sonuç.

---

## 8. GÖRSEL İŞ HATTI (image pipeline)

Mimar müşteriye satış görsel kalitesiyle yapılır. Plan:
1. **Toparlama:** Tüm kategorilerdeki mevcut parça görsellerini tek havuzda topla.
2. **Adlandırma (SEO):** `kategori-urunkodu-aciklama.webp` (ör. `sove-dp1462-dekoratif-pencere-sovesi.webp`). Dosya adı = SEO sinyali.
3. **Standart:** Stüdyo çekimleri için tutarlı zemin/ışık; her ürün için min. 1 stüdyo + mümkünse 1 uygulama (mekanda) görseli.
4. **Format/boyut:** Kaynağı yükle, next/image ile WebP/AVIF + responsive srcset üret. LCP görselleri `priority`.
5. **Alt metin:** Her görsel için TR + EN alt (`alt_tr`, `alt_en`).
6. **Depolama:** Supabase Storage (public bucket: ürünler/projeler). Hacim büyürse CDN'e taşınır.
7. **Lazy-load** galeri + blur placeholder.

---

## 9. SEO STRATEJİSİ (rakipleri geçmek)

Rakipler keyword yoğunluğu + domain yaşı + çok sayıda indeksli sayfa + il-adı spam ile kazanıyor. Biz **kaliteyle + teknik üstünlükle** geçeceğiz:

**Teknik temel:**
- Next.js SSG/ISR → hızlı, mobil dostu, iyi Core Web Vitals (rakiplerin zayıf noktası).
- Her ürün/kategori = optimize landing sayfası (programatik SEO).
- **Schema.org:** `Product` (kod = SKU/MPN), `BreadcrumbList`, `Organization`, `ImageObject`, projelerde `CreativeWork`.
- `hreflang` TR/EN, otomatik XML sitemap, temiz robots.txt, kanonik etiketler.

**İçerik stratejisi:**
- Ürün sayfaları: "poliüretan [kategori] modelleri" + kod hedefli, **insan için** yazılmış benzersiz açıklamalar (rakip tekrarını YAPMA).
- Anahtar kümeleri: söve, sütun, kartonpiyer, kemer, taç, kiriş, mertek, kütük, kubbe, göbek, niş, pervaz, süpürgelik, çıta/lambri, payanda, denizlik, pilaster, şömine, prekast dış cephe.
- **EN tarafı:** polyurethane cornice / moulding / column / facade jamb / ceiling rose — ihracat/B2B sorguları.
- Rehber/blog: "poliüretan vs alçı vs strafor", uygulama/montaj rehberleri, mimar için spesifikasyon rehberi, kullanım alanına göre ilham yazıları.
- **E-E-A-T:** Gerçek proje vakaları (Godiva/Ağaoğlu), atölye/üretim sayfaları, teknik test verileri → otorite sinyali.

**Migrasyon (SEO mirasını koru):**
- Eski sitelerin SEO değeri büyük; **dikkatli geçiş**. Eski URL'lerden yeni URL'lere 301 haritası, yeni sitemap gönderimi, sıralama takibi. Eski siteleri bir süre canlı tut, kademeli konsolide et. (Bkz. §13 Karar.)

---

## 10. ANALİTİK & TAKİP KURULUMU

- **GA4:** Sayfa görüntüleme + özel olaylar: `code_search`, `add_to_rfq` (teklife ekle), `rfq_submit` (form gönderimi), `category_view`, `product_view`, `lang_switch`, `contact_click`. Conversion = `rfq_submit`.
- **Google Search Console:** Domain doğrulama, sitemap gönderimi, TR/EN performans takibi, sorgu/sayfa raporları.
- **Microsoft Clarity:** Heatmap + session recording (mimarın kod aramada/teklifte nerede takıldığını gör).
- **Vercel Analytics (ops.):** Gerçek kullanıcı Core Web Vitals.
- **UTM:** Tüm kampanya linklerinde; lead'e UTM alanları yazılır → CRM'de kaynak görünür.
- **Tag yönetimi:** GTM ile merkezi (opsiyonel) veya doğrudan next/script.

---

## 11. ADMIN / CRM SPESİFİKASYONU

**Amaç:** Satış ekibi siteden gelen formları görüp yönetsin (proje bazlı teklif → imalat).

**Roller:** admin (tam yetki), sales (lead yönet), editor (içerik/ürün).

**Ekranlar:**
- **Dashboard:** Yeni lead sayısı, durum dağılımı, son aktiviteler, kaynak (UTM) kırılımı.
- **Lead gelen kutusu:** Liste + filtre (durum, atanan, tarih, kaynak, dil). Her lead'de: iletişim, **istenen kodlar (RFQ)**, mesaj, UTM/kaynak.
- **Lead detay:** Durum değiştir (new→contacted→quoted→won/lost), satışçıya ata, not/aktivite ekle, teklif gönderildi işaretle.
- **Ürün yönetimi:** (başta Supabase Studio) kod, kategori, görsel, ölçü, SEO alanları, çoklu dil.
- **İçerik yönetimi:** Projeler/referanslar, blog.
- **Bildirimler:** Yeni lead → e-posta/Slack.

**Teknik:** Next.js `/admin` route grubu, Supabase Auth (e-posta/şifre veya magic link), RLS ile rol bazlı erişim. Başlangıçta hızlı için **Supabase Studio**'da yönetim yeterli; lead inbox'ı ilk özel ekran olarak gelsin.

---

## 12. AŞAMALI YOL HARİTASI

**Faz 0 — Temel (1–2 hafta):** Domain, GitHub repo, Vercel + Supabase projeleri, tema seçimi/satın alma, marka kimliği (logo/renk/font), tasarım token'ları, GA4/GSC/Clarity iskeleti, taksonomi kilidi, **tüm ürün görsellerinin toplanması + adlandırılması.**

**Faz 1 — MVP Katalog (3–4 hafta):** Next.js + tema entegrasyonu, i18n, Supabase şeması, kategori + ilk parti ürün seed, ana sayfa (banner/referans/kategori/kod arama), kategori sayfaları, ürün detay, **kod arama + teklif sepeti + RFQ formu → leads**, temel SEO (metadata/şema/sitemap/hreflang), lead e-posta bildirimi, deploy.

**Faz 2 — Marka & İçerik (2–3 hafta):** Marka hikayesi/atölye, referans/vaka çalışmaları (Godiva/Ağaoğlu), filtreli ilham galerisi, blog motoru + ilk SEO makaleleri, görsel optimizasyon hattı, tam bilingual içerik.

**Faz 3 — CRM/Admin (3–4 hafta):** Supabase Auth (ekip), admin dashboard, lead inbox + atama + durum pipeline + aktivite logu, ürün/içerik yönetim ekranları, yeni lead bildirimi.

**Faz 4 — Optimizasyon & Ölçek (sürekli):** Tüm katalog migrasyonu, programatik SEO, Core Web Vitals ince ayar, CTA A/B, dönüşüm takibi, gelişmiş CRM (quote, export), EN/ihracat itişi.

---

## 13. RİSKLER & KARAR BEKLEYEN NOKTALAR

1. **SEO mirası — en kritik karar:** Eski siteler (poluretan.com / kartonpiyerdeposu.com) güçlü sıralamada. Seçenekler: (a) decorpu'yu sıfırdan büyüt, eskileri canlı tut; (b) eskileri 301 ile decorpu'ya konsolide et (riskli ama uzun vadede güçlü); (c) hibrit — eskiler kalsın, decorpu'ya kademeli yönlendirme. **Karar gerek.**
2. **Referans izinleri:** Godiva/Ağaoğlu logo ve adını kullanmak için **yazılı izin** şart. Vaka çalışmaları için görsel/onay topla.
3. **Fiyat gösterimi:** Mimar modeli = "fiyat gösterme, teklif al" muhtemelen doğru. Karar: hiç fiyat yok / aralık / "teklif".
4. **Tema seçimi:** Bkz. §14.
5. **Görsel kalitesi:** Mevcut görsellerin kalitesi yeterli mi, yeni stüdyo çekimi gerekli mi?
6. **Kim inşa edecek:** Sen + Claude mi, yoksa bazı kısımlar için geliştirici mi? Tempo buna bağlı.
7. **Marka adı kilidi:** "Decorpu" + alan adı + sosyal hesaplar tutarlılığı.

---

## 14. THEMEFOREST TEMA ÖNERİSİ (Next.js)

**Önemli gerçek:** Bu temaların çoğu **mimari ofis/portföy** temasıdır — doğru *estetiği* verir ama katalog/filtre/kod-arama/RFQ/CRM işlevini **vermez**. Yani temayı **görsel dil + sayfa kabukları** için al; katalog, arama, teklif sepeti ve CRM'i Supabase'e karşı **custom** kur. Temadan veri katmanı bekleme.

**Stack uyumu için Tailwind tabanlı tema tercih et** (Bootstrap temalar Next.js custom bileşenlerle daha zor uyuşur).

Değerlendirilecek adaylar:
- **Architronix (themeperch)** — Tailwind CSS, proje showcase + **cart/checkout sayfaları var** (RFQ sepetine repurpose edilebilir). Stack uyumu en yüksek aday.
- **Archin (UiCamp)** — temiz, modern, premium his. Restyle gerekebilir.
- **Moork (bslthemes)** — GSAP/editöryel, galeri güçlü; ilham/proje vitrinleri için iyi.
- **Interno (HixStudio)** — mimari stüdyo, portföy güçlü.
- **CoDesign / Innovat / Next Arch** — alternatif estetikler.

**Öneri:** Önce Architronix'i (Tailwind + commerce iskeleti) incele; yoksa Archin/Moork'tan birini al ve Tailwind'e taşı. Satın almadan önce demo'da **kategori/ürün/galeri/detay** sayfa şablonlarının varlığına bak.

---

## 15. İLK ADIMLAR (bu hafta)
1. SEO migrasyon kararını ver (§13.1).
2. Tema kararı (§14) — 1–2 demo seç.
3. Görsel havuzunu topla + adlandırma standardını uygula.
4. Supabase projesi aç, §7 şemasını kur, pg_trgm + RLS.
5. Vercel + Next.js iskeleti, i18n, GA4/GSC/Clarity bağla.
6. İlk 15–20 ürünü seed et, kod arama + RFQ akışını uçtan uca çalıştır.
7. Godiva/Ağaoğlu için referans izni süreçlerini başlat.
