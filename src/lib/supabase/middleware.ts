import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "./types";

/**
 * Supabase oturumunu tazeler; admin yollarında oturum yoksa kullanıcıyı
 * `?next=<istenen-yol>` return URL parametresiyle girişe yönlendirir
 * (girişten sonra kaldığı sayfaya döner).
 */
export async function updateSession(request: NextRequest, response: NextResponse): Promise<NextResponse> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return response;

  const supabase = createServerClient<Database>(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Oturuma dokun: süresi geçmiş token tazelenir (cookie'ler yukarıda yazılır).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const { pathname, search } = request.nextUrl;
    const isEn = pathname === "/en" || pathname.startsWith("/en/");
    const login = new URL(isEn ? "/en/giris" : "/giris", request.url);
    login.searchParams.set("next", pathname + search);

    const redirect = NextResponse.redirect(login);
    // Tazelenen oturum cookie'leri yönlendirme yanıtında da korunur.
    for (const cookie of response.cookies.getAll()) {
      redirect.cookies.set(cookie);
    }
    return redirect;
  }

  return response;
}
