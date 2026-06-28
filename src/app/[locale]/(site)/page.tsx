import type { ReactElement } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HeroCinematic } from "@/components/site/HeroCinematic";
import { HomeBody } from "@/components/site/HomeBody";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraphSchema, localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localizedAlternates(locale, "") };
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd data={siteGraphSchema()} />
      <HeroCinematic />
      <HomeBody />
    </>
  );
}
