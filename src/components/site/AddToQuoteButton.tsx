"use client";

import { useState, type ReactElement } from "react";
import { Plus, Check } from "lucide-react";
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

/** Adds a product to the quote cart (teklif sepeti). */
export function AddToQuoteButton({ code, name, image, size = "sm", className }: AddToQuoteButtonProps): ReactElement {
  const t = useTranslations("Quote");
  const has = useRfq((s) => s.items.some((i) => i.code === code));
  const add = useRfq((s) => s.add);
  const remove = useRfq((s) => s.remove);
  const [pulse, setPulse] = useState(false);

  function toggle(e: React.MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (has) {
      remove(code);
    } else {
      add({ code, name, image });
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={has}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors",
        size === "lg" ? "h-12 px-6 text-sm" : "h-9 px-3 text-xs",
        has ? "bg-ink text-bg hover:bg-ink-soft" : "bg-accent text-accent-fg hover:bg-accent-strong",
        pulse && "scale-[0.97]",
        className,
      )}
    >
      {has ? <Check className="size-4" /> : <Plus className="size-4" />}
      {has ? t("added") : t("add")}
    </button>
  );
}
