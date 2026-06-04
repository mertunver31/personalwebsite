"use client";

import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p>
          © {year} {profile.name}. {t("rights")}
        </p>
        <p className="font-mono text-xs">{t("builtWith")}</p>
      </div>
    </footer>
  );
}
