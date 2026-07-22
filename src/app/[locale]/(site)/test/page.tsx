import type { ReactElement } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroCinematic } from "@/components/site/HeroCinematic";

/** Dev karşılaştırma sayfası — indexlenmez. */
export const metadata: Metadata = { robots: { index: false, follow: false } };
import { HomeBody } from "@/components/site/HomeBody";
import type { Locale } from "@/i18n/routing";

/** /test — Alternatif A: sinematik full-bleed alçak slider + hemen altında kategoriler. */
export default async function TestPage({ params }: { params: Promise<{ locale: Locale }> }): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <HeroCinematic />
      <HomeBody />
    </>
  );
}
