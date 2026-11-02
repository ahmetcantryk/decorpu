import type { MetadataRoute } from "next";
import { SITE_URL, ALLOW_INDEX } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Index kapalıyken (preview/staging) tüm botlara tamamen kapat.
  if (!ALLOW_INDEX) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Arama, yönetim, kimlik, teklif sepeti, API ve parametreli adresler taranmasın:
      // bunlar kanonik içerik değildir ve her biri sunucuda ayrı render + ISR girdisi üretir.
      disallow: [
        "/admin",
        "/en/admin",
        "/giris",
        "/en/giris",
        "/ara",
        "/en/ara",
        "/teklif",
        "/en/teklif",
        "/api/",
        "/_next/",
        "/*?",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
