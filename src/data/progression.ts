/**
 * Levelling, skills and slot progression.
 *
 * Mirrors SlimeySl1meScripts_Core/shared/config.lua on the live server
 * (Config.Levels, Config.SkillPoints, Config.AttributePoints,
 * Config.GarageSlotLimiters, Config.InventorySlotLevels, Config.Skills,
 * Config.CreatorSkills, Config.MaxSkills, Config.AttributeCaps ...).
 * If the game and this file disagree, the game is right: update this file.
 */

export type PathId = "civilian" | "faction" | "illegalcivilians";

export interface PathInfo {
  id: PathId;
  name: string;
  short: string;
  /** Character-creator archetypes that land on this progression path. */
  archetypes: string[];
  blurb: string;
  accent: string;
  accentSoft: string;
  maxSkills: number;
  /** Level needed before any firearm can be used (Config.WeaponLevelRequirements). */
  weaponLevel: number;
  /** Cash cap in £ (Config.CharacterTypeLimits). */
  moneyLimit: number;
  /** Owned-vehicle cap (Config.CharacterTypeCarLimits). */
  carLimit: number;
  attributeCaps: { shooting: number; strength: number; driving: number; stamina: number };
}

export const PATHS: PathInfo[] = [
  {
    id: "civilian",
    name: "Civilian",
    short: "Civ",
    archetypes: ["Civilian"],
    blurb: "The legal life. Biggest garage, deepest pockets, and the widest skill list on the server.",
    accent: "#60a5fa",
    accentSoft: "rgba(96,165,250,0.14)",
    maxSkills: 10,
    weaponLevel: 15,
    moneyLimit: 3_000_000,
    carLimit: 10,
    attributeCaps: { shooting: 95, strength: 95, driving: 95, stamina: 95 },
  },
  {
    id: "faction",
    name: "Faction",
    short: "Fac",
    archetypes: ["Faction Roleplayer", "Lifer"],
    blurb: "Gang life. Guns unlock early and the combat skills are the strongest, but you can only ever hold three.",
    accent: "#fb923c",
    accentSoft: "rgba(251,146,60,0.14)",
    maxSkills: 3,
    weaponLevel: 7,
    moneyLimit: 250_000,
    carLimit: 2,
    attributeCaps: { shooting: 90, strength: 85, driving: 95, stamina: 88 },
  },
  {
    id: "illegalcivilians",
    name: "Illegal Civilian",
    short: "Illegal",
    archetypes: ["Illegal Civilian", "Young Offender"],
    blurb: "The middle road. Street Dealer money, most of the faction combat kit, and room for seven skills.",
    accent: "#c084fc",
    accentSoft: "rgba(192,132,252,0.14)",
    maxSkills: 7,
    weaponLevel: 10,
    moneyLimit: 750_000,
    carLimit: 4,
    attributeCaps: { shooting: 85, strength: 80, driving: 90, stamina: 85 },
  },
];

export const pathById = (id: PathId): PathInfo => PATHS.find((p) => p.id === id) ?? PATHS[0];

export const MAX_LEVEL = 30;

/** XP needed to *reach* each level. Index 0 = level 1 (Config.Levels). */
export const LEVEL_XP: number[] = [
  600, 1200, 1900, 2800, 3744, 4836, 5928, 7020, 8112, 9360, 10608, 11856, 13104, 14352, 15600,
  17004, 18408, 19812, 21216, 22776, 24336, 25896, 27456, 29016, 30576, 32292, 34008, 35724, 37440,
  39312,
];

/** Rough playtime the server designers expect each level to take (config comments). */
export const LEVEL_HOURS: number[] = [
  3.85, 7.69, 12.18, 17.95, 24, 31, 38, 45, 52, 60, 68, 76, 84, 92, 100, 109, 118, 127, 136, 146,
  156, 166, 176, 186, 196, 207, 218, 229, 240, 252,
];

