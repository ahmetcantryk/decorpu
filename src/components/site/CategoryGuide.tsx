import type { ReactElement } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { CATEGORY_GUIDES } from "@/content/category-guides";

/**
 * Kategori SEO rehberi — ürün grid'inin altına derin içerik + SSS basar (yalnız TR).
 * SSS bölümü FAQPage yapısal verisiyle işaretlenir (zengin sonuç uygunluğu).
 */
export function CategoryGuide({ slug, locale }: { slug: string; locale: string }): ReactElement | null {
  if (locale !== "tr") return null;
  const guide = CATEGORY_GUIDES[slug];
  if (!guide) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="mt-16 border-t border-line pt-10">
      <JsonLd data={faqSchema} />

      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold sm:text-3xl">{guide.title}</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">{guide.intro}</p>

        <div className="mt-8 space-y-8">
          {guide.sections.map((s) => (
            <div key={s.h}>
              <h3 className="text-lg font-semibold text-ink">{s.h}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-12 border-l-4 border-accent pl-3 text-xl font-semibold">Sık Sorulan Sorular</h3>
        <div className="mt-4 divide-y divide-line rounded-xl border border-line bg-surface">
          {guide.faq.map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="cursor-pointer list-none font-medium text-ink transition-colors group-open:text-accent [&::-webkit-details-marker]:hidden">
                {f.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
