import type { ReactElement } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CategoryGlyph } from "@/components/illustrations/CategoryGlyph";
import { CATEGORIES, categoryName } from "@/lib/taxonomy";
import type { Locale } from "@/i18n/routing";

/** Category grid driven by the canonical taxonomy, each with a bespoke line-art glyph. */
export function CategoryGrid(): ReactElement {
  const t = useTranslations("Home");
  const locale = useLocale() as Locale;

  return (
    <section id="kategoriler" className="scroll-mt-20 py-20">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl">{t("categoriesTitle")}</h2>
            <p className="mt-3 text-muted">{t("categoriesSubtitle")}</p>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const name = categoryName(cat, locale);
            const children = cat.children?.map((c) => categoryName(c, locale)).join(" · ");
            return (
              <li key={cat.slug}>
                {/* Faz 2'de href -> /kategoriler/[slug] */}
                <a
                  href="#kategoriler"
                  className="group flex h-full flex-col gap-5 bg-surface p-5 transition-colors hover:bg-bg-subtle"
                  aria-label={name}
                >
                  <span className="text-ink transition-colors group-hover:text-accent">
                    <CategoryGlyph glyph={cat.glyph} size={42} />
                  </span>
                  <span className="mt-auto">
                    <span className="flex items-center gap-1 text-base text-ink">
                      {name}
                      <ArrowUpRight className="size-3.5 -translate-y-px text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    {children ? (
                      <span className="mt-1 block text-xs leading-relaxed text-muted">{children}</span>
                    ) : null}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
