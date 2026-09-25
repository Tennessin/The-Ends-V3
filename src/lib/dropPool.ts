import { catalogItems, type CatalogItem, type ItemType } from "../data/items";
import { isSpinEligible } from "../data/spinEligibility";

export type Tier = 1 | 1.5 | 2;
export const TIERS: Tier[] = [1, 1.5, 2];

/** Player-facing tier number: internal 1 / 1.5 / 2 are shown as 1 / 2 / 3. */
export const tierNumber = (tier: Tier): number => (tier === 1 ? 1 : tier === 1.5 ? 2 : 3);

/** Every weapons roll: this many guns, then this many knives. */
export const GUNS_PER_ROLL = 1;
export const KNIVES_PER_ROLL = 3;
export const DRUG_QUANTITIES = ["x50", "x100", "x150"] as const;

/**
 * The pool the wheel draws from. One place for this rule so the wheel, the
 * catalog percentages and the drop code all agree.
 */
export const getPool = (tier: Tier, category: ItemType): CatalogItem[] =>
  catalogItems.filter(
    (item) =>
      isSpinEligible(item) &&
      item.type === category &&
      (category === "drug" ||
        (category === "knife" && item.tier === undefined && !item.spinTiers) ||
        item.tier === tier ||
        item.spinTiers?.includes(tier)),
  );

export interface DropChance {
  tier: Tier;
  /** Chance of this item on a single pull from its pool (0–1). */
  perPull: number;
  /** Chance of seeing it at least once in a full roll (guns ×1, knives ×3, drugs ×1). */
  perRoll: number;
  poolSize: number;
}

const pullsFor = (type: ItemType): number => (type === "knife" ? KNIVES_PER_ROLL : type === "weapon" ? GUNS_PER_ROLL : 1);

/** Where and how often an item drops. Empty for items that never spin. */
export const dropChances = (item: CatalogItem): DropChance[] => {
  if (!isSpinEligible(item)) return [];
  const pulls = pullsFor(item.type);
  const out: DropChance[] = [];
  for (const tier of TIERS) {
    const pool = getPool(tier, item.type);
    if (!pool.some((p) => p.id === item.id)) continue;
    const perPull = 1 / pool.length;
    out.push({ tier, perPull, perRoll: 1 - Math.pow(1 - perPull, pulls), poolSize: pool.length });
  }
  // Drugs and untiered knives have the same pool on every tier: collapse to one entry.
  if (out.length === TIERS.length && out.every((c) => c.poolSize === out[0].poolSize)) {
    return [out[0]];
  }
  return out;
};

export const formatPercent = (p: number): string => {
  const pct = p * 100;
  if (pct >= 10) return `${pct.toFixed(0)}%`;
  if (pct >= 1) return `${pct.toFixed(1)}%`;
  return `${pct.toFixed(2)}%`;
};

export const formatOdds = (p: number): string => `1 in ${Math.round(1 / p)}`;
