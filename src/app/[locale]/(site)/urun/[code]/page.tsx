import type { ReactElement } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";
import { ProductGallery } from "@/components/site/ProductGallery";
import { AddToQuoteButton } from "@/components/site/AddToQuoteButton";
import { ProductCard } from "@/components/site/ProductCard";
import { getProductByCode, getRelatedProducts } from "@/lib/catalog";
import { localizedAlternates, clampDescription, clampTitle } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; code: string }> }): Promise<Metadata> {
  const { locale, code } = await params;
  const product = await getProductByCode(code);
  if (!product) return { title: "Ürün bulunamadı" };

  const cat = product.category?.name_tr ?? "mimari dekorasyon";
  const description = clampDescription(
    product.description_tr ??
      `${product.name_tr} (${product.code}) — poliüretan ${cat} modeli. Ölçüler, teknik özellikler ve projeye özel teklif DecorPU'da.`,
  );
  return {
    title: clampTitle(`${product.name_tr} ${product.code}`),
    description,
    alternates: localizedAlternates(locale, `/urun/${product.code.toLowerCase()}`),
  };
}

function Spec({ label, value }: { label: string; value: string }): ReactElement {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-2.5 text-sm last:border-0">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}

const yn = (b: boolean | null): string => (b ? "Evet" : "Hayır");

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; code: string }>;
}): Promise<ReactElement> {
  const { locale, code } = await params;
  setRequestLocale(locale);

  const product = await getProductByCode(code);
  if (!product) notFound();

  const related = await getRelatedProducts(product.category_id, product.code);

  const crumbs: Crumb[] = [{ label: "Ana Sayfa", href: "/" }, { label: "Kategoriler", href: "/kategoriler" }];
  if (product.parent) crumbs.push({ label: product.parent.name_tr, href: `/kategoriler/${product.parent.slug}` });
  if (product.category) crumbs.push({ label: product.category.name_tr, href: `/kategoriler/${product.category.slug}` });
  crumbs.push({ label: product.code });

  const dims: [string, string | number | null][] = [
    ["Genişlik (En)", product.width_mm],
    ["Uzunluk (Boy)", product.length_mm],
    ["Yükseklik", product.height_mm],
    ["Çap", product.diameter_mm],
  ];
  const shownDims = dims.filter(([, v]) => v != null);

  // Product JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name_tr,
    sku: product.code,
    mpn: product.code,
    material: product.material ?? "Poliüretan",
    image: product.images,
    category: product.category?.name_tr,
    brand: { "@type": "Brand", name: "DecorPU" },
  };

  return (
    <Container className="py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={crumbs} />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={[...product.images, ...(product.drawing ? [product.drawing] : [])]} alt={product.name_tr} />

        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-sm bg-bg-subtle px-2 py-0.5 font-mono text-xs text-ink-soft">{product.code}</span>
            {product.category ? (
              <span className="text-xs text-muted">{product.category.name_tr}</span>
            ) : null}
          </div>
          <h1 className="mt-3 text-2xl font-semibold leading-snug sm:text-3xl">{product.name_tr}</h1>

          {shownDims.length ? (
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {shownDims.map(([label, v]) => (
                <div key={label} className="rounded-lg border border-line bg-surface px-3 py-2.5 text-center">
                  <div className="text-lg font-semibold tabular-nums">{v}</div>
                  <div className="text-[11px] text-muted">{label} · mm</div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <AddToQuoteButton code={product.code} name={product.name_tr} image={product.image} size="lg" />
            <Link href="/teklif" className="text-sm text-muted transition-colors hover:text-accent">
              Teklif sepetini görüntüle →
            </Link>
          </div>
          <p className="mt-2 text-xs text-muted">Fiyat yok — projeye özel teklif modeli. Kodları sepete ekleyip tek formla gönderin.</p>

          {/* Specs */}
          <div className="mt-8 rounded-xl border border-line bg-surface p-5">
            <h2 className="mb-2 text-sm font-medium text-ink-soft">Teknik Özellikler</h2>
            <Spec label="Malzeme" value={product.material || "Poliüretan"} />
            <Spec label="Boyanabilir" value={yn(product.paintable)} />
            <Spec label="İç Mekan" value={yn(product.indoor)} />
            <Spec label="Dış Mekan" value={yn(product.outdoor)} />
            <Spec label="Su Geçirmez" value={yn(product.water_resistant)} />
            {product.weight_g ? <Spec label="Ağırlık" value={`${product.weight_g} g`} /> : null}
          </div>

          {product.description_tr ? (
            <div className="mt-6">
              <h2 className="mb-2 text-sm font-medium text-ink-soft">Açıklama</h2>
              <p className="text-sm leading-relaxed text-muted">{product.description_tr}</p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Related */}
      {related.length ? (
        <section className="mt-16">
          <h2 className="mb-5 text-xl font-semibold">Benzer Ürünler</h2>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
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
