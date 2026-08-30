import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.tonydemo.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "BlueSkyz Labs";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Portfolio`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "BlueSkyz Labs — Selected works, process, and quiet conviction. A portfolio built with restraint, materiality, and precision.",
  keywords: [
    "BlueSkyz Labs",
    "portfolio",
    "design",
    "engineering",
    "premium",
    "quiet luxury",
  ],
  authors: [{ name: "BlueSkyz Labs" }],
  creator: "BlueSkyz Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Portfolio`,
    description:
      "Selected works, process, and quiet conviction. Built with restraint, materiality, and precision.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Portfolio`,
    description: "Selected works, process, and quiet conviction.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink-void text-cream-offwhite font-sans antialiased">
        <MotionProvider>
          <Header />
          <main id="main" className="relative min-h-screen">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
