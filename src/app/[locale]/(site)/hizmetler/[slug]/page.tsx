import type { ReactElement } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ServiceIcon } from "@/components/site/ServiceIcon";
import { ProductCard } from "@/components/site/ProductCard";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/Button";
import { getServiceBySlug, getServices } from "@/lib/services";
import { localizedAlternates, clampDescription, clampTitle } from "@/lib/seo";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s) {
    const t = await getTranslations({ locale });
    return { title: t("Services.notFound") };
  }

  const description = clampDescription(
    s.seo_description ?? s.summary ?? `${s.title} — DecorPU mimari dekorasyon proje hizmetleri.`,
  );
  return {
    title: clampTitle(s.seo_title ?? s.title),
    description,
    alternates: localizedAlternates(locale, `/hizmetler/${slug}`),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<ReactElement> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const s = await getServiceBySlug(slug);
  if (!s) notFound();
  const others = (await getServices()).filter((o) => o.slug !== slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.summary ?? undefined,
    provider: { "@type": "Organization", name: "DecorPU" },
    areaServed: "TR",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* hero */}
      <section className="relative w-full overflow-hidden bg-ink">
        <div className="relative h-[clamp(16rem,40vh,24rem)]">
          {s.image_url ? <Image src={s.image_url} alt={s.title} fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
          <Container className="relative flex h-full flex-col justify-end pb-8">
            <Breadcrumbs items={[{ label: t("Common.home"), href: "/" }, { label: t("Nav.services"), href: "/hizmetler" }, { label: s.title }]} />
            <div className="mt-3 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-lg bg-white/90 text-ink">
                <ServiceIcon icon={s.icon} className="size-5" />
              </span>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">{s.title}</h1>
            </div>
          </Container>
        </div>
      </section>

      <Container className="grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr] md:py-16">
        {/* content */}
        <article>
          {s.summary ? <p className="text-lg leading-relaxed text-ink-soft">{s.summary}</p> : null}
          {s.content ? <p className="mt-5 leading-relaxed text-muted">{s.content}</p> : null}

          {s.products.length ? (
            <section className="mt-10">
              <h2 className="mb-1 text-xl font-semibold">{t("Services.relatedProducts")}</h2>
              <p className="mb-5 text-sm text-muted">{t("Services.relatedProductsNote")}</p>
              <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {s.products.map((p) => (
                  <li key={p.id}>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>

        {/* CTA sidebar */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-28">
          <div className="rounded-xl border border-line bg-surface p-6">
            <h2 className="text-lg font-semibold">{s.cta_label ?? t("Nav.quote")}</h2>
            <p className="mt-2 text-sm text-muted">{t("Services.ctaNote")}</p>
            <div className="mt-5 flex flex-col gap-2">
              <Link href="/teklif" className={cn(buttonVariants({ variant: "primary", size: "md" }), "w-full")}>
                {s.cta_label ?? t("Nav.quote")}
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/iletisim" className={cn(buttonVariants({ variant: "outline", size: "md" }), "w-full")}>
                {t("Services.contactCta")}
              </Link>
              <a href={SITE.phoneHref} className="mt-1 flex items-center justify-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent">
                <Phone className="size-4" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          {others.length ? (
            <div className="rounded-xl border border-line bg-surface p-6">
              <h3 className="mb-3 text-sm font-medium text-ink-soft">{t("Services.others")}</h3>
              <ul className="space-y-1">
                {others.map((o) => (
                  <li key={o.id}>
                    <Link href={`/hizmetler/${o.slug}`} className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-ink-soft transition-colors hover:bg-bg-subtle hover:text-accent">
                      <ServiceIcon icon={o.icon} className="size-4 text-accent" />
                      {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </Container>
    </>
  );
}
