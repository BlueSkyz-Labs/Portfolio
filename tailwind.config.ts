import type { Config } from "tailwindcss";

/**
 * Tailwind CSS configuration for the BlueSkyz Labs Portfolio.
 *
 * Design philosophy: Quiet Luxury. Restraint over excess.
 * Every token is intentionally chosen — see SPEC.md.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem", // 24px mobile
        md: "3rem", // 48px tablet
        lg: "6rem", // 96px desktop
        xl: "8rem", // 128px wide
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
    extend: {
      // ─────────────────────────────────────────────────────────
      // COLOR PALETTE — see SPEC.md §2.1
      // ─────────────────────────────────────────────────────────
      colors: {
        ink: {
          void: "#0A0A0A",
          charcoal: "#1A1A1A",
          graphite: "#2A2A2A",
        },
        gold: {
          champagne: "#C9A962",
          muted: "#A8915A",
        },
        cream: {
          offwhite: "#F5F5F0",
          muted: "#A8A8A0",
        },
      },

      // ─────────────────────────────────────────────────────────
      // TYPOGRAPHY — see SPEC.md §2.2
      // ─────────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Display scale (Cormorant Garamond)
        "display-2xl": ["6rem", { lineHeight: "1.0", letterSpacing: "0.005em" }], // 96
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "0.005em" }], // 72
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "0.005em" }], // 56
        "display-md": ["2.5rem", { lineHeight: "1.15", letterSpacing: "0.005em" }], // 40
        "display-sm": ["2rem", { lineHeight: "1.2", letterSpacing: "0.005em" }], // 32
        // Headings (DM Sans)
        "heading-lg": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.011em" }], // 24
        "heading-md": ["1.25rem", { lineHeight: "1.4", letterSpacing: "-0.011em" }], // 20
        // Body (DM Sans)
        "body-lg": ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.011em" }], // 18
        body: ["1rem", { lineHeight: "1.65", letterSpacing: "-0.011em" }], // 16
        "body-sm": ["0.875rem", { lineHeight: "1.7", letterSpacing: "-0.011em" }], // 14
        caption: [
          "0.75rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          },
        ], // 12
      },

      // ─────────────────────────────────────────────────────────
      // SPACING — 8px base, see SPEC.md §2.3
      // ─────────────────────────────────────────────────────────
      spacing: {
        18: "4.5rem", // 72
        "space-1": "0.25rem", // 4
        "space-2": "0.5rem", // 8
        "space-3": "1rem", // 16
        "space-4": "1.5rem", // 24
        "space-5": "2rem", // 32
        "space-6": "3rem", // 48
        "space-7": "4rem", // 64
        "space-8": "6rem", // 96
        "space-9": "8rem", // 128
        "space-10": "12rem", // 192
      },

      // ─────────────────────────────────────────────────────────
      // RADIUS — see SPEC.md §2.5
      // ─────────────────────────────────────────────────────────
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
        full: "9999px",
      },

      // ─────────────────────────────────────────────────────────
      // ANIMATION — see SPEC.md §2.4
      // ─────────────────────────────────────────────────────────
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        standard: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
        400: "400ms",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "draw-line": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 400ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 300ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "draw-line": "draw-line 400ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },

      // ─────────────────────────────────────────────────────────
      // SHADOWS — see SPEC.md §2.6
      // ─────────────────────────────────────────────────────────
      boxShadow: {
        "ink-sm": "0 1px 2px rgba(0,0,0,0.3)",
        "ink-md": "0 4px 12px rgba(0,0,0,0.4)",
        "ink-lg": "0 12px 32px rgba(0,0,0,0.5)",
        "focus-gold": "0 0 0 1px #C9A962",
      },
    },
  },
  plugins: [],
};

export default config;
