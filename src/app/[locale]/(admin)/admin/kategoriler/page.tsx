import type { ReactElement } from "react";
import { createClient } from "@/lib/supabase/server";
import { CategoriesManager } from "@/components/admin/CategoriesManager";

export const dynamic = "force-dynamic";

export default async function CategoriesPage(): Promise<ReactElement> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("parent_id", { nullsFirst: true })
    .order("sort_order");

  return <CategoriesManager categories={data ?? []} />;
}
