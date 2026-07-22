import type { ReactElement } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AddToQuoteButton } from "./AddToQuoteButton";
import type { CatalogProduct } from "@/lib/catalog";

/** Dimensions string like "E:120 B:2000 Y:120" (polure-style), skipping empties. */
function dims(p: Pick<CatalogProduct, "width_mm" | "length_mm" | "height_mm" | "diameter_mm">): string {
  const parts: string[] = [];
  if (p.width_mm) parts.push(`E:${p.width_mm}`);
  if (p.length_mm) parts.push(`B:${p.length_mm}`);
  if (p.height_mm) parts.push(`Y:${p.height_mm}`);
  if (p.diameter_mm) parts.push(`Ø:${p.diameter_mm}`);
  return parts.join("  ");
}

export function ProductCard({ product }: { product: CatalogProduct }): ReactElement {
  const t = useTranslations("Product");
  const d = dims(product);
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-shadow hover:shadow-soft">
      <Link href={`/urun/${product.code.toLowerCase()}`} className="relative block aspect-square overflow-hidden bg-bg-subtle">
        <Image
          src={product.image ?? "/placeholder.svg"}
          alt={product.name_tr}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        {/* hover: teknik çizim (çizim hali) yumuşak geçişle belirir — zoom/scale yok */}
        {product.drawing ? (
          <Image
            src={product.drawing}
            alt={t("drawingAlt", { name: product.name_tr })}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="pointer-events-none absolute inset-0 bg-white object-contain p-2 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        ) : null}
        <span className="absolute left-2.5 top-2.5 z-10 rounded-sm bg-bg/90 px-2 py-0.5 font-mono text-[11px] text-ink shadow-soft">
          {product.code}
        </span>
        {product.drawing ? (
          <span className="absolute bottom-2.5 right-2.5 z-10 rounded-sm bg-white/90 px-1.5 py-0.5 font-mono text-[10px] text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {t("drawingBadge")}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-3.5">
        <Link href={`/urun/${product.code.toLowerCase()}`} className="line-clamp-2 text-sm font-medium text-ink transition-colors hover:text-accent">
          {product.name_tr}
        </Link>
        {d ? <p className="mt-1.5 font-mono text-[11px] text-muted">{d}</p> : null}
        <div className="mt-3 flex items-center justify-between gap-2 pt-1">
          <AddToQuoteButton code={product.code} name={product.name_tr} image={product.image} />
          <Link href={`/urun/${product.code.toLowerCase()}`} className="text-xs text-muted transition-colors hover:text-accent">
            {t("inspect")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
