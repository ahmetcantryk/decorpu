"use client";

import { motion, useScroll, useReducedMotion } from "motion/react";
import { useRef, type ReactElement } from "react";
import { cn } from "@/lib/utils";

interface ScrollLineProps {
  className?: string;
}

/**
 * A continuous accent contour that draws itself as the section scrolls past
 * (Lemonade-style). Threads the page together; the brand's vertical "spine".
 */
export function ScrollLine({ className }: ScrollLineProps): ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className={cn("pointer-events-none", className)} aria-hidden="true">
      <svg viewBox="0 0 40 600" preserveAspectRatio="none" className="h-full w-full">
        <motion.path
          className="line-art line-art-accent"
          d="M20 0 C 6 120, 34 240, 20 360 S 6 540, 20 600"
          style={{ pathLength: reduce ? 1 : scrollYProgress }}
        />
      </svg>
    </div>
  );
}
