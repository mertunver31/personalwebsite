"use client";

import dynamic from "next/dynamic";

// Kritik olmayan (ekranın görünür içeriği olmayan) widget'lar ilk hidrasyondan
// çıkarılır; ayrı chunk olarak yüklenir. Mobil TBT'yi düşürür, skoru stabilize eder.
const LightPull = dynamic(() => import("./LightPull").then((m) => m.LightPull), {
  ssr: false,
});
const MusicBox = dynamic(() => import("./MusicBox").then((m) => m.MusicBox), {
  ssr: false,
});
const ContactOrb = dynamic(
  () => import("./ContactOrb").then((m) => m.ContactOrb),
  { ssr: false },
);
const CustomScrollbar = dynamic(
  () => import("./CustomScrollbar").then((m) => m.CustomScrollbar),
  { ssr: false },
);
const NeonGrid = dynamic(() => import("./NeonGrid").then((m) => m.NeonGrid), {
  ssr: false,
});
const Tumbleweed = dynamic(
  () => import("./Tumbleweed").then((m) => m.Tumbleweed),
  { ssr: false },
);

export function ClientWidgets() {
  return (
    <>
      <LightPull />
      <MusicBox />
      <ContactOrb />
      <CustomScrollbar />
      <NeonGrid />
      <Tumbleweed />
    </>
  );
}
