"use client";

import { useState, useTransition, type FormEvent, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Plus, Minus, ClipboardCheck } from "lucide-react";
import { Dialog } from "@/components/admin/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/admin/form";
import { applyMovement, type MovementType } from "@/lib/stock/actions";
import { formatNumber } from "@/lib/format";

const META: Record<MovementType, { label: string; verb: string; reasonHint: string }> = {
  in: { label: "Stok Girişi", verb: "Giriş", reasonHint: "üretim / satın alma" },
  out: { label: "Stok Çıkışı", verb: "Çıkış", reasonHint: "sevkiyat / fire" },
  adjust: { label: "Sayım / Düzeltme", verb: "Sayım", reasonHint: "fiziksel sayım" },
};

interface Props {
  productId: string;
  productName: string;
  unit: string;
  currentQty: number;
}

/** Hızlı stok hareketi — Giriş / Çıkış / Sayım butonları + dialog formu. */
export function MovementDialog({ productId, productName, unit, currentQty }: Props): ReactElement {
  const router = useRouter();
  const [type, setType] = useState<MovementType | null>(null);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function open(t: MovementType): void {
    setError(null);
    setType(t);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!type) return;
    const fd = new FormData(e.currentTarget);
    const quantity = Number(fd.get("quantity"));
    start(async () => {
      const r = await applyMovement({
        productId,
        type,
        quantity,
        reason: fd.get("reason")?.toString() || null,
        note: fd.get("note")?.toString() || null,
      });
      if (r.ok) {
        setType(null);
        router.refresh();
      } else {
        setError(r.error);
      }
    });
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => open("in")}>
          <Plus className="size-4" /> Giriş
        </Button>
        <Button size="sm" variant="outline" onClick={() => open("out")}>
          <Minus className="size-4" /> Çıkış
        </Button>
        <Button size="sm" variant="outline" onClick={() => open("adjust")}>
          <ClipboardCheck className="size-4" /> Sayım
        </Button>
      </div>

      <Dialog
        open={type !== null}
        onOpenChange={(o) => !o && setType(null)}
        title={type ? META[type].label : ""}
        description={`${productName} · mevcut stok: ${formatNumber(currentQty)} ${unit}`}
      >
        {type ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <Field label={type === "adjust" ? `Yeni stok değeri (${unit})` : `Miktar (${unit})`}>
              <Input name="quantity" type="number" min="0" step="any" required autoFocus defaultValue="" />
            </Field>
            <Field label="Neden (opsiyonel)">
              <Input name="reason" placeholder={META[type].reasonHint} />
            </Field>
            <Field label="Not (opsiyonel)">
              <Textarea name="note" rows={2} />
            </Field>
            {error ? <p className="text-sm text-accent">{error}</p> : null}
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" onClick={() => setType(null)}>
                Vazgeç
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? "Kaydediliyor…" : `${META[type].verb} kaydet`}
              </Button>
            </div>
          </form>
        ) : null}
      </Dialog>
    </>
  );
}
