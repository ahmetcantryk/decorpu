"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

interface HeroLineArtProps {
  className?: string;
}

/** Repeat a vertical tick pattern into a single SVG path string. */
function ticks(xStart: number, xEnd: number, step: number, yTop: number, yBottom: number): string {
  let d = "";
  for (let x = xStart; x <= xEnd; x += step) d += `M${x} ${yTop} V${yBottom} `;
  return d.trim();
}

/**
 * Hand-drawn classical elevation (cornice · arched opening · fluted column ·
 * dimension lines) that draws on load. The brand's anti-AI signature.
 */
export function HeroLineArt({ className }: HeroLineArtProps): ReactElement {
  const reduce = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.16, delayChildren: reduce ? 0 : 0.12 } },
  };
  const draw: Variants = {
    hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: reduce ? 0 : 1.5, ease: "easeInOut" },
        opacity: { duration: reduce ? 0 : 0.25 },
      },
    },
  };

  return (
    <motion.svg
      viewBox="0 0 480 420"
      className={cn("line-art h-auto w-full", className)}
      initial="hidden"
      animate="visible"
      variants={container}
      aria-hidden="true"
    >
      {/* Cornice band + dentils */}
      <motion.path variants={draw} d="M118 72 H362 M118 80 H362 M126 90 H354" />
      <motion.path variants={draw} d={ticks(132, 348, 16, 80, 90)} strokeWidth={0.9} />

      {/* Outer + inner arch (archivolt accent) */}
      <motion.path variants={draw} d="M150 150 A 90 90 0 0 1 330 150" />
      <motion.path variants={draw} className="line-art-accent" d="M170 150 A 70 70 0 0 1 310 150" />

      {/* Jambs of the opening */}
      <motion.path variants={draw} d="M150 150 V372 M170 150 V360 M310 150 V360 M330 150 V372" />

      {/* Fluted column in front */}
      <motion.path variants={draw} d="M70 156 H112 M66 156 Q91 150 116 156" />
      <motion.path variants={draw} d="M70 158 H110 V170 H70 Z" />
      <motion.path variants={draw} d="M74 170 V360 M106 170 V360" />
      <motion.path variants={draw} d={ticks(82, 98, 8, 178, 352)} strokeWidth={0.9} />
      <motion.path variants={draw} d="M67 360 H113 V374 H67 Z" />

      {/* Ground line */}
      <motion.path variants={draw} d="M40 374 H440" />

      {/* Dimension lines (technical detail) */}
      <motion.path variants={draw} d="M50 170 V360 M46 170 H54 M46 360 H54" strokeWidth={0.85} />
      <motion.path variants={draw} d="M150 392 H330 M150 388 V396 M330 388 V396" strokeWidth={0.85} />

      {/* Mono dimension labels */}
      <motion.g
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.6, duration: reduce ? 0 : 0.5 }}
        fill="var(--color-muted)"
        stroke="none"
        fontFamily="var(--font-mono)"
        fontSize="11"
      >
        <text x="30" y="268" textAnchor="middle">Y</text>
        <text x="240" y="410" textAnchor="middle">B</text>
      </motion.g>
    </motion.svg>
  );
}
