"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import { Printer, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/Button";
import { StockBadge } from "./StockBadge";
import { MovementDialog } from "./MovementDialog";
import type { StockProductDetail } from "@/lib/stock/queries";
import { formatNumber } from "@/lib/format";
import { SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

const MV: Record<string, { label: string; sign: string; cls: string }> = {
  in: { label: "Giriş", sign: "+", cls: "text-emerald-600" },
  out: { label: "Çıkış", sign: "−", cls: "text-accent" },
  adjust: { label: "Sayım", sign: "=", cls: "text-ink-soft" },
};

export function StockProductPanel({ product }: { product: StockProductDetail }): ReactElement {
  const deepLink = `${SITE_URL}/admin/stok/urun/${product.code}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(deepLink)}`;

  function printLabel(): void {
    const w = window.open("", "_blank", "width=420,height=560");
    if (!w) return;
    w.document.write(
      `<html><head><title>${product.code}</title><style>body{font-family:system-ui,sans-serif;text-align:center;padding:24px;margin:0}img{width:240px;height:240px}h1{font-size:22px;margin:10px 0 2px;letter-spacing:1px}p{margin:0;color:#555;font-size:14px}</style></head><body>` +
        `<img src="${qrUrl}" alt="QR"/><h1>${product.code}</h1><p>${product.name_tr.replace(/</g, "&lt;")}</p>` +
        `<script>window.onload=function(){window.print()}</script></body></html>`,
    );
    w.document.close();
  }

  return (
    <div>
      <Link href="/admin/stok/liste" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent">
        <ArrowLeft className="size-4" /> Stok listesi
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* sol: stok + hareketler */}
        <div>
          <div className="flex items-start gap-4 rounded-xl border border-line bg-surface p-5">
            <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-bg-subtle">
              {product.image ? <Image src={product.image} alt="" fill sizes="64px" className="object-cover" /> : null}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs text-accent">{product.code}</p>
              <h1 className="mt-0.5 truncate text-lg font-semibold tracking-tight">{product.name_tr}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-2xl font-semibold tabular-nums">
                  {formatNumber(product.stock_qty)} <span className="text-base font-normal text-muted">{product.unit}</span>
                </span>
                <StockBadge status={product.status} />
                <span className="text-xs text-muted">kritik ≤ {formatNumber(product.min_level)}</span>
              </div>
              {product.category ? <p className="mt-1 text-xs text-muted">{product.category}</p> : null}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-surface p-5">
            <p className="mb-3 text-sm font-medium text-ink-soft">Hızlı İşlem</p>
            <MovementDialog productId={product.id} productName={product.name_tr} unit={product.unit} currentQty={product.stock_qty} />
          </div>

          <div className="mt-4 rounded-xl border border-line bg-surface p-5">
            <p className="mb-3 text-sm font-medium text-ink-soft">Hareket Geçmişi</p>
            {product.movements.length ? (
              <ul className="divide-y divide-line">
                {product.movements.map((m) => {
                  const meta = MV[m.type] ?? MV.adjust;
                  return (
                    <li key={m.id} className="flex items-center gap-3 py-2.5 text-sm">
                      <span className={cn("w-20 shrink-0 font-medium", meta.cls)}>
                        {meta.sign}
                        {formatNumber(m.quantity)} {meta.label}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-muted">
                        {m.reason ?? "—"}
                        {m.note ? ` · ${m.note}` : ""}
                      </span>
                      <span className="shrink-0 text-xs text-muted">{new Date(m.created_at).toLocaleString("tr-TR")}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="py-4 text-center text-sm text-muted">Henüz hareket yok.</p>
            )}
          </div>
        </div>

        {/* sağ: QR */}
        <div className="h-fit rounded-xl border border-line bg-surface p-5 text-center lg:sticky lg:top-8">
          <p className="text-sm font-medium text-ink-soft">QR Etiket</p>
          <p className="mt-1 text-xs text-muted">Telefonla okutunca bu sayfa açılır.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrUrl} alt={`${product.code} QR`} width={200} height={200} className="mx-auto mt-4 rounded-lg border border-line" />
          <p className="mt-2 font-mono text-sm">{product.code}</p>
          <button type="button" onClick={printLabel} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 w-full")}>
            <Printer className="size-4" /> Etiket Yazdır
          </button>
          <Button onClick={() => navigator.clipboard?.writeText(deepLink)} variant="ghost" size="sm" className="mt-1 w-full text-xs">
            Bağlantıyı kopyala
          </Button>
        </div>
      </div>
    </div>
  );
}
