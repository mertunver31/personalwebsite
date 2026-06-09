import { useSyncExternalStore } from "react";

// Mobil kırılım noktası — globals.css içindeki @media (max-width: 640px) ile uyumlu.
const QUERY = "(max-width: 640px)";

function subscribe(cb: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

function getSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

// SSR/hidrasyon: masaüstü (false) varsay — hidrasyon uyuşmazlığını önler,
// mobilde ilk efektten sonra gerçek değere geçer.
function getServerSnapshot() {
  return false;
}

/** Ekran <= 640px ise true döner. SSR-güvenli, matchMedia değişimlerini dinler. */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
