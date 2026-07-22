import type { ReactNode, ReactElement } from "react";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingContact } from "@/components/site/FloatingContact";
import { CookieConsent } from "@/components/site/CookieConsent";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { Analytics } from "@/components/seo/Analytics";

/** Public site chrome (header + footer). Admin lives in the (admin) group without this. */
export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCommon = await getTranslations("Common");

  return (
    <>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        {tCommon("skipToContent")}
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingContact />
      <CookieConsent />
      {process.env.NEXT_PUBLIC_GA4_ID ? <Analytics gaId={process.env.NEXT_PUBLIC_GA4_ID} /> : null}
      {/* Ahrefs Web Analytics — çerezsiz (cookieless), kişisel veri toplamaz; onay gerektirmez. */}
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="J0R49qfpRoqZl3jbSO5+0w"
        strategy="afterInteractive"
      />
    </>
  );
}
