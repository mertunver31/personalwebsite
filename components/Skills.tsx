"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Gamepad2, RotateCcw, X } from "lucide-react";
import { skillGroups } from "@/content/profile";
import { pick, type Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { TechIcon, techColor } from "./TechIcon";
import { setSkillsInView, useLights } from "./lightStore";
import { playGunshot, playReload } from "./gunSound";
import dynamic from "next/dynamic";
import type { Rect } from "./GridRace";

// Tron oyunu yalnız "ENTER THE GRID"e basınca yüklenir (başlangıç paketini küçültür)
const GridRace = dynamic(() => import("./GridRace").then((m) => m.GridRace), {
  ssr: false,
});

const MAX_AMMO = 6;

export function Skills({ locale }: { locale: Locale }) {
  const t = useTranslations("skills");
  const { on, skillsInView } = useLights();

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const delays = useMemo(
    () =>
      skillGroups.map((g) =>
        g.skills.map(() => +(Math.random() * 1.9).toFixed(2)),
      ),
    [],
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setSkillsInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ---------- "Shoot the Skills" mini-oyunu (western mod) ----------
  const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => s.name));
  const total = allSkills.length;

  const [gameOn, setGameOn] = useState(false);
  const [ammo, setAmmo] = useState(MAX_AMMO);
  const [hits, setHits] = useState<Set<string>>(new Set());
  const [flash, setFlash] = useState(false);
  const ammoRef = useRef(MAX_AMMO);
  const reticleRef = useRef<HTMLDivElement>(null);

  const startGame = () => {
    setGameOn(true);
    ammoRef.current = MAX_AMMO;
    setAmmo(MAX_AMMO);
    setHits(new Set());
  };
  const exitGame = () => setGameOn(false);
  const reload = () => {
    ammoRef.current = MAX_AMMO;
    setAmmo(MAX_AMMO);
    playReload();
  };

  const triggerFlash = () => {
    setFlash(true);
    window.setTimeout(() => setFlash(false), 90);
  };

  const fire = (e: React.MouseEvent) => {
    if (!gameOn) return;
    if (ammoRef.current <= 0) {
      reload();
      return;
    }
    ammoRef.current -= 1;
    setAmmo(ammoRef.current);
    playGunshot();
    triggerFlash();
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-skill]");
    if (el?.dataset.skill) {
      const name = el.dataset.skill;
      setHits((h) => {
        if (h.has(name)) return h;
        const n = new Set(h);
        n.add(name);
        return n;
      });
    }
  };

  // Nişangah cursor'ı fareyi takip etsin
  useEffect(() => {
    if (!gameOn) return;
    const move = (e: MouseEvent) => {
      const node = reticleRef.current;
      if (node) node.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [gameOn]);

  const won = gameOn && hits.size >= total;

  // ---------- Tron ışık motoru yarışı (neon mod) ----------
  const [raceOn, setRaceOn] = useState(false);
  const [cardRects, setCardRects] = useState<Rect[]>([]);

  const startRace = () => {
    const els = document.querySelectorAll<HTMLElement>("[data-neon-card]");
    const rects = Array.from(els).map((el) => {
      const r = el.getBoundingClientRect();
      return { top: r.top, left: r.left, width: r.width, height: r.height };
    });
    setCardRects(rects);
    setRaceOn(true);
  };

  // ---------- Neon sahnesi konumu (ışık kapalı) ----------
  const neonVisible = mounted && !on && skillsInView;
  const [box, setBox] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const measure = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setBox({
      top: r.top + window.scrollY,
      left: r.left + window.scrollX,
      width: r.width,
    });
  }, []);

  useEffect(() => {
    if (neonVisible) measure();
  }, [neonVisible, measure]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const [runId, setRunId] = useState(0);
  const prevVisible = useRef(false);
  useEffect(() => {
    if (neonVisible && !prevVisible.current) setRunId((n) => n + 1);
    prevVisible.current = neonVisible;
  }, [neonVisible]);

  const marquee = [...allSkills, ...allSkills];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="scroll-mt-24 px-5 py-16 sm:py-24 sm:px-8"
    >
      <div
        ref={contentRef}
        className="mx-auto max-w-6xl"
        style={{
          opacity: on ? 1 : 0,
          pointerEvents: on ? undefined : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        <SectionHeading kicker={t("kicker")} title={t("title")} />

        {/* Oyun başlat butonu / HUD (yalnızca western modda) */}
        {on && (
          <div className="mb-8 min-h-[44px]">
            {!gameOn ? (
              <button
                type="button"
                onClick={startGame}
                className="group inline-flex items-center gap-2 rounded-lg border-2 border-accent-1/60 bg-accent-1/10 px-4 py-2.5 font-bold uppercase tracking-wider text-accent-1 transition-all hover:bg-accent-1/20 [font-family:var(--font-western),serif]"
              >
                <Crosshair size={18} className="transition-transform group-hover:rotate-90" />
                {t("shoot")}
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-4 rounded-lg border-2 border-accent-1/40 bg-black/30 px-4 py-2.5">
                <span className="text-lg font-bold uppercase tracking-wider text-accent-1 [font-family:var(--font-western),serif]">
                  {t("shootBanner")}
                </span>
                {/* Mermiler */}
                <span className="flex items-center gap-1" aria-label={`${ammo}/${MAX_AMMO}`}>
                  {Array.from({ length: MAX_AMMO }).map((_, i) => (
                    <span
                      key={i}
                      className="h-4 w-2 rounded-sm transition-colors"
                      style={{
                        background:
                          i < ammo
                            ? "linear-gradient(180deg,#f6d68a,#b5732a)"
                            : "rgba(255,255,255,0.12)",
                        boxShadow:
                          i < ammo ? "0 0 4px rgba(224,162,58,0.6)" : "none",
                      }}
                    />
                  ))}
                </span>
                {/* Skor */}
                <span className="font-mono text-sm text-foreground/80">
                  {hits.size}/{total}
                </span>
                {ammo === 0 && (
                  <button
                    type="button"
                    onClick={reload}
                    className="inline-flex items-center gap-1.5 rounded-md border border-accent-2/60 px-3 py-1 text-sm font-semibold text-accent-2 hover:bg-accent-2/15"
                  >
                    <RotateCcw size={14} />
                    {t("reload")}
                  </button>
                )}
                <button
                  type="button"
                  onClick={exitGame}
                  className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-muted hover:text-foreground"
                >
                  <X size={16} />
                  {t("exit")}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Kazanma bildirimi */}
        <AnimatePresence>
          {won && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6 text-center text-2xl font-bold uppercase tracking-wider text-accent-1 [font-family:var(--font-western),serif]"
              style={{ textShadow: "0 0 12px rgba(224,162,58,0.6)" }}
            >
              {t("win")}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Skill kartları (western); oyun açıkken hedefler */}
        <div
          onClick={gameOn ? fire : undefined}
          className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${gameOn ? "cursor-none" : ""}`}
        >
          {skillGroups.map((group, i) => (
            <Reveal key={group.title.en} delay={i}>
              <div className="glass gradient-border h-full rounded-2xl p-6">
                <h3 className="mb-4 font-display text-lg font-semibold">
                  {pick(group.title, locale)}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((s) => {
                    const hit = hits.has(s.name);
                    return (
                      <li
                        key={s.name}
                        data-skill={s.name}
                        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all ${
                          hit
                            ? "border-accent-1/50 bg-accent-1/10"
                            : "border-border bg-white/[0.03] text-foreground/80"
                        } ${gameOn && !hit ? "ring-1 ring-accent-2/40" : ""}`}
                      >
                        {hit && (
                          <motion.span
                            initial={{ scale: 0.3, rotate: -25 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 320, damping: 16 }}
                            className="inline-flex"
                          >
                            <TechIcon
                              name={s.name}
                              className="h-4 w-4"
                              style={{ color: techColor(s.name) }}
                            />
                          </motion.span>
                        )}
                        {s.name}
                      </li>
                    );
                  })}
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

      {/* Silah nişangahı cursor'ı (oyun açıkken) */}
      {mounted &&
        gameOn &&
        createPortal(
          <div
            ref={reticleRef}
            className="pointer-events-none fixed left-0 top-0 z-[120]"
            style={{ transform: "translate(-200px,-200px)" }}
          >
            <div
              className={`relative -translate-x-1/2 -translate-y-1/2 transition-transform ${flash ? "scale-90" : "scale-100"}`}
            >
              <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                <circle cx="23" cy="23" r="16" stroke="#e0a23a" strokeWidth="2" opacity="0.9" />
                <circle cx="23" cy="23" r="2.5" fill="#c2532a" />
                <path d="M23 1 V12 M23 34 V45 M1 23 H12 M34 23 H45" stroke="#e0a23a" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {flash && (
                <span
                  className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,230,150,0.9), rgba(255,140,40,0.5) 40%, transparent 70%)",
                  }}
                />
              )}
            </div>
          </div>,
          document.body,
        )}

      {/* Neon katmanı — orijinal kartların tam üstüne hizalı (ışık kapalı) */}
      {mounted &&
        box &&
        createPortal(
          <AnimatePresence>
            {neonVisible && (
              <motion.div
                key="neon-layer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="pointer-events-none absolute z-[95]"
                style={{ top: box.top, left: box.left, width: box.width }}
              >
                <div className="mb-12" key={runId}>
                  <p
                    className="neon-label font-mono text-sm uppercase tracking-[0.3em]"
                    style={{ ["--c" as string]: "#22d3ee" } as React.CSSProperties}
                  >
                    {t("kicker")}
                  </p>
                  <h2
                    className="neon-label mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl"
                    style={{ ["--c" as string]: "#22d3ee" } as React.CSSProperties}
                  >
                    {t("title")}
                  </h2>
                  <div className="bg-gradient-accent mt-5 h-1 w-20 rounded-full" />
                  <button
                    type="button"
                    onClick={startRace}
                    className="pointer-events-auto mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-[#22d3ee] bg-[#22d3ee]/10 px-4 py-2.5 font-display font-bold uppercase tracking-wider text-[#22d3ee] transition-colors hover:bg-[#22d3ee]/20"
                    style={{ boxShadow: "0 0 16px rgba(34,211,238,0.45)" }}
                  >
                    <Gamepad2 size={18} />
                    {t("race")}
                  </button>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {skillGroups.map((group, gi) => (
                    <div
                      key={group.title.en}
                      data-neon-card
                      className="h-full rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm"
                    >
                      <h3
                        className="neon-label mb-4 font-display text-lg font-semibold"
                        style={
                          { ["--c" as string]: "#f0abfc" } as React.CSSProperties
                        }
                      >
                        {pick(group.title, locale)}
                      </h3>
                      <ul className="grid grid-cols-3 gap-x-2 gap-y-4">
                        {group.skills.map((s, si) => (
                          <li
                            key={`${runId}-${s.name}`}
                            className="flex flex-col items-center gap-1.5 text-center"
                            title={s.name}
                          >
                            <TechIcon
                              name={s.name}
                              className="neon-item h-7 w-7"
                              style={
                                {
                                  ["--c"]: techColor(s.name),
                                  ["--d"]: `${delays[gi][si]}s`,
                                } as React.CSSProperties
                              }
                            />
                            <span
                              className="neon-label text-[10px] leading-tight"
                              style={
                                {
                                  ["--c" as string]: techColor(s.name),
                                } as React.CSSProperties
                              }
                            >
                              {s.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      {/* Tron ışık motoru yarışı (neon mod oyunu) */}
      {raceOn && (
        <GridRace
          cardRects={cardRects}
          skills={allSkills}
          onExit={() => setRaceOn(false)}
        />
      )}
    </section>
  );
}
