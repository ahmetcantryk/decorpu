"use client";

import { useState, useTransition, type ReactElement, type FormEvent } from "react";
import { saveService } from "@/lib/admin/services-actions";
import { Field, Input, Textarea, Toggle } from "./form";
import { ImageField } from "./ImageField";
import { ProductPicker, type PickerProduct } from "./ProductPicker";
import { Button } from "@/components/ui/Button";
import type { Database } from "@/lib/supabase/types";

export type AdminService = Database["public"]["Tables"]["services"]["Row"] & { productIds: string[] };

interface ServiceFormProps {
  service: AdminService | null;
  products: PickerProduct[];
  onDone: () => void;
}

const SLUG_HINT = "URL'de görünür: küçük harf, rakam ve tire";

export function ServiceForm({ service, products, onDone }: ServiceFormProps): ReactElement {
  const s = service;
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState(s?.image_url ?? "");

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    start(async () => {
      const r = await saveService(s?.id ?? null, fd);
      if (r.ok) onDone();
      else setError(r.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field label="Başlık *">
        <Input name="title" defaultValue={s?.title ?? ""} required placeholder="Özel Üretim" />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Slug *" hint={SLUG_HINT}>
          <Input name="slug" defaultValue={s?.slug ?? ""} required placeholder="ozel-uretim" pattern="[a-z0-9]+(-[a-z0-9]+)*" />
        </Field>
        <Field label="Sıra">
          <Input name="sort_order" type="number" defaultValue={s?.sort_order ?? 0} />
        </Field>
      </div>
      <Field label="Kısa özet" hint="Liste kartlarında görünür.">
        <Textarea name="summary" defaultValue={s?.summary ?? ""} className="min-h-16" />
      </Field>
      <Field label="Açıklama" hint="Detay sayfasının giriş paragrafı.">
        <Textarea name="description" defaultValue={s?.description ?? ""} />
      </Field>
      <Field label="İçerik" hint="Detay sayfasının gövde metni. Paragrafları boş satırla ayırın.">
        <Textarea name="content" defaultValue={s?.content ?? ""} className="min-h-40" />
      </Field>
      <ImageField name="image_url" label="Görsel" value={image} onChange={setImage} kind="cover" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="İkon" hint="İsteğe bağlı ikon anahtarı">
          <Input name="icon" defaultValue={s?.icon ?? ""} />
        </Field>
        <Field label="Buton metni">
          <Input name="cta_label" defaultValue={s?.cta_label ?? ""} placeholder="Teklif al" />
        </Field>
      </div>
      <ProductPicker name="product_ids" products={products} defaultSelected={s?.productIds ?? []} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="SEO başlığı">
          <Input name="seo_title" defaultValue={s?.seo_title ?? ""} />
        </Field>
        <Field label="SEO açıklaması">
          <Input name="seo_description" defaultValue={s?.seo_description ?? ""} />
        </Field>
      </div>
      <Toggle name="is_active" defaultChecked={s?.is_active ?? true} label="Yayında (sitede görünür)" />

      {error ? <p className="text-sm text-accent">{error}</p> : null}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Kaydediliyor…" : s ? "Kaydet" : "Hizmet ekle"}
        </Button>
        <button type="button" onClick={onDone} className="text-sm text-muted hover:text-accent">
          İptal
        </button>
      </div>
    </form>
  );
}
