import { Link } from "react-router-dom";
import {
  MAX_LEVEL,
  STARTING_AP,
  TOTAL_ATTRIBUTE_POINTS,
  TOTAL_SKILL_POINTS,
  TOTAL_UNIQUE_SKILLS,
  type PathInfo,
} from "../../../data/progression";
import { asset } from "../../../lib/asset";

interface Props {
  path: PathInfo;
  level: number;
}

const primaryCta =
  "inline-flex items-center gap-2 rounded-lg bg-[#c3b2df] px-6 py-3.5 [font-family:'Inter',Helvetica] text-[15px] font-bold text-[#09060d] transition-colors hover:bg-[#d4c6ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c3b2df]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060507]";
const secondaryCta =
  "inline-flex items-center gap-2 rounded-lg border border-[#1a1424] bg-[#0b0711b8] px-6 py-3.5 [font-family:'Inter',Helvetica] text-[15px] font-bold text-[#f7f4fb] backdrop-blur-[5px] transition-colors hover:border-[#c3b2df]/40 hover:bg-[#0b0711]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c3b2df]/40";

export const ProgressionHero = ({ path, level }: Props): JSX.Element => {
  const stats = [
    { value: String(MAX_LEVEL), label: "Levels" },
    { value: String(TOTAL_UNIQUE_SKILLS), label: "Unique skills" },
    { value: String(TOTAL_SKILL_POINTS), label: "Skill points by Lv 30" },
    { value: `${STARTING_AP}+${TOTAL_ATTRIBUTE_POINTS}`, label: "Attribute points" },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-700"
        style={{
          background: `radial-gradient(900px 480px at 15% -10%, ${path.accentSoft.replace("0.14", "0.55")}, transparent 60%), radial-gradient(700px 420px at 90% 10%, rgba(195,178,223,0.18), transparent 60%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px prog-shimmer"
        style={{ backgroundImage: `linear-gradient(90deg, transparent, ${path.accent}, transparent)` }}
        aria-hidden
      />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-start px-4 pb-14 pt-[88px] sm:px-6 md:px-8 md:pb-16 md:pt-[104px]">
        <header className="flex w-full max-w-[880px] flex-col items-start">
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
                THE ENDS V3 · PROGRESSION
              </p>
              <h1 className="pt-2 [font-family:'Inter',Helvetica] text-[40px] font-black leading-[1.02] tracking-[-2.2px] text-[#f7f4fb] sm:text-[52px] md:text-[64px] md:tracking-[-3px]">
                Skills &amp; Levelling
              </h1>
            </div>
          </div>
          <p className="max-w-[700px] pt-5 [font-family:'Inter',Helvetica] text-base leading-[27.2px] text-[#a296b6]">
            Thirty levels, three paths, {TOTAL_UNIQUE_SKILLS} skills. This tab is pulled straight from the server's
            progression config: how XP is earned and lost, when skill and attribute points land, every skill with its
            cost and unlock level, and how your garage and inventory grow. Pick a path, drag the level, and see exactly
            what you get.
          </p>
          <nav aria-label="Jump to a section" className="pt-7">
            <div className="flex flex-wrap items-center gap-3">
              <a href="#level-simulator" className={primaryCta}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M2 8h12M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Try the level simulator
              </a>
              <a href="#how-to-level" className={secondaryCta}>
                How to level up
              </a>
              <a href="#skill-tree" className={secondaryCta}>
                Skill trees
              </a>
              <Link to="/" className={secondaryCta}>
                ← Illegal Area Guide
              </Link>
            </div>
          </nav>
        </header>

        <dl className="mt-10 grid w-full max-w-[860px] grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-[#1a1424] bg-[#0b0711]/70 px-4 py-3 backdrop-blur-[4px]">
              <dt className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[0.8px] text-[#a296b6]">
                {s.label}
              </dt>
              <dd className="[font-family:'Inter',Helvetica] text-2xl font-black tracking-[-1px] text-[#f7f4fb]">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="pt-4 [font-family:'Inter',Helvetica] text-xs text-[#a296b6]">
          Viewing <span className="font-bold" style={{ color: path.accent }}>{path.name}</span> at Level{" "}
          <span className="font-bold text-[#f7f4fb]">{level}</span>. The address bar updates as you change them, so you
          can share the exact view.
        </p>
      </div>
    </section>
  );
};
