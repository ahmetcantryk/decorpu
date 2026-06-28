# polure.com — Public Catalog API Harvest

Rakip polure.com'un **public katalog API'sinden** (yanlışlıkla açık bırakılmış `/api/v1`) toplanan veri. **Yalnız iç rekabet analizi içindir; yeniden yayımlanmaz.**

## Ne toplandı (yalnız GET katalog uçları)
- `/categories` + `/categories/{slug}` → kategoriler (SEO, açıklama dahil)
- `/products` (sayfalı) + `/products/{sku}` → **807 ürün**, her biri tam detay + medya + kategori zinciri + bağlı ürün + ai_tags (tek çağrıda)
- `/translations/{tr,en}`, `/currencies`, `/menus/main`

## Toplanmadı (etik/güvenlik sınırı)
- `POST /sync/*` (polure'un canlı verisini değiştirebilir) · `/stats/dashboard` · `/settings` (özel admin verisi).

## Çıktı
| Dosya | İçerik |
|---|---|
| **`polure-catalog.xlsx`** | 3 sayfa: **Ürünler (807, 36 kolon)**, **Kategoriler (83: 27 ana + 56 alt)**, Özet |
| `products-full.json` | Ham tam veri (12 MB) — her ürün: detay + medya + kategoriler + bağlı + tags |
| `products-list.json` | Ürün listesi (sayfalı birleşik) |
| `categories.json` · `category-details.json` | Kategoriler + SEO/uzun açıklama |
| `translations-{tr,en}.json` · `currencies.json` · `menu-main.json` | Yan veriler |

## Excel — Ürünler kolonları
Kod · Başlık · Ana/Alt Kategori · Kategori Yolu · Fiyat (polure sitede gizliyor, API açık) · KDV/İndirim · En/Boy/Yükseklik/Çap (mm) · Ağırlık · Malzeme · Yoğunluk · Renk · Yüzey · Boyanabilir/İç/Dış/Su Geçirmez · Min. Sipariş · Garanti · Stok · Kullanım Alanları · Anahtar Kelimeler · Görsel Sayısı · **Ana Görsel URL** (`/a/media/{slug}/{slug}-800w.jpg` — doğrulandı 200) · Görsel Dosyaları · Ürün URL · SEO Başlık · Açıklama · Tarihler.

## Yeniden çalıştırma
```bash
cd docs/research/polure-api
npm install        # xlsx
node harvest.mjs   # API -> JSON (~830 istek, kibar concurrency=5)
node export-excel.mjs   # JSON -> polure-catalog.xlsx
```

## Notlar
- Fiyatlar API'de açık (804/807 fiyatlı) — polure storefront'ta gizli. İç analiz için.
- Görseller indirilmedi (sadece URL'ler); istenirse `harvest`'e medya indirme eklenir.
- EN içerik için ürün detay çağrısına `?lang=en` eklenebilir.
