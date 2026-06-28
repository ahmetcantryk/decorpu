import { defineRouting } from "next-intl/routing";

/** TR is the default (no prefix); EN is served under /en. */
export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
