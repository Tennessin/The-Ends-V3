import { Smartphone } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { EffectList } from "../../../../components/ui/effect-list";
import type { CatalogItem, DrugStats, ItemType, WeaponStats } from "../../../../data/items";
import { catalogItems, tierLabel } from "../../../../data/items";
import {
  NOKIA_PHONE_DESCRIPTION,
  NOKIA_PHONE_PRICE,
  NOKIA_PHONE_TAGS,
  isNokiaPhoneItem,
} from "../../../../data/spinEligibility";

type FilterType = "ALL" | "WEAPONS" | "KNIVES" | "DRUGS" | "NOKIA";
type SortKey = "default" | "rarity" | "damage" | "name";

const filterButtons: { value: FilterType; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "WEAPONS", label: "Guns" },
  { value: "KNIVES", label: "Knives" },
  { value: "DRUGS", label: "Drugs" },
  { value: "NOKIA", label: "Nokia Phone" },
];

const filterTypeMap: Record<FilterType, ItemType | null> = {
  ALL: null,
  WEAPONS: "weapon",
  KNIVES: "knife",
  DRUGS: "drug",
  NOKIA: null,
};

const matchesFilter = (item: CatalogItem, filter: FilterType): boolean => {
  if (filter === "NOKIA") return isNokiaPhoneItem(item);
  const type = filterTypeMap[filter];
  return type === null || item.type === type;
};

const rarityOrder: Record<CatalogItem["rarity"], number> = {
  Common: 0,
  Uncommon: 1,
  Rare: 2,
  Epic: 3,
  Legendary: 4,
};

/** Rarity accent: badge colours + a thin top border on the card so rarity reads at a glance. */
const rarityStyle: Record<CatalogItem["rarity"], { badge: string; bar: string }> = {
  Common: { badge: "border-[#a296b6]/30 bg-[#a296b6]/10 text-[#c9bfd8]", bar: "bg-[#a296b6]/40" },
  Uncommon: { badge: "border-[#4ade80]/30 bg-[#4ade80]/10 text-[#86efac]", bar: "bg-[#4ade80]/70" },
  Rare: { badge: "border-[#60a5fa]/30 bg-[#60a5fa]/10 text-[#93c5fd]", bar: "bg-[#60a5fa]/70" },
  Epic: { badge: "border-[#c084fc]/30 bg-[#c084fc]/10 text-[#d8b4fe]", bar: "bg-[#c084fc]/70" },
  Legendary: { badge: "border-[#fb923c]/30 bg-[#fb923c]/10 text-[#fdba74]", bar: "bg-[#fb923c]/80" },
};

const isWeaponLike = (item: CatalogItem) => item.type === "weapon" || item.type === "knife";
const weaponStats = (item: CatalogItem): WeaponStats | null =>
  isWeaponLike(item) && item.stats ? (item.stats as WeaponStats) : null;
const drugStats = (item: CatalogItem): DrugStats | null =>
  item.type === "drug" && item.stats ? (item.stats as DrugStats) : null;

/**
 * Most guns share the same boilerplate description, so the card shows what actually
 * differs between them: the numbers. The full text still lives in the detail modal.
 */
const isBoilerplate = (item: CatalogItem) =>
  isWeaponLike(item) && /^Light sidearm for new players/.test(item.description);

