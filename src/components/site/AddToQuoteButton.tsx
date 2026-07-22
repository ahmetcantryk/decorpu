"use client";

import type { ReactElement } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRfq } from "@/lib/rfq/store";
import { cn } from "@/lib/utils";

interface AddToQuoteButtonProps {
  code: string;
  name: string;
  image: string | null;
  size?: "sm" | "lg";
  className?: string;
}

/**
 * Teklif sepeti kontrolü: sepette değilken "Teklife ekle"; ekledikten sonra
 * yerinde adet seçici [− adet +] olur (adet 1'de − ürünü sepetten çıkarır).
 */
export function AddToQuoteButton({ code, name, image, size = "sm", className }: AddToQuoteButtonProps): ReactElement {
  const t = useTranslations("Quote");
  const item = useRfq((s) => s.items.find((i) => i.code === code));
  const add = useRfq((s) => s.add);
  const remove = useRfq((s) => s.remove);
  const setQty = useRfq((s) => s.setQty);

  const stop = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (!item) {
    return (
      <button
        type="button"
        onClick={(e) => {
          stop(e);
          add({ code, name, image });
        }}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-md bg-accent font-medium text-accent-fg transition-colors hover:bg-accent-strong",
          size === "lg" ? "h-12 px-6 text-sm" : "h-9 px-3 text-xs",
          className,
        )}
      >
        <Plus className="size-4" />
        {t("add")}
      </button>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-stretch overflow-hidden rounded-md border border-accent bg-accent/5",
        size === "lg" ? "h-12" : "h-9",
        className,
      )}
      aria-label={t("cartLabel")}
    >
      <button
        type="button"
        onClick={(e) => {
          stop(e);
          if (item.qty <= 1) remove(code);
          else setQty(code, item.qty - 1);
        }}
        aria-label={t("qtyDecrease")}
        className={cn("flex items-center justify-center text-accent transition-colors hover:bg-accent hover:text-accent-fg", size === "lg" ? "w-11" : "w-8")}
      >
        <Minus className="size-4" />
      </button>
      <span
        className={cn(
          "flex min-w-0 items-center justify-center border-x border-accent/40 font-semibold tabular-nums text-accent",
          size === "lg" ? "px-4 text-base" : "px-2.5 text-sm",
        )}
      >
        {item.qty}
      </span>
      <button
        type="button"
        onClick={(e) => {
          stop(e);
          setQty(code, item.qty + 1);
        }}
        aria-label={t("qtyIncrease")}
        className={cn("flex items-center justify-center text-accent transition-colors hover:bg-accent hover:text-accent-fg", size === "lg" ? "w-11" : "w-8")}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
