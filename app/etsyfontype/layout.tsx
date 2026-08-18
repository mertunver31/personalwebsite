import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "./fonts.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Morrovia Jewelry Necklace Font Previewer",
  description: "Custom font preview tool for name necklaces.",
};

export default function EtsyFontypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="relative min-h-full bg-[#0a0a0c] text-[#f4e7cf] font-sans antialiased overflow-x-hidden">
        {/* We do NOT include Background, ClientWidgets, Navbar, or Footer to keep it 100% clean and isolated */}
        {children}
      </body>
    </html>
  );
}
