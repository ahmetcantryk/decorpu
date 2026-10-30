"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAllowedImageUrl } from "@/lib/admin/image-url";
import type { ActionResult } from "@/lib/admin/actions";
import { SLUG_PATTERN, errorMessage, readBool, readList, readNum, readStr } from "@/lib/admin/form-data";

const INVALID_IMAGE = "Görsel adresi geçersiz. Dosya yükleyin ya da site içi bir yol girin (/catalog/…).";

/** Desenler `(site)` route group'unu içermek zorunda — bkz. actions.ts açıklaması. */
function revalidateProjects(): void {
  revalidatePath("/admin/calismalar");
  revalidatePath("/[locale]/(site)", "page");
  revalidatePath("/[locale]/(site)/calismalarimiz", "page");
  revalidatePath("/[locale]/(site)/calismalarimiz/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

export async function saveProject(id: string | null, formData: FormData): Promise<ActionResult> {
  try {
    const slug = readStr(formData.get("slug"));
    const title = readStr(formData.get("title"));
    if (!slug || !title) return { ok: false, error: "Başlık ve slug zorunlu." };
    if (!SLUG_PATTERN.test(slug)) {
      return { ok: false, error: "Slug sadece küçük harf, rakam ve tire içerebilir (ör. villa-cephe)." };
    }

    const cover_url = readStr(formData.get("cover_url"));
    if (cover_url && !isAllowedImageUrl(cover_url)) return { ok: false, error: INVALID_IMAGE };
    const gallery = readList(formData, "gallery");
    if (gallery.some((u) => !isAllowedImageUrl(u))) return { ok: false, error: INVALID_IMAGE };

    const year = readNum(formData.get("year"));
    const values = {
      slug,
      title,
      summary: readStr(formData.get("summary")),
      description: readStr(formData.get("description")),
      cover_url,
      location: readStr(formData.get("location")),
      year: year === null ? null : Math.trunc(year),
      seo_title: readStr(formData.get("seo_title")),
      seo_description: readStr(formData.get("seo_description")),
      sort_order: readNum(formData.get("sort_order")) ?? 0,
      is_active: readBool(formData, "is_active"),
    };

    const supabase = await createClient();
    let projectId: string | null = id;
    if (id) {
      const { error } = await supabase.from("projects").update(values).eq("id", id);
      if (error) return { ok: false, error: error.message };
    } else {
      const { data, error } = await supabase.from("projects").insert(values).select("id").single();
      if (error) return { ok: false, error: error.message };
      projectId = data.id;
    }
    if (!projectId) return { ok: false, error: "Proje kaydedilemedi." };
    const pid: string = projectId;

    const { error: imgDel } = await supabase.from("project_images").delete().eq("project_id", pid);
    if (imgDel) return { ok: false, error: imgDel.message };
    if (gallery.length) {
      const rows = gallery.map((url, i) => ({ project_id: pid, url, sort_order: i }));
      const { error } = await supabase.from("project_images").insert(rows);
      if (error) return { ok: false, error: error.message };
    }

    const productIds = readList(formData, "product_ids");
    const { error: prodDel } = await supabase.from("project_products").delete().eq("project_id", pid);
    if (prodDel) return { ok: false, error: prodDel.message };
    if (productIds.length) {
      const rows = productIds.map((product_id) => ({ project_id: pid, product_id }));
      const { error } = await supabase.from("project_products").insert(rows);
      if (error) return { ok: false, error: error.message };
    }

    revalidateProjects();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: errorMessage(e) };
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error: imgErr } = await supabase.from("project_images").delete().eq("project_id", id);
    if (imgErr) return { ok: false, error: imgErr.message };
    const { error: linkErr } = await supabase.from("project_products").delete().eq("project_id", id);
    if (linkErr) return { ok: false, error: linkErr.message };
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidateProjects();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: errorMessage(e) };
  }
}
