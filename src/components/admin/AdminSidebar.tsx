"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, Inbox, Boxes, ExternalLink, LogOut, type LucideIcon } from "lucide-react";
import type { ReactElement } from "react";
import { signOut } from "@/lib/admin/auth";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

const NAV: NavItem[] = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard, exact: true },
  { href: "/admin/urunler", label: "Ürünler", icon: Package },
  { href: "/admin/kategoriler", label: "Kategoriler", icon: FolderTree },
  { href: "/admin/stok", label: "Stok Takip", icon: Boxes },
  { href: "/admin/talepler", label: "Talepler", icon: Inbox },
];

export function AdminSidebar({ email }: { email: string }): ReactElement {
  const raw = usePathname();
  const path = raw.replace(/^\/(tr|en)(?=\/|$)/, "") || "/";

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-surface md:flex">
      <div className="flex h-16 items-center border-b border-line px-5">
        <span className="font-display text-xl font-semibold">
          <span className="text-ink">Decor</span>
          <span className="text-accent">PU</span>
        </span>
        <span className="ml-2 rounded-sm bg-bg-subtle px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
          CMS
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => {
          const active = item.exact ? path === item.href : path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active ? "bg-accent/10 font-medium text-accent" : "text-ink-soft hover:bg-bg-subtle",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-line p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted transition-colors hover:text-accent"
        >
          <ExternalLink className="size-3.5" />
          Siteyi görüntüle
        </Link>
        <div className="truncate px-3 pt-1 font-mono text-[11px] text-muted" title={email}>
          {email}
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <LogOut className="size-4" />
            Çıkış yap
          </button>
        </form>
      </div>
    </aside>
  );
}
