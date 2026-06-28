import type { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { HeroSlider } from "./HeroSlider";
import { HERO_IMAGES } from "@/lib/catalog-images";
import { cn } from "@/lib/utils";

/** Split hero — copy on the left, an auto-rotating photo slider on the right. */
export function Hero(): ReactElement {
  const t = useTranslations("Hero");

  return (
    <section className="border-b border-line bg-bg">
      <Container className="grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-wide text-accent">{t("eyebrow")}</p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.04] sm:text-6xl md:text-7xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{t("subtitle")}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#kod-ara" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
              {t("ctaPrimary")}
              <ArrowDown className="size-4" />
            </a>
            <a href="#kategoriler" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              {t("ctaSecondary")}
              <ArrowRight className="size-4" />
            </a>
          </div>
          <p className="mt-10 font-mono text-xs uppercase tracking-wide text-muted">
            Söve · Sütun · Kartonpiyer · Kemer · Kubbe · Şömine
          </p>
        </div>

        <HeroSlider images={HERO_IMAGES} />
      </Container>
    </section>
  );
}
