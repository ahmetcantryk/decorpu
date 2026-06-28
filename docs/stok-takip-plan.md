# DecorPU — QR Kodlu Stok Takip Sistemi · Sistem Planı

> İmalathane (workshop) için, mevcut admin paneline entegre, QR kodlu stok/envanter
> takip modülü. Mevcut stack ile uyumlu: Next.js 16 (App Router) · Supabase (Postgres + RLS) ·
> server actions · Tailwind. Mobil-öncelikli (telefonla QR okutma).

---

## 0. Kilitli MVP Kapsamı (kullanıcı kararı)

| Karar | Seçim | Etkisi |
|-------|-------|--------|
| Takip | **Sadece bitmiş ürün** | Hammadde yok; `products` = stok kataloğu |
| Lokasyon | **Tek depo** | `stock_locations` tablosu YOK; ürün başına tek `stock_qty`. Transfer hareketi yok |
| QR hedefi | **Ürüne** | QR = ürün koduna derin link (`/admin/stok/urun/[code]`) |
| Erişim | **Tek admin girişi** | Mevcut staff auth; ayrı çalışan rolü yok (sonra eklenebilir) |

**Bu kararlarla sadeleşen veri modeli (Faz 1):**
```sql
alter table products add column track_stock boolean not null default false;
alter table products add column unit text not null default 'adet';     -- adet | metre | kutu
alter table products add column min_level numeric not null default 0;   -- kritik seviye
alter table products add column stock_qty numeric not null default 0;   -- anlık stok (tek depo)

create table stock_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  type text not null,                 -- in | out | adjust
  quantity numeric not null,          -- adjust'ta hedef mutlak değer
  reason text, note text, ref text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);
create index on stock_movements (product_id, created_at desc);
```
`apply_stock_movement(product, type, qty, reason, note, ref)` RPC: hareketi yazar + `products.stock_qty`'yi atomik günceller (in:+, out:−, adjust:=). RLS: `stock_movements` + stok kolonları yazma **sadece authenticated**.

**Admin sayfaları (Faz 1, sadeleşmiş):** `/admin/stok` (panel) · `/admin/stok/liste` · `/admin/stok/urun/[code]` (QR + geçmiş + hızlı işlem) · `/admin/stok/hareket` (giriş/çıkış/sayım). Lokasyon ve transfer sayfaları yok.

---

## 1. Hedef ve Kapsam

İmalathanede üretilen poliüretan ürünlerin (söve, kartonpiyer, sütun, vb.) **anlık stok
miktarını**, **nerede olduğunu** ve **giriş/çıkış hareketlerini** takip etmek. Çalışan,
telefonuyla rafdaki/ürünündeki QR'ı okutup saniyeler içinde stok girişi/çıkışı yapabilsin;
yönetici panelden anlık stoğu, kritik seviye uyarılarını ve hareket geçmişini görsün.

**MVP'de var:** bitmiş ürün stoğu, çoklu lokasyon (depo/raf), giriş-çıkış-transfer-sayım
hareketleri, kritik seviye uyarısı, QR etiket üret/yazdır, telefonla QR okutma.
**Sonraki fazlar:** parti/lot takibi, hammadde + reçete (BOM), üretim emirleri, çalışan
rolleri, dışa aktarım/raporlama, barkod desteği.

---

## 2. İhtiyaç Analizi

### Aktörler
- **Yönetici:** stok görünürlüğü, ayarlar, raporlar, lokasyon/ürün yönetimi.
- **Depo/imalat çalışanı:** telefonla QR okutup hızlı giriş/çıkış, sayım.

### Takip edilen "stoklu öğe"
Mevcut `products` tablosu (140 PU ürünü) **stok öğesi kataloğudur**. Her ürün için
`stok takibi açık/kapalı`, `birim` (adet / metre / kutu), `kritik seviye` tanımlanır.

### Lokasyonlar
Depo, raf, üretim alanı, sevkiyat gibi yerler. Stok her zaman **bir ürün + bir lokasyon**
çiftinde tutulur (aynı ürün birden çok rafta olabilir).

