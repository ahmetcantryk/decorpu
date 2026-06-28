"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type MovementType = "in" | "out" | "adjust";

export type StockActionResult = { ok: true; newQty: number } | { ok: false; error: string };

export interface MovementInput {
  productId: string;
  type: MovementType;
  quantity: number;
  reason?: string | null;
  note?: string | null;
  ref?: string | null;
}

/** Atomik stok hareketi — apply_stock_movement RPC'sini çağırır (defter + stok güncelleme). */
export async function applyMovement(input: MovementInput): Promise<StockActionResult> {
  try {
    if (!input.productId) return { ok: false, error: "Ürün gerekli." };
    if (!Number.isFinite(input.quantity) || input.quantity < 0) {
      return { ok: false, error: "Geçerli bir miktar girin." };
    }
    if (!["in", "out", "adjust"].includes(input.type)) {
      return { ok: false, error: "Geçersiz hareket tipi." };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.rpc("apply_stock_movement", {
      p_product: input.productId,
      p_type: input.type,
      p_qty: input.quantity,
      p_reason: input.reason ?? undefined,
      p_note: input.note ?? undefined,
      p_ref: input.ref ?? undefined,
    });
    if (error) {
      const msg = /yetersiz stok/i.test(error.message) ? "Yetersiz stok — çıkış miktarı mevcut stoktan fazla." : error.message;
      return { ok: false, error: msg };
    }

    revalidatePath("/admin/stok");
    revalidatePath("/admin/stok/liste");
    return { ok: true, newQty: Number(data) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Beklenmeyen hata" };
  }
}

/** Ürünün kritik seviyesini / birimini günceller. */
export async function updateStockSettings(productId: string, minLevel: number, unit: string): Promise<StockActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("products")
      .update({ min_level: Number.isFinite(minLevel) ? minLevel : 0, unit: unit || "adet" })
      .eq("id", productId);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/stok");
    revalidatePath("/admin/stok/liste");
    return { ok: true, newQty: 0 };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Beklenmeyen hata" };
  }
}
