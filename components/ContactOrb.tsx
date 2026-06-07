"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLights } from "./lightStore";
import { profile } from "@/content/profile";

type Phase = "fly" | "explode" | "card" | "sent";

const PALETTE = {
  western: ["#f6d68a", "#e0a23a", "#c2532a", "#3aa6a0"],
  neon: ["#22d3ee", "#8b5cf6", "#ec4899", "#a855f7"],
};

export function ContactOrb() {
  const { on } = useLights();
  const t = useTranslations("contactOrb");
  const orbRef = useRef<HTMLButtonElement>(null);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("fly");
  const [from, setFrom] = useState({ x: 0, y: 0 });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const palette = on ? PALETTE.western : PALETTE.neon;
  const conic = `conic-gradient(from 0deg, ${palette.join(", ")}, ${palette[0]})`;
  const ring = palette[0];

  const openOverlay = () => {
    const r = orbRef.current?.getBoundingClientRect();
    if (r) {
      setFrom({
        x: r.left + r.width / 2 - window.innerWidth / 2,
        y: r.top + r.height / 2 - window.innerHeight / 2,
      });
    }
    setStatus("idle");
    setPhase("fly");
    setOpen(true);
  };

  const close = () => setOpen(false);

  useEffect(() => setMounted(true), []);

  // Faz zamanlayıcıları
  useEffect(() => {
    if (!open) return;
    if (phase === "fly") {
      const id = setTimeout(() => setPhase("explode"), 700);
      return () => clearTimeout(id);
    }
    if (phase === "explode") {
      const id = setTimeout(() => setPhase("card"), 2000);
      return () => clearTimeout(id);
    }
  }, [open, phase]);

  // Esc ile kapat
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const particles = useMemo(
    () =>
      Array.from({ length: 70 }).map((_, i) => {
        const a = Math.random() * Math.PI * 2;
        const d = 90 + Math.random() * 340;
        return {
          id: i,
          a,
          d,
          c: palette[i % palette.length],
          s: 4 + Math.random() * 9,
          dur: 0.9 + Math.random() * 1.0,
          fall: 50 + Math.random() * 180, // yerçekimi
        };
      }),
    [palette],
  );

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("company")) {
      setPhase("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: fd.get("contact"),
          message: fd.get("message"),
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (data.ok) {
        setStatus("idle");
        setPhase("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const orb3d = {
    background: conic,
    boxShadow: `0 6px 20px -4px rgba(0,0,0,0.6), 0 0 22px ${ring}66`,
  } as React.CSSProperties;

  return (
    <>
      {/* Köşe küresi (müzik kutusunun zıttı — sağ alt) */}
      <button
        ref={orbRef}
        type="button"
        onClick={openOverlay}
        aria-label={t("open")}
        className="fixed bottom-3 right-3 z-[97] grid h-12 w-12 place-items-center rounded-full transition-transform hover:scale-110 active:scale-95 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        style={{
          opacity: open ? 0 : 1,
          pointerEvents: open ? "none" : "auto",
          boxShadow: `0 6px 20px -4px rgba(0,0,0,0.6), 0 0 22px ${ring}77`,
        }}
      >
        {/* Dönen + renk karıştıran konik katman */}
        <span
          className="orb-rot absolute inset-0 rounded-full"
          style={{ background: conic }}
        />
        {/* 3D parlama */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.7), rgba(255,255,255,0) 45%)",
          }}
        />
        <MessageCircle
          size={20}
          className="relative text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
        />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
            <motion.div
              key="orb-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[120] grid place-items-center"
              style={{ background: "rgba(2,3,10,0.78)", backdropFilter: "blur(6px)" }}
            >
              {/* Patlama flaşı */}
              {phase === "explode" && (
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: ring }}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                />
              )}

              {/* Uçan küre — fly'da merkeze gelir, explode'da patlayıp KAYBOLUR */}
              {(phase === "fly" || phase === "explode") && (
                <div className="pointer-events-none absolute left-1/2 top-1/2">
                  <motion.div
                    className="h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={orb3d}
                    initial={{ x: from.x, y: from.y, scale: 0.35, opacity: 0.9 }}
                    animate={
                      phase === "fly"
                        ? { x: 0, y: 0, scale: 1, opacity: 1 }
                        : { scale: 1.9, opacity: 0 }
                    }
                    transition={{
                      duration: phase === "fly" ? 0.7 : 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <span
                      className="orb-rot absolute inset-0 rounded-full"
                      style={{ background: conic }}
                    />
                  </motion.div>

                  {phase === "explode" && (
                    <>
                      {/* Şok dalgaları */}
                      <motion.span
                        className="absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                        style={{ borderColor: ring }}
                        initial={{ scale: 0.2, opacity: 0.9 }}
                        animate={{ scale: 6, opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                      <motion.span
                        className="absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                        style={{ borderColor: palette[2] }}
                        initial={{ scale: 0.2, opacity: 0.8 }}
                        animate={{ scale: 10, opacity: 0 }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                      />
                      {/* Havai fişek parçacıkları (yerçekimli) */}
                      {particles.map((p) => (
                        <motion.span
                          key={p.id}
                          className="absolute rounded-full"
                          style={{
                            width: p.s,
                            height: p.s,
                            background: p.c,
                            boxShadow: `0 0 12px ${p.c}, 0 0 24px ${p.c}`,
                          }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{
                            x: Math.cos(p.a) * p.d,
                            y: Math.sin(p.a) * p.d + p.fall,
                            opacity: [1, 1, 0],
                            scale: [1, 1, 0.3],
                          }}
                          transition={{ duration: p.dur, ease: "easeOut" }}
                        />
                      ))}
                    </>
                  )}
                </div>
              )}

              {/* Patlamadan doğan mesaj — ~2 sn sonra yukarı uçup gider, kart gelir */}
              {phase === "explode" && (
                <motion.p
                  className="pointer-events-none absolute left-1/2 top-1/2 w-[88%] max-w-2xl -translate-x-1/2 -translate-y-1/2 text-center font-display text-3xl font-black leading-tight sm:text-5xl"
                  style={{
                    color: "#fff",
                    textShadow: `0 0 16px ${ring}, 0 0 38px ${palette[2]}`,
                  }}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1.12, 1, 0.92],
                    y: [20, 0, 0, -55],
                  }}
                  transition={{ duration: 2, times: [0, 0.2, 0.72, 1], ease: "easeInOut" }}
                >
                  {t("burst")}
                </motion.p>
              )}

              {/* Mesaj kartı */}
              {(phase === "card" || phase === "sent") && (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  className="relative mx-4 w-full max-w-md rounded-2xl border p-6"
                  style={{
                    background: "rgba(8,8,16,0.92)",
                    borderColor: ring,
                    boxShadow: `0 0 30px ${ring}66, inset 0 0 24px ${ring}22`,
                  }}
                >
                  <button
                    type="button"
                    onClick={close}
                    aria-label={t("close")}
                    className="absolute right-3 top-3 text-white/60 hover:text-white"
                  >
                    <X size={20} />
                  </button>

                  {phase === "sent" ? (
                    <div className="py-6 text-center">
                      <div
                        className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full text-2xl"
                        style={{ background: conic, boxShadow: `0 0 20px ${ring}` }}
                      >
                        ✓
                      </div>
                      <h3
                        className="font-display text-2xl font-bold text-white"
                        style={{ textShadow: `0 0 14px ${ring}` }}
                      >
                        {t("sentTitle")}
                      </h3>
                      <p className="mt-2 text-sm text-white/70">{t("sentBody")}</p>
                    </div>
                  ) : (
                    <form onSubmit={submit}>
                      <h3
                        className="font-display text-2xl font-bold text-white"
                        style={{ textShadow: `0 0 14px ${ring}` }}
                      >
                        {t("title")}
                      </h3>
                      <p className="mt-1 text-sm text-white/65">{t("subtitle")}</p>

                      {/* Honeypot (gizli) */}
                      <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        aria-hidden
                      />

                      <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-white/60">
                        {t("contactLabel")}
                      </label>
                      <input
                        name="contact"
                        required
                        maxLength={300}
                        placeholder={t("contactPlaceholder")}
                        className="mt-1.5 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white outline-none focus:border-white/40"
                        style={{ boxShadow: `inset 0 0 0 0 ${ring}` }}
                      />

                      <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-white/60">
                        {t("messageLabel")}
                      </label>
                      <textarea
                        name="message"
                        required
                        maxLength={5000}
                        rows={4}
                        placeholder={t("messagePlaceholder")}
                        className="mt-1.5 w-full resize-none rounded-lg border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white outline-none focus:border-white/40"
                      />

                      {status === "error" && (
                        <p className="mt-3 text-xs text-red-400">
                          {t("error")}{" "}
                          <a
                            href={`mailto:${profile.email}`}
                            className="underline"
                          >
                            {profile.email}
                          </a>
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg py-3 font-bold uppercase tracking-wider text-black transition-transform hover:scale-[1.02] disabled:opacity-60"
                        style={{ background: conic, boxShadow: `0 0 18px ${ring}88` }}
                      >
                        <Send size={16} />
                        {status === "sending" ? t("sending") : t("send")}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
