# kartonpiyerdeposu.com — SEO Envanter ve Taşıma Analizi

> Tarih: 2026-07-22 · Yöntem: sitenin public taraması — 88 çekirdek sayfa + 114 etiket arşivi, %100 erişildi (202 URL).
> **Sınır:** Gerçek ziyaret SAYILARI ancak Search Console (DNS doğrulaması) ile görülebilir; bu rapor
> sayfa yapısı, anahtar kelime hedefleri ve içerik sinyallerinden çıkarılan **on-page güç analizidir**.
> Ham veri: `pages.json` (başlık/meta/H1/H2/kelime sayısı/iç link) ve `tags.json` (114 anahtar kelime).

## 1. Site Profili

- WordPress + **Yoast SEO** + Avada tema; robots tamamen açık, temiz sitemap hiyerarşisi.
- 19 statik sayfa + 41 yazı + 28 kategori arşivi; 114 etiket arşivi (uzun kuyruk kelime ağı).
- İpucu: `/4cm-duvar-citasi` sayfa başlığı "…- Decorpu" ile bitiyor — iki site zaten ilişkilendirilmiş.

**Tam kapsam doğrulaması (Google `site:` ~230 sonuç ile mutabakat):**
88 çekirdek + 116 etiket arşiv sayfası (114 etiket, 2'si çok sayfalı) + 2 yazar ≈ **206 URL**;
kalan fark kategori sayfalamaları (`/page/2/`) ve WP görsel eki sayfalarıdır. `site:` sayısı Google'ın
tahminidir; kesin liste GSC ile görülür. Etiket verisi: `tag-pages.json`.

**Kritik bulgu — etiketler noindex DEĞİL:** 114 etiketin tamamı `index, follow`. Yani bu ince arşivler
sitenin gerçek sıralama yüzeyinin parçası; her biri tam-eşleşme kelimeyi 500-1000 kelimelik özet
içerikle hedefliyor (en dolular: "duvar çıta modelleri" 10 yazı/1079w, "duvar çıtası" 10/931w,
"poliuretan çıta" 10/995w). Geçişte `/tag/*` URL'leri de 301 haritasına girmek ZORUNDA.

## 2. Anahtar Kelime Evreni (etiketlerden kümeleme)

| Küme | Örnek kelimeler | Ağırlık |
|---|---|---|
| **Duvar çıtası** (ana tema) | duvar çıtası, poliuretan çıta, çıta fiyatları, çıta köşesi, boyanabilir çıta, yatak odası duvar çıtası, salon duvar çıtası, stropiyer çıta | **~%40** — sitenin bel kemiği |
| Kiriş / mertek / kütük (ahşap görünümlü) | ahşap görünümlü kiriş, rustik mertek, poliuretan kütük fiyatları, villa ahşap tavan | ~%20 |
| Kartonpiyer | kartonpiyer modelleri, alçı/poliuretan kartonpiyer, gizli ışık kartonpiyer | ~%10 |
| Şömine | poliuretan şömine, elektrikli/bacasız şömine | ~%7 |
| Kubbe & göbek | tavan kubbe modelleri, oval/kare kubbe, tavan lamba göbeği | ~%7 |
| Usta / uygulama (hizmet niyeti) | duvar çıta ustası, poliuretan uygulama ustası, nasıl yapıştırılır | ~%8 |
| Şehir (yerel SEO) | duvar çıtası **istanbul / izmir / kocaeli / pendik / ankara** | ~%5 |

## 3. Neden Trafik Alıyor — 6 Taktik

1. **Kelime başına özel sayfa:** her varyanta ayrı landing ("4cm duvar çıtası", "boyanabilir poliuretan çıta", "polimer çıta"). Google'da uzun kuyruk sorguları tek tek yakalıyor.
2. **Şehir sayfaları (yerel niyet):** "duvar çıtası istanbul/izmir/kocaeli/pendik/ankara" — yerel aramaların tamamına ayrı sayfa.
3. **Fiyat & nasıl-yapılır içerikleri:** "Duvar Çıtalama Fiyatı Nedir?", "Duvar Çıta Uygulaması Nasıl Yapılır?" — satın alma öncesi soru trafiği.
4. **Başlık kalıbı:** `Kelime - Kelime Fiyatı - Kelime Modelleri` (tek başlıkta 3 sorgu varyantı) — TR SERP'te hâlâ etkili.
5. **Kategori arşivleri = içerik hub'ı:** çıta kategorileri 950-1050 kelimeye ulaşıyor (en derin sayfalar bunlar) ve yazılarla iç linkleniyor.
6. **114 etiket arşivi:** ince ama geniş bir uzun kuyruk ağı (aynısını kopyalamayız — bkz. §6).

## 4. En Güçlü Sayfalar (taşıma önceliği)

Seçim: içerik derinliği + kelime odağı + hub rolü. (⭐ = ilk dalga)

| Sayfa | Kelime | Hedef sorgu |
|---|---|---|
| ⭐ `/category/duvar-citalari-poliuretan-duvar-citasi/…poliuretan-duvar-citasi` | 1049 | poliuretan duvar çıtası |
| ⭐ `/category/duvar-citalari-poliuretan-duvar-citasi/` | 1058 | duvar çıtaları |
| ⭐ `/duvar-citasi/` | 539 | duvar çıtası (ana hub) |
| ⭐ `/poliuretan-duvar-citasi-ve-bordur-modelleri/` | 538 | çıta + bordür modelleri |
| ⭐ `/poliuretan-gobek-modelleri/` | 454 | tavan göbeği |
| ⭐ `/poliuretan-kartonpiyer-modelleri/` | 445 | kartonpiyer modelleri |
| ⭐ `/poliuretan-kutuk-imalati/` | 469 | kütük/kiriş imalatı |
| `/poliuretan-dekoratif-susleme-modelleri/` | 411 | duvar/tavan süsleri |
| `/poliuretan-payanda-modelleri/` | 405 | payanda modelleri |
| `/poliuretan-ahsap-mertek…rustik…` | 394 | rustik ahşap kiriş |
| `/poliuretan-duvar-panelleri/` | 387 | duvar panelleri |
| `/duvar-citalama-fiyati-nedir/` | 378 | çıtalama fiyatı (soru) |
| `/duvar-citasi-istanbul/` + şehir serisi | ~250-310 | yerel aramalar |
| `/poliuretan-somine-modelleri/` | 252 | şömine modelleri |
| `/poliuretan-kubbe-modelleri-kubbe-fiyatlari/` | 253 | kubbe fiyatı |

## 5. Zayıf Yanları (decorpu'da DAHA İYİSİNİ yapacağız)

- Çoğu sayfa **ince** (150-300 kelime) ve birbirine çok benzeyen ikizler var (`duvar-cita-uygulama` vs `duvar-cita-uygulamasi`).
- 114 etiket arşivi = yüzlerce ince/yinelenen sayfa (tarama bütçesi israfı).
- Görsel ağırlıklı, teknik veri (ölçü/DWG) yok; decorpu'nun ürün-kod + ölçü + DWG modeli net avantaj.
- Çelişkili telefonlar, `26200-2` gibi çöp sayfalar.

## 6. decorpu.com Aksiyon Planı

**A. Kategori güçlendirme (mevcut yapıya içerik):** duvar çıtası/lambri kategorisi bu sitenin ana
trafik teması — decorpu'daki karşılık kategorinin sayfasına 800+ kelimelik rehber metin + SSS eklenmeli.
Aynısı kartonpiyer, göbek, kubbe, şömine, kiriş kategorilerine.

**B. Yeni kurulacak sayfalar (kelime başına, ama İNCE DEĞİL — birleştirilmiş güçlü sürümler):**
1. "Duvar Çıtası" ana rehber (fiyat + uygulama + modeller tek kapsamlı sayfa; ikiz sayfaları BİRLEŞTİRİR)
2. "Duvar Çıtası Fiyatları / Çıtalama Fiyatı Nedir" (fiyat niyeti → teklif CTA'sı)
3. "Duvar Çıtası Nasıl Uygulanır" (nasıl-yapılır + video alanı)
4. Şehir sayfaları: İstanbul (öncelik), sonra Ankara/İzmir/Kocaeli — hizmet + teklif odaklı
5. "Ahşap Görünümlü Kiriş & Mertek" rehberi · 6. "Boyanabilir Çıta" · 7. "Gizli Işık (LED) Kartonpiyer"

**C. Etiket stratejisi:** 114 etiketi KOPYALAMA — bunlar `tags.json`'da anahtar kelime listesi olarak
kalsın; her küme yukarıdaki 7 güçlü sayfanın içine başlık (H2/H3) olarak işlenir.

## 7. 301 Yönlendirme Taslağı (ilk dalga — geçiş günü `next.config.ts`'e yazılacak)

| Eski (kartonpiyerdeposu.com) | Yeni (decorpu.com) |
|---|---|
| `/` | `/` |
| `/duvar-citasi/`, `/duvar-citasi-istanbul/`, çıta sayfaları | `/kategoriler/<çıta-lambri-kategorisi>` (+ yeni rehber) |
| `/poliuretan-kartonpiyer-modelleri/`, `/kartonpiyer/` | `/kategoriler/kartonpiyer` |
| `/poliuretan-gobek-modelleri/` | `/kategoriler/<göbek>` |
| `/poliuretan-kubbe-modelleri-kubbe-fiyatlari/` | `/kategoriler/kubbe` |
| `/poliuretan-somine-modelleri/`, `/somine-modelleri/` | `/kategoriler/somine` |
| `/poliuretan-kutuk*`, `/poliuretan-kiris*`, mertek sayfaları | `/kategoriler/<kiriş>` |
| `/poliuretan-payanda-modelleri/` | `/kategoriler/payanda` |
| `/poliuretan-duvar-panelleri/` | `/kategoriler/panel-kaplama` |
| `/poliuretan-supurgelik/` | `/kategoriler/supurgelik` |
| `/poliuretan-sove/` | `/kategoriler/sove` |
| `/uygulama-*`, usta sayfaları | `/hizmetler/<montaj>` |
| `/iletisim/` | `/iletisim` |
| kategori/etiket arşivleri | en yakın decorpu kategorisi (tam tablo geçiş günü çıkarılır) |

## 8. GERÇEK TRAFİK VERİSİ (GSC, son 16 ay — 2026-07-22'de doğrulandı) ✅

Kaynak: `gsc/` klasörü (Sayfa/Sorgu/Cihaz/Ülke/Grafik CSV'leri). **Toplam: 33.079 tık / ~1,95M gösterim**,
%73 mobil, %96 Türkiye. 399 sayfa ve 1000 sorgu satırı.

### 8.1 Tema kümeleri — GERÇEK tıklama dağılımı (envanter hipotezini düzeltir!)

| Küme | Tık | Not |
|---|---|---|
| **Kartonpiyer** | **6.847** | Gerçek kral tema (envanter çıtayı işaret ediyordu — içerik hacmi ≠ trafik) |
| **Duvar panelleri** | **3.556** | Tek sayfa 4.855 tık, pozisyon 2,1 — sitenin en güçlü sayfası |
| Çıta / bordür | 2.469 | Önemli ama 3. sıra |
| Kiriş / kütük / mertek (rustik) | 2.061 | Rustik fikirler sayfası tek başına 2.137 tık |
| Marka | ~1.150 | "kartonpiyer deposu" 762 + **"decorpu" 383** (!) |
| Şömine 564 · Söve/süpürgelik 530 · Kubbe/göbek 456 | | |

### 8.2 En çok tık alan sayfalar (ilk 10)

| Tık | Poz | Sayfa |
|---|---|---|
| 4.855 | 2,1 | /poliuretan-duvar-panelleri/ |
| 4.835 | 8,1 | /poliuretan-kartonpiyer-modelleri/ (334K gösterim — poz. iyileşirse patlar) |
| 2.411 | 7,4 | / (anasayfa) |
| 2.137 | 4,0 | /…rustik-dekorasyon-fikirleri…/ |
| 1.853 | 3,5 | /poliuretan-ahsap-kiris/ |
| 1.754 | 3,2 | /poliuretan-gizli-isik-led-isik-kartonpiyer/ |
| 1.545 | 4,7 | /poliuretan-sutun-modelleri/ |
| 1.400 | 5,6 | /poliuretan-gobek-modelleri/ |
| 1.171 | 1,5 | /category/kartonpiyer/alci-kartonpiyer/ |
| 1.094 | 7,5 | /poliuretan-duvar-citasi-ve-bordur-modelleri/ |

### 8.3 Çarpıcı sorgu bulguları

- "kartonpiyer modelleri" 886 tık (poz 1,6) · "kartonpiyer" 671 tık ama poz 5,8 / 113K gösterim → iyileşme alanı
- Panel ailesi çok güçlü ve poz ~1: "duvar panel modelleri" 499, "duvar paneli modelleri" 463, "tv arkası panel" 227
- **"decorpu" sorgusu 383 tık bu siteye gidiyor** → marka trafiği yanlış evde; taşıma aciliyeti kanıtı
- **"kartonpiyer dwg" 116 tık, %25 CTR** → decorpu'nun DWG indirme özelliği bu talebi birebir karşılıyor
- LED/gizli ışık ailesi: "ledli stropiyer" 105 + "led ışıklı kartonpiyer" 104 + sayfası 1.754 tık

### 8.4 decorpu kurulum önceliği (GERÇEK veriye göre revize)

1. **Kartonpiyer modelleri** mega sayfası (kategori + rehber; alçı-vs-poliüretan karşılaştırma dahil)
2. **Duvar panelleri** (decorpu'daki panel-kaplama kategorisini rehber içerikle büyüt; "tv arkası panel" alt başlık)
3. **Rustik ahşap kiriş / mertek / kütük** rehberi
4. **Gizli ışık / LED kartonpiyer** sayfası
5. **Sütun modelleri** · 6. **Tavan göbeği** · 7. **Duvar çıtası** rehberi (fiyat+uygulama dahil)
8. Şömine · söve · süpürgelik kategori metinleri

## 9. Sonraki Adımlar

1. ✅ GSC doğrulandı, 16 aylık veri alındı ve analiz edildi.
2. §8.4 sırasıyla decorpu sayfalarının üretimi → onayla başlanır.
3. Geçiş günü: sayfa-sayfa 301 (etiketler dahil) + GSC "Adres Değişikliği".
