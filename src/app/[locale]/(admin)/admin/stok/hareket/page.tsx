import type { ReactElement } from "react";
import { getStockList } from "@/lib/stock/queries";
import { StockList } from "@/components/admin/stock/StockList";
import { StockNav } from "@/components/admin/stock/StockNav";

export const dynamic = "force-dynamic";

export default async function StockMovementPage(): Promise<ReactElement> {
  const rows = await getStockList();
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Hareket Girişi</h1>
      <p className="mt-1 text-sm text-muted">Ürünü bulun, satır içindeki Giriş / Çıkış / Sayım ile stok hareketi kaydedin.</p>
      <StockNav />
      <div className="mt-6">
        <StockList rows={rows} quick />
      </div>
    </div>
  );
}
