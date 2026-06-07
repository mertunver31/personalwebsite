import { profile } from "@/content/profile";

export const runtime = "nodejs";

// Basit IP başına hız sınırı (best-effort, instance belleğinde)
const hits = new Map<string, { c: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > 60_000) {
    hits.set(ip, { c: 1, t: now });
    return false;
  }
  rec.c += 1;
  return rec.c > 5;
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: { contact?: string; message?: string; company?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: bot doldurursa başarılı gibi davran, e-posta gönderme
  if (body.company) return Response.json({ ok: true });

  const contact = (body.contact || "").toString().trim().slice(0, 300);
  const message = (body.message || "").toString().trim().slice(0, 5000);
  if (!contact || !message) {
    return Response.json({ ok: false, error: "missing" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  if (!key) {
    // Henüz yapılandırılmadı — istemci mailto fallback gösterir
    return Response.json(
      { ok: false, error: "not_configured" },
      { status: 503 },
    );
  }

  const html = `
    <div style="font-family:sans-serif;line-height:1.6">
      <h2 style="margin:0 0 8px">Portföy sitesinden yeni mesaj</h2>
      <p><strong>İletişim:</strong> ${esc(contact)}</p>
      <p><strong>Mesaj:</strong></p>
      <p style="white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px">${esc(message)}</p>
      <p style="color:#888;font-size:12px">IP: ${esc(ip)}</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: "📨 Portföy — yeni mesaj",
        html,
        ...(isEmail(contact) ? { reply_to: contact } : {}),
      }),
    });
    if (!res.ok) {
      return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
