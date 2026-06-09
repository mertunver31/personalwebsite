import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/i18n";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";

import { LazySection } from "@/components/LazySection";

const Skills = dynamic(() => import("@/components/Skills").then((m) => m.Skills));
const Projects = dynamic(() => import("@/components/Projects").then((m) => m.Projects));
const Experience = dynamic(() => import("@/components/Experience").then((m) => m.Experience));
const Contact = dynamic(() => import("@/components/Contact").then((m) => m.Contact));

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const l = locale as Locale;

  return (
    <>
      <Hero locale={l} />
      <About locale={l} />
      <LazySection>
        <Skills locale={l} />
      </LazySection>
      <LazySection>
        <Projects locale={l} />
      </LazySection>
      <LazySection>
        <Experience locale={l} />
      </LazySection>
      <LazySection>
        <Contact locale={l} />
      </LazySection>
    </>
  );
}
