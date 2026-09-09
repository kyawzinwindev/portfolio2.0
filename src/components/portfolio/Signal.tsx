import { DownloadIcon } from "./icons";

const STACK = [
  {
    kicker: "Full-Stack Ecosystem",
    title: "TALL Stack",
    body: "Tailwind CSS, Alpine.js, Laravel & Livewire. High-productivity, reactive web applications with server-driven state.",
    tags: ["Tailwind", "Alpine.js", "Laravel", "Livewire"],
  },
  {
    kicker: "JavaScript Ecosystem",
    title: "MERN Stack",
    body: "MongoDB, Express.js, React & Node.js. Scalable full-stack JavaScript architectures with document-based data flow.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    kicker: "Modern Enterprise JS",
    title: "Next.js + NestJS",
    body: "SSR/SSG React frontend powered by a structured, strongly-typed TypeScript NestJS backend architecture.",
    tags: ["Next.js", "NestJS", "TypeScript"],
  },
];

const WORK = [
  ["Laravel services & versioned REST APIs", "daily"],
  ["Permission systems, state machines, domain models", "daily"],
  ["MySQL schema & query performance, Redis queues", "daily"],
  ["AWS deployment, Docker, Nginx, CI/CD pipelines", "weekly"],
  ["Architecture reviews for small product teams", "on request"],
];

const HISTORY = [
  {
    when: "2025 — now",
    title: "Backend & Systems Engineer",
    detail: "Freelance & consulting · Remote. Laravel backends and project management.",
  },
  {
    when: "2024 — 2025",
    title: "Junior Backend Developer",
    detail: "Airyno · Yangon. Shipped Jaraye and ChatbotAPI to production.",
  },
  {
    when: "2024 — now",
    title: "BSc (Hons) Computing",
    detail: "NCC Education. Computer Science , distributed systems, databases, algorithms.",
  },
];

export function Signal() {
  return (
    <section
      id="signal"
      className="min-h-[100svh] flex flex-col justify-center gap-12 px-5 sm:px-10 lg:px-16 py-20 border-t border-line"
    >
      <div className="rv flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-line pb-4">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">Core Technical Stack</h2>
          <span className="font-mono text-xs text-mute">Primary Frameworks & Infrastructure</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STACK.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-line p-6 flex flex-col justify-between gap-4 hover:border-ink transition-colors bg-canvas"
            >
              <div>
                <span className="font-mono text-xs text-volt uppercase tracking-wider block mb-1">
                  {card.kicker}
                </span>
                <h3 className="text-2xl font-bold tracking-tight">{card.title}</h3>
              </div>
              <p className="text-sm text-mute leading-relaxed">{card.body}</p>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs text-mute pt-2 border-t border-line/60">
                {card.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-line/40 px-2 py-0.5 text-ink">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-line p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-ink transition-colors bg-canvas">
            <div className="max-w-xl">
              <span className="font-mono text-xs text-volt uppercase tracking-wider block mb-1">
                Cloud Infrastructure & DevOps
              </span>
              <h3 className="text-2xl font-bold tracking-tight">AWS & Docker Containerization</h3>
              <p className="text-sm text-mute leading-relaxed mt-2">
                Production deployment pipelines utilizing Docker containers, AWS EC2 instances, RDS
                relational databases, S3 storage, Nginx reverse proxying, and automated CI/CD
                workflows.
              </p>
            </div>
            <div className="flex flex-wrap md:flex-col gap-2 shrink-0 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink">AWS:</span>
                <span className="text-mute">EC2 · RDS · S3</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink">DevOps:</span>
                <span className="text-mute">Docker · Nginx · CI/CD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 pt-6">
        <div className="rv flex flex-col gap-6">
          <h2 className="font-mono text-xs text-mute uppercase tracking-widest">What I actually do</h2>
          <ul className="flex flex-col divide-y divide-line text-lg sm:text-xl">
            {WORK.map(([label, cadence]) => (
              <li key={label} className="flex justify-between gap-6 py-4">
                <span>{label}</span>
                <span className="font-mono text-xs text-mute shrink-0 pt-2">{cadence}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rv flex flex-col gap-6" style={{ transitionDelay: ".15s" }}>
          <h2 className="font-mono text-xs text-mute uppercase tracking-widest">Where I&apos;ve been</h2>
          <ol className="flex flex-col divide-y divide-line">
            {HISTORY.map((row) => (
              <li key={row.when} className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                <span className="font-mono text-xs text-mute pt-1.5">{row.when}</span>
                <div>
                  <p className="text-lg sm:text-xl font-semibold">{row.title}</p>
                  <p className="text-mute">{row.detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href="/resume.pdf"
            download="Kyaw_Zin_Win_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold hover:text-volt transition-colors"
          >
            Download CV (PDF)
            <DownloadIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