/** Level for a given XP total, exactly as calculateLevel() does it server-side. */
export const levelForXp = (xp: number): number => {
  for (let i = 0; i < LEVEL_XP.length; i++) {
    if (xp < LEVEL_XP[i]) return i;
  }
  return LEVEL_XP.length;
};

/** XP required to reach `level` (level 0 = fresh character). */
export const xpForLevel = (level: number): number => (level <= 0 ? 0 : LEVEL_XP[Math.min(level, MAX_LEVEL) - 1]);

export const SKILL_POINT_MILESTONES: { level: number; points: number }[] = [
  { level: 3, points: 2 },
  { level: 5, points: 2 },
  { level: 7, points: 2 },
  { level: 10, points: 3 },
  { level: 13, points: 2 },
  { level: 14, points: 2 },
  { level: 15, points: 3 },
  { level: 17, points: 2 },
  { level: 20, points: 2 },
  { level: 24, points: 2 },
  { level: 27, points: 2 },
  { level: 30, points: 2 },
];

export const ATTRIBUTE_POINT_MILESTONES: { level: number; points: number }[] = [
  { level: 2, points: 10 },
  { level: 4, points: 10 },
  { level: 6, points: 15 },
  { level: 8, points: 15 },
  { level: 10, points: 20 },
  { level: 13, points: 15 },
  { level: 15, points: 20 },
  { level: 17, points: 15 },
  { level: 20, points: 25 },
  { level: 24, points: 20 },
  { level: 27, points: 20 },
  { level: 30, points: 25 },
];

/** Attribute points every character starts with in the creator (Config.StartingAP). */
export const STARTING_AP = 150;

export const skillPointsAtLevel = (level: number): number =>
  SKILL_POINT_MILESTONES.filter((m) => m.level <= level).reduce((s, m) => s + m.points, 0);

export const attributePointsAtLevel = (level: number): number =>
  ATTRIBUTE_POINT_MILESTONES.filter((m) => m.level <= level).reduce((s, m) => s + m.points, 0);

export const TOTAL_SKILL_POINTS = skillPointsAtLevel(MAX_LEVEL);
export const TOTAL_ATTRIBUTE_POINTS = attributePointsAtLevel(MAX_LEVEL);

/** Garage slots by level (index 0 = level 1). Config.GarageSlotLimiters. */
export const GARAGE_SLOTS: Record<PathId, number[]> = {
  civilian: [3, 3, 3, 3, 3, 6, 6, 6, 6, 6, 10, 10, 10, 10, 10, 14, 14, 14, 14, 14, 18, 18, 18, 18, 18, 25, 25, 25, 25, 25],
  faction: [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 8, 8, 8, 8, 8],
  illegalcivilians: [3, 3, 3, 3, 3, 6, 6, 6, 6, 6, 10, 10, 10, 10, 10, 14, 14, 14, 14, 14, 18, 18, 18, 18, 18, 25, 25, 25, 25, 25],
};

/** Inventory slots by level (index 0 = level 1). Config.InventorySlotLevels. */
export const INVENTORY_SLOTS: Record<PathId, number[]> = {
  civilian: [14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 29],
  faction: [12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 27],
  illegalcivilians: [15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 30],
};

export const garageSlotsAt = (path: PathId, level: number): number =>
  GARAGE_SLOTS[path][Math.min(Math.max(level, 1), MAX_LEVEL) - 1];

export const inventorySlotsAt = (path: PathId, level: number): number =>
  INVENTORY_SLOTS[path][Math.min(Math.max(level, 1), MAX_LEVEL) - 1];

/** Levels at which a slot table changes value, with the new value. */
export const slotSteps = (table: number[]): { level: number; value: number }[] =>
  table.reduce<{ level: number; value: number }[]>((steps, value, i) => {
    if (i === 0 || value !== table[i - 1]) steps.push({ level: i + 1, value });
    return steps;
  }, []);

