import type { ReactNode, ReactElement } from "react";
import { StockMobileNav } from "@/components/admin/stock/StockMobileNav";

/** Stok modülü — mobilde alt navigasyon (sabit) + içerik için alt boşluk. */
export default function StockLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="pb-24 md:pb-0">
      {children}
      <StockMobileNav />
    </div>
  );
}
