"use client";

import { useEffect, useState, type ReactElement } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { getConsent, CONSENT_EVENT, type ConsentValue } from "@/lib/consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * GA4 — yalnızca çerez onayı "accepted" ise yüklenir (KVKK uyumlu).
 * Onay banner'dan değişince anında tepki verir. SPA gezinmelerinde page_view gönderir.
 */
export function Analytics({ gaId }: { gaId: string }): ReactElement | null {
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setEnabled(getConsent() === "accepted");
    function onConsent(e: Event): void {
      setEnabled((e as CustomEvent<ConsentValue>).detail === "accepted");
    }
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    if (!enabled || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", { page_path: pathname });
  }, [pathname, enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
