"use client";

import { useEffect, useState } from "react";
import { getConsent, CONSENT_EVENT, type ConsentValue } from "@/lib/consent";

declare global {
  interface Window {
    clarity?: { (...args: unknown[]): void; q?: unknown[][] };
  }
}

/**
 * Microsoft Clarity — yalnızca çerez onayı "accepted" ise yüklenir (KVKK uyumlu).
 * Onay banner'dan sonradan verilirse anında devreye girer.
 */
export function Clarity({ id }: { id: string }): null {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getConsent() === "accepted");
    function onConsent(e: Event): void {
      if ((e as CustomEvent<ConsentValue>).detail === "accepted") setEnabled(true);
    }
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    if (!enabled || document.getElementById("clarity-script")) return;
    // Resmî snippet'in kuyruk şivi: script yüklenene dek çağrıları biriktirir.
    window.clarity =
      window.clarity ||
      function (...args: unknown[]) {
        (window.clarity!.q = window.clarity!.q || []).push(args);
      };
    const s = document.createElement("script");
    s.id = "clarity-script";
    s.async = true;
    s.src = `https://www.clarity.ms/tag/${id}`;
    document.head.appendChild(s);
  }, [enabled, id]);

  return null;
}
