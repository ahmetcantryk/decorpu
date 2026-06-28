import type { ReactElement } from "react";
import { createClient } from "@/lib/supabase/server";
import { ProductsManager, type AdminProduct } from "@/components/admin/ProductsManager";

export const dynamic = "force-dynamic";

export default async function ProductsPage(): Promise<ReactElement> {
  const supabase = await createClient();
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("*, categories(name_tr), product_images(url,is_primary)")
      .order("created_at", { ascending: false }),
    supabase
      .from("categories")
      .select("id,name_tr,parent_id,sort_order")
      .order("parent_id", { nullsFirst: true })
      .order("sort_order"),
  ]);

  const rows: AdminProduct[] = (products ?? []).map((p) => {
    const { categories: cat, product_images: imgs, ...rest } = p;
    const image = imgs?.find((i) => i.is_primary)?.url ?? imgs?.[0]?.url ?? null;
    return { ...rest, categoryName: cat?.name_tr ?? null, image };
  });

  return <ProductsManager products={rows} categories={categories ?? []} />;
}
