"use client";

import { useTranslations } from "next-intl";
import { skillGroups } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Skills({ locale }: { locale: Locale }) {
  const t = useTranslations("skills");

  // Marquee için tüm yetenekleri tek listeye topla
  const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => s.name));
  const marquee = [...allSkills, ...allSkills];

  return (
    <section id="skills" className="scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker={t("kicker")} title={t("title")} />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title.en} delay={i}>
              <div className="glass gradient-border h-full rounded-2xl p-6">
                <h3 className="mb-4 font-display text-lg font-semibold">
                  {pick(group.title, locale)}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <li
                      key={s.name}
                      className="rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-sm text-foreground/80"
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Sonsuz kayan yetenek şeridi */}
      <div className="mt-16 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8">
          {marquee.map((name, i) => (
            <span
              key={i}
              className="font-display text-2xl font-bold text-foreground/10 sm:text-4xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
