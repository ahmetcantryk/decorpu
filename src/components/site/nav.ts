export interface NavItem {
  /** Key under the `Nav` message namespace. */
  key: "categories" | "about" | "contact";
  href: string;
}

/** Faz 1: homepage section anchors (no 404s). Faz 2'de gerçek route'lara taşınır. */
export const NAV_ITEMS: readonly NavItem[] = [
  { key: "categories", href: "#kategoriler" },
  { key: "about", href: "#atolye" },
  { key: "contact", href: "#teklif" },
];
