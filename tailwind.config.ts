import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#09090B",
        surface: "#111113",
        elevated: "#18181B",
        "bg-hover": "#1C1C1F",
        border: {
          DEFAULT: "#27272A",
          dim: "#1E1E21",
        },
        text: {
          primary: "#FAFAFA",
          dim: "#71717A",
          muted: "#3F3F46",
          subtle: "#52525B",
        },
        violet: {
          DEFAULT: "#8B5CF6",
          glow: "rgba(139, 92, 246, 0.10)",
        },
        green: {
          DEFAULT: "#22C55E",
        },
        amber: {
          DEFAULT: "#F59E0B",
        },
        sky: {
          DEFAULT: "#38BDF8",
        },
        teal: {
          DEFAULT: "#2DD4BF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
