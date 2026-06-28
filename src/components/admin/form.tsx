import type { ReactNode, ReactElement, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const fieldCls =
  "w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent";

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }): ReactElement {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return <input {...props} className={cn(fieldCls, props.className)} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>): ReactElement {
  return <textarea {...props} className={cn(fieldCls, "min-h-24 resize-y", props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>): ReactElement {
  return <select {...props} className={cn(fieldCls, "appearance-none", props.className)} />;
}

export function Toggle({ name, defaultChecked, label }: { name: string; defaultChecked?: boolean; label: string }): ReactElement {
  return (
    <label className="flex items-center gap-2 text-sm text-ink-soft">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="size-4 accent-[var(--color-accent)]" />
      {label}
    </label>
  );
}
