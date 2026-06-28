"use client";

import type { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { openCookieSettings } from "@/lib/consent";

/** Footer linki — çerez tercih panelini yeniden açar. */
export function CookieSettingsButton({ className }: { className?: string }): ReactElement {
  const t = useTranslations("Cookie");
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {t("customize")}
    </button>
  );
}
