import type { ReactNode, ReactElement } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

/** Admin/CMS shell — protected; redirects to /giris when not signed in. */
export default async function AdminLayout({ children }: { children: ReactNode }): Promise<ReactElement> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  // Okunmamış (yeni) talep sayısı — menü rozetinde gösterilir.
  const { count } = await supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new");
  const newLeads = count ?? 0;

  return (
    <div className="flex min-h-screen w-full bg-bg-subtle font-sans text-ink">
      <AdminSidebar email={user.email ?? ""} newLeads={newLeads} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminMobileNav newLeads={newLeads} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
