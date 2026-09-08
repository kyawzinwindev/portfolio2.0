"use client";

import { useEffect, useRef } from "react";
import { SITE, QUICK_MAIL } from "@/lib/site";
import { ArrowUpRightIcon, CloseIcon, CopyIcon, DownloadIcon } from "./icons";

type ConnectDrawerProps = {
  open: boolean;
  clock: string;
  copyLabel: string;
  onClose: () => void;
  onCopyEmail: () => void;
};

export function ConnectDrawer({
  open,
  clock,
  copyLabel,
  onClose,
  onCopyEmail,
}: ConnectDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px]"
        data-open={open ? "true" : "false"}
        onClick={onClose}
        aria-hidden="true"
        id="scrim"
      />
      <aside
        id="drawer"
        className="fixed z-50 bottom-0 inset-x-0 sm:inset-x-auto sm:inset-y-0 sm:right-0 sm:w-[400px] bg-canvas border-t sm:border-t-0 sm:border-l border-line rounded-t-3xl sm:rounded-none p-6 sm:p-8 flex flex-col gap-6"
        data-open={open ? "true" : "false"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-volt">open to full-time &amp; contract</p>
            <h2 id="drawer-title" className="text-2xl font-bold tracking-tight mt-1">
              Reach me directly.
            </h2>
            <p className="text-sm text-mute mt-1">No form. Pick a channel.</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-line hover:bg-line/60 transition-colors"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onCopyEmail}
            className="flex items-center justify-between rounded-2xl border border-line px-4 py-4 text-left hover:border-ink transition-colors"
          >
            <span className="flex flex-col">
              <span className="font-mono text-xs text-mute">Email</span>
              <span className="font-semibold copy-label">{copyLabel}</span>
            </span>
            <CopyIcon />
          </button>
          <a
            href={QUICK_MAIL}
            className="flex items-center justify-between rounded-2xl bg-ink text-canvas px-4 py-4 hover:bg-volt hover:text-white transition-colors"
          >
            <span className="flex flex-col">
              <span className="font-mono text-xs opacity-70">Quick connect</span>
              <span className="font-semibold">Open pre-filled email</span>
            </span>
            <ArrowUpRightIcon size={18} />
          </a>
          <a
            href={SITE.linkedin}
            className="flex items-center justify-between rounded-2xl border border-line px-4 py-4 hover:border-ink transition-colors"
          >
            <span className="flex flex-col">
              <span className="font-mono text-xs text-mute">LinkedIn</span>
              <span className="font-semibold">{SITE.linkedinHandle}</span>
            </span>
            <ArrowUpRightIcon size={18} />
          </a>
          <a
            href={SITE.github}
            className="flex items-center justify-between rounded-2xl border border-line px-4 py-4 hover:border-ink transition-colors"
          >
            <span className="flex flex-col">
              <span className="font-mono text-xs text-mute">GitHub</span>
              <span className="font-semibold">{SITE.githubHandle}</span>
            </span>
            <ArrowUpRightIcon size={18} />
          </a>
          <a
            href="#"
            className="flex items-center justify-between rounded-2xl border border-line px-4 py-4 hover:border-ink transition-colors"
          >
            <span className="flex flex-col">
              <span className="font-mono text-xs text-mute">CV</span>
              <span className="font-semibold">Download PDF</span>
            </span>
            <DownloadIcon />
          </a>
        </div>
        <p className="mt-auto font-mono text-xs text-mute">
          {SITE.location} · {clock.replace(` ${SITE.timezoneLabel}`, "")} local · usually replies
          within 48h
        </p>
      </aside>
    </>
  );
}
