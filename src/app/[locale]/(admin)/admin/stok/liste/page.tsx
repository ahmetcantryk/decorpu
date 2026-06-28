import type { ReactElement } from "react";
import { getStockList } from "@/lib/stock/queries";
import { StockList } from "@/components/admin/stock/StockList";
import { StockNav } from "@/components/admin/stock/StockNav";

export const dynamic = "force-dynamic";

export default async function StockListPage(): Promise<ReactElement> {
  const rows = await getStockList();
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Stok Listesi</h1>
      <p className="mt-1 text-sm text-muted">Tüm takipli ürünler, anlık stok ve durum.</p>
      <StockNav />
      <div className="mt-6">
        <StockList rows={rows} />
      </div>
    </div>
  );
}
