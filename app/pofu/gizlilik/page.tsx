import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { PolicyView } from "../PolicyView";
import { POLICY_TR } from "../policy-content";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pofu — Gizlilik Politikası",
  description:
    "Pofu pomodoro uygulamasının gizlilik politikası. Uygulama hiçbir kişisel veri toplamaz; tüm veriler yalnızca cihazında kalır.",
  alternates: {
    canonical: "/pofu/gizlilik",
    languages: { tr: "/pofu/gizlilik", en: "/pofu/privacy" },
  },
  robots: { index: true, follow: true },
};

export default function PofuGizlilikPage() {
  return <PolicyView doc={POLICY_TR} />;
}
