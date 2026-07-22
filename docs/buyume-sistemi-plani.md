# DecorPU Büyüme & Operasyon Sistemi — Plan (henüz kurulmadı)

> Durum: ONAY BEKLİYOR — 2026-07-23 itibarıyla yalnızca plan; hiçbir parçası kurulmadı.
> Kurulum kararı verilince bu dosyadaki sıra takip edilir.

## Katman 1 — Görünürlük: "Pazartesi Raporu" (GSC MCP sonrası)
Haftalık tek komutla üretilen rapor (`docs/reports/`e birikir):
- 11 rehber sayfanın tıklama/pozisyon değişimi
- Gösterim alıp tıklanmayan sorgular → başlık/meta revizyon adayları
- Talep sayısı + dönüşüm oranı (ziyaret → teklif)
- Taşınma sonrası: kartonpiyerdeposu ↔ decorpu karşılaştırmalı izleme

**Ön koşul (kullanıcı, ~10 dk):** Google Cloud'da Search Console API + service account
→ JSON anahtar `C:\src\decorpu\.secrets\gsc.json` → `.mcp.json`a bağlanır.
GA4 MCP (Google resmî) aynı service account ile 2 dk'lık ek.

## Katman 2 — Otomasyon (kod tarafı, MCP gerekmez)
- **Günlük talep özeti maili**: Vercel Cron (`/api/cron/daily-digest`, vercel.json schedule)
  → her sabah okunmamış + dünkü taleplerin özeti info@decorpu.com'a (Resend altyapısı hazır)
- **Haftalık site sağlık kontrolü**: sitemap/llms.txt/301 testleri, kırıksa uyarı maili
- İleride: 24 saat yanıtsız "Yeni" talebe SLA uyarısı

## Katman 3 — SEO büyüme döngüsü (aylık ritim)
1. GSC verisinden düşük CTR'lı sayfalar → başlık/meta revizyonu
2. Yeni içerik kararları: şehir sayfaları (İstanbul öncelik) + fiyat landing'leri — TAŞINMA SONRASI
3. Rehberlerin EN sürümleri (ihracat hedeflenirse)

## Katman 4 — Operasyon: admin'in CRM'leşmesi
- **Teklif PDF üretici** (en yüksek etki): talepteki ürün kodlarından tek tıkla markalı,
  görselli teklif dokümanı → müşteriye gönderim. Teklif hazırlama süresini dakikalara indirir.
- Talep satırından tek tık WhatsApp açma
- Stok Takip modülünü aktifleştirme (kod hazır; menüdeki "Yakında" kaldırılır) + QR etiket düzeni

## Uygulama sırası (onaylanınca)
| # | İş | Sahibi | Efor |
|---|---|--------|------|
| 1 | Günlük talep özeti maili | asistan | ~30 dk |
| 2 | GSC MCP kurulumu | kullanıcı | 10 dk |
| 3 | İlk Pazartesi Raporu + CTR döngüsü | asistan | MCP sonrası |
| 4 | Teklif PDF üretici | asistan | yarım gün |
| 5 | Taşınma (analiz §9 runbook) + şehir/fiyat sayfaları | birlikte | rehber indexlenince (~2-4 hafta) |

İlgili belgeler: `docs/research/kartonpiyerdeposu/analiz.md` (taşınma) · `docs/stok-takip-plan.md` (stok Faz 2-3).
