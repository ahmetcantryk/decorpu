"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useMemo, type ReactElement } from "react";
import { heroColonnade } from "@/lib/architecture";
import { cn } from "@/lib/utils";

const VIEW_W = 1200;
const VIEW_H = 600;

interface HeroColonnadeProps {
  className?: string;
}

/** Symmetric perspective colonnade that frames the hero — procedurally generated, draws on load. */
export function HeroColonnade({ className }: HeroColonnadeProps): ReactElement {
  const reduce = useReducedMotion() ?? false;
  const { sketch, accent } = useMemo(() => heroColonnade(VIEW_W, VIEW_H), []);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.045, delayChildren: reduce ? 0 : 0.15 } },
  };
  const draw: Variants = {
    hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: reduce ? 0 : 1.3, ease: "easeInOut" },
        opacity: { duration: reduce ? 0 : 0.3 },
      },
    },
  };

  return (
    <motion.svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMax meet"
      className={cn("line-art line-art-sketch", className)}
      initial="hidden"
      animate="visible"
      variants={container}
      aria-hidden="true"
    >
      {sketch.map((d, i) => (
        <motion.path key={i} variants={draw} d={d} />
      ))}
      {accent.map((d, i) => (
        <motion.path key={`a${i}`} variants={draw} className="line-art-accent" d={d} strokeWidth={1.7} />
      ))}
    </motion.svg>
  );
}
