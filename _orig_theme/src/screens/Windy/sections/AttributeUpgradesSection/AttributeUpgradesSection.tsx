import { useMemo, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const INITIAL_AP = 800;

const initialAttributes = [
  { id: "shooting", name: "Shooting", current: 20, cap: 90, maxCap: 85 },
  { id: "strength", name: "Strength", current: 20, cap: 85, maxCap: 85 },
  { id: "driving", name: "Driving", current: 25, cap: 95, maxCap: 90 },
  { id: "stamina", name: "Stamina", current: 20, cap: 88, maxCap: 85 },
];

const costTiers = [
  { range: "0-29", cost: "1 AP" },
  { range: "30-49", cost: "2 AP" },
  { range: "50-69", cost: "3 AP" },
  { range: "70-79", cost: "5 AP" },
  { range: "80-85", cost: "8 AP" },
];

const getUpgradeCost = (level: number): number => {
  if (level < 30) return 1;
  if (level < 50) return 2;
  if (level < 70) return 3;
  if (level < 80) return 5;
  return 8;
};

export const AttributeUpgradesSection = (): JSX.Element => {
  const [apPoints, setApPoints] = useState(INITIAL_AP);
  const [attributes, setAttributes] = useState(initialAttributes);

  const { overallScore, overallProgress } = useMemo(() => {
    const totalCurrent = attributes.reduce((sum, attr) => sum + attr.current, 0);
    const totalCap = attributes.reduce((sum, attr) => sum + attr.cap, 0);
    const score = Math.round(totalCurrent / attributes.length);
    const progress = Math.min(100, (totalCurrent / totalCap) * 100);
    return { overallScore: score, overallProgress: progress };
  }, [attributes]);

  const handleUpgrade = (attributeId: string) => {
    setAttributes((prev) => {
      const target = prev.find((attr) => attr.id === attributeId);
      if (!target) return prev;
      const cost = getUpgradeCost(target.current);
      if (apPoints < cost || target.current >= target.cap) return prev;
      setApPoints((points) => points - cost);
      return prev.map((attr) =>
        attr.id === attributeId ? { ...attr, current: attr.current + 1 } : attr,
      );
    });
  };

  const handleDowngrade = (attributeId: string) => {
    setAttributes((prev) => {
      const target = prev.find((attr) => attr.id === attributeId);
      if (!target || target.current <= 0) return prev;
      const refund = getUpgradeCost(target.current - 1);
      setApPoints((points) => Math.min(INITIAL_AP, points + refund));
      return prev.map((attr) =>
        attr.id === attributeId ? { ...attr, current: attr.current - 1 } : attr,
      );
    });
  };

  return (
    <section id="windy-attributes" className="mx-auto w-full max-w-[1440px] scroll-mt-6 px-2 pb-12 sm:px-3">
      <div className="flex w-full flex-col gap-6 rounded-lg border border-[#161b22] bg-[#050607] p-4 sm:p-6">
        <header className="flex flex-col gap-3">
          <div className="flex items-end justify-between gap-3 border-b border-[#242831] pb-4">
            <h2 className="[font-family:'Inter',Helvetica] text-[40px] font-black leading-[41.6px] tracking-[-1.6px] text-[#f5f7fa] sm:text-[44px]">
              ATTRIBUTE UPGRADES
            </h2>
          </div>
          <div className="pt-1 [font-family:'Inter',Helvetica] text-[36px] font-black leading-[41.6px] tracking-[-1.6px] text-[#f5f7fa]">
            <span className="text-[32px] text-[#b0b7c5]">ATTRIBUTE POINTS: </span>
            <span className="text-[#d4af37]">{apPoints}</span>
            <span className="text-[28px] text-[#818a9b]"> / {INITIAL_AP}</span>
          </div>
          <div className="rounded-xl border border-[#2b2f38] bg-[#131722] p-4">
            <div className="flex items-center gap-5">
              <span className="[font-family:'Inter',Helvetica] text-[30px] font-black text-[#bfc6d3]">OVERALL</span>
              <span className="[font-family:'Inter',Helvetica] text-[42px] font-black text-[#d4af37]">{overallScore}</span>
              <div className="h-4 flex-1 overflow-hidden rounded-full bg-[#2b2f38]">
                <div
                  className="h-full bg-[linear-gradient(90deg,#3f7ec9_0%,#5da2ff_55%,#7bb7ff_100%)] transition-[width] duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </div>
          <p className="[font-family:'Inter',Helvetica] text-[15px] font-normal leading-[25.5px] text-[#9aa6b2]">
            Spend attribute points to improve your character abilities. Each skill has a level cap and higher levels
            cost more AP to upgrade.
          </p>
          <div className="h-px w-full bg-[#242831]" />
        </header>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <Card className="rounded-lg border border-solid border-[#161b22] bg-[#050607] shadow-none">
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="[font-family:'Inter',Helvetica] text-[22px] font-normal tracking-[-0.66px] text-[#f5f7fa]">
                  Core attributes
                </h3>
                <Badge className="rounded-xl border border-solid border-[#161b22] bg-[#0a0d12] px-3 py-2 [font-family:'Inter',Helvetica] text-xs font-bold text-[#9aa6b2] hover:bg-[#0a0d12]">
                  Overall: {overallScore}
                </Badge>
              </div>

              <div className="space-y-3 rounded-md border border-[#161b22] bg-[#0a0d12] p-4">
                {attributes.map((attr) => {
                  const progress = Math.min(100, (attr.current / attr.cap) * 100);
                  const cost = getUpgradeCost(attr.current);
                  const canUpgrade = apPoints >= cost && attr.current < attr.cap;
                  const canDowngrade = attr.current > 0;
                  return (
                    <article key={attr.id} className="space-y-2 rounded-md border border-[#161b22] bg-[#080b10] p-3.5">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="[font-family:'Inter',Helvetica] text-base font-bold text-[#f5f7fa]">{attr.name}</h4>
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => handleDowngrade(attr.id)}
                            disabled={!canDowngrade}
                            className="h-7 w-7 rounded-sm border border-[#2a2a2a] bg-[#2b2f38] text-sm font-bold text-white transition-colors hover:bg-[#3a404b] disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label={`Decrease ${attr.name}`}
                          >
                            -
                          </button>
                          <span className="[font-family:'Inter',Helvetica] text-sm font-bold text-[#d5dde8]">
                            {attr.current} <span className="text-[#6f7b89]">/</span> {attr.cap}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpgrade(attr.id)}
                            disabled={!canUpgrade}
                            className="h-7 w-7 rounded-sm border border-[#2a2a2a] bg-[#3f7ec9] text-sm font-bold text-white transition-colors hover:bg-[#5da2ff] disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label={`Upgrade ${attr.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#161b22]">
                        <div className="h-full bg-[linear-gradient(90deg,#3f7ec9_0%,#5da2ff_55%,#7bb7ff_100%)]" style={{ width: `${progress}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="[font-family:'Inter',Helvetica] text-[11px] font-bold tracking-[0.9px] text-[#9aa6b2]">
                          CAP
                        </span>
                        <span className="[font-family:'Inter',Helvetica] text-xs text-[#9aa6b2]">
                          {attr.cap} / {attr.maxCap}
                        </span>
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="[font-family:'Inter',Helvetica] text-[11px] font-bold text-[#9aa6b2]">
                          Upgrade Costs: <span className="text-[#f5f7fa]">{cost} AP</span>
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-solid border-[#161b22] bg-[#050607] shadow-none">
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="[font-family:'Inter',Helvetica] text-[22px] font-normal tracking-[-0.66px] text-[#f5f7fa]">
                  Upgrade Costs
                </h3>
              </div>

              <div className="space-y-2 rounded-md border border-[#161b22] bg-[#0a0d12] p-4">
                {costTiers.map((tier) => (
                  <div key={tier.range} className="flex items-center justify-between rounded-md border border-[#161b22] bg-[#080b10] px-3.5 py-6">
                    <span className="[font-family:'Inter',Helvetica] text-sm font-bold text-[#9aa6b2]">{tier.range}</span>
                    <span className="[font-family:'Inter',Helvetica] text-sm font-black text-[#f5f7fa]">{tier.cost}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
