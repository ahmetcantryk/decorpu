/**
 * Kategori kapak görseli override'ları (slug → public yol).
 *
 * DB'deki kapak, kategorideki ilk ürünün birincil görselidir (gri fon, tek parça).
 * Vitrin kartlarında ambiyanslı bir kapak istediğimiz kategoriler için buradaki
 * görsel DB kapağının önüne geçer.
 */
export const CATEGORY_COVER_OVERRIDES: Readonly<Record<string, string>> = {
  "sutun-baslik": "/catalog/sutun-baslik/cover.webp",
};

/** Override varsa onu, yoksa DB kapağını döndürür. */
export function categoryCover(slug: string, dbCover: string | null): string | null {
  return CATEGORY_COVER_OVERRIDES[slug] ?? dbCover;
}
