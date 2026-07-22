"use client";

import { useState, useEffect, useCallback, type ReactElement } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }): ReactElement {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const list = images.length ? images : [];
  const n = list.length;

  const go = useCallback((dir: number) => setActive((i) => (i + dir + n) % n), [n]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, go]);

  return (
    <div>
      {/* ana görsel — tıklayınca tam ekran açılır */}
      <button
        type="button"
        onClick={() => list[active] && setLightbox(true)}
        aria-label="Görseli büyüt"
        className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-line bg-bg-subtle"
      >
        {list[active] ? (
          <>
            <Image src={list[active]} alt={alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <Expand className="size-4" />
            </span>
          </>
        ) : (
          <Image src="/placeholder.svg" alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        )}
      </button>

      {n > 1 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {list.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative size-16 overflow-hidden rounded-md border bg-bg-subtle transition-colors",
                i === active ? "border-accent" : "border-line hover:border-ink",
              )}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}

      {/* tam ekran lightbox */}
      {lightbox && list[active] ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Kapat"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <X className="size-5" />
          </button>

          <div onClick={(e) => e.stopPropagation()} className="relative flex h-full w-full max-w-5xl items-center justify-center">
            <div className="relative h-full max-h-[80vh] w-full">
              <Image src={list[active]} alt={alt} fill sizes="100vw" className="object-contain" />
            </div>

            {n > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Önceki"
                  className="absolute left-0 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:-left-4"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Sonraki"
                  className="absolute right-0 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:-right-4"
                >
                  <ChevronRight className="size-6" />
                </button>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white">
                  {active + 1} / {n}
                </span>
              </>
            ) : null}
          </div>

          {/* alt küçük görsel şeridi */}
          {n > 1 ? (
            <div onClick={(e) => e.stopPropagation()} className="absolute inset-x-0 bottom-4 mx-auto hidden max-w-3xl flex-wrap justify-center gap-2 px-4 sm:flex">
              {list.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative size-14 overflow-hidden rounded-md border transition-opacity",
                    i === active ? "border-white opacity-100" : "border-white/30 opacity-60 hover:opacity-100",
                  )}
                >
                  <Image src={src} alt="" fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
