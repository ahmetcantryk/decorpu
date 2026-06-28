"use client";

import { useState, useMemo, type ReactElement } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Search, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog } from "./ui/Dialog";
import { Select } from "./ui/Select";
import { ConfirmDelete } from "./ui/ConfirmDelete";
import { ProductForm } from "./ProductForm";
import { buttonVariants } from "@/components/ui/Button";
import { deleteProduct } from "@/lib/admin/actions";
import type { Product } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

export type AdminProduct = Product & { categoryName: string | null; image: string | null };
interface CategoryOption {
  id: string;
  name_tr: string;
  parent_id: string | null;
}
interface ProductsManagerProps {
  products: AdminProduct[];
  categories: CategoryOption[];
}

const PER_PAGE = 10;

export function ProductsManager({ products, categories }: ProductsManagerProps): ReactElement {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (q && !(p.code.toLowerCase().includes(q) || p.name_tr.toLowerCase().includes(q))) return false;
      if (cat !== "all" && p.category_id !== cat) return false;
      if (status === "active" && !p.is_active) return false;
      if (status === "passive" && p.is_active) return false;
      return true;
    });
  }, [products, query, cat, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pageCount);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const catOptions = [
    { value: "all", label: "Tüm kategoriler" },
    ...categories.map((c) => ({ value: c.id, label: (c.parent_id ? "— " : "") + c.name_tr })),
  ];
  const statusOptions = [
    { value: "all", label: "Tüm durumlar" },
    { value: "active", label: "Aktif" },
    { value: "passive", label: "Pasif" },
  ];

  function openNew(): void {
    setEditing(null);
    setDialogOpen(true);
  }
  function openEdit(p: AdminProduct): void {
    setEditing(p);
    setDialogOpen(true);
  }
  function onSaved(): void {
    setDialogOpen(false);
    router.refresh();
  }
  function reset<T>(setter: (v: T) => void): (v: T) => void {
    return (v) => {
      setter(v);
      setPage(1);
    };
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Ürünler</h1>
        <button onClick={openNew} className={cn(buttonVariants({ size: "sm" }))}>
          <Plus className="size-4" /> Yeni Ürün
        </button>
      </div>

      <div className="space-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2 sm:space-y-0">
        <div className="flex h-11 items-center gap-2 rounded-md border border-line bg-surface px-3 sm:h-10 sm:min-w-56 sm:flex-1">
          <Search className="size-4 shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => reset(setQuery)(e.target.value)}
            placeholder="Kod veya ad ile canlı ara…"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted/70 sm:text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <div className="sm:w-48">
            <Select options={catOptions} value={cat} onValueChange={reset(setCat)} />
          </div>
          <div className="sm:w-40">
            <Select options={statusOptions} value={status} onValueChange={reset(setStatus)} />
          </div>
        </div>
      </div>

      {/* Mobil: kart listesi (tablo taşmasını önler) */}
      <ul className="space-y-2 md:hidden">
        {pageItems.map((p) => (
          <li key={p.id} className="rounded-xl border border-line bg-surface p-3">
            <div className="flex items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-md border border-line bg-bg-subtle">
                {p.image ? <Image src={p.image} alt="" fill sizes="48px" className="object-cover" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-xs text-muted">{p.code}</span>
                <span className="flex items-center gap-1.5 font-medium text-ink">
                  <span className="truncate">{p.name_tr}</span>
                  {p.is_featured ? <Star className="size-3.5 shrink-0 fill-accent text-accent" /> : null}
                </span>
                {p.categoryName ? <span className="block truncate text-xs text-muted">{p.categoryName}</span> : null}
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm tabular-nums">{p.price != null ? `${p.price.toLocaleString("tr-TR")} ₺` : "—"}</div>
                <span className={cn("mt-1 inline-block rounded-full px-2 py-0.5 text-xs", p.is_active ? "bg-green-100 text-green-700" : "bg-bg-subtle text-muted")}>
                  {p.is_active ? "Aktif" : "Pasif"}
                </span>
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-end gap-1 border-t border-line pt-2.5">
              <button onClick={() => openEdit(p)} className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-ink-soft transition-colors hover:bg-bg-subtle">
                <Pencil className="size-4" /> Düzenle
              </button>
              <ConfirmDelete
                onConfirm={() => deleteProduct(p.id)}
                title="Ürün silinsin mi?"
                description={`${p.code} — ${p.name_tr} kalıcı olarak silinecek.`}
              />
            </div>
          </li>
        ))}
        {!pageItems.length ? (
          <li className="rounded-xl border border-dashed border-line py-10 text-center text-sm text-muted">
            {query || cat !== "all" || status !== "all" ? "Sonuç bulunamadı." : "Henüz ürün yok."}
          </li>
        ) : null}
      </ul>

      {/* Masaüstü: tablo */}
      <div className="hidden overflow-hidden rounded-lg border border-line bg-surface md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Görsel</th>
              <th className="px-4 py-3 font-medium">Kod</th>
              <th className="px-4 py-3 font-medium">Ad</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium">Fiyat</th>
              <th className="px-4 py-3 font-medium">Durum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {pageItems.map((p) => (
              <tr key={p.id} className="hover:bg-bg-subtle">
                <td className="px-4 py-2.5">
                  <div className="relative size-11 overflow-hidden rounded-md border border-line bg-bg-subtle">
                    {p.image ? <Image src={p.image} alt="" fill sizes="44px" className="object-cover" /> : null}
                  </div>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs">{p.code}</td>
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    {p.name_tr}
                    {p.is_featured ? <Star className="size-3.5 fill-accent text-accent" /> : null}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-muted">{p.categoryName ?? "—"}</td>
                <td className="px-4 py-2.5 tabular-nums">{p.price != null ? `${p.price.toLocaleString("tr-TR")} ₺` : "—"}</td>
                <td className="px-4 py-2.5">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs", p.is_active ? "bg-green-100 text-green-700" : "bg-bg-subtle text-muted")}>
                    {p.is_active ? "Aktif" : "Pasif"}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(p)}
                      aria-label="Düzenle"
                      className="flex size-8 items-center justify-center rounded-md text-muted hover:bg-bg hover:text-ink"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <ConfirmDelete
                      onConfirm={() => deleteProduct(p.id)}
                      title="Ürün silinsin mi?"
                      description={`${p.code} — ${p.name_tr} kalıcı olarak silinecek.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {!pageItems.length ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  {query || cat !== "all" || status !== "all" ? "Sonuç bulunamadı." : "Henüz ürün yok."}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted">
        <span>{filtered.length} ürün</span>
        {pageCount > 1 ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="flex size-8 items-center justify-center rounded-md border border-line disabled:opacity-40 hover:enabled:border-ink"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="tabular-nums">
              {safePage} / {pageCount}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={safePage >= pageCount}
              className="flex size-8 items-center justify-center rounded-md border border-line disabled:opacity-40 hover:enabled:border-ink"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        ) : null}
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editing ? `Ürünü Düzenle · ${editing.code}` : "Yeni Ürün"}
      >
        <ProductForm
          key={editing?.id ?? "new"}
          product={editing}
          primaryImage={editing?.image ?? null}
          categories={categories}
          onDone={onSaved}
        />
      </Dialog>
    </div>
  );
}
