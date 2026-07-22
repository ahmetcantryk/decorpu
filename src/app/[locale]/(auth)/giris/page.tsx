import type { ReactElement } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { sanitizeNextPath } from "@/lib/admin/next-url";
import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function GirisPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}): Promise<ReactElement> {
  const { next } = await searchParams;
  const target = sanitizeNextPath(next);

  // Oturum zaten açıksa doğrudan hedefe dön.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect(target);

  return <LoginForm next={target} />;
}
