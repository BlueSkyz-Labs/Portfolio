import type { Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./so-tro-tokens.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  colorScheme: "light dark",
};

export default function SoTroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${beVietnamPro.variable} ${beVietnamPro.className}`}>
      {children}
    </div>
  );
}
