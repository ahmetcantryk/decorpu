import type { NextConfig } from "next";

type Redirects = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>;

/**
 * kartonpiyerdeposu.com → decorpu.com sayfa-sayfa 301 haritası.
 * Kaynak: docs/research/kartonpiyerdeposu/ (GSC 16 ay gerçek trafik + tam site envanteri).
 *
 * GÜVENLİ TASARIM: Tüm kurallar `has: host = (www.)?kartonpiyerdeposu.com` koşuluna bağlı —
 * o domain bu Vercel projesine eklenene kadar HİÇBİR isteği etkilemez. Domain bağlandığı
 * an (DNS → Vercel + Domains'e ekleme) tüm eski URL'ler kalıcı (301) olarak doğru
 * decorpu sayfalarına akar. Sıra önemlidir: özel kurallar önce, genel kalıplar sonra,
 * en sonda catch-all.
 */
const HOST = [{ type: "host" as const, value: "(www\\.)?kartonpiyerdeposu\\.com" }];

const D = "https://decorpu.com";

/** Tek satırda kural üretici. */
function r(source: string, destination: string): Redirects[number] {
  return { source, destination: `${D}${destination}`, permanent: true, has: HOST };
}

export const KARTONPIYERDEPOSU_REDIRECTS: Redirects = [
  // ── En değerli sayfalar (GSC tık sırasına göre birebir hedef) ─────────────
  r("/poliuretan-duvar-panelleri", "/kategoriler/panel-kaplama"), //           4.855 tık
  r("/poliuretan-kartonpiyer-modelleri", "/kategoriler/kartonpiyer"), //       4.835 tık
  r("/poliuretan-ahsap-mertek-kiris-rustik-dekorasyon-fikirleri-rustik-tasarim", "/kategoriler/kiris"), // 2.137
  r("/poliuretan-ahsap-kiris", "/kategoriler/kiris"), //                       1.853
  r("/poliuretan-gizli-isik-led-isik-kartonpiyer", "/kategoriler/gizli-isik"), // 1.754
  r("/poliuretan-sutun-modelleri", "/kategoriler/sutun-baslik"), //            1.545
  r("/poliuretan-gobek-modelleri", "/kategoriler/gobek"), //                   1.400
  r("/poliuretan-duvar-citasi-ve-bordur-modelleri", "/kategoriler/cita-lambri"), // 1.094
  r("/somine-modelleri", "/kategoriler/somine"), //                              596
  r("/poliuretan-sove", "/kategoriler/sove"), //                                 431
  r("/poliuretan-somine-modelleri", "/kategoriler/somine"),
  r("/poliuretan-supurgelik", "/kategoriler/supurgelik"),
  r("/poliuretan-tavan-lamba-duz-gobek-modelleri", "/kategoriler/gobek"),

  // ── Kartonpiyer ailesi ────────────────────────────────────────────────────
  r("/kartonpiyer", "/kategoriler/kartonpiyer"),
  r("/kartonpiyer-istanbul", "/kategoriler/kartonpiyer"),
  r("/poliuretan-desenli-kartonpiyer-modelleri", "/kategoriler/kartonpiyer"),
  r("/poliuretan-duz-kartonpiyer-modelleri", "/kategoriler/kartonpiyer"),

  // ── Çıta ailesi ───────────────────────────────────────────────────────────
  r("/duvar-citasi", "/kategoriler/cita-lambri"),
  r("/duvar-citasi-istanbul", "/kategoriler/cita-lambri"),
  r("/istanbul-duvar-citasi", "/kategoriler/cita-lambri"),
  r("/duvar-citasi-ankara", "/kategoriler/cita-lambri"),
  r("/duvar-citasi-izmir", "/kategoriler/cita-lambri"),
  r("/duvar-citasi-kocaeli", "/kategoriler/cita-lambri"),
  r("/duvar-citasi-pendik", "/kategoriler/cita-lambri"),
  r("/4cm-duvar-citasi", "/kategoriler/cita-lambri"),
  r("/boyanabilir-poliuretan-cita", "/kategoriler/cita-lambri"),
  r("/poliuretan-boyanabilir-duvar-citasi", "/kategoriler/cita-lambri"),
  r("/poliuretan-cita-ve-cita-modelleri", "/kategoriler/cita-lambri"),
  r("/poliuretan-cita-imalatcisi", "/kategoriler/cita-lambri"),
  r("/poliuretan-duvar-cita-ve-kose-modelleri", "/kategoriler/cita-lambri"),
  r("/poluretan-cita-bordur-modelleri", "/kategoriler/cita-lambri"),
  r("/duvar-cita-kosesi", "/kategoriler/cita-lambri"),
  r("/duvar-cita-uygulama", "/kategoriler/cita-lambri"),
  r("/duvar-cita-uygulamasi", "/kategoriler/cita-lambri"),
  r("/duvar-citalama-fiyati-nedir", "/kategoriler/cita-lambri"),
  r("/kartonpiyer-duvar-citasi", "/kategoriler/cita-lambri"),
  r("/polimer-cita", "/kategoriler/cita-lambri"),
  r("/istanbul-duvar-cita-ustasi", "/hizmetler"),

  // ── Kiriş / kütük / mertek ────────────────────────────────────────────────
  r("/ahsap-gorunumlu-kiris", "/kategoriler/kiris"),
  r("/poliuretan-rustik-ahsap-kiris", "/kategoriler/kiris"),
  r("/poliuretan-kiris", "/kategoriler/kiris"),
  r("/poliuretan-kutuk", "/kategoriler/kutuk"),
  r("/poliuretan-kutuk-fiyatlari", "/kategoriler/kutuk"),
  r("/poliuretan-kutuk-imalati", "/kategoriler/kutuk"),
  r("/villa-tavan-ahsap-tavan-kaplama", "/kategoriler/kiris"),

  // ── Diğer kategoriler ─────────────────────────────────────────────────────
  r("/poliuretan-kubbe-modelleri-kubbe-fiyatlari", "/kategoriler/kubbe"),
  r("/tavan-kubbe-modelleri", "/kategoriler/kubbe"),
  r("/poliuretan-dekoratif-susleme-modelleri", "/kategoriler/susleme"),
  r("/poliuretan-duvar-susleri", "/kategoriler/susleme"),
  r("/poliuretan-payanda-modelleri", "/kategoriler/payanda"),
  r("/yatak-odasi-duvar-dekorasyonu", "/kategoriler/cita-lambri"),

  // ── Hizmet / kurumsal ────────────────────────────────────────────────────
  r("/uygulama-ve-poliuretan-montaji", "/hizmetler"),
  r("/poliuretan-uygulama-ustasi", "/hizmetler"),
  r("/dekorasyon-urunleri-imalat-satis-ve-uygulama", "/kategoriler"),
  r("/iletisim", "/iletisim"),
  r("/sepet", "/teklif"),

  // ── En çok tık alan etiketler (GSC) ──────────────────────────────────────
  r("/tag/duvar-citasi-nasil-uygulanir", "/kategoriler/cita-lambri"), // 756 tık
  r("/tag/poliuretan-kutuk", "/kategoriler/kutuk"), //                    311 tık
  r("/tag/tavan-citasi", "/kategoriler/cita-lambri"),
  r("/tag/poliuretan-duvar-citasi", "/kategoriler/cita-lambri"),
  r("/tag/ahsap-gorunumlu-kiris-fiyatlari", "/kategoriler/kiris"),
  r("/tag/duvar-citasi", "/kategoriler/cita-lambri"),

  // ── Kalıp kuralları (özel kuralların ARKASINDA kalmalı) ──────────────────
  r("/category/kartonpiyer/:path*", "/kategoriler/kartonpiyer"),
  r("/category/alci-dekorasyon-urunleri/:path*", "/kategoriler/kartonpiyer"),
  r("/category/duvar-citalari-poliuretan-duvar-citasi/:path*", "/kategoriler/cita-lambri"),
  r("/category/boyanabilir-poliuretan-cita/:path*", "/kategoriler/cita-lambri"),
  r("/category/desenli-duvar-citasi-kosesi/:path*", "/kategoriler/cita-lambri"),
  r("/category/poliuretan-mertek/:path*", "/kategoriler/mertek"),
  r("/category/poliuretan-kiris/:path*", "/kategoriler/kiris"),
  r("/category/poliuretan-kiris-ustasi/:path*", "/hizmetler"),
  r("/category/ahsap-gorunumlu-poliuretan-kutuk/:path*", "/kategoriler/kutuk"),
  r("/category/odun-gorunumlu-poliuretan-kutuk/:path*", "/kategoriler/kutuk"),
  r("/category/poliuretan-uygulama-ustasi/:path*", "/hizmetler"),
  r("/category/:path*", "/kategoriler"),
  r("/tag/:path*", "/kategoriler"),
  r("/author/:path*", "/"),

  // ── Catch-all: eşleşmeyen her şey anasayfaya (EN SONDA kalmalı) ──────────
  r("/:path*", "/"),
];
