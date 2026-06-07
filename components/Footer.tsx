"use client";

import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border px-5 py-10 sm:px-8">
      {/* Western çöl silüeti */}
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        aria-hidden
        className="pointer-events-none absolute -top-[1px] left-0 h-8 w-full text-accent-2/30"
      >
        {/* tepeler */}
        <path
          fill="currentColor"
          d="M0,80 L0,55 Q120,30 240,50 T480,45 Q620,25 760,48 T1040,42 Q1130,52 1200,48 L1200,80 Z"
        />
        {/* kaktüsler */}
        <g fill="currentColor">
          <path d="M150,80 v-22 a6,6 0 0 1 12,0 v22 z M150,66 h-8 a4,4 0 0 0 -4,4 v6 a4,4 0 0 0 8,0 v-6 M162,62 h8 a4,4 0 0 1 4,4 v9 a4,4 0 0 1 -8,0 v-9" />
          <path d="M860,80 v-16 a5,5 0 0 1 10,0 v16 z M860,70 h-6 a3,3 0 0 0 -3,3 v5 a3,3 0 0 0 6,0 v-5" />
        </g>
      </svg>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p>
          © {year} {profile.name}. {t("rights")}
        </p>
        <p className="font-mono text-xs">{t("builtWith")}</p>
      </div>
      <p className="mx-auto mt-4 max-w-6xl text-center font-mono text-[10px] leading-relaxed text-muted/60">
        Music: “Maple Leaf Rag” by Scott Joplin (public domain) ·{" "}
        <a
          href="https://archive.org/details/kosmorider-night"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-foreground"
        >
          “Kosmorider Night” by Kosmorider
        </a>{" "}
        (CC BY 4.0)
      </p>
    </footer>
  );
}
