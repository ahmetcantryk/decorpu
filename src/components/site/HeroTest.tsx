import type { ReactElement } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Alternative hero (/test) — copy on the left, a large editorial image on the
 * right with a second image as an overlapping accent card for depth.
 */
export function HeroTest(): ReactElement {
  const t = useTranslations("Hero");

  return (
    <section className="border-b border-line bg-bg">
      <Container className="grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24">
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

        {/* Right: large image + overlapping accent card */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          {/* offset accent frame for depth */}
          <div className="absolute -right-3 -top-3 hidden h-full w-full rounded-2xl border border-accent/30 lg:block" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-bg-subtle shadow-pop">
            <Image
              src="/test/hero-2.webp"
              alt="DecorPU klasik altın kolonad galerisi"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* overlapping second image */}
          <div className="absolute -bottom-6 -left-6 hidden w-40 overflow-hidden rounded-xl border-4 border-bg shadow-pop sm:block lg:w-52">
            <div className="relative aspect-[3/4]">
              <Image
                src="/test/hero-1.webp"
                alt="DecorPU klasik merdiven holü"
                fill
                sizes="208px"
                className="object-cover"
              />
            </div>
          </div>

          {/* small caption chip */}
          <div className="absolute right-4 top-4 rounded-full bg-bg/85 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-ink shadow-soft backdrop-blur-sm">
            Mimari dekorasyon
          </div>
        </div>
      </Container>
    </section>
  );
}
