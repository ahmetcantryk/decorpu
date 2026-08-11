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
    // Görsel optimizasyonu KAPALI. Vercel image transformation kotası doldu ve
    // /_next/image tüm görseller için 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED)
    // dönüyordu. Varlıklarımız zaten WebP ve önceden boyutlandırılmış olduğu için
    // dosyalar doğrudan CDN'den servis ediliyor — kota tüketmez, ücretsiz.
    // Tekrar açılacaksa önce Vercel planındaki transformation kotası artırılmalı.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "yrjjbbhcyyqjjcarwpak.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
};

export default withNextIntl(nextConfig);
