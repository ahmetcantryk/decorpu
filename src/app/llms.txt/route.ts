import { getCategoryTree } from "@/lib/catalog";
import { getServices } from "@/lib/services";
import { SITE_URL } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

/**
 * /llms.txt — llmstxt.org spesifikasyonu (Lighthouse "Agentic Browsing" uyumlu):
 * H1 + tek satır özet (blockquote) + bölüm başlıkları altında açıklamalı linkler.
 * SADECE kök dizinde servis edilir; sayfa başına kopya gerekmez.
 */
export async function GET(): Promise<Response> {
  const [tree, services] = await Promise.all([getCategoryTree(), getServices()]);

  const cats = tree
    .map((c) => {
      const count = c.productCount > 0 ? `${c.productCount} ürün` : "talep üzerine üretim";
      return `- [${c.name_tr}](${SITE_URL}/kategoriler/${c.slug}): Poliüretan ${c.name_tr.toLowerCase()} modelleri (${count})`;
    })
    .join("\n");

  const svc = services
    .map((s) => `- [${s.title}](${SITE_URL}/hizmetler/${s.slug})${s.summary ? `: ${s.summary}` : ""}`)
    .join("\n");

  const md = `# DecorPU

> DecorPU, mimarlara yönelik proje bazlı poliüretan mimari dekorasyon üreticisidir (söve, kartonpiyer, sütun, kemer, kubbe vb.). Fiyat listesi yerine ürün kodlarıyla teklif toplanır; üretim İstanbul Tuzla'daki imalathanede yapılır.

Site Türkçe (varsayılan) ve İngilizce (/en) yayındadır. Ürünler benzersiz kodlarla anılır (ör. PU-1024) ve ürün sayfaları /urun/<kod> adresindedir. Ajanlar için WebMCP araçları kayıtlıdır: search_products (katalog araması) ve request_quote (teklif talebi).

## Ana Sayfalar

- [Kategoriler](${SITE_URL}/kategoriler): 18 ana ürün kategorisinin tamamı
- [Çalışmalarımız](${SITE_URL}/calismalarimiz): Referans projeler ve kullanılan ürünler
- [Hizmetler](${SITE_URL}/hizmetler): Keşif, 3D modelleme, montaj ve özel üretim hizmetleri
- [Teklif Sepeti](${SITE_URL}/teklif): Ürün kodlarıyla toplu fiyat teklifi talebi
- [İletişim](${SITE_URL}/iletisim): Telefon ${SITE.phoneDisplay}, adres ve harita
- [Ürün Arama](${SITE_URL}/ara): Kod veya adla katalog araması

## Kategoriler

${cats}

## Hizmetler

${svc}

## Dokümanlar

- [Ürün Kataloğu (PDF)](${SITE_URL}${SITE.downloads.catalogPdf}): Tüm modellerin görselli kataloğu
- [Teknik Çizimler (DWG)](${SITE_URL}${SITE.downloads.dwg}): Mimarlar için AutoCAD çizim paketi

## Optional

- [English Home](${SITE_URL}/en): English version of the site
- [KVKK Aydınlatma Metni](${SITE_URL}/kvkk)
- [Gizlilik Politikası](${SITE_URL}/gizlilik)
- [Çerez Politikası](${SITE_URL}/cerez-politikasi)
`;

  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
