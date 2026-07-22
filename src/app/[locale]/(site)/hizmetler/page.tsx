import type { ReactElement } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { Link } from "@/i18n/navigation";
import { getServices } from "@/lib/services";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("Services.metaTitle"),
    description: t("Services.metaDescription"),
    alternates: localizedAlternates(locale, "/hizmetler"),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const services = await getServices();

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ label: t("Common.home"), href: "/" }, { label: t("Nav.services") }]} />
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{t("Services.title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("Services.pageSubtitle")}</p>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.id}>
            <Link href={`/hizmetler/${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-shadow hover:shadow-soft">
              <div className="relative aspect-[16/10] overflow-hidden bg-bg-subtle">
                {s.image_url ? <Image src={s.image_url} alt={s.title} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" /> : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <span className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-md bg-white/90 text-ink">
                  <ServiceIcon icon={s.icon} className="size-4.5" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-lg font-medium text-ink transition-colors group-hover:text-accent">{s.title}</h2>
                {s.summary ? <p className="mt-1.5 line-clamp-2 text-sm text-muted">{s.summary}</p> : null}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  {t("Services.details")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
