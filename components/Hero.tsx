"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, ArrowDown } from "lucide-react";
import { profile, socials } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { SocialIcon } from "./Icons";

export function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-5 pt-28 pb-16 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Metin sütunu */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-sm uppercase tracking-[0.3em] text-accent-3"
          >
            {t("greeting")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl"
          >
            <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 text-2xl font-semibold text-foreground/90 sm:text-3xl"
          >
            {pick(profile.role, locale)}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-muted"
          >
            {pick(profile.tagline, locale)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-6 flex items-center gap-2 text-sm text-muted"
          >
            <MapPin size={16} className="text-accent-2" />
            {pick(profile.location, locale)}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="bg-gradient-accent group inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-white transition-transform hover:scale-[1.03]"
            >
              {t("ctaProjects")}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#contact"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors hover:bg-white/5"
            >
              {t("ctaContact")}
            </a>
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium text-muted transition-colors hover:text-foreground"
            >
              <Download size={18} />
              {t("downloadCv")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center gap-4"
          >
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
          </motion.div>
        </div>

        {/* Fotoğraf sütunu */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          <div className="bg-gradient-accent absolute -inset-3 rounded-[2rem] opacity-40 blur-2xl" />
          <div className="gradient-border glass relative overflow-hidden rounded-[1.75rem] p-2">
            <Image
              src="/foto.jpg"
              alt={profile.name}
              width={520}
              height={620}
              priority
              className="aspect-[5/6] w-full rounded-[1.4rem] object-cover"
            />
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          {t("scroll")}
        </span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
