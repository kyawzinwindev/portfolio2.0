"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({
  className = "",
  showLabel = true,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] transition-all cursor-pointer select-none ${
        isDark
          ? "bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#FAFAFA]"
          : "bg-[#F2F2F0] hover:bg-[#EBEBEA] border border-[#E0DFDD] text-[#1A1A18]"
      } ${className}`}
    >
      <span className={isDark ? "text-[#8B5CF6]" : "text-[#B45309]"}>
        {isDark ? "◐" : "☼"}
      </span>
      {showLabel && (
        <span className="font-medium tracking-wide uppercase text-[10px]">
          {isDark ? "DARK" : "LIGHT"}
        </span>
      )}
    </button>
  );
}
