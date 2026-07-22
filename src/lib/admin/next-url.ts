/**
 * Giriş sonrası dönüş yolu (?next=) doğrulama — open-redirect koruması.
 * Yalnız site içi mutlak yollar ("/admin/..."); aksi hâlde /admin'e düşer.
 */
export function sanitizeNextPath(raw: string | null | undefined): string {
  if (!raw) return "/admin";
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("://") || raw.includes("\\")) return "/admin";
  return raw;
}
