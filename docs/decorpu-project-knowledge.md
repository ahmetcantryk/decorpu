# DECORPU — PROJE HAFIZASI (Claude Project'e ekle)

Bu dosyanın amacı: Bu Claude Project'inde açtığın **her yeni konuşmada** Claude'un projeyi en baştan bilmesi. İki parça var:
- **BÖLÜM A** → Project'in **"Instructions"** (özel talimatlar) alanına yapıştır.
- **BÖLÜM B** → Project'in **"Files"** (proje dosyaları) kısmına bu dosyayı (veya içeriğini) ekle. `decorpu-master-plan.md`'yi de Files'a ekle.

---

## BÖLÜM A — PROJECT INSTRUCTIONS (kopyala-yapıştır)

> Aşağıdaki bloğu olduğu gibi Project Instructions alanına koy.

```
Bu proje, decorpu.com adlı poliüretan mimari dekorasyon ürünleri sitesinin (ve CRM'inin) inşasıdır.

BAĞLAM
- İmalatçı: Mustafa Tiryaki. Atölye poliüretan mimari profiller üretir (söve, sütun, kartonpiyer, kemer, taç, kiriş, kubbe, göbek, niş, pervaz, süpürgelik, çıta, panel, payanda, denizlik, prekast dış cephe vb.).
- İş modeli B2B: Müşteri çoğunlukla MİMARLAR. Mimar proje bazlı çalışır; tasarımındaki parçaları KOD ile bulur, proje bazlı fiyat alır, imalat başlar.
- Mevcut eski siteler (poluretan.com, kartonpiyerdeposu.com) SEO'da güçlü ama amatör görünüyor. En güçlü rakip polure.com (ürün kod sistemi + TR/EN var). Global referans oracdecor.com.
- Hedef: aynı/daha iyi SEO + premium marka algısı + mimara özel "kodla bul → teklife ekle → teklif al" akışı + gerçek referanslar (Godiva, Ağaoğlu) + Supabase tabanlı CRM.

STACK (kilitli)
- Next.js 14+ (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- Supabase (Postgres + Auth + Storage + RLS + Edge Functions)
- Vercel (hosting, ISR, preview deploy)
- i18n: next-intl, TR/EN, hreflang
- Form: React Hook Form + Zod → Supabase (anon yalnız INSERT)
- Arama: Postgres FTS + pg_trgm (kod bulanık arama)
- Analytics: GA4 + Google Search Console + Microsoft Clarity

NASIL ÇALIŞ
- İki dil zorunlu: ürettiğin tüm içerik/şema/alan TR ve EN içermeli (name_tr/name_en gibi).
- Her ürün benzersiz KOD taşır; kod URL'de, başlıkta ve Schema.org SKU/MPN'de olmalı.
- SEO her zaman birinci sınıf vatandaş: metadata, Product/BreadcrumbList/Organization şema, sitemap, hreflang, optimize görsel (next/image, WebP/AVIF, açıklayıcı dosya adı + alt_tr/alt_en).
- İçerikler İNSAN için yazılır; rakiplerin keyword tekrarını/il-adı spam'ini taklit etme.
- Mimar RFQ akışı (teklif sepeti) ürünün kalbidir; satış/ödeme YOK, teklif toplama VAR.
- Kod yazarken: TypeScript, sunucu bileşenleri tercih, RLS'e saygı, çevre değişkenleri (Supabase URL/anon key) güvenli.
- Karar bekleyen kalıcı konular: (1) eski sitelerin SEO migrasyonu, (2) Godiva/Ağaoğlu referans izinleri, (3) fiyat gösterilmeyecek (teklif modeli). Bunları varsaymadan önce bana sor.
- Türkçe konuş; teknik terimleri olduğu gibi kullan.

ÇIKTI BEKLENTİSİ
- Somut, uygulanabilir kod ve şema üret. Belirsizlikte makul varsayımı belirt, beni durdurmadan ilerle; sadece yukarıdaki "karar bekleyen" konularda sor.
```

---

## BÖLÜM B — REFERANS BİLGİ (Files'a koy)

### B.1 Proje tek-cümle
decorpu.com — mimarın çizgisini imalata dönüştüren poliüretan mimari dekorasyon atölyesinin premium, TR/EN, SEO-güçlü kataloğu + mimara özel teklif (RFQ) akışı + Supabase CRM.

### B.2 İş modeli (mimar nasıl alır)
Mimar bir tasarım/proje yapar → o tasarımdaki parçaları decorpu'da **kodla** arar → eşleşenleri **teklif sepetine** ekler → tek formla gönderir → satış ekibi CRM'den görür → **proje bazlı fiyat** verir → **imalat** başlar → montaj.

