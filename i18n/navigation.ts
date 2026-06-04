import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Dil farkındalıklı Link / router yardımcıları
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
