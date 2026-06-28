"use client";

import { useState, useTransition, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Search, Mail, Phone, Building2 } from "lucide-react";
import { Select } from "./ui/Select";
import { ConfirmDelete } from "./ui/ConfirmDelete";
import { updateLeadStatus, deleteLead } from "@/lib/admin/actions";
import type { Lead } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

const STATUS: { value: string; label: string; cls: string }[] = [
  { value: "new", label: "Yeni", cls: "bg-accent/10 text-accent" },
  { value: "contacted", label: "Görüşüldü", cls: "bg-amber-100 text-amber-700" },
  { value: "quoted", label: "Teklif verildi", cls: "bg-blue-100 text-blue-700" },
  { value: "won", label: "Kazanıldı", cls: "bg-green-100 text-green-700" },
  { value: "lost", label: "Kaybedildi", cls: "bg-bg-subtle text-muted" },
];
const KIND_TR: Record<string, string> = { rfq: "Teklif Talebi", contact: "İletişim" };

function fmt(iso: string): string {
  return new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function StatusSelect({ lead }: { lead: Lead }): ReactElement {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <div className={cn("w-44", pending && "opacity-60")}>
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

  const kindOptions = [
    { value: "all", label: "Tüm türler" },
    { value: "contact", label: "İletişim" },
    { value: "rfq", label: "Teklif Talebi" },
  ];
  const statusOptions = [{ value: "all", label: "Tüm durumlar" }, ...STATUS.map((s) => ({ value: s.value, label: s.label }))];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Talepler</h1>

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

      <div className="space-y-3">
        {filtered.map((l) => {
          const st = STATUS.find((s) => s.value === l.status);
          return (
            <article key={l.id} className="rounded-lg border border-line bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-medium">{l.full_name ?? "—"}</h2>
                    <span className={cn("rounded-full px-2 py-0.5 text-xs", st?.cls ?? "bg-bg-subtle text-muted")}>{st?.label ?? l.status}</span>
                    <span className="rounded-sm bg-bg-subtle px-1.5 py-0.5 text-[11px] text-muted">{KIND_TR[l.kind] ?? l.kind}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                    {l.company ? (<span className="inline-flex items-center gap-1"><Building2 className="size-3.5" />{l.company}</span>) : null}
                    {l.email ? (<span className="inline-flex max-w-full items-center gap-1"><Mail className="size-3.5 shrink-0" /><span className="break-all">{l.email}</span></span>) : null}
                    {l.phone ? (<span className="inline-flex items-center gap-1"><Phone className="size-3.5" />{l.phone}</span>) : null}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted">
                  {fmt(l.created_at)}
                  <ConfirmDelete
                    onConfirm={() => deleteLead(l.id)}
                    title="Talep silinsin mi?"
                    description={`${l.full_name ?? "Bu talep"} kalıcı olarak silinecek.`}
                  />
                </div>
              </div>

              {l.product_codes?.length ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {l.product_codes.map((c) => (
                    <span key={c} className="rounded-sm border border-line bg-bg-subtle px-2 py-0.5 font-mono text-xs">{c}</span>
                  ))}
                </div>
              ) : null}

              {l.message ? <p className="mt-3 text-sm text-ink-soft">{l.message}</p> : null}

              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs text-muted">Durum:</span>
                <StatusSelect lead={l} />
              </div>
            </article>
          );
        })}
        {!filtered.length ? (
          <p className="rounded-lg border border-line bg-surface px-4 py-10 text-center text-muted">
            {query || kind !== "all" || status !== "all" ? "Sonuç bulunamadı." : "Henüz talep yok."}
          </p>
        ) : null}
      </div>
    </div>
  );
}
