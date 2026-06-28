"use client";

import * as AD from "@radix-ui/react-alert-dialog";
import { useState, useTransition, type ReactNode, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { ActionResult } from "@/lib/admin/actions";

interface ConfirmDeleteProps {
  onConfirm: () => Promise<ActionResult>;
  title?: string;
  description?: string;
  trigger?: ReactNode;
}

export function ConfirmDelete({
  onConfirm,
  title = "Silinsin mi?",
  description = "Bu işlem geri alınamaz.",
  trigger,
}: ConfirmDeleteProps): ReactElement {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function confirm(): void {
    setError(null);
    start(async () => {
      const r = await onConfirm();
      if (r.ok) {
        setOpen(false);
        router.refresh();
      } else {
        setError(r.error);
      }
    });
  }

  return (
    <AD.Root open={open} onOpenChange={setOpen}>
      <AD.Trigger asChild>
        {trigger ?? (
          <button
            type="button"
            aria-label="Sil"
            className="flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <Trash2 className="size-4" />
          </button>
        )}
      </AD.Trigger>
      <AD.Portal>
        <AD.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] data-[state=open]:animate-[fadeIn_120ms_ease-out]" />
        <AD.Content className="fixed left-1/2 top-1/2 z-50 w-[min(420px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-surface p-6 shadow-pop data-[state=open]:animate-[fadeIn_140ms_ease-out]">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Trash2 className="size-4" />
            </span>
            <div>
              <AD.Title className="text-base font-semibold">{title}</AD.Title>
              <AD.Description className="mt-1 text-sm text-muted">{description}</AD.Description>
            </div>
          </div>
          {error ? <p className="mt-3 text-sm text-accent">{error}</p> : null}
          <div className="mt-5 flex justify-end gap-2">
            <AD.Cancel className="rounded-md border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-bg-subtle">
              Vazgeç
            </AD.Cancel>
            <button
              type="button"
              onClick={confirm}
              disabled={pending}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-strong disabled:opacity-50"
            >
              {pending ? "Siliniyor…" : "Sil"}
            </button>
          </div>
        </AD.Content>
      </AD.Portal>
    </AD.Root>
  );
}
