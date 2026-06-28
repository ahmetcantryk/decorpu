import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { getStockProduct } from "@/lib/stock/queries";
import { StockProductPanel } from "@/components/admin/stock/StockProductPanel";

export const dynamic = "force-dynamic";

export default async function StockProductPage({ params }: { params: Promise<{ code: string }> }): Promise<ReactElement> {
  const { code } = await params;
  const product = await getStockProduct(code);
  if (!product) notFound();
  return <StockProductPanel product={product} />;
}
