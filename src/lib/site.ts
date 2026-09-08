export const SITE = {
  name: "Kyaw Zin Win",
  email: "hello@kyawzinwin.dev",
  github: "https://github.com/kyawzinwin",
  githubHandle: "@kyawzinwin",
  linkedin: "https://linkedin.com/in/kyawzinwin",
  linkedinHandle: "/in/kyawzinwin",
  location: "Yangon",
  timezone: "Asia/Yangon",
  timezoneLabel: "GMT+6:30",
} as const;

export const INTRO_MAIL = `mailto:${SITE.email}?subject=${encodeURIComponent("Quick intro call")}&body=${encodeURIComponent(
  "Hi Kyaw,\n\nI'd like to set up a quick call about a backend role/project.\n\nRole/project:\nTimeline:\nBest times:\n",
)}`;

export const QUICK_MAIL = `mailto:${SITE.email}?subject=${encodeURIComponent("Quick intro call")}`;
