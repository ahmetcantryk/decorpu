"use client";

import { useState, useTransition, type FormEvent, type ReactElement } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitRfq } from "@/lib/rfq/actions";
import { Button } from "@/components/ui/Button";
import { HoneypotField } from "@/components/site/HoneypotField";
import { cn } from "@/lib/utils";

const field = "w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

interface ContactFormProps {
  source?: string;
  compact?: boolean;
}

/** Ürün seçmeden basit teklif/iletişim formu. */
export function ContactForm({ source = "iletisim", compact = false }: ContactFormProps): ReactElement {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    start(async () => {
      const r = await submitRfq({
        full_name: fd.get("full_name"),
        phone: fd.get("phone"),
        message: fd.get("message"),
        hp: fd.get("website"),
        product_codes: [],
        kind: "contact",
      });
      if (r.ok) setDone(true);
      else setError(r.error);
    });
  }

  if (done) {
    return (
      <div className="rounded-xl border border-line bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-accent" />
        <h3 className="mt-3 text-xl font-semibold">Mesajınız alındı</h3>
        <p className="mt-2 text-sm text-muted">En kısa sürede sizinle iletişime geçeceğiz.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-3 rounded-xl border border-line bg-surface", compact ? "p-5" : "p-6")}>
      {!compact ? <h2 className="text-lg font-semibold">Hızlı Teklif / İletişim</h2> : null}
      <p className="text-sm text-muted">Ürün seçmeden de formu doldurarak teklif alabilirsiniz.</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input name="full_name" required placeholder="Ad Soyad *" className={field} />
        <input name="phone" type="tel" required placeholder="Telefon *" className={field} />
      </div>
      <textarea name="message" placeholder="Notunuz / projeniz" className={cn(field, "min-h-28 resize-y")} />
      <HoneypotField />
      <input type="hidden" name="source" value={source} />
      {error ? <p className="text-sm text-accent">{error}</p> : null}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Gönderiliyor…" : "Gönder"}
      </Button>
    </form>
  );
}
