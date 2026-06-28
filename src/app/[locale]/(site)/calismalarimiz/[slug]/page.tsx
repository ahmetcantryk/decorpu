import type { ReactElement } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { MapPin, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ProductGallery } from "@/components/site/ProductGallery";
import { ProductCard } from "@/components/site/ProductCard";
import { getProjectBySlug } from "@/lib/projects";
import { localizedAlternates, clampDescription, clampTitle } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const w = await getProjectBySlug(slug);
  if (!w) return { title: "Çalışma bulunamadı" };

  const where = w.location ? `, ${w.location}` : "";
  const description = clampDescription(
    w.summary ?? `${w.title}${where} — DecorPU poliüretan mimari dekorasyon uygulaması ve projede kullanılan ürünler.`,
  );
  return {
    title: clampTitle(w.title),
    description,
    alternates: localizedAlternates(locale, `/calismalarimiz/${slug}`),
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<ReactElement> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const w = await getProjectBySlug(slug);
  if (!w) notFound();

  return (
    <Container className="py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "Çalışmalarımız", href: "/calismalarimiz" }, { label: w.title }]} />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <ProductGallery images={w.images} alt={w.title} />

        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{w.title}</h1>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            {w.location ? <span className="inline-flex items-center gap-1"><MapPin className="size-4" />{w.location}</span> : null}
            {w.year ? <span className="inline-flex items-center gap-1"><Calendar className="size-4" />{w.year}</span> : null}
          </div>
          {w.summary ? <p className="mt-5 text-lg leading-relaxed text-ink-soft">{w.summary}</p> : null}
          {w.description ? <p className="mt-4 leading-relaxed text-muted">{w.description}</p> : null}
        </div>
      </div>

      {/* Bu projede kullanılan ürünler */}
      {w.products.length ? (
        <section className="mt-16">
          <h2 className="mb-1 text-xl font-semibold">Bu projede kullanılan ürünler</h2>
          <p className="mb-6 text-sm text-muted">Aynı ürünleri teklif sepetinize ekleyebilirsiniz.</p>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {w.products.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  );
}
