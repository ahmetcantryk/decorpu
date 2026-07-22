"use client";

import { useState, type ReactElement } from "react";
import { MessageCircle, Phone, FileText, X, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Sağda sabit (fixed) iletişim butonları — WhatsApp, telefon, teklif. Mobilde toplanır. */
export function FloatingContact(): ReactElement {
  const tNav = useTranslations("Nav");
  const tCommon = useTranslations("Common");
  const [open, setOpen] = useState(false);

  const items = (
    <>
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
        className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-pop transition-transform"
      >
        <MessageCircle className="size-6" />
      </a>
      <a
        href={SITE.phoneHref}
        aria-label={tCommon("phone")}
        className="flex size-12 items-center justify-center rounded-full bg-ink text-bg shadow-pop transition-transform"
      >
        <Phone className="size-5" />
      </a>
      <Link
        href="/teklif"
        aria-label={tNav("quote")}
        className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-fg shadow-pop transition-transform"
      >
        <FileText className="size-5" />
      </Link>
    </>
  );

  return (
    <>
      {/* desktop: always visible vertical stack */}
      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 sm:flex">{items}</div>

      {/* mobile: FAB that expands */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:hidden">
        <div className={cn("flex flex-col gap-3 transition-all", open ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0")}>
          {items}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? tCommon("close") : tNav("contact")}
          className="flex size-13 items-center justify-center rounded-full bg-accent text-accent-fg shadow-pop"
        >
          {open ? <X className="size-6" /> : <Plus className="size-6" />}
        </button>
      </div>
    </>
  );
}
