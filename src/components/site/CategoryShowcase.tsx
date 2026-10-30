import type { ReactElement } from "react";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { getCategoryTree } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

const PLACEHOLDER = "/placeholder.svg";

/** Image-driven category grid — gerçek render kapak görselleri (DB), yoksa placeholder. */
export async function CategoryShowcase(): Promise<ReactElement> {
  const t = await getTranslations("Home");
  const locale = (await getLocale()) as Locale;
  const tree = await getCategoryTree();
  // Panelden yönetilen DB ağacı (kapaklılar zaten başta) — statik taksonomi değil.
  const ordered = tree;
  const nameOf = (c: { name_tr: string; name_en: string | null }): string =>
    locale === "en" ? c.name_en ?? c.name_tr : c.name_tr;

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
            const img = cat.cover || PLACEHOLDER;
            return (
              <li key={cat.slug}>
                <Link href={`/kategoriler/${cat.slug}`} className="group block overflow-hidden rounded-md border border-line bg-surface transition-colors hover:border-accent/60">
                  {/* görsel kutuyu tam doldurur: kaynaklar kare, kutu da kare — ne boşluk ne kırpma */}
                  <div className="relative aspect-square overflow-hidden bg-bg-subtle">
                    <Image
                      src={img}
                      alt={nameOf(cat)}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  {/* isim görselin ALTINDA — turuncu ayraç + turuncu ok */}
                  <div className="flex items-center justify-between gap-2 border-t-2 border-accent px-3.5 py-3">
                    <span className="min-w-0 truncate font-display text-base font-medium text-ink transition-colors group-hover:text-accent sm:text-lg">
                      {nameOf(cat)}
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
