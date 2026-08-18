"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUp, ChevronDown } from "lucide-react";
import { setLightsOn, useLights } from "./lightStore";
import { playFluorescentFlicker } from "./flickerSound";

// İpin dinlenme uzunluğu: ışık açıkken uzun, kapalıyken kısa
const ROPE_SHORT = 60;
const ROPE_LONG = 168;

/**
 * Sağ üstten sarkan ip. Site VARSAYILAN olarak ışıklar AÇIK başlar.
 * İp çekilince: floresan lamba sesiyle yanıp söner, tüm site neon moda geçer
 * ve bir synthwave/EDM parçası çalar. Tekrar çekilince normale döner.
 */
export function LightPull() {
  const t = useTranslations("lightPull");

  // on: ışıklar açık mı (varsayılan açık)
  const [on, setOn] = useState(true);
  const [busy, setBusy] = useState(false);
  // Kullanıcı ipi en az bir kez çekti mi (CTA ipucunu gizlemek için)
  const [pulled, setPulled] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pulled") === "1") setPulled(true);
  }, []);

  const { skillsInView } = useLights();

  const veil = useAnimationControls();

  const y = useMotionValue(0);
  const base = useMotionValue(ROPE_LONG);
  const ropeHeight = useTransform(() => base.get() + 12 + y.get());

  // Oturumda ışık kapalı bırakıldıysa neon modu anında uygula (flicker'sız)
  useEffect(() => {
    if (sessionStorage.getItem("lights") === "off") {
      setOn(false);
    }
  }, []);

  // Işık durumu değişince: ip boyu + global neon-mode sınıfı + yayın
  useEffect(() => {
    const controls = animate(base, on ? ROPE_LONG : ROPE_SHORT, {
      type: "spring",
      stiffness: 140,
      damping: 15,
    });
    document.body.classList.toggle("neon-mode", !on);
    setLightsOn(on);
    return () => controls.stop();
  }, [on, base]);

  const flickerVeil = () =>
    veil.start({
      opacity: [0, 0.92, 0.1, 0.85, 0.18, 0.9, 0.25, 0.8, 0],
      transition: {
        duration: 1.65,
        times: [0, 0.08, 0.18, 0.3, 0.42, 0.58, 0.72, 0.85, 1],
        ease: "easeInOut",
      },
    });

  const toggle = async () => {
    if (busy) return;
    if (!pulled) {
      setPulled(true);
      sessionStorage.setItem("pulled", "1");
    }
    setBusy(true);

    // Floresan lamba sesi (her iki yönde de)
    playFluorescentFlicker();

    if (on) {
      // IŞIKLARI KAPAT -> neon (müziği MusicBox üstlenir)
      await flickerVeil();
      sessionStorage.setItem("lights", "off");
      setOn(false);
    } else {
      // IŞIKLARI AÇ -> normal
      await flickerVeil();
      sessionStorage.setItem("lights", "on");
      setOn(true);
    }

    setBusy(false);
  };

  const handleDragEnd = (_e: unknown, info: PanInfo) => {
    if (info.offset.y > 55) toggle();
    y.set(0);
  };

  return (
    <>
      {/* Geçiş flicker katmanı — sadece anlık parlama/kararma (sonu şeffaf) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[90]"
        initial={{ opacity: 0 }}
        animate={veil}
        style={{ background: "#04040a" }}
      />

      {/* Skills'e gelince ipin altında beliren, ipi gösteren ipucu */}
      {skillsInView && !busy && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-none fixed right-4 top-[210px] z-[101] flex w-24 flex-col items-center gap-1.5 text-center sm:right-10"
        >
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className={on ? "text-accent-2" : "text-accent-3"}
          >
            <ArrowUp size={22} />
          </motion.span>
          <span
            className="font-mono text-[11px] font-medium uppercase leading-tight tracking-[0.15em] text-white/85"
            style={{
              textShadow: on
                ? "0 0 8px var(--accent-2)"
                : "0 0 8px var(--accent-3)",
            }}
          >
            {on ? t("turnOff") : t("turnOn")}
          </span>
        </motion.div>
      )}

      {/* İp + tutamak — her zaman ekranda, sağ üstte; moda göre temalı */}
      <div className="pointer-events-none fixed right-8 top-0 z-[100] h-[420px] w-16 sm:right-14">
        {/* Tavan bağlantısı */}
        <span
          className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full"
          style={{
            background: on ? "#5a3a1c" : "#0a3d47",
            border: on ? "1px solid #e6b454" : "1px solid #22d3ee",
            boxShadow: on ? "none" : "0 0 6px #22d3ee",
          }}
        />

        {/* Kordon */}
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
          style={{
            height: ropeHeight,
            width: on ? 3 : 2,
            background: on
              ? "repeating-linear-gradient(45deg, #b07f48 0 3px, #855b2e 3px 6px)"
              : "linear-gradient(to bottom, rgba(34,211,238,0.15), #22d3ee 55%, #ec4899)",
            boxShadow: on ? "0 0 2px rgba(0,0,0,0.4)" : "0 0 8px #22d3ee",
          }}
        />

        {/* CTA: "İpi Çek" — ilk çekene kadar görünür, dikkat çekici */}
        {!pulled && !busy && (
          <motion.div
            style={{ top: base }}
            className="absolute right-full mr-3 flex -translate-y-1 items-center gap-1.5 whitespace-nowrap"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.span
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                on ? "[font-family:var(--font-western),serif]" : "font-mono"
              }`}
              style={
                on
                  ? {
                      color: "#f6d68a",
                      borderColor: "rgba(224,162,58,0.65)",
                      background: "rgba(30,18,8,0.85)",
                      boxShadow: "0 0 14px rgba(224,162,58,0.4)",
                      textShadow: "0 0 6px rgba(224,162,58,0.6)",
                    }
                  : {
                      color: "#eafdff",
                      borderColor: "#22d3ee",
                      background: "rgba(4,6,14,0.8)",
                      boxShadow:
                        "0 0 14px rgba(34,211,238,0.6), inset 0 0 8px rgba(236,72,153,0.4)",
                      textShadow: "0 0 8px #22d3ee",
                    }
              }
            >
              {t("pull")}
            </motion.span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: on ? "#e0a23a" : "#22d3ee" }}
            >
              <ChevronDown size={22} />
            </motion.span>
          </motion.div>
        )}

        {/* Tutamak (knob) */}
        <motion.button
          type="button"
          aria-label={on ? t("turnOff") : t("turnOn")}
          onClick={toggle}
          drag="y"
          dragConstraints={{ top: 0, bottom: 150 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92, cursor: "grabbing" }}
          style={{ top: base, y }}
          className="pointer-events-auto absolute left-1/2 -ml-4 grid h-8 w-8 cursor-grab place-items-center rounded-full focus:outline-none"
        >
          {on ? (
            // Western: ahşap + pirinç halka, yıldız
            <span
              className="grid h-7 w-7 place-items-center rounded-full text-[11px]"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #d6a866, #8a5c2c 65%, #4a2c12)",
                border: "2px solid #e6b454",
                boxShadow:
                  "0 3px 6px rgba(0,0,0,0.6), 0 0 12px rgba(224,162,58,0.45)",
                color: "#43290f",
              }}
            >
              ★
            </span>
          ) : (
            // Neon: parlayan küre
            <span
              className="grid h-6 w-6 place-items-center rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 40% 32%, #eafdff, #22d3ee 55%, #0a3d47)",
                border: "1.5px solid #ec4899",
                boxShadow: "0 0 12px #22d3ee, 0 0 22px rgba(236,72,153,0.6)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
          )}
          {!busy && (
            <motion.span
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: on
                  ? "rgba(224,162,58,0.7)"
                  : "rgba(34,211,238,0.85)",
              }}
              animate={{ scale: [1, 2], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </motion.button>
      </div>
    </>
  );
}