export type SkillCategory = "combat" | "vehicle" | "utility" | "economy" | "identity";

export const CATEGORY_META: Record<SkillCategory, { label: string; color: string }> = {
  combat: { label: "Combat", color: "#f87171" },
  vehicle: { label: "Vehicle", color: "#fbbf24" },
  utility: { label: "Utility", color: "#34d399" },
  economy: { label: "Economy", color: "#60a5fa" },
  identity: { label: "Identity", color: "#c084fc" },
};

export interface Skill {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  category: SkillCategory;
  /** Offered in the character creator: it can only be bought later if it was picked there. */
  creatorOnly: boolean;
}

const CREATOR_SKILLS: Record<PathId, string[]> = {
  faction: [
    "HeadshotKings", "FirstPersonShooter", "SwiftHands", "HotDriver", "SpotEmGotEm", "TazerResistance",
    "Sharpshooter", "adrenalineRush", "RapidDeployment", "Improvement", "MaskedIdentity", "TopHustler",
    "TakeCover", "Fortitude",
  ],
  civilian: [
    "HungerDecay", "CalmBreathing", "XPBoost", "FuelSaver", "HotDriver", "LocationSaver", "DontGotTime",
    "ParkingSpecialist", "ReducedFallDamage", "Killswitch", "TopHustler", "TakeCover",
  ],
  illegalcivilians: [
    "HeadshotKings", "StreetDealer", "HotDriver", "SpotEmGotEm", "Sharpshooter", "adrenalineRush",
    "RapidDeployment", "ReducedFallDamage", "MaskedIdentity", "Killswitch", "LocationSaver", "CalmBreathing",
    "TopHustler", "Fortitude", "FirstPersonShooter",
  ],
};

const CATEGORY_BY_ID: Record<string, SkillCategory> = {
  HeadshotKings: "combat",
  SwiftHands: "combat",
  Nametags: "utility",
  HotDriver: "vehicle",
  SpotEmGotEm: "utility",
  TazerResistance: "combat",
  Sharpshooter: "combat",
  adrenalineRush: "combat",
  RapidDeployment: "vehicle",
  Improvement: "vehicle",
  MaskedIdentity: "identity",
  TopHustler: "economy",
  TakeCover: "combat",
  Fortitude: "combat",
  FirstPersonShooter: "combat",
  SheathAccess: "combat",
  HungerDecay: "utility",
  CalmBreathing: "utility",
  XPBoost: "economy",
  FuelSaver: "vehicle",
  LocationSaver: "utility",
  DontGotTime: "vehicle",
  ParkingSpecialist: "vehicle",
  ReducedFallDamage: "utility",
  Reputation: "identity",
  Killswitch: "vehicle",
  StreetDealer: "economy",
};

type RawSkill = Omit<Skill, "category" | "creatorOnly">;

const build = (path: PathId, raw: RawSkill[]): Skill[] =>
  raw
    .map((s) => ({
      ...s,
      category: CATEGORY_BY_ID[s.id] ?? "utility",
      creatorOnly: CREATOR_SKILLS[path].includes(s.id),
    }))
    .sort((a, b) => a.level - b.level || a.cost - b.cost || a.name.localeCompare(b.name));

