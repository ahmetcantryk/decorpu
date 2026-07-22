import { createPublicClient } from "@/lib/supabase/public";
import { SITE_URL } from "@/lib/seo";

/**
 * Yeni lead geldiğinde e-posta bildirimi (Resend REST API — SDK/paket gerektirmez).
 * Markalı, tablo düzenli, ürün görselli HTML. RESEND_API_KEY + LEAD_NOTIFY_EMAIL
 * tanımlı değilse sessizce atlanır; HİÇBİR hata lead kaydını etkilemez
 * (lead bu fonksiyon çağrılmadan önce DB'ye yazılmıştır).
 */

export interface LeadNotification {
  kind: "rfq" | "contact";
  full_name: string;
  phone: string | null;
  email: string | null;
  company: string | null;
  message: string | null;
  product_codes: string[] | null;
}

interface ProductRow {
  code: string;
  qty: number;
  name: string | null;
  image: string | null;
}

/** E-posta HTML'ine kullanıcı verisi gömerken injection'ı önler. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function absUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

/** "PU-1024 x2" → { code: "PU-1024", qty: 2 } */
function parseCodeQty(raw: string): { code: string; qty: number } {
  const m = raw.trim().match(/^(.+?)\s+x(\d+)$/i);
  if (m) return { code: m[1].trim(), qty: Number(m[2]) || 1 };
  return { code: raw.trim(), qty: 1 };
}

/** Ürün adı + kapak görselini DB'den zenginleştirir; hata olursa sade satırlara düşer. */
async function enrichProducts(codes: string[]): Promise<ProductRow[]> {
  const parsed = codes.map(parseCodeQty);
  try {
    const supabase = createPublicClient();
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
      return { code, qty, name: hit?.name ?? null, image: hit?.image ? absUrl(hit.image) : null };
    });
  } catch {
    return parsed.map(({ code, qty }) => ({ code, qty, name: null, image: null }));
  }
}

const C = {
  ink: "#16171b",
  muted: "#6b7178",
  line: "#e7e9ec",
  accent: "#f77300",
  bgSubtle: "#f5f6f8",
};

function contactRow(label: string, valueHtml: string): string {
  return `<tr>
    <td style="padding:9px 14px;font-size:13px;color:${C.muted};white-space:nowrap;vertical-align:top;border-bottom:1px solid ${C.line};width:110px">${label}</td>
    <td style="padding:9px 14px;font-size:14px;color:${C.ink};border-bottom:1px solid ${C.line}">${valueHtml}</td>
  </tr>`;
}

