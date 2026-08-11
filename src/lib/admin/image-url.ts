/** Görsel adresi doğrulama — hem formda uyarı, hem server action'da kesin kontrol. */

const IMAGE_EXT = /\.(webp|jpg|jpeg|png|avif|svg)$/i;

function supabaseStorageOrigin(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

/**
 * Kabul edilenler:
 *  - site içi yol: `/catalog/kartonpiyer/0.webp`
 *  - Supabase Storage public adresi: `https://<proje>.supabase.co/storage/v1/object/public/...`
 *
 * Dış alan adları ve `javascript:`/`data:` gibi şemalar reddedilir.
 */
export function isAllowedImageUrl(value: string): boolean {
  const v = value.trim();
  if (!v) return false;

  if (v.startsWith("/")) {
    return !v.startsWith("//") && !v.includes("..") && IMAGE_EXT.test(v.split("?")[0]);
  }

  const origin = supabaseStorageOrigin();
  if (!origin) return false;
  try {
    const parsed = new URL(v);
    return parsed.origin === origin && parsed.pathname.startsWith("/storage/v1/object/public/");
  } catch {
    return false;
  }
}
