import type { ReactElement } from "react";
import Link from "next/link";
import { Package, FolderTree, Inbox, CheckCircle2, Wallet, Trophy } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DashboardCharts } from "@/components/admin/DashboardCharts";

export const dynamic = "force-dynamic";

const STATUS_DEF: [string, string, string][] = [
  ["new", "Yeni", "#f77300"],
  ["contacted", "Görüşüldü", "#d97706"],
  ["quoted", "Teklif verildi", "#2563eb"],
  ["won", "Kazanıldı", "#16a34a"],
  ["lost", "Kaybedildi", "#9ca3af"],
];

export default async function AdminDashboard(): Promise<ReactElement> {
  const supabase = await createClient();
  const [{ data: products }, { count: catCount }, { data: leads }] = await Promise.all([
    supabase.from("products").select("id,price,is_active,category_id,categories(name_tr)"),
    supabase.from("categories").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id,status,kind,created_at"),
  ]);

  const prods = products ?? [];
  const lds = leads ?? [];
  const totalValue = prods.reduce((s, p) => s + (p.price ?? 0), 0);

  const catMap = new Map<string, number>();
  for (const p of prods) {
    const name = p.categories?.name_tr ?? "Kategorisiz";
    catMap.set(name, (catMap.get(name) ?? 0) + 1);
  }
  const byCategory = [...catMap.entries()].map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 8);

  const byStatus = STATUS_DEF.map(([v, label, color]) => ({ name: label, value: lds.filter((l) => l.status === v).length, color })).filter((s) => s.value > 0);

  const overTime: { date: string; value: number }[] = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    overTime.push({
      date: d.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" }),
      value: lds.filter((l) => l.created_at.slice(0, 10) === key).length,
    });
  }

  const stats = [
    { label: "Toplam ürün", value: prods.length, icon: Package, href: "/admin/urunler" },
    { label: "Aktif ürün", value: prods.filter((p) => p.is_active).length, icon: CheckCircle2, href: "/admin/urunler" },
    { label: "Kategori", value: catCount ?? 0, icon: FolderTree, href: "/admin/kategoriler" },
    { label: "Yeni talep", value: lds.filter((l) => l.status === "new").length, icon: Inbox, href: "/admin/talepler", accent: true },
    { label: "Kazanılan", value: lds.filter((l) => l.status === "won").length, icon: Trophy, href: "/admin/talepler" },
    { label: "Katalog değeri", value: `${totalValue.toLocaleString("tr-TR")} ₺`, icon: Wallet },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold tracking-tight">Panel</h1>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => {
          const inner = (
            <>
              <s.icon className={`size-5 ${s.accent ? "text-accent" : "text-muted"}`} />
              <div className="mt-3 text-2xl font-semibold tabular-nums">{s.value}</div>
              <div className="mt-0.5 text-xs text-muted">{s.label}</div>
            </>
          );
          return s.href ? (
            <Link key={s.label} href={s.href} className="rounded-lg border border-line bg-surface p-4 transition-colors hover:border-accent/50">
              {inner}
            </Link>
          ) : (
            <div key={s.label} className="rounded-lg border border-line bg-surface p-4">
              {inner}
            </div>
          );
        })}
      </div>

      <DashboardCharts byCategory={byCategory} byStatus={byStatus} overTime={overTime} />
    </div>
  );
}
