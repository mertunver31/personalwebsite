"use client";

import { useEffect, useRef, useState } from "react";
import { useLights } from "./lightStore";

/**
 * Özel kaydırma çubuğu. Native scrollbar globals.css'te gizlenir; burada
 * hareketli çok-renkli gradyanlı bir thumb çizilir (western ↔ neon farklı renk).
 * Sürüklenebilir; oyun sırasında (scroll kilitliyken) gizlenir.
 */
export function CustomScrollbar() {
  const { on } = useLights();
  const [m, setM] = useState({ h: 0, top: 0, show: false });
  const dragRef = useRef<{ startY: number; startScroll: number } | null>(null);

  useEffect(() => {
    const update = () => {
      const sh = document.documentElement.scrollHeight;
      const ch = window.innerHeight;
      if (sh <= ch + 4) {
        setM((p) => (p.show ? { ...p, show: false } : p));
        return;
      }
      const thumbH = Math.max(44, (ch / sh) * ch);
      const top = (window.scrollY / (sh - ch)) * (ch - thumbH);
      setM({ h: thumbH, top, show: true });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const sh = document.documentElement.scrollHeight;
      const ch = window.innerHeight;
      const thumbH = Math.max(44, (ch / sh) * ch);
      const ratio = (sh - ch) / (ch - thumbH);
      window.scrollTo({ top: d.startScroll + (e.clientY - d.startY) * ratio });
    };
    const onUp = () => {
      dragRef.current = null;
      document.body.style.userSelect = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  if (!m.show) return null;

  return (
    <div className="pointer-events-none fixed right-0 top-0 z-[60] hidden h-screen w-2.5 sm:block">
      <div
        className={`cscroll-thumb pointer-events-auto absolute right-[2px] w-1.5 cursor-pointer rounded-full ${on ? "is-western" : "is-neon"}`}
        style={{ height: m.h, top: m.top, touchAction: "none" }}
        onPointerDown={(e) => {
          dragRef.current = { startY: e.clientY, startScroll: window.scrollY };
          document.body.style.userSelect = "none";
        }}
      />
    </div>
  );
}
