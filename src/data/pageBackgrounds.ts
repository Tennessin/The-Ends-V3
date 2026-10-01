// Hero background image per page. Files live in /public/backgrounds; replace a file
// (same name) to change that page's background. The current files are placeholders.
export const PAGE_BACKGROUNDS = {
  progression: "backgrounds/progression.webp",
  rules: "backgrounds/rules.webp",
  factionTiers: "backgrounds/faction-tiers.webp",
} as const;

export type PageBackgroundKey = keyof typeof PAGE_BACKGROUNDS;
