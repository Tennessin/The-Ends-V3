import { asset } from "../lib/asset";

export type ItemType = "weapon" | "drug";

export interface WeaponStats {
  minDamage: number;
  maxDamage: number;
  range: number;
  fireRate: number;
  recoil: number;
}

export interface DrugStats {
  duration: string;
  effect: string;
  weight: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  type: ItemType;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
  tier?: 1 | 1.5 | 2;
  /** Extra spin-wheel tiers this weapon also appears in, beyond its primary `tier`. */
  spinTiers?: (1 | 1.5 | 2)[];
  description: string;
  tags: string[];
  image?: string;
  stats?: WeaponStats | DrugStats;
}

export const catalogItems: CatalogItem[] = [
  {
    id: "canik",
    name: "Canik",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("canik.png"),
    stats: { minDamage: 18, maxDamage: 28, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "p88p",
    name: "P88P",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("p88p.png"),
    stats: { minDamage: 18, maxDamage: 28, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "cpt",
    name: "Glock 45",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("cpt.png"),
    stats: { minDamage: 21, maxDamage: 31, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g19g",
    name: "G19G",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g19g.png"),
    stats: { minDamage: 21, maxDamage: 31, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g23b",
    name: "G23B",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g23b.png"),
    stats: { minDamage: 21, maxDamage: 31, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g45s",
    name: "G45S",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g45s.png"),
    stats: { minDamage: 21, maxDamage: 31, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "olive17",
    name: "Olive 17",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("olive17.png"),
    stats: { minDamage: 21, maxDamage: 31, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "oliveg19",
    name: "Olive G19",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("oliveg19.png"),
    stats: { minDamage: 21, maxDamage: 31, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g30",
    name: "G30",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    spinTiers: [1.5],
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g30.png"),
    stats: { minDamage: 22, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g48",
    name: "G48",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g48.png"),
    stats: { minDamage: 24, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "ffn",
    name: "FN 57",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    spinTiers: [1.5],
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("ffn.png"),
    stats: { minDamage: 26, maxDamage: 38, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "17g5",
    name: "Glock 17 Gen5",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("17g5.png"),
    stats: { minDamage: 21, maxDamage: 31, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g22",
    name: "Glock 22",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g22.png"),
    stats: { minDamage: 21, maxDamage: 29, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g26",
    name: "Glock 26",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g26.png"),
    stats: { minDamage: 20, maxDamage: 25, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g40",
    name: "Glock 40",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    spinTiers: [1.5],
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g40.png"),
    stats: { minDamage: 26, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g41",
    name: "Glock 41",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g41.png"),
    stats: { minDamage: 22, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "hk45",
    name: "HK 45",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("hk45.png"),
    stats: { minDamage: 21, maxDamage: 31, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "sigcb",
    name: "SIG CB",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("sigcb.png"),
    stats: { minDamage: 21, maxDamage: 31, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g23",
    name: "Glock 23",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g23.png"),
    stats: { minDamage: 22, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g19flex",
    name: "Glock19 G-Flex",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g19flex.png"),
    stats: { minDamage: 21, maxDamage: 29, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g19xg",
    name: "Glock 19x",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    spinTiers: [1.5],
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g19xg.png"),
    stats: { minDamage: 22, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g20",
    name: "Glock 20",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g20.png"),
    stats: { minDamage: 22, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "1911",
    name: "Colt 1911",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("1911.png"),
    stats: { minDamage: 24, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g233",
    name: "Glock 23",
    type: "weapon",
    rarity: "Common",
    tier: 1,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g233.png"),
    stats: { minDamage: 22, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "43mos",
    name: "Glock 43MOS",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("43mos.png"),
    stats: { minDamage: 27, maxDamage: 33, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "45mos",
    name: "Glock 45MOS",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("45mos.png"),
    stats: { minDamage: 27, maxDamage: 33, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g26s",
    name: "Glock 26 Switch",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g26s.png"),
    stats: { minDamage: 17, maxDamage: 28, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "switchred",
    name: "Switch Red",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("switchred.png"),
    stats: { minDamage: 17, maxDamage: 28, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "switchblue",
    name: "Switch Blue",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("switchblue.png"),
    stats: { minDamage: 17, maxDamage: 28, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "arpsh",
    name: "Binary AR-Pistol",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("arpsh.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "mac10",
    name: "MAC 10",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("mac10.png"),
    stats: { minDamage: 17, maxDamage: 28, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "fnx45",
    name: "FNX-45",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("fnx45.png"),
    stats: { minDamage: 27, maxDamage: 33, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "bluetip57",
    name: "Blue Tip FN-57",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("bluetip57.png"),
    stats: { minDamage: 30, maxDamage: 38, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "blackmdraco",
    name: "Black Micro Draco",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("blackmdraco.png"),
    stats: { minDamage: 20, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "mdraco",
    name: "Micro Draco",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("mdraco.png"),
    stats: { minDamage: 20, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "binaryg20",
    name: "Binary G20",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("binaryg20.png"),
    stats: { minDamage: 22, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "draco2",
    name: "Olive Draco",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("draco2.png"),
    stats: { minDamage: 20, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "arp5",
    name: "ARP 5",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("arp5.png"),
    stats: { minDamage: 19, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g21b",
    name: "Glock 21B",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g21b.png"),
    stats: { minDamage: 23, maxDamage: 31, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "glock41",
    name: "Glock 41",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("glock41.png"),
    stats: { minDamage: 25, maxDamage: 33, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g47",
    name: "Glock 47",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    spinTiers: [2],
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g47.png"),
    stats: { minDamage: 17, maxDamage: 28, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "pmr",
    name: "PMR-30",
    type: "weapon",
    rarity: "Common",
    tier: 1.5,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("pmr.png"),
    stats: { minDamage: 24, maxDamage: 31, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "19switch",
    name: "19 Switch",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("19switch.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g19my",
    name: "G19 Binary",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g19my.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "switchgold",
    name: "Switch Gold",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("switchgold.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "switchgreen",
    name: "Switch Green",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("switchgreen.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "switchpurple",
    name: "Switch Purple",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("switchpurple.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "amirig23",
    name: "Glock 23 Switch",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("amirig23.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "mp9frt",
    name: "MP9 FRT",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("mp9frt.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "aprd",
    name: "AR-Pistol",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("aprd.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "300b",
    name: "300 Blackout",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("300b.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "fn",
    name: "FN-57 Flashlight",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("fn.png"),
    stats: { minDamage: 38, maxDamage: 45, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "fn57",
    name: "FN-57",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("fn57.png"),
    stats: { minDamage: 38, maxDamage: 45, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "fngflex",
    name: "FN GFlex",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("fngflex.png"),
    stats: { minDamage: 22, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "greyfully",
    name: "Grey Fully AR-Pistol",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("greyfully.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "honeybadger",
    name: "Honey Badger",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("honeybadger.png"),
    stats: { minDamage: 20, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "kvec",
    name: "Kriss Vector",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("kvec.png"),
    stats: { minDamage: 20, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "mcx",
    name: "SIG MCX",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("mcx.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g45",
    name: "Glock 45 Magholder",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g45.png"),
    stats: { minDamage: 26, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "tec9",
    name: "TEC 9",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("tec9.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "blackg21",
    name: "Black Glock 21",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("blackg21.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "fullyminidraco",
    name: "Fully Mini Draco",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("fullyminidraco.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "ap3",
    name: "Glock 19 Button",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("ap3.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "g205",
    name: "Glock 20 Switch",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    spinTiers: [1.5],
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("g205.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "wmicroarp",
    name: "White Micro ARP",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("wmicroarp.png"),
    stats: { minDamage: 17, maxDamage: 32, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "dracoz",
    name: "Draco Zastava",
    type: "weapon",
    rarity: "Common",
    tier: 2,
    description:
      "Light sidearm for new players with fast draw speed, cheap ammo cost, and steady entry-level value for simple city jobs and everyday protection.",
    tags: ["Low recoil", "Fast draw"],
    image: asset("dracoz.png"),
    stats: { minDamage: 20, maxDamage: 30, range: 35, fireRate: 72, recoil: 20 },
  },
  {
    id: "actavis-syrup",
    name: "Actavis Syrup",
    type: "drug",
    rarity: "Rare",
    description:
      "25% Health Regen. Stamina regeneration until restart. -20% Movement Speed for 600s. Vehicle handling -10% for 600s.",
    tags: ["Health regen", "Stamina"],
    image: asset("drugs/actavis_syrup.png"),
    stats: { duration: "600s", effect: "Heavy sedation, euphoria", weight: "0.5 kg" },
  },
  {
    id: "adderall",
    name: "Adderall",
    type: "drug",
    rarity: "Common",
    description:
      "Removes worst screenshake. Gives SpotEmGotEm skill until restart. -10% Health instantly. -10% Slower until restart.",
    tags: ["SpotEmGotEm", "Focus"],
    image: asset("drugs/adderall.png"),
    stats: { duration: "Until restart", effect: "Focus boost, reduced screenshake", weight: "0.05 kg" },
  },
  {
    id: "alg",
    name: "ALG",
    type: "drug",
    rarity: "Uncommon",
    description:
      "30% Health Regen boost. Slowed movement for 300s.",
    tags: ["Health regen"],
    image: asset("drugs/alg.png"),
    stats: { duration: "300s", effect: "Health regen, slowed movement", weight: "0.1 kg" },
  },
  {
    id: "blue-xanax",
    name: "Blue Xanax",
    type: "drug",
    rarity: "Uncommon",
    description:
      "100% Health Regen. 10% Health Regen. Makes you slower for 300s.",
    tags: ["Health regen", "Sedation"],
    image: asset("drugs/blue_xanax.png"),
    stats: { duration: "300s", effect: "Health regen, slowed movement", weight: "0.05 kg" },
  },
  {
    id: "blue-dream",
    name: "Blue Dream",
    type: "drug",
    rarity: "Common",
    description:
      "15% Health Regen. Reduced aim sway for 600s. -10% Speed for 600s. Stamina reduction for 600s.",
    tags: ["Health regen", "Aim sway"],
    image: asset("drugs/bluedream.png"),
    stats: { duration: "600s", effect: "Health regen, reduced aim sway", weight: "0.3 kg" },
  },
  {
    id: "cocaine",
    name: "Cocaine",
    type: "drug",
    rarity: "Rare",
    description:
      "+10% Run Speed for 300s. +15% Stamina Regen for 300s. -8% Health instantly. -10% Stamina Regen for 180s.",
    tags: ["Run speed", "Stamina"],
    image: asset("drugs/cocaine.png"),
    stats: { duration: "300s", effect: "Run speed, stamina regen", weight: "0.3 kg" },
  },
  {
    id: "codeine-syrup",
    name: "Codeine Syrup",
    type: "drug",
    rarity: "Uncommon",
    description:
      "25% Health Regen. Stamina regeneration until restart. -20% Movement Speed for 600s. Vehicle handling -10% for 600s.",
    tags: ["Health regen", "Stamina"],
    image: asset("drugs/codeine_syrup.png"),
    stats: { duration: "600s", effect: "Health regen, slowed movement", weight: "0.4 kg" },
  },
  {
    id: "crack",
    name: "Crack",
    type: "drug",
    rarity: "Rare",
    description:
      "+10 Armor (reactive on bullet). +20% Melee Damage for 180s. -5% Health instantly. Stamina drain for 240s.",
    tags: ["Reactive armor", "Melee"],
    image: asset("drugs/crack.png"),
    stats: { duration: "180s", effect: "Reactive armor, melee damage", weight: "0.1 kg" },
  },
  {
    id: "flakka",
    name: "Flakka",
    type: "drug",
    rarity: "Epic",
    description:
      "+25% Speed for 300s. +30% Melee Damage for 300s. -25% Health (crash damage). Stamina drain for 300s.",
    tags: ["Speed", "Melee"],
    image: asset("drugs/flakka.png"),
    stats: { duration: "300s", effect: "Speed boost, melee damage", weight: "0.1 kg" },
  },
  {
    id: "gg-pill",
    name: "GG Pill",
    type: "drug",
    rarity: "Uncommon",
    description:
      "Adrenaline Rush skill until restart. 50% Health Regen. -5% Health instantly. -15% Stamina Regen for 300s.",
    tags: ["Adrenaline Rush", "Health regen"],
    image: asset("drugs/ggpill.png"),
    stats: { duration: "Until restart", effect: "Adrenaline rush, health regen", weight: "0.05 kg" },
  },
  {
    id: "grenades-pill",
    name: "Grenades",
    type: "drug",
    rarity: "Uncommon",
    description:
      "Adrenaline Rush skill until restart. 50% Health Regen. -5% Health instantly. -15% Stamina Regen for 300s.",
    tags: ["Adrenaline Rush", "Health regen"],
    image: asset("drugs/grenades_pill.png"),
    stats: { duration: "Until restart", effect: "Adrenaline rush, health regen", weight: "0.05 kg" },
  },
  {
    id: "heroin",
    name: "Heroin",
    type: "drug",
    rarity: "Legendary",
    description:
      "25% Armor (reactive). 10% Health Regen. -30% Movement Speed until restart. -10% Health after effect.",
    tags: ["Reactive armor", "Health regen"],
    image: asset("drugs/heroin.png"),
    stats: { duration: "Until restart", effect: "Reactive armor, slowed movement", weight: "0.3 kg" },
  },
  {
    id: "hitec-syrup",
    name: "Hi-Tec Syrup",
    type: "drug",
    rarity: "Uncommon",
    description:
      "25% Health Regen. Stamina regeneration until restart. -20% Movement Speed for 600s. Vehicle handling -10% for 600s.",
    tags: ["Health regen", "Stamina"],
    image: asset("drugs/hitec_syrup.png"),
    stats: { duration: "600s", effect: "Health regen, slowed movement", weight: "0.5 kg" },
  },
  {
    id: "hydrocodone",
    name: "Hydrocodone",
    type: "drug",
    rarity: "Common",
    description:
      "Gives Headshot King skill until restart. 8% Armor (reactive). -30% Health (Fentanyl). -25% Dehydration.",
    tags: ["Headshot King", "Reactive armor"],
    image: asset("drugs/hydrocodone.png"),
    stats: { duration: "Until restart", effect: "Headshot king, reactive armor", weight: "0.05 kg" },
  },
  {
    id: "hydrocodone-30",
    name: "Hydrocodone 30",
    type: "drug",
    rarity: "Uncommon",
    description:
      "Gives Headshot King skill until restart. 8% Armor (reactive). -30% Health (Fentanyl). -25% Dehydration.",
    tags: ["Headshot King", "Reactive armor"],
    image: asset("drugs/hydrocodone30.png"),
    stats: { duration: "Until restart", effect: "Headshot king, reactive armor", weight: "0.05 kg" },
  },
  {
    id: "k2",
    name: "K2",
    type: "drug",
    rarity: "Common",
    description:
      "+10% Damage Resistance for 300s. -20% Health (severe loss). Hallucinations for 300s.",
    tags: ["Damage resistance"],
    image: asset("drugs/k2.png"),
    stats: { duration: "300s", effect: "Damage resistance, hallucinations", weight: "0.2 kg" },
  },
  {
    id: "ketamine",
    name: "Ketamine",
    type: "drug",
    rarity: "Rare",
    description:
      "+10% Damage Resistance for 300s. 15% Health Regen. Slowed movement for 300s. Disorientation for 300s.",
    tags: ["Damage resistance", "Health regen"],
    image: asset("drugs/ketamine.png"),
    stats: { duration: "300s", effect: "Damage resistance, health regen", weight: "0.1 kg" },
  },
  {
    id: "lsd",
    name: "LSD (Acid)",
    type: "drug",
    rarity: "Rare",
    description:
      "20% Health Regen. Reduced aim sway for 600s. -10% Speed for 600s. Visual distortion for 600s.",
    tags: ["Health regen", "Aim sway"],
    image: asset("drugs/lsd.png"),
    stats: { duration: "600s", effect: "Health regen, reduced aim sway", weight: "0.01 kg" },
  },
  {
    id: "mdma",
    name: "MDMA",
    type: "drug",
    rarity: "Rare",
    description:
      "Adrenaline Rush skill until restart. 50% Health Regen. -5% Health instantly. -15% Stamina Regen for 300s.",
    tags: ["Adrenaline Rush", "Health regen"],
    image: asset("drugs/mdma.png"),
    stats: { duration: "Until restart", effect: "Adrenaline rush, health regen", weight: "0.1 kg" },
  },
  {
    id: "meth",
    name: "Methamphetamine",
    type: "drug",
    rarity: "Epic",
    description:
      "+20% Run Speed for 420s. +25% Stamina Regen for 420s. -12% Health instantly. -30% Stamina Regen for 300s.",
    tags: ["Run speed", "Stamina"],
    image: asset("drugs/meth.png"),
    stats: { duration: "420s", effect: "Run speed, stamina regen", weight: "0.2 kg" },
  },
  {
    id: "og-kush",
    name: "OG Kush",
    type: "drug",
    rarity: "Common",
    description:
      "+10 Melee Damage for 600s. +5% Damage Resistance for 600s. -5% Run Speed for 600s. Increased aim sway for 600s.",
    tags: ["Melee", "Damage resistance"],
    image: asset("drugs/ogkush.png"),
    stats: { duration: "600s", effect: "Melee damage, damage resistance", weight: "0.3 kg" },
  },
  {
    id: "opioids",
    name: "Opioids",
    type: "drug",
    rarity: "Uncommon",
    description:
      "Gives Headshot King skill until restart. 8% Armor (reactive). -30% Health (Fentanyl). -25% Dehydration.",
    tags: ["Headshot King", "Reactive armor"],
    image: asset("drugs/opioids.png"),
    stats: { duration: "Until restart", effect: "Headshot king, reactive armor", weight: "0.1 kg" },
  },
  {
    id: "oxycodone-purple",
    name: "Purple Oxycodone",
    type: "drug",
    rarity: "Uncommon",
    description:
      "Gives Headshot King skill until restart. 8% Armor (reactive). -30% Health (Fentanyl). -25% Dehydration.",
    tags: ["Headshot King", "Reactive armor"],
    image: asset("drugs/oxycodon_purple.png"),
    stats: { duration: "Until restart", effect: "Headshot king, reactive armor", weight: "0.05 kg" },
  },
  {
    id: "oxycodone",
    name: "Oxycodone",
    type: "drug",
    rarity: "Common",
    description:
      "Gives Headshot King skill until restart. 8% Armor (reactive). -30% Health (Fentanyl). -25% Dehydration.",
    tags: ["Headshot King", "Reactive armor"],
    image: asset("drugs/oxycodone.png"),
    stats: { duration: "Until restart", effect: "Headshot king, reactive armor", weight: "0.05 kg" },
  },
  {
    id: "oxycodone-90",
    name: "Oxycodone 90",
    type: "drug",
    rarity: "Rare",
    description:
      "Gives Headshot King skill until restart. 8% Armor (reactive). -30% Health (Fentanyl). -25% Dehydration.",
    tags: ["Headshot King", "Reactive armor"],
    image: asset("drugs/oxycodone90.png"),
    stats: { duration: "Until restart", effect: "Headshot king, reactive armor", weight: "0.05 kg" },
  },
  {
    id: "oxycodons",
    name: "Oxycodons",
    type: "drug",
    rarity: "Common",
    description:
      "Gives Headshot King skill until restart. 8% Armor (reactive). -30% Health (Fentanyl). -25% Dehydration.",
    tags: ["Headshot King", "Reactive armor"],
    image: asset("drugs/oxycodons.png"),
    stats: { duration: "Until restart", effect: "Headshot king, reactive armor", weight: "0.3 kg" },
  },
  {
    id: "pcp",
    name: "PCP",
    type: "drug",
    rarity: "Rare",
    description:
      "+25% Melee Damage for 300s. +10% Damage Resistance for 300s. -15% Health instantly. Stamina drain for 300s.",
    tags: ["Melee", "Damage resistance"],
    image: asset("drugs/pcp.png"),
    stats: { duration: "300s", effect: "Melee damage, damage resistance", weight: "0.1 kg" },
  },
  {
    id: "percocet",
    name: "Percocet",
    type: "drug",
    rarity: "Common",
    description:
      "Gives Headshot King skill until restart. 8% Armor (reactive). -30% Health (Fentanyl). -25% Dehydration.",
    tags: ["Headshot King", "Reactive armor"],
    image: asset("drugs/percocet.png"),
    stats: { duration: "Until restart", effect: "Headshot king, reactive armor", weight: "0.05 kg" },
  },
  {
    id: "purple-haze",
    name: "Purple Haze",
    type: "drug",
    rarity: "Common",
    description:
      "+15% Health Regen. SpotEmGotEm skill until restart. Gets hungrier. Vehicle handling -5% for 600s.",
    tags: ["Health regen", "SpotEmGotEm"],
    image: asset("drugs/purplehaze.png"),
    stats: { duration: "Until restart", effect: "Health regen, spotEmGotEm", weight: "0.3 kg" },
  },
  {
    id: "shrooms",
    name: "Shrooms",
    type: "drug",
    rarity: "Uncommon",
    description:
      "20% Health Regen. 5% Damage Resistance for 600s. Increased aim sway for 600s. Hallucinations for 600s.",
    tags: ["Health regen", "Damage resistance"],
    image: asset("drugs/shrooms.png"),
    stats: { duration: "600s", effect: "Health regen, damage resistance", weight: "0.1 kg" },
  },
  {
    id: "sour-diesel",
    name: "Sour Diesel",
    type: "drug",
    rarity: "Common",
    description:
      "+5% Run Speed for 600s. +10% Stamina Regen for 600s. Stamina drains faster when sprinting. Mild blur for 600s.",
    tags: ["Run speed", "Stamina"],
    image: asset("drugs/sourdiesel.png"),
    stats: { duration: "600s", effect: "Run speed, stamina regen", weight: "0.3 kg" },
  },
  {
    id: "spice",
    name: "Spice",
    type: "drug",
    rarity: "Common",
    description:
      "+10% Damage Resistance for 300s. -20% Health (severe loss). Hallucinations for 300s.",
    tags: ["Damage resistance"],
    image: asset("drugs/spice.png"),
    stats: { duration: "300s", effect: "Damage resistance, hallucinations", weight: "0.2 kg" },
  },
  {
    id: "spongebobs",
    name: "Spongebobs",
    type: "drug",
    rarity: "Uncommon",
    description:
      "Adrenaline Rush skill until restart. 50% Health Regen. -5% Health instantly. -15% Stamina Regen for 300s.",
    tags: ["Adrenaline Rush", "Health regen"],
    image: asset("drugs/spongebobs.png"),
    stats: { duration: "Until restart", effect: "Adrenaline rush, health regen", weight: "0.05 kg" },
  },
  {
    id: "steroids",
    name: "Steroids",
    type: "drug",
    rarity: "Rare",
    description:
      "+20% Melee Damage until restart. +10% Damage Resistance until restart. -15% Stamina Regen for 300s.",
    tags: ["Melee", "Damage resistance"],
    image: asset("drugs/steroids.png"),
    stats: { duration: "Until restart", effect: "Melee damage, damage resistance", weight: "0.2 kg" },
  },
  {
    id: "supermans",
    name: "Supermans",
    type: "drug",
    rarity: "Uncommon",
    description:
      "Adrenaline Rush skill until restart. 50% Health Regen. -5% Health instantly. -15% Stamina Regen for 300s.",
    tags: ["Adrenaline Rush", "Health regen"],
    image: asset("drugs/supermans.png"),
    stats: { duration: "Until restart", effect: "Adrenaline rush, health regen", weight: "0.05 kg" },
  },
  {
    id: "telsas",
    name: "Telsas",
    type: "drug",
    rarity: "Uncommon",
    description:
      "Adrenaline Rush skill until restart. 50% Health Regen. -5% Health instantly. -15% Stamina Regen for 300s.",
    tags: ["Adrenaline Rush", "Health regen"],
    image: asset("drugs/telsas.png"),
    stats: { duration: "Until restart", effect: "Adrenaline rush, health regen", weight: "0.05 kg" },
  },
  {
    id: "thc",
    name: "THC Wax",
    type: "drug",
    rarity: "Common",
    description:
      "10% Health Regen. Reduced aim sway for 600s. -5% Speed for 600s. Stamina reduction for 600s.",
    tags: ["Health regen", "Aim sway"],
    image: asset("drugs/thc.png"),
    stats: { duration: "600s", effect: "Health regen, reduced aim sway", weight: "0.05 kg" },
  },
  {
    id: "whippets",
    name: "Whippets",
    type: "drug",
    rarity: "Common",
    description:
      "+5% Speed burst for 120s. -20% Stamina Regen for 120s.",
    tags: ["Speed"],
    image: asset("drugs/whippets.png"),
    stats: { duration: "120s", effect: "Speed burst, stamina drop", weight: "0.1 kg" },
  },
  {
    id: "xanax",
    name: "Xanax",
    type: "drug",
    rarity: "Common",
    description:
      "100% Health Regen. 10% Health Regen. Makes you slower for 300s.",
    tags: ["Health regen", "Sedation"],
    image: asset("drugs/xanax.png"),
    stats: { duration: "300s", effect: "Health regen, slowed movement", weight: "0.05 kg" },
  },
];

export const getItemsByTier = (tier: 1 | 1.5 | 2): CatalogItem[] =>
  catalogItems.filter((item) => item.tier === tier);

export const getWeaponsByTier = (tier: 1 | 1.5 | 2): CatalogItem[] =>
  catalogItems.filter((item) => item.type === "weapon" && item.tier === tier);

export const getRandomItems = (pool: CatalogItem[], count: number): CatalogItem[] => {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
