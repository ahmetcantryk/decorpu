"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAllowedImageUrl } from "@/lib/admin/image-url";
import type { ActionResult } from "@/lib/admin/actions";
import { SLUG_PATTERN, errorMessage, readBool, readList, readNum, readStr } from "@/lib/admin/form-data";

/** Desenler `(site)` route group'unu içermek zorunda — bkz. actions.ts açıklaması. */
function revalidateServices(): void {
  revalidatePath("/admin/hizmetler");
  revalidatePath("/[locale]/(site)", "page");
  revalidatePath("/[locale]/(site)/hizmetler", "page");
  revalidatePath("/[locale]/(site)/hizmetler/[slug]", "page");
  revalidatePath("/sitemap.xml");
}

export async function saveService(id: string | null, formData: FormData): Promise<ActionResult> {
  try {
    const slug = readStr(formData.get("slug"));
    const title = readStr(formData.get("title"));
    if (!slug || !title) return { ok: false, error: "Başlık ve slug zorunlu." };
    if (!SLUG_PATTERN.test(slug)) {
      return { ok: false, error: "Slug sadece küçük harf, rakam ve tire içerebilir (ör. ozel-uretim)." };
    }

    const image_url = readStr(formData.get("image_url"));
    if (image_url && !isAllowedImageUrl(image_url)) {
      return { ok: false, error: "Görsel adresi geçersiz. Dosya yükleyin ya da site içi bir yol girin (/catalog/…)." };
    }

    const values = {
      slug,
      title,
      summary: readStr(formData.get("summary")),
      description: readStr(formData.get("description")),
      content: readStr(formData.get("content")),
      image_url,
      icon: readStr(formData.get("icon")),
      cta_label: readStr(formData.get("cta_label")),
      seo_title: readStr(formData.get("seo_title")),
      seo_description: readStr(formData.get("seo_description")),
      sort_order: readNum(formData.get("sort_order")) ?? 0,
      is_active: readBool(formData, "is_active"),
    };

    const supabase = await createClient();
    let serviceId: string | null = id;
    if (id) {
      const { error } = await supabase.from("services").update(values).eq("id", id);
      if (error) return { ok: false, error: error.message };
    } else {
      const { data, error } = await supabase.from("services").insert(values).select("id").single();
      if (error) return { ok: false, error: error.message };
      serviceId = data.id;
    }
    if (!serviceId) return { ok: false, error: "Hizmet kaydedilemedi." };
    const sid: string = serviceId;

    const productIds = readList(formData, "product_ids");
    const { error: delErr } = await supabase.from("service_products").delete().eq("service_id", sid);
    if (delErr) return { ok: false, error: delErr.message };
    if (productIds.length) {
      const rows = productIds.map((product_id) => ({ service_id: sid, product_id }));
      const { error: insErr } = await supabase.from("service_products").insert(rows);
      if (insErr) return { ok: false, error: insErr.message };
    }

    revalidateServices();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: errorMessage(e) };
  }
}

export async function deleteService(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error: linkErr } = await supabase.from("service_products").delete().eq("service_id", id);
    if (linkErr) return { ok: false, error: linkErr.message };
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidateServices();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: errorMessage(e) };
  }
}
