"use client";

import type { ReactElement } from "react";
import Image from "next/image";
import { Pencil, ImageOff } from "lucide-react";
import { ConfirmDelete } from "./ui/ConfirmDelete";
import type { ActionResult } from "@/lib/admin/actions";
import { cn } from "@/lib/utils";

export interface ContentRow {
  id: string;
  title: string;
  slug: string;
  image: string | null;
  is_active: boolean;
  sort_order: number;
  meta?: string | null;
}

interface ContentListProps {
  rows: ContentRow[];
  emptyText: string;
  deleteTitle: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<ActionResult>;
}

const iconBtn = "flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-bg hover:text-ink";

/** Hizmet / çalışma listesi — görsel, başlık, slug, durum, sıra. */
export function ContentList({ rows, emptyText, deleteTitle, onEdit, onDelete }: ContentListProps): ReactElement {
  if (!rows.length) {
    return <p className="rounded-lg border border-line bg-surface px-4 py-10 text-center text-muted">{emptyText}</p>;
  }
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
      {rows.map((r) => (
        <li key={r.id} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-bg-subtle">
          <div className="flex min-w-0 items-center gap-3">
            {r.image ? (
              <span className="relative size-12 shrink-0 overflow-hidden rounded border border-line bg-bg">
                <Image src={r.image} alt="" fill sizes="48px" className="object-cover" unoptimized />
              </span>
            ) : (
              <span className="flex size-12 shrink-0 items-center justify-center rounded border border-dashed border-line text-muted">
                <ImageOff className="size-4" />
              </span>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="truncate font-medium">{r.title}</span>
                {!r.is_active ? (
                  <span className="rounded-full bg-bg-subtle px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
                    Pasif
                  </span>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="font-mono">{r.slug}</span>
                <span>· sıra {r.sort_order}</span>
                {r.meta ? <span>· {r.meta}</span> : null}
              </div>
            </div>
          </div>
          <div className={cn("flex shrink-0 items-center gap-1")}>
            <button onClick={() => onEdit(r.id)} aria-label="Düzenle" className={iconBtn}>
              <Pencil className="size-4" />
            </button>
            <ConfirmDelete onConfirm={() => onDelete(r.id)} title={deleteTitle} description={`"${r.title}" silinecek. Bu işlem geri alınamaz.`} />
          </div>
        </li>
      ))}
    </ul>
  );
}
