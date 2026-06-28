import type { ReactElement } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/site/LegalDocument";
import { cookieContent } from "@/lib/legal";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = cookieContent(locale);
  return {
    title: c.title,
    description: c.intro.slice(0, 160),
    alternates: localizedAlternates(locale, "/cerez-politikasi"),
  };
}

export default async function CerezPolitikasiPage({ params }: { params: Promise<{ locale: Locale }> }): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument content={cookieContent(locale)} />;
}
