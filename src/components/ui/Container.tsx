import type { ElementType, ReactNode, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Centered editorial content width with responsive gutters. */
export function Container({ as: Tag = "div", className, children }: ContainerProps): ReactElement {
  return <Tag className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</Tag>;
}
