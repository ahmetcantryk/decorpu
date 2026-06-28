import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";

/** Next.js 16 renamed `middleware.ts` -> `proxy.ts`. next-intl locale routing +
 *  Supabase session refresh ONLY on admin paths (public sayfalarda gereksiz ağ
 *  çağrısı her isteği yavaşlatıyordu — bkz. proxy.ts: 25s). */
const intlMiddleware = createMiddleware(routing);
const ADMIN = /^\/(?:tr|en)?\/?admin(?:\/|$)/;

export default async function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  if (ADMIN.test(request.nextUrl.pathname)) {
    return updateSession(request, response);
  }
  return response;
}

export const config = {
  // Match all paths except API, Next internals, and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
