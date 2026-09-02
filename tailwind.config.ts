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
        void: "var(--bg-void)",
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        "bg-hover": "var(--bg-hover)",
        border: {
          DEFAULT: "var(--border)",
          dim: "var(--border-dim)",
        },
        text: {
          primary: "var(--text-primary)",
          dim: "var(--text-dim)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)",
        },
        violet: {
          DEFAULT: "var(--violet)",
          bg: "var(--violet-bg)",
          bdr: "var(--violet-bdr)",
          glow: "var(--glow-violet)",
        },
        green: {
          DEFAULT: "var(--green)",
          bg: "var(--green-bg)",
          bdr: "var(--green-bdr)",
        },
        amber: {
          DEFAULT: "var(--amber)",
          bg: "var(--amber-bg)",
          bdr: "var(--amber-bdr)",
        },
        sky: {
          DEFAULT: "var(--sky)",
          bg: "var(--sky-bg)",
          bdr: "var(--sky-bdr)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
      },
    },
  },
  plugins: [],
};

export default config;
