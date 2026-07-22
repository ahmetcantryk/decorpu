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
      // Arama, yönetim, kimlik ve test sayfaları taranmasın.
      disallow: ["/admin", "/en/admin", "/giris", "/en/giris", "/ara", "/en/ara"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
