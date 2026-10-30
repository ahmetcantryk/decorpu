"use client";

import { useMemo, useState, type ReactElement } from "react";
import { Search, X } from "lucide-react";
import { Field } from "./form";

export interface PickerProduct {
  id: string;
  code: string;
  name_tr: string;
}

interface ProductPickerProps {
  /** Form alan adı — seçilen her ürün için ayrı gizli input üretilir. */
  name: string;
  products: PickerProduct[];
  defaultSelected: string[];
}

const MAX_RESULTS = 30;

/** Bağlı ürün seçici: kod/ad ile ara, ekle-çıkar. */
export function ProductPicker({ name, products, defaultSelected }: ProductPickerProps): ReactElement {
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const [query, setQuery] = useState("");

  const byId = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const q = query.trim().toLowerCase();
  const results = q
    ? products
        .filter((p) => !selected.includes(p.id))
        .filter((p) => p.code.toLowerCase().includes(q) || p.name_tr.toLowerCase().includes(q))
        .slice(0, MAX_RESULTS)
    : [];

  return (
    <Field label={`Bağlı ürünler (${selected.length})`} hint="Sayfanın altında listelenir. Kod ya da ad ile arayın.">
      <div className="space-y-2">
        {selected.map((id) => (
          <input key={id} type="hidden" name={name} value={id} />
        ))}
        {selected.length ? (
          <div className="flex flex-wrap gap-1.5">
            {selected.map((id) => {
              const p = byId.get(id);
              return (
                <span key={id} className="inline-flex items-center gap-1 rounded-full bg-bg-subtle px-2.5 py-1 text-xs text-ink-soft">
                  <span className="font-mono">{p?.code ?? "?"}</span>
                  {p ? <span className="max-w-40 truncate text-muted">{p.name_tr}</span> : null}
                  <button
                    type="button"
                    aria-label="Ürünü çıkar"
                    onClick={() => setSelected((s) => s.filter((x) => x !== id))}
                    className="text-muted hover:text-accent"
                  >
                    <X className="size-3" />
                  </button>
                </span>
              );
            })}
          </div>
        ) : null}
        <div className="flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3">
          <Search className="size-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            placeholder="Ürün ara (DP-1001, kartonpiyer…)"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
          />
        </div>
        {results.length ? (
          <ul className="max-h-48 divide-y divide-line overflow-y-auto rounded-md border border-line bg-surface">
            {results.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setSelected((s) => [...s, p.id])}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-bg-subtle"
                >
                  <span className="font-mono text-xs text-muted">{p.code}</span>
                  <span className="truncate text-ink-soft">{p.name_tr}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : q ? (
          <p className="text-xs text-muted">Sonuç yok.</p>
        ) : null}
      </div>
    </Field>
  );
}
