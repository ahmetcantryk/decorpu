"use client";

import * as RD from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Dialog({ open, onOpenChange, title, description, children, className }: DialogProps): ReactElement {
  return (
    <RD.Root open={open} onOpenChange={onOpenChange}>
      <RD.Portal>
        <RD.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] data-[state=open]:animate-[fadeIn_120ms_ease-out]" />
        <RD.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[min(660px,94vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-line bg-surface p-6 shadow-pop data-[state=open]:animate-[fadeIn_140ms_ease-out]",
            className,
          )}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <RD.Title className="text-lg font-semibold tracking-tight">{title}</RD.Title>
              {description ? <RD.Description className="mt-0.5 text-sm text-muted">{description}</RD.Description> : null}
            </div>
            <RD.Close className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-bg-subtle hover:text-ink">
              <X className="size-4" />
            </RD.Close>
          </div>
          {children}
        </RD.Content>
      </RD.Portal>
    </RD.Root>
  );
}
