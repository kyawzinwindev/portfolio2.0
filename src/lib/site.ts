export const SITE = {
  name: "Kyaw Zin Win",
  email: "kyawzinwindev@gmail.com",
  github: "https://github.com/kyawzinwindev",
  githubHandle: "@kyawzinwindev",
  linkedin: "https://www.linkedin.com/in/kyaw-zin-win-aa8194259/",
  linkedinHandle: "/in/kyawzinwin",
  location: "Chiang Mai",
  timezone: "Asia/Bangkok",
  timezoneLabel: "GMT+7",
} as const;

export const INTRO_MAIL = `mailto:${SITE.email}?subject=${encodeURIComponent("Quick intro call")}&body=${encodeURIComponent(
  "Hi Kyaw,\n\nI'd like to set up a quick call about a backend role/project.\n\nRole/project:\nTimeline:\nBest times:\n",
)}`;

export const QUICK_MAIL = `mailto:${SITE.email}?subject=${encodeURIComponent("Quick intro call")}`;
