"use client";

import { useState, type ReactElement, type ChangeEvent } from "react";
import Image from "next/image";
import { Upload, X, ArrowLeft, ArrowRight } from "lucide-react";
import { Field } from "./form";
import { uploadImage, ImageUploadError, IMAGE_PRESETS } from "@/lib/admin/image-upload";

interface GalleryFieldProps {
  /** Form alan adı — her görsel için sıralı gizli input üretilir. */
  name: string;
  label: string;
  hint?: string;
  defaultValue: string[];
}

function move(list: string[], from: number, to: number): string[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/** Çoklu görsel: yükle (otomatik WebP), sırala, kaldır. */
export function GalleryField({ name, label, hint, defaultValue }: GalleryFieldProps): ReactElement {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFiles(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;
    setUploading(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of files) {
        const r = await uploadImage(file, "urun", IMAGE_PRESETS.product);
        uploaded.push(r.url);
      }
      setUrls((u) => [...u, ...uploaded]);
    } catch (err) {
      setError(err instanceof ImageUploadError ? err.message : "Yükleme sırasında beklenmeyen bir hata oluştu.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Field label={`${label} (${urls.length})`} hint={hint}>
      <div className="space-y-2">
        {urls.map((u) => (
          <input key={u} type="hidden" name={name} value={u} />
        ))}
        {urls.length ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {urls.map((u, i) => (
              <div key={u} className="group relative aspect-square overflow-hidden rounded-md border border-line bg-bg-subtle">
                <Image src={u} alt="" fill sizes="120px" className="object-cover" unoptimized />
                <button
                  type="button"
                  aria-label="Görseli kaldır"
                  onClick={() => setUrls((list) => list.filter((x) => x !== u))}
                  className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-ink/70 text-bg"
                >
                  <X className="size-3" />
                </button>
                <div className="absolute inset-x-1 bottom-1 flex justify-between">
                  <button
                    type="button"
                    aria-label="Sola taşı"
                    onClick={() => setUrls((list) => move(list, i, i - 1))}
                    className="flex size-5 items-center justify-center rounded-full bg-ink/70 text-bg disabled:opacity-30"
                    disabled={i === 0}
                  >
                    <ArrowLeft className="size-3" />
                  </button>
                  <button
                    type="button"
                    aria-label="Sağa taşı"
                    onClick={() => setUrls((list) => move(list, i, i + 1))}
                    className="flex size-5 items-center justify-center rounded-full bg-ink/70 text-bg disabled:opacity-30"
                    disabled={i === urls.length - 1}
                  >
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink-soft transition-colors hover:border-ink">
          <Upload className="size-4" />
          {uploading ? "Yükleniyor…" : "Görsel ekle"}
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={onFiles}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {error ? <p className="text-xs text-accent">{error}</p> : null}
      </div>
    </Field>
  );
}
