/**
 * Çerez/onay durumu — tek kaynak. Analitik (GA4 vb.) yalnızca "accepted" ise yüklenir.
 * localStorage tabanlı; değişimde `CONSENT_EVENT` yayınlanır ki dinleyiciler (analytics) tepki verebilsin.
 */
export const CONSENT_KEY = "decorpu-consent";
export const CONSENT_EVENT = "decorpu-consent-change";
/** Çerez ayarları panelini (yeniden) açmak için yayınlanan event. */
export const CONSENT_OPEN_EVENT = "decorpu-open-cookie-settings";

export type ConsentValue = "accepted" | "rejected";

/** Mevcut onay; henüz seçim yapılmadıysa null. SSR'da null döner. */
export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

/** Onayı kaydet ve dinleyicilere haber ver. */
export function setConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // localStorage erişilemiyorsa (gizli mod vb.) sessizce geç — yine event yayınla.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

/** Analitik çerezlere izin verildi mi? */
export function hasAnalyticsConsent(): boolean {
  return getConsent() === "accepted";
}

/** Çerez ayarları panelini herhangi bir yerden (ör. footer linki) yeniden açar. */
export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
