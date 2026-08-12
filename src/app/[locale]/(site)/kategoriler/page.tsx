import type { ReactElement } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { getCategoryTree } from "@/lib/catalog";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("Nav.categories"),
    description: t("Category.metaDescription"),
    alternates: localizedAlternates(locale, "/kategoriler"),
  };
}

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const tree = await getCategoryTree();
  const catName = (c: { name_tr: string; name_en: string | null }): string =>
    locale === "en" ? c.name_en ?? c.name_tr : c.name_tr;

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ label: t("Common.home"), href: "/" }, { label: t("Nav.categories") }]} />
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{t("Nav.categories")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("Category.pageSubtitle")}</p>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {tree.map((cat) => (
          <li key={cat.id}>
            <Link href={`/kategoriler/${cat.slug}`} className="group block overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-accent/60">
              {/* görsel kutuyu tam doldurur: kaynaklar kare, kutu da kare — ne boşluk ne kırpma */}
              <div className="relative aspect-square overflow-hidden bg-bg-subtle">
                <Image
                  src={cat.cover ?? "/placeholder.svg"}
                  alt={catName(cat)}
                  fill
                  sizes="(max-width:640px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              {/* isim + sayılar görselin ALTINDA — turuncu ayraç */}
              <div className="border-t-2 border-accent px-3.5 pb-2.5 pt-3">
                <h2 className="truncate font-display text-lg font-medium text-ink transition-colors group-hover:text-accent">{catName(cat)}</h2>
                <div className="mt-1 flex items-center justify-between text-xs text-muted">
                  <span>{cat.productCount > 0 ? t("Category.productCount", { count: cat.productCount }) : t("Category.onRequest")}</span>
                  {cat.children.length ? <span>{t("Category.subCount", { count: cat.children.length })}</span> : null}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
