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
                <Link href={`/kategoriler/${cat.slug}`} className="group block overflow-hidden rounded-md border border-line bg-surface transition-colors hover:border-accent/60">
                  {/* görsel tam ve temiz — overlay/gradient yok, kırpma yok (object-contain) */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
                    <Image
                      src={img}
                      alt={categoryName(cat, locale)}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain"
                    />
                  </div>
                  {/* isim görselin ALTINDA — turuncu ayraç + turuncu ok */}
                  <div className="flex items-center justify-between gap-2 border-t-2 border-accent px-3.5 py-3">
                    <span className="min-w-0 truncate font-display text-base font-medium text-ink transition-colors group-hover:text-accent sm:text-lg">
                      {categoryName(cat, locale)}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-accent" />
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
