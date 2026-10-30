import type { ReactElement } from "react";
import { createClient } from "@/lib/supabase/server";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import type { AdminProject } from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function ProjectsAdminPage(): Promise<ReactElement> {
  const supabase = await createClient();
  const [{ data: projects }, { data: products }] = await Promise.all([
    supabase
      .from("projects")
      .select("*, project_products(product_id), project_images(url,sort_order)")
      .order("sort_order"),
    supabase.from("products").select("id,code,name_tr").order("code"),
  ]);

  const rows: AdminProject[] = (projects ?? []).map((p) => {
    const { project_products: links, project_images: imgs, ...rest } = p;
    const gallery = (imgs ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((i) => i.url);
    return { ...rest, productIds: (links ?? []).map((l) => l.product_id), gallery };
  });

  return <ProjectsManager projects={rows} products={products ?? []} />;
}
