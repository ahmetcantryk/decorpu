"use client";

import { useState, type ReactElement, type ChangeEvent } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Field } from "./form";
import { uploadImage, formatBytes, ImageUploadError, IMAGE_PRESETS } from "@/lib/admin/image-upload";
import { isAllowedImageUrl } from "@/lib/admin/image-url";

interface ImageFieldProps {
  /** Form alan adı (server action bu isimle okur). */
  name: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
  /** Storage klasörü + boyut ön ayarı. */
  kind: "cover" | "product";
}

const FOLDER = { cover: "kategori", product: "urun" } as const;

/** Yükle → WebP'ye çevir → küçült → Storage. Elle URL girişi de kabul eder. */
export function ImageField({ name, label, hint, value, onChange, kind }: ImageFieldProps): ReactElement {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  async function onFile(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = e.target.files?.[0];
    e.target.value = ""; // aynı dosya tekrar seçilebilsin
    if (!file) return;

    setUploading(true);
    setError(null);
    setNote(null);
    try {
      const result = await uploadImage(file, FOLDER[kind], IMAGE_PRESETS[kind]);
      onChange(result.url);
      setNote(
        `${formatBytes(result.originalBytes)} → ${formatBytes(result.blob.size)} · WebP · ${result.width}×${result.height}`,
      );
    } catch (err) {
      setError(err instanceof ImageUploadError ? err.message : "Yükleme sırasında beklenmeyen bir hata oluştu.");
    } finally {
      setUploading(false);
    }
  }

  const urlWarning = value && !isAllowedImageUrl(value) ? "Bu adres kabul edilmiyor; dosya yükleyin ya da site içi bir yol (/catalog/…) girin." : null;

  return (
    <Field label={label} hint={hint}>
      <div className="flex items-start gap-4">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-md border border-line bg-bg-subtle">
          {value ? (
            <>
              <Image src={value} alt="" fill sizes="96px" className="object-cover" unoptimized />
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setNote(null);
                }}
                className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-ink/70 text-bg"
                aria-label="Görseli kaldır"
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
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={onFile}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <input
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/catalog/… ya da yüklenen dosyanın adresi"
            className="w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:border-accent"
          />

          {note ? <p className="text-xs text-muted">{note}</p> : null}
          {urlWarning ? <p className="text-xs text-accent">{urlWarning}</p> : null}
          {error ? <p className="text-xs text-accent">{error}</p> : null}
        </div>
      </div>
    </Field>
  );
}
