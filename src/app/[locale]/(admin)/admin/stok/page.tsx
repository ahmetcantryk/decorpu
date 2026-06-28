import type { ReactElement } from "react";
import { getStockSummary } from "@/lib/stock/queries";
import { StockDashboard } from "@/components/admin/stock/StockDashboard";
import { StockNav } from "@/components/admin/stock/StockNav";

export const dynamic = "force-dynamic";

export default async function StockPage(): Promise<ReactElement> {
  const summary = await getStockSummary();
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Stok Takip</h1>
      <p className="mt-1 text-sm text-muted">İmalathane stok durumu, kritik uyarılar ve son hareketler.</p>
      <StockNav />
      <div className="mt-6">
        <StockDashboard summary={summary} />
      </div>
    </div>
  );
}
