"use client";

import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Dialog } from "./ui/Dialog";
import { ContentList } from "./ContentList";
import { ServiceForm, type AdminService } from "./ServiceForm";
import type { PickerProduct } from "./ProductPicker";
import { buttonVariants } from "@/components/ui/Button";
import { deleteService } from "@/lib/admin/services-actions";
import { cn } from "@/lib/utils";

export function ServicesManager({ services, products }: { services: AdminService[]; products: PickerProduct[] }): ReactElement {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminService | null>(null);

  function openNew(): void {
    setEditing(null);
    setOpen(true);
  }
  function openEdit(id: string): void {
    setEditing(services.find((s) => s.id === id) ?? null);
    setOpen(true);
  }
  function onSaved(): void {
    setOpen(false);
    router.refresh();
  }

  const rows = services.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    image: s.image_url,
    is_active: s.is_active,
    sort_order: s.sort_order,
    meta: `${s.productIds.length} ürün`,
  }));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">Hizmetler</h1>
        <button onClick={openNew} className={cn(buttonVariants({ size: "sm" }))}>
          <Plus className="size-4" /> Yeni Hizmet
        </button>
      </div>

      <ContentList
        rows={rows}
        emptyText="Henüz hizmet yok."
        deleteTitle="Hizmet silinsin mi?"
        onEdit={openEdit}
        onDelete={deleteService}
      />

      <Dialog open={open} onOpenChange={setOpen} title={editing ? "Hizmeti Düzenle" : "Yeni Hizmet"}>
        <ServiceForm key={editing?.id ?? "new"} service={editing} products={products} onDone={onSaved} />
      </Dialog>
    </div>
  );
}
