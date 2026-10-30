"use client";

import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Dialog } from "./ui/Dialog";
import { ContentList } from "./ContentList";
import { ProjectForm, type AdminProject } from "./ProjectForm";
import type { PickerProduct } from "./ProductPicker";
import { buttonVariants } from "@/components/ui/Button";
import { deleteProject } from "@/lib/admin/projects-actions";
import { cn } from "@/lib/utils";

export function ProjectsManager({ projects, products }: { projects: AdminProject[]; products: PickerProduct[] }): ReactElement {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProject | null>(null);

  function openNew(): void {
    setEditing(null);
    setOpen(true);
  }
  function openEdit(id: string): void {
    setEditing(projects.find((p) => p.id === id) ?? null);
    setOpen(true);
  }
  function onSaved(): void {
    setOpen(false);
    router.refresh();
  }

  const rows = projects.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    image: p.cover_url ?? p.gallery[0] ?? null,
    is_active: p.is_active,
    sort_order: p.sort_order,
    meta: [p.location, p.year, `${p.gallery.length} görsel`].filter(Boolean).join(" · "),
  }));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Çalışmalarımız</h1>
        <button onClick={openNew} className={cn(buttonVariants({ size: "sm" }))}>
          <Plus className="size-4" /> Yeni Çalışma
        </button>
      </div>

      <ContentList
        rows={rows}
        emptyText="Henüz çalışma yok."
        deleteTitle="Çalışma silinsin mi?"
        onEdit={openEdit}
        onDelete={deleteProject}
      />

      <Dialog open={open} onOpenChange={setOpen} title={editing ? "Çalışmayı Düzenle" : "Yeni Çalışma"}>
        <ProjectForm key={editing?.id ?? "new"} project={editing} products={products} onDone={onSaved} />
      </Dialog>
    </div>
  );
}