export const SKILLS: Record<PathId, Skill[]> = {
  faction: build("faction", [
    { id: "HeadshotKings", name: "Headshot Kings", description: "Deal an additional 3 damage to the head with a firearm.", cost: 4, level: 20 },
    { id: "SwiftHands", name: "Swift Hands", description: "Gives access to multiple weapon pull-out animations.", cost: 2, level: 10 },
    { id: "Nametags", name: "Nametags", description: "Enables viewing nametags above players. Must be in a faction for /mark.", cost: 1, level: 3 },
    { id: "HotDriver", name: "Hot Driver", description: "Improve your car's handling and performance during a chase.", cost: 3, level: 13 },
    { id: "SpotEmGotEm", name: "Spot 'Em Got 'Em", description: "Increases the radius at which marked players' nametags show.", cost: 2, level: 10 },
    { id: "TazerResistance", name: "Tazer Resistance", description: "Shrug off a taser hit once every 30 seconds.", cost: 3, level: 7 },
    { id: "Sharpshooter", name: "Sharpshooter", description: "Removes the two worst screen-shakes while aiming a firearm.", cost: 4, level: 20 },
    { id: "adrenalineRush", name: "Adrenaline Rush", description: "Drop below 40 HP from a weapon hit and you get a run-speed boost.", cost: 3, level: 12 },
    { id: "RapidDeployment", name: "Rapid Deployment", description: "Get in and out of vehicles slightly faster.", cost: 2, level: 15 },
    { id: "Improvement", name: "Improvement", description: "Adds one extra garage slot on top of your level's limit.", cost: 2, level: 5 },
    { id: "MaskedIdentity", name: "Masked Identity", description: "Wear a mask and your name in chat, /me and nametags becomes \"Masked Player\".", cost: 1, level: 8 },
    { id: "TopHustler", name: "Top Hustler", description: "Raises your cash limit by £200,000.", cost: 3, level: 12 },
    { id: "TakeCover", name: "Take Cover", description: "Unlocks Q-peek so you can lean out of cover.", cost: 1, level: 7 },
    { id: "Fortitude", name: "Fortitude", description: "No limping animation while you are getting shot.", cost: 2, level: 12 },
    { id: "FirstPersonShooter", name: "First Person Shooter", description: "No screen-shake or recoil while aiming in first person.", cost: 3, level: 18 },
    { id: "SheathAccess", name: "Sheath Access", description: "Access to custom sheaths for your shanks.", cost: 2, level: 10 },
  ]),
  civilian: build("civilian", [
    { id: "HungerDecay", name: "Healthy Diet", description: "Hunger and thirst drain more slowly.", cost: 1, level: 5 },
    { id: "CalmBreathing", name: "Calm Breathing", description: "Stamina recovers faster.", cost: 2, level: 10 },
    { id: "Nametags", name: "Nametags", description: "Enables viewing nametags above players. Must be in a faction for /mark.", cost: 1, level: 3 },
    { id: "XPBoost", name: "XP Boost", description: "Raises how much XP you can earn between tsunamis.", cost: 2, level: 15 },
    { id: "FuelSaver", name: "Fuel Saver", description: "50% less fuel consumption in every vehicle.", cost: 4, level: 8 },
    { id: "HotDriver", name: "Hot Driver", description: "Improve your car's handling and performance during a chase.", cost: 3, level: 13 },
    { id: "LocationSaver", name: "Location Saver", description: "Save your own map point of interest anywhere and remove it whenever you like.", cost: 1, level: 10 },
    { id: "DontGotTime", name: "Don't Got Time", description: "Valet brings your vehicle to you instead of you driving to the garage.", cost: 2, level: 7 },
    { id: "ParkingSpecialist", name: "Parking Specialist", description: "Unlocks /vbuy and /vpark so your vehicle can be pulled out from anywhere.", cost: 4, level: 14 },
    { id: "ReducedFallDamage", name: "Reduced Fall Damage", description: "You no longer slip or fall over from jumping too often.", cost: 1, level: 10 },
    { id: "Reputation", name: "Reputation", description: "Your Birdy account gets the verified tick.", cost: 2, level: 30 },
    { id: "Killswitch", name: "Killswitch", description: "Cut off your own vehicle instantly with /killswitch, and bring it back with /killswitch2.", cost: 3, level: 17 },
    { id: "TopHustler", name: "Top Hustler", description: "Raises your cash limit by £200,000.", cost: 3, level: 12 },
    { id: "TakeCover", name: "Take Cover", description: "Unlocks Q-peek so you can lean out of cover.", cost: 1, level: 7 },
  ]),
  illegalcivilians: build("illegalcivilians", [
    { id: "HeadshotKings", name: "Headshot Kings", description: "Deal an additional 3 damage to the head with a firearm.", cost: 4, level: 20 },
    { id: "StreetDealer", name: "Street Dealer", description: "Sell drugs to NPCs for dirty money.", cost: 4, level: 12 },
    { id: "HotDriver", name: "Hot Driver", description: "Improve your car's handling and performance during a chase.", cost: 3, level: 13 },
    { id: "SpotEmGotEm", name: "Spot 'Em Got 'Em", description: "Increases the radius at which marked players' nametags show.", cost: 2, level: 10 },
    { id: "Sharpshooter", name: "Sharpshooter", description: "Removes the two worst screen-shakes while aiming a firearm.", cost: 4, level: 20 },
    { id: "adrenalineRush", name: "Adrenaline Rush", description: "Drop below 40 HP from a weapon hit and you get a run-speed boost.", cost: 4, level: 12 },
    { id: "RapidDeployment", name: "Rapid Deployment", description: "Get in and out of vehicles slightly faster.", cost: 2, level: 15 },
    { id: "Nametags", name: "Nametags", description: "Enables viewing nametags above players. Must be in a faction for /mark.", cost: 1, level: 3 },
    { id: "ReducedFallDamage", name: "Reduced Fall Damage", description: "You no longer slip or fall over from jumping too often.", cost: 1, level: 10 },
    { id: "MaskedIdentity", name: "Masked Identity", description: "Wear a mask and your name in chat, /me and nametags becomes \"Masked Player\".", cost: 1, level: 8 },
    { id: "Killswitch", name: "Killswitch", description: "Cut off your own vehicle instantly with /killswitch, and bring it back with /killswitch2.", cost: 3, level: 17 },
    { id: "LocationSaver", name: "Location Saver", description: "Save your own map point of interest anywhere and remove it whenever you like.", cost: 1, level: 10 },
    { id: "CalmBreathing", name: "Calm Breathing", description: "Stamina recovers faster.", cost: 2, level: 10 },
    { id: "TopHustler", name: "Top Hustler", description: "Raises your cash limit by £200,000.", cost: 3, level: 12 },
    { id: "Fortitude", name: "Fortitude", description: "No limping animation while you are getting shot.", cost: 2, level: 12 },
    { id: "FirstPersonShooter", name: "First Person Shooter", description: "No screen-shake or recoil while aiming in first person.", cost: 3, level: 18 },
  ]),
};

