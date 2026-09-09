"use client";

import { ExternalIcon } from "./icons";

const PROJECTS = [
  {
    id: "p1",
    idx: "01",
    name: "Jaraye",
    railMeta: "Architecture",
    meta: "01 · Education · 2024",
    mobileMeta: "01 · Architecture",
    status: "core-built",
    blurb:
      "Architected a comprehensive admin dashboard and core domain services for course, curriculum, student, teacher, report management, and audit activity logs. Optimized system performance using denormalized read models, and role-scoped query builders for 3 distinct user roles.",
    highlightCode: null,
    stats: [
      { dt: "report · before", dd: "2.4s", tone: "strike" as const },
      { dt: "report · after", dd: "210ms", tone: "volt" as const },
      { dt: "roles", dd: "3", tone: "ink" as const },
    ],
    stack: ["Tailwind", "Alpine.js", "Laravel", "Livewire", "MySQL"],
    links: [
      { href: "#", label: "Architecture" },
    ],
    snippet: null,
  },
  {
    id: "p2",
    idx: "02",
    name: "Chatbot API",
    railMeta: "REST · AWS",
    meta: "02 · Customer support · 2025",
    mobileMeta: "02 · REST · AWS",
    status: "v1.0-complete",
    blurb:
      "Engineered an AI-powered conversational commerce backend for Bagisto, enabling end-to-end English/Burmese order processing across Viber, Messenger, and Telegram. Built an asynchronous RAG pipeline using Laravel Reverb WebSockets, Redis queues, and OpenAI APIs to handle real-time inventory queries and automated order placement.",
    highlightCode: "202 Accepted",
    stats: null,
    stack: ["Laravel", "Bagisto", "Reverb", "OpenAI API", "RAG flow", "Redis", "Docker", "Webhook", "WebSocket", "AWS"],
    links: [
      { href: "#", label: "Architecture" },
    ],
    snippet: `POST /v1/webhooks/viber            → 202 · queued · async-job
    
WS   /reverb/chat/orders           → 101 · stream · RAG-response`,
  },
  {
    id: "p3",
    idx: "03",
    name: "CareNest",
    railMeta: "Laravel",
    meta: "03 · Healthcare · 2024",
    mobileMeta: "03 · Laravel",
    status: "live",
    blurb:
      "Clinic appointment platform. Appointments are a guarded state machine (7 states, 11 transitions) — never raw status writes. Replaced a single is_admin flag with a 4-role, 23-permission matrix while real clinics were live. Zero downtime.",
    highlightCode: "is_admin",
    stats: [
      { dt: "uptime · 90d", dd: "99.9%", tone: "ink" as const },
      { dt: "p95 latency", dd: "142ms", tone: "ink" as const },
      { dt: "coverage", dd: "91%", tone: "ink" as const },
      { dt: "migration downtime", dd: "0 min", tone: "ink" as const },
    ],
    stack: ["Tailwind", "Alpine.js", "Laravel", "Livewire", "Brevo", "MySQL"],
    links: [
      { href: "#", label: "Live site" },
      { href: "#", label: "Source" },
    ],
    snippet: null as string | null,
  },
];

type WorkProps = {
  openIndex: number;
  onSelect: (index: number) => void;
};

function StatValue({
  dd,
  tone,
}: {
  dd: string;
  tone: "ink" | "volt" | "strike";
}) {
  if (tone === "strike") {
    return (
      <dd className="font-sans text-2xl font-bold text-mute line-through tabular-nums">{dd}</dd>
    );
  }
  if (tone === "volt") {
    return <dd className="font-sans text-2xl font-bold text-volt tabular-nums">{dd}</dd>;
  }
  return <dd className="font-sans text-2xl font-bold text-ink tabular-nums">{dd}</dd>;
}

function Blurb({ text, highlight }: { text: string; highlight: string | null }) {
  if (!highlight) return <>{text}</>;
  const i = text.indexOf(highlight);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <code className="font-mono text-sm text-ink">{highlight}</code>
      {text.slice(i + highlight.length)}
    </>
  );
}

