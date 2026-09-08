"use client";

import type { CSSProperties, PointerEventHandler, RefObject } from "react";
import { SITE } from "@/lib/site";
import { ArrowDownIcon, CopyIcon } from "./icons";

type HeroProps = {
  stageRef: RefObject<HTMLElement | null>;
  copyLabel: string;
  onCopyEmail: () => void;
  onStagePointerMove: PointerEventHandler<HTMLElement>;
};

export function Hero({
  stageRef,
  copyLabel,
  onCopyEmail,
  onStagePointerMove,
}: HeroProps) {
  return (
    <section
      id="stage"
      ref={stageRef}
      onPointerMove={onStagePointerMove}
      className="relative min-h-[100svh] flex flex-col justify-between px-5 sm:px-10 lg:px-16 pt-28 pb-10 overflow-hidden"
    >
      <p className="rise font-mono text-xs sm:text-sm text-mute" style={{ "--d": 1 } as CSSProperties}>
        {SITE.location} · remote-first · Next.js / NestJS / Laravel / AWS / systems design
      </p>

      <div className="flex flex-col gap-8">
        <h1
          className="rise text-[clamp(3.25rem,11.5vw,11rem)] font-bold leading-[0.88] tracking-hero text-balance max-w-[16ch]"
          style={{ "--d": 2 } as CSSProperties}
          id="headline"
        >
          <span className="block">
            <span className="w">Backend</span> <span className="w text-mute">&amp;</span>
          </span>
          <span className="block">
            <span className="w">Systems</span>
          </span>
          <span className="block">
            <span className="w">
              Engineer<span className="text-volt">.</span>
            </span>
          </span>
        </h1>

        <div
          className="rise flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          style={{ "--d": 3 } as CSSProperties}
        >
          <p className="text-lg sm:text-xl text-mute leading-relaxed max-w-md text-pretty">
            I design the parts of a product that have to keep working — APIs, permission
            systems, queues and the AWS underneath them. Three systems in production.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="magnet inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-6 py-3.5 text-sm font-semibold hover:bg-volt hover:text-white transition-colors"
            >
              See the work
              <ArrowDownIcon />
            </a>
            <button
              type="button"
              onClick={onCopyEmail}
              className="magnet inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold hover:border-ink transition-colors"
            >
              <span className="copy-label">{copyLabel}</span>
              <CopyIcon />
            </button>
          </div>
        </div>
      </div>

      <div
        className="rise flex items-end justify-between font-mono text-xs text-mute"
        style={{ "--d": 4 } as CSSProperties}
      >
        <div className="flex gap-8 sm:gap-14">
          <div>
            <span className="block text-2xl sm:text-3xl font-sans font-bold text-ink tabular-nums">
              3
            </span>
            systems live
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-sans font-bold text-ink tabular-nums">
              99.9<span className="text-base">%</span>
            </span>
            uptime · 90d
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-sans font-bold text-ink tabular-nums">
              2<span className="text-base">y</span>
            </span>
            shipping in prod
          </div>
        </div>
        <span className="hidden sm:flex items-center gap-2">
          scroll <span className="block h-px w-10 bg-mute animate-pulse" />
        </span>
      </div>
    </section>
  );
}