export const TOTAL_UNIQUE_SKILLS = new Set(
  (Object.keys(SKILLS) as PathId[]).flatMap((p) => SKILLS[p].map((s) => s.id)),
).size;

/** How XP moves, straight from the server scripts. */
export interface XpSource {
  title: string;
  amount: string;
  detail: string;
  kind: "gain" | "loss";
  /** Signed XP per hour of play if you hit every window, used for the estimate. */
  perHour?: number;
}

export const XP_SOURCES: XpSource[] = [
  {
    title: "Roleplay chat",
    amount: "+39 XP",
    detail:
      "Any RP command counts: /s, /l, /sh, /w, /me, /to and /tol. One reward every 15 minutes, so keep talking in character.",
    kind: "gain",
    perHour: 39 * 4,
  },
  {
    title: "Getting shot",
    amount: "−500 XP",
    detail:
      "Each time a firearm hit lands on you, at most once a minute. Getting caught slipping can wipe hours of progress, so pick your fights.",
    kind: "loss",
  },
  {
    title: "Getting stabbed",
    amount: "−250 XP",
    detail:
      "Each time a knife, bat or other melee weapon lands on you. Shares the one-a-minute cooldown with gunshots, so you never lose more than one hit's worth per minute.",
    kind: "loss",
  },
];

/** XP per hour if a player triggers every RP chat reward window. */
export const CHAT_XP_PER_HOUR = 39 * 4;
