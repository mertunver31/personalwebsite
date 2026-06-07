import type { Metadata } from "next";
import {
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
  Rye,
  Special_Elite,
} from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { profile } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";
import { Background } from "@/components/Background";
import { ClientWidgets } from "@/components/ClientWidgets";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const western = Rye({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-western",
});
const typewriter = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-typewriter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const title = `${profile.name} — ${pick(profile.role, l)}`;
  const description = pick(profile.tagline, l);
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: `/${l}`,
      languages: { tr: "/tr", en: "/en" },
    },
    openGraph: {
      title,
      description,
      siteName: profile.name,
      type: "website",
      url: `/${l}`,
      locale: l === "tr" ? "tr_TR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${display.variable} ${mono.variable} ${western.variable} ${typewriter.variable} h-full`}
    >
      <body className="relative min-h-full">
        <NextIntlClientProvider>
          <Background />
          <ClientWidgets />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
