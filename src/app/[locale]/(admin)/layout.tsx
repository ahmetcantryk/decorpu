import type { ReactNode, ReactElement } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

/** Admin/CMS shell — protected; redirects to /giris when not signed in. */
export default async function AdminLayout({ children }: { children: ReactNode }): Promise<ReactElement> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/giris");

  return (
    <div className="flex min-h-screen w-full bg-bg-subtle font-sans text-ink">
      <AdminSidebar email={user.email ?? ""} />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
