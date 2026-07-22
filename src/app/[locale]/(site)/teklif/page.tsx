import type { ReactElement } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { QuoteCart } from "@/components/site/QuoteCart";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("Quote.metaTitle"),
    description: t("Quote.metaDescription"),
    alternates: localizedAlternates(locale, "/teklif"),
  };
}

export default async function TeklifPage({ params }: { params: Promise<{ locale: Locale }> }): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  return <QuoteCart />;
}
