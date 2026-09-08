"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEventHandler,
} from "react";
import { SITE } from "@/lib/site";
import { useTheme } from "@/components/ThemeProvider";
import { ArrowUpRightIcon } from "./icons";
import { StatusWidget } from "./StatusWidget";
import { SectionNav } from "./SectionNav";
import { Hero } from "./Hero";
import { Work } from "./Work";
import { Signal } from "./Signal";
import { Reach } from "./Reach";
import { ConnectDrawer } from "./ConnectDrawer";

const clockFmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: SITE.timezone,
});

function formatClock(date = new Date()) {
  return `${clockFmt.format(date)} ${SITE.timezoneLabel}`;
}

export function Portfolio() {
  const { toggleTheme } = useTheme();
  const stageRef = useRef<HTMLElement | null>(null);
  const openDrawerBtn = useRef<HTMLButtonElement>(null);
  const [clock, setClock] = useState(() => formatClock());
  const year = new Date().getFullYear();
  const [openIndex, setOpenIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeId, setActiveId] = useState("stage");
  const [toast, setToast] = useState("Email copied");
  const [toastOn, setToastOn] = useState(false);
  const [heroCopy, setHeroCopy] = useState("Copy email");
  const [reachCopy, setReachCopy] = useState<string>(SITE.email);
  const [drawerCopy, setDrawerCopy] = useState(`Copy ${SITE.email}`);
  const toastTimer = useRef<number | undefined>(undefined);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setToastOn(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastOn(false), 1800);
  }, []);

  const flashLabel = useCallback((setter: (v: string) => void, next: string, prev: string) => {
    setter(next);
    window.setTimeout(() => setter(prev), 1600);
  }, []);

  const copyEmail = useCallback(
    async (which: "hero" | "reach" | "drawer") => {
      try {
        await navigator.clipboard.writeText(SITE.email);
        if (which === "hero") flashLabel(setHeroCopy, "Copied", "Copy email");
        if (which === "reach") flashLabel(setReachCopy, "Copied", SITE.email);
        if (which === "drawer") flashLabel(setDrawerCopy, "Copied", `Copy ${SITE.email}`);
        showToast("Email copied to clipboard");
      } catch {
        window.location.href = `mailto:${SITE.email}`;
      }
    },
    [flashLabel, showToast],
  );

  const setDrawer = useCallback(
    (open: boolean) => {
      setDrawerOpen(open);
      document.body.style.overflow = open ? "hidden" : "";
      if (!open) openDrawerBtn.current?.focus();
    },
    [],
  );

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatClock()), 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const magnets = document.querySelectorAll<HTMLElement>(".magnet");
    const cleanups: Array<() => void> = [];
    magnets.forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        el.style.transform = `translate(${x}px, ${y}px)`;
      };
      const leave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.15 },
    );
    nodes.forEach((el) => io.observe(el));

    const sections = document.querySelectorAll("main > section");
    const so = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveId(entry.target.id);
        });
      },
      { threshold: 0.5 },
    );
    sections.forEach((s) => so.observe(s));

    return () => {
      io.disconnect();
      so.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawerOpen) setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, setDrawer]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(toastTimer.current);
    };
  }, []);

  const onStagePointerMove: PointerEventHandler<HTMLElement> = (e) => {
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    stage.style.setProperty("--mx", `${e.clientX - r.left}px`);
    stage.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <>
      <StatusWidget clock={clock} onToggleTheme={toggleTheme} />
      <SectionNav activeId={activeId} />

      <button
        ref={openDrawerBtn}
        type="button"
        onClick={() => setDrawer(true)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2.5 rounded-full bg-ink text-canvas pl-5 pr-2 py-2 text-sm font-semibold shadow-lg shadow-ink/15 hover:scale-[1.03] active:scale-95 transition-transform rise"
        style={{ "--d": 2 } as CSSProperties}
      >
        Connect
        <span className="grid h-8 w-8 place-items-center rounded-full bg-volt text-white">
          <ArrowUpRightIcon />
        </span>
      </button>

      <main>
        <Hero
          stageRef={stageRef}
          copyLabel={heroCopy}
          onCopyEmail={() => copyEmail("hero")}
          onStagePointerMove={onStagePointerMove}
        />
        <Work openIndex={openIndex} onSelect={setOpenIndex} />
        <Signal />
        <Reach
          year={year}
          copyHint={reachCopy}
          onCopyEmail={() => copyEmail("reach")}
        />
      </main>

      <ConnectDrawer
        open={drawerOpen}
        clock={clock}
        copyLabel={drawerCopy}
        onClose={() => setDrawer(false)}
        onCopyEmail={() => copyEmail("drawer")}
      />

      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 -translate-x-1/2 bottom-24 sm:bottom-8 z-50 rounded-full bg-ink text-canvas px-4 py-2 text-sm font-medium transition-all pointer-events-none ${
          toastOn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {toast}
      </div>
    </>
  );
}
