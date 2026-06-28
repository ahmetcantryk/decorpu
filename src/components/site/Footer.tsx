import type { ReactElement } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "./Wordmark";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { CATEGORIES, categoryName } from "@/lib/taxonomy";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

const COMPANY_LINKS: { label: string; href: string }[] = [
  { label: "Kategoriler", href: "/kategoriler" },
  { label: "Çalışmalarımız", href: "/calismalarimiz" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Teklif Al", href: "/teklif" },
  { label: "İletişim", href: "/iletisim" },
];

const LEGAL_LINKS: { label: string; href: string }[] = [
  { label: "KVKK Aydınlatma Metni", href: "/kvkk" },
  { label: "Gizlilik Politikası", href: "/gizlilik" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
];

/** Site footer with contact + map. */
export function Footer(): ReactElement {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();
  const topCategories = CATEGORIES.slice(0, 6);

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
            {COMPANY_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-soft transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* map */}
        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-wide text-muted">Konum</h2>
          <div className="overflow-hidden rounded-lg border border-line">
            <iframe
              title="DecorPU konum"
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
          <nav aria-label="Yasal" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
            {LEGAL_LINKS.map((item) => (
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
