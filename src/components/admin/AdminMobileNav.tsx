"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, Boxes, Inbox, LogOut, type LucideIcon } from "lucide-react";
import type { ReactElement } from "react";
import { signOut } from "@/lib/admin/auth";
import { cn } from "@/lib/utils";

const NAV: { href: string; label: string; icon: LucideIcon; exact?: boolean }[] = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard, exact: true },
  { href: "/admin/urunler", label: "Ürünler", icon: Package },
  { href: "/admin/kategoriler", label: "Kategoriler", icon: FolderTree },
  { href: "/admin/stok", label: "Stok", icon: Boxes },
  { href: "/admin/talepler", label: "Talepler", icon: Inbox },
];

/** Mobil admin üst barı + kaydırılabilir bölüm sekmeleri (sidebar mobilde gizli). */
export function AdminMobileNav(): ReactElement {
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
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
