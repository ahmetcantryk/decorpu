import type { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * "Trusted by" strip under the hero.
 * NOTE: placeholder/demo brand wordmarks — gerçek logolar yazılı izinle eklenecek (master plan §13).
 */
const BRANDS: { name: string; cls?: string }[] = [
  { name: "Godiva", cls: "font-display italic" },
  { name: "AĞAOĞLU", cls: "tracking-[0.18em]" },
  { name: "Rixos", cls: "font-display" },
  { name: "Demirören", cls: "" },
  { name: "Torunlar", cls: "tracking-tight" },
  { name: "NEF", cls: "tracking-[0.3em] font-semibold" },
];

export function ReferencesStrip(): ReactElement {
  const t = useTranslations("Home");

  return (
    <section aria-label={t("refsTitle")} className="border-b border-line bg-surface">
      <Container className="flex flex-col items-center gap-6 py-9">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">{t("refsTitle")}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
          {BRANDS.map((b) => (
            <li key={b.name}>
              <span
                className={cn(
                  "select-none text-lg text-muted/70 grayscale transition-all duration-300 hover:text-ink sm:text-xl",
                  b.cls,
                )}
              >
                {b.name}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
