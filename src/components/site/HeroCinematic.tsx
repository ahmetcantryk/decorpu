"use client";

import { useState, useEffect, useCallback, type ReactElement } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowDown, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/Button";
import { HERO_SLIDES } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

/**
 * Alternatif A — Sinematik full-bleed slider. Tam genişlik, alçak yükseklik
 * (alttaki kategoriler ilk ekranda yarı görünsün). Soldan koyu gradient + metin.
 */
export function HeroCinematic(): ReactElement {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const n = HERO_SLIDES.length;

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + n) % n), [n]);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % n), 5000);
    return () => clearInterval(id);
  }, [n, reduce]);

  return (
    <section className="relative w-full overflow-hidden bg-ink h-[clamp(15rem,40vh,24rem)]">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 1, ease: "easeInOut" }}
        >
          <Image
            src={HERO_SLIDES[index].src}
            alt={HERO_SLIDES[index].alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* scrim */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />

      <Container className="relative flex h-full flex-col justify-center">
        <p className="font-mono text-xs uppercase tracking-wide text-white/75">
          Poliüretan mimari dekorasyon · Proje bazlı imalat
        </p>
        <h1 className="mt-3 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
          Mimarın çizgisini imalata dönüştürüyoruz.
        </h1>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link href="/kategoriler" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
            Kataloğu keşfet
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="#kategoriler"
            className="inline-flex h-12 items-center gap-2 rounded-sm border border-white/40 px-6 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Kategoriler
            <ArrowDown className="size-4" />
          </a>
        </div>
      </Container>

      {/* arrows */}
      <button type="button" onClick={() => go(-1)} aria-label="Önceki" className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30 sm:flex">
        <ChevronLeft className="size-5" />
      </button>
      <button type="button" onClick={() => go(1)} aria-label="Sonraki" className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30 sm:flex">
        <ChevronRight className="size-5" />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Görsel ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn("h-1.5 rounded-full bg-white/50 transition-all hover:bg-white", i === index ? "w-6 bg-white" : "w-1.5")}
          />
        ))}
      </div>
    </section>
  );
}
