"use client";

import { useState, type FormEvent, type ReactElement } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface CodeSearchProps {
  className?: string;
  size?: "sm" | "lg";
  autoFocus?: boolean;
}

/** Persistent product-code search. Faz 2'de pg_trgm RPC'ye bağlanacak; şimdilik /ara'ya yönlendirir. */
export function CodeSearch({ className, size = "sm", autoFocus }: CodeSearchProps): ReactElement {
  const t = useTranslations("Search");
  const router = useRouter();
  const [value, setValue] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const query = value.trim();
    if (query) router.push(`/ara?q=${encodeURIComponent(query)}`);
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn(
        "group flex items-center gap-2.5 rounded-sm border border-line bg-surface transition-colors focus-within:border-ink",
        size === "lg" ? "h-13 px-4" : "h-10 px-3",
        className,
      )}
    >
      <Search
        className={cn("shrink-0 text-muted transition-colors group-focus-within:text-ink", size === "lg" ? "size-5" : "size-4")}
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("placeholder")}
        aria-label={t("label")}
        autoFocus={autoFocus}
        className={cn(
          "w-full bg-transparent font-mono uppercase tracking-wide text-ink outline-none placeholder:normal-case placeholder:tracking-normal placeholder:text-muted/70",
          size === "lg" ? "text-base" : "text-sm",
        )}
      />
    </form>
  );
}
