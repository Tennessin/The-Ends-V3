import * as React from "react";
import { cn } from "../../lib/utils";
import type { CatalogItem, WeaponStats, DrugStats } from "../../data/items";
import { EffectList } from "./effect-list";
import {
  NOKIA_PHONE_DESCRIPTION,
  NOKIA_PHONE_PRICE,
  NOKIA_PHONE_TAGS,
  isNokiaPhoneItem,
} from "../../data/spinEligibility";

interface DetailModalProps {
  item: CatalogItem | null;
  drugQuantity?: string;
  onClose: () => void;
}

const rarityColors: Record<string, string> = {
  Common: "text-[#a296b6] border-[#a296b6]/30 bg-[#a296b6]/10",
  Uncommon: "text-[#4ade80] border-[#4ade80]/30 bg-[#4ade80]/10",
  Rare: "text-[#60a5fa] border-[#60a5fa]/30 bg-[#60a5fa]/10",
  Epic: "text-[#c084fc] border-[#c084fc]/30 bg-[#c084fc]/10",
  Legendary: "text-[#fb923c] border-[#fb923c]/30 bg-[#fb923c]/10",
};

const typeLabels: Record<string, string> = {
  weapon: "Gun",
  drug: "Drug",

};

function StatBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div className="h-1.5 w-full rounded-full bg-[#1a1424]">
      <div
        className="h-full rounded-full bg-[#c3b2df] transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function DetailModal({ item, drugQuantity, onClose }: DetailModalProps) {
  React.useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose]);

  if (!item) return null;

  const isWeapon = item.type === "weapon" || item.type === "knife";
  const isNokiaPhone = isNokiaPhoneItem(item);
  const weaponStats = isWeapon ? (item.stats as WeaponStats) : null;
  const drugStats = !isWeapon ? (item.stats as DrugStats) : null;
  // Nokia-phone drugs are NPC-sale goods only: no PRO / CON roll, so no effect text or stats.
  const displayTags = isNokiaPhone ? NOKIA_PHONE_TAGS.filter((t) => t !== "Nokia Phone") : item.tags;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${item.name}`}
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-xl border border-[#1a1424] bg-[#0b0711] shadow-[0_0_40px_rgba(184,199,217,0.08)]",
          "animate-in fade-in zoom-in-95 duration-200",
        )}
      >
        <div className="flex items-start justify-between border-b border-[#1a1424] p-5">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-md border px-2 py-0.5 text-[11px] font-bold tracking-[0.5px]",
                  rarityColors[item.rarity] ?? rarityColors["Common"],
                )}
              >
                {item.rarity}
              </span>
              <span className="rounded-md border border-[#1a1424] bg-[#0d0913] px-2 py-0.5 text-[11px] font-bold tracking-[0.5px] text-[#a296b6]">
                {typeLabels[item.type]}
              </span>
              {item.tier !== undefined && (
                <span className="rounded-md border border-[#1a1424] bg-[#0d0913] px-2 py-0.5 text-[11px] font-bold tracking-[0.5px] text-[#a296b6]">
                  Tier {item.tier}
                </span>
              )}
              {isNokiaPhone && (
                <span className="rounded-md border border-[#60a5fa]/35 bg-[#172554] px-2 py-0.5 text-[11px] font-bold tracking-[0.5px] text-[#bfdbfe]">
                  Nokia Phone
                </span>
              )}
            </div>
            <h2 className="[font-family:'Inter',Helvetica] text-2xl font-black tracking-[-0.8px] text-[#f7f4fb]">
              {item.name}{drugQuantity ? ` ${drugQuantity}` : ""}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#1a1424] bg-[#0d0913] text-[#a296b6] transition-colors hover:border-[#c3b2df]/30 hover:text-[#f7f4fb]"
            aria-label="Close modal"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-5">
          {!isNokiaPhone && item.type === "drug" && (
            <EffectList description={item.description} variant="full" />
          )}
          {!isNokiaPhone && item.type !== "drug" && item.description && (
            <p className="[font-family:'Inter',Helvetica] text-sm font-normal leading-[22px] text-[#a296b6]">
              {item.description}
            </p>
          )}
          {isNokiaPhone && (
            <p className="[font-family:'Inter',Helvetica] text-sm font-bold leading-[22px] text-[#bfdbfe]">
              {NOKIA_PHONE_DESCRIPTION}
            </p>
          )}

          {weaponStats && (
            <div className="space-y-3">
              <h3 className="[font-family:'Inter',Helvetica] text-[11px] font-bold tracking-[1px] text-[#c3b2df] uppercase">
                Combat Stats
              </h3>
              <div className="space-y-2.5">
                {[
                  {
                    label: "Damage",
                    value: weaponStats.maxDamage,
                    text: `${weaponStats.minDamage}–${weaponStats.maxDamage}`,
                  },
                  { label: "Range", value: weaponStats.range, text: `${weaponStats.range}` },
                  { label: "Fire Rate", value: weaponStats.fireRate, text: `${weaponStats.fireRate}` },
                  { label: "Recoil", value: weaponStats.recoil, text: `${weaponStats.recoil}` },
                ]
                  .filter(({ label }) => item.type !== "knife" || label === "Damage")
                  .map(({ label, value, text }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 [font-family:'Inter',Helvetica] text-xs font-bold text-[#a296b6]">
                      {label}
                    </span>
                    <div className="flex flex-1 items-center gap-2">
                      <StatBar value={value} />
                      <span className="w-12 shrink-0 text-right [font-family:'Inter',Helvetica] text-xs font-bold text-[#f7f4fb]">
                        {text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isNokiaPhone && (
            <div className="space-y-3">
              <h3 className="[font-family:'Inter',Helvetica] text-[11px] font-bold tracking-[1px] text-[#c3b2df] uppercase">
                Nokia Phone Sale
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: "Purpose", value: "Sold to NPC customers" },
                  { label: "Price", value: NOKIA_PHONE_PRICE },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1 rounded-md border border-[#1a1424] bg-[#0d0913] px-3.5 py-3">
                    <span className="[font-family:'Inter',Helvetica] text-[11px] font-bold tracking-[0.8px] text-[#c3b2df] uppercase">{label}</span>
                    <span className="[font-family:'Inter',Helvetica] text-sm font-normal text-[#f7f4fb]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {drugStats && !isNokiaPhone && (
            <div className="space-y-3">
              <h3 className="[font-family:'Inter',Helvetica] text-[11px] font-bold tracking-[1px] text-[#c3b2df] uppercase">
                Item Stats
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: "Duration", value: drugStats.duration },
                  { label: "Effect", value: drugStats.effect },
                  { label: "Weight", value: drugStats.weight },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 rounded-md border border-[#1a1424] bg-[#0d0913] px-3.5 py-3"
                  >
                    <span className="[font-family:'Inter',Helvetica] text-[11px] font-bold tracking-[0.8px] text-[#c3b2df] uppercase">
                      {label}
                    </span>
                    <span className="[font-family:'Inter',Helvetica] text-sm font-normal text-[#f7f4fb]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {displayTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-xl border border-[#1a1424] bg-[#0b0711] px-2.5 py-[7px] [font-family:'Inter',Helvetica] text-xs font-bold text-[#f7f4fb]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
