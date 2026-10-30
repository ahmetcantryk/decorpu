/** FormData okuma yardımcıları — hizmet/proje server action'larında ortak. */

export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function readNum(v: FormDataEntryValue | null): number | null {
  if (v === null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function readStr(v: FormDataEntryValue | null): string | null {
  const s = (v ?? "").toString().trim();
  return s === "" || s === "none" ? null : s;
}

export function readBool(fd: FormData, key: string): boolean {
  return fd.get(key) === "on" || fd.get(key) === "true";
}

/** Aynı isimli tekrarlanan alanları (ör. `product_ids`) tekilleştirerek döndürür. */
export function readList(fd: FormData, key: string): string[] {
  const values = fd
    .getAll(key)
    .map((v) => v.toString().trim())
    .filter((v) => v !== "");
  return Array.from(new Set(values));
}

export function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : "Beklenmeyen hata";
}
