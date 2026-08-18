"use client";

import { useTranslations } from "next-intl";
import { experience, education } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience({ locale }: { locale: Locale }) {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="scroll-mt-24 px-5 py-16 sm:py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker={t("kicker")} title={t("title")} />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* İş deneyimi */}
          <div>
            <h3 className="mb-6 font-display text-xl font-semibold text-foreground/90">
              {t("work")}
            </h3>
            <div className="relative space-y-8 border-l border-border pl-6">
              {experience.map((item, i) => (
                <Reveal key={`${item.company}-${i}`} delay={i}>
                  <div className="relative">
                    <span className="bg-gradient-accent absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background" />
                    <p className="font-mono text-xs uppercase tracking-wider text-accent-3">
                      {pick(item.period, locale)}
                    </p>
                    <h4 className="mt-1 text-lg font-semibold">
                      {pick(item.role, locale)}
                    </h4>
                    <p className="text-muted">{item.company}</p>
                    <p className="mt-2 text-sm text-foreground/75">
                      {pick(item.description, locale)}
                    </p>
                    {item.tech && (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {item.tech.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-foreground/60"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Eğitim */}
          <div>
            <h3 className="mb-6 font-display text-xl font-semibold text-foreground/90">
              {t("education")}
            </h3>
            <div className="relative space-y-8 border-l border-border pl-6">
              {education.map((item, i) => (
                <Reveal key={`${item.school}-${i}`} delay={i}>
                  <div className="relative">
                    <span className="bg-gradient-accent absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background" />
                    <p className="font-mono text-xs uppercase tracking-wider text-accent-3">
                      {pick(item.period, locale)}
                    </p>
                    <h4 className="mt-1 text-lg font-semibold">
                      {pick(item.degree, locale)}
                    </h4>
                    <p className="text-muted">{item.school}</p>
                    {item.description && (
                      <p className="mt-2 text-sm text-foreground/75">
                        {pick(item.description, locale)}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