### B.3 Konumlandırma & ton
- Sütunlar: proje bazlı imalat / mühendislik güveni (yoğunluk, dayanıklılık, hafiflik) / referans kanıtı / mimar dostu süreç.
- Ton: sade, editöryel, kendinden emin. Aşırı sıfat yok. Görsel öncelikli (Orac seviyesi).

### B.4 Kategori taksonomisi (kanonik slug → TR / EN)
- `sove` — Söve / Jamb
- `pencere-sove` — Pencere Söve / Window Jamb
- `denizlik` — Denizlik / Sill
- `kartonpiyer` — Kartonpiyer / Cornice
- `kat-silmesi` — Kat Silmesi / String Course
- `sutun-baslik` — Sütun & Başlık / Column & Capital (Dor/İyon/Korint/Osmanlı)
- `pilaster` — Pilaster / Pilaster
- `kemer` — Kemer / Arch
- `tac` — Taç / Crown · Pediment
- `gobek` — Göbek / Ceiling Rose
- `kubbe` — Kubbe / Dome
- `nis` — Niş / Niche
- `cerceve-pervaz` — Çerçeve & Pervaz / Frame · Architrave
- `supurgelik` — Süpürgelik / Skirting · Baseboard
- `cita-lambri` — Çıta & Lambri / Wall Moulding · Panel Strip
- `panel-kaplama` — Panel Kaplama / 3D Wall Panel
- `payanda` — Payanda / Bracket · Corbel
- `kiris` — Kiriş / Beam
- `mertek` — Mertek / Rafter
- `kutuk` — Kütük / Faux Timber
- `somine` — Şömine / Fireplace Surround
- `aplik` — Aplik / Decorative Element
- `prekast-dis-cephe` — Prekast Dış Cephe / Precast Facade

### B.5 Kod sistemi
- Format önerisi: `DP-XXXX` (ör. DP-1462). Kategori öneki opsiyonel.
- Kod benzersiz, URL + başlık + Schema SKU/MPN'de.
- Arama: tam eşleşme + bulanık (pg_trgm). Header'da kalıcı arama kutusu.

### B.6 Veri modeli özeti (tam DDL master-plan'de §7)
Tablolar: `categories`, `products`, `product_images`, `clients` (referans markalar), `projects` (vaka çalışmaları), `project_images`, `project_products`, `profiles` (ekip), `leads` (CRM/RFQ), `lead_activities`, `blog_posts`.
RLS: public read (aktif kayıtlar) · `leads` anon INSERT, staff SELECT/UPDATE · içerik yazma admin/editor.

### B.7 SEO ilkeleri
- Her ürün/kategori = optimize landing. Programatik SEO.
- Schema.org Product (kod=SKU), BreadcrumbList, Organization.
- hreflang TR/EN, otomatik sitemap, kanonik.
- Benzersiz, insan-odaklı açıklamalar. EN tarafı ihracat anahtarları (polyurethane cornice/moulding/column/facade).
- E-E-A-T: gerçek proje vakaları + atölye sayfaları + test verileri.
- Görsel: açıklayıcı dosya adı (`sove-dp1462-...webp`) + alt_tr/alt_en, WebP/AVIF.

### B.8 Analytics olayları (GA4)
`code_search`, `add_to_rfq`, `rfq_submit` (conversion), `category_view`, `product_view`, `lang_switch`, `contact_click`. UTM → leads tablosuna yazılır.

### B.9 Glossary (TR ↔ EN — içerik/SEO için)
söve=jamb · pencere söve=window jamb · denizlik=sill · kartonpiyer=cornice · kat silmesi=string course · sütun=column · sütun başlığı=capital · pilaster=pilaster · kemer=arch · taç=crown/pediment · göbek=ceiling rose · kubbe=dome · niş=niche · çerçeve/pervaz=frame/architrave · süpürgelik=skirting/baseboard · çıta/lambri=wall moulding/panel · panel kaplama=3D wall panel · payanda=bracket/corbel · kiriş=beam · mertek=rafter · kütük=faux timber/log · şömine=fireplace surround · prekast dış cephe=precast facade · poliüretan=polyurethane · dış cephe=facade/exterior · iç dekorasyon=interior decoration.

### B.10 Kalıcı karar bekleyen konular
1. Eski sitelerin (poluretan.com/kartonpiyerdeposu.com) SEO migrasyonu — 301 konsolidasyon mu, paralel büyütme mi?
2. Godiva/Ağaoğlu referans izinleri (yazılı onay + görsel).
3. Fiyat: gösterilmeyecek, "teklif al" modeli (teyit et).
4. Tema seçimi (Architronix / Archin / Moork — Tailwind tercih).
5. Görsel kalitesi: yeni stüdyo çekimi gerekli mi?
