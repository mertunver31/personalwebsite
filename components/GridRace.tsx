"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, RotateCcw, X } from "lucide-react";
import { startEngine, stopEngine, playCrash } from "./raceSound";
import { TechIcon, techColor } from "./TechIcon";

export type Rect = { top: number; left: number; width: number; height: number };
type Phase = "merging" | "diveIn" | "racing" | "fakeWin" | "result";
type ResultType = "lose" | "rigged" | "win";

const CYAN = "#22d3ee";
const BLUE = "#3b82f6";
const RED = "#ef4444";

// Motor fiziği
const TURN = 4.6; // rad/s — keskin dönüş
const SPEED = 185; // sabit hız (iki taraf da eşit)
const FAKE_SPEED = 300; // hile fazında botun saldırı hızı
const JUMP_DUR = 0.5;
const JUMP_CD = 1.1;
const HIT = 7;
const TRAIL_CAP = 1200;
const TICK = 5; // geri sayım
const SHIELD_DUR = 3; // orb alınca koruma
const PICKUP_R = 24;
const ERASE_FRAC = 0.5; // her tick'te silinen iz oranı

type Bike = {
  x: number;
  y: number;
  dir: number;
  speed: number;
  trail: { x: number; y: number; gap: boolean }[];
  air: number;
  jumpCd: number;
  shield: number;
};
type Play = { x: number; y: number; w: number; h: number };
type Orb = { id: number; name: string; x: number; y: number };

function angleNorm(a: number) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
function distSeg(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const l2 = dx * dx + dy * dy || 1;
  let tt = ((px - ax) * dx + (py - ay) * dy) / l2;
  tt = clamp(tt, 0, 1);
  return Math.hypot(px - (ax + tt * dx), py - (ay + tt * dy));
}
function nearTrail(
  x: number,
  y: number,
  trail: Bike["trail"],
  thresh: number,
  skipEnd = 0,
) {
  const end = trail.length - 1 - skipEnd;
  for (let i = 0; i < end; i++) {
    const a = trail[i];
    const b = trail[i + 1];
    if (a.gap || b.gap) continue;
    if (distSeg(x, y, a.x, a.y, b.x, b.y) < thresh) return true;
  }
  return false;
}

