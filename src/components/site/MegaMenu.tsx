"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { ChevronDown, ArrowRight, FileDown, PencilRuler } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CategoryGlyph } from "@/components/illustrations/CategoryGlyph";
import { CATEGORIES, categoryName } from "@/lib/taxonomy";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Masaüstü mega menü — "hepsi görünür" tarzı: tüm ana kategoriler VE alt
 * kategorileri tek seferde sütun akışında (column flow) gösterilir; hover ile
 * gizlenmez, her şey tek tık uzakta. Panel `absolute top-full` ile header'ın
 * TAM altına oturur (utility bar yüksekliğinden bağımsız → header'a binmez).
 */
export function MegaMenu(): ReactElement {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose(): void {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  /** Buton ↔ panel boşluğunda anında kapanmasın diye kısa gecikme. */
  function scheduleClose(): void {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      cancelClose();
    };
  }, []);

  return (
    <div
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1 text-sm transition-colors hover:text-accent",
          open ? "text-accent" : "text-ink-soft",
        )}
      >
        {t("categories")}
        <ChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {/* Panel — header'ın relative Container'ına göre (top-full = header altı) */}
      {open ? (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="absolute inset-x-0 top-full z-40 pt-2"
        >
          <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-pop">
            {/* Tüm kategoriler — sütun akışı (hepsi görünür) */}
            <div className="max-h-[72vh] overflow-y-auto px-6 py-6">
              <div className="gap-x-8 [column-fill:balance] sm:columns-2 lg:columns-3 xl:columns-4">
                {CATEGORIES.map((cat) => (
                  <div key={cat.slug} className="mb-5 break-inside-avoid">
                    <Link
                      href={`/kategoriler/${cat.slug}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
                    >
                      <span className="text-accent">
                        <CategoryGlyph glyph={cat.glyph} size={18} />
                      </span>
                      <span className="min-w-0">{categoryName(cat, locale)}</span>
                    </Link>
                    {cat.children?.length ? (
                      <ul className="mt-1.5 space-y-0.5 border-l border-line pl-3.5">
                        {cat.children.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/kategoriler/${c.slug}`}
                              onClick={() => setOpen(false)}
                              className="block py-0.5 text-[13px] leading-snug text-muted transition-colors hover:text-accent"
                            >
                              {categoryName(c, locale)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Alt çubuk — indirilenler + tüm katalog */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-bg-subtle/50 px-6 py-3">
              <div className="flex items-center gap-5 text-sm">
                <a href={SITE.downloads.catalogPdf} download className="flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-accent">
                  <FileDown className="size-4 text-accent" />
                  Katalog PDF İndir
                </a>
                <a href={SITE.downloads.dwg} download className="flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-accent">
                  <PencilRuler className="size-4 text-accent" />
                  DWG Çizimleri İndir
                </a>
              </div>
              <Link
                href="/kategoriler"
                onClick={() => setOpen(false)}
                className="flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
              >
                {t("seeAll")}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
