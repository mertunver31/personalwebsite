"use client";

import React, { useState, useEffect } from "react";
import {
  Sliders,
  Type,
  ChevronLeft,
  ChevronRight,
  Heart
} from "lucide-react";

// The 20 fonts matching the user's exact names and fallback cases
const FONTS = [
  { id: 1, name: "Font 1: Magnolia Script", family: "'Magnolia Script', cursive" },
  { id: 2, name: "Font 2: Intro Script", family: "'Intro Script', cursive" },
  { id: 3, name: "Font 3: Script MT Bold", family: "'Script MT Bold', cursive" },
  { id: 4, name: "Font 4: GeoSlab703 Md BT", family: "'GeoSlab703 Md BT', serif" },
  { id: 5, name: "Font 5: Birds of Paradise", family: "'Birds of Paradise', cursive" },
  { id: 6, name: "Font 6: smoothy cursive", family: "'smoothy cursive', 'Smoothy Cursive', cursive" },
  { id: 7, name: "Font 7: Lucida calligraphy", family: "'Lucida calligraphy', 'Lucida Calligraphy', cursive" },
  { id: 8, name: "Font 8: Monotype Corsiva", family: "'Monotype Corsiva', cursive" },
  { id: 9, name: "Font 9: Impact", family: "Impact, sans-serif" },
  { id: 10, name: "Font 10: Lakesight", family: "'Lakesight', cursive" },
  { id: 11, name: "Font 11: La portenia de la recoleta", family: "'La portenia de la recoleta', 'La Portenia de la Recoleta', cursive" },
  { id: 12, name: "Font 12: Amorinda", family: "'Amorinda', cursive" },
  { id: 13, name: "Font 13: Austein Script", family: "'Austein Script', cursive" },
  { id: 14, name: "Font 14: canterbury gothic", family: "'canterbury gothic', 'Canterbury Gothic', serif" },
  { id: 15, name: "Font 15: Hobo BT", family: "'Hobo BT', sans-serif" },
  { id: 16, name: "Font 16: Atatürk", family: "'Atatürk', 'Ataturk', cursive" },
  { id: 17, name: "Font 17: Dancing Script", family: "'Dancing Script', cursive" },
  { id: 18, name: "Font 18: Autumn Chant", family: "'Autumn Chant', cursive" },
  { id: 19, name: "Font 19: Angelface", family: "'Angelface', cursive" },
  { id: 20, name: "Font 20: Sauber Script", family: "'Sauber Script', cursive" }
];

// Materials mapping with realistic CSS styles
const MATERIALS = [
  {
    id: "gold",
    name: "24K Gold Plated",
    color: "#fdb933",
    gradientClass: "gold-metallic",
    chainColor: "from-[#967009] via-[#fedb37] to-[#967009]"
  },
  {
    id: "silver",
    name: "925 Sterling Silver",
    color: "#ffffff",
    gradientClass: "silver-metallic",
    chainColor: "from-[#8c8c8c] via-[#ffffff] to-[#8c8c8c]"
  },
  {
    id: "rose",
    name: "Rose Gold Plated",
    color: "#f3a183",
    gradientClass: "rose-metallic",
    chainColor: "from-[#b2584d] via-[#f3a183] to-[#b2584d]"
  }
];

// Display backgrounds for visualization
const BACKGROUNDS = [
  { id: "dark-velvet", name: "Dark Velvet", class: "bg-[#0b0a0f] border-purple-950/20" },
  { id: "light-silk", name: "Light Silk", class: "bg-[#f5ebd6] text-[#211710] border-[#e0a23a]/10" },
  { id: "skin-tone", name: "Skin Display", class: "bg-[#e5b291] text-[#2d1b10] border-[#965830]/15" },
  { id: "burgundy-velvet", name: "Burgundy Velvet", class: "bg-[#330010] border-[#ff0040]/10" }
];

