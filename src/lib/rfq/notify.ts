/**
 * Yeni lead geldiğinde e-posta bildirimi (Resend REST API — SDK/paket gerektirmez).
 * RESEND_API_KEY + LEAD_NOTIFY_EMAIL tanımlı değilse sessizce atlanır; bildirim hatası
 * lead kaydını ETKİLEMEZ (lead zaten DB'ye yazılmıştır).
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

/** E-posta HTML'ine kullanıcı verisi gömerken injection'ı önler. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string | null | undefined): string {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px;color:#6b7178;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 12px;color:#16171b">${escapeHtml(value)}</td></tr>`;
}

export async function sendLeadNotification(lead: LeadNotification): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return; // yapılandırılmamış → atla

  const from = process.env.LEAD_FROM_EMAIL || "DecorPU <onboarding@resend.dev>";
  const isRfq = lead.kind === "rfq";
  const subject = `${isRfq ? "Yeni teklif talebi" : "Yeni iletişim mesajı"} — ${lead.full_name}`;

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="color:#16171b;margin:0 0 12px">${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse;width:100%;border:1px solid #e7e9ec;border-radius:8px">
        ${row("Ad Soyad", lead.full_name)}
        ${row("Telefon", lead.phone)}
        ${row("E-posta", lead.email)}
        ${row("Firma", lead.company)}
        ${row("Mesaj", lead.message)}
        ${row("Ürünler", lead.product_codes?.join(", ") ?? null)}
      </table>
      <p style="color:#969ba3;font-size:12px;margin-top:12px">DecorPU · ${isRfq ? "teklif-sepeti" : "iletisim"}</p>
    </div>`;

  try {
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
