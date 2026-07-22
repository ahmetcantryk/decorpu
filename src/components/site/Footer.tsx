import type { ReactElement } from "react";
import { Phone, Mail, MapPin, FileText, PencilRuler, Download } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "./Wordmark";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { CATEGORIES, categoryName } from "@/lib/taxonomy";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

/** Site footer with contact + map. */
export function Footer(): ReactElement {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();
  const topCategories = CATEGORIES.slice(0, 6);

  const companyLinks: { label: string; href: string }[] = [
    { label: t("Nav.categories"), href: "/kategoriler" },
    { label: t("Works.title"), href: "/calismalarimiz" },
    { label: t("Nav.services"), href: "/hizmetler" },
    { label: t("Nav.quote"), href: "/teklif" },
    { label: t("Nav.contact"), href: "/iletisim" },
  ];

  const legalLinks: { label: string; href: string }[] = [
    { label: t("Footer.kvkk"), href: "/kvkk" },
    { label: t("Footer.privacy"), href: "/gizlilik" },
    { label: t("Footer.cookies"), href: "/cerez-politikasi" },
  ];

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="max-w-xs">
          <Wordmark />
          <p className="mt-4 text-sm leading-relaxed text-muted">{t("Footer.tagline")}</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li><a href={SITE.phoneHref} className="inline-flex items-center gap-2 text-ink-soft hover:text-accent"><Phone className="size-4" />{SITE.phoneDisplay}</a></li>
            <li><a href={SITE.emailHref} className="inline-flex items-center gap-2 text-ink-soft hover:text-accent"><Mail className="size-4" />{SITE.email}</a></li>
            <li className="inline-flex items-center gap-2 text-muted"><MapPin className="size-4" />{SITE.address}</li>
          </ul>
        </div>

        <nav aria-label={t("Footer.exploreTitle")}>
          <h2 className="font-mono text-xs uppercase tracking-wide text-muted">{t("Footer.exploreTitle")}</h2>
          <ul className="mt-4 space-y-2.5">
            {topCategories.map((cat) => (
              <li key={cat.slug}>
                <Link href={`/kategoriler/${cat.slug}`} className="text-sm text-ink-soft transition-colors hover:text-accent">
                  {categoryName(cat, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("Footer.companyTitle")}>
          <h2 className="font-mono text-xs uppercase tracking-wide text-muted">{t("Footer.companyTitle")}</h2>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-soft transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={SITE.downloads.catalogPdf} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-accent">
                <FileText className="size-3.5 text-accent" />
                {t("Downloads.catalogPdf")}
              </a>
            </li>
            <li>
              <a href={SITE.downloads.dwg} download className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-accent">
                <PencilRuler className="size-3.5 text-accent" />
                {t("Downloads.dwg")}
                <span className="inline-flex items-center gap-0.5 text-accent">
                  <Download className="size-3.5" />
                  {t("Downloads.download")}
                </span>
              </a>
            </li>
          </ul>
        </nav>

        {/* map */}
        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wide text-muted">{t("Footer.location")}</h2>
          <div className="overflow-hidden rounded-lg border border-line">
            <iframe
              title={t("Common.mapTitle")}
              src={SITE.mapEmbed}
              className="h-44 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-4 py-6 text-xs text-muted">
          <nav aria-label={t("Footer.legalNav")} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-accent">
                {item.label}
              </Link>
            ))}
            <CookieSettingsButton className="transition-colors hover:text-accent" />
          </nav>
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="font-mono">© {year} DecorPU</p>
            <p>{t("Footer.rights")}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
