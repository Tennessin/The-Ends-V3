import { Link } from "react-router-dom";
import {
  MAX_LEVEL,
  PATHS,
  SKILLS,
  TOTAL_ATTRIBUTE_POINTS,
  TOTAL_SKILL_POINTS,
  TOTAL_UNIQUE_SKILLS,
  XP_SOURCES,
} from "../../../../data/progression";

/**
 * Home-page teaser for the Skills & Levelling tab. The full skill trees, the
 * level simulator and the slot tables live on /progression so there is a
 * single copy of the data to keep in sync with the server config.
 */
export const FactionSkillGuideSection = (): JSX.Element => {
  const highlights = [
    { value: String(MAX_LEVEL), label: "Levels" },
    { value: String(TOTAL_UNIQUE_SKILLS), label: "Skills" },
    { value: String(TOTAL_SKILL_POINTS), label: "Skill points" },
    { value: String(TOTAL_ATTRIBUTE_POINTS), label: "Attribute points" },
  ];

  return (
    <section id="skill-information" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-2 py-6 sm:px-3">
      <div className="relative overflow-hidden rounded-lg border border-[#1a1424] bg-[#060507] p-5 sm:p-7">
        <div
          className="pointer-events-none absolute -right-24 -top-32 h-[360px] w-[360px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(195,178,223,0.45), transparent)" }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <p className="[font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#c3b2df]">
              SKILLS &amp; LEVELLING
            </p>
            <h2 className="pt-2 [font-family:'Inter',Helvetica] text-[36px] font-black leading-[1.05] tracking-[-1.6px] text-[#f7f4fb] sm:text-[40px]">
              Every skill, every level, every slot
            </h2>
            <p className="pt-3 [font-family:'Inter',Helvetica] text-[15px] leading-[25.5px] text-[#a296b6]">
              The full progression system now has its own tab: all three skill trees straight from the server
              config, how XP is earned and lost, when skill and attribute points drop, and how your garage and
              inventory grow level by level. Drag the level slider and watch what unlocks.
            </p>
          </div>
          <Link
            to="/progression"
            className="inline-flex h-auto shrink-0 items-center gap-2 self-start rounded-lg bg-[#c3b2df] px-6 py-3.5 [font-family:'Inter',Helvetica] text-[15px] font-bold text-[#09060d] transition-colors hover:bg-[#d4c6ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c3b2df]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060507]"
          >
            Open Skills &amp; Levelling
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="relative mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          {PATHS.map((path) => {
            const tree = SKILLS[path.id];
            return (
              <Link
                key={path.id}
                to={`/progression?path=${path.id}`}
                className="group rounded-lg border border-[#1a1424] bg-[#0d0913] p-4 transition-colors hover:border-[#c3b2df]/40"
                style={{ boxShadow: `inset 3px 0 0 ${path.accent}` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="[font-family:'Inter',Helvetica] text-lg font-black tracking-[-0.4px] text-[#f7f4fb]">
                    {path.name}
                  </h3>
                  <span
                    className="rounded-md px-2 py-0.5 [font-family:'Inter',Helvetica] text-[11px] font-bold"
                    style={{ color: path.accent, background: path.accentSoft }}
                  >
                    {tree.length} skills
                  </span>
                </div>
                <p className="pt-1 [font-family:'Inter',Helvetica] text-xs text-[#a296b6]">
                  {path.archetypes.join(" · ")}
                </p>
                <dl className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { k: "Max owned", v: String(path.maxSkills) },
                    { k: "Guns at", v: `Lv ${path.weaponLevel}` },
                    { k: "First skill", v: `Lv ${tree[0]?.level ?? "-"}` },
                  ].map((s) => (
                    <div key={s.k} className="rounded-md border border-[#1a1424] bg-[#0b0711] px-2.5 py-2">
                      <dt className="[font-family:'Inter',Helvetica] text-[10px] font-bold uppercase tracking-[0.7px] text-[#a296b6]">
                        {s.k}
                      </dt>
                      <dd className="[font-family:'Inter',Helvetica] text-sm font-black text-[#f7f4fb]">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </Link>
            );
          })}
        </div>

        <div className="relative mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label} className="rounded-lg border border-[#1a1424] bg-[#0b0711]/70 px-4 py-3">
              <p className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[0.8px] text-[#a296b6]">
                {h.label}
              </p>
              <p className="[font-family:'Inter',Helvetica] text-2xl font-black tracking-[-1px] text-[#f7f4fb]">
                {h.value}
              </p>
            </div>
          ))}
        </div>

        <p className="relative pt-4 [font-family:'Inter',Helvetica] text-xs text-[#a296b6]">
          Quick version: {XP_SOURCES[0].amount} for roleplay chat every 15 minutes, {XP_SOURCES[1].amount} per kill,{" "}
          {XP_SOURCES[2].amount} every time you get shot.
        </p>
      </div>
    </section>
  );
};
