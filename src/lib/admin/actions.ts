"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAllowedImageUrl } from "@/lib/admin/image-url";

export type ActionResult = { ok: true } | { ok: false; error: string };

const NONE = "none";

/** Ürün adresi koddan üretilir (`/urun/<kod>`) — URL'i kıracak karakterler kabul edilmez. */
const CODE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
/** Kategori adresi slug'dan üretilir (`/kategoriler/<slug>`). */
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Herkese açık sayfaların ISR önbelleğini tazeler.
 * Anasayfa ve /kategoriler `revalidate = 3600` ile önbelleklendiği için,
 * bu çağrı olmadan panelden yapılan değişiklik canlıda 1 saate kadar gecikir.
 *
 * DİKKAT: Desenler route group'u (`(site)`) İÇERMEK ZORUNDA — Next etiketleri
 * app dizin yoluna göre üretiyor. `/[locale]/kategoriler` yazılırsa sessizce
 * hiçbir şeyi tazelemez (yerelde ölçüldü).
 */
function revalidatePublic(): void {
  revalidatePath("/[locale]/(site)", "page");
  revalidatePath("/[locale]/(site)/kategoriler", "page");
  revalidatePath("/[locale]/(site)/kategoriler/[slug]", "page");
  revalidatePath("/[locale]/(site)/urun/[code]", "page");
  revalidatePath("/[locale]/(site)/ara", "page");
  revalidatePath("/sitemap.xml");
}

function num(v: FormDataEntryValue | null): number | null {
  if (v === null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}
function str(v: FormDataEntryValue | null): string | null {
  const s = (v ?? "").toString().trim();
  return s === "" || s === NONE ? null : s;
}
function bool(fd: FormData, key: string): boolean {
  return fd.get(key) === "on" || fd.get(key) === "true";
}
function fail(e: unknown): ActionResult {
  return { ok: false, error: e instanceof Error ? e.message : "Beklenmeyen hata" };
}

export async function saveProduct(id: string | null, formData: FormData): Promise<ActionResult> {
  try {
    const code = str(formData.get("code"));
    const name_tr = str(formData.get("name_tr"));
    if (!code || !name_tr) return { ok: false, error: "Kod ve TR ad zorunlu." };
    if (!CODE_PATTERN.test(code)) {
      return {
        ok: false,
        error: "Ürün kodu ürün adresinde kullanılıyor: boşluk ve Türkçe karakter içeremez (ör. DP-1001).",
      };
    }

    const imageUrl = str(formData.get("image_url"));
    if (imageUrl && !isAllowedImageUrl(imageUrl)) {
      return { ok: false, error: "Görsel adresi geçersiz. Dosya yükleyin ya da site içi bir yol girin (/catalog/…)." };
    }

    const values = {
      code,
      slug: code.toLowerCase(),
      name_tr,
      name_en: str(formData.get("name_en")),
      category_id: str(formData.get("category_id")),
      description_tr: str(formData.get("description_tr")),
      width_mm: num(formData.get("width_mm")),
      length_mm: num(formData.get("length_mm")),
      height_mm: num(formData.get("height_mm")),
      diameter_mm: num(formData.get("diameter_mm")),
      weight_g: num(formData.get("weight_g")),
      material: str(formData.get("material")),
      price: num(formData.get("price")),
      paintable: bool(formData, "paintable"),
      indoor: bool(formData, "indoor"),
      outdoor: bool(formData, "outdoor"),
      water_resistant: bool(formData, "water_resistant"),
      is_active: bool(formData, "is_active"),
      is_featured: bool(formData, "is_featured"),
    };

    const supabase = await createClient();
    let productId = id;
    if (id) {
      const { error } = await supabase.from("products").update(values).eq("id", id);
      if (error) return { ok: false, error: error.message };
    } else {
      const { data, error } = await supabase.from("products").insert(values).select("id").single();
      if (error) return { ok: false, error: error.message };
      productId = data.id;
    }

    if (imageUrl && productId) {
      await supabase.from("product_images").delete().eq("product_id", productId).eq("is_primary", true);
      await supabase.from("product_images").insert({ product_id: productId, url: imageUrl, is_primary: true });
    }

    revalidatePath("/admin/urunler");
    revalidatePath("/admin");
    revalidatePublic();
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/urunler");
    revalidatePath("/admin");
    revalidatePublic();
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function saveCategory(id: string | null, formData: FormData): Promise<ActionResult> {
  try {
    const slug = str(formData.get("slug"));
    const name_tr = str(formData.get("name_tr"));
    if (!slug || !name_tr) return { ok: false, error: "Slug ve ad zorunlu." };
    if (!SLUG_PATTERN.test(slug)) {
      return {
        ok: false,
        error: "Slug kategori adresinde kullanılıyor: sadece küçük harf, rakam ve tire (ör. sutun-baslik).",
      };
    }

    const image_path = str(formData.get("image_path"));
    if (image_path && !isAllowedImageUrl(image_path)) {
      return { ok: false, error: "Kapak görseli adresi geçersiz. Dosya yükleyin ya da site içi bir yol girin (/catalog/…)." };
    }

    const values = {
      slug,
      name_tr,
      name_en: str(formData.get("name_en")),
      parent_id: str(formData.get("parent_id")),
      sort_order: num(formData.get("sort_order")) ?? 0,
      image_path,
    };

    const supabase = await createClient();
    if (id) {
      const { error } = await supabase.from("categories").update(values).eq("id", id);
      if (error) return { ok: false, error: error.message };
    } else {
      const { error } = await supabase.from("categories").insert(values);
      if (error) return { ok: false, error: error.message };
    }
    revalidatePath("/admin/kategoriler");
    revalidatePath("/admin");
    revalidatePublic();
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/kategoriler");
    revalidatePath("/admin");
    revalidatePublic();
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function updateLeadStatus(id: string, status: string): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/talepler");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function deleteLead(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/talepler");
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}
