import type { ReactElement } from "react";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ContactForm } from "@/components/site/ContactForm";
import { localizedAlternates } from "@/lib/seo";
import { SITE } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("Nav.contact"),
    description: t("Contact.metaDescription"),
    alternates: localizedAlternates(locale, "/iletisim"),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ label: t("Common.home"), href: "/" }, { label: t("Nav.contact") }]} />
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{t("Contact.title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("Contact.subtitle")}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* info + form */}
        <div className="space-y-6">
          <ul className="space-y-3">
            <li>
              <a href={SITE.phoneHref} className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/50">
                <span className="flex size-10 items-center justify-center rounded-md bg-accent/10 text-accent"><Phone className="size-5" /></span>
                <span><span className="block text-xs text-muted">{t("Common.phone")}</span><span className="font-medium">{SITE.phoneDisplay}</span></span>
              </a>
            </li>
            <li>
              <a href={SITE.whatsapp} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/50">
                <span className="flex size-10 items-center justify-center rounded-md bg-accent/10 text-accent"><MessageCircle className="size-5" /></span>
                <span><span className="block text-xs text-muted">WhatsApp</span><span className="font-medium">{t("Contact.whatsappValue")}</span></span>
              </a>
            </li>
            <li>
              <a href={SITE.emailHref} className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/50">
                <span className="flex size-10 items-center justify-center rounded-md bg-accent/10 text-accent"><Mail className="size-5" /></span>
                <span><span className="block text-xs text-muted">{t("Contact.labelEmail")}</span><span className="font-medium">{SITE.email}</span></span>
              </a>
            </li>
            <li className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4">
              <span className="flex size-10 items-center justify-center rounded-md bg-accent/10 text-accent"><MapPin className="size-5" /></span>
              <span><span className="block text-xs text-muted">{t("Contact.labelAddress")}</span><span className="font-medium">{SITE.address}</span></span>
            </li>
          </ul>

          <ContactForm source="iletisim" />
        </div>

        {/* map */}
        <div className="min-h-[420px] overflow-hidden rounded-xl border border-line">
          <iframe
            title={t("Common.mapTitle")}
            src={SITE.mapEmbed}
            className="h-full min-h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Container>
  );
}
