"use server";

import { createClient } from "@/lib/supabase/server";

export interface LeadProduct {
  code: string;
  qty: number;
  name: string | null;
  image: string | null;
}

/** "PU-1024 x2" → { code, qty } */
function parseCodeQty(raw: string): { code: string; qty: number } {
  const m = raw.trim().match(/^(.+?)\s+x(\d+)$/i);
  if (m) return { code: m[1].trim(), qty: Number(m[2]) || 1 };
  return { code: raw.trim(), qty: 1 };
}

/** Talepteki ürün kodlarını ad + kapak görseliyle zenginleştirir (admin talep detayı). */
export async function fetchLeadProducts(codes: string[]): Promise<LeadProduct[]> {
  const parsed = codes.map(parseCodeQty);
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("code,name_tr,product_images(url,is_primary)")
      .in("code", parsed.map((p) => p.code));

    const byCode = new Map(
      (data ?? []).map((p) => {
        const img = p.product_images?.find((i) => i.is_primary)?.url ?? p.product_images?.[0]?.url ?? null;
        return [p.code.toUpperCase(), { name: p.name_tr, image: img }];
      }),
    );
    return parsed.map(({ code, qty }) => {
      const hit = byCode.get(code.toUpperCase());
      return { code, qty, name: hit?.name ?? null, image: hit?.image ?? null };
    });
  } catch {
    return parsed.map(({ code, qty }) => ({ code, qty, name: null, image: null }));
  }
}
