import type { ReactElement } from "react";
import type { StockStatus } from "@/lib/stock/queries";
import { cn } from "@/lib/utils";

const MAP: Record<StockStatus, { label: string; cls: string }> = {
  ok: { label: "Yeterli", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  low: { label: "Kritik", cls: "bg-amber-50 text-amber-700 ring-amber-200" },
  out: { label: "Tükendi", cls: "bg-accent/10 text-accent ring-accent/20" },
};

/** Stok durum rozeti — sunucu/istemci her ikisinde de çalışır. */
export function StockBadge({ status, className }: { status: StockStatus; className?: string }): ReactElement {
  const s = MAP[status];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset", s.cls, className)}>
      {s.label}
    </span>
  );
}
