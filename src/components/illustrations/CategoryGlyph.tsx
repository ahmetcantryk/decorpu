import type { ReactElement } from "react";
import type { GlyphId } from "@/lib/taxonomy";
import { cn } from "@/lib/utils";

interface CategoryGlyphProps {
  glyph: GlyphId;
  className?: string;
  /** Pixel size of the square glyph. */
  size?: number;
  title?: string;
}

/**
 * Bespoke line-art glyph for each category. Pure SVG (server component),
 * stroked via the global `.line-art` class — hand-drawn architectural feel,
 * deliberately NOT stock icons (anti-AI brand signature).
 */
export function CategoryGlyph({ glyph, className, size = 48, title }: CategoryGlyphProps): ReactElement {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn("line-art", className)}
    >
      {title ? <title>{title}</title> : null}
      {GLYPHS[glyph]}
    </svg>
  );
}

const GLYPHS: Record<GlyphId, ReactElement> = {
  jamb: (
    <>
      <rect x="14" y="8" width="20" height="32" />
      <rect x="10" y="5" width="28" height="3" />
      <path d="M14 8 L11 8 M34 8 L37 8 M14 40 L11 40 M34 40 L37 40" />
      <path d="M19 13 H29 M19 13 V35 M29 13 V35" />
    </>
  ),
  column: (
    <>
      <path d="M16 14 H32 M15 14 Q24 11 33 14" />
      <rect x="18" y="14" width="12" height="3" />
      <path d="M19 17 V37 M24 17 V37 M29 17 V37" />
      <rect x="17" y="37" width="14" height="4" />
      <path d="M15 41 H33" />
    </>
  ),
  arch: (
    <>
      <path d="M10 40 V20 A14 14 0 0 1 38 20 V40" />
      <path d="M14 40 V22 A10 10 0 0 1 34 22 V40" />
      <path d="M7 40 H41" />
    </>
  ),
  cornice: (
    <>
      <path d="M8 14 H40 M8 14 V19 H40 M11 19 V24 H40 M14 24 Q16 27 14 30 H40 M14 30 V34 H40" />
    </>
  ),
  "ceiling-rose": (
    <>
      <circle cx="24" cy="24" r="5" />
      <circle cx="24" cy="24" r="11" />
      <circle cx="24" cy="24" r="17" />
      <path d="M24 7 V13 M24 35 V41 M7 24 H13 M35 24 H41 M12 12 L16 16 M36 36 L32 32 M36 12 L32 16 M12 36 L16 32" />
    </>
  ),
  dome: (
    <>
      <path d="M8 38 A16 16 0 0 1 40 38" />
      <path d="M24 6 V22" />
      <path d="M24 22 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0" />
      <path d="M14 38 Q24 20 14 38 M20 38 Q24 16 20 38 M28 38 Q24 16 28 38 M34 38 Q24 20 34 38" />
      <path d="M7 38 H41" />
    </>
  ),
  crown: (
    <>
      <path d="M8 34 L24 14 L40 34" />
      <path d="M11 34 L24 18 L37 34" />
      <path d="M6 34 H42 M6 38 H42" />
    </>
  ),
  moulding: (
    <>
      <path d="M8 18 H40 M8 18 Q12 18 12 24 T20 30 H40 M8 18 V34 H40 V30" />
      <path d="M8 34 H40" />
    </>
  ),
  panel: (
    <>
      <rect x="9" y="9" width="30" height="30" />
      <rect x="15" y="15" width="18" height="18" />
      <path d="M9 9 L15 15 M39 9 L33 15 M9 39 L15 33 M39 39 L33 33" />
    </>
  ),
  corbel: (
    <>
      <path d="M14 10 H34 V14 H18 Q18 26 30 30 Q16 30 16 40" />
      <path d="M12 10 H36" />
      <path d="M18 14 Q26 18 22 24 Q19 28 24 30" />
    </>
  ),
  beam: (
    <>
      <rect x="7" y="18" width="34" height="12" />
      <path d="M11 22 H37 M11 26 H37" />
      <path d="M7 18 L4 21 M41 18 L44 21 M7 30 L4 27 M41 30 L44 27" />
    </>
  ),
  ornament: (
    <>
      <path d="M24 40 C24 30 14 30 14 22 C14 16 22 16 24 22 C26 16 34 16 34 22 C34 30 24 30 24 40 Z" />
      <path d="M24 22 V34 M19 24 Q24 28 29 24" />
    </>
  ),
  frame: (
    <>
      <rect x="9" y="9" width="30" height="30" />
      <rect x="14" y="14" width="20" height="20" />
      <path d="M9 9 L14 14 M39 9 L34 14 M9 39 L14 34 M39 39 L34 34" />
    </>
  ),
  skirting: (
    <>
      <path d="M8 36 H40 V26 Q40 22 36 22 Q34 22 34 26 V32 H8" />
      <path d="M8 40 H40" />
    </>
  ),
  fireplace: (
    <>
      <path d="M8 14 H40 V18 H8 Z" />
      <path d="M11 18 V40 M37 18 V40 M11 40 H37" />
      <path d="M16 40 V26 H32 V40" />
      <path d="M22 40 Q24 33 26 40" />
    </>
  ),
  balustrade: (
    <>
      <path d="M8 13 H40 M8 16 H40 M8 35 H40 M8 38 H40" />
      <path d="M13 16 V35 M13 22 Q9 25 13 28 M13 22 Q17 25 13 28" />
      <path d="M24 16 V35 M24 22 Q20 25 24 28 M24 22 Q28 25 24 28" />
      <path d="M35 16 V35 M35 22 Q31 25 35 28 M35 22 Q39 25 35 28" />
    </>
  ),
  facade: (
    <>
      <path d="M8 40 V16 H40 V40" />
      <path d="M6 16 H42 M6 12 H42" />
      <rect x="13" y="22" width="7" height="9" />
      <rect x="28" y="22" width="7" height="9" />
      <path d="M20 40 V33 H28 V40" />
    </>
  ),
  adhesive: (
    <>
      <path d="M16 12 H26 V20 L30 24 V40 H16 Z" />
      <path d="M26 12 V16 H30" />
      <path d="M20 28 H26" />
      <path d="M34 16 L40 14 L40 18 Z M34 16 L31 22" />
    </>
  ),
};
