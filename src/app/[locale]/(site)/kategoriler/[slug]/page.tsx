import type { ReactElement } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";
import { ProductCard } from "@/components/site/ProductCard";
import { Link } from "@/i18n/navigation";
import { getCategoryBySlug, getProductsInCategory, getCategoryTree } from "@/lib/catalog";
import { localizedAlternates, clampDescription, clampTitle } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const found = await getCategoryBySlug(slug);
  if (!found) return { title: "Kategori bulunamadı" };

  const name = found.category.name_tr;
  const description = clampDescription(
    found.category.description ??
      `Poliüretan ${name} modelleri — ölçüler, iç/dış mekan seçenekleri ve projeye özel fiyat teklifi. DecorPU mimari dekorasyon.`,
  );
  return {
    title: clampTitle(`${name} Modelleri`),
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

  const crumbs: Crumb[] = [{ label: "Ana Sayfa", href: "/" }, { label: "Kategoriler", href: "/kategoriler" }];
  if (parent) crumbs.push({ label: parent.name_tr, href: `/kategoriler/${parent.slug}` });
  crumbs.push({ label: category.name_tr });

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={crumbs} />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">{category.name_tr}</h1>
          {category.description ? <p className="mt-2 max-w-2xl text-muted">{category.description}</p> : null}
        </div>
        <span className="font-mono text-sm text-muted">{products.length} ürün</span>
      </div>

      {/* Subcategories */}
      {children.length ? (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-ink-soft">Alt Kategoriler</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {children.map((sub) => {
              const cover = coverFor(sub.id);
              return (
                <li key={sub.id}>
                  <Link href={`/kategoriler/${sub.slug}`} className="group flex items-center gap-3 overflow-hidden rounded-lg border border-line bg-surface p-2.5 transition-colors hover:border-accent/50">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-md bg-bg-subtle">
                      {cover ? <Image src={cover} alt="" fill sizes="48px" className="object-cover" /> : null}
                    </span>
                    <span className="text-sm font-medium text-ink transition-colors group-hover:text-accent">{sub.name_tr}</span>
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
          <p className="rounded-lg border border-line bg-surface px-4 py-12 text-center text-muted">
            Bu kategoride henüz ürün yok.
          </p>
        )}
      </section>
    </Container>
  );
}
