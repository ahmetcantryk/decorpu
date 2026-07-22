import type { ReactElement } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { getProjects } from "@/lib/projects";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("Works.metaTitle"),
    description: t("Works.metaDescription"),
    alternates: localizedAlternates(locale, "/calismalarimiz"),
  };
}

export default async function WorksPage({ params }: { params: Promise<{ locale: Locale }> }): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const works = await getProjects();

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ label: t("Common.home"), href: "/" }, { label: t("Works.title") }]} />
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{t("Works.title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("Works.pageSubtitle")}</p>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((w) => (
          <li key={w.id}>
            <Link href={`/calismalarimiz/${w.slug}`} className="group block overflow-hidden rounded-lg border border-line bg-surface transition-shadow hover:shadow-soft">
              <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
                {w.cover_url ? <Image src={w.cover_url} alt={w.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" /> : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h2 className="font-display text-lg font-medium text-white drop-shadow">{w.title}</h2>
                  {w.location ? <p className="text-xs text-white/80">{w.location}{w.year ? ` · ${w.year}` : ""}</p> : null}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
