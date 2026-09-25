import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteNav, type SectionLink } from "../../components/SiteNav";
import { FACTION_SKILLS, FACTION_TIERS, TIER_REWARDS } from "../../data/factionTiers";
import { asset } from "../../lib/asset";
import { FactionTiersGuide } from "./FactionTiersGuide";

const SECTIONS: SectionLink[] = [{ href: "#faction-tiers", label: "How it works" }];

export const FactionTiersPage = (): JSX.Element => {
  useEffect(() => {
    const previous = document.title;
    document.title = "The Ends V3 — Faction Tiers";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main id="top" className="w-full bg-[#060507] text-[#f7f5f2]">
      <SiteNav sections={SECTIONS} />

      <section className="relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 480px at 10% -10%, rgba(192,132,252,0.26), transparent 60%), radial-gradient(700px 420px at 90% 10%, rgba(195,178,223,0.16), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-start px-4 pb-10 pt-[88px] sm:px-6 md:px-8 md:pt-[104px]">
          <div className="flex items-center gap-4">
            <img
              className="h-[84px] w-[84px] drop-shadow-[0_8px_24px_rgba(195,178,223,0.25)] sm:h-[104px] sm:w-[104px]"
              alt="The Ends Roleplay"
              src={asset("windycity-512.webp")}
              width={104}
              height={104}
              decoding="async"
            />
            <div>
              <p className="[font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#c3b2df]">
                THE ENDS V3 · FACTION MANAGEMENT
              </p>
              <h1 className="pt-2 [font-family:'Inter',Helvetica] text-[40px] font-black leading-[1.02] tracking-[-2.2px] text-[#f7f4fb] sm:text-[52px] md:text-[64px] md:tracking-[-3px]">
                Faction Tiers
              </h1>
            </div>
          </div>
          <p className="max-w-[760px] pt-5 [font-family:'Inter',Helvetica] text-base leading-[27.2px] text-[#a296b6]">
            Every faction starts Unofficial and can be promoted three times by Faction Management. Each promotion
            unlocks one reward for the whole faction, from a bonus supply-drop spin to a passive skill every member
            gets for free. This page is pulled from the tier-up script, so what you read here is what the command does.
          </p>
          <dl className="mt-8 grid w-full max-w-[640px] grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { v: String(FACTION_TIERS.length), k: "Tiers" },
              { v: String(TIER_REWARDS.length), k: "Rewards to choose from" },
              { v: String(FACTION_SKILLS.length), k: "Faction skills" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-[#1a1424] bg-[#0b0711]/70 px-4 py-3 backdrop-blur-[4px]">
                <dt className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[0.8px] text-[#a296b6]">
                  {s.k}
                </dt>
                <dd className="[font-family:'Inter',Helvetica] text-2xl font-black tracking-[-1px] text-[#f7f4fb]">{s.v}</dd>
              </div>
            ))}
          </dl>
          <p className="pt-4 [font-family:'Inter',Helvetica] text-xs text-[#a296b6]">
            Tier rules for attacks, STK and supercars live on the{" "}
            <Link to="/rules" className="font-bold text-[#c3b2df] underline decoration-[#c3b2df]/40 underline-offset-2">
              Rules of Engagement
            </Link>{" "}
            tab.
          </p>
        </div>
      </section>

      <FactionTiersGuide />
      <SiteFooter />
    </main>
  );
};
