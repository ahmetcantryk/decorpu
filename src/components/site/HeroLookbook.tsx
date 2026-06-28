"use client";

import { useState, useEffect, type ReactElement } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/Button";
import { HERO_SLIDES } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

/**
 * Alternatif B — Lookbook/katalog tarzı. Tam genişlik, alçak yükseklik; ortalanmış
 * başlık + altta thumbnail şeridi (slayt seçimi). Kategoriler hemen altta peek eder.
 */
export function HeroLookbook(): ReactElement {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const n = HERO_SLIDES.length;

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % n), 5000);
    return () => clearInterval(id);
  }, [n, reduce]);

  return (
    <section className="relative w-full overflow-hidden bg-ink h-[clamp(20rem,52vh,30rem)]">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: "easeInOut" }}
        >
          <Image src={HERO_SLIDES[index].src} alt={HERO_SLIDES[index].alt} fill priority={index === 0} sizes="100vw" className="object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/45" />

      <Container className="relative flex h-full flex-col items-center justify-center text-center">
        <p className="font-mono text-xs uppercase tracking-wide text-white/80">DecorPU · Mimari Dekorasyon Kataloğu</p>
        <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
          Mimarın çizgisini imalata dönüştürüyoruz.
        </h1>
        <Link href="/kategoriler" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-7")}>
          Kataloğu keşfet
          <ArrowRight className="size-4" />
        </Link>
      </Container>

      {/* thumbnail strip */}
      <div className="absolute inset-x-0 bottom-0">
        <Container className="flex items-center justify-center gap-2 pb-4">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={s.alt}
              className={cn(
                "relative h-11 w-16 overflow-hidden rounded-md border-2 transition-all",
                i === index ? "border-accent opacity-100" : "border-white/40 opacity-60 hover:opacity-100",
              )}
            >
              <Image src={s.src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </Container>
      </div>
    </section>
  );
}
