"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RfqItem {
  code: string;
  name: string;
  image: string | null;
  qty: number;
}

interface RfqState {
  items: RfqItem[];
  add: (item: Omit<RfqItem, "qty">) => void;
  remove: (code: string) => void;
  setQty: (code: string, qty: number) => void;
  clear: () => void;
  has: (code: string) => boolean;
  count: () => number;
}

/** Quote cart (teklif sepeti) — persisted to localStorage. */
export const useRfq = create<RfqState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) => (s.items.some((i) => i.code === item.code) ? s : { items: [...s.items, { ...item, qty: 1 }] })),
      remove: (code) => set((s) => ({ items: s.items.filter((i) => i.code !== code) })),
      setQty: (code, qty) =>
        set((s) => ({ items: s.items.map((i) => (i.code === code ? { ...i, qty: Math.max(1, qty) } : i)) })),
      clear: () => set({ items: [] }),
      has: (code) => get().items.some((i) => i.code === code),
      count: () => get().items.length,
    }),
    { name: "decorpu-rfq" },
  ),
);
