"use client";

import * as RS from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { useState, type ReactElement } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name?: string;
  options: SelectOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  triggerClassName?: string;
}

/** Styled custom select (Radix) — fully themed dropdown, not the native one. */
export function Select({
  name,
  options,
  defaultValue,
  value,
  onValueChange,
  placeholder = "Seçiniz",
  triggerClassName,
}: SelectProps): ReactElement {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const val = value !== undefined ? value : internal;
  const set = (v: string): void => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  };
  const current = options.find((o) => o.value === val);

  return (
    <>
      {name ? <input type="hidden" name={name} value={val} /> : null}
      <RS.Root value={val || undefined} onValueChange={set}>
        <RS.Trigger
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none transition-colors focus:border-accent data-[placeholder]:text-muted",
            triggerClassName,
          )}
        >
          <RS.Value placeholder={placeholder}>{current?.label}</RS.Value>
          <RS.Icon>
            <ChevronDown className="size-4 text-muted" />
          </RS.Icon>
        </RS.Trigger>
        <RS.Portal>
          <RS.Content
            position="popper"
            sideOffset={4}
            className="z-[60] max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border border-line bg-surface shadow-pop data-[state=open]:animate-[fadeIn_120ms_ease-out]"
          >
            <RS.Viewport className="p-1">
              {options.map((o) => (
                <RS.Item
                  key={o.value}
                  value={o.value}
                  className="flex cursor-pointer select-none items-center justify-between gap-2 rounded-sm px-2.5 py-2 text-sm text-ink-soft outline-none data-[highlighted]:bg-accent/10 data-[highlighted]:text-accent data-[state=checked]:font-medium data-[state=checked]:text-ink"
                >
                  <RS.ItemText>{o.label}</RS.ItemText>
                  <RS.ItemIndicator>
                    <Check className="size-4 text-accent" />
                  </RS.ItemIndicator>
                </RS.Item>
              ))}
            </RS.Viewport>
          </RS.Content>
        </RS.Portal>
      </RS.Root>
    </>
  );
}
