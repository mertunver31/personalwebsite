import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import { PolicyView } from "../PolicyView";
import { POLICY_EN } from "../policy-content";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pofu — Privacy Policy",
  description:
    "Privacy policy for the Pofu pomodoro app. The app collects no personal data; everything stays on your device.",
  alternates: {
    canonical: "/pofu/privacy",
    languages: { tr: "/pofu/gizlilik", en: "/pofu/privacy" },
  },
  robots: { index: true, follow: true },
};

export default function PofuPrivacyPage() {
  return <PolicyView doc={POLICY_EN} />;
}
