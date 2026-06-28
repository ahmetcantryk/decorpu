import type { ReactElement } from "react";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { CategoryShowcase } from "@/components/site/CategoryShowcase";
import { ReferencesMarquee } from "@/components/site/ReferencesMarquee";
import { WorksGallery } from "@/components/site/WorksGallery";
import { ServicesSection } from "@/components/site/ServicesSection";
import { CodeSearch } from "@/components/site/CodeSearch";
import { cn } from "@/lib/utils";

/** Shared homepage body. Order: kategoriler → referans logoları (kayan) → çalışmalar → hizmetler → arama → atölye → teklif. */
export async function HomeBody(): Promise<ReactElement> {
  const t = await getTranslations("Home");

  return (
    <>
      <CategoryShowcase />

      <ReferencesMarquee />

      <WorksGallery />

      <ServicesSection />

      <section id="kod-ara" className="scroll-mt-20 border-y border-line bg-bg-subtle py-20">
        <Container className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">{t("searchTitle")}</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">{t("searchBody")}</p>
          <CodeSearch size="lg" className="mt-8" />
        </Container>
      </section>

      <section id="atolye" className="scroll-mt-20 border-t border-line bg-surface py-24">
        <Container className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-accent">{t("storyEyebrow")}</p>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl">{t("storyTitle")}</h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-muted">{t("storyBody")}</p>
            <Link href="/iletisim" className={cn(buttonVariants({ variant: "ghost", size: "md" }), "mt-6 px-0")}>
              {t("storyCta")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      <section id="teklif" className="scroll-mt-20 py-24">
        <Container>
          <div className="rounded-lg bg-ink px-8 py-14 text-center md:px-16 md:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl text-bg sm:text-4xl md:text-5xl">{t("quoteTitle")}</h2>
            <p className="mx-auto mt-5 max-w-xl text-bg/65">{t("quoteBody")}</p>
            <Link href="/teklif" className={cn(buttonVariants({ variant: "accent", size: "lg" }), "mt-8")}>
              {t("quoteCta")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