### Hareket tipleri
| Tip | Açıklama | Etki |
|-----|----------|------|
| **GİRİŞ** (in) | Üretim/satın alma sonrası stok ekleme | +miktar (hedef lokasyon) |
| **ÇIKIŞ** (out) | Sevkiyat/satış/fire | −miktar (kaynak lokasyon) |
| **TRANSFER** | Lokasyonlar arası taşıma | −kaynak, +hedef |
| **SAYIM/DÜZELTME** (adjust) | Fiziksel sayım farkı | miktarı mutlak değere set eder |

### Temel kurallar
- Anlık stok = **hareket defterinden** (ledger) türetilir → tam denetlenebilir, geçmiş kaybolmaz.
- Negatif stok engellenir (ayarla esnetilebilir).
- Her hareket: kim, ne zaman, ne kadar, neden, hangi lokasyon, opsiyonel referans (sevk/teklif no).
- Kritik seviyenin altına düşen ürünler "uyarı" rozetiyle listelenir.

---

## 3. QR Kod Tasarımı

### Ne QR alır?
İki boyut da desteklenir, MVP'de **(A) ürün QR** önceliklidir:

- **(A) Ürün QR'ı** — her ürün koduna bir QR (etiket olarak ürüne/raf kartına yapıştırılır).
  İçerik: ürünün admin stok sayfasına **derin link**.
  `https://decorpu.com/admin/stok/urun/PU-1024`
- **(B) Lokasyon QR'ı** — her raf/bölge için QR. Önce lokasyonu okut, sonra ürünleri.
  `https://decorpu.com/admin/stok/lokasyon/RAF-A3`

### Okutma akışı
1. Çalışan admin'de **"QR Tara"** sayfasını açar (telefon tarayıcısı, kameraya izin).
2. QR okunur → ilgili ürün/lokasyon ekranı açılır.
3. Hızlı butonlar: **+ Giriş**, **− Çıkış**, **Transfer**, **Sayım** → miktar gir → kaydet.
4. Giriş yapılı değilse login'e yönlendirir, sonra aynı sayfaya döner (deep link korunur).

> Not: QR içeriği "anlamlı URL" olduğu için herhangi bir telefon kamerası/QR uygulaması da
> okuyup tarayıcıda açabilir; ayrı uygulama indirmeye gerek yok (PWA mantığı).

---

## 4. Veri Modeli (Supabase / Postgres)

```sql
-- Lokasyonlar (depo, raf, üretim, sevkiyat)
create table stock_locations (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,            -- "RAF-A3", "DEPO-1"
  name text not null,
  kind text not null default 'shelf',   -- warehouse | shelf | production | shipping
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Ürün başına stok ayarları (products tablosunu genişletir)
alter table products add column track_stock boolean not null default false;
alter table products add column unit text not null default 'adet';   -- adet | metre | kutu
alter table products add column min_level numeric not null default 0; -- kritik seviye

-- Anlık stok: ürün + lokasyon (hareketlerden beslenir/senkron tutulur)
create table inventory (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  location_id uuid not null references stock_locations(id) on delete restrict,
  quantity numeric not null default 0,
  updated_at timestamptz not null default now(),
  unique (product_id, location_id)
);

-- Hareket defteri (ledger) — tüm değişikliklerin denetlenebilir kaydı
create table stock_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  type text not null,                   -- in | out | transfer | adjust
  quantity numeric not null,            -- adjust'ta hedef mutlak değer
  from_location_id uuid references stock_locations(id),
  to_location_id uuid references stock_locations(id),
  reason text,                          -- üretim | satış | fire | sayım | iade ...
  note text,
  ref text,                             -- sevk/teklif no vb.
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create index on inventory (product_id);
create index on stock_movements (product_id, created_at desc);
```

### Bütünlük: tek RPC ile atomik hareket
Hareket eklemek + `inventory`'yi güncellemek **tek transaction**'da olmalı. Postgres fonksiyonu:

