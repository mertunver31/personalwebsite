"use client";

import { useEffect, useState } from "react";
import { useLights } from "./lightStore";

const CELL = 64; // ızgara hücre boyutu (Background ile uyumlu)

type Weed = {
  id: number;
  axis: "x" | "y";
  pos: number; // x ekseni için top, y ekseni için left (px)
  reverse: boolean;
  size: number;
  dur: number;
  delay: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Karmakarışık dal yumağı — yuvarlanan saman balyası silüeti
function WeedSvg({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="50" cy="50" r="36" opacity="0.45" />
      <ellipse cx="50" cy="50" rx="36" ry="18" opacity="0.6" />
      <ellipse cx="50" cy="50" rx="18" ry="36" opacity="0.6" />
      <ellipse
        cx="50"
        cy="50"
        rx="34"
        ry="20"
        opacity="0.5"
        transform="rotate(45 50 50)"
      />
      <ellipse
        cx="50"
        cy="50"
        rx="34"
        ry="20"
        opacity="0.5"
        transform="rotate(-45 50 50)"
      />
      {/* merkezden geçen dallar */}
      <g opacity="0.75">
        <path d="M14 50 H86" />
        <path d="M50 14 V86" />
        <path d="M22 22 L78 78" />
        <path d="M78 22 L22 78" />
        <path d="M16 38 Q50 50 84 62" />
        <path d="M16 62 Q50 50 84 38" />
        <path d="M38 16 Q50 50 62 84" />
      </g>
    </svg>
  );
}

/**
 * Western mod (ışıklar açık) arka planında, ızgara çizgileri boyunca yuvarlanan
 * saman balyaları. Neon moddaki akan ışıklarla aynı yapıda (çizgilere hizalı,
 * belirli aralıklarla geçen). Işıklar kapalıyken (neon) görünmez.
 */
export function Tumbleweed() {
  const { on } = useLights();
  const [weeds, setWeeds] = useState<Weed[]>([]);

  useEffect(() => {
    const build = () => {
      const rows = Math.max(2, Math.floor(window.innerHeight / CELL));
      const cols = Math.max(2, Math.floor(window.innerWidth / CELL));
      const list: Weed[] = [];
      let id = 0;
      // Her satırda (yatay) — rastgele yön/hız/gecikme
      for (let i = 0; i < 9; i++) {
        list.push({
          id: id++,
          axis: "x",
          pos: Math.round(rand(1, rows - 1)) * CELL - 2,
          reverse: Math.random() < 0.5,
          size: rand(44, 82),
          dur: rand(9, 18),
          delay: rand(0, 9),
        });
      }
      // Her sütunda (dikey) — rastgele yön/hız/gecikme
      for (let i = 0; i < 9; i++) {
        list.push({
          id: id++,
          axis: "y",
          pos: Math.round(rand(1, cols - 1)) * CELL - 2,
          reverse: Math.random() < 0.5,
          size: rand(44, 82),
          dur: rand(9, 18),
          delay: rand(0, 9),
        });
      }
      setWeeds(list);
    };
    build();
    window.addEventListener("resize", build);
    return () => window.removeEventListener("resize", build);
  }, []);

  if (!on) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {weeds.map((w) => {
        const name =
          w.axis === "x"
            ? w.reverse
              ? "tumble-rev"
              : "tumble"
            : w.reverse
              ? "tumble-v-rev"
              : "tumble-v";
        return (
          <span
            key={w.id}
            className={`tumbleweed-el absolute text-[#cda45c] ${w.axis === "y" ? "top-0" : "left-0"}`}
            style={
              {
                ...(w.axis === "y" ? { left: w.pos } : { top: w.pos }),
                animation: `${name} ${w.dur}s linear ${w.delay}s infinite backwards`,
                filter: "drop-shadow(0 0 6px rgba(205,164,92,0.35))",
                opacity: 0.7,
              } as React.CSSProperties
            }
          >
            <WeedSvg size={w.size} />
          </span>
        );
      })}
    </div>
  );
}
