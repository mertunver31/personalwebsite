"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, MapPin, ArrowDown } from "lucide-react";
import { profile, socials } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { SocialIcon } from "./Icons";
import { useLights } from "./lightStore";
import { useIsMobile } from "./useIsMobile";
import { playGunshot } from "./gunSound";

// Western geçişinde fotoğrafa açılan kurşun deliklerinin konumları
const HOLES = [
  { x: "32%", y: "30%" },
  { x: "62%", y: "24%" },
  { x: "46%", y: "52%" },
  { x: "72%", y: "58%" },
  { x: "28%", y: "68%" },
  { x: "58%", y: "78%" },
];

function BulletHole() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" aria-hidden>
      <g stroke="rgba(235,215,175,0.45)" strokeWidth="1">
        <path d="M23 23 L7 14 M23 23 L40 11 M23 23 L42 29 M23 23 L31 43 M23 23 L11 41 M23 23 L4 27" />
      </g>
      <circle cx="23" cy="23" r="7.5" fill="#050403" />
      <circle
        cx="23"
        cy="23"
        r="7.5"
        fill="none"
        stroke="rgba(255,236,196,0.7)"
        strokeWidth="1.5"
      />
      <circle cx="23" cy="23" r="3" fill="#000" />
    </svg>
  );
}

// Western'e geçiş: önce kurşun delikleri açılır, sonra perde kalkıp resim belirir
function WesternReveal() {
  useEffect(() => {
    const ids = HOLES.map((_, i) =>
      window.setTimeout(() => playGunshot(), 120 + i * 170),
    );
    return () => ids.forEach(clearTimeout);
  }, []);
  return (
    <motion.div
      className="pointer-events-none absolute inset-2 z-20 overflow-hidden rounded-[1.4rem]"
      style={{ background: "#0b0806" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 2, times: [0, 0.72, 1], ease: "easeInOut" }}
    >
      {HOLES.map((h, i) => (
        <motion.span
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: h.x, top: h.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.12 + i * 0.17, type: "spring", stiffness: 500, damping: 18 }}
        >
          <BulletHole />
        </motion.span>
      ))}
    </motion.div>
  );
}

