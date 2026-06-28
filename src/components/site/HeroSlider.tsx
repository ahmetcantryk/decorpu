"use client";

import { useState, useEffect, type ReactElement } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface HeroSliderProps {
  images: string[];
}

/** Auto-rotating image slider for the hero (right side keeps changing). */
export function HeroSlider({ images }: HeroSliderProps): ReactElement {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (images.length < 2 || reduce) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % images.length), 4200);
    return () => clearInterval(id);
  }, [images.length, reduce]);

  return (
    <div className="relative">
      <div className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-lg border border-accent/40 lg:block" />
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-bg-subtle shadow-pop">
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <Image
              src={images[index]}
              alt="DecorPU poliüretan mimari dekorasyon uygulaması"
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((src, k) => (
            <button
              key={src}
              type="button"
              aria-label={`Görsel ${k + 1}`}
              onClick={() => setIndex(k)}
              className={cn(
                "h-1.5 rounded-full bg-bg/60 transition-all hover:bg-bg",
                k === index ? "w-5 bg-bg" : "w-1.5",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
