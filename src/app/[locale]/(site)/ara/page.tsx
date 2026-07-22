import type { ReactElement } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { CodeSearch } from "@/components/site/CodeSearch";
import { ProductCard } from "@/components/site/ProductCard";
import { searchProducts } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ q?: string }>;
}

/** Ürün kodu / ad ile arama — Supabase'e bağlı canlı sonuçlar. */
export default async function SearchPage({ params, searchParams }: SearchPageProps): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  const { q } = await searchParams;
  const t = await getTranslations("Search");

  const results = q ? await searchProducts(q) : [];

  return (
    <Container className="py-12 md:py-16">
      <h1 className="text-3xl font-semibold sm:text-4xl">{t("label")}</h1>
      <CodeSearch size="lg" className="mt-6 max-w-xl" autoFocus />

      {q ? (
        <>
          <p className="mt-6 text-sm text-muted">
            {t.rich("results", {
              query: q,
              count: results.length,
              q: (chunks) => <span className="font-mono uppercase text-ink">{chunks}</span>,
            })}
          </p>
          {results.length ? (
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {results.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 rounded-lg border border-line bg-surface px-4 py-12 text-center text-muted">
              {t("noResults")}
            </p>
          )}
        </>
      ) : (
        <p className="mt-8 text-muted">{t("prompt")}</p>
      )}
    </Container>
  );
}
