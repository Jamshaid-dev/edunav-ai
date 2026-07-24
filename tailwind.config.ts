import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#020617",
        surface: "#0f172a",
        border: "#1e293b",
        brand: {
          DEFAULT: "#4F46E5",
          light: "#6366F1",
        },
        accent: "#8B5CF6",
        glow: "#06B6D4",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 20%, rgba(79,70,229,0.25), transparent 40%), radial-gradient(circle at 80% 0%, rgba(6,182,212,0.18), transparent 35%), radial-gradient(circle at 50% 100%, rgba(139,92,246,0.15), transparent 40%)",
      },
      keyframes: {
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 6s linear infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
