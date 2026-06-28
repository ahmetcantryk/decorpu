/** Sayıyı TR biçiminde gösterir: 12552 → "12.552", 12552.5 → "12.552,5". */
export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "0";
  return new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 }).format(n);
}
