"use client";

import { useTranslations } from "next-intl";
import { Lock, ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";
import { pick, type Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { GithubIcon } from "./Icons";

export function Projects({ locale }: { locale: Locale }) {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="scroll-mt-24 px-5 py-16 sm:py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker={t("kicker")} title={t("title")} />

        <Reveal className="mb-10">
          <p className="max-w-2xl text-muted">{t("privateExplain")}</p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i % 2}>
              <article className="glass gradient-border group flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.title}
                    className="mb-5 aspect-video w-full rounded-xl object-cover"
                  />
                )}

                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold">
                    {p.title}
                  </h3>
                  {p.privateRepo && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted">
                      <Lock size={12} />
                      {t("privateNote")}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm font-medium text-accent-3">
                  {pick(p.tagline, locale)}
                </p>
                <p className="mt-3 flex-1 text-muted">
                  {pick(p.description, locale)}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-foreground/70"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {(p.liveUrl || p.repoUrl) && (
                  <div className="mt-6 flex items-center gap-4 border-t border-border pt-4 text-sm">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-accent-3"
                      >
                        <ExternalLink size={15} />
                        {t("viewLive")}
                      </a>
                    )}
                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-muted transition-colors hover:text-foreground"
                      >
                        <GithubIcon className="h-4 w-4" />
                        {t("viewCode")}
                      </a>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
