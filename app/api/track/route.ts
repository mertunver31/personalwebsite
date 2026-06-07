export const runtime = "nodejs";

// Ziyaretçi izleme: IP/konum/cihaz bilgisini Telegram'a bildirir.
// Anahtarlar yalnızca sunucuda (env): TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
// İstemciye hiçbir şey sızmaz; arayüzde görünmez.

export async function POST(req: Request) {
  const h = req.headers;
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "?";
  const ua = h.get("user-agent") || "?";

  // Vercel coğrafi başlıkları (üretimde otomatik gelir)
  const country = h.get("x-vercel-ip-country") || "";
  const region = h.get("x-vercel-ip-country-region") || "";
  const cityRaw = h.get("x-vercel-ip-city") || "";
  const city = cityRaw ? decodeURIComponent(cityRaw) : "";

  let body: { path?: string; lang?: string; ref?: string; screen?: string } = {};
  try {
    body = await req.json();
  } catch {
    /* boş */
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return new Response(null, { status: 204 });

  const loc = [city, region, country].filter(Boolean).join(", ") || "bilinmiyor";
  const when = new Date().toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
  });

  const text =
    `🔔 Yeni ziyaret\n` +
    `🌍 IP: ${ip}\n` +
    `📍 Konum: ${loc}\n` +
    `📄 Sayfa: ${body.path || "?"}\n` +
    `🗣 Dil: ${body.lang || "?"}\n` +
    `🖥 Ekran: ${body.screen || "?"}\n` +
    `🔗 Referrer: ${body.ref || "-"}\n` +
    `💻 ${ua}\n` +
    `🕒 ${when}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chat,
        text,
        disable_web_page_preview: true,
      }),
    });
  } catch {
    /* bildirim başarısızsa sessizce geç */
  }

  return new Response(null, { status: 204 });
}
