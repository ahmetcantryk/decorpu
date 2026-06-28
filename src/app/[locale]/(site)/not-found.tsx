import type { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Localized 404. */
export default function NotFound(): ReactElement {
  const t = useTranslations("Nav");

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-wide text-accent">404</p>
      <h1 className="mt-4 text-4xl">Sayfa bulunamadı · Page not found</h1>
      <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "md" }), "mt-8")}>
        {t("catalog")}
      </Link>
    </Container>
  );
}
