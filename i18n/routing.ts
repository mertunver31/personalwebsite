import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Sitenin desteklediği diller
  locales: ["tr", "en"],
  // Varsayılan dil
  defaultLocale: "tr",
});
