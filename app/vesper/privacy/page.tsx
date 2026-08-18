import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { PolicyView } from "../PolicyView";
import { POLICY_EN } from "../policy-content";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vesper — Privacy Policy",
  description:
    "Privacy policy for the Vesper pomodoro app. The app collects no personal data; everything stays on your device.",
  alternates: {
    canonical: "/vesper/privacy",
    languages: { tr: "/vesper/gizlilik", en: "/vesper/privacy" },
  },
  robots: { index: true, follow: true },
};

export default function VesperPrivacyPage() {
  return <PolicyView doc={POLICY_EN} />;
}
