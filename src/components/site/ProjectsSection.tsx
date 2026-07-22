import type { ReactElement } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PROJECT_IMAGES } from "@/lib/catalog-images";

/** Projects / applications — real installation photos. Case studies + product links: Faz 2. */
export function ProjectsSection(): ReactElement {
  const t = useTranslations("Home");
  const items = PROJECT_IMAGES.slice(0, 6);
  if (!items.length) return <></>;

  return (
    <section id="projeler" className="scroll-mt-20 py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wide text-accent">{t("projectsTitle")}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">{t("projectsSubtitle")}</h2>
          <p className="mt-3 text-muted">{t("projectsNote")}</p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((src, i) => (
            <li key={src}>
              <article className="group relative overflow-hidden rounded-md border border-line">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={src}
                    alt="DecorPU uygulama"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                  <span className="font-display text-lg text-bg">{t("projectLabel")}</span>
                  <span className="flex size-7 items-center justify-center rounded-full bg-bg/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
