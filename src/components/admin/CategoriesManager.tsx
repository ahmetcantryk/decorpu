"use client";

import { useState, useMemo, type ReactElement } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Search, FolderTree, CornerDownRight, ImageOff } from "lucide-react";
import { Dialog } from "./ui/Dialog";
import { ConfirmDelete } from "./ui/ConfirmDelete";
import { CategoryForm } from "./CategoryForm";
import { buttonVariants } from "@/components/ui/Button";
import { deleteCategory } from "@/lib/admin/actions";
import type { Category } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

const iconBtn = "flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-bg hover:text-ink";

/** Kapak görseli önizlemesi — boşsa "kapak yok" rozeti. */
function CoverThumb({ src, size }: { src: string | null; size: "sm" | "md" }): ReactElement {
  const box = size === "md" ? "size-9" : "size-7";
  if (!src) {
    return (
      <span
        className={cn(box, "flex shrink-0 items-center justify-center rounded border border-dashed border-line text-muted")}
        title="Kapak görseli yok — kategorideki ilk ürünün görseli kullanılır"
      >
        <ImageOff className="size-3.5" />
      </span>
    );
  }
  return (
    <span className={cn(box, "relative shrink-0 overflow-hidden rounded border border-line bg-bg")} title="Kapak görseli">
      <Image src={src} alt="" fill sizes="36px" className="object-cover" unoptimized />
    </span>
  );
}

export function CategoriesManager({ categories }: { categories: Category[] }): ReactElement {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [defaultParent, setDefaultParent] = useState<string | null>(null);

  const parents = useMemo(() => categories.filter((c) => !c.parent_id), [categories]);
  const childrenOf = (id: string): Category[] => categories.filter((c) => c.parent_id === id);
  const parentOpts = parents.map((p) => ({ id: p.id, name_tr: p.name_tr }));

  const q = query.trim().toLowerCase();
  const match = (c: Category): boolean => !q || c.name_tr.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q);
  const visibleParents = parents.filter((p) => match(p) || childrenOf(p.id).some(match));

  function openNew(parentId?: string | null): void {
    setEditing(null);
    setDefaultParent(parentId ?? null);
    setDialogOpen(true);
  }
  function openEdit(c: Category): void {
    setEditing(c);
    setDefaultParent(null);
    setDialogOpen(true);
  }
  function onSaved(): void {
    setDialogOpen(false);
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Kategoriler</h1>
        <button onClick={() => openNew()} className={cn(buttonVariants({ size: "sm" }))}>
          <Plus className="size-4" /> Yeni Kategori
        </button>
      </div>

      <div className="flex h-10 max-w-sm items-center gap-2 rounded-md border border-line bg-surface px-3">
        <Search className="size-4 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kategori ara…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
        />
      </div>

      <div className="space-y-3">
        {visibleParents.map((p) => {
          const kids = childrenOf(p.id);
          const shownKids = q ? (match(p) ? kids : kids.filter(match)) : kids;
          return (
            <div key={p.id} className="overflow-hidden rounded-lg border border-line bg-surface">
              <div className="flex items-center justify-between gap-3 border-b border-line bg-bg-subtle/60 px-4 py-3">
                <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                  <CoverThumb src={p.image_path} size="md" />
                  <FolderTree className="size-4 shrink-0 text-accent" />
                  <span className="font-medium">{p.name_tr}</span>
                  <span className="font-mono text-xs text-muted">{p.slug}</span>
                  <span className="rounded-full bg-bg px-2 py-0.5 text-xs text-muted">{kids.length} alt</span>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => openNew(p.id)}
                    className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs text-ink-soft transition-colors hover:bg-bg hover:text-accent"
                  >
                    <Plus className="size-3.5" /> alt ekle
                  </button>
                  <button onClick={() => openEdit(p)} aria-label="Düzenle" className={iconBtn}>
                    <Pencil className="size-4" />
                  </button>
                  <ConfirmDelete
                    onConfirm={() => deleteCategory(p.id)}
                    title="Ana kategori silinsin mi?"
                    description={`"${p.name_tr}" silinecek. Alt kategorileri ana seviyeye, ürünleri kategorisiz duruma geçer.`}
                  />
                </div>
              </div>

              {shownKids.length ? (
                <ul className="divide-y divide-line">
                  {shownKids.map((s) => (
                    <li key={s.id} className="flex items-center justify-between gap-3 py-2.5 pl-10 pr-4 hover:bg-bg-subtle">
                      <div className="flex min-w-0 items-center gap-2">
                        <CornerDownRight className="size-3.5 shrink-0 text-muted" />
                        <CoverThumb src={s.image_path} size="sm" />
                        <span className="text-sm text-ink-soft">{s.name_tr}</span>
                        <span className="font-mono text-xs text-muted">{s.slug}</span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button onClick={() => openEdit(s)} aria-label="Düzenle" className={iconBtn}>
                          <Pencil className="size-4" />
                        </button>
                        <ConfirmDelete
                          onConfirm={() => deleteCategory(s.id)}
                          title="Alt kategori silinsin mi?"
                          description={`"${s.name_tr}" silinecek.`}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
        {!visibleParents.length ? (
          <p className="rounded-lg border border-line bg-surface px-4 py-10 text-center text-muted">
            {q ? "Sonuç bulunamadı." : "Henüz kategori yok."}
          </p>
        ) : null}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen} title={editing ? "Kategoriyi Düzenle" : "Yeni Kategori"}>
        <CategoryForm
          key={editing?.id ?? `new-${defaultParent ?? "root"}`}
          category={editing}
          parents={parentOpts}
          defaultParentId={defaultParent}
          onDone={onSaved}
        />
      </Dialog>
    </div>
  );
}
