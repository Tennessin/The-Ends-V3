import { useMemo, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import type { CatalogItem, ItemType } from "../../../../data/items";
import { catalogItems } from "../../../../data/items";

type FilterType = "ALL" | "WEAPONS" | "DRUGS";

const filterButtons: { value: FilterType; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "WEAPONS", label: "Weapons" },
  { value: "DRUGS", label: "Drugs" },

];

const filterTypeMap: Record<FilterType, ItemType | null> = {
  ALL: null,
  WEAPONS: "weapon",
  DRUGS: "drug",

};

interface WeaponDrugCatalogSectionProps {
  onItemClick: (item: CatalogItem) => void;
}

export const WeaponDrugCatalogSection = ({
  onItemClick,
}: WeaponDrugCatalogSectionProps): JSX.Element => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");

  const filtered = useMemo(() => {
    const typeFilter = filterTypeMap[activeFilter];
    return catalogItems.filter((item) => {
      const matchesType = typeFilter === null || item.type === typeFilter;
      const matchesSearch =
        search.trim() === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <section
      id="weapon-catalog"
      className="flex w-full scroll-mt-6 flex-col items-start gap-7 px-8 py-0 pb-12"
    >
      <header className="flex w-full max-w-[700px] flex-col items-start gap-3">
        <p className="flex items-center [font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#b8c7d9]">
          All weapons + descriptions
        </p>
        <h2 className="flex items-center [font-family:'Inter',Helvetica] text-[44px] font-black leading-[46.2px] tracking-[-1.76px] text-[#f5f7fa] max-sm:text-3xl max-sm:leading-tight">
          Weapon &amp; Drug catalog
        </h2>
        <p className="[font-family:'Inter',Helvetica] text-[15px] font-normal leading-[25.5px] tracking-[0] text-[#9aa6b2]">
          A full browse area so players can see every main weapon and drug
          reward, what it is good for, and which route or playstyle it fits best
          before they use the random selector.
        </p>
      </header>

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {filterButtons.map(({ value, label }) => (
            <Button
              key={value}
              type="button"
              variant="ghost"
              onClick={() => setActiveFilter(value)}
              className={`h-auto rounded-xl px-4 py-2 transition-all duration-150 hover:bg-transparent ${
                activeFilter === value
                  ? "bg-[#b8c7d9] text-[#07090c] hover:bg-[#b8c7d9]"
                  : "border border-[#161b22] bg-[#0a0d12] text-[#9aa6b2] hover:text-[#f5f7fa]"
              }`}
            >
              <span className="[font-family:'Inter',Helvetica] text-[13px] font-bold">
                {label}
              </span>
            </Button>
          ))}
        </div>
        <div className="relative w-full max-w-xs">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa6b2]"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
            <path
              d="M10 10L13 13"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-[#161b22] bg-[#0a0d12] pl-9 pr-3 [font-family:'Inter',Helvetica] text-[13px] text-[#f5f7fa] placeholder-[#9aa6b2] outline-none focus:border-[#b8c7d9]/40"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="[font-family:'Inter',Helvetica] text-sm text-[#9aa6b2]">
          No items match your search.
        </p>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filtered.map((item) => (
            <Card
              key={item.id}
              onClick={() => onItemClick(item)}
              className="h-auto cursor-pointer rounded-lg border border-solid border-[#161b22] bg-[#080b10] shadow-none transition-all duration-150 hover:border-[#b8c7d9]/40 hover:shadow-[0_0_16px_rgba(184,199,217,0.07)]"
            >
              <CardContent className="flex h-full flex-col p-[17px]">
                <div className="flex h-[120px] items-center justify-center rounded-md border border-solid border-[#161b22] bg-[#0e0e0e] p-3.5">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-4xl opacity-50">
                      {item.type === "drug" ? "💊" : "🔫"}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <h3 className="pt-px [font-family:'Inter',Helvetica] text-lg font-normal leading-[20.7px] tracking-[-0.36px] text-[#f5f7fa]">
                    {item.name}
                  </h3>
                  <Badge className="h-7 shrink-0 rounded-xl border border-solid border-[#161b22] bg-[#0a0d12] px-2.5 py-1.5 [font-family:'Inter',Helvetica] text-[11px] font-bold leading-[normal] tracking-[0] text-[#b8c7d9] hover:bg-[#0a0d12]">
                    {item.rarity}
                  </Badge>
                </div>
                <p className="mt-3 [font-family:'Inter',Helvetica] text-sm font-normal leading-[22.4px] tracking-[0] text-[#9aa6b2] line-clamp-3">
                  {item.description}
                </p>
                <div className="mt-auto flex flex-wrap items-start gap-2 pt-5">
                  {item.tags.map((tag) => (
                    <Badge
                      key={`${item.id}-${tag}`}
                      className="rounded-xl border border-solid border-[#161b22] bg-[#0a0d12] px-2.5 py-2 [font-family:'Inter',Helvetica] text-xs font-bold leading-[normal] tracking-[0] text-[#f5f7fa] hover:bg-[#0a0d12]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};
