"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { sendLeadNotification } from "@/lib/rfq/notify";

const schema = z.object({
  full_name: z.string().min(2, "Ad Soyad zorunlu"),
  phone: z.string().min(7, "Telefon numarası zorunlu"),
  email: z.string().email().optional().nullable().or(z.literal("")),
  company: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  product_codes: z.array(z.string()).default([]),
  kind: z.enum(["rfq", "contact"]).default("rfq"),
  // Honeypot: insanlar göremez/dolduramaz; bot doldurursa spam'dir.
  hp: z.string().optional().nullable(),
});

export type RfqSubmitResult = { ok: true } | { ok: false; error: string };

export async function submitRfq(input: unknown): Promise<RfqSubmitResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Form geçersiz" };
  }
  const data = parsed.data;

  // Honeypot doluysa: bota başarı taklidi yap, kaydetme.
  if (data.hp && data.hp.trim().length > 0) {
    return { ok: true };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("leads").insert({
      kind: data.kind,
      full_name: data.full_name,
      email: data.email || null,
      phone: data.phone || null,
      company: data.company || null,
      message: data.message || null,
      product_codes: data.product_codes.length ? data.product_codes : null,
      role: "architect",
      status: "new",
      source: data.kind === "rfq" ? "teklif-sepeti" : "iletisim",
    });
    if (error) return { ok: false, error: error.message };

    // Lead kaydedildi; bildirimi gönder (hata olsa da başarıyı bozmaz).
    await sendLeadNotification({
      kind: data.kind,
      full_name: data.full_name,
      phone: data.phone || null,
      email: data.email || null,
      company: data.company || null,
      message: data.message || null,
      product_codes: data.product_codes.length ? data.product_codes : null,
    });

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Gönderim başarısız" };
  }
}
