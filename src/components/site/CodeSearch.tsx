"use client";

import { useState, useRef, useEffect, type FormEvent, type ReactElement } from "react";
import Image from "next/image";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
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
 * Canlı önerili ürün araması (searchable combobox). Yazdıkça /api/search'ten
 * eşleşen ürünler (görsel + kod + ad) açılır listede belirir; ↑↓ + Enter ile
 * seçim, öneriye tıklayınca doğrudan ürün sayfası, seçim yoksa Enter → /ara.
 */
export function CodeSearch({ className, size = "sm", autoFocus }: CodeSearchProps): ReactElement {
  const t = useTranslations("Search");
  const router = useRouter();
  const rootRef = useRef<HTMLFormElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [value, setValue] = useState("");
  const [items, setItems] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  const query = value.trim();

  // dışarı tıklayınca kapan
  useEffect(() => {
    function onDown(e: MouseEvent): void {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // debounce'lu canlı öneri
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    abortRef.current?.abort();

    if (query.length < MIN_CHARS) {
      setItems([]);
      setLoading(false);
      setOpen(false);
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
        setOpen(true);
      } catch {
        // iptal/ağ hatası — sessiz geç
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function goProduct(code: string): void {
    setOpen(false);
    setValue("");
    router.push(`/urun/${encodeURIComponent(code.toLowerCase())}`);
  }

  function goAll(): void {
    if (!query) return;
    setOpen(false);
    router.push(`/ara?q=${encodeURIComponent(query)}`);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (highlight >= 0 && items[highlight]) goProduct(items[highlight].code);
    else goAll();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (!open || !items.length) {
      if (e.key === "Escape") setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % items.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h <= 0 ? items.length - 1 : h - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const showDropdown = open && query.length >= MIN_CHARS;

  return (
    <form
      ref={rootRef}
      role="search"
      onSubmit={onSubmit}
      className={cn("relative", className)}
    >
      <div
        className={cn(
          "group flex items-center gap-2.5 rounded-sm border border-line bg-surface transition-colors focus-within:border-accent",
          size === "lg" ? "h-13 px-4" : "h-10 px-3",
        )}
      >
        {loading ? (
          <Loader2 className={cn("shrink-0 animate-spin text-accent", size === "lg" ? "size-5" : "size-4")} aria-hidden="true" />
        ) : (
          <Search
            className={cn("shrink-0 text-muted transition-colors group-focus-within:text-accent", size === "lg" ? "size-5" : "size-4")}
            aria-hidden="true"
          />
        )}
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => query.length >= MIN_CHARS && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={t("placeholder")}
          aria-label={t("label")}
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          autoComplete="off"
          autoFocus={autoFocus}
          className={cn(
            "w-full bg-transparent font-mono uppercase tracking-wide text-ink outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-muted/70",
            size === "lg" ? "text-base" : "text-sm",
          )}
        />
      </div>

      {/* öneriler */}
      {showDropdown ? (
        <div className="absolute inset-x-0 top-full z-[80] mt-1.5 overflow-hidden rounded-lg border border-line bg-surface shadow-pop">
          {items.length ? (
            <ul role="listbox" className="max-h-80 overflow-y-auto">
              {items.map((s, i) => (
                <li key={s.code} role="option" aria-selected={i === highlight}>
                  <button
                    type="button"
                    onClick={() => goProduct(s.code)}
                    onMouseEnter={() => setHighlight(i)}
                    className={cn(
                      "flex w-full items-center gap-3 px-3 py-2 text-left transition-colors",
                      i === highlight ? "bg-accent/5" : "hover:bg-bg-subtle",
                    )}
                  >
                    <span className="relative size-10 shrink-0 overflow-hidden rounded-md border border-line bg-bg-subtle">
                      <Image src={s.image ?? "/placeholder.svg"} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-xs text-accent">{s.code}</span>
                      <span className="block truncate text-sm text-ink">{s.name}</span>
                    </span>
                    <ArrowRight className={cn("size-4 shrink-0 text-accent transition-opacity", i === highlight ? "opacity-100" : "opacity-0")} />
                  </button>
                </li>
              ))}
            </ul>
          ) : !loading ? (
            <p className="px-3 py-4 text-center text-sm text-muted">{t("noResults")}</p>
          ) : null}

          {items.length ? (
            <button
              type="button"
              onClick={goAll}
              className="flex w-full items-center justify-center gap-1.5 border-t border-line bg-bg-subtle/50 px-3 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-bg-subtle"
            >
              {t("viewAllResults")}
              <ArrowRight className="size-4" />
            </button>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
