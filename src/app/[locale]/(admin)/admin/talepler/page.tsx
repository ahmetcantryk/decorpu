import type { ReactElement } from "react";
import { createClient } from "@/lib/supabase/server";
import { LeadsManager } from "@/components/admin/LeadsManager";

export const dynamic = "force-dynamic";

export default async function LeadsPage(): Promise<ReactElement> {
  const supabase = await createClient();
  const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  return <LeadsManager leads={data ?? []} />;
}
