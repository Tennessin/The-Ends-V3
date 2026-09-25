import { FACTION_SKILLS, FACTION_TIERS, TIER_REWARDS, TIER_STEPS } from "../../data/factionTiers";

const REWARD_COLORS: Record<string, string> = {
  spin: "#fbbf24",
  skill: "#c084fc",
  print: "#60a5fa",
  scam: "#34d399",
};

export const FactionTiersGuide = (): JSX.Element => (
  <section id="faction-tiers" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-2 pb-8 sm:px-3">
    <div className="relative overflow-hidden rounded-lg border border-[#1a1424] bg-[#060507] p-5 sm:p-7">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full opacity-25 blur-3xl"
        style={{ background: "#c084fc" }}
        aria-hidden
      />
      <header className="relative flex flex-col gap-2">
        <p className="[font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#c3b2df]">
          FACTION TIERS · HOW IT WORKS
        </p>
        <h2 className="[font-family:'Inter',Helvetica] text-[32px] font-black leading-[1.05] tracking-[-1.4px] text-[#f7f4fb] sm:text-[36px]">
          Climb the tiers, claim a reward each step
        </h2>
        <p className="max-w-[820px] [font-family:'Inter',Helvetica] text-[15px] leading-[25.5px] text-[#a296b6]">
          Every faction starts Unofficial and can be promoted three times. Each promotion unlocks exactly one reward
          for the whole faction, chosen by leadership. Several rules below reference these tiers, so know where you
          stand before you slide.
        </p>
      </header>

      <ol className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {FACTION_TIERS.map((tier, i) => (
          <li
            key={tier.name}
            className="relative flex flex-col gap-2 rounded-lg border border-[#1a1424] bg-[#0d0913] p-4"
            style={{ boxShadow: `inset 3px 0 0 ${i === 0 ? "#5c5270" : "#c084fc"}` }}
          >
            <div className="flex items-center justify-between">
              <span className="[font-family:'Inter',Helvetica] text-[10px] font-black uppercase tracking-[0.8px] text-[#a296b6]">
                Step {i}
              </span>
              <span
                className="rounded-md px-2 py-0.5 [font-family:'Inter',Helvetica] text-[10px] font-black uppercase tracking-[0.6px]"
                style={
                  tier.canRedeem
                    ? { color: "#c084fc", background: "rgba(192,132,252,0.14)" }
                    : { color: "#a296b6", background: "#1a1424" }
                }
              >
                {tier.canRedeem ? "1 reward" : "No reward"}
              </span>
            </div>
            <h3 className="[font-family:'Inter',Helvetica] text-xl font-black tracking-[-0.5px] text-[#f7f4fb]">{tier.name}</h3>
            <p className="[font-family:'Inter',Helvetica] text-sm leading-[21px] text-[#a296b6]">{tier.note}</p>
            <p className="mt-auto pt-1 [font-family:'Inter',Helvetica] text-xs font-bold text-[#a296b6]">
              Up to <span className="text-[#f7f4fb]">{tier.memberLimit}</span> members
            </p>
          </li>
        ))}
      </ol>

      <div className="relative mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="rounded-lg border border-[#1a1424] bg-[#0b0711] p-5">
          <h3 className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[1px] text-[#c3b2df]">
            Tiering up, step by step
          </h3>
          <ol className="mt-3 flex flex-col gap-3">
            {TIER_STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c3b2df] [font-family:'Inter',Helvetica] text-xs font-black text-[#09060d]">
                  {i + 1}
                </span>
                <div>
                  <p className="[font-family:'Inter',Helvetica] text-sm font-black text-[#f7f4fb]">{s.title}</p>
                  <p className="pt-1 [font-family:'Inter',Helvetica] text-xs leading-[19px] text-[#a296b6]">{s.body}</p>
                  {s.cmd && (
                    <code className="mt-1.5 inline-block rounded-md border border-[#1a1424] bg-[#060507] px-2 py-1 font-mono text-xs text-[#c3b2df]">
                      {s.cmd}
                    </code>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-[#1a1424] bg-[#0b0711] p-5">
            <h3 className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[1px] text-[#c3b2df]">
              The four rewards (pick one per tier)
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {TIER_REWARDS.map((r) => {
                const color = REWARD_COLORS[r.id] ?? "#c3b2df";
                return (
                  <li
                    key={r.id}
                    className="flex flex-col gap-1.5 rounded-md border border-[#1a1424] bg-[#0d0913] p-3.5"
                    style={{ boxShadow: `inset 3px 0 0 ${color}` }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="[font-family:'Inter',Helvetica] text-[10px] font-black uppercase tracking-[0.8px]" style={{ color }}>
                        {r.tag}
                      </span>
                      <span className="rounded-md bg-[#1a1424] px-2 py-0.5 [font-family:'Inter',Helvetica] text-[10px] font-black uppercase tracking-[0.5px] text-[#f7f4fb]">
                        {r.cooldown}
                      </span>
                    </div>
                    <p className="[font-family:'Inter',Helvetica] text-base font-black leading-tight tracking-[-0.3px] text-[#f7f4fb]">{r.title}</p>
                    <p className="[font-family:'Inter',Helvetica] text-xs leading-[19px] text-[#a296b6]">{r.detail}</p>
                    <p className="mt-auto pt-1 [font-family:'Inter',Helvetica] text-[11px] font-bold text-[#5c5270]">{r.foot}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-lg border border-[#1a1424] bg-[#0b0711] p-5">
            <h3 className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[1px] text-[#c3b2df]">
              Faction skills on offer
            </h3>
            <p className="pt-1 [font-family:'Inter',Helvetica] text-xs leading-[19px] text-[#a296b6]">
              Choosing the Faction Skill reward grants one of these to every member, including anyone who joins later,
              without spending their own skill points.
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {FACTION_SKILLS.map((s) => (
                <li key={s.id} className="rounded-md border border-[#1a1424] bg-[#0d0913] px-3 py-2">
                  <p className="[font-family:'Inter',Helvetica] text-sm font-black text-[#f7f4fb]">{s.name}</p>
                  <p className="[font-family:'Inter',Helvetica] text-xs text-[#a296b6]">{s.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);
