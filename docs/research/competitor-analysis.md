# DECORPU — Rakip & Taksonomi Analizi (Faz 0)

> Durum: **Faz 0 tamamlandı.** Her iki scraper çalıştı, asset envanteri + taksonomi sentezi gerçek verilerle dolu. Sıradaki: checkpoint kararları → Faz 1.
> Kaynaklar: polure.com (rakip, taksonomi referansı), kartonpiyerdeposu.com (Mustafa'nın kendi sitesi), decorpu master-plan §3.2.

---

## 1. YÖNTEM
- **polure.com** → Playwright (bot korumalı, infinite-scroll). 22 ana kategori, ürün kodu + ad + ölçü + görsel URL'leri → `polure-manifest.json`. Görseller yalnız **iç referans** (örneklem); telifli, yayımlanmayacak.
- **kartonpiyerdeposu.com** → fetch + cheerio (WordPress/Yoast sitemap, koruma yok). Orijinal görseller (WP `-WxH` thumbnail'ları soyularak) + gömülü `KD-####` kodları + Drive (katalog/DWG) linkleri → `kartonpiyer-manifest.json`. Bu görseller **bizim** (Mustafa'nın).
- Sentez: üç kaynak → tek **decorpu kanonik kategori ağacı** + `DP-####` kod sistemi.

---

## 2. RAKİP TAKSONOMİLERİ (ham)

### 2.1 polure.com — 22 ana kategori (808 ürün / 95 kategori / 3.305 görsel)
| Kategori | Ürün | Kategori | Ürün |
|---|--:|---|--:|
| Süslemeler | 140 | Taçlar | 34 |
| Sütun | 95 | Bordür | 24 |
| Pilaster Sütun | 75 | Kısa Roma Sütunlar | 22 |
| Yuvarlak Kavis Kemer | 70 | Çıta | 18 |
| Paneller | 44 | Kombine Modelleri | 14 |
| Kiriş-Mertek-Kütük | 43 | Gizli Işık ve Armatür | 9 |
| Çıta Köşe | 43 | Küpeşte ve Babadstrol | 9 |
| Payanda | 41 | Aplik ve Niş | 7 |
| Söveler | 36 | Süpürgelik | 6 |
| Göbek ve Kubbe | 35 | Şömineler | 5 |
| Kartonpiyer | 35 | Ticari Malzemeleri | 2 |

**Önemli ipuçları:** Kod sistemi var (P5220C, KSOM8403WH…); ürün URL'i `/a/tr/products/{kod}/`; fiyat YOK (bizim teklif modeliyle aynı); en büyük kategori **Süslemeler (140)** = dekoratif ornament/aplike havuzu.

### 2.2 kartonpiyerdeposu.com — 12 landing + WP kategori arşivleri
Çıta/Bordür · Kartonpiyer · Sütun & Başlık · Söve · Kütük · Duvar Süsleri · Kubbe/Göbek · Payanda · Duvar Panelleri · Şömine · LED/Gizli Işık Kartonpiyer · Süpürgelik.
**Gömülü kod:** dosya adlarında `KD-2837`, `KD-2838`, `KD2839`… → Mustafa'nın ürünleri zaten kodlu. Dosya adları aşırı SEO-stuffed (amatör), ama KD-#### sinyali değerli.

### 2.3 master-plan kanonik (23 slug — §3.2)
`sove, pencere-sove, denizlik, kartonpiyer, kat-silmesi, sutun-baslik, pilaster, kemer, tac, gobek, kubbe, nis, cerceve-pervaz, supurgelik, cita-lambri, panel-kaplama, payanda, kiris, mertek, kutuk, somine, aplik, prekast-dis-cephe`

---

## 3. DECORPU KANONİK KATEGORİ AĞACI (sentez — checkpoint'te kilitlenecek)

> İlke: mimar zihnine göre grupla (iç/dış cephe profil ailesi), polure derinliğini yakala, master-plan slug'larını koru. **parent → child** `parent_id` ile.

| # | Parent (slug) | TR / EN | Alt kategoriler (slug) | Kaynak kapsama |
|--:|---|---|---|---|
| 1 | `sove` | Söve / Jamb | `pencere-sove`, `denizlik` | polure Söveler(36) · KD Söve · MP |
| 2 | `sutun-baslik` | Sütun & Başlık / Column & Capital | `pilaster`, `kisa-roma-sutun`, `baslik` (Dor/İyon/Korint/Osmanlı) | polure Sütun(95)+Pilaster(75)+KısaRoma(22) · KD · MP |
| 3 | `kemer` | Kemer / Arch | `yuvarlak-kavis-kemer` | polure(70) · MP |
| 4 | `kartonpiyer` | Kartonpiyer / Cornice | `kat-silmesi`, `bordur`, `gizli-isik` (LED/cove) | polure Kartonpiyer(35)+Bordür(24)+Gizli Işık(9) · KD · MP |
| 5 | `gobek` | Göbek / Ceiling Rose | — | polure Göbek&Kubbe(35) · KD · MP |
| 6 | `kubbe` | Kubbe / Dome | — | polure(↑) · KD · MP |
| 7 | `tac` | Taç / Crown · Pediment | — | polure Taçlar(34) · MP |
| 8 | `cita-lambri` | Çıta & Lambri / Wall Moulding | `cita-kose` (köşe) | polure Çıta(18)+ÇıtaKöşe(43) · KD · MP |
| 9 | `panel-kaplama` | Panel Kaplama / 3D Wall Panel | — | polure Paneller(44) · KD · MP |
| 10 | `payanda` | Payanda / Bracket · Corbel | — | polure(41) · KD · MP |
| 11 | `kiris` | Kiriş / Beam | `mertek`, `kutuk` | polure Kiriş-Mertek-Kütük(43) · KD · MP |
| 12 | `susleme` | Süsleme / Decorative Ornament | `aplik`, `nis`, `rozet` | polure Süslemeler(140)+Aplik&Niş(7) · KD DuvarSüsleri · MP(aplik,nis) |
| 13 | `cerceve-pervaz` | Çerçeve & Pervaz / Frame · Architrave | — | MP (polure'da Söve altında dağınık) |
| 14 | `supurgelik` | Süpürgelik / Skirting | — | polure(6) · KD · MP |
| 15 | `somine` | Şömine / Fireplace Surround | — | polure(5) · KD · MP |
| 16 | `kupeste-balustr` | Küpeşte & Babadstrol / Balustrade | — | **polure(9) — master-plan'da YOK, eklendi** |
| 17 | `prekast-dis-cephe` | Prekast Dış Cephe / Precast Facade | — | **Mustafa'nın güçlü yanı — polure'da ayrı yok** |
| 18 | `yapistirici-aksesuar` | Yapıştırıcı & Aksesuar / Adhesives & Tools | — | polure Ticari(2) · Orac benzeri B2B aracı |

**Notlar / kararlar (checkpoint):**
- `Kombine Modelleri(14)` = ürün paketleri → kategori değil, ileride "Setler/İlham" olarak değerlendirilir.
- #16 Balustrade ve #18 Adhesives master-plan'da yoktu → **eklenmesi öneriliyor** (polure + Orac kapsaması).
- #17 Prekast dış cephe = ayrışma noktamız (mimar/müteahhit dış cephe).
- Toplam ~18 parent + ~12 alt = mimar için sade, polure derinliğini karşılar.

---

## 4. KOD SİSTEMİ — `DP-####`
- Format: `DP-####` (master-plan B.5). Mustafa'nın `KD-####` kodları → `DP-####`'e **birebir taşınabilir** (KD-2837 → DP-2837) ya da kategori-önekli (`DP-SOV-2837`). Öneri: sade `DP-####`, kategori `category_id` ile.
- polure kodları (P####) yalnız referans; bizim kodlarımız KD tabanlı + yeni ürünler için artan seri.
- Kod: URL (`/urun/dp-2837`), başlık, Schema.org `sku`/`mpn`, header kalıcı arama (pg_trgm bulanık).

---

## 5. ASSET ENVANTERİ
**polure (referans — `polure-manifest.json`):** 22 kategori · **767 ürün** tam metadata · yakalama kalitesi: **kod %100, ad %100, ölçü %99 (761/767)**, hepsi görsel-URL'li. Örneklem **277 görsel** (15/kategori, gerçek 800×800 JPEG, ~11 MB) → `reference/polure/`. Görsel URL deseni deterministik doğrulandı: `/a/media/{kod}/{kod}-800w.jpg`. → Tüm ürün URL'leri manifest'te; istenirse tam set tek komutla (`SAMPLE=all`) çekilebilir.
**kartonpiyer (kendi — `kartonpiyer-manifest.json`):** **44 sayfa · 945 orijinal görsel (~650 MB) · 206 distinct KD kodu** → `assets/kartonpiyer/`. En zengin sayfalar: duvar-çıta/bordür(115), kartonpiyer(85), duvar-süsleri(81), sütun(79), mertek-kiriş(74), göbek(66), ahşap-kiriş(62), söve(51), panel(46), payanda(31), şömine(20). Örnek kodlar: KD-2837/2838/2839, KD-1512…1590, KD-603, KD-8450, KD-88260.
**Google Drive (katalog + AutoCAD DWG — manuel indirilecek, auth):** 2 link → `kartonpiyer-drive-links.txt`
  - `1Ke6lb-GThci5t4TmUbiRS_zpfKOklv5b` · `1LQPXt9iMRGgNIVUhaRqRahTaUEQhoctL` (muhtemelen katalog PDF + DWG arşivi → line-art + ölçü kaynağı).

### 5.1 Saklama / optimizasyon notları
- `docs/research/assets/` (650 MB) ve `reference/` → **Faz 1'de `.gitignore`'a** (repo'ya girmez). Manifest JSON + bu MD küçük, kalır.
- Katalog için kullanılacak kartonpiyer görselleri **sharp ile WebP/AVIF + SEO yeniden adlandırma** (`sove-dp2837-...webp`) sonrası `products/product_images` seed'ine girer.
- KD-#### → DP-#### eşlemesi: 206 kod doğrudan seed çekirdeği.

## 5.2 SAYFA ŞABLONLARI (polure'dan öğrenildi — Faz 2 referansı)
**Ürün detay (polure modeli — RFQ ile uyumlu, birebir alınacak):**
breadcrumb (Ana Sayfa / Kategori / Alt Kategori / Ürün) → görsel galeri (ana + hover + thumbnail carousel + ok) → H1 başlık + **kod (SKU)** → **teknik özellik tablosu** (malzeme=poliüretan, boyanabilir, kullanım iç/dış, su geçirmez, yüzey, renk, yoğunluk 150–200 kg/m³, su emme <%1) → **boyutlar (En/Boy/Yükseklik, cm)** → aksiyonlar (favori · karşılaştır · paylaş · QR + **bizde "Teklife ekle"**) → **sekmeler** (Açıklama / Kullanım Alanları / Montaj / Bakım / SSS) → **Benzer Ürünler** grid (thumb+hover+ad+E/B/Y) → kategori etiketleri. Schema.org `Product` (kod=sku/mpn).

**Kategori sayfası:** filtre (stil / kullanım alanı / ölçü) → ürün kartı grid (thumb + hover + kod + E/B/Y).

**Projeler / Referanslar (BİZİM FARKIMIZ — polure'da YOK, orac modeli):**
- `clients` (referans logoları) + `projects` listesi → **proje detay** (kapak, özet, konum/yıl, galeri, **"Bu projede kullanılan ürünler" → `project_products` → ürün kartları/linkleri**).
- polure yalnız "Gallery"ye sahip; proje↔ürün ilişkisi yok → mimara özel ilham→teklif akışı bizde ayrışır (master plan §4.3).

**Kurumsal/diğer:** Hakkımızda/Atölye, İletişim, Bayilik; Galeri (ilham); Legal: gizlilik/kvkk/çerez. (polure'da blog da yok → SEO blog motoru bizde avantaj.)

## 6. TELİF DURUŞU (checkpoint onayı)
- polure görselleri: **yalnız iç referans** (manifest'te URL, örneklem indirildi). decorpu'da yayımlanmayacak.
- kartonpiyer görselleri: **bizim** → SEO yeniden adlandırma sonrası katalog seed adayı.
- Pinterest/moodboard: yalnız ilham.

## 7. CHECKPOINT'TE NETLEŞECEK IA SORULARI
1. ~18 parent ağacı onayı (özellikle #16 balustrade, #17 prekast, #18 aksesuar eklensin mi?).
2. Kod taşıma: `DP-####` (KD'den birebir) mi, kategori-önekli mi?
3. Alt kategori derinliği: Sütun→(pilaster/kısa-roma/başlık) gibi 2. seviye şimdi mi, sonra mı?
4. Görsel kaynağı: kartonpiyer mevcut + yeni stüdyo çekimi gereken kategoriler hangileri?
