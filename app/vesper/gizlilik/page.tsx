import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { PolicyView } from "../PolicyView";
import { POLICY_TR } from "../policy-content";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vesper — Gizlilik Politikası",
  description:
    "Vesper pomodoro uygulamasının gizlilik politikası. Uygulama hiçbir kişisel veri toplamaz; tüm veriler yalnızca cihazında kalır.",
  alternates: {
    canonical: "/vesper/gizlilik",
    languages: { tr: "/vesper/gizlilik", en: "/vesper/privacy" },
  },
  robots: { index: true, follow: true },
};

export default function VesperGizlilikPage() {
  return <PolicyView doc={POLICY_TR} />;
}
