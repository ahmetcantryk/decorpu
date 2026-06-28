import type { ReactElement } from "react";
import { setRequestLocale } from "next-intl/server";
import { HeroLookbook } from "@/components/site/HeroLookbook";
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
