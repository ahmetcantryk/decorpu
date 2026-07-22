"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, Boxes, Inbox, LogOut, type LucideIcon } from "lucide-react";
import type { ReactElement } from "react";
import { signOut } from "@/lib/admin/auth";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  soon?: boolean;
  leadsBadge?: boolean;
}

const NAV: NavItem[] = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard, exact: true },
  { href: "/admin/urunler", label: "Ürünler", icon: Package },
  { href: "/admin/kategoriler", label: "Kategoriler", icon: FolderTree },
  { href: "/admin/stok", label: "Stok", icon: Boxes, soon: true },
  { href: "/admin/talepler", label: "Talepler", icon: Inbox, leadsBadge: true },
];

/** Mobil admin üst barı + kaydırılabilir bölüm sekmeleri (sidebar mobilde gizli). */
export function AdminMobileNav({ newLeads = 0 }: { newLeads?: number }): ReactElement {
  const raw = usePathname();
  const path = raw.replace(/^\/(tr|en)(?=\/|$)/, "") || "/";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur md:hidden">
      <div className="flex h-14 items-center justify-between px-4">
        <span className="font-display text-lg font-semibold">
          <span className="text-ink">Decor</span>
          <span className="text-accent">PU</span>
          <span className="ml-1.5 align-middle font-mono text-[10px] uppercase tracking-wide text-muted">CMS</span>
        </span>
        <form action={signOut}>
          <button type="submit" aria-label="Çıkış yap" className="flex size-9 items-center justify-center text-muted">
            <LogOut className="size-5" />
          </button>
        </form>
      </div>
      <nav className="flex gap-1.5 overflow-x-auto px-3 pb-2 [scrollbar-width:none]">
        {NAV.map((it) => {
          if (it.soon) {
            return (
              <span
                key={it.href}
                aria-disabled="true"
                className="flex shrink-0 cursor-not-allowed items-center gap-1.5 rounded-full bg-bg-subtle px-3 py-1.5 text-sm text-muted/70"
              >
                <it.icon className="size-3.5" />
                {it.label}
                <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent">
                  Yakında
                </span>
              </span>
            );
          }
          const active = it.exact ? path === it.href : path.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors",
                active ? "bg-accent/10 font-medium text-accent" : "bg-bg-subtle text-ink-soft",
              )}
            >
              <it.icon className="size-3.5" />
              {it.label}
              {it.leadsBadge && newLeads > 0 ? (
                <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold tabular-nums text-accent-fg">
                  {newLeads}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
