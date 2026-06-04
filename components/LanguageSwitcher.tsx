"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

// TR / EN arasında geçiş yapan küçük segment kontrolü
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: "tr" | "en") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className="glass inline-flex items-center rounded-full p-0.5 text-xs font-medium"
      aria-label="Language switcher"
      data-pending={isPending}
    >
      {(["tr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-3 py-1 uppercase tracking-wider transition-colors ${
            locale === l
              ? "bg-gradient-accent text-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