```sql
create or replace function apply_stock_movement(
  p_product uuid, p_type text, p_qty numeric,
  p_from uuid, p_to uuid, p_reason text, p_note text, p_ref text
) returns void language plpgsql security definer as $$
begin
  insert into stock_movements(product_id,type,quantity,from_location_id,to_location_id,reason,note,ref,created_by)
  values (p_product,p_type,p_qty,p_from,p_to,p_reason,p_note,p_ref,auth.uid());

  if p_type in ('in') then
    insert into inventory(product_id,location_id,quantity) values (p_product,p_to,p_qty)
    on conflict (product_id,location_id) do update set quantity = inventory.quantity + p_qty, updated_at = now();
  elsif p_type in ('out') then
    update inventory set quantity = quantity - p_qty, updated_at = now()
      where product_id=p_product and location_id=p_from;
  elsif p_type = 'transfer' then
    update inventory set quantity = quantity - p_qty, updated_at = now() where product_id=p_product and location_id=p_from;
    insert into inventory(product_id,location_id,quantity) values (p_product,p_to,p_qty)
      on conflict (product_id,location_id) do update set quantity = inventory.quantity + p_qty, updated_at = now();
  elsif p_type = 'adjust' then
    insert into inventory(product_id,location_id,quantity) values (p_product,p_to,p_qty)
      on conflict (product_id,location_id) do update set quantity = p_qty, updated_at = now();
  end if;
end; $$;
```

### RLS (güvenlik)
- `stock_locations`, `inventory`, `stock_movements`: **sadece authenticated (staff) okuma+yazma**.
  (Katalog `products` herkese açık kalır; stok tabloları kapalı.)
- `apply_stock_movement` `security definer` ama içeride `auth.uid()` ile kim yaptığı loglanır;
  yalnız authenticated çağırabilir (RLS + revoke from anon).

---

## 5. Admin Panel — "Stok Takip" Modülü

`AdminSidebar`'a yeni grup: **Stok Takip** (ikon: `Boxes`/`Warehouse`). Alt sayfalar:

```
/admin/stok                 → Stok Paneli (özet)
/admin/stok/liste           → Tüm ürün stokları (tablo)
/admin/stok/urun/[code]     → Ürün stok detayı (+ QR + hareket geçmişi + hızlı işlem)
/admin/stok/hareket         → Hareket girişi (manuel: giriş/çıkış/transfer/sayım)
/admin/stok/tara            → QR Tara (kamera tarayıcı, mobil)
/admin/stok/lokasyonlar     → Lokasyon yönetimi
/admin/stok/etiketler       → QR etiket üret/yazdır (toplu)
/admin/stok/raporlar        → Hareket raporu, kritik stok, stok değeri (Faz 2)
```

### Ekran detayları
- **Stok Paneli:** toplam SKU, toplam birim, **kritik seviye altı ürün sayısı/listesi**,
  son 10 hareket, lokasyon bazlı doluluk. (Mevcut `DashboardCharts` stiliyle uyumlu kartlar.)
- **Stok Listesi:** ürün adı/kodu/görseli, **toplam stok**, lokasyon kırılımı, birim,
  kritik seviye, durum rozeti (Yeterli / Az / Tükendi). Arama + kategori filtresi + "sadece kritik".
