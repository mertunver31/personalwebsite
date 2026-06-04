"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { profile } from "@/content/profile";

const sections = ["about", "skills", "projects", "experience", "contact"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled ? "glass mx-3 shadow-lg shadow-black/20 sm:mx-auto" : ""
        }`}
      >
        <a
          href="#top"
          className="bg-gradient-accent grid h-9 w-9 place-items-center rounded-xl text-sm font-bold text-white"
          aria-label="Home"
        >
          {initials || "·"}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              {t(s)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            className="grid h-9 w-9 place-items-center rounded-xl text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass mx-3 mt-2 flex flex-col gap-1 rounded-2xl p-2 md:hidden">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {t(s)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