function StatRow({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const pct = Math.max(2, Math.min(100, (value / max) * 100));
  return (
    <div className="flex items-center gap-2" aria-label={`${label} ${value}`}>
      <span className="w-[62px] shrink-0 [font-family:'Inter',Helvetica] text-[11px] font-bold text-[#a296b6]">
        {label}
      </span>
      <div className="h-1.5 flex-1 rounded-full bg-[#1a1424]">
        <div className="h-full rounded-full bg-[#c3b2df]" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-8 shrink-0 text-right [font-family:'Inter',Helvetica] text-[11px] font-bold text-[#f7f4fb]">
        {value}
      </span>
    </div>
  );
}

interface WeaponDrugCatalogSectionProps {
  onItemClick: (item: CatalogItem) => void;
}

export const WeaponDrugCatalogSection = ({ onItemClick }: WeaponDrugCatalogSectionProps): JSX.Element => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [sort, setSort] = useState<SortKey>("default");

  const counts = useMemo(() => {
    const c: Record<FilterType, number> = { ALL: catalogItems.length, WEAPONS: 0, KNIVES: 0, DRUGS: 0, NOKIA: 0 };
    for (const item of catalogItems) {
      if (item.type === "weapon") c.WEAPONS++;
      else if (item.type === "knife") c.KNIVES++;
      else if (item.type === "drug") c.DRUGS++;
      if (isNokiaPhoneItem(item)) c.NOKIA++;
    }
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = catalogItems.filter((item) => {
      const matchesType = matchesFilter(item, activeFilter);
      const matchesSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.rarity.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        (item.type === "drug" && item.description.toLowerCase().includes(q)) ||
        (isNokiaPhoneItem(item) && "nokia phone npc sale".includes(q));
      return matchesType && matchesSearch;
    });

    if (sort === "rarity") {
      list.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity] || a.name.localeCompare(b.name));
    } else if (sort === "damage") {
      list.sort((a, b) => (weaponStats(b)?.maxDamage ?? -1) - (weaponStats(a)?.maxDamage ?? -1));
    } else if (sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [search, activeFilter, sort]);

  return (
    <section
      id="weapon-catalog"
      className="flex w-full scroll-mt-20 flex-col items-start gap-7 px-4 py-0 pb-12 sm:px-6 md:px-8"
    >
      <header className="flex w-full max-w-[700px] flex-col items-start gap-3">
        <p className="flex items-center [font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#c3b2df]">
          Every gun, knife and drug
        </p>
        <h2 className="flex items-center [font-family:'Inter',Helvetica] text-[44px] font-black leading-[46.2px] tracking-[-1.76px] text-[#f7f4fb] max-sm:text-3xl max-sm:leading-tight">
          Gun &amp; Drug catalog
        </h2>
        <p className="[font-family:'Inter',Helvetica] text-[15px] font-normal leading-[25.5px] tracking-[0] text-[#a296b6]">
          Browse everything the illegal area can hand out. Guns show their real damage, range, fire rate and
          recoil; drugs show their PRO / CON roll. Click any card for the full breakdown.
        </p>
      </header>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
          {filterButtons.map(({ value, label }) => (
            <Button
              key={value}
              type="button"
              variant="ghost"
              aria-pressed={activeFilter === value}
              aria-label={`${label} (${counts[value]})`}
              onClick={() => setActiveFilter(value)}
              className={`h-auto rounded-xl px-4 py-2 transition-all duration-150 hover:bg-transparent ${
                activeFilter === value
                  ? "bg-[#c3b2df] text-[#09060d] hover:bg-[#c3b2df]"
                  : "border border-[#1a1424] bg-[#0d0913] text-[#a296b6] hover:text-[#f7f4fb]"
              }`}
            >
              <span className="[font-family:'Inter',Helvetica] text-[13px] font-bold">
                {label}
                <span className="ml-1.5 opacity-70">{counts[value]}</span>
              </span>
            </Button>
          ))}
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center lg:w-auto">
          <label className="relative w-full sm:max-w-xs">
            <span className="sr-only">Search items</span>
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a296b6]"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M10 10L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Search name, tag, rarity or effect…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-xl border border-[#1a1424] bg-[#0d0913] pl-9 pr-3 [font-family:'Inter',Helvetica] text-[13px] text-[#f7f4fb] placeholder-[#a296b6] outline-none focus:border-[#c3b2df]/40"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="sr-only">Sort items</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 rounded-xl border border-[#1a1424] bg-[#0d0913] px-3 [font-family:'Inter',Helvetica] text-[13px] font-bold text-[#f7f4fb] outline-none focus:border-[#c3b2df]/40"
            >
              <option value="default">Sort: default</option>
              <option value="rarity">Sort: rarity</option>
              <option value="damage">Sort: damage</option>
              <option value="name">Sort: A–Z</option>
            </select>
          </label>
        </div>
      </div>

      <p className="-mt-3 [font-family:'Inter',Helvetica] text-xs text-[#a296b6]" aria-live="polite">
        {filtered.length === catalogItems.length
          ? `${filtered.length} items`
          : `${filtered.length} of ${catalogItems.length} items`}
      </p>

      {filtered.length === 0 ? (
        <div className="flex w-full flex-col items-start gap-3 rounded-lg border border-[#1a1424] bg-[#0b0711] p-6">
          <p className="[font-family:'Inter',Helvetica] text-sm text-[#a296b6]">
            Nothing matches “{search}”.
          </p>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setSearch("");
              setActiveFilter("ALL");
            }}
            className="h-auto rounded-xl border border-[#1a1424] bg-[#0d0913] px-4 py-2 text-[13px] font-bold text-[#f7f4fb] hover:bg-[#1a1424]"
          >
            Clear search
          </Button>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((item) => {
            const rarity = rarityStyle[item.rarity] ?? rarityStyle.Common;
            const ws = weaponStats(item);
            const ds = drugStats(item);
            const nokia = isNokiaPhoneItem(item);
            const showStats = ws !== null && isBoilerplate(item);
            return (
              <Card
                key={item.id}
                role="button"
                tabIndex={0}
                aria-label={`${item.name} — ${item.rarity} ${item.type}. Show details.`}
                onClick={() => onItemClick(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onItemClick(item);
                  }
                }}
                className="group relative h-auto cursor-pointer overflow-hidden rounded-lg border border-solid border-[#1a1424] bg-[#0b0711] shadow-none transition-all duration-150 hover:-translate-y-0.5 hover:border-[#c3b2df]/40 hover:shadow-[0_0_16px_rgba(184,199,217,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c3b2df]/50"
              >
                <div className={`absolute inset-x-0 top-0 h-[3px] ${rarity.bar}`} aria-hidden />
                <CardContent className="flex h-full flex-col p-[17px]">
                  <div className="flex h-[120px] items-center justify-center rounded-md border border-solid border-[#1a1424] bg-[#0e0e0e] p-3.5">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        width={100}
                        height={100}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <span className="text-4xl opacity-50" aria-hidden>
                        {item.type === "drug" ? "💊" : item.type === "knife" ? "🔪" : "🔫"}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <h3 className="pt-px [font-family:'Inter',Helvetica] text-lg font-normal leading-[20.7px] tracking-[-0.36px] text-[#f7f4fb]">
                      {item.name}
                    </h3>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <Badge
                        className={`h-7 rounded-xl border border-solid px-2.5 py-1.5 [font-family:'Inter',Helvetica] text-[11px] font-bold leading-[normal] tracking-[0] hover:bg-transparent ${rarity.badge}`}
                      >
                        {item.rarity}
                      </Badge>
                      {item.tier !== undefined && (
                        <span className="[font-family:'Inter',Helvetica] text-[10px] font-bold text-[#a296b6]">
                          Wheel tier {[item.tier, ...(item.spinTiers ?? [])].map(tierLabel).sort().join(" & ")}
                        </span>
                      )}
                      {nokia && (
                        <Badge className="gap-1 rounded-xl border border-[#60a5fa]/35 bg-[#172554] px-2.5 py-1.5 [font-family:'Inter',Helvetica] text-[10px] font-bold text-[#bfdbfe] hover:bg-[#172554]">
                          <Smartphone className="h-3 w-3" aria-hidden="true" />
                          Nokia Phone
                        </Badge>
                      )}
                    </div>
                  </div>

                  {showStats && ws ? (
                    <div className="mt-3 flex flex-col gap-1.5">
                      <StatRow label="Damage" value={ws.maxDamage} />
                      {item.type === "weapon" && (
                        <>
                          <StatRow label="Range" value={ws.range} />
                          <StatRow label="Fire rate" value={ws.fireRate} />
                          <StatRow label="Recoil" value={ws.recoil} />
                        </>
                      )}
                    </div>
                  ) : nokia ? (
                    <p className="mt-3 [font-family:'Inter',Helvetica] text-sm font-bold leading-[22.4px] text-[#bfdbfe]">
                      {NOKIA_PHONE_DESCRIPTION} Price: {NOKIA_PHONE_PRICE}
                    </p>
                  ) : item.type === "drug" ? (
                    <div className="mt-3">
                      <EffectList description={item.description} variant="compact" />
                    </div>
                  ) : (
                    <p className="mt-3 line-clamp-3 [font-family:'Inter',Helvetica] text-sm font-normal leading-[22.4px] tracking-[0] text-[#a296b6]">
                      {item.description}
                    </p>
                  )}

                  {ds && !nokia && (
                    <p className="mt-2 [font-family:'Inter',Helvetica] text-[11px] text-[#a296b6]">
                      <span className="font-bold text-[#c3b2df]">Lasts:</span> {ds.duration}
                      <span className="mx-1.5 opacity-40">·</span>
                      <span className="font-bold text-[#c3b2df]">Weight:</span> {ds.weight}
                    </p>
                  )}

                  <div className="mt-auto flex flex-wrap items-start gap-2 pt-4">
                    {(nokia ? NOKIA_PHONE_TAGS.filter((t) => t !== "Nokia Phone") : item.tags).map((tag) => (
                      <Badge
                        key={`${item.id}-${tag}`}
                        className="rounded-xl border border-solid border-[#1a1424] bg-[#0d0913] px-2.5 py-2 [font-family:'Inter',Helvetica] text-xs font-bold leading-[normal] tracking-[0] text-[#f7f4fb] hover:bg-[#0d0913]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
};
