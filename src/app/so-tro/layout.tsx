import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Link from "next/link";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SITE } from "@/lib/constants";
import { SO_TRO } from "@/lib/so-tro";
import "../globals.css";
import "./so-tro-tokens.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: SO_TRO.title },
  description: SO_TRO.description,
};

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
  const year = new Date().getFullYear();

  return (
    <html
      lang="vi-VN"
      className={`so-tro-root ${beVietnamPro.variable} ${beVietnamPro.className}`}
      suppressHydrationWarning
    >
      <body>
        <MotionProvider>
          <div id="so-tro">
            <header className="so-tro-shell-header">
              <Link href={SO_TRO.href} className="so-tro-shell-mark">
                {SO_TRO.eyebrow}
              </Link>
              <a href={SO_TRO.cta.href} className="so-tro-shell-link">
                {SO_TRO.cta.label}
              </a>
            </header>
            <main id="main" className="relative min-h-screen">
              {children}
            </main>
            <footer className="so-tro-shell-footer">
              <p>{SO_TRO.eyebrow}</p>
              <Link href="/">{SITE.name}</Link>
              <p>
                © {year} {SO_TRO.eyebrow}
              </p>
            </footer>
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
