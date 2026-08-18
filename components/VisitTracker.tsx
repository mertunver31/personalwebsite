"use client";

import { useEffect } from "react";

// Oturum başına bir kez, görünmez bir beacon ile /api/track'i tetikler.
// Hiçbir görsel/çıktı yok; IP/konum sunucu tarafında okunur.
export function VisitTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("v")) return;
      sessionStorage.setItem("v", "1");
      const payload = JSON.stringify({
        path: location.pathname,
        lang: navigator.language,
        ref: document.referrer || "",
        screen: `${window.innerWidth}x${window.innerHeight}`,
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/track",
          new Blob([payload], { type: "application/json" }),
        );
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      /* yoksay */
    }
  }, []);

  return null;
}
