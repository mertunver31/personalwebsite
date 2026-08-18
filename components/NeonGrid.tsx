"use client";

import { useMemo } from "react";
import { useLights } from "./lightStore";
import { useIsMobile } from "./useIsMobile";

const CELL = 64; // ızgara hücre boyutu (globals.css ile uyumlu)

type Beam = {
  id: number;
  axis: "x" | "y";
  pos: number; // ızgara çizgisinin px konumu
  reverse: boolean;
  dur: number;
  delay: number;
  hueDur: number;
  hueDelay: number;
  len: number;
};

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function makeBeams(): Beam[] {
  const beams: Beam[] = [];
  let id = 0;
  // Yatay çizgilerde akan ışıklar (sola/sağa)
  for (let i = 0; i < 9; i++) {
    beams.push({
      id: id++,
      axis: "x",
      pos: Math.round(rand(1, 16)) * CELL,
      reverse: Math.random() < 0.5,
      dur: rand(4.5, 9),
      delay: rand(0, 7),
      hueDur: rand(3, 7),
      hueDelay: -rand(0, 6),
      len: rand(120, 220),
    });
  }
  // Dikey çizgilerde akan ışıklar (yukarı/aşağı)
  for (let i = 0; i < 9; i++) {
    beams.push({
      id: id++,
      axis: "y",
      pos: Math.round(rand(1, 26)) * CELL,
      reverse: Math.random() < 0.5,
      dur: rand(4.5, 9),
      delay: rand(0, 7),
      hueDur: rand(3, 7),
      hueDelay: -rand(0, 6),
      len: rand(120, 220),
    });
  }
  return beams;
}

/**
 * Işıklar kapalıyken (neon mod) arka plan: tam karanlık + neon ızgara çizgileri
 * ve bu çizgiler boyunca rastgele yön/aralıkta, renk değiştiren akan ışıklar.
 */
export function NeonGrid() {
  const { on } = useLights();
  const isMobile = useIsMobile();
  const beams = useMemo(() => makeBeams(), []);

  if (on) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Neon ızgara çizgileri */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(34,211,238,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.13) 1px, transparent 1px)",
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      {/* Akan ışık parçaları — mobilde kapalı (sürekli hue-rotate + box-shadow
          repaint'i mobil GPU'yu kasıyordu); statik ızgara mobilde de kalır */}
      {!isMobile &&
        beams.map((b) =>
        b.axis === "x" ? (
          <span
            key={b.id}
            className="neon-beam absolute"
            style={{
              top: b.pos,
              left: 0,
              height: 2,
              width: b.len,
              borderRadius: 2,
              background:
                "linear-gradient(90deg, transparent, #22d3ee 35%, #eafdff 50%, #22d3ee 65%, transparent)",
              boxShadow: "0 0 8px #22d3ee, 0 0 16px rgba(34,211,238,0.7)",
              willChange: "transform, filter",
              animation: `${b.reverse ? "beam-x-rev" : "beam-x"} ${b.dur}s linear ${b.delay}s infinite backwards, beam-hue ${b.hueDur}s linear ${b.hueDelay}s infinite`,
            }}
          />
        ) : (
          <span
            key={b.id}
            className="neon-beam absolute"
            style={{
              left: b.pos,
              top: 0,
              width: 2,
              height: b.len,
              borderRadius: 2,
              background:
                "linear-gradient(180deg, transparent, #22d3ee 35%, #eafdff 50%, #22d3ee 65%, transparent)",
              boxShadow: "0 0 8px #22d3ee, 0 0 16px rgba(34,211,238,0.7)",
              willChange: "transform, filter",
              animation: `${b.reverse ? "beam-y-rev" : "beam-y"} ${b.dur}s linear ${b.delay}s infinite backwards, beam-hue ${b.hueDur}s linear ${b.hueDelay}s infinite`,
            }}
          />
        ),
      )}
    </div>
  );
}
