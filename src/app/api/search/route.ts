import { NextResponse } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";

export interface SearchSuggestion {
  code: string;
  name: string;
  image: string | null;
}

/**
 * Canlı arama önerileri (searchable combobox için).
 * GET /api/search?q=pu-10  →  { items: SearchSuggestion[] } (en fazla 8)
 * Kod VE ada bakar; kod eşleşmeleri önce gelir.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  if (q.length < 2) return NextResponse.json({ items: [] });

  // ilike deseni için joker karakterleri etkisizleştir
  const safe = q.replace(/[%_]/g, "\\$&");

  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("products")
      .select("code,name_tr,product_images(url,is_primary)")
      .eq("is_active", true)
      .or(`code.ilike.%${safe}%,name_tr.ilike.%${safe}%,name_en.ilike.%${safe}%`)
      .limit(8);

    const lower = q.toLowerCase();
    const items = (data ?? [])
      .map((p) => ({
        code: p.code,
        name: p.name_tr,
        image: p.product_images?.find((i) => i.is_primary)?.url ?? p.product_images?.[0]?.url ?? null,
      }))
      // kod eşleşmesi (özellikle baştan eşleşen) üste
      .sort((a, b) => {
        const rank = (x: { code: string; name: string }): number => {
          const c = x.code.toLowerCase();
          if (c.startsWith(lower)) return 0;
          if (c.includes(lower)) return 1;
          return 2;
        };
        return rank(a) - rank(b);
      });

    return NextResponse.json({ items }, { headers: { "Cache-Control": "public, max-age=30, s-maxage=120" } });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