// Neon/EDM rave gülen suratı (asit-house tarzı, çok renkli neon)
function RaveSmiley() {
  return (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" aria-hidden>
      <circle cx="75" cy="75" r="60" stroke="#eaff00" strokeWidth="8" />
      <ellipse cx="54" cy="60" rx="7" ry="15" fill="#22d3ee" />
      <ellipse cx="96" cy="60" rx="7" ry="15" fill="#22d3ee" />
      <path
        d="M40 92 Q75 128 110 92"
        stroke="#ec4899"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Neon'a geçiş: siyah zeminde EDM rave sahnesi (strobe + gülen surat + ekolayzer
// + ses dalgaları + uçuşan şimşekler) yanıp söner, sonra resim belirir
function NeonReveal() {
  const isMobile = useIsMobile();
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const bolts = [
    { x: "78%", y: "26%", d: 0, c: "#22d3ee" },
    { x: "20%", y: "72%", d: 0.4, c: "#ec4899" },
    { x: "84%", y: "66%", d: 0.8, c: "#a855f7" },
  ];
  return (
    <motion.div
      className="pointer-events-none absolute inset-2 z-20 overflow-hidden rounded-[1.4rem] bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 2.2, times: [0, 0.78, 1], ease: "easeInOut" }}
    >
      {/* Strobe arka plan */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: [
            "rgba(0,0,0,0)",
            "rgba(34,211,238,0.16)",
            "rgba(0,0,0,0)",
            "rgba(236,72,153,0.16)",
            "rgba(0,0,0,0)",
            "rgba(168,85,247,0.14)",
            "rgba(0,0,0,0)",
          ],
        }}
        transition={{ duration: 1.6, repeat: 1, ease: "linear" }}
      />

      {/* Gülen surat + ses dalgaları (yüz tarafı / sol) */}
      <div className="absolute left-[20%] top-[42%] -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{ borderColor: i % 2 ? "#ec4899" : "#22d3ee" }}
            initial={{ scale: 0.3, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.45, ease: "easeOut" }}
          />
        ))}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: [0, 1, 0.1, 1, 0.3, 1, 0.5, 1],
            scale: [0.7, 1.05, 1, 1.04, 1, 1.03, 1, 1],
          }}
          transition={{ duration: 1.7, times: [0, 0.12, 0.2, 0.32, 0.45, 0.6, 0.75, 1] }}
          style={{
            // Mobilde tek drop-shadow — üçlü zincir açılışta jank yaratıyordu
            filter: isMobile
              ? "drop-shadow(0 0 16px #22d3ee)"
              : "drop-shadow(0 0 10px #eaff00) drop-shadow(0 0 20px #22d3ee) drop-shadow(0 0 32px #ec4899)",
          }}
        >
          <RaveSmiley />
        </motion.div>
      </div>

      {/* Uçuşan neon şimşekler */}
      {bolts.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: b.x, top: b.y, color: b.c, filter: `drop-shadow(0 0 8px ${b.c})` }}
          initial={{ opacity: 0, y: 14, rotate: -10 }}
          animate={{ opacity: [0, 1, 0.4, 1, 0], y: [-2, -16], rotate: [-10, 8] }}
          transition={{ duration: 1.5, delay: b.d, ease: "easeOut" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
        </motion.div>
      ))}

      {/* Ekolayzer (alt) */}
      <div className="absolute inset-x-0 bottom-3 flex h-12 items-end justify-center gap-[5px]">
        {bars.map((i) => (
          <motion.span
            key={i}
            className="w-[5px] origin-bottom rounded-sm"
            style={{
              height: "100%",
              background: "linear-gradient(180deg,#22d3ee,#a855f7 55%,#ec4899)",
              boxShadow: "0 0 6px rgba(34,211,238,0.7)",
            }}
            initial={{ scaleY: 0.15 }}
            animate={{ scaleY: [0.15, 1, 0.3, 0.85, 0.2, 0.95, 0.4] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 5) * 0.08,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations("hero");

  // Işık geçişinde fotoğraf "belirme" animasyonu (flicker bittikten sonra tetiklenir)
  const { on } = useLights();
  const [reveal, setReveal] = useState<null | "western" | "neon">(null);
  const [revealKey, setRevealKey] = useState(0);
  const firstRef = useRef(true);
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    setReveal(on ? "western" : "neon");
    setRevealKey((k) => k + 1);
    const tm = window.setTimeout(() => setReveal(null), 2300);
    return () => clearTimeout(tm);
  }, [on]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-5 pt-28 pb-16 sm:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        {/* Metin sütunu */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-sm uppercase tracking-[0.3em] text-accent-1"
          >
            {t("greeting")}
          </motion.p>

          <motion.h1
            initial={{ y: 24 }}
            animate={{ y: 0 }}
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
              href={locale === "tr" ? "/cv-tr.pdf" : "/cv-en.pdf"}
              download={`Mert-Efe-Unver-CV-${locale.toUpperCase()}.pdf`}
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
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative order-1 mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:order-2 lg:max-w-sm"
        >
          <div className="bg-gradient-accent absolute -inset-3 rounded-[2rem] opacity-40 blur-2xl" />
          <div className="gradient-border glass relative overflow-hidden rounded-[1.75rem] p-2">
            <Image
              src="/foto.jpg"
              alt={profile.name}
              width={520}
              height={620}
              priority
              sizes="(max-width: 1024px) 280px, 384px"
              className="aspect-[5/6] w-full rounded-[1.4rem] object-cover"
            />
            <AnimatePresence>
              {reveal === "western" && <WesternReveal key={revealKey} />}
              {reveal === "neon" && <NeonReveal key={revealKey} />}
            </AnimatePresence>
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
