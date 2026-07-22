"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { getConsent, CONSENT_EVENT, type ConsentValue } from "@/lib/consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const;

const DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

/**
 * GA4 + Google Consent Mode v2.
 * Tag HERKESE yüklenir (Google dedektörü görür, çerezsiz sinyal akar);
 * varsayılan izin "denied" olduğundan onay verilmeden ÇEREZ YAZILMAZ.
 * Banner'da "Kabul Et" → consent update granted → tam ölçüm.
 */
export function Analytics({ gaId }: { gaId: string }): React.ReactElement {
  const pathname = usePathname();
  const firstRender = useRef(true);

  // Kayıtlı onayı uygula + banner değişimini dinle
  useEffect(() => {
    function apply(v: ConsentValue | null): void {
      if (typeof window.gtag !== "function") return;
      window.gtag("consent", "update", v === "accepted" ? GRANTED : DENIED);
    }
    apply(getConsent());
    function onConsent(e: Event): void {
      apply((e as CustomEvent<ConsentValue>).detail);
    }
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  // SPA gezinmelerinde page_view (ilk yükleme config'ten gelir; çift sayma yok)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: pathname });
    }
  }, [pathname]);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('js',new Date());
gtag('config','${gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
