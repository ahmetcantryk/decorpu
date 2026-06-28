import type { ReactElement } from "react";
import { Boxes, Layers, AlertTriangle, PackageX } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { StockBadge } from "./StockBadge";
import type { StockSummary } from "@/lib/stock/queries";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const MV: Record<string, { label: string; sign: string; cls: string }> = {
  in: { label: "Giriş", sign: "+", cls: "text-emerald-600" },
  out: { label: "Çıkış", sign: "−", cls: "text-accent" },
  adjust: { label: "Sayım", sign: "=", cls: "text-ink-soft" },
};

export function StockDashboard({ summary }: { summary: StockSummary }): ReactElement {
  const cards = [
    { label: "Takipli Ürün", value: summary.totalSkus, icon: Boxes, alert: false },
    { label: "Toplam Birim", value: summary.totalUnits, icon: Layers, alert: false },
    { label: "Kritik Seviye", value: summary.lowCount, icon: AlertTriangle, alert: summary.lowCount > 0 },
    { label: "Tükenen", value: summary.outCount, icon: PackageX, alert: summary.outCount > 0 },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className={cn("rounded-xl border bg-surface p-4", c.alert ? "border-accent/30" : "border-line")}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted">{c.label}</span>
              <c.icon className={cn("size-4", c.alert ? "text-accent" : "text-muted")} />
            </div>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{formatNumber(c.value)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* kritik liste */}
        <section className="rounded-xl border border-line bg-surface p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink-soft">Kritik / Tükenen Ürünler</h2>
            <Link href="/admin/stok/liste" className="text-xs text-accent hover:underline">
              Tümü →
            </Link>
          </div>
          {summary.alerts.length ? (
            <ul className="divide-y divide-line">
              {summary.alerts.slice(0, 8).map((r) => (
                <li key={r.id} className="flex items-center gap-3 py-2 text-sm">
                  <Link href={`/admin/stok/urun/${r.code}`} className="min-w-0 flex-1 truncate text-ink hover:text-accent">
                    <span className="font-mono text-xs text-accent">{r.code}</span> · {r.name_tr}
                  </Link>
                  <span className="shrink-0 tabular-nums text-muted">
                    {formatNumber(r.stock_qty)} {r.unit}
                  </span>
                  <StockBadge status={r.status} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-6 text-center text-sm text-muted">Kritik seviyede ürün yok. 👍</p>
          )}
        </section>

        {/* son hareketler */}
        <section className="rounded-xl border border-line bg-surface p-5">
          <h2 className="mb-3 text-sm font-semibold text-ink-soft">Son Hareketler</h2>
          {summary.recent.length ? (
            <ul className="divide-y divide-line">
              {summary.recent.map((m) => {
                const meta = MV[m.type] ?? MV.adjust;
                return (
                  <li key={m.id} className="flex items-center gap-3 py-2 text-sm">
                    <span className={cn("w-20 shrink-0 font-medium", meta.cls)}>
                      {meta.sign}
                      {formatNumber(m.quantity)} {meta.label}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-muted">
                      <span className="font-mono text-xs">{m.product_code}</span> {m.product_name}
                    </span>
                    <span className="shrink-0 text-xs text-muted">{new Date(m.created_at).toLocaleDateString("tr-TR")}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="py-6 text-center text-sm text-muted">Henüz hareket yok.</p>
          )}
        </section>
      </div>
    </div>
  );
}
