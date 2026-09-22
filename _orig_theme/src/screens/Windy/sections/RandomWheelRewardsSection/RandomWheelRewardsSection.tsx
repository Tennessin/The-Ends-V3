import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import type { CatalogItem, ItemType } from "../../../../data/items";
import { catalogItems, getRandomItems } from "../../../../data/items";

type Tier = 1 | 1.5 | 2;

const tierOptions: { value: string; label: string; tier: Tier }[] = [
  { value: "tier-1", label: "TIER 1", tier: 1 },
  { value: "tier-1-5", label: "TIER 1.5", tier: 1.5 },
  { value: "tier-2", label: "TIER 2", tier: 2 },
];

const spinCountByTier: Record<Tier, number> = {
  1: 6,
  1.5: 8,
  2: 10,
};

const categoryOptions: { value: string; label: string; type: ItemType }[] = [
  { value: "firearms", label: "FIREARMS", type: "weapon" },
  { value: "drugs", label: "DRUGS", type: "drug" },
];

const drugQuantities = ["x50", "x100", "x150"] as const;

const filterTabsListClass =
  "h-auto w-full justify-start gap-2 rounded-xl border border-solid border-[#1c1c1c] bg-[#ffffff08] p-1.5 lg:w-auto";
const filterTabsTriggerClass =
  "h-auto rounded-xl px-[22px] py-3 [font-family:'Inter',Helvetica] text-[13px] font-normal leading-[normal] tracking-[0.78px] text-[#9a9a96] data-[state=active]:bg-[#b7b7b1] data-[state=active]:text-[#050505]";

const SLOT_COUNT = 10;
const DICE_SLOT = 9;
/** Center of the 9 item slots (0–8); the pick / highlight stays here while the strip shuffles. */
const PICK_SLOT_INDEX = Math.floor((SLOT_COUNT - 2) / 2);
const STEPS_PER_SPIN = 24;

interface SlotItemProps {
  item: CatalogItem | null;
  isDice: boolean;
  isHighlighted: boolean;
  isResult: boolean;
  onClick?: () => void;
}

function DiceIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 10H12C13.1038 10 14 10.8962 14 12V20C14 21.1038 13.1038 22 12 22H4C2.89617 22 2 21.1038 2 20V12C2 10.8962 2.89617 10 4 10V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.92 14.0001L21.42 10.5001C22.1885 9.64771 22.1885 8.3524 21.42 7.50005L16.42 2.58005C15.5677 1.81153 14.2723 1.81153 13.42 2.58005L10 6.00005M6 18.0001H6.01M10 14.0001H10.01M15 6.00005H15.01M18 9.00005H18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SpinnerIcon({ className = "h-6 w-6 animate-spin" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const rarityGlow: Record<string, string> = {
  Common: "",
  Uncommon: "shadow-[0_0_12px_rgba(74,222,128,0.15)]",
  Rare: "shadow-[0_0_12px_rgba(96,165,250,0.2)]",
  Epic: "shadow-[0_0_14px_rgba(251,146,60,0.25)]",
  Legendary: "shadow-[0_0_18px_rgba(251,146,60,0.35)]",
};

function SlotItem({ item, isDice, isHighlighted, isResult, onClick }: SlotItemProps) {
  const base =
    "relative flex flex-col items-center justify-center gap-2 rounded-lg border p-3 transition-all duration-100 cursor-default";
  const highlighted = isHighlighted
    ? "border-[#b8c7d9] bg-[#b8c7d9]/10 scale-[1.04]"
    : isResult
    ? "border-[#b8c7d9] bg-[#b8c7d9]/08 " + (item ? rarityGlow[item.rarity] ?? "" : "")
    : "border-[#161b22] bg-[#080b10]";

  return (
    <div
      className={`${base} ${highlighted} ${onClick ? "cursor-pointer hover:border-[#b8c7d9]/50" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {isDice ? (
        <DiceIcon className="text-white" />
      ) : item ? (
        <>
          <div className="flex h-14 w-full items-center justify-center rounded-md bg-[#0e0e0e]">
            {item.image ? (
              <img src={item.image} alt={item.name} className="h-10 w-auto object-contain" />
            ) : (
              <span className="text-2xl">
                {item.type === "drug" ? "\uD83D\uDC8A" : "\uD83D\uDD2B"}
              </span>
            )}
          </div>
          <p className="w-full truncate text-center [font-family:'Inter',Helvetica] text-[11px] font-bold text-[#f5f7fa]">
            {item.name}
          </p>
          <span className="[font-family:'Inter',Helvetica] text-[10px] font-normal text-[#9aa6b2]">
            {item.rarity}
          </span>
        </>
      ) : (
        <div className="h-14 w-full animate-pulse rounded-md bg-[#161b22]" />
      )}
    </div>
  );
}

interface RandomWheelRewardsSectionProps {
  onItemSelected: (item: CatalogItem, quantity?: string) => void;
}

export const RandomWheelRewardsSection = ({
  onItemSelected,
}: RandomWheelRewardsSectionProps): JSX.Element => {
  const [activeTierValue, setActiveTierValue] = useState("tier-1");
  const [activeCategoryValue, setActiveCategoryValue] = useState("firearms");
  const [slots, setSlots] = useState<(CatalogItem | null)[]>(Array(SLOT_COUNT).fill(null));
  const [isSpinning, setIsSpinning] = useState(false);
  const [highlightedSlot, setHighlightedSlot] = useState<number | null>(null);
  const [resultSlot, setResultSlot] = useState<number | null>(null);

  const [currentSpin, setCurrentSpin] = useState(0);
  const [totalSpins, setTotalSpins] = useState(0);
  const [dropResults, setDropResults] = useState<CatalogItem[]>([]);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sequenceCancelledRef = useRef(false);

  const activeTier = tierOptions.find((t) => t.value === activeTierValue)!.tier;
  const activeCategory = categoryOptions.find((c) => c.value === activeCategoryValue)!.type;
  const isDrugMode = activeCategory === "drug";

  const getPool = useCallback(
    (tier: Tier, category: ItemType) =>
      catalogItems.filter(
        (item) =>
          item.type === category &&
          (category === "drug" ||
            item.tier === tier ||
            item.spinTiers?.includes(tier)),
      ),
    [],
  );

  const buildSlotsFromPool = useCallback((pool: CatalogItem[], startIndex: number) => {
    const newSlots: (CatalogItem | null)[] = [...Array(SLOT_COUNT - 1)].map((_, i) => {
      if (pool.length === 0) return null;
      return pool[(startIndex + i) % pool.length] ?? null;
    });
    newSlots.push(null);
    return newSlots;
  }, []);

  const refreshSlots = useCallback(
    (tier: Tier, category: ItemType) => {
      const pool = getPool(tier, category);
      const shuffled = getRandomItems(pool, pool.length);
      const start = shuffled.length ? Math.floor(Math.random() * shuffled.length) : 0;
      setSlots(buildSlotsFromPool(shuffled, start));
      setResultSlot(null);
      setHighlightedSlot(null);
    },
    [buildSlotsFromPool, getPool],
  );

  useEffect(() => {
    refreshSlots(activeTier, activeCategory);
  }, [activeTier, activeCategory, refreshSlots]);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const runSingleSpin = useCallback(
    (pool: CatalogItem[]): Promise<{ slot: number; item: CatalogItem | null; frameSlots: (CatalogItem | null)[] }> => {
      return new Promise((resolve) => {
        const shuffled = getRandomItems(pool, pool.length);
        let startIndex = Math.floor(Math.random() * shuffled.length);
        let step = 0;

        setResultSlot(null);
        setSlots(buildSlotsFromPool(shuffled, startIndex));
        setHighlightedSlot(PICK_SLOT_INDEX);

        const tick = () => {
          if (sequenceCancelledRef.current) return;
          step++;
          startIndex = (startIndex + 1) % shuffled.length;
          const nextSlots = buildSlotsFromPool(shuffled, startIndex);
          setSlots(nextSlots);
          setHighlightedSlot(PICK_SLOT_INDEX);

          if (step >= STEPS_PER_SPIN) {
            setHighlightedSlot(null);
            setResultSlot(PICK_SLOT_INDEX);
            const pick = nextSlots[PICK_SLOT_INDEX] ?? null;
            resolve({ slot: PICK_SLOT_INDEX, item: pick, frameSlots: nextSlots });
          } else {
            const delay = step < 12 ? 45 : step < 18 ? 70 : 120 + (step - 18) * 60;
            timeoutRef.current = setTimeout(tick, delay);
          }
        };

        timeoutRef.current = setTimeout(tick, 45);
      });
    },
    [buildSlotsFromPool],
  );

  const handleRoll = useCallback(async () => {
    if (isSpinning) return;
    const pool = getPool(activeTier, activeCategory);
    if (pool.length === 0) return;

    sequenceCancelledRef.current = false;
    setDropResults([]);

    if (isDrugMode) {
      const spins = 1;
      setTotalSpins(spins);
      setCurrentSpin(1);
      setIsSpinning(true);

      const result = await runSingleSpin(pool);
      setIsSpinning(false);
      setCurrentSpin(0);
      setTotalSpins(0);

      if (result.item) {
        const qty = drugQuantities[Math.floor(Math.random() * drugQuantities.length)];
        setTimeout(() => onItemSelected(result.item!, qty), 250);
      }
    } else {
      const spins = spinCountByTier[activeTier];
      setTotalSpins(spins);
      setIsSpinning(true);
      const collected: CatalogItem[] = [];

      for (let i = 0; i < spins; i++) {
        if (sequenceCancelledRef.current) break;
        setCurrentSpin(i + 1);
        const result = await runSingleSpin(pool);
        if (result.item) {
          collected.push(result.item);
          setDropResults([...collected]);
        }
        if (i < spins - 1 && !sequenceCancelledRef.current) {
          await new Promise<void>((r) => {
            timeoutRef.current = setTimeout(r, 400);
          });
        }
      }

      setIsSpinning(false);
      setCurrentSpin(0);
      setTotalSpins(0);
    }
  }, [activeTier, activeCategory, getPool, isDrugMode, isSpinning, onItemSelected, runSingleSpin]);

  const handleTierChange = (value: string) => {
    if (isSpinning) return;
    setActiveTierValue(value);
  };

  const handleCategoryChange = (value: string) => {
    if (isSpinning) return;
    setActiveCategoryValue(value);
    setDropResults([]);
  };

  useEffect(() => {
    return () => {
      sequenceCancelledRef.current = true;
      clearTimer();
    };
  }, [clearTimer]);

  const buttonText = isSpinning
    ? `SPINNING ${currentSpin}/${totalSpins}...`
    : "ROLL RANDOM";

  return (
    <section className="relative w-full">
      <style>{`
        @keyframes resultPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(184,199,217,0.3); }
          50% { box-shadow: 0 0 0 6px rgba(184,199,217,0); }
        }
        .result-pulse { animation: resultPulse 1.2s ease-out 1; }
      `}</style>
      <div className="flex w-full flex-col gap-4 px-4 py-0 lg:flex-row lg:items-start lg:justify-between">
        <Tabs value={activeCategoryValue} onValueChange={handleCategoryChange} className="w-full lg:w-auto">
          <TabsList className={filterTabsListClass}>
            {categoryOptions.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className={filterTabsTriggerClass}
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <header className="flex min-w-0 flex-1 flex-col items-start lg:items-center">
          <p className="mt-[-1.00px] flex w-fit items-center [font-family:'Inter',Helvetica] text-xs font-normal leading-[normal] tracking-[1.44px] text-[#b7b7b1]">
            WINDY CITY V5 &bull; ILLEGAL AREA
          </p>
          <h2 className="mt-[11px] flex w-fit items-center whitespace-nowrap [font-family:'Inter',Helvetica] text-[40px] font-black leading-[40px] tracking-[-2.08px] text-[#f3f3f1] sm:text-[52px] sm:leading-[52px]">
            RANDOM WHEEL
          </h2>
        </header>
        {!isDrugMode && (
          <Tabs value={activeTierValue} onValueChange={handleTierChange} className="w-full lg:w-auto">
            <TabsList className={filterTabsListClass}>
              {tierOptions.map((tier) => (
                <TabsTrigger
                  key={tier.value}
                  value={tier.value}
                  className={filterTabsTriggerClass}
                >
                  {tier.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </div>

      <div className="mt-6 px-4">
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-5 lg:grid-cols-10">
          {slots.map((item, index) => {
            const isDice = index === DICE_SLOT;
            const isHighlighted = highlightedSlot === index;
            const isResult = resultSlot === index;
            return (
              <SlotItem
                key={index}
                item={item}
                isDice={isDice}
                isHighlighted={isHighlighted}
                isResult={isResult}
                onClick={!isSpinning && item && !isDice ? () => onItemSelected(item) : undefined}
              />
            );
          })}
        </div>

        <Button
          type="button"
          disabled={isSpinning}
          onClick={handleRoll}
          className="mt-4 h-auto w-full gap-4 rounded-md bg-[#f7f5f2] px-6 py-5 text-[#070607] transition-opacity hover:bg-[#ebe7e2] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSpinning ? (
            <SpinnerIcon className="h-6 w-6 animate-spin opacity-90" />
          ) : (
            <DiceIcon className="h-6 w-6 opacity-100" />
          )}
          <span className="[font-family:'Inter',Helvetica] text-center text-xl font-black tracking-[1.60px]">
            {buttonText}
          </span>
        </Button>
      </div>

      {!isDrugMode && dropResults.length > 0 && (
        <div className="mt-6 px-4">
          <div className="rounded-xl border border-[#1c1c1c] bg-[#080b10] p-4">
            <h3 className="mb-4 [font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[1.2px] text-[#b8c7d9]">
              Your Drop Results
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {dropResults.map((item, index) => (
                <button
                  key={`${item.id}-${index}`}
                  type="button"
                  onClick={() => onItemSelected(item)}
                  className={`flex h-full cursor-pointer flex-col rounded-lg border border-solid border-[#161b22] bg-[#080b10] p-[17px] text-left transition-all duration-150 hover:border-[#b8c7d9]/40 hover:shadow-[0_0_16px_rgba(184,199,217,0.07)]`}
                >
                  <Badge className="mb-3 w-fit rounded-xl border border-solid border-[#161b22] bg-[#0a0d12] px-2.5 py-1.5 [font-family:'Inter',Helvetica] text-[11px] font-bold tracking-[0.02em] text-[#b8c7d9] hover:bg-[#0a0d12] normal-case">
                    weapon {index + 1}
                  </Badge>
                  <div className="flex h-[120px] items-center justify-center rounded-md border border-solid border-[#161b22] bg-[#0e0e0e] p-3.5">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-4xl opacity-50">
                        {item.type === "drug" ? "\uD83D\uDC8A" : "\uD83D\uDD2B"}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <h4 className="pt-px [font-family:'Inter',Helvetica] text-lg font-normal leading-[20.7px] tracking-[-0.36px] text-[#f5f7fa]">
                      {item.name}
                    </h4>
                    <Badge className="h-7 shrink-0 rounded-xl border border-solid border-[#161b22] bg-[#0a0d12] px-2.5 py-1.5 [font-family:'Inter',Helvetica] text-[11px] font-bold leading-[normal] tracking-[0] text-[#b8c7d9] hover:bg-[#0a0d12]">
                      {item.rarity}
                    </Badge>
                  </div>
                  <p className="mt-3 text-left [font-family:'Inter',Helvetica] text-sm font-normal leading-[22.4px] tracking-[0] text-[#9aa6b2] line-clamp-3">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
