import { createClient } from "@/lib/supabase/client";

/** Tarayıcıda canvas ile çözülebilen formatlar. HEIC/SVG/GIF kasten dışarıda. */
const ACCEPTED_TYPES: readonly string[] = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/** Dönüştürmeden ÖNCEki ham dosya sınırı — telefon fotoğrafları rahat sığar. */
const MAX_INPUT_BYTES = 25 * 1024 * 1024;

/** Uzun kenar üst sınırı (px) ve WebP kalitesi. */
export const IMAGE_PRESETS = {
  /** Kategori kapağı — kartlarda en fazla ~%25 genişlikte, retina için 1200 fazlasıyla yeter. */
  cover: { maxPx: 1200, quality: 0.8 },
  /** Ürün görseli — ürün sayfasında büyük gösterilir. */
  product: { maxPx: 1600, quality: 0.82 },
} as const;

export interface PreparedImage {
  blob: Blob;
  width: number;
  height: number;
  originalBytes: number;
}

export interface UploadedImage extends PreparedImage {
  url: string;
}

export class ImageUploadError extends Error {}

function assertAcceptable(file: File): void {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new ImageUploadError(
      `Desteklenmeyen dosya türü (${file.type || "bilinmiyor"}). JPG, PNG, WebP veya AVIF yükleyin.`,
    );
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new ImageUploadError(
      `Dosya çok büyük (${formatBytes(file.size)}). En fazla ${formatBytes(MAX_INPUT_BYTES)} olabilir.`,
    );
  }
}

function toBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new ImageUploadError("Görsel WebP'ye dönüştürülemedi."))),
      "image/webp",
      quality,
    );
  });
}

/**
 * Dosyayı WebP'ye çevirir ve uzun kenarı `maxPx`e indirir.
 *
 * Vercel görsel optimizasyonu kapalı (kota) — yüklenen dosya ziyaretçiye
 * OLDUĞU GİBİ iniyor. Bu yüzden küçültme/dönüştürme yükleme anında yapılır.
 */
export async function prepareImage(file: File, maxPx: number, quality: number): Promise<PreparedImage> {
  assertAcceptable(file);

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new ImageUploadError("Görsel okunamadı; dosya bozuk olabilir. Başka bir dosya deneyin.");
  }

  const scale = Math.min(1, maxPx / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new ImageUploadError("Tarayıcı görsel dönüştürmeyi desteklemiyor.");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await toBlob(canvas, quality);
  return { blob, width, height, originalBytes: file.size };
}

/** Supabase Storage'a yükler ve public URL'i döndürür. */
export async function uploadImage(
  file: File,
  folder: "kategori" | "urun",
  preset: { maxPx: number; quality: number },
): Promise<UploadedImage> {
  const prepared = await prepareImage(file, preset.maxPx, preset.quality);

  const supabase = createClient();
  const path = `${folder}/${Date.now()}-${Math.round(Math.random() * 1e6)}.webp`;
  const { error } = await supabase.storage
    .from("products")
    .upload(path, prepared.blob, { cacheControl: "31536000", contentType: "image/webp", upsert: false });
  if (error) throw new ImageUploadError(`Yükleme başarısız: ${error.message}`);

  const { data } = supabase.storage.from("products").getPublicUrl(path);
  return { ...prepared, url: data.publicUrl };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
