"use client";

import { useState, type ReactElement } from "react";
import Image from "next/image";
import { Maximize2, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { Container } from "@/components/ui/Container";
import { GALLERY_IMAGES } from "@/lib/catalog-images";

/** Product gallery — click to open a zoomable, swipeable lightbox; hover for actions. */
export function Gallery(): ReactElement {
  const t = useTranslations("Home");
  const [index, setIndex] = useState(-1);
  const slides = GALLERY_IMAGES.map((src) => ({ src }));

  return (
    <section id="galeri" className="scroll-mt-20 border-t border-line bg-bg-subtle py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-accent">{t("galleryTitle")}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl">{t("gallerySubtitle")}</h2>
          </div>
          <p className="font-mono text-xs text-muted">{GALLERY_IMAGES.length} görsel</p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY_IMAGES.map((src, i) => (
            <li key={src}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setIndex(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIndex(i)}
                className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-md border border-line bg-surface"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/55 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="pointer-events-auto inline-flex items-center gap-1 rounded-sm bg-accent px-2.5 py-1 text-xs font-medium text-accent-fg"
                  >
                    <Plus className="size-3.5" />
                    {t("addToQuote")}
                  </button>
                  <span className="pointer-events-none inline-flex size-8 items-center justify-center rounded-full bg-bg/90 text-ink">
                    <Maximize2 className="size-4" />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom, Counter]}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        styles={{ container: { backgroundColor: "rgba(22,23,27,0.92)" } }}
      />
    </section>
  );
}
