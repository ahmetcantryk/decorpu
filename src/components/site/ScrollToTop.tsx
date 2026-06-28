"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Route değişiminde sayfayı anında en üste alır. CSS'teki `scroll-behavior: smooth`
 * sayfa-içi anchor'lar için kalır; burada "instant" ile geçişlerde menünün aşağıda
 * kalması sorunu giderilir. (Aynı yoldaki hash gezinmesinde tetiklenmez.)
 */
export function ScrollToTop(): null {
  const pathname = usePathname();

  useEffect(() => {
    // Anchor (#bölüm) deep-link'lerini bozmamak için hash varsa atla.
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
