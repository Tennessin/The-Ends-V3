/**
 * Faction tier system. Mirrors SlimeySl1meScripts_Faction-Tiers/config/config.lua
 * and server/main.lua, plus the tier list and member limits in rk_factions.
 */

export interface FactionTier {
  name: string;
  /** Effective member cap from rk_factions (Unofficial has its own limit, the rest use the default). */
  memberLimit: number;
  canRedeem: boolean;
  note: string;
}

export const FACTION_TIERS: FactionTier[] = [
  { name: "Unofficial", memberLimit: 10, canRedeem: false, note: "Where every new faction starts. No tier reward yet." },
  { name: "Tier One", memberLimit: 25, canRedeem: true, note: "First reward unlocks. Tier 1 and 0.5 factions may shoot to kill." },
  { name: "Tier Two", memberLimit: 25, canRedeem: true, note: "Second reward. Attacks every 12 hours, supercars allowed on attacks." },
  { name: "Tier Three", memberLimit: 25, canRedeem: true, note: "Top of the ladder. Third and final reward." },
];

export interface TierReward {
  id: string;
  title: string;
  tag: string;
  detail: string;
  cooldown: string;
  foot: string;
}

export const TIER_REWARDS: TierReward[] = [
  {
    id: "spin",
    title: "Higher Tier Spin",
    tag: "Bonus Roll",
    detail: "Spin once for a tier higher than your current rank. Outcome is rolled on the spot and the result is final.",
    cooldown: "One-shot",
    foot: "Contact FM, screenshot required",
  },
  {
    id: "skill",
    title: "Faction Skill",
    tag: "Passive",
    detail: "Apply a single passive skill across the entire faction. Affects all current and future members while active.",
    cooldown: "Permanent",
    foot: "Faction-wide buff",
  },
  {
    id: "print",
    title: "3D Printing: Ghost Glock",
    tag: "Crafting",
    detail: "Unlocks a 2x weekly print run on the Ghost Glock blueprint. Counter resets every Monday at server reset.",
    cooldown: "2x per week",
    foot: "Resets Monday 00:00",
  },
  {
    id: "scam",
    title: "Scam Plug",
    tag: "Economy",
    detail: "Drops 500 scam cards into the faction stash on a 14-day cycle. Distribution is handled by the faction lead.",
    cooldown: "Bi-weekly",
    foot: "500 cards / 14 days",
  },
];

export interface FactionSkill {
  id: string;
  name: string;
  description: string;
}

export const FACTION_SKILLS: FactionSkill[] = [
  { id: "Nametags", name: "Nametags", description: "See marked players' names above their heads." },
  { id: "SpotEmGotEm", name: "Spot 'Em Got 'Em", description: "Extended view range for marked players." },
  { id: "RapidDeployment", name: "Rapid Deployment", description: "Get in and out of vehicles faster." },
  { id: "TakeCover", name: "Take Cover", description: "Access Q-peek corner cover." },
  { id: "MaskedIdentity", name: "Masked Identity", description: "Show as Masked Player while wearing a mask." },
];

export const TIER_STEPS: { title: string; body: string; cmd?: string }[] = [
  {
    title: "Get approved and reach the next tier",
    body: "Tiers are awarded by Faction Management based on your thread, block activity and logged roleplay. Only Leadership or Council ranks can move the faction up once it has been approved.",
  },
  {
    title: "Run the tier-up command",
    body: "A Leadership or Council member runs the command with your faction's ID. The faction moves up one tier, every online member gets a notification, and the reward window opens for the leader.",
    cmd: "/tierup [factionId]",
  },
  {
    title: "Claim one reward for that tier",
    body: "Pick one of the four reward cards. The choice is locked in: one reward per faction per tier, no swapping later. Unofficial factions cannot claim anything; rewards start at Tier One.",
  },
  {
    title: "Missed the window? Reopen it",
    body: "If the popup was closed, or FM set your tier directly, a Leadership or Council member can reopen the reward window for the current tier as long as it has not been claimed yet.",
    cmd: "/redeem",
  },
];
