import type { ReactElement } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  onClick?: () => void;
}

/** decorpu wordmark — matches the catalog logo: serif "Decor" (ink) + "PU" (brand orange). */
export function Wordmark({ className, onClick }: WordmarkProps): ReactElement {
  return (
    <Link
      href="/"
      aria-label="DecorPU"
      onClick={onClick}
      className={cn("font-display text-2xl font-semibold leading-none tracking-tight", className)}
    >
      <span className="text-ink">Decor</span>
      <span className="text-accent">PU</span>
    </Link>
  );
}
