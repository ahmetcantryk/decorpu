import type { ReactElement } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { getProjects } from "@/lib/projects";

/**
 * "Çalışmalarımız" — görsel odaklı çalışma galerisi (eski Projeler bölümü).
 * Her kart bir çalışmanın detayına gider (galeri + kullanılan ürünler).
 */
export async function WorksGallery(): Promise<ReactElement> {
  const works = await getProjects();
  if (!works.length) return <></>;

  const t = await getTranslations("Works");
  const tCommon = await getTranslations("Common");

  return (
    <section id="calismalar" className="scroll-mt-20 py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-accent">{t("eyebrow")}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">{t("title")}</h2>
            <p className="mt-2 max-w-xl text-muted">{t("homeSubtitle")}</p>
          </div>
          <Link href="/calismalarimiz" className="text-sm text-ink-soft transition-colors hover:text-accent">
            {tCommon("viewAll")} →
          </Link>
        </div>

        {/* mobilde büyük tek sütun, başlık görselin altında (görseli kapatmaz) */}
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {works.map((w) => (
            <li key={w.id}>
              <Link href={`/calismalarimiz/${w.slug}`} className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-bg-subtle">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {w.cover_url ? (
                    <Image
                      src={w.cover_url}
                      alt={w.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex items-start justify-between gap-2 p-4">
                  <div>
                    <h3 className="font-display text-lg font-medium text-ink">{w.title}</h3>
                    {w.location ? <p className="mt-0.5 text-sm text-muted">{w.location}{w.year ? ` · ${w.year}` : ""}</p> : null}
                  </div>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bg text-ink-soft transition-colors group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="size-4" />
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
