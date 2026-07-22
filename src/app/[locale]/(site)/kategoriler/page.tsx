import type { ReactElement } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { getCategoryTree } from "@/lib/catalog";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Kategoriler",
    description: "Poliüretan mimari dekorasyon ürün kategorileri — söve, sütun, kartonpiyer, kemer, kubbe, şömine ve daha fazlası.",
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
  const tree = await getCategoryTree();

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "Kategoriler" }]} />
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">Kategoriler</h1>
      <p className="mt-2 max-w-2xl text-muted">İç ve dış cephe mimari profiller. Bir kategoriye girip alt kategorileri ve ürünleri keşfedin.</p>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {tree.map((cat) => (
          <li key={cat.id}>
            <Link href={`/kategoriler/${cat.slug}`} className="group block overflow-hidden rounded-lg border border-line bg-surface transition-shadow hover:shadow-soft">
              <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
                <Image
                  src={cat.cover ?? "/placeholder.svg"}
                  alt={cat.name_tr}
                  fill
                  sizes="(max-width:640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <h2 className="font-display text-lg font-medium text-bg drop-shadow">{cat.name_tr}</h2>
                </div>
              </div>
              <div className="flex items-center justify-between px-3.5 py-2.5 text-xs text-muted">
                <span>{cat.productCount > 0 ? `${cat.productCount} ürün` : "Talep üzerine"}</span>
                {cat.children.length ? <span>{cat.children.length} alt kategori</span> : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
