import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/**
 * Pofu yasal sayfalarının ortak kabuğu.
 *
 * `[locale]` yönlendirmesinin dışında duruyor: Play Console'a verilen gizlilik
 * politikası adresi dil öneki almadan sabit kalsın diye (bkz. proxy.ts
 * matcher'ı). Sayfalar bunu kendi root layout'larından çağırıyor, böylece
 * `lang` her dilde doğru oluyor.
 */
export function PolicyShell({
  lang,
  children,
}: {
  lang: "tr" | "en";
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}
