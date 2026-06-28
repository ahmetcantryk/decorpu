import type { ReactElement } from "react";
import { Scanner } from "@/components/admin/stock/Scanner";
import { StockNav } from "@/components/admin/stock/StockNav";

export const dynamic = "force-dynamic";

export default function StockScanPage(): ReactElement {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Kod Tara</h1>
      <p className="mt-1 text-sm text-muted">QR/kodu okut, ürünün stok ekranı açılsın; giriş/çıkış/not gir.</p>
      <StockNav />
      <div className="mt-6">
        <Scanner />
      </div>
    </div>
  );
}
