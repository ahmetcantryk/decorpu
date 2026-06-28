import type { ReactElement } from "react";
import { Compass, Box, Scan, Wrench, PenTool, Factory, Sparkles, type LucideIcon, type LucideProps } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  compass: Compass,
  box: Box,
  scan: Scan,
  wrench: Wrench,
  "pen-tool": PenTool,
  factory: Factory,
};

export function ServiceIcon({ icon, ...props }: { icon: string | null } & LucideProps): ReactElement {
  const Cmp = (icon && MAP[icon]) || Sparkles;
  return <Cmp {...props} />;
}
