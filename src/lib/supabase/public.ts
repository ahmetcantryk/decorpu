import { createServerClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Cookie KULLANMAYAN, anon (RLS) salt-okunur public client.
 * Genel katalog okumalarında kullanılır; `cookies()` çağrılmadığı için route'lar
 * statik/ISR olarak cache'lenebilir (force-dynamic'e gerek kalmaz). Oturumsuz
 * davranış mevcut cookie'li client'ın anon davranışıyla birebir aynıdır.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase ortam değişkenleri yapılandırılmamış");

  return createServerClient<Database>(url, key, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
}