- **Ürün Stok Detayı:** anlık stok (lokasyon bazlı), **büyük QR + "Etiket Yazdır"**,
  hızlı işlem butonları (popup'ta miktar), hareket geçmişi tablosu.
- **Hareket Girişi:** ürün seç (kod arama) → tip → miktar → lokasyon(lar) → neden/not → kaydet.
  (Mevcut popup/onay UI desenini kullanır.)
- **QR Tara:** kamera açılır, QR okununca otomatik ürün detayına/hızlı işleme geçer.
- **Lokasyonlar:** CRUD (kod, ad, tip).
- **Etiketler:** seçili ürünler için yazdırılabilir A4 etiket sayfası (QR + kod + ad + ölçü);
  `@media print` ile temiz çıktı.

---

## 6. Mobil QR Tarama Yaklaşımı

- Ayrı mobil uygulama **yok**: admin zaten web; `/admin/stok/tara` telefon tarayıcısında çalışır.
- Kamera ile okuma için kütüphane: **`@zxing/browser`** (geniş uyum) veya **`html5-qrcode`**;
  modern Android Chrome'da native **`BarcodeDetector`** ile hızlandırma (varsa) + kütüphane fallback.
- İzin akışı: `getUserMedia` kamera izni → arka kamera (`facingMode: environment`).
- İsteğe bağlı **PWA**: admin'i "ana ekrana ekle" yapıp tam ekran imalat modu (manifest mevcut,
  admin'e özel kısayol eklenebilir).

---

## 7. QR Etiket Üretimi

- Üretim (server): **`qrcode`** npm paketi ile SVG/PNG; veya `qrcode.react` (client).
- Etiket içeriği: QR (deep link) + ürün kodu (mono) + kısa ad + ölçü. Raf kartı veya ürün etiketi.
- Toplu yazdırma: ürün seç → etiket grid'i → tarayıcı yazdır (PDF/A4). Termal yazıcı uyumu (58/80mm) Faz 2.

---

## 8. Roller ve Güvenlik

- MVP: mevcut **staff (authenticated)** girişi yeterli; tüm stok işlemleri staff'a açık.
- Faz 2: `depo` rolü (yalnız stok modülü; ürün/kategori düzenleyemez) — `profiles.role` + RLS.
- Tüm hareketler `created_by` ile loglanır (kim yaptı denetimi).
- Negatif stok ve yetkisiz çağrı RPC + RLS düzeyinde engellenir.

---

## 9. Teknoloji / Kütüphaneler (kurulacak)

> npm kurulumlarını **sen** yapacaksın (ben sunucu/komut çalıştırmıyorum).

| İhtiyaç | Paket | Not |
|---------|-------|-----|
| QR üretimi | `qrcode` (+ `@types/qrcode`) | server-side SVG/PNG |
| QR okuma | `@zxing/browser` **veya** `html5-qrcode` | kamera tarayıcı |
| (mevcut) | Supabase, Tailwind, lucide-react | yeni paket yok |

---

## 10. Yol Haritası (Fazlar)

**Faz 1 — MVP (çekirdek stok + QR temel):**
1. Migration: `stock_locations`, `inventory`, `stock_movements`, `products` alanları, `apply_stock_movement` RPC, RLS.
2. Server actions (`src/lib/stock/actions.ts`): hareket uygula, lokasyon CRUD, stok sorgu.
3. Admin sayfaları: Panel, Liste, Ürün Detayı, Hareket Girişi, Lokasyonlar.
4. QR: etiket üretimi + yazdırma; `/admin/stok/urun/[code]` deep link.
5. Kritik seviye uyarıları.

**Faz 2 — Mobil tarama + raporlar:**
6. `/admin/stok/tara` kamera tarayıcı + okutunca hızlı giriş/çıkış.
7. Raporlar (hareket/kritik/stok değeri), CSV dışa aktarım.
8. PWA imalat modu kısayolu.

**Faz 3 — İleri imalat:**
9. Parti/lot + son kullanım, hammadde + reçete (BOM), üretim emirleri, `depo` rolü, barkod/termal etiket.

---

## 11. Karar Bekleyen Sorular (senden)

1. **Sadece bitmiş ürün** mü, **hammadde** de takip edilecek mi? (MVP: bitmiş ürün)
2. **Çoklu lokasyon** gerekli mi, yoksa tek depo mu yeterli? (MVP: çoklu lokasyon hazır)
3. **Parti/lot** takibi gerekiyor mu? (Faz 3 öneriliyor)
4. **Birim**: hep "adet" mi, yoksa metre/kutu da olacak mı?
5. **Çalışanlara ayrı (kısıtlı) giriş** gerekli mi, yoksa tek admin yeterli mi?
6. QR'ı **ürüne mi**, **rafa mı**, **ikisine de mi** basacaksın? (MVP: ürün QR'ı)
7. Yazdırma: normal A4 mi, **termal etiket yazıcısı** mı?

---

*Hazırlayan: proje asistanı · Bu plan onaylanınca Faz 1 migration + admin sayfaları ile başlanır.*
