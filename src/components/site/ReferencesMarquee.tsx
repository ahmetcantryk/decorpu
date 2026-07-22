import type { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Sonsuz kayan referans logoları (marquee). Demo markalar — gerçek logolar
 * yazılı izinle eklenecek (master plan §13).
 */
const BRANDS: { name: string; cls?: string }[] = [
  { name: "Godiva", cls: "font-display italic" },
  { name: "AĞAOĞLU", cls: "tracking-[0.18em]" },
  { name: "Rixos", cls: "font-display" },
  { name: "Demirören", cls: "" },
  { name: "Torunlar", cls: "tracking-tight" },
  { name: "NEF", cls: "tracking-[0.3em] font-semibold" },
  { name: "Emaar", cls: "font-display" },
  { name: "Sinpaş", cls: "" },
  { name: "Kalyon", cls: "tracking-wide" },
  { name: "Mar Yapı", cls: "font-display italic" },
  { name: "Dap Yapı", cls: "tracking-[0.15em]" },
  { name: "Hilton", cls: "font-display" },
];

export function ReferencesMarquee(): ReactElement {
  const t = useTranslations("Home");
  const row = [...BRANDS, ...BRANDS];

  return (
    <section aria-label={t("refsTitle")} className="border-y border-line bg-surface py-10">
      <Container>
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-wide text-muted">{t("refsTitle")}</p>
      </Container>
      <div className="marquee-pause relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-12 sm:gap-16">
          {row.map((b, i) => (
            <span
              key={`${b.name}-${i}`}
              className={cn(
                "select-none whitespace-nowrap text-xl text-muted/70 grayscale transition-colors hover:text-accent sm:text-2xl",
                b.cls,
              )}
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
