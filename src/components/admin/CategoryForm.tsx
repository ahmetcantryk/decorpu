"use client";

import { useState, useTransition, type ReactElement, type FormEvent } from "react";
import { saveCategory } from "@/lib/admin/actions";
import { Field, Input } from "./form";
import { Select } from "./ui/Select";
import { Button } from "@/components/ui/Button";
import type { Category } from "@/lib/supabase/types";

interface ParentOption {
  id: string;
  name_tr: string;
}

interface CategoryFormProps {
  category?: Category | null;
  parents: ParentOption[];
  defaultParentId?: string | null;
  onDone: () => void;
}

export function CategoryForm({ category, parents, defaultParentId, onDone }: CategoryFormProps): ReactElement {
  const c = category ?? null;
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const parentOptions = [
    { value: "none", label: "— Ana kategori —" },
    ...parents.filter((p) => p.id !== c?.id).map((p) => ({ value: p.id, label: p.name_tr })),
  ];
  const defParent = c?.parent_id ?? defaultParentId ?? "none";

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    start(async () => {
      const r = await saveCategory(c?.id ?? null, fd);
      if (r.ok) onDone();
      else setError(r.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Ad (TR) *">
        <Input name="name_tr" defaultValue={c?.name_tr ?? ""} required placeholder="Kartonpiyer" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Slug *" hint="URL'de görünür">
          <Input name="slug" defaultValue={c?.slug ?? ""} required placeholder="kartonpiyer" />
        </Field>
        <Field label="Ad (EN)">
          <Input name="name_en" defaultValue={c?.name_en ?? ""} placeholder="Cornice" />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Üst kategori">
          <Select name="parent_id" defaultValue={defParent} options={parentOptions} />
        </Field>
        <Field label="Sıra">
          <Input name="sort_order" type="number" defaultValue={c?.sort_order ?? 0} />
        </Field>
      </div>
      {error ? <p className="text-sm text-accent">{error}</p> : null}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Kaydediliyor…" : c ? "Kaydet" : "Kategori ekle"}
        </Button>
        <button type="button" onClick={onDone} className="text-sm text-muted hover:text-accent">
          İptal
        </button>
      </div>
    </form>
  );
}
