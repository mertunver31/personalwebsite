"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLights } from "./lightStore";

const JAZZ = { title: "Maple Leaf Rag", year: "S. Joplin" };
const EDM = { title: "Kosmorider Night", tag: "SYNTHWAVE" };

/**
 * Sol alt köşede kalıcı müzik kutusu. İki formu vardır:
 *  - Işıklar açık: 1900'ler barı tarzı ahşap JUKEBOX (CC0 caz, lounge.mp3)
 *  - Işıklar kapalı (neon): dark-neon EDM RAVE deck (CC-BY synthwave, neon.mp3)
 * Form ışık durumuna göre otomatik değişir; müzikler de geçiş yapar.
 */
export function MusicBox() {
  const t = useTranslations("music");
  const { on } = useLights();

  const jazzRef = useRef<HTMLAudioElement>(null);
  const edmRef = useRef<HTMLAudioElement>(null);
  // Tek kaynak: müzik çalsın mı? Varsayılan AÇIK. Mod geçişlerinde korunur.
  const [musicOn, setMusicOn] = useState(true);
  // Gerçekten çalıyor mu (animasyonları yalnız o zaman oynat — perf)
  const [isPlaying, setIsPlaying] = useState(false);
  const onRef = useRef(on);
  const musicOnRef = useRef(musicOn);
  useEffect(() => {
    onRef.current = on;
  }, [on]);
  useEffect(() => {
    musicOnRef.current = musicOn;
  }, [musicOn]);

  // Tercihi geri yükle (kayıt yoksa varsayılan açık)
  useEffect(() => {
    if (sessionStorage.getItem("music") === "off") setMusicOn(false);
  }, []);

  // Gerçek çalma durumunu izle (animasyonları yalnız çalarken oynatmak için)
  useEffect(() => {
    const j = jazzRef.current;
    const e = edmRef.current;
    const upd = () =>
      setIsPlaying(!!((j && !j.paused) || (e && !e.paused)));
    const els = [j, e];
    els.forEach((a) => {
      a?.addEventListener("play", upd);
      a?.addEventListener("pause", upd);
      a?.addEventListener("ended", upd);
    });
    return () =>
      els.forEach((a) => {
        a?.removeEventListener("play", upd);
        a?.removeEventListener("pause", upd);
        a?.removeEventListener("ended", upd);
      });
  }, []);

  // Çalmayı (musicOn, on) durumuna senkronla: western=caz, neon=EDM
  useEffect(() => {
    const jazz = jazzRef.current;
    const edm = edmRef.current;
    if (!jazz || !edm) return;
    const target = on ? jazz : edm;
    const other = on ? edm : jazz;
    other.pause();
    if (!musicOn) {
      target.pause();
      return;
    }
    // neon'a geçerken flicker bitsin diye kısa gecikme; western'de anında
    const delay = on ? 0 : 1200;
    const id = window.setTimeout(() => {
      target.play().catch(() => {});
    }, delay);
    return () => clearTimeout(id);
  }, [musicOn, on]);

  // Tarayıcı autoplay'i engellerse: SAYFADAKİ İLK etkileşimde (her yerde) başlat.
  // (Tarayıcılar etkileşim öncesi sesli oynatmaya izin vermez; bu en erken andır.)
  useEffect(() => {
    const events = ["pointerdown", "touchstart", "mousedown", "keydown", "click"];
    const opts: AddEventListenerOptions = { capture: true };
    const remove = () =>
      events.forEach((e) => window.removeEventListener(e, tryStart, opts));
    const tryStart = (e: Event) => {
      if (!musicOnRef.current) {
        remove();
        return;
      }
      // Müzik kutusuna tıklamayı butona bırak (toggle); diğer her etkileşim başlatır
      const el = e.target as HTMLElement | null;
      if (el && el.closest("[data-music-box]")) return;
      const target = onRef.current ? jazzRef.current : edmRef.current;
      target
        ?.play()
        .then(remove)
        .catch(() => {});
    };
    events.forEach((e) => window.addEventListener(e, tryStart, opts));
    return remove;
  }, []);

  const toggle = () => {
    const target = on ? jazzRef.current : edmRef.current;
    // Açık ama (autoplay engeli yüzünden) sessizse: kapatma, başlat
    if (musicOn && target && target.paused) {
      target.play().catch(() => {});
      return;
    }
    setMusicOn((v) => {
      const next = !v;
      sessionStorage.setItem("music", next ? "on" : "off");
      return next;
    });
  };

  return (
    <>
      {/* Masaüstü: köşe müzik kutusu (sm ve üzeri) */}
      <div className="fixed bottom-6 left-6 z-[97] hidden sm:block" data-music-box>
        <AnimatePresence mode="wait">
        {on ? (
          // ============ JUKEBOX (ışıklar açık) ============
          <motion.div
            key="jukebox"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className={`juke ${isPlaying ? "playing" : ""} relative w-[150px] select-none sm:w-[168px]`}
            style={{
              background:
                "linear-gradient(180deg,#6b4226 0%,#5a3620 18%,#4a2c1a 60%,#3a2113 100%)",
              borderRadius: "84px 84px 16px 16px / 64px 64px 16px 16px",
              padding: "14px 14px 12px",
              boxShadow:
                "0 18px 40px -12px rgba(0,0,0,0.75), inset 0 2px 3px rgba(255,210,150,0.25), inset 0 -10px 20px rgba(0,0,0,0.5)",
              border: "1px solid rgba(0,0,0,0.45)",
            }}
          >
            <span
              className="juke-tube pointer-events-none absolute left-[10px] top-[16px] h-[120px] w-[8px] rounded-full"
              style={{
                background:
                  "repeating-linear-gradient(0deg,#ffcf4d 0,#ff7a18 10px,#ff2d55 20px,#ff7a18 30px,#ffcf4d 38px)",
                boxShadow: "0 0 8px #ff8a2a, inset 0 0 4px rgba(255,255,255,0.6)",
                opacity: 0.92,
              }}
            />
            <span
              className="juke-tube pointer-events-none absolute right-[10px] top-[16px] h-[120px] w-[8px] rounded-full"
              style={{
                background:
                  "repeating-linear-gradient(0deg,#ffcf4d 0,#ff7a18 10px,#ff2d55 20px,#ff7a18 30px,#ffcf4d 38px)",
                boxShadow: "0 0 8px #ff8a2a, inset 0 0 4px rgba(255,255,255,0.6)",
                opacity: 0.92,
              }}
            />

            <div
              className="relative mx-auto mt-1 flex h-[78px] w-[112px] flex-col items-center justify-center gap-1 overflow-hidden rounded-[14px]"
              style={{
                background:
                  "radial-gradient(circle at 50% 35%, #2a1a3a 0%, #150c22 70%, #0a0612 100%)",
                border: "2px solid #2c1c10",
                boxShadow:
                  "inset 0 0 14px rgba(0,0,0,0.8), 0 0 10px rgba(255,150,60,0.15)",
              }}
            >
              <div
                className="juke-disc relative h-9 w-9 rounded-full"
                style={{
                  background:
                    "repeating-radial-gradient(circle at 50% 50%, #111 0 1px, #1c1c1c 1px 2px)",
                  boxShadow: "0 0 0 1px #000, 0 2px 4px rgba(0,0,0,0.6)",
                }}
              >
                <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d7a44a]" />
                <span className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a1208]" />
              </div>
              <p
                className="px-1 text-center font-display text-[9px] font-semibold leading-tight"
                style={{
                  color: "#ffcf8a",
                  textShadow: "0 0 6px rgba(255,180,80,0.6)",
                }}
              >
                {JAZZ.title}
                <span className="block text-[7px] font-normal text-[#caa06a]">
                  {t("nowPlaying")} · {JAZZ.year}
                </span>
              </p>
            </div>

            <div
              className="relative mx-auto mt-2.5 flex h-9 w-[118px] items-end justify-center gap-[3px] overflow-hidden rounded-[8px] px-2 pb-1.5"
              style={{
                background:
                  "repeating-linear-gradient(0deg,#caa46a 0 2px,#7a5a30 2px 4px)",
                border: "2px solid #3a2614",
                boxShadow: "inset 0 0 8px rgba(0,0,0,0.6)",
              }}
            >
              <div className="juke-eq flex h-full items-end gap-[3px]">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <i
                    key={i}
                    className="block w-[3px] origin-bottom rounded-sm"
                    style={{
                      height: "100%",
                      background:
                        "linear-gradient(180deg,#ffd66b,#ff8a2a 60%,#ff3b30)",
                      animationDelay: `${i * 0.12}s`,
                      boxShadow: "0 0 4px rgba(255,140,40,0.7)",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center">
              <button
                type="button"
                onClick={toggle}
                aria-pressed={isPlaying}
                aria-label={isPlaying ? t("pause") : t("play")}
                className="grid h-11 w-11 place-items-center rounded-full transition-transform active:scale-95"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #ffe9a8 0%, #e0b257 35%, #9c6f24 75%, #6e4d18 100%)",
                  boxShadow:
                    "0 3px 6px rgba(0,0,0,0.55), inset 0 1px 2px rgba(255,255,255,0.7), inset 0 -3px 5px rgba(0,0,0,0.4)",
                  border: "1px solid #5a3f15",
                }}
              >
                {isPlaying ? (
                  <Pause size={18} className="text-[#3a2710]" fill="#3a2710" />
                ) : (
                  <Play
                    size={18}
                    className="ml-0.5 text-[#3a2710]"
                    fill="#3a2710"
                  />
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          // ============ RAVE DECK (ışıklar kapalı / neon) ============
          <motion.div
            key="rave"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className={`rave ${isPlaying ? "playing" : ""} relative w-[176px] select-none rounded-2xl border p-3`}
            style={{
              background:
                "linear-gradient(160deg,#0a0a16 0%,#060610 60%,#03030a 100%)",
            }}
          >
            {/* Üst etiket */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: "#ec4899",
                    boxShadow: "0 0 8px #ec4899, 0 0 14px #ec4899",
                  }}
                />
                <span
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: "#22d3ee", textShadow: "0 0 8px #22d3ee" }}
                >
                  RAVE
                </span>
              </div>
              <span
                className="font-mono text-[8px] uppercase tracking-[0.2em]"
                style={{ color: "#a78bfa", textShadow: "0 0 8px #8b5cf6" }}
              >
                {EDM.tag}
              </span>
            </div>

            {/* Kayan neon parça adı */}
            <div className="mb-2 overflow-hidden rounded-md border border-white/5 bg-black/50 py-1.5">
              <div className="rave-marquee flex w-max whitespace-nowrap">
                {[0, 1].map((k) => (
                  <span
                    key={k}
                    className="rave-title px-3 font-mono text-[11px] font-bold uppercase tracking-[0.15em]"
                    style={{
                      color: "#f0abfc",
                      textShadow: "0 0 8px #ec4899, 0 0 16px #8b5cf6",
                    }}
                  >
                    ▶ {EDM.title} · {EDM.tag} &nbsp;&nbsp;
                  </span>
                ))}
              </div>
            </div>

            {/* Neon ekolayzer */}
            <div className="rave-eq mb-3 flex h-12 items-end justify-center gap-[3px] rounded-md border border-white/5 bg-black/40 px-2 pb-1">
              {Array.from({ length: 11 }).map((_, i) => (
                <i
                  key={i}
                  className="block w-[4px] origin-bottom rounded-sm"
                  style={{
                    height: "100%",
                    background:
                      "linear-gradient(180deg,#22d3ee,#8b5cf6 55%,#ec4899)",
                    animationDelay: `${(i % 6) * 0.09}s`,
                    boxShadow: "0 0 6px rgba(34,211,238,0.7)",
                  }}
                />
              ))}
            </div>

            {/* Neon aç/kapa butonu */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={toggle}
                aria-pressed={isPlaying}
                aria-label={isPlaying ? t("pause") : t("play")}
                className="grid h-11 w-11 place-items-center rounded-full border transition-transform active:scale-95"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(34,211,238,0.25), rgba(0,0,0,0.6) 70%)",
                  borderColor: "#22d3ee",
                  boxShadow:
                    "0 0 14px rgba(34,211,238,0.7), inset 0 0 12px rgba(236,72,153,0.4)",
                }}
              >
                {isPlaying ? (
                  <Pause size={18} className="text-[#eafdff]" fill="#22d3ee" />
                ) : (
                  <Play
                    size={18}
                    className="ml-0.5 text-[#eafdff]"
                    fill="#22d3ee"
                  />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Mobil: sayfanın altında şeffaf Spotify-vari müzik barı (sm altı) */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[97] flex h-14 items-end justify-center sm:hidden" data-music-box>
        {/* Ekolayzer barları — tüm genişlik, şeffaf */}
        <div className="flex h-9 w-full items-end justify-between gap-[1px] px-3 pb-1">
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              className="origin-bottom rounded-sm"
              style={{
                width: 3,
                height: "100%",
                background: on
                  ? "linear-gradient(180deg,#f6d68a,#e0a23a 55%,#c2532a)"
                  : "linear-gradient(180deg,#22d3ee,#8b5cf6 55%,#ec4899)",
                opacity: 0.8,
                boxShadow: on
                  ? "0 0 5px rgba(224,162,58,0.6)"
                  : "0 0 6px rgba(34,211,238,0.7)",
                animation: "rave-eq 0.75s ease-in-out infinite",
                animationDelay: `${(i % 7) * 0.08}s`,
                animationPlayState: isPlaying ? "running" : "paused",
              }}
            />
          ))}
        </div>

        {/* Ortada aç/kapa butonu */}
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? t("pause") : t("play")}
          className="pointer-events-auto absolute bottom-2.5 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border backdrop-blur-sm transition-transform active:scale-95"
          style={
            on
              ? {
                  background:
                    "radial-gradient(circle at 38% 30%, rgba(246,214,138,0.95), rgba(154,111,36,0.9) 70%)",
                  borderColor: "#e6b454",
                  boxShadow: "0 0 14px rgba(224,162,58,0.55)",
                }
              : {
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(34,211,238,0.4), rgba(0,0,0,0.6) 70%)",
                  borderColor: "#22d3ee",
                  boxShadow:
                    "0 0 14px rgba(34,211,238,0.7), inset 0 0 10px rgba(236,72,153,0.4)",
                }
          }
        >
          {isPlaying ? (
            <Pause
              size={18}
              className={on ? "text-[#3a2710]" : "text-[#eafdff]"}
              fill={on ? "#3a2710" : "#22d3ee"}
            />
          ) : (
            <Play
              size={18}
              className={on ? "ml-0.5 text-[#3a2710]" : "ml-0.5 text-[#eafdff]"}
              fill={on ? "#3a2710" : "#22d3ee"}
            />
          )}
        </button>
      </div>

      {/* İki ses kaynağı her zaman DOM'da kalır (pozisyon korunur) */}
      <audio ref={jazzRef} src="/music/saloon.mp3" loop preload="none" />
      <audio ref={edmRef} src="/music/neon.mp3" loop preload="none" />
    </>
  );
}
