import type { ReactElement } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { ServiceIcon } from "./ServiceIcon";
import { getServices } from "@/lib/services";

/** "Hizmetlerimiz" — 6 hizmet, görselli kartlar, detay sayfasına link. */
export async function ServicesSection(): Promise<ReactElement> {
  const services = await getServices();
  if (!services.length) return <></>;

  const t = await getTranslations("Services");
  const tCommon = await getTranslations("Common");

  return (
    <section id="hizmetler" className="scroll-mt-20 border-t border-line bg-bg-subtle py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-accent">{t("eyebrow")}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">{t("title")}</h2>
            <p className="mt-2 max-w-xl text-muted">{t("homeSubtitle")}</p>
          </div>
          <Link href="/hizmetler" className="text-sm text-ink-soft transition-colors hover:text-accent">
            {tCommon("viewAll")} →
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.id}>
              <Link href={`/hizmetler/${s.slug}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-shadow hover:shadow-soft">
                <div className="relative aspect-[16/10] overflow-hidden bg-bg-subtle">
                  {s.image_url ? (
                    <Image src={s.image_url} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  <span className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-md bg-white/90 text-ink">
                    <ServiceIcon icon={s.icon} className="size-4.5" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-medium text-ink transition-colors group-hover:text-accent">{s.title}</h3>
                  {s.summary ? <p className="mt-1.5 line-clamp-2 text-sm text-muted">{s.summary}</p> : null}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    {t("details")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