export default function EtsyFontypePage() {
  const [text, setText] = useState("Sophia");
  const [selectedMaterial, setSelectedMaterial] = useState("gold");
  const [fontSize] = useState(48);
  const [bgContrast] = useState("dark-velvet");
  const [visualizerFontId, setVisualizerFontId] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentFont = FONTS.find((f) => f.id === visualizerFontId) || FONTS[0];
  const currentMaterial = MATERIALS.find((m) => m.id === selectedMaterial) || MATERIALS[0];
  const currentBg = BACKGROUNDS.find((b) => b.id === bgContrast) || BACKGROUNDS[0];

  const handleNextFont = () => {
    setVisualizerFontId((prev) => (prev < 20 ? prev + 1 : 1));
  };

  const handlePrevFont = () => {
    setVisualizerFontId((prev) => (prev > 1 ? prev - 1 : 20));
  };

  return (
    <div className="min-h-screen pb-16 pt-8 px-4 md:px-8 bg-[#0a0a0c] text-[#f4e7cf] selection:bg-[#c2532a]">
      {/* Metallic Gradient Styles */}
      <style jsx global>{`
        .gold-metallic {
          background: linear-gradient(135deg, #fedb37 0%, #fdb933 25%, #d1a12c 50%, #fdb933 75%, #fedb37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 1px rgba(150, 112, 9, 0.5));
        }
        .silver-metallic {
          background: linear-gradient(135deg, #e6e6e6 0%, #ffffff 25%, #adadad 50%, #ffffff 75%, #e6e6e6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 1px rgba(140, 140, 140, 0.5));
        }
        .rose-metallic {
          background: linear-gradient(135deg, #f3a183 0%, #ec6f66 25%, #cf7b70 50%, #ec6f66 75%, #f3a183 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 1px rgba(178, 88, 77, 0.5));
        }
      `}</style>

      {/* Redesigned Standalone Header with Shop Logo */}
      <header className="max-w-6xl mx-auto text-center mb-10 flex flex-col items-center">
        {/* Brand Logo with golden glow */}
        <div className="relative mb-5 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#e0a23a] via-[#c2532a] to-[#e0a23a] rounded-full blur opacity-45 group-hover:opacity-75 transition duration-700"></div>
          <img
            src="/morrovia-logo.png"
            alt="Morrovia Jewelry Logo"
            className="relative w-24 h-24 object-cover rounded-full border-2 border-[#e0a23a]/40 bg-[#0d0d11] shadow-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Brand Badge (without Sparkles icon) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#160f08] border border-[#e0a23a]/25 mb-4 shadow-lg shadow-[#e0a23a]/5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#e0a23a]">Morrovia Jewelry</span>
        </div>

        {/* Title & Description */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#e5d4bc] mb-3 font-serif">
          Font &amp; Necklace Visualizer
        </h1>
        <p className="text-sm md:text-base text-[#bfa57f] max-w-xl mx-auto leading-relaxed">
          Type your name, select the material, and see a live preview of your custom necklace.
        </p>
      </header>

      {/* Main Interactive Panel in 2-Column Layout */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Controls Column (Left Side) */}
        <div className="lg:col-span-4 flex flex-col gap-6 p-6 rounded-2xl bg-[#131317] border border-[#e0a23a]/12 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-[#e0a23a]/10 pb-3">
            <Sliders className="w-5 h-5 text-[#e0a23a]" />
            <h2 className="text-lg font-semibold text-[#e5d4bc]">Controls</h2>
          </div>

          {/* Text Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider text-[#bfa57f] font-semibold flex justify-between">
              <span>Name</span>
              <span className="text-[10px] text-[#bfa57f]/60">{text.length}/20 Characters</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 20))}
                placeholder="e.g. Sophia"
                className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-[#e0a23a]/20 focus:border-[#e0a23a] focus:ring-1 focus:ring-[#e0a23a] text-[#f4e7cf] placeholder-[#bfa57f]/40 font-medium transition-all"
              />
              {text && (
                <button
                  onClick={() => setText("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#bfa57f]/60 hover:text-[#e0a23a]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Metal Color / Material Selector */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs uppercase tracking-wider text-[#bfa57f] font-semibold">
              Material Color
            </label>
            <div className="grid grid-cols-3 gap-2">
              {MATERIALS.map((material) => (
                <button
                  key={material.id}
                  onClick={() => setSelectedMaterial(material.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    selectedMaterial === material.id
                      ? "border-[#e0a23a] bg-[#1d1b17] shadow-lg"
                      : "border-[#e0a23a]/10 bg-[#09090b] hover:border-[#e0a23a]/40"
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-black/30 mb-2 shadow-inner"
                    style={{
                      background:
                        material.id === "gold"
                          ? "radial-gradient(circle, #fdb933 0%, #967009 100%)"
                          : material.id === "silver"
                          ? "radial-gradient(circle, #ffffff 0%, #8c8c8c 100%)"
                          : "radial-gradient(circle, #f3a183 0%, #b2584d 100%)"
                    }}
                  />
                  <span className="text-[10px] font-bold text-[#e5d4bc] leading-tight">
                    {material.id === "gold" ? "GOLD" : material.id === "silver" ? "SILVER" : "ROSE GOLD"}
                  </span>
                  <span className="text-[8px] text-[#bfa57f]/75 mt-0.5 leading-none">
                    {material.id === "gold" ? "Gold" : material.id === "silver" ? "Silver" : "Rose Gold"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visualizer Display Column (Right Side) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Main Necklace Visualizer Container */}
          <div
            className={`relative flex flex-col items-center justify-center py-28 px-6 border rounded-2xl overflow-hidden transition-all shadow-inner select-none ${currentBg.class}`}
            style={{ minHeight: "380px" }}
          >
            {/* Visualizer Background Grid / Velvet texture (SVG overlays) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]"></div>

            {/* Hanger / Chain Attachment Points (SVG Lines) */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Left Chain */}
                <line
                  x1="0"
                  y1="0"
                  x2="50%"
                  y2="50%"
                  stroke={currentMaterial.color}
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  opacity="0.65"
                  className="origin-left"
                  transform="translate(-60, -10)"
                />
                {/* Right Chain */}
                <line
                  x1="100%"
                  y1="0"
                  x2="50%"
                  y2="50%"
                  stroke={currentMaterial.color}
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  opacity="0.65"
                  transform="translate(60, -10)"
                />
                {/* Left Chain Attachment O-Ring */}
                <circle cx="calc(50% - 60px)" cy="calc(50% - 10px)" r="4" fill="none" stroke={currentMaterial.color} strokeWidth="2" />
                {/* Right Chain Attachment O-Ring */}
                <circle cx="calc(50% + 60px)" cy="calc(50% - 10px)" r="4" fill="none" stroke={currentMaterial.color} strokeWidth="2" />
              </svg>
            </div>

            {/* Pendant Nameplate (Floating/Glow effect) */}
            <div className="z-10 text-center relative group flex items-center justify-center max-w-full px-6">
              <span
                style={{
                  fontFamily: currentFont.family,
                  fontSize: `${fontSize * 1.25}px`,
                  lineHeight: 1
                }}
                className={`${currentMaterial.gradientClass} select-none transition-all block text-center tracking-wide font-normal max-w-full break-all`}
              >
                {text || "Sophia"}
              </span>
            </div>

            {/* Bottom hanger tag label */}
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border pointer-events-none select-none ${
              bgContrast === "light-silk" 
                ? "bg-[#211710]/5 border-[#211710]/10 text-[#211710]/70" 
                : "bg-black/30 border-white/5 text-[#bfa57f]/70"
            }`}>
              {currentFont.name} &bull; {currentMaterial.name}
            </div>
          </div>

          {/* Selector Controls for Font Navigation */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 rounded-xl bg-[#131317] border border-[#e0a23a]/12">
            {/* Font Switcher Dropdown */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-xs font-semibold text-[#bfa57f] whitespace-nowrap">Font:</span>
              <select
                value={visualizerFontId}
                onChange={(e) => setVisualizerFontId(Number(e.target.value))}
                className="flex-1 md:w-[260px] px-3 py-2 rounded-lg bg-[#09090b] border border-[#e0a23a]/20 text-xs font-bold text-[#e5d4bc] focus:border-[#e0a23a] outline-none cursor-pointer"
              >
                {FONTS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Navigator Buttons */}
            <div className="flex gap-2 w-full md:w-auto justify-end">
              <button
                onClick={handlePrevFont}
                className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#09090b] hover:bg-[#e0a23a]/10 border border-[#e0a23a]/20 text-xs font-bold text-[#e5d4bc] transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev Font
              </button>
              <button
                onClick={handleNextFont}
                className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#09090b] hover:bg-[#e0a23a]/10 border border-[#e0a23a]/20 text-xs font-bold text-[#e5d4bc] transition-all"
              >
                Next Font
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Font List / Guide table */}
          <div className="p-6 rounded-2xl bg-[#131317] border border-[#e0a23a]/12 shadow-lg">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#e0a23a] mb-2 flex items-center gap-2">
              <Type className="w-4 h-4" />
              Font Catalog (Quick Select)
            </h3>
            <p className="text-[11px] text-[#bfa57f]/70 mb-4 italic">
              * Note: Please allow 3-4 seconds for the font to load and update when selected for the first time.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              {FONTS.map((font) => (
                <div
                  key={font.id}
                  onClick={() => setVisualizerFontId(font.id)}
                  className={`p-2 rounded border cursor-pointer transition-all flex flex-col ${
                    visualizerFontId === font.id
                      ? "bg-[#e0a23a]/10 border-[#e0a23a]"
                      : "bg-[#09090b] border-[#e0a23a]/5 hover:border-[#e0a23a]/40"
                  }`}
                >
                  <span className="text-[10px] text-[#e0a23a]/70 font-semibold font-mono">Font {font.id}</span>
                  <span className="text-[#e5d4bc] font-medium truncate mt-0.5">{font.name.replace(`Font ${font.id}: `, "")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Standalone Footer */}
      <footer className="max-w-6xl mx-auto text-center border-t border-[#e0a23a]/8 pt-6 mt-12 text-xs text-[#bfa57f]/50 flex justify-center items-center">
        <p className="flex items-center gap-1 justify-center">
          Morrovia Jewelry Necklace Creator &copy; {new Date().getFullYear()} &bull; Made with <Heart className="w-3 h-3 text-[#c2532a] fill-current" /> for jewelry design.
        </p>
      </footer>
    </div>
  );
}
