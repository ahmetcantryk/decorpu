"use client";

import { useEffect, useState, type ReactElement } from "react";
import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRfq } from "@/lib/rfq/store";
import { cn } from "@/lib/utils";

/** Header quote-cart indicator with live item count. */
export function QuoteCartButton({ className }: { className?: string }): ReactElement {
  const t = useTranslations("Quote");
  const count = useRfq((s) => s.items.length);
  // avoid hydration mismatch (persisted store) — set after paint to dodge cascading renders
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Link
      href="/teklif"
      aria-label={t("cartLabel")}
      className={cn("relative inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-ink-soft transition-colors hover:text-accent", className)}
    >
      <FileText className="size-5" />
      {mounted && count > 0 ? (
        <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-fg">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
