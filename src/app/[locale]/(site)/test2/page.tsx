import type { ReactElement } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroLookbook } from "@/components/site/HeroLookbook";

/** Dev karşılaştırma sayfası — indexlenmez. */
export const metadata: Metadata = { robots: { index: false, follow: false } };
import { HomeBody } from "@/components/site/HomeBody";
import type { Locale } from "@/i18n/routing";

/** /test2 — Alternatif B: lookbook/katalog tarzı, alt thumbnail şeritli alçak slider. */
export default async function Test2Page({ params }: { params: Promise<{ locale: Locale }> }): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <HeroLookbook />
      <HomeBody />
    </>
  );
}
