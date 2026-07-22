"use client";

import { useState, useTransition, type ReactElement, type FormEvent } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Trash2, Minus, Plus, CheckCircle2, PackageSearch, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useRfq } from "@/lib/rfq/store";
import { submitRfq } from "@/lib/rfq/actions";
import { Container } from "@/components/ui/Container";
import { Button, buttonVariants } from "@/components/ui/Button";
import { CodeSearch } from "@/components/site/CodeSearch";
import { HoneypotField } from "@/components/site/HoneypotField";
import { CategoryGlyph } from "@/components/illustrations/CategoryGlyph";
import { CATEGORIES, categoryName } from "@/lib/taxonomy";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const field = "w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

export function QuoteCart(): ReactElement {
  const t = useTranslations("Quote");
  const locale = useLocale() as Locale;
  const steps: { title: string; body: string }[] = [
    { title: t("step1Title"), body: t("step1Body") },
    { title: t("step2Title"), body: t("step2Body") },
    { title: t("step3Title"), body: t("step3Body") },
  ];
  const items = useRfq((s) => s.items);
  const remove = useRfq((s) => s.remove);
  const setQty = useRfq((s) => s.setQty);
  const clear = useRfq((s) => s.clear);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    start(async () => {
      const r = await submitRfq({
        full_name: fd.get("full_name"),
        phone: fd.get("phone"),
        message: fd.get("message"),
        hp: fd.get("website"),
        product_codes: items.map((i) => `${i.code} x${i.qty}`),
        kind: items.length ? "rfq" : "contact",
      });
      if (r.ok) {
        setDone(true);
        clear();
      } else {
        setError(r.error);
      }
    });
  }

  if (done) {
    return (
      <Container className="py-20 text-center">
        <CheckCircle2 className="mx-auto size-12 text-accent" />
        <h1 className="mt-4 text-3xl font-semibold">{t("successTitle")}</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">{t("successBody")}</p>
        <Link href="/kategoriler" className="mt-8 inline-block">
          <Button>{t("backToCatalog")}</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12 md:py-16">
      <h1 className="text-3xl font-semibold sm:text-4xl">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("subtitle")}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        {/* Items */}
        <div>
          {items.length ? (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={it.code} className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3">
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-bg-subtle">
                    <Image src={it.image ?? "/placeholder.svg"} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <Link href={`/urun/${it.code.toLowerCase()}`} className="font-mono text-xs text-accent">{it.code}</Link>
                    <p className="line-clamp-1 text-sm text-ink">{it.name}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-md border border-line">
                    <button type="button" onClick={() => setQty(it.code, it.qty - 1)} className="flex size-8 items-center justify-center text-muted hover:text-ink"><Minus className="size-3.5" /></button>
                    <span className="w-7 text-center text-sm tabular-nums">{it.qty}</span>
                    <button type="button" onClick={() => setQty(it.code, it.qty + 1)} className="flex size-8 items-center justify-center text-muted hover:text-ink"><Plus className="size-3.5" /></button>
                  </div>
                  <button type="button" onClick={() => remove(it.code)} aria-label={t("remove")} className="flex size-8 items-center justify-center rounded-md text-muted hover:bg-accent/10 hover:text-accent">
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-5">
              {/* boş durum — yönlendirici panel */}
              <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
                <span className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <PackageSearch className="size-6" />
                </span>
                <h2 className="mt-4 text-xl font-semibold">{t("emptyTitle")}</h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                  {t.rich("emptyBody", { b: (chunks) => <span className="font-medium text-ink">{chunks}</span> })}
                </p>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">{t("knowCode")}</p>
                  <CodeSearch size="lg" />
                </div>

                <Link href="/kategoriler" className={cn(buttonVariants({ variant: "outline", size: "md" }), "mt-5")}>
                  {t("browseCatalog")}
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              {/* popüler kategoriler */}
              <div className="rounded-xl border border-line bg-surface p-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">{t("popularCategories")}</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/kategoriler/${cat.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-3 py-1.5 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent"
                    >
                      <CategoryGlyph glyph={cat.glyph} size={16} />
                      {categoryName(cat, locale)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* nasıl çalışır */}
              <div className="rounded-xl border border-line bg-surface p-6">
                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">{t("howItWorks")}</p>
                <ol className="space-y-4">
                  {steps.map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-bg">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-ink">{s.title}</p>
                        <p className="mt-0.5 text-sm text-muted">{s.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="h-fit space-y-3 rounded-xl border border-line bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">{t("contactInfo")}</h2>
          <p className="text-sm text-muted">{t("contactNote")}</p>
          <input name="full_name" required placeholder={t("fullName")} className={field} />
          <input name="phone" type="tel" required placeholder={t("phone")} className={field} />
          <textarea name="message" placeholder={t("noteOptional")} className={cn(field, "min-h-24 resize-y")} />
          <HoneypotField />
          {error ? <p className="text-sm text-accent">{error}</p> : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? t("sending") : items.length ? t("submitCount", { count: items.length }) : t("submit")}
          </Button>
          <p className="text-center text-xs text-muted">{t("consent")}</p>
        </form>
      </div>
    </Container>
  );
}
