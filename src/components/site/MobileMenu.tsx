"use client";

import { useState, useEffect, type ReactElement } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Phone, MessageCircle, MapPin, ChevronDown, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { CodeSearch } from "./CodeSearch";
import { Wordmark } from "./Wordmark";
import { Link } from "@/i18n/navigation";
import { CategoryGlyph } from "@/components/illustrations/CategoryGlyph";
import { CATEGORIES, categoryName } from "@/lib/taxonomy";
import { buttonVariants } from "@/components/ui/Button";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const PAGE_LINKS: { href: string; label: string }[] = [
  { href: "/calismalarimiz", label: "Çalışmalarımız" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/iletisim", label: "İletişim" },
];

/** Mobil navigasyon — tam ekran drawer: arama, sayfa linkleri, akordeon kategoriler, iletişim, CTA. */
export function MobileMenu(): ReactElement {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const close = (): void => setOpen(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const overlay = (
    <div className="fixed inset-0 z-[100] flex flex-col bg-bg">
          {/* başlık */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
            <Wordmark onClick={close} />
            <button
              type="button"
              onClick={close}
              aria-label="Kapat"
              className="flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-bg-subtle"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* kaydırılabilir gövde */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <CodeSearch size="lg" />

            {/* sayfa linkleri */}
            <nav className="mt-5 flex flex-col">
              <Link href="/kategoriler" onClick={close} className="border-b border-line py-3.5 text-base font-medium text-ink transition-colors hover:text-accent">
                {t("catalog")}
              </Link>
              {PAGE_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={close} className="border-b border-line py-3.5 text-base font-medium text-ink transition-colors hover:text-accent">
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* kategoriler — akordeon */}
            <p className="mb-1 mt-6 font-mono text-xs uppercase tracking-wide text-muted">{t("categories")}</p>
            <ul className="border-y border-line">
              {CATEGORIES.map((cat) => {
                const isOpen = expanded === cat.slug;
                const hasChildren = Boolean(cat.children?.length);
                return (
                  <li key={cat.slug} className="border-b border-line last:border-0">
                    <div className="flex items-center">
                      <Link href={`/kategoriler/${cat.slug}`} onClick={close} className="flex flex-1 items-center gap-2.5 py-3 text-ink">
                        <span className="shrink-0 text-accent">
                          <CategoryGlyph glyph={cat.glyph} size={20} />
                        </span>
                        <span className="text-sm font-medium">{categoryName(cat, locale)}</span>
                      </Link>
                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : cat.slug)}
                          aria-expanded={isOpen}
                          aria-label={`${categoryName(cat, locale)} alt kategoriler`}
                          className="flex size-10 shrink-0 items-center justify-center text-muted"
                        >
                          <ChevronDown className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")} />
                        </button>
                      ) : null}
                    </div>
                    {hasChildren && isOpen ? (
                      <ul className="pb-3 pl-[42px]">
                        {cat.children!.map((c) => (
                          <li key={c.slug}>
                            <Link href={`/kategoriler/${c.slug}`} onClick={close} className="block py-1.5 text-sm text-muted transition-colors hover:text-accent">
                              {categoryName(c, locale)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            {/* iletişim bloğu */}
            <div className="mt-6 rounded-xl border border-line bg-surface p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-muted">İletişim</p>
              <a href={SITE.phoneHref} className="mt-2.5 flex items-center gap-2.5 text-lg font-semibold text-ink transition-colors hover:text-accent">
                <Phone className="size-5 text-accent" />
                {SITE.phoneDisplay}
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener" className="mt-2.5 flex items-center gap-2.5 text-sm text-ink-soft transition-colors hover:text-[#25D366]">
                <MessageCircle className="size-4 text-[#25D366]" />
                WhatsApp ile yazın
              </a>
              <a href={SITE.emailHref} className="mt-2.5 block text-sm text-ink-soft transition-colors hover:text-accent">
                {SITE.email}
              </a>
              <p className="mt-2.5 flex items-start gap-2.5 text-sm text-muted">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {SITE.address}
              </p>
            </div>
          </div>

          {/* sabit alt CTA */}
          <div className="flex shrink-0 items-center gap-2 border-t border-line bg-bg px-5 py-3">
            <a href={SITE.phoneHref} onClick={close} className={cn(buttonVariants({ variant: "outline", size: "md" }), "flex-1")}>
              <Phone className="size-4" /> Ara
            </a>
            <Link href="/teklif" onClick={close} className={cn(buttonVariants({ variant: "primary", size: "md" }), "flex-1")}>
              {t("quote")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label={t("menu")}
        className="flex size-10 items-center justify-center text-ink"
      >
        <Menu className="size-5" />
      </button>
      {open && mounted ? createPortal(overlay, document.body) : null}
    </div>
  );
}
