"use client";

import { SITE, INTRO_MAIL } from "@/lib/site";
import { CalendarIcon, GitHubIcon, LinkedInIcon } from "./icons";

type ReachProps = {
  year: number;
  copyHint: string;
  onCopyEmail: () => void;
};

export function Reach({ year, copyHint, onCopyEmail }: ReachProps) {
  return (
    <section
      id="reach"
      className="min-h-[100svh] flex flex-col justify-center gap-10 px-5 sm:px-10 lg:px-16 py-20 border-t border-line"
    >
      <p className="rv font-mono text-xs text-mute uppercase tracking-widest">
        Reach · replies within 48h
      </p>
      <button
        type="button"
        onClick={onCopyEmail}
        className="rv group text-left text-2xl sm:text-[clamp(2rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-hero break-all sm:break-normal hover:text-volt transition-colors"
      >
        <span className="copy-label">{copyHint}</span>
        <span className="block font-mono text-xs sm:text-sm text-mute font-normal tracking-normal mt-4 group-hover:text-volt">
          click to copy →
        </span>
      </button>
      <div className="rv flex flex-wrap gap-3" style={{ transitionDelay: ".1s" }}>
        <a
          href={SITE.linkedin}
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold hover:border-ink hover:bg-ink hover:text-canvas transition-colors"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
        <a
          href={SITE.github}
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-semibold hover:border-ink hover:bg-ink hover:text-canvas transition-colors"
        >
          <GitHubIcon />
          GitHub
        </a>
        <a
          href={INTRO_MAIL}
          className="inline-flex items-center gap-2 rounded-full bg-volt text-white px-5 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <CalendarIcon />
          Quick intro call
        </a>
      </div>
      <footer className="rv flex flex-wrap justify-between gap-4 pt-16 font-mono text-xs text-mute">
        <span>© {year} {SITE.name}</span>
        <span>
          {SITE.location} · {SITE.timezoneLabel} · remote-first
        </span>
      </footer>
    </section>
  );
}
