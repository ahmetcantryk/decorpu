"use client";

import { useState, useEffect, useTransition, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Mail, Phone, Building2, Eye, Package, Loader2 } from "lucide-react";
import { Select } from "./ui/Select";
import { Dialog } from "./ui/Dialog";
import { ConfirmDelete } from "./ui/ConfirmDelete";
import { updateLeadStatus, deleteLead } from "@/lib/admin/actions";
import { fetchLeadProducts, type LeadProduct } from "@/lib/admin/lead-products";
import type { Lead } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

const STATUS: { value: string; label: string; cls: string }[] = [
  { value: "new", label: "Yeni", cls: "bg-accent/10 text-accent" },
  { value: "contacted", label: "Görüşüldü", cls: "bg-amber-100 text-amber-700" },
  { value: "quoted", label: "Teklif verildi", cls: "bg-blue-100 text-blue-700" },
  { value: "won", label: "Kazanıldı", cls: "bg-green-100 text-green-700" },
  { value: "lost", label: "Kaybedildi", cls: "bg-bg-subtle text-muted" },
];
const KIND_TR: Record<string, string> = { rfq: "Teklif", contact: "İletişim" };

function fmt(iso: string): string {
  return new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

function StatusBadge({ status }: { status: string }): ReactElement {
  const st = STATUS.find((s) => s.value === status);
  return <span className={cn("whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium", st?.cls ?? "bg-bg-subtle text-muted")}>{st?.label ?? status}</span>;
}

/** Talepteki ürünleri görsel + ad + adet ile listeler (dialog içinde). */
function LeadProducts({ codes }: { codes: string[] }): ReactElement {
  const [rows, setRows] = useState<LeadProduct[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetchLeadProducts(codes).then((r) => {
      if (alive) setRows(r);
    });
    return () => {
      alive = false;
    };
  }, [codes]);

  if (!rows) {
    return (
      <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted">
        <Loader2 className="size-4 animate-spin text-accent" /> Yükleniyor…
      </div>
    );
  }

  const totalQty = rows.reduce((n, r) => n + r.qty, 0);

  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
        İstenen ürünler — {rows.length} model · toplam {totalQty} adet
      </p>
      <ul className="max-h-72 divide-y divide-line overflow-y-auto rounded-lg border border-line">
        {rows.map((p) => (
          <li key={p.code} className="flex items-center gap-3 p-2.5">
            <span className="relative size-11 shrink-0 overflow-hidden rounded-md border border-line bg-bg-subtle">
              <Image src={p.image ?? "/placeholder.svg"} alt="" fill sizes="44px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-xs text-accent">{p.code}</span>
              <span className="block truncate text-sm text-ink">{p.name ?? "—"}</span>
            </span>
            <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold tabular-nums text-accent">
              {p.qty} adet
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusSelect({ lead, className }: { lead: Lead; className?: string }): ReactElement {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <div className={cn("w-40", pending && "opacity-60", className)}>
      <Select
        value={lead.status}
        options={STATUS.map((s) => ({ value: s.value, label: s.label }))}
        onValueChange={(v) =>
          start(async () => {
            await updateLeadStatus(lead.id, v);
            router.refresh();
          })
        }
      />
    </div>
  );
}

export function LeadsManager({ leads }: { leads: Lead[] }): ReactElement {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [status, setStatus] = useState("all");
  const [detailId, setDetailId] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const filtered = leads.filter((l) => {
    if (kind !== "all" && l.kind !== kind) return false;
    if (status !== "all" && l.status !== status) return false;
    if (q) {
      const hay = [l.full_name, l.company, l.email, l.phone, l.message, (l.product_codes ?? []).join(" ")].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // Dialog verisini leads prop'undan türet — durum güncellenince (router.refresh) taze kalır.
  const detail = detailId ? leads.find((l) => l.id === detailId) ?? null : null;

  const kindOptions = [
    { value: "all", label: "Tüm türler" },
    { value: "contact", label: "İletişim" },
    { value: "rfq", label: "Teklif Talebi" },
  ];
  const statusOptions = [{ value: "all", label: "Tüm durumlar" }, ...STATUS.map((s) => ({ value: s.value, label: s.label }))];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Talepler</h1>

      {/* filtreler */}
      <div className="space-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2 sm:space-y-0">
        <div className="flex h-11 items-center gap-2 rounded-md border border-line bg-surface px-3 sm:h-10 sm:min-w-56 sm:flex-1">
          <Search className="size-4 shrink-0 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="İsim, firma, e-posta, kod ara…"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted/70 sm:text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <div className="sm:w-44">
            <Select options={kindOptions} value={kind} onValueChange={setKind} />
          </div>
          <div className="sm:w-44">
            <Select options={statusOptions} value={status} onValueChange={setStatus} />
          </div>
        </div>
      </div>

      {/* Masaüstü: tablo */}
      <div className="hidden overflow-hidden rounded-lg border border-line bg-surface md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Tarih</th>
              <th className="px-4 py-3 font-medium">Ad Soyad</th>
              <th className="px-4 py-3 font-medium">Telefon</th>
              <th className="px-4 py-3 font-medium">Tür</th>
              <th className="px-4 py-3 font-medium">Ürün</th>
              <th className="px-4 py-3 font-medium">Durum</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-bg-subtle/50">
                <td className="whitespace-nowrap px-4 py-2.5 text-xs text-muted">{fmt(l.created_at)}</td>
                <td className="px-4 py-2.5">
                  <button type="button" onClick={() => setDetailId(l.id)} className="font-medium text-ink transition-colors hover:text-accent">
                    {l.full_name ?? "—"}
                  </button>
                  {l.company ? <span className="block text-xs text-muted">{l.company}</span> : null}
                </td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  {l.phone ? (
                    <a href={`tel:${l.phone}`} className="tabular-nums text-ink-soft transition-colors hover:text-accent">{l.phone}</a>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  <span className="rounded-sm bg-bg-subtle px-1.5 py-0.5 text-[11px] text-muted">{KIND_TR[l.kind] ?? l.kind}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-xs">
                  {l.product_codes?.length ? (
                    <button
                      type="button"
                      onClick={() => setDetailId(l.id)}
                      className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 font-medium text-accent transition-colors hover:bg-accent/20"
                    >
                      <Package className="size-3.5" />
                      {l.product_codes.length} ürün
                    </button>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  <StatusSelect lead={l} className="w-36" />
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setDetailId(l.id)}
                      aria-label="Detay"
                      className="flex size-8 items-center justify-center rounded-md text-muted hover:bg-bg hover:text-ink"
                    >
                      <Eye className="size-4" />
                    </button>
                    <ConfirmDelete
                      onConfirm={() => deleteLead(l.id)}
                      title="Talep silinsin mi?"
                      description={`${l.full_name ?? "Bu talep"} kalıcı olarak silinecek.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">
                  {query || kind !== "all" || status !== "all" ? "Sonuç bulunamadı." : "Henüz talep yok."}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {/* Mobil: kompakt satır kartları */}
      <ul className="space-y-2 md:hidden">
        {filtered.map((l) => (
          <li key={l.id}>
            <button
              type="button"
              onClick={() => setDetailId(l.id)}
              className="w-full rounded-xl border border-line bg-surface p-3 text-left"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate font-medium text-ink">{l.full_name ?? "—"}</span>
                <StatusBadge status={l.status} />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
                <span>{fmt(l.created_at)}</span>
                <span>{KIND_TR[l.kind] ?? l.kind}</span>
                {l.phone ? <span className="tabular-nums">{l.phone}</span> : null}
                {l.product_codes?.length ? (
                  <span className="inline-flex items-center gap-1"><Package className="size-3.5" />{l.product_codes.length} ürün</span>
                ) : null}
              </div>
            </button>
          </li>
        ))}
        {!filtered.length ? (
          <li className="rounded-xl border border-dashed border-line py-10 text-center text-sm text-muted">
            {query || kind !== "all" || status !== "all" ? "Sonuç bulunamadı." : "Henüz talep yok."}
          </li>
        ) : null}
      </ul>

      {/* Detay dialog */}
      <Dialog
        open={detail !== null}
        onOpenChange={(o) => !o && setDetailId(null)}
        title={detail?.full_name ?? "Talep"}
        description={detail ? `${KIND_TR[detail.kind] ?? detail.kind} · ${fmt(detail.created_at)}` : undefined}
      >
        {detail ? (
          <div className="space-y-4">
            <div className="grid gap-2 text-sm">
              {detail.phone ? (
                <a href={`tel:${detail.phone}`} className="inline-flex items-center gap-2 font-medium text-ink hover:text-accent">
                  <Phone className="size-4 text-accent" />
                  {detail.phone}
                </a>
              ) : null}
              {detail.email ? (
                <a href={`mailto:${detail.email}`} className="inline-flex items-center gap-2 text-ink-soft hover:text-accent">
                  <Mail className="size-4 shrink-0 text-accent" />
                  <span className="break-all">{detail.email}</span>
                </a>
              ) : null}
              {detail.company ? (
                <span className="inline-flex items-center gap-2 text-ink-soft">
                  <Building2 className="size-4 text-accent" />
                  {detail.company}
                </span>
              ) : null}
            </div>

            {detail.message ? (
              <div className="rounded-lg border border-line bg-bg-subtle/50 p-3 text-sm leading-relaxed text-ink-soft">{detail.message}</div>
            ) : null}

            {detail.product_codes?.length ? <LeadProducts codes={detail.product_codes} /> : null}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Durum:</span>
                <StatusSelect lead={detail} />
              </div>
              <ConfirmDelete
                onConfirm={async () => {
                  const r = await deleteLead(detail.id);
                  if (r.ok) setDetailId(null);
                  return r;
                }}
                title="Talep silinsin mi?"
                description={`${detail.full_name ?? "Bu talep"} kalıcı olarak silinecek.`}
              />
            </div>
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}