export function GridRace({
  cardRects,
  skills,
  onExit,
}: {
  cardRects: Rect[];
  skills: string[];
  onExit: () => void;
}) {
  const t = useTranslations("skills");
  const [phase, setPhase] = useState<Phase>("merging");
  const [running, setRunning] = useState(false);
  const [shake, setShake] = useState(false);
  const [resultType, setResultType] = useState<ResultType>("lose");
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [timer, setTimer] = useState(TICK);
  const [collected, setCollected] = useState(0);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const total = skills.length;

  const arena = useMemo(() => {
    const w = Math.min(window.innerWidth * 0.7, 880);
    const h = Math.min(window.innerHeight * 0.5, 480);
    return {
      left: (window.innerWidth - w) / 2,
      top: (window.innerHeight - h) / 2,
      width: w,
      height: h,
    };
  }, []);
  const playRect = useMemo<Play>(() => {
    const m = Math.max(20, window.innerWidth * 0.03);
    return {
      x: m,
      y: 78,
      w: window.innerWidth - 2 * m,
      h: window.innerHeight - 78 - 64,
    };
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<Bike | null>(null);
  const botRef = useRef<Bike | null>(null);
  const inputRef = useRef({ l: false, r: false });
  const jumpReqRef = useRef(false);
  const modeRef = useRef<"race" | "fake">("race");
  const cheatedRef = useRef(false);
  const fakeStartRef = useRef(0);
  const endedRef = useRef(false);
  const orbsRef = useRef<Orb[]>([]);
  const orderRef = useRef<string[]>([]);
  const droppedRef = useRef(0);
  const orbIdRef = useRef(0);
  const timerRef = useRef(TICK);
  const timerDispRef = useRef(TICK);

  const exit = useCallback(() => {
    stopEngine();
    setRunning(false);
    onExit();
  }, [onExit]);

  const endGame = useCallback((type: ResultType) => {
    if (endedRef.current) return;
    endedRef.current = true;
    stopEngine();
    if (type !== "win") playCrash();
    setShake(type !== "win");
    window.setTimeout(() => setShake(false), 520);
    setResultType(type);
    setRunning(false);
    setPhase("result");
  }, []);

  const triggerFakeWin = useCallback(() => {
    modeRef.current = "fake";
    cheatedRef.current = true;
    fakeStartRef.current = performance.now();
    setPhase("fakeWin");
  }, []);

  useEffect(() => {
    const timers: number[] = [];
    if (phase === "merging")
      timers.push(window.setTimeout(() => setPhase("diveIn"), reduced ? 250 : 1150));
    else if (phase === "diveIn")
      timers.push(
        window.setTimeout(() => {
          setPhase("racing");
          setRunning(true);
        }, reduced ? 250 : 1100),
      );
    return () => timers.forEach(clearTimeout);
  }, [phase, reduced]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const set = (e: KeyboardEvent, v: boolean) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") inputRef.current.l = v;
      else if (k === "arrowright" || k === "d") inputRef.current.r = v;
      else if (k === " " || k === "spacebar") {
        if (v) jumpReqRef.current = true;
      } else return;
      e.preventDefault();
    };
    const onDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") return exit();
      set(e, true);
    };
    const onUp = (e: KeyboardEvent) => set(e, false);
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      stopEngine();
    };
  }, [exit]);

  // ---------- Oyun döngüsü ----------
  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const play = playRect;

    endedRef.current = false;
    modeRef.current = "race";
    cheatedRef.current = false;
    inputRef.current = { l: false, r: false };
    jumpReqRef.current = false;
    orbsRef.current = [];
    setOrbs([]);
    orderRef.current = [...skills].sort(() => Math.random() - 0.5);
    droppedRef.current = 0;
    orbIdRef.current = 0;
    timerRef.current = TICK;
    timerDispRef.current = TICK;
    setTimer(TICK);
    setCollected(0);
    playerRef.current = {
      x: play.x + play.w / 2,
      y: play.y + play.h * 0.82,
      dir: -Math.PI / 2,
      speed: SPEED,
      trail: [],
      air: 0,
      jumpCd: 0,
      shield: 0,
    };
    botRef.current = {
      x: play.x + play.w / 2,
      y: play.y + play.h * 0.18,
      dir: Math.PI / 2,
      speed: SPEED,
      trail: [],
      air: 0,
      jumpCd: 0,
      shield: 0,
    };
    startEngine();

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const clearDist = (b: Bike, h: number) => {
      const player = playerRef.current!;
      const bot = botRef.current!;
      const D = 175;
      for (let s = 14; s <= D; s += 14) {
        const x = b.x + Math.cos(h) * s;
        const y = b.y + Math.sin(h) * s;
        if (x < play.x + 6 || x > play.x + play.w - 6) return s;
        if (y < play.y + 6 || y > play.y + play.h - 6) return s;
        if (nearTrail(x, y, player.trail, HIT * 1.4)) return s;
        if (nearTrail(x, y, bot.trail, HIT * 1.4, 16)) return s;
      }
      return D;
    };

    const moveBike = (b: Bike, dt: number) => {
      if (b.air > 0) b.air -= dt;
      if (b.shield > 0) b.shield -= dt;
      b.jumpCd -= dt;
      b.x += Math.cos(b.dir) * b.speed * dt;
      b.y += Math.sin(b.dir) * b.speed * dt;
      b.trail.push({ x: b.x, y: b.y, gap: b.air > 0 });
      if (b.trail.length > TRAIL_CAP) b.trail.shift();
    };

    const collide = (b: Bike, self: Bike, other: Bike) => {
      if (b.air > 0) return false;
      if (
        b.x < play.x + 4 ||
        b.x > play.x + play.w - 4 ||
        b.y < play.y + 4 ||
        b.y > play.y + play.h - 4
      )
        return true; // duvar her zaman öldürür
      if (b.shield > 0) return false; // kalkan: izlerden geçer
      if (nearTrail(b.x, b.y, other.trail, HIT)) return true;
      if (nearTrail(b.x, b.y, self.trail, HIT, 16)) return true;
      return false;
    };

    let raf = 0;
    let last = 0;

    const loop = (now: number) => {
      if (!last) last = now;
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;
      const player = playerRef.current!;
      const bot = botRef.current!;
      const inp = inputRef.current;

      // Geri sayım
      timerRef.current -= dt;
      const disp = Math.max(0, Math.ceil(timerRef.current));
      if (disp !== timerDispRef.current) {
        timerDispRef.current = disp;
        setTimer(disp);
      }
      if (timerRef.current <= 0) {
        timerRef.current = TICK;
        timerDispRef.current = TICK;
        setTimer(TICK);
        // İzlerin bir kısmını sil
        player.trail.splice(0, Math.floor(player.trail.length * ERASE_FRAC));
        bot.trail.splice(0, Math.floor(bot.trail.length * ERASE_FRAC));
        // Skill orb'u düşür
        if (droppedRef.current < orderRef.current.length) {
          const name = orderRef.current[droppedRef.current++];
          const ox = play.x + 50 + Math.random() * (play.w - 100);
          const oy = play.y + 50 + Math.random() * (play.h - 100);
          orbsRef.current = [
            ...orbsRef.current,
            { id: orbIdRef.current++, name, x: ox, y: oy },
          ];
          setOrbs(orbsRef.current);
        }
      }

      // Oyuncu girişi (sadece dön + zıpla, sabit hız)
      if (inp.l) player.dir -= TURN * dt;
      if (inp.r) player.dir += TURN * dt;
      player.speed = SPEED;
      if (jumpReqRef.current) {
        jumpReqRef.current = false;
        if (player.air <= 0 && player.jumpCd <= 0) {
          player.air = JUMP_DUR;
          player.jumpCd = JUMP_CD;
        }
      }

      // Bot AI
      if (modeRef.current === "fake") {
        const desired = Math.atan2(player.y - bot.y, player.x - bot.x);
        bot.dir += clamp(angleNorm(desired - bot.dir), -TURN * 1.6 * dt, TURN * 1.6 * dt);
        bot.speed = FAKE_SPEED;
        bot.air = 0;
      } else {
        bot.speed = SPEED;
        const lead = 0.55;
        const tx = player.x + Math.cos(player.dir) * player.speed * lead;
        const ty = player.y + Math.sin(player.dir) * player.speed * lead;
        const desired = Math.atan2(ty - bot.y, tx - bot.x);
        const straight = clearDist(bot, bot.dir);
        if (straight > 95) {
          const nd =
            bot.dir + clamp(angleNorm(desired - bot.dir), -TURN * dt, TURN * dt);
          if (clearDist(bot, nd) > 62) bot.dir = nd;
        } else {
          const dl = clearDist(bot, bot.dir - 0.6);
          const dr = clearDist(bot, bot.dir + 0.6);
          bot.dir += (dr >= dl ? 1 : -1) * TURN * dt;
          if (Math.max(dl, dr) < 56 && bot.jumpCd <= 0 && bot.air <= 0) {
            bot.air = JUMP_DUR;
            bot.jumpCd = JUMP_CD;
          }
        }
      }

      moveBike(player, dt);
      moveBike(bot, dt);

      // Orb toplama
      if (orbsRef.current.length) {
        const keep: Orb[] = [];
        let changed = false;
        for (const o of orbsRef.current) {
          if (Math.hypot(player.x - o.x, player.y - o.y) < PICKUP_R) {
            player.shield = SHIELD_DUR;
            changed = true;
            continue;
          }
          if (Math.hypot(bot.x - o.x, bot.y - o.y) < PICKUP_R) {
            bot.shield = SHIELD_DUR;
            changed = true;
            continue;
          }
          keep.push(o);
        }
        if (changed) {
          orbsRef.current = keep;
          setOrbs(keep);
          setCollected(droppedRef.current - keep.length);
        }
      }

      // Çarpışmalar
      if (collide(player, player, bot)) {
        endGame(modeRef.current === "fake" ? "rigged" : "lose");
        return;
      }
      if (modeRef.current === "fake") {
        if (
          Math.hypot(bot.x - player.x, bot.y - player.y) < HIT * 2.2 ||
          performance.now() - fakeStartRef.current > 3200
        ) {
          endGame("rigged");
          return;
        }
      } else if (collide(bot, bot, player) && !cheatedRef.current) {
        triggerFakeWin();
      }

      // GERÇEK ZAFER: tüm skiller düştü ve toplandı, oyuncu hayatta
      if (
        modeRef.current === "race" &&
        droppedRef.current >= orderRef.current.length &&
        orbsRef.current.length === 0
      ) {
        endGame("win");
        return;
      }

      draw(ctx, play, player, bot, modeRef.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      stopEngine();
    };
  }, [running, playRect, skills, endGame, triggerFakeWin]);

  const rematch = () => {
    endedRef.current = false;
    setResultType("lose");
    setPhase("racing");
    setRunning(true);
  };

  const n = cardRects.length || 1;
  const inPlay = phase === "racing" || phase === "fakeWin";

  return createPortal(
    <div className="fixed inset-0 z-[130] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "merging" ? 0 : 1 }}
        transition={{ duration: 1 }}
      />

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${shake ? "screen-shake" : ""}`}
        style={{
          opacity: running || phase === "result" ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Skill orb'ları (DOM, ikonuyla) */}
      {inPlay &&
        orbs.map((o) => (
          <motion.div
            key={o.id}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: o.x, top: o.y }}
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.14, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="grid h-11 w-11 place-items-center rounded-full border"
              style={{
                borderColor: techColor(o.name),
                background: `radial-gradient(circle at 35% 30%, ${techColor(o.name)}55, rgba(0,0,0,0.7) 70%)`,
                boxShadow: `0 0 14px ${techColor(o.name)}, inset 0 0 10px ${techColor(o.name)}66`,
              }}
            >
              <TechIcon
                name={o.name}
                className="h-6 w-6"
                style={{ color: techColor(o.name) }}
              />
            </div>
          </motion.div>
        ))}

      {/* MERGING */}
      {phase === "merging" &&
        cardRects.map((r, i) => (
          <motion.div
            key={i}
            className="absolute rounded-lg border border-[#22d3ee]/70"
            style={{ background: "rgba(2,6,14,0.6)" }}
            initial={{ top: r.top, left: r.left, width: r.width, height: r.height, opacity: 0.9 }}
            animate={{
              top: arena.top,
              left: arena.left + (i * arena.width) / n,
              width: arena.width / n,
              height: arena.height,
              opacity: 1,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        ))}

      {/* DIVE-IN */}
      {phase === "diveIn" && (
        <motion.div
          className="absolute rounded-lg border-2"
          style={{
            borderColor: CYAN,
            boxShadow: `0 0 30px ${CYAN}, inset 0 0 40px rgba(34,211,238,0.3)`,
          }}
          initial={{ top: arena.top, left: arena.left, width: arena.width, height: arena.height }}
          animate={{ top: playRect.y, left: playRect.x, width: playRect.w, height: playRect.h }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
      )}

      {/* HUD + dokunmatik */}
      {inPlay && (
        <>
          {/* Geri sayım + toplanan */}
          <div className="pointer-events-none absolute left-1/2 top-3 flex -translate-x-1/2 flex-col items-center">
            <span
              className="font-display text-4xl font-black tabular-nums text-[#22d3ee]"
              style={{ textShadow: "0 0 16px #22d3ee" }}
            >
              {timer}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
              {t("collected")} {collected}/{total}
            </span>
          </div>
          <div className="pointer-events-none absolute left-4 top-4 font-mono text-sm font-bold uppercase tracking-[0.3em] text-[#22d3ee] [text-shadow:0_0_10px_#22d3ee]">
            {t("round")}
          </div>
          <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
            <span className="hidden sm:inline">{t("controlsHint")}</span>
            <span className="sm:hidden">{t("mobileHint")}</span>
          </div>

          <button
            type="button"
            aria-label="left"
            className="absolute bottom-24 left-0 top-1/3 w-1/3 sm:hidden"
            onPointerDown={() => (inputRef.current.l = true)}
            onPointerUp={() => (inputRef.current.l = false)}
            onPointerLeave={() => (inputRef.current.l = false)}
          />
          <button
            type="button"
            aria-label="right"
            className="absolute bottom-24 right-0 top-1/3 w-1/3 sm:hidden"
            onPointerDown={() => (inputRef.current.r = true)}
            onPointerUp={() => (inputRef.current.r = false)}
            onPointerLeave={() => (inputRef.current.r = false)}
          />
          <button
            type="button"
            onClick={() => (jumpReqRef.current = true)}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full border-2 border-[#22d3ee] bg-[#22d3ee]/15 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#22d3ee] sm:hidden"
          >
            {t("jump")}
          </button>
          <div className="pointer-events-none absolute bottom-32 left-6 text-[#22d3ee]/40 sm:hidden">
            <ChevronLeft size={36} />
          </div>
          <div className="pointer-events-none absolute bottom-32 right-6 text-[#22d3ee]/40 sm:hidden">
            <ChevronRight size={36} />
          </div>
        </>
      )}

      {/* SAHTE ZAFER banner'ı */}
      <AnimatePresence>
        {phase === "fakeWin" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 12 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <p
              className="font-display text-6xl font-black uppercase tracking-tight text-[#34d399] sm:text-8xl"
              style={{ textShadow: "0 0 24px #34d399, 0 0 60px #22d3ee" }}
            >
              {t("youWin")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sonuç flaşı */}
      {phase === "result" && (
        <div
          className={`crash-flash pointer-events-none absolute inset-0 ${resultType === "win" ? "bg-[#22d3ee]/50" : "bg-red-500/70"}`}
        />
      )}

      {/* SONUÇ menüsü */}
      <AnimatePresence>
        {phase === "result" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/75 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
            >
              <p
                className="font-display text-2xl font-bold uppercase tracking-[0.2em]"
                style={{
                  color: resultType === "win" ? "#34d399" : "#ef4444",
                  textShadow: `0 0 16px ${resultType === "win" ? "#34d399" : "#ef4444"}`,
                }}
              >
                {resultType === "win"
                  ? t("realWin")
                  : resultType === "rigged"
                    ? t("rigged")
                    : t("lose")}
              </p>
              <p
                className="mt-2 font-display text-5xl font-black uppercase tracking-tight text-white sm:text-7xl"
                style={{ textShadow: "0 0 24px #22d3ee, 0 0 48px #ec4899" }}
              >
                {resultType === "win"
                  ? t("realWinSub")
                  : resultType === "rigged"
                    ? t("riggedSub")
                    : t("loseSub")}
              </p>
            </motion.div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={rematch}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#22d3ee] px-5 py-2.5 font-bold uppercase tracking-wider text-[#22d3ee] transition-colors hover:bg-[#22d3ee]/15"
                style={{ boxShadow: "0 0 14px rgba(34,211,238,0.5)" }}
              >
                <RotateCcw size={18} />
                {t("rematch")}
              </button>
              <button
                type="button"
                onClick={exit}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 font-semibold uppercase tracking-wider text-white/80 hover:bg-white/10"
              >
                <X size={18} />
                {t("exit")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase !== "result" && (
        <button
          type="button"
          onClick={exit}
          className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-md border border-white/25 bg-black/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 hover:bg-white/10"
        >
          <X size={14} />
          {t("skip")}
        </button>
      )}
    </div>,
    document.body,
  );
}

// ---------- Çizim ----------
function draw(
  ctx: CanvasRenderingContext2D,
  play: Play,
  player: Bike,
  bot: Bike,
  mode: "race" | "fake",
) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#02030a";
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.beginPath();
  ctx.rect(play.x, play.y, play.w, play.h);
  ctx.clip();
  ctx.fillStyle = "#04060f";
  ctx.fillRect(play.x, play.y, play.w, play.h);
  ctx.strokeStyle = "rgba(34,211,238,0.12)";
  ctx.lineWidth = 1;
  const step = 44;
  for (let x = play.x; x <= play.x + play.w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, play.y);
    ctx.lineTo(x, play.y + play.h);
    ctx.stroke();
  }
  for (let y = play.y; y <= play.y + play.h; y += step) {
    ctx.beginPath();
    ctx.moveTo(play.x, y);
    ctx.lineTo(play.x + play.w, y);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = mode === "fake" ? RED : CYAN;
  ctx.lineWidth = 3;
  ctx.shadowBlur = 18;
  ctx.shadowColor = mode === "fake" ? RED : CYAN;
  ctx.strokeRect(play.x, play.y, play.w, play.h);
  ctx.restore();

  drawTrail(ctx, bot.trail, RED);
  drawTrail(ctx, player.trail, BLUE);
  drawBike(ctx, bot, RED);
  drawBike(ctx, player, BLUE);
}

function drawTrail(ctx: CanvasRenderingContext2D, trail: Bike["trail"], color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.shadowBlur = 12;
  ctx.shadowColor = color;
  ctx.beginPath();
  let pen = false;
  for (const p of trail) {
    if (p.gap) {
      pen = false;
      continue;
    }
    if (!pen) {
      ctx.moveTo(p.x, p.y);
      pen = true;
    } else ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawBike(ctx: CanvasRenderingContext2D, b: Bike, color: string) {
  // Kalkan halkası
  if (b.shield > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(b.x, b.y, 16, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 2;
    ctx.shadowBlur = 16;
    ctx.shadowColor = "#fff";
    ctx.stroke();
    ctx.restore();
  }
  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(b.dir);
  const s = b.air > 0 ? 1.6 : 1;
  ctx.scale(s, s);
  ctx.shadowBlur = b.air > 0 ? 22 : 14;
  ctx.shadowColor = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(11, 0);
  ctx.lineTo(-7, -6);
  ctx.lineTo(-4, 0);
  ctx.lineTo(-7, 6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
