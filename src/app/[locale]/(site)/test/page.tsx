import type { ReactElement } from "react";
import { setRequestLocale } from "next-intl/server";
import { HeroCinematic } from "@/components/site/HeroCinematic";
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
