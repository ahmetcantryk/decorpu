import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { KARTONPIYERDEPOSU_REDIRECTS } from "./redirects-kartonpiyerdeposu";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // kartonpiyerdeposu.com bu projeye domain olarak eklendiğinde devreye girecek
  // host-koşullu 301 haritası (o güne kadar hiçbir isteği etkilemez).
  async redirects() {
    return KARTONPIYERDEPOSU_REDIRECTS;
  },
  // Repo has a second lockfile in tools/scraper; pin the workspace root to this app.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    // Görsel optimizasyonu AÇIK: tüm görseller artık Supabase Storage'da (hızlı CDN);
    // yavaş polure kaynakları kaldırıldığı için on-demand optimize güvenli. AVIF/WebP +
    // responsive boyutlandırma LCP'yi ciddi düşürür (ISR ile her boyut bir kez üretilir).
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "yrjjbbhcyyqjjcarwpak.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
};

export default withNextIntl(nextConfig);
