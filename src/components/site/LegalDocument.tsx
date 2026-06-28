import type { ReactElement } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export interface LegalSection {
  heading: string;
  /** Paragraflar; `\n` satır sonları korunur (madde listeleri için). */
  paragraphs: string[];
}

export interface LegalContent {
  home: string;
  crumb: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

/**
 * Yasal/KVKK metinleri için ortak düzen — proje renginde (turuncu) banner başlık
 * + geniş, okunur içerik. Tamamen mobil uyumlu.
 */
export function LegalDocument({ content }: { content: LegalContent }): ReactElement {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: content.home, path: "/" }, { name: content.crumb }])} />

      {/* Banner — proje rengi (turuncu) */}
      <section className="bg-accent text-accent-fg">
        <Container className="py-10 sm:py-14 md:py-16">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-accent-fg/80">
            <Link href="/" className="transition-opacity hover:opacity-80">
              {content.home}
            </Link>
            <ChevronRight className="size-3.5 opacity-70" />
            <span className="font-medium text-accent-fg">{content.crumb}</span>
          </nav>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-accent-fg sm:text-4xl md:text-5xl">{content.title}</h1>
          <p className="mt-3 text-sm text-accent-fg/80">{content.updated}</p>
        </Container>
      </section>

      {/* İçerik */}
      <Container className="py-10 md:py-14">
        <div className="max-w-3xl">
          <p className="text-base leading-relaxed text-ink-soft">{content.intro}</p>

          <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
            {content.sections.map((s) => (
              <section key={s.heading} className="scroll-mt-24">
                <h2 className="text-lg font-semibold text-ink sm:text-xl">{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="mt-2.5 whitespace-pre-line text-[15px] leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
