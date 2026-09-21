import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // TXagency brand palette: Petrol / Marine Teal + Coral accent + Sand.
      // Token names kept as ink/cream/brand so components map straight over.
      // ink = petrol/marine surfaces & dark text; cream = sand surfaces & light
      // text; brand = coral accent; sage = a readable muted marine for
      // secondary text; charcoal = strong contrast text.
      colors: {
        ink: {
          DEFAULT: "#103d45", // Petrol / marine teal — huvudfärg
          deep: "#0a2b31", // deeper petrol (hero)
          soft: "#103d45",
          line: "rgba(233, 230, 221, 0.16)", // sand line on dark
        },
        cream: {
          DEFAULT: "#e9e6dd", // Sand — bakgrund
          soft: "#dcd7c8", // darker sand
        },
        // Coral is the loud accent (CTAs, markers) on top of the
        // petrol/sand base. Sage is kept as a soft secondary accent.
        brand: {
          DEFAULT: "#f0573f", // coral — CTA / accent
          dark: "#d8452f",
          light: "#ff6f5b",
          ondark: "#ff8a78",
        },
        sage: {
          DEFAULT: "#5c7a80", // muted marine for secondary text on sand
          soft: "#a9b8b5", // soft marine — soft accent
        },
        charcoal: "#1a1a1a", // text / kontrast
      },
      fontFamily: {
        sans: [
          "var(--font-body)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      transitionTimingFunction: {
        // The reference site's signature easings.
        osmo: "cubic-bezier(0.625, 0.05, 0, 1)",
        soft: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
