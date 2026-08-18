"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { profile, socials } from "@/content/profile";
import { type Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { SocialIcon } from "./Icons";

export function Contact({ locale }: { locale: Locale }) {
  const t = useTranslations("contact");
  void locale;

  return (
    <section id="contact" className="scroll-mt-24 px-5 py-16 sm:py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker={t("kicker")} title={t("title")} />

        <Reveal>
          <div className="glass gradient-border relative overflow-hidden rounded-3xl p-8 sm:p-14">
            <div className="bg-accent-1/20 absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl" />
            <p className="relative max-w-xl text-xl text-foreground/85 sm:text-2xl">
              {t("text")}
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="bg-gradient-accent group relative mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-white transition-transform hover:scale-[1.03]"
            >
              {t("emailMe")}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <div className="relative mt-10 flex items-center gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-muted transition-colors hover:text-accent-3"
                >
                  <SocialIcon icon={s.icon} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
