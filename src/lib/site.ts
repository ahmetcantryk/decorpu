/** Central site/contact configuration. */
export const SITE = {
  name: "DecorPU",
  phoneDisplay: "0531 088 33 93",
  phoneHref: "tel:+905310883393",
  whatsapp: "https://wa.me/905310883393",
  email: "info@decorpu.com",
  emailHref: "mailto:info@decorpu.com",
  address: "Şifa, Cihangir Sk. No:19, 34950 Tuzla/İstanbul",
  // Google Maps embed — Decorpu Poliüretan Söve İmalat Sanayii (Tuzla)
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.028712199771!2d29.352649999999993!3d40.827333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cadf38918003b5%3A0xd6523f70a0291773!2sDecorpu%20Poliuretan%20S%C3%B6ve%20%C4%B0malat%20Sanayii!5e0!3m2!1str!2str!4v1782574396210!5m2!1str!2str",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Decorpu+Poliuretan+S%C3%B6ve+%C4%B0malat+Sanayii+Tuzla",
  // Mimarlar için indirilebilir dosyalar (public/downloads/)
  downloads: {
    catalogPdf: "/downloads/decorpu-katalog.pdf",
    dwg: "/downloads/decorpu-teknik-cizimler.dwg",
  },
} as const;
