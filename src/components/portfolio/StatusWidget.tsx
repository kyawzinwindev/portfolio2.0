"use client";

import type { CSSProperties } from "react";
import { SITE } from "@/lib/site";
import { MoonIcon, SunIcon } from "./icons";

type StatusWidgetProps = {
  clock: string;
  onToggleTheme: () => void;
};

export function StatusWidget({ clock, onToggleTheme }: StatusWidgetProps) {
  return (
    <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-40 rise" style={{ "--d": 0 } as CSSProperties}>
      <div className="flex items-center gap-3 rounded-full border border-line bg-canvas/80 backdrop-blur-md pl-4 pr-1.5 py-1.5 shadow-sm">
        <span className="relative flex h-2 w-2 pulse">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
        </span>
        <span className="text-sm font-medium">{SITE.name}</span>
        <span
          className="hidden sm:inline font-mono text-xs text-mute"
          aria-live="off"
          suppressHydrationWarning
        >
          {clock}
        </span>
        <span className="hidden sm:inline font-mono text-xs text-volt">open to work</span>
        <button
          type="button"
          onClick={onToggleTheme}
          className="grid h-8 w-8 place-items-center rounded-full hover:bg-line/60 transition-colors"
          aria-label="Toggle dark mode"
        >
          <MoonIcon className="dark:hidden" />
          <SunIcon className="hidden dark:block" />
        </button>
      </div>
    </div>
  );
}
