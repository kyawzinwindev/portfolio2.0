"use client";

const SECTIONS = [
  { href: "#stage", label: "intro" },
  { href: "#work", label: "work" },
  { href: "#signal", label: "stack" },
  { href: "#reach", label: "reach" },
] as const;

type SectionNavProps = {
  activeId: string;
};

export function SectionNav({ activeId }: SectionNavProps) {
  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 font-mono text-[11px] text-mute"
      aria-label="Sections"
    >
      {SECTIONS.map((section) => {
        const on = section.href === `#${activeId}`;
        return (
          <a
            key={section.href}
            href={section.href}
            className={`group flex items-center gap-3 justify-end ${on ? "text-ink" : ""}`}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">{section.label}</span>
            <span className={`h-1.5 rounded-full bg-current transition-all ${on ? "w-5" : "w-1.5"}`} />
          </a>
        );
      })}
    </nav>
  );
}
