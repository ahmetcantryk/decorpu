import { CATEGORIES, type Category, type GlyphId } from "@/lib/taxonomy";
import { getAllCategories } from "@/lib/catalog";

const DEFAULT_GLYPH: GlyphId = "ornament";
const glyphBySlug = new Map<string, GlyphId>(CATEGORIES.map((c) => [c.slug, c.glyph]));

/**
 * Menü/footer için panelden yönetilen kategori ağacı (DB). Yeni ana kategoriler
 * otomatik görünür; bilinmeyen slug'lar varsayılan glyph alır. DB'ye
 * ulaşılamazsa statik taksonomiye düşer — menü asla boş kalmaz.
 */
export async function getNavCategories(): Promise<Category[]> {
  try {
    const all = await getAllCategories();
    if (!all.length) return [...CATEGORIES];
    return all
      .filter((c) => !c.parent_id)
      .map((p) => ({
        slug: p.slug,
        tr: p.name_tr,
        en: p.name_en ?? p.name_tr,
        glyph: glyphBySlug.get(p.slug) ?? DEFAULT_GLYPH,
        children: all
          .filter((c) => c.parent_id === p.id)
          .map((c) => ({ slug: c.slug, tr: c.name_tr, en: c.name_en ?? c.name_tr })),
      }));
  } catch {
    return [...CATEGORIES];
  }
}
