import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: "middleware" yerine "proxy" dosya konvansiyonu
export default createMiddleware(routing);

export const config = {
  // api, _next, _vercel ve dosya uzantılı istekler hariç tümünü eşleştir
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
