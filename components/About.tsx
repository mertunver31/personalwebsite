"use client";

import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function About({ locale }: { locale: Locale }) {
  const t = useTranslations("about");

  return (
    <section id="about" className="scroll-mt-24 px-5 py-16 sm:py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker={t("kicker")} title={t("title")} />
        <div className="grid gap-10 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <p className="text-xl leading-relaxed text-foreground/85 sm:text-2xl">
              {pick(profile.about, locale)}
            </p>
          </Reveal>
          <Reveal delay={1} className="md:col-span-2">
            <div className="glass gradient-border rounded-2xl p-6">
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{pick(profile.role, locale)}</dt>
                </div>
                <div className="border-t border-border pt-4">
                  <dt className="text-muted">Email</dt>
                  <dd className="mt-1 break-all font-medium">{profile.email}</dd>
                </div>
                <div className="border-t border-border pt-4">
                  <dt className="text-muted">
                    {locale === "tr" ? "Konum" : "Location"}
                  </dt>
                  <dd className="mt-1 font-medium">
                    {pick(profile.location, locale)}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
