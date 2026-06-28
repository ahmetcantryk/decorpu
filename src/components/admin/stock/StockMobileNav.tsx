"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, List, ScanLine, ArrowLeftRight, type LucideIcon } from "lucide-react";
import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

interface Item {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  primary?: boolean;
}

const ITEMS: Item[] = [
  { href: "/admin/stok", label: "Panel", icon: LayoutDashboard, exact: true },
  { href: "/admin/stok/liste", label: "Liste", icon: List },
  { href: "/admin/stok/tara", label: "Tara", icon: ScanLine, primary: true },
  { href: "/admin/stok/hareket", label: "Hareket", icon: ArrowLeftRight },
];

/** Mobil alt navigasyon — stok modülü (ortada belirgin "Tara"). */
export function StockMobileNav(): ReactElement {
  const raw = usePathname();
  const path = raw.replace(/^\/(tr|en)(?=\/|$)/, "") || "/";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-end justify-around">
        {ITEMS.map((it) => {
          const active = it.exact ? path === it.href : path.startsWith(it.href);
          if (it.primary) {
            return (
              <Link key={it.href} href={it.href} className="flex flex-1 flex-col items-center">
                <span className="-mt-5 flex size-12 items-center justify-center rounded-full bg-accent text-accent-fg shadow-pop">
                  <it.icon className="size-6" />
                </span>
                <span className={cn("pb-2 pt-0.5 text-[11px] font-medium", active ? "text-accent" : "text-muted")}>{it.label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn("flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px]", active ? "text-accent" : "text-muted")}
            >
              <it.icon className="size-5" />
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
