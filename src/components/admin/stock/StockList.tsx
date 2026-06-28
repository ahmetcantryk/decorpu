"use client";

import { useState, useMemo, type ReactElement } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { StockBadge } from "./StockBadge";
import { MovementDialog } from "./MovementDialog";
import { formatNumber } from "@/lib/format";
import type { StockRow } from "@/lib/stock/queries";
import { cn } from "@/lib/utils";

interface Props {
  rows: StockRow[];
  /** true: kart içi Giriş/Çıkış/Sayım (hareket girişi ekranı). */
  quick?: boolean;
}

export function StockList({ rows, quick = false }: Props): ReactElement {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [onlyAlerts, setOnlyAlerts] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(rows.map((r) => r.category).filter((c): c is string => Boolean(c)))).sort((a, b) => a.localeCompare(b, "tr")),
    [rows],
  );

  const filtered = rows.filter((r) => {
    if (onlyAlerts && r.status === "ok") return false;
    if (cat && r.category !== cat) return false;
    if (q) {
      const s = q.toLowerCase();
      if (!r.code.toLowerCase().includes(s) && !r.name_tr.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  return (
    <div>
      {/* Filtreler — mobil dostu */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Kod veya ürün adı ara…"
            inputMode="search"
            className="h-12 w-full rounded-lg border border-line bg-surface pl-9 pr-3 text-base text-ink outline-none transition-colors focus:border-accent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-accent"
          >
            <option value="">Tüm kategoriler</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setOnlyAlerts((v) => !v)}
            className={cn(
              "h-11 shrink-0 rounded-lg border px-4 text-sm font-medium transition-colors",
              onlyAlerts ? "border-accent bg-accent/5 text-accent" : "border-line text-ink-soft",
            )}
          >
            Kritik
          </button>
        </div>
      </div>

      {/* Kart listesi */}
      <ul className="mt-3 space-y-2">
        {filtered.map((r) => (
          <li key={r.id} className="rounded-xl border border-line bg-surface p-3">
            <div className="flex items-center gap-3">
              <Link href={`/admin/stok/urun/${r.code}`} className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-bg-subtle">
                {r.image ? <Image src={r.image} alt="" fill sizes="48px" className="object-cover" /> : null}
              </Link>
              <Link href={`/admin/stok/urun/${r.code}`} className="min-w-0 flex-1">
                <span className="font-mono text-xs text-accent">{r.code}</span>
                <span className="block truncate text-sm font-medium text-ink">{r.name_tr}</span>
                {r.category ? <span className="block truncate text-xs text-muted">{r.category}</span> : null}
              </Link>
              <div className="shrink-0 text-right">
                <div className="text-lg font-semibold tabular-nums leading-none">{formatNumber(r.stock_qty)}</div>
                <div className="mt-0.5 text-[11px] text-muted">{r.unit}</div>
              </div>
              <StockBadge status={r.status} />
            </div>
            {quick ? (
              <div className="mt-2.5 border-t border-line pt-2.5">
                <MovementDialog productId={r.id} productName={r.name_tr} unit={r.unit} currentQty={r.stock_qty} />
              </div>
            ) : null}
          </li>
        ))}
        {!filtered.length ? (
          <li className="rounded-xl border border-dashed border-line py-12 text-center text-sm text-muted">Sonuç yok.</li>
        ) : null}
      </ul>
      <p className="mt-2 text-xs text-muted">{formatNumber(filtered.length)} ürün</p>
    </div>
  );
}
