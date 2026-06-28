import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/** Browser-side Supabase client (anon key, RLS-protected).
 *  NEXT_PUBLIC_* must be accessed statically so Next inlines them into the client bundle. */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase ortam değişkenleri yapılandırılmamış");
  return createBrowserClient<Database>(url, key);
}
