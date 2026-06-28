import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

/** Kanonik site adresi — env ile override edilebilir (ör. Vercel preview domaini). */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://decorpu.com";

/**
 * Arama motoru indexlemesi. Varsayılan: KAPALI (noindex) — preview/staging
 * yanlışlıkla indexlenmesin. Gerçek domainde açmak için NEXT_PUBLIC_ALLOW_INDEX=true.
 */
export const ALLOW_INDEX = process.env.NEXT_PUBLIC_ALLOW_INDEX === "true";

/**
 * Meta description'ı SEO sınırına göre kelime sonunda kırpar (~155 karakter).
 * Boşlukları normalize eder; sınırı aşıyorsa son tam kelimeden keser ve "…" ekler.
 */
export function clampDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/** Başlığı marka eki (" · decorpu", ~11 krk) ile birlikte ~60 krk sınırında tutmak için kırpar. */
export function clampTitle(text: string, max = 48): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Bir yol için locale-aware canonical + hreflang alternatifleri.
 * TR prefixsiz ("/x"), EN "/en/x". x-default → TR.
 */
export function localizedAlternates(
  locale: Locale,
  path: string,
): { canonical: string; languages: Record<string, string> } {
  const tr = path || "/";
  const en = `/en${path}`;
  return {
    canonical: locale === "en" ? en : tr,
    languages: { tr, en, "x-default": tr },
  };
}

const PHONE_E164 = SITE.phoneHref.replace("tel:", "");

/** Organization + LocalBusiness + WebSite tek @graph olarak — anasayfada kullanılır. */
export function siteGraphSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "DecorPU",
        url: SITE_URL,
        logo: `${SITE_URL}/placeholder.svg`,
        email: SITE.email,
        telephone: PHONE_E164,
        sameAs: [SITE.whatsapp],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: "DecorPU — Poliüretan Söve İmalat Sanayii",
        url: SITE_URL,
        telephone: PHONE_E164,
        email: SITE.email,
        image: `${SITE_URL}/placeholder.svg`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Şifa Mah. Cihangir Sk. No:19",
          addressLocality: "Tuzla",
          addressRegion: "İstanbul",
          postalCode: "34950",
          addressCountry: "TR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 40.827333,
          longitude: 29.35265,
        },
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "DecorPU",
        inLanguage: ["tr", "en"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}

/** Ürün/kategori/sayfa için BreadcrumbList şeması. */
export function breadcrumbSchema(items: { name: string; path?: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
    })),
  };
}
