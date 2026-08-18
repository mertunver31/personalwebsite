import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16: "middleware" yerine "proxy" dosya konvansiyonu
export default createMiddleware(routing);

export const config = {
  // api, _next, _vercel, metadata rotaları, etsyfontype, vesper ve dosya
  // uzantılı istekler hariç tümü. `vesper` dışarıda: Play Console'a verilen
  // gizlilik politikası adresi dil öneki almadan sabit kalmalı.
  matcher:
    "/((?!api|trpc|etsyfontype|vesper|_next|_vercel|opengraph-image|twitter-image|icon|sitemap|robots|manifest|.*\\..*).*)",
};
