import type { Locale } from "@/i18n/routing";

/** Line-art glyph identifiers (see components/illustrations/CategoryGlyph.tsx). */
export type GlyphId =
  | "jamb"
  | "column"
  | "arch"
  | "cornice"
  | "ceiling-rose"
  | "dome"
  | "crown"
  | "moulding"
  | "panel"
  | "corbel"
  | "beam"
  | "ornament"
  | "frame"
  | "skirting"
  | "fireplace"
  | "balustrade"
  | "facade"
  | "adhesive";

export interface SubCategory {
  slug: string;
  tr: string;
  en: string;
}

export interface Category {
  slug: string;
  tr: string;
  en: string;
  glyph: GlyphId;
  children?: SubCategory[];
}

/**
 * DECORPU kanonik kategori ağacı (18 parent) — Faz 0 sentezi.
 * Kaynak: docs/research/competitor-analysis.md §3. DB seed'i Faz 2'de buradan türetilir.
 */
export const CATEGORIES: readonly Category[] = [
  {
    slug: "sove",
    tr: "Söve",
    en: "Jamb",
    glyph: "jamb",
    children: [
      { slug: "pencere-sove", tr: "Pencere Söve", en: "Window Jamb" },
      { slug: "denizlik", tr: "Denizlik", en: "Sill" },
    ],
  },
  {
    slug: "sutun-baslik",
    tr: "Sütun & Başlık",
    en: "Column & Capital",
    glyph: "column",
    children: [
      { slug: "pilaster", tr: "Pilaster", en: "Pilaster" },
      { slug: "kisa-roma-sutun", tr: "Kısa Roma Sütun", en: "Short Roman Column" },
      { slug: "baslik", tr: "Başlık", en: "Capital" },
    ],
  },
  { slug: "kemer", tr: "Kemer", en: "Arch", glyph: "arch" },
  {
    slug: "kartonpiyer",
    tr: "Kartonpiyer",
    en: "Cornice",
    glyph: "cornice",
    children: [
      { slug: "kat-silmesi", tr: "Kat Silmesi", en: "String Course" },
      { slug: "bordur", tr: "Bordür", en: "Border" },
      { slug: "gizli-isik", tr: "Gizli Işık", en: "Cove Lighting" },
    ],
  },
  { slug: "gobek", tr: "Göbek", en: "Ceiling Rose", glyph: "ceiling-rose" },
  { slug: "kubbe", tr: "Kubbe", en: "Dome", glyph: "dome" },
  { slug: "tac", tr: "Taç", en: "Crown · Pediment", glyph: "crown" },
  {
    slug: "cita-lambri",
    tr: "Çıta & Lambri",
    en: "Wall Moulding",
    glyph: "moulding",
    children: [{ slug: "cita-kose", tr: "Çıta Köşe", en: "Moulding Corner" }],
  },
  { slug: "panel-kaplama", tr: "Panel Kaplama", en: "3D Wall Panel", glyph: "panel" },
  { slug: "payanda", tr: "Payanda", en: "Bracket · Corbel", glyph: "corbel" },
  {
    slug: "kiris",
    tr: "Kiriş",
    en: "Beam",
    glyph: "beam",
    children: [
      { slug: "mertek", tr: "Mertek", en: "Rafter" },
      { slug: "kutuk", tr: "Kütük", en: "Faux Timber" },
    ],
  },
  {
    slug: "susleme",
    tr: "Süsleme",
    en: "Decorative Ornament",
    glyph: "ornament",
    children: [
      { slug: "aplik", tr: "Aplik", en: "Appliqué" },
      { slug: "nis", tr: "Niş", en: "Niche" },
      { slug: "rozet", tr: "Rozet", en: "Rosette" },
    ],
  },
  { slug: "cerceve-pervaz", tr: "Çerçeve & Pervaz", en: "Frame · Architrave", glyph: "frame" },
  { slug: "supurgelik", tr: "Süpürgelik", en: "Skirting", glyph: "skirting" },
  { slug: "somine", tr: "Şömine", en: "Fireplace Surround", glyph: "fireplace" },
  { slug: "kupeste-balustr", tr: "Küpeşte & Babadstrol", en: "Balustrade", glyph: "balustrade" },
  { slug: "prekast-dis-cephe", tr: "Prekast Dış Cephe", en: "Precast Facade", glyph: "facade" },
  { slug: "yapistirici-aksesuar", tr: "Yapıştırıcı & Aksesuar", en: "Adhesives & Tools", glyph: "adhesive" },
];

/** Localized display name for a category or subcategory. */
export function categoryName(item: { tr: string; en: string }, locale: Locale): string {
  return locale === "en" ? item.en : item.tr;
}
