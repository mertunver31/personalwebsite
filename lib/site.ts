// Site temel URL'i — Vercel'de NEXT_PUBLIC_SITE_URL ayarla (sonunda / olmadan)
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";