function productRowsHtml(rows: ProductRow[]): string {
  const body = rows
    .map((r) => {
      const img = r.image
        ? `<img src="${r.image}" width="52" height="52" alt="" style="display:block;width:52px;height:52px;border-radius:6px;object-fit:cover;border:1px solid ${C.line}"/>`
        : `<div style="width:52px;height:52px;border-radius:6px;background:${C.bgSubtle};border:1px solid ${C.line}"></div>`;
      return `<tr>
        <td style="padding:8px 10px;border-bottom:1px solid ${C.line};width:62px">${img}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${C.line};font-family:Consolas,Menlo,monospace;font-size:13px;color:${C.accent};white-space:nowrap">
          <a href="${SITE_URL}/urun/${encodeURIComponent(r.code.toLowerCase())}" style="color:${C.accent};text-decoration:none">${escapeHtml(r.code)}</a>
        </td>
        <td style="padding:8px 10px;border-bottom:1px solid ${C.line};font-size:13px;color:${C.ink}">${r.name ? escapeHtml(r.name) : "—"}</td>
        <td style="padding:8px 10px;border-bottom:1px solid ${C.line};font-size:13px;color:${C.ink};text-align:center;white-space:nowrap"><b>${r.qty}</b> adet</td>
      </tr>`;
    })
    .join("");

  return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin-top:6px">
    <tr>
      <th style="padding:8px 10px;text-align:left;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:${C.muted};border-bottom:2px solid ${C.line}">Görsel</th>
      <th style="padding:8px 10px;text-align:left;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:${C.muted};border-bottom:2px solid ${C.line}">Kod</th>
      <th style="padding:8px 10px;text-align:left;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:${C.muted};border-bottom:2px solid ${C.line}">Ürün</th>
      <th style="padding:8px 10px;text-align:center;font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:${C.muted};border-bottom:2px solid ${C.line}">Adet</th>
    </tr>
    ${body}
  </table>`;
}

export async function sendLeadNotification(lead: LeadNotification): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return; // yapılandırılmamış → atla

  try {
    const from = process.env.LEAD_FROM_EMAIL || "DecorPU <onboarding@resend.dev>";
    const isRfq = lead.kind === "rfq";
    const subject = `${isRfq ? "Yeni teklif talebi" : "Yeni iletişim mesajı"} — ${lead.full_name}`;
    const when = new Date().toLocaleString("tr-TR", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Istanbul" });

    const products = lead.product_codes?.length ? await enrichProducts(lead.product_codes) : [];
    const totalQty = products.reduce((n, p) => n + p.qty, 0);

    const phoneHtml = lead.phone
      ? `<a href="tel:${escapeHtml(lead.phone.replace(/\s/g, ""))}" style="color:${C.ink};text-decoration:none;font-weight:600">${escapeHtml(lead.phone)}</a>`
      : "—";

    const html = `
<div style="margin:0;padding:24px 12px;background:${C.bgSubtle};font-family:system-ui,'Segoe UI',Arial,sans-serif">
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:640px;margin:0 auto;width:100%">
    <tr><td style="background:#ffffff;border:1px solid ${C.line};border-radius:12px;overflow:hidden">

      <!-- başlık -->
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
        <tr><td style="padding:18px 22px;border-bottom:3px solid ${C.accent}">
          <span style="font-size:22px;font-weight:700;color:${C.ink};font-family:Georgia,serif">Decor<span style="color:${C.accent}">PU</span></span>
          <span style="float:right;font-size:12px;color:${C.muted};padding-top:8px">${when}</span>
        </td></tr>
      </table>

      <div style="padding:20px 22px 24px">
        <h1 style="margin:0 0 2px;font-size:19px;color:${C.ink}">${isRfq ? "🧾 Yeni Teklif Talebi" : "✉️ Yeni İletişim Mesajı"}</h1>
        <p style="margin:0 0 16px;font-size:13px;color:${C.muted}">${isRfq ? "Teklif sepeti üzerinden gönderildi." : "İletişim formu üzerinden gönderildi."}</p>

        <!-- iletişim bilgileri -->
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;border:1px solid ${C.line};border-radius:8px">
          ${contactRow("Ad Soyad", `<b>${escapeHtml(lead.full_name)}</b>`)}
          ${contactRow("Telefon", phoneHtml)}
          ${lead.email ? contactRow("E-posta", `<a href="mailto:${escapeHtml(lead.email)}" style="color:${C.ink}">${escapeHtml(lead.email)}</a>`) : ""}
          ${lead.company ? contactRow("Firma", escapeHtml(lead.company)) : ""}
          ${lead.message ? contactRow("Mesaj", escapeHtml(lead.message)) : ""}
        </table>

        ${
          products.length
            ? `<h2 style="margin:22px 0 4px;font-size:15px;color:${C.ink}">İstenen Ürünler
                 <span style="font-weight:400;color:${C.muted};font-size:13px">— ${products.length} model · toplam ${totalQty} adet</span>
               </h2>
               ${productRowsHtml(products)}`
            : ""
        }

        <!-- CTA -->
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:22px">
          <tr><td style="background:${C.accent};border-radius:8px">
            <a href="${SITE_URL}/admin/talepler" style="display:inline-block;padding:11px 22px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none">Admin Panelde Görüntüle →</a>
          </td></tr>
        </table>
      </div>

      <div style="padding:12px 22px;background:${C.bgSubtle};border-top:1px solid ${C.line};font-size:11px;color:${C.muted}">
        DecorPU · Poliüretan Mimari Dekorasyon · Bu e-posta ${isRfq ? "teklif sepeti" : "iletişim formu"} gönderiminde otomatik oluşturuldu.
      </div>

    </td></tr>
  </table>
</div>`;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
        ...(lead.email ? { reply_to: lead.email } : {}),
      }),
    });
  } catch {
    // Bildirim başarısız olsa da lead kaydedildi; sessizce geç.
  }
}
