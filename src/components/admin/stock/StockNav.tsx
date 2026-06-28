"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

const TABS: { href: string; label: string; exact?: boolean }[] = [
  { href: "/admin/stok", label: "Panel", exact: true },
  { href: "/admin/stok/liste", label: "Stok Listesi" },
  { href: "/admin/stok/tara", label: "Kod Tara" },
  { href: "/admin/stok/hareket", label: "Hareket Girişi" },
];

/** Stok modülü üst-navigasyonu (masaüstü tabs; mobilde alt bar kullanılır). */
export function StockNav(): ReactElement {
  const raw = usePathname();
  const path = raw.replace(/^\/(tr|en)(?=\/|$)/, "") || "/";

  return (
    <nav className="mt-4 hidden gap-1 border-b border-line md:flex">
      {TABS.map((t) => {
        const active = t.exact ? path === t.href : path.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 text-sm transition-colors",
              active ? "border-accent font-medium text-accent" : "border-transparent text-ink-soft hover:text-ink",
            )}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
