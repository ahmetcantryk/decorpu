import type { ReactElement } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }): ReactElement {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-muted">
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 ? <ChevronRight className="size-3.5 text-line-strong" /> : null}
          {c.href ? (
            <Link href={c.href} className="transition-colors hover:text-accent">
              {c.label}
            </Link>
          ) : (
            <span className="text-ink-soft">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
