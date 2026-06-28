"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

interface HeroSceneProps {
  side: "left" | "right";
  className?: string;
}

function ticks(xStart: number, xEnd: number, step: number, yTop: number, yBottom: number): string {
  let d = "";
  for (let x = xStart; x <= xEnd; x += step) d += `M${x} ${yTop} V${yBottom} `;
  return d.trim();
}

/** Architectural line-art (gray sketch) that frames the centered hero — Lemonade-style scenery. */
export function HeroScene({ side, className }: HeroSceneProps): ReactElement {
  const reduce = useReducedMotion() ?? false;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.2 } },
  };
  const draw: Variants = {
    hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: reduce ? 0 : 1.4, ease: "easeInOut" },
        opacity: { duration: reduce ? 0 : 0.3 },
      },
    },
  };

  const paths = side === "left" ? LEFT : RIGHT;
  const accents = side === "left" ? LEFT_ACCENT : RIGHT_ACCENT;
  const aspect = side === "left" ? "xMinYMax meet" : "xMaxYMax meet";

  return (
    <motion.svg
      viewBox="0 0 340 580"
      preserveAspectRatio={aspect}
      className={cn("line-art line-art-sketch h-full w-full", className)}
      initial="hidden"
      animate="visible"
      variants={container}
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <motion.path key={i} variants={draw} d={d} />
      ))}
      {accents.map((d, i) => (
        <motion.path key={`a${i}`} variants={draw} className="line-art-accent" d={d} strokeWidth={1.6} />
      ))}
    </motion.svg>
  );
}

// Left: a classical pedimented portico (two fluted columns, entablature, pediment, steps)
const LEFT: string[] = [
  "M8 544 H332", // ground
  "M44 544 V524 H296 V544 M58 524 V508 H282 V524", // steps
  "M92 302 V508 M120 302 V508", // left column shaft
  "M84 508 H128 V524 H84", // left base
  "M84 302 H128 V288 H84 M80 288 H132", // left capital
  "M220 302 V508 M248 302 V508", // right column shaft
  "M212 508 H256 V524 H212", // right base
  "M212 302 H256 V288 H212 M208 288 H260", // right capital
  ticks(100, 114, 7, 314, 500), // left flutes
  ticks(228, 242, 7, 314, 500), // right flutes
  "M72 288 H268 V268 H72 Z M76 268 H264", // entablature
  ticks(86, 254, 13, 255, 266), // dentils
  "M60 255 L170 196 L280 255", // pediment outer
  "M80 255 L170 208 L262 255", // pediment inner
];
const LEFT_ACCENT: string[] = [
  "M170 178 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0", // red roundel at apex
];

// Right: a grand fluted column + cornice profile stack + floating ceiling medallion
const RIGHT: string[] = [
  "M8 544 H332", // ground
  "M150 252 V518 M186 252 V518", // grand column shaft
  "M140 518 H196 V536 H140", // base
  "M140 252 H196 M136 252 Q168 240 200 252", // abacus + echinus
  "M146 252 V238 Q146 226 158 226 M190 252 V238 Q190 226 178 226 M150 238 Q168 232 186 238", // volutes
  ticks(158, 178, 7, 264, 510), // flutes
  "M28 304 H120 M28 304 V292 H120 M36 292 V280 H120 M44 280 Q48 274 44 268 H120 M44 268 V256 H120", // cornice stack
  ticks(40, 112, 12, 292, 302), // cornice dentils
  "M250 120 m-26 0 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0", // medallion outer
  "M250 120 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0", // medallion inner
  "M250 94 V104 M250 136 V146 M224 120 H234 M266 120 H276 M232 102 L239 109 M268 138 L261 131 M268 102 L261 109 M232 138 L239 131", // medallion rays
];
const RIGHT_ACCENT: string[] = [
  "M250 120 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0", // red center of medallion
];