export function Work({ openIndex, onSelect }: WorkProps) {
  return (
    <section
      id="work"
      className="min-h-[100svh] flex flex-col px-5 sm:px-10 lg:px-16 py-16 lg:py-20 gap-8"
    >
      <div className="rv flex items-end justify-between gap-6">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Selected work</h2>
        <p className="font-mono text-xs text-mute text-right max-w-[22ch]">
          Hover or tap a panel. One opens, the rest step aside.
        </p>
      </div>

      <div className="rv flex flex-col md:flex-row gap-3 flex-1 min-h-0 md:min-h-[68svh]">
        {PROJECTS.map((project, index) => {
          const open = openIndex === index;
          return (
            <article
              key={project.id}
              className="panel group relative flex-1 md:basis-0 rounded-3xl border border-line bg-canvas overflow-hidden flex flex-col cursor-pointer"
              data-open={open ? "true" : "false"}
              data-idx={project.idx}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse" && window.matchMedia("(min-width: 768px)").matches) {
                  onSelect(index);
                }
              }}
            >
              <button
                type="button"
                className="panel-btn absolute inset-0 z-10 md:cursor-pointer"
                aria-expanded={open}
                aria-controls={project.id}
                onClick={() => {
                  const isMobile = window.matchMedia("(max-width: 767px)").matches;
                  if (isMobile && open) {
                    onSelect(-1);
                    return;
                  }
                  onSelect(index);
                }}
              >
                <span className="sr-only">Expand {project.name}</span>
              </button>
              <div
                className="rail absolute inset-0 hidden md:flex flex-col items-center justify-between py-6 transition-opacity duration-300"
                aria-hidden="true"
              >
                <span className="font-mono text-xs text-mute idx">{project.idx}</span>
                <span className="vtext text-2xl font-bold tracking-tight">{project.name}</span>
                <span className="font-mono text-xs text-mute vtext">{project.railMeta}</span>
              </div>
              <div className="relative z-0 flex md:hidden items-center justify-between p-5">
                <span className="text-2xl font-bold tracking-tight">{project.name}</span>
                <span className="font-mono text-xs text-mute">{project.mobileMeta}</span>
              </div>
              <div id={project.id} className="detail-wrap">
                <div className="detail relative z-20 flex flex-col gap-6 p-5 sm:p-8 h-full pointer-events-none">
                  <div className="hidden md:flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs text-mute">{project.meta}</span>
                      <h3 className="text-3xl lg:text-5xl font-bold tracking-tight mt-1">
                        {project.name}
                      </h3>
                    </div>
                    <span className="rounded-full bg-volt/10 text-volt font-mono text-xs px-3 py-1">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-base lg:text-lg text-mute leading-relaxed max-w-xl text-pretty">
                    <Blurb text={project.blurb} highlight={project.highlightCode} />
                  </p>
                  {project.snippet ? (
                    <pre className="font-mono text-[13px] leading-relaxed rounded-2xl bg-ink text-canvas p-5 overflow-x-auto whitespace-pre-wrap">
                      <code className="text-canvas/90">{project.snippet}</code>
                    </pre>
                  ) : null}
                  {project.stats ? (
                    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs text-mute border-t border-line pt-5">
                      {project.stats.map((stat) => (
                        <div key={stat.dt}>
                          <dt>{stat.dt}</dt>
                          <StatValue dd={stat.dd} tone={stat.tone} />
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                    <ul className="flex flex-wrap gap-2 font-mono text-xs text-mute" aria-label="Stack">
                      {project.stack.flatMap((item, i) =>
                        i === 0
                          ? [<li key={item}>{item}</li>]
                          : [
                            <li key={`${item}-dot`}>·</li>,
                            <li key={item}>{item}</li>,
                          ],
                      )}
                    </ul>
                    <div className="flex gap-4 text-sm font-semibold pointer-events-auto">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="inline-flex items-center gap-1 hover:text-volt transition-colors"
                        >
                          {link.label} <ExternalIcon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
