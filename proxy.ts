import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: "middleware" yerine "proxy" dosya konvansiyonu
export default createMiddleware(routing);

export const config = {
  // api, _next, _vercel, metadata rotaları ve dosya uzantılı istekler hariç tümü
  matcher:
    "/((?!api|trpc|_next|_vercel|opengraph-image|twitter-image|icon|sitemap|robots|manifest|.*\\..*).*)",
};
