import type { ReactElement } from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/site/LegalDocument";
import { privacyContent } from "@/lib/legal";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = privacyContent(locale);
  return {
    title: c.title,
    description: c.intro.slice(0, 160),
    alternates: localizedAlternates(locale, "/gizlilik"),
  };
}

export default async function GizlilikPage({ params }: { params: Promise<{ locale: Locale }> }): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument content={privacyContent(locale)} />;
}
