"use client";

import { useEffect } from "react";
import { submitRfq } from "@/lib/rfq/actions";

/**
 * WebMCP araç kaydı (Lighthouse "Agentic Browsing" — registered tools + valid schemas).
 * AI ajanları siteyi DOM kazımadan kullanabilsin diye iki gerçek yetenek sunar:
 * ürün arama ve teklif talebi oluşturma. API yoksa sessizce atlanır.
 */
export function WebMcpTools(): null {
  useEffect(() => {
    const mc = document.modelContext ?? navigator.modelContext;
    if (!mc) return;

    const controller = new AbortController();

    const tools = [
      {
        name: "search_products",
        description:
          "DecorPU poliüretan mimari dekorasyon kataloğunda ürün arar. Ürün koduyla (ör. PU-1024) veya adıyla arama yapar; kod, ad ve ürün sayfası bağlantısı döner.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string", description: "Ürün kodu veya arama kelimesi (en az 2 karakter)" },
          },
          required: ["query"],
        },
        async execute({ query }: Record<string, unknown>) {
          const q = String(query ?? "").trim();
          const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
          const data = (await res.json()) as { items: { code: string; name: string }[] };
          const lines = data.items.map((i) => `${i.code} — ${i.name} → ${location.origin}/urun/${i.code.toLowerCase()}`);
          return {
            content: [
              {
                type: "text" as const,
                text: lines.length ? `${lines.length} sonuç:\n${lines.join("\n")}` : "Sonuç bulunamadı.",
              },
            ],
          };
        },
      },
      {
        name: "request_quote",
        description:
          "DecorPU'dan fiyat teklifi talebi oluşturur. Ad soyad ve telefon zorunludur; istenen ürün kodları ve not eklenebilir. Talep satış ekibine iletilir.",
        inputSchema: {
          type: "object",
          properties: {
            full_name: { type: "string", description: "Talep sahibinin adı soyadı" },
            phone: { type: "string", description: "Telefon numarası" },
            message: { type: "string", description: "Proje notu (opsiyonel)" },
            product_codes: {
              type: "array",
              items: { type: "string" },
              description: "İstenen ürün kodları, ör. [\"PU-1024 x2\"] (opsiyonel)",
            },
          },
          required: ["full_name", "phone"],
        },
        async execute(args: Record<string, unknown>) {
          const codes = Array.isArray(args.product_codes) ? args.product_codes.map(String) : [];
          const r = await submitRfq({
            full_name: args.full_name,
            phone: args.phone,
            message: args.message ?? null,
            product_codes: codes,
            kind: codes.length ? "rfq" : "contact",
          });
          return {
            content: [
              {
                type: "text" as const,
                text: r.ok
                  ? "Teklif talebiniz alındı. Satış ekibimiz en kısa sürede belirtilen telefondan dönüş yapacak."
                  : `Talep oluşturulamadı: ${r.error}`,
              },
            ],
          };
        },
      },
    ];

    try {
      if (typeof mc.registerTool === "function") {
        for (const tool of tools) void mc.registerTool(tool, { signal: controller.signal });
      } else if (typeof mc.provideContext === "function") {
        void mc.provideContext({ tools });
      }
    } catch {
      // deneysel API — hata sitede hiçbir şeyi etkilemesin
    }

    return () => controller.abort();
  }, []);

  return null;
}
