import type { ReactElement } from "react";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { CATEGORIES, categoryName } from "@/lib/taxonomy";
import { getCategoryTree } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

const PLACEHOLDER = "/placeholder.svg";

/** Image-driven category grid — gerçek render kapak görselleri (DB), yoksa placeholder. */
export async function CategoryShowcase(): Promise<ReactElement> {
  const t = await getTranslations("Home");
  const locale = (await getLocale()) as Locale;
  const tree = await getCategoryTree();
  const coverBySlug = new Map(tree.map((n) => [n.slug, n.cover]));

  // Gerçek kapak görseli olan kategoriler başa — placeholder'lı olanlar sona (grup içi sıra korunur).
  const withCover = CATEGORIES.filter((c) => coverBySlug.get(c.slug));
  const withoutCover = CATEGORIES.filter((c) => !coverBySlug.get(c.slug));
  const ordered = [...withCover, ...withoutCover];

  return (
    <section id="kategoriler" className="scroll-mt-20 py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-accent">{t("categoriesTitle")}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">{t("categoriesSubtitle")}</h2>
          </div>
          <Link href="/kategoriler" className="text-sm text-ink-soft transition-colors hover:text-accent">
            {t("categoriesCta")} →
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ordered.map((cat) => {
            const img = coverBySlug.get(cat.slug) || PLACEHOLDER;
            return (
              <li key={cat.slug}>
                <Link href={`/kategoriler/${cat.slug}`} className="group block overflow-hidden rounded-md border border-line bg-surface">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img}
                      alt={categoryName(cat, locale)}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5">
                      <span className="font-display text-lg font-medium text-white drop-shadow">
                        {categoryName(cat, locale)}
                      </span>
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-bg/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
