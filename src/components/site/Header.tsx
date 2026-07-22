import type { ReactElement } from "react";
import { Phone, MessageCircle, FileDown, PencilRuler } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "./Wordmark";
import { CodeSearch } from "./CodeSearch";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { QuoteCartButton } from "./QuoteCartButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Sticky site header — mega menu, code search, phone, theme toggle, prominent CTA. */
export function Header(): ReactElement {
  const t = useTranslations("Nav");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-sm">
      {/* top utility bar — masaüstü */}
      <div className="hidden border-b border-line/70 bg-bg-subtle/60 lg:block">
        <Container className="flex h-9 items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-4">
            <span>Mimarlara özel · Proje bazlı poliüretan dekorasyon imalatı</span>
            <a href={SITE.downloads.catalogPdf} download className="flex items-center gap-1 font-medium text-ink transition-colors hover:text-accent">
              <FileDown className="size-3.5 text-accent" />
              Katalog (PDF)
            </a>
            <a href={SITE.downloads.dwg} download className="flex items-center gap-1 font-medium text-ink transition-colors hover:text-accent">
              <PencilRuler className="size-3.5 text-accent" />
              Teknik Çizimler (DWG)
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href={SITE.emailHref} className="transition-colors hover:text-accent">{SITE.email}</a>
            <a href={SITE.phoneHref} className="flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-accent">
              <Phone className="size-3.5" />
              {SITE.phoneDisplay}
            </a>
          </div>
        </Container>
      </div>

      {/* iletişim çubuğu — mobil/tablet, MENÜ KAPALIYKEN BİLE telefon görünür */}
      <div className="border-b border-line/70 bg-bg-subtle/60 lg:hidden">
        <Container className="flex h-9 items-center justify-between text-xs">
          <a href={SITE.phoneHref} className="flex items-center gap-1.5 font-semibold text-ink transition-colors hover:text-accent">
            <Phone className="size-3.5 text-accent" />
            {SITE.phoneDisplay}
          </a>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1.5 font-medium text-ink-soft transition-colors hover:text-[#25D366]"
          >
            <MessageCircle className="size-3.5 text-[#25D366]" />
            WhatsApp
          </a>
        </Container>
      </div>

      <Container className="relative flex h-16 items-center gap-6">
        <Wordmark />

        <nav className="hidden items-center gap-7 md:flex">
          <MegaMenu />
          <Link href="/kategoriler" className="text-sm text-ink-soft transition-colors hover:text-accent">
            {t("catalog")}
          </Link>
          <Link href="/calismalarimiz" className="text-sm text-ink-soft transition-colors hover:text-accent">
            Çalışmalar
          </Link>
          <Link href="/hizmetler" className="text-sm text-ink-soft transition-colors hover:text-accent">
            Hizmetler
          </Link>
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <CodeSearch className="w-52" />
          <ThemeToggle />
          <QuoteCartButton />
          <LocaleSwitcher />
          <Link href="/iletisim" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
            İletişim
          </Link>
          <Link href="/teklif" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
            {t("quote")}
          </Link>
        </div>

        {/* tablet (md only) */}
        <div className="ml-auto hidden items-center gap-2 md:flex lg:hidden">
          <ThemeToggle />
          <QuoteCartButton />
          <Link href="/teklif" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
            {t("quote")}
          </Link>
        </div>

        {/* mobile */}
        <div className="ml-auto flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <QuoteCartButton />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
