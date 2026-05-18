import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05080f",
          900: "#0a0f1c",
          800: "#10182b",
          700: "#1a2440",
          600: "#243156",
        },
        accent: {
          DEFAULT: "#FF7A1A",
          50: "#FFF3E8",
          100: "#FFE1C2",
          200: "#FFC68A",
          300: "#FFA557",
          400: "#FF8C2E",
          500: "#FF7A1A",
          600: "#E5630A",
          700: "#B84B05",
        },
        steel: {
          50: "#F4F6FB",
          100: "#E5EAF3",
          200: "#C7D1E3",
          300: "#9CABC6",
          400: "#6F82A4",
          500: "#4E6285",
          600: "#3A4D6C",
          700: "#2C3B55",
          800: "#1F2A3F",
          900: "#141C2D",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(255, 122, 26, 0.45)",
        ring: "0 0 0 1px rgba(255,255,255,0.06), 0 10px 30px -10px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-fade": "radial-gradient(circle at 50% 0%, rgba(255,122,26,0.08), transparent 60%)",
      },
      keyframes: {
        "caret-blink": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1s steps(1) infinite",
        "fade-up": "fade-up 600ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
