import type { ReactElement } from "react";
import { createClient } from "@/lib/supabase/server";
import { ServicesManager } from "@/components/admin/ServicesManager";
import type { AdminService } from "@/components/admin/ServiceForm";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage(): Promise<ReactElement> {
  const supabase = await createClient();
  const [{ data: services }, { data: products }] = await Promise.all([
    supabase.from("services").select("*, service_products(product_id)").order("sort_order"),
    supabase.from("products").select("id,code,name_tr").order("code"),
  ]);

  const rows: AdminService[] = (services ?? []).map((s) => {
    const { service_products: links, ...rest } = s;
    return { ...rest, productIds: (links ?? []).map((l) => l.product_id) };
  });

  return <ServicesManager services={rows} products={products ?? []} />;
}
