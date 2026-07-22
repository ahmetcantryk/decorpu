import type { ReactElement } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Phone, ArrowRight, FileDown, PackageCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";
import { ProductCard } from "@/components/site/ProductCard";
import { CategoryGuide } from "@/components/site/CategoryGuide";
import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getCategoryBySlug, getProductsInCategory, getCategoryTree } from "@/lib/catalog";
import { localizedAlternates, clampDescription, clampTitle } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const found = await getCategoryBySlug(slug);
  if (!found) return { title: t("Category.notFound") };

  const name = locale === "en" ? found.category.name_en ?? found.category.name_tr : found.category.name_tr;
  const description = clampDescription(
    found.category.description ?? t("Category.metaDescFallback", { name }),
  );
  return {
    title: clampTitle(t("Category.modelsTitle", { name })),
    description,
    alternates: localizedAlternates(locale, `/kategoriler/${slug}`),
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<ReactElement> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const catName = (c: { name_tr: string; name_en: string | null }): string =>
    locale === "en" ? c.name_en ?? c.name_tr : c.name_tr;

  const found = await getCategoryBySlug(slug);
  if (!found) notFound();
  const { category, parent, children } = found;

  // subcategory covers (from tree) for image cards
  const tree = await getCategoryTree();
  const coverFor = (catId: string): string | null => {
    for (const node of tree) {
      if (node.id === catId) return node.cover;
      const kid = node.children.find((c) => c.id === catId);
      if (kid) return node.cover;
    }
    return null;
  };

  const descendantIds = children.map((c) => c.id);
  const products = await getProductsInCategory(category.id, descendantIds);

  const crumbs: Crumb[] = [{ label: t("Common.home"), href: "/" }, { label: t("Nav.categories"), href: "/kategoriler" }];
  if (parent) crumbs.push({ label: catName(parent), href: `/kategoriler/${parent.slug}` });
  crumbs.push({ label: catName(category) });

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={crumbs} />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">{catName(category)}</h1>
          {category.description ? <p className="mt-2 max-w-2xl text-muted">{category.description}</p> : null}
        </div>
        <span className="font-mono text-sm text-muted">{products.length > 0 ? t("Category.productCount", { count: products.length }) : t("Category.onRequest")}</span>
      </div>

      {/* Subcategories */}
      {children.length ? (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-ink-soft">{t("Category.subcategories")}</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {children.map((sub) => {
              const cover = coverFor(sub.id);
              return (
                <li key={sub.id}>
                  <Link href={`/kategoriler/${sub.slug}`} className="group flex items-center gap-3 overflow-hidden rounded-lg border border-line bg-surface p-2.5 transition-colors hover:border-accent/50">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-md bg-bg-subtle">
                      <Image src={cover ?? "/placeholder.svg"} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                    <span className="text-sm font-medium text-ink transition-colors group-hover:text-accent">{catName(sub)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {/* Products */}
      <section className="mt-10">
        {products.length ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        ) : (
          /* Ürünler üretimde mevcut — katalog sitesine henüz eklenmedi. "Yok" izlenimi verme, talebe yönlendir. */
          <div className="rounded-xl border border-line bg-surface p-6 text-center sm:p-10">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <PackageCheck className="size-6" />
            </span>
            <h2 className="mt-4 text-xl font-semibold sm:text-2xl">{t("Category.emptyTitle")}</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {t("Category.emptyBody", { name: catName(category) })}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
              <Link href="/teklif" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full sm:w-auto")}>
                {t("Quote.request")}
                <ArrowRight className="size-4" />
              </Link>
              <a href={SITE.phoneHref} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}>
                <Phone className="size-4" />
                {SITE.phoneDisplay}
              </a>
            </div>
            <a
              href={SITE.downloads.catalogPdf}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-soft underline-offset-2 transition-colors hover:text-accent hover:underline"
            >
              <FileDown className="size-4 text-accent" />
              {t("Category.viewInCatalog")}
            </a>
          </div>
        )}
      </section>

      {/* SEO rehberi + SSS (yalnız TR; FAQPage schema dahil) */}
      <CategoryGuide slug={slug} locale={locale} />
    </Container>
  );
}
