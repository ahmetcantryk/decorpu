"use client";

import { useState, useTransition, type ReactElement, type FormEvent, type ChangeEvent } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { saveProduct } from "@/lib/admin/actions";
import { createClient } from "@/lib/supabase/client";
import { Field, Input, Textarea, Toggle } from "./form";
import { Select } from "./ui/Select";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/supabase/types";

interface CategoryOption {
  id: string;
  name_tr: string;
  parent_id: string | null;
}

interface ProductFormProps {
  product?: Product | null;
  primaryImage?: string | null;
  categories: CategoryOption[];
  onDone: () => void;
}

export function ProductForm({ product, primaryImage, categories, onDone }: ProductFormProps): ReactElement {
  const p = product ?? null;
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState(primaryImage ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);

  async function onFile(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadErr(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("products").upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("products").getPublicUrl(path);
      setImageUrl(data.publicUrl);
    } catch (err) {
      setUploadErr(err instanceof Error ? err.message : "Yükleme başarısız.");
    } finally {
      setUploading(false);
    }
  }

  const catOptions = [
    { value: "none", label: "Kategorisiz" },
    ...categories.map((c) => ({ value: c.id, label: (c.parent_id ? "— " : "") + c.name_tr })),
  ];

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    start(async () => {
      const r = await saveProduct(p?.id ?? null, fd);
      if (r.ok) onDone();
      else setError(r.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Ürün Kodu *">
          <Input name="code" defaultValue={p?.code ?? ""} placeholder="DP-1001" required />
        </Field>
        <Field label="Kategori">
          <Select name="category_id" defaultValue={p?.category_id ?? "none"} options={catOptions} placeholder="Kategori seçin" />
        </Field>
        <Field label="Ad (TR) *">
          <Input name="name_tr" defaultValue={p?.name_tr ?? ""} required />
        </Field>
        <Field label="Ad (EN)">
          <Input name="name_en" defaultValue={p?.name_en ?? ""} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="En (mm)"><Input name="width_mm" type="number" step="any" defaultValue={p?.width_mm ?? ""} /></Field>
        <Field label="Boy (mm)"><Input name="length_mm" type="number" step="any" defaultValue={p?.length_mm ?? ""} /></Field>
        <Field label="Yükseklik"><Input name="height_mm" type="number" step="any" defaultValue={p?.height_mm ?? ""} /></Field>
        <Field label="Çap (mm)"><Input name="diameter_mm" type="number" step="any" defaultValue={p?.diameter_mm ?? ""} /></Field>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Ağırlık (g)"><Input name="weight_g" type="number" step="any" defaultValue={p?.weight_g ?? ""} /></Field>
        <Field label="Fiyat (₺)"><Input name="price" type="number" step="any" defaultValue={p?.price ?? ""} /></Field>
        <Field label="Malzeme"><Input name="material" defaultValue={p?.material ?? "Poliüretan"} /></Field>
      </div>

      <Field label="Açıklama (TR)">
        <Textarea name="description_tr" defaultValue={p?.description_tr ?? ""} />
      </Field>

      <Field label="Ana Görsel" hint="Dosya yükle ya da URL gir">
        <div className="flex items-start gap-4">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-md border border-line bg-bg-subtle">
            {imageUrl ? (
              <>
                <Image src={imageUrl} alt="" fill sizes="96px" className="object-cover" unoptimized />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-ink/70 text-bg"
                  aria-label="Kaldır"
                >
                  <X className="size-3" />
                </button>
              </>
            ) : null}
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink-soft transition-colors hover:border-ink">
              <Upload className="size-4" />
              {uploading ? "Yükleniyor…" : "Görsel yükle"}
              <input type="file" accept="image/*" onChange={onFile} disabled={uploading} className="hidden" />
            </label>
            <input
              name="image_url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/catalog/... ya da tam URL"
              className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
            {uploadErr ? <p className="text-xs text-accent">{uploadErr}</p> : null}
          </div>
        </div>
      </Field>

      <div className="flex flex-wrap gap-x-6 gap-y-3 rounded-md border border-line bg-bg-subtle p-4">
        <Toggle name="is_active" label="Aktif" defaultChecked={p?.is_active ?? true} />
        <Toggle name="is_featured" label="Öne çıkan" defaultChecked={p?.is_featured ?? false} />
        <Toggle name="paintable" label="Boyanabilir" defaultChecked={p?.paintable ?? true} />
        <Toggle name="indoor" label="İç mekan" defaultChecked={p?.indoor ?? true} />
        <Toggle name="outdoor" label="Dış mekan" defaultChecked={p?.outdoor ?? false} />
        <Toggle name="water_resistant" label="Su geçirmez" defaultChecked={p?.water_resistant ?? false} />
      </div>

      {error ? <p className="text-sm text-accent">{error}</p> : null}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Kaydediliyor…" : p ? "Değişiklikleri kaydet" : "Ürünü ekle"}
        </Button>
        <button type="button" onClick={onDone} className="text-sm text-muted hover:text-accent">
          İptal
        </button>
      </div>
    </form>
  );
}
