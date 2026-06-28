"use client";

import { useLocale } from "next-intl";
import type { ReactElement } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** TR / EN toggle that preserves the current path. */
export function LocaleSwitcher(): ReactElement {
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1.5 font-mono text-xs">
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-line-strong">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale })}
            aria-current={locale === active ? "true" : undefined}
            className={cn(
              "uppercase transition-colors",
              locale === active ? "text-ink" : "text-muted hover:text-accent",
            )}
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
}
