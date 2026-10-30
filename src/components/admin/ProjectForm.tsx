"use client";

import { useState, useTransition, type ReactElement, type FormEvent } from "react";
import { saveProject } from "@/lib/admin/projects-actions";
import { Field, Input, Textarea, Toggle } from "./form";
import { ImageField } from "./ImageField";
import { GalleryField } from "./GalleryField";
import { ProductPicker, type PickerProduct } from "./ProductPicker";
import { Button } from "@/components/ui/Button";
import type { Database } from "@/lib/supabase/types";

export type AdminProject = Database["public"]["Tables"]["projects"]["Row"] & {
  productIds: string[];
  gallery: string[];
};

interface ProjectFormProps {
  project: AdminProject | null;
  products: PickerProduct[];
  onDone: () => void;
}

export function ProjectForm({ project, products, onDone }: ProjectFormProps): ReactElement {
  const p = project;
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [cover, setCover] = useState(p?.cover_url ?? "");

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    start(async () => {
      const r = await saveProject(p?.id ?? null, fd);
      if (r.ok) onDone();
      else setError(r.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Başlık *">
        <Input name="title" defaultValue={p?.title ?? ""} required placeholder="Villa cephe uygulaması" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Slug *" hint="URL'de görünür: küçük harf, rakam ve tire">
          <Input name="slug" defaultValue={p?.slug ?? ""} required placeholder="villa-cephe" pattern="[a-z0-9]+(-[a-z0-9]+)*" />
        </Field>
        <Field label="Sıra">
          <Input name="sort_order" type="number" defaultValue={p?.sort_order ?? 0} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Konum">
          <Input name="location" defaultValue={p?.location ?? ""} placeholder="İstanbul" />
        </Field>
        <Field label="Yıl">
          <Input name="year" type="number" min={1900} max={2100} defaultValue={p?.year ?? ""} />
        </Field>
      </div>
      <Field label="Kısa özet" hint="Liste kartlarında görünür.">
        <Textarea name="summary" defaultValue={p?.summary ?? ""} className="min-h-16" />
      </Field>
      <Field label="Açıklama" hint="Detay sayfasının metni. Paragrafları boş satırla ayırın.">
        <Textarea name="description" defaultValue={p?.description ?? ""} className="min-h-32" />
      </Field>
      <ImageField name="cover_url" label="Kapak görseli" value={cover} onChange={setCover} kind="cover" />
      <GalleryField
        name="gallery"
        label="Galeri"
        hint="Detay sayfasındaki görseller, bu sırayla. Boşsa kapak görseli gösterilir."
        defaultValue={p?.gallery ?? []}
      />
      <ProductPicker name="product_ids" products={products} defaultSelected={p?.productIds ?? []} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="SEO başlığı">
          <Input name="seo_title" defaultValue={p?.seo_title ?? ""} />
        </Field>
        <Field label="SEO açıklaması">
          <Input name="seo_description" defaultValue={p?.seo_description ?? ""} />
        </Field>
      </div>
      <Toggle name="is_active" defaultChecked={p?.is_active ?? true} label="Yayında (sitede görünür)" />

      {error ? <p className="text-sm text-accent">{error}</p> : null}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Kaydediliyor…" : p ? "Kaydet" : "Çalışma ekle"}
        </Button>
        <button type="button" onClick={onDone} className="text-sm text-muted hover:text-accent">
          İptal
        </button>
      </div>
    </form>
  );
}
