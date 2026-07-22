"use client";

import { useState, useRef, useEffect, type FormEvent, type ReactElement } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Search, ArrowRight, Loader2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface CodeSearchProps {
  className?: string;
  size?: "sm" | "lg";
  autoFocus?: boolean;
}

interface Suggestion {
  code: string;
  name: string;
  image: string | null;
}

const MIN_CHARS = 2;
const DEBOUNCE_MS = 200;

/**
 * Ürün araması — tıklanınca TAM EKRAN arama overlay'i açılır (uzun ürün adları
 * kesilmez). Overlay'de canlı öneriler: görsel + kod + tam ad; ↑↓ + Enter,
 * öneriye tıkla → ürün sayfası, seçim yoksa Enter → /ara.
 */
export function CodeSearch({ className, size = "sm" }: CodeSearchProps): ReactElement {
  const t = useTranslations("Search");
  const tCommon = useTranslations("Common");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  const query = value.trim();

  useEffect(() => setMounted(true), []);

  // overlay açıkken scroll kilidi + Esc + otomatik odak
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = setTimeout(() => inputRef.current?.focus(), 30);
    function onKey(e: KeyboardEvent): void {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      clearTimeout(id);
    };
  }, [open]);

  // debounce'lu canlı öneri
  useEffect(() => {
    if (!open) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    abortRef.current?.abort();

    if (query.length < MIN_CHARS) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: controller.signal });
        const data = (await res.json()) as { items: Suggestion[] };
        setItems(data.items ?? []);
        setHighlight(-1);
      } catch {
        // iptal/ağ hatası — sessiz geç
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);
  }, [query, open]);

  function close(): void {
    setOpen(false);
    setValue("");
    setItems([]);
    setHighlight(-1);
  }

  function goProduct(code: string): void {
    close();
    router.push(`/urun/${encodeURIComponent(code.toLowerCase())}`);
  }

  function goAll(): void {
    if (!query) return;
    const q = query;
    close();
    router.push(`/ara?q=${encodeURIComponent(q)}`);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (highlight >= 0 && items[highlight]) goProduct(items[highlight].code);
    else goAll();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (!items.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h <= 0 ? items.length - 1 : h - 1));
    }
  }

  const overlay = (
    <div className="fixed inset-0 z-[110] flex flex-col bg-bg">
      {/* üst bar: büyük arama girişi */}
      <div className="shrink-0 border-b border-line bg-surface">
        <Container className="flex h-16 items-center gap-3 sm:h-20">
          <form
            onSubmit={onSubmit}
            toolname="product_search"
            tooldescription="DecorPU kataloğunda ürün kodu veya adıyla arama yapar"
            className="flex min-w-0 flex-1 items-center gap-3"
          >
            {loading ? (
              <Loader2 className="size-5 shrink-0 animate-spin text-accent" aria-hidden="true" />
            ) : (
              <Search className="size-5 shrink-0 text-accent" aria-hidden="true" />
            )}
            <input
              ref={inputRef}
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t("placeholder")}
              aria-label={t("label")}
              role="combobox"
              aria-expanded={items.length > 0}
              aria-autocomplete="list"
              autoComplete="off"
              toolparamdescription="Ürün kodu (ör. PU-1024) veya arama kelimesi"
              className="w-full bg-transparent font-mono text-lg uppercase tracking-wide text-ink outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-muted/70 sm:text-xl"
            />
          </form>
          <button
            type="button"
            onClick={close}
            aria-label={tCommon("close")}
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-bg-subtle"
          >
            <X className="size-5" />
          </button>
        </Container>
      </div>

      {/* sonuçlar — geniş satırlar, ad kesilmez */}
      <div className="flex-1 overflow-y-auto">
        <Container className="py-3">
          {query.length < MIN_CHARS ? (
            <p className="py-14 text-center text-sm text-muted">{t("prompt")}</p>
          ) : items.length ? (
            <>
              <ul role="listbox" className="divide-y divide-line">
                {items.map((s, i) => (
                  <li key={s.code} role="option" aria-selected={i === highlight}>
                    <button
                      type="button"
                      onClick={() => goProduct(s.code)}
                      onMouseEnter={() => setHighlight(i)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-lg px-2 py-3 text-left transition-colors sm:px-3",
                        i === highlight ? "bg-accent/5" : "hover:bg-bg-subtle",
                      )}
                    >
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-line bg-bg-subtle sm:size-16">
                        <Image src={s.image ?? "/placeholder.svg"} alt="" fill sizes="64px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-xs text-accent sm:text-sm">{s.code}</span>
                        <span className="block text-sm leading-snug text-ink sm:text-base">{s.name}</span>
                      </span>
                      <ArrowRight className={cn("size-5 shrink-0 text-accent transition-opacity", i === highlight ? "opacity-100" : "opacity-40")} />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={goAll}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-3 text-sm font-medium text-accent transition-colors hover:border-accent/60"
              >
                {t("viewAllResults")}
                <ArrowRight className="size-4" />
              </button>
            </>
          ) : !loading ? (
            <p className="py-14 text-center text-sm text-muted">{t("noResults")}</p>
          ) : null}
        </Container>
      </div>
    </div>
  );

  return (
    <>
      {/* tetikleyici — input görünümlü buton */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("label")}
        className={cn(
          "group flex w-full items-center gap-2.5 rounded-sm border border-line bg-surface text-left transition-colors hover:border-accent/60",
          size === "lg" ? "h-13 px-4" : "h-10 px-3",
          className,
        )}
      >
        <Search className={cn("shrink-0 text-muted transition-colors group-hover:text-accent", size === "lg" ? "size-5" : "size-4")} aria-hidden="true" />
        <span className={cn("truncate text-muted/70", size === "lg" ? "text-base" : "text-sm")}>{t("placeholder")}</span>
      </button>

      {open && mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
