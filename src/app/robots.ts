import type { MetadataRoute } from "next";

const BASE = "https://decorpu.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Arama, yönetim, kimlik ve test sayfaları taranmasın.
      disallow: ["/admin", "/en/admin", "/giris", "/en/giris", "/ara", "/en/ara", "/test", "/test2", "/en/test", "/en/test2"],
    },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
