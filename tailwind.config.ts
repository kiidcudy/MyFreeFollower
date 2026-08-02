import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#47a3ff",
          500: "#0077ed",
          600: "#0071e3",
          700: "#0066cc",
          800: "#004080",
          900: "#001a33",
        },
        accent: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#30d158",
          600: "#248a3d",
          700: "#166534",
          800: "#14532d",
          900: "#052e16",
        },
        ink: {
          900: "#1d1d1f",
          800: "#2c2c2e",
          700: "#6e6e73",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f5f5f7",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["var(--font-display)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0, 0, 0, 0.08)",
        card: "0 2px 24px -6px rgba(0, 0, 0, 0.08)",
        glow: "0 0 0 1px rgba(0, 0, 0, 0.03), 0 12px 40px rgba(0, 119, 237, 0.18)",
        "inner-soft": "inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
