/**
 * Herkese açık adreslerde kullanılan parametrelerin biçim kuralları.
 * Hem panelde kayıt sırasında hem de sayfalarda DB'ye gitmeden önce doğrulanır;
 * biçime uymayan istekler (bot taramaları, bozuk linkler) sorgu ve ISR girdisi
 * üretmeden 404 alır.
 */

/** Ürün kodu (`/urun/<kod>`): harf/rakam ile başlar; nokta, alt çizgi, tire. */
export const PRODUCT_CODE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

/** Kategori / çalışma / hizmet slug'ı (`/kategoriler/<slug>`): küçük harf, rakam, tire. */
export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Ürün kodunun adres çubuğundaki kanonik hali (sitemap ve linklerle aynı). */
export function canonicalProductPath(code: string): string {
  return code.toLowerCase();
}

export function isValidProductCode(code: string): boolean {
  return code.length <= 64 && PRODUCT_CODE_PATTERN.test(code);
}

export function isValidSlug(slug: string): boolean {
  return slug.length <= 96 && SLUG_PATTERN.test(slug);
}
