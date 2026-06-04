import type { Localized } from "@/content/types";

export type Locale = "tr" | "en";

// İki dilli bir alandan aktif dile göre metni seçer
export function pick(value: Localized, locale: Locale): string {
  return value[locale] ?? value.tr;
}
