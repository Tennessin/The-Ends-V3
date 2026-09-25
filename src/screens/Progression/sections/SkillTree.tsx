import { useMemo, useState } from "react";
import {
  CATEGORY_META,
  SKILLS,
  TOTAL_SKILL_POINTS,
  type PathInfo,
  type Skill,
  type SkillCategory,
} from "../../../data/progression";

interface Props {
  path: PathInfo;
  level: number;
  onLevel: (level: number) => void;
}

type Filter = "all" | SkillCategory;

const CostPips = ({ cost, color }: { cost: number; color: string }) => (
  <span className="inline-flex items-center gap-1" aria-label={`${cost} skill points`}>
    {[1, 2, 3, 4].map((i) => (
      <span
        key={i}
        className="h-2 w-2 rounded-full"
        style={{ background: i <= cost ? color : "#2a2338" }}
        aria-hidden
      />
    ))}
    <span className="pl-1 [font-family:'Inter',Helvetica] text-[11px] font-black text-[#f7f4fb]">{cost} SP</span>
  </span>
);

const SkillCard = ({ skill, unlocked, accent }: { skill: Skill; unlocked: boolean; accent: string }) => {
  const cat = CATEGORY_META[skill.category];
  return (
    <article
      className={`group relative flex flex-col gap-2.5 rounded-lg border p-4 transition-all duration-200 ${
        unlocked ? "border-[#1a1424] bg-[#0d0913] hover:-translate-y-0.5" : "border-[#1a1424]/70 bg-[#0b0711]"
      }`}
      style={{ boxShadow: unlocked ? `inset 3px 0 0 ${accent}` : undefined, opacity: unlocked ? 1 : 0.62 }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 [font-family:'Inter',Helvetica] text-[10px] font-black uppercase tracking-[0.8px]" style={{ color: cat.color }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} aria-hidden />
          {cat.label}
        </span>
        <CostPips cost={skill.cost} color={accent} />
      </div>
      <h4 className="[font-family:'Inter',Helvetica] text-lg font-black leading-tight tracking-[-0.4px] text-[#f7f4fb]">
        {skill.name}
      </h4>
      <p className="[font-family:'Inter',Helvetica] text-sm leading-[21px] text-[#a296b6]">{skill.description}</p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
        <span
          className={`rounded-md border px-2 py-0.5 [font-family:'Inter',Helvetica] text-[11px] font-bold ${
            skill.creatorOnly ? "border-[#fbbf24]/30 bg-[#fbbf24]/10 text-[#fcd34d]" : "border-[#1a1424] bg-[#0b0711] text-[#a296b6]"
          }`}
          title={skill.creatorOnly ? "Must have been ticked in the character creator" : "Anyone on this path can buy it"}
        >
          {skill.creatorOnly ? "Creator pick" : "Open to all"}
        </span>
        <span
          className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-0.5 [font-family:'Inter',Helvetica] text-[11px] font-bold"
          style={unlocked ? { color: accent, background: `${accent}1f` } : { color: "#a296b6", background: "#1a1424" }}
        >
          {unlocked ? (
            "Available"
          ) : (
            <>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <rect x="2" y="4.5" width="6" height="4.5" rx="1" stroke="currentColor" />
                <path d="M3.5 4.5V3a1.5 1.5 0 013 0v1.5" stroke="currentColor" />
              </svg>
              Level {skill.level}
            </>
          )}
        </span>
      </div>
    </article>
  );
};

export const SkillTree = ({ path, level, onLevel }: Props): JSX.Element => {
  const [filter, setFilter] = useState<Filter>("all");
  const tree = SKILLS[path.id];

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: tree.length, combat: 0, vehicle: 0, utility: 0, economy: 0, identity: 0 };
    tree.forEach((s) => {
      c[s.category] += 1;
    });
    return c;
  }, [tree]);

  const groups = useMemo(() => {
    const filtered = filter === "all" ? tree : tree.filter((s) => s.category === filter);
    const byLevel = new Map<number, Skill[]>();
    filtered.forEach((s) => byLevel.set(s.level, [...(byLevel.get(s.level) ?? []), s]));
    return [...byLevel.entries()].sort((a, b) => a[0] - b[0]);
  }, [tree, filter]);

  const totalCost = tree.reduce((s, sk) => s + sk.cost, 0);
  const unlockedCount = tree.filter((s) => s.level <= level).length;
  const creatorCount = tree.filter((s) => s.creatorOnly).length;
  const filters: Filter[] = ["all", "combat", "vehicle", "utility", "economy", "identity"];

  return (
    <section id="skill-tree" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-2 py-8 sm:px-3">
      <div className="relative overflow-hidden rounded-lg border border-[#1a1424] bg-[#060507] p-5 sm:p-7">
        <div
          className="pointer-events-none absolute -right-32 -top-24 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
          style={{ background: path.accent }}
          aria-hidden
        />
        <header className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-2">
            <p className="[font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#c3b2df]">
              STEP 4 · SKILL TREE
            </p>
            <h2 className="[font-family:'Inter',Helvetica] text-[32px] font-black leading-[1.05] tracking-[-1.4px] text-[#f7f4fb] sm:text-[36px]">
              <span style={{ color: path.accent }}>{path.name}</span> skills, level by level
            </h2>
            <p className="max-w-[820px] [font-family:'Inter',Helvetica] text-[15px] leading-[25.5px] text-[#a296b6]">
              {tree.length} skills on this path, {creatorCount} of them creator picks. Buying everything would cost{" "}
              {totalCost} skill points and you only ever earn {TOTAL_SKILL_POINTS}, with room for {path.maxSkills} owned at
              once. Pick your build.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-[#1a1424] bg-[#0b0711b8] px-4 py-3 backdrop-blur-[5px]">
            <div className="text-center">
              <p className="[font-family:'Inter',Helvetica] text-[10px] font-bold uppercase tracking-[0.8px] text-[#a296b6]">Available at Lv {level}</p>
              <p className="[font-family:'Inter',Helvetica] text-2xl font-black text-[#f7f4fb]">
                {unlockedCount}
                <span className="text-sm font-bold text-[#a296b6]"> / {tree.length}</span>
              </p>
            </div>
            <div className="h-10 w-px bg-[#1a1424]" aria-hidden />
            <div className="text-center">
              <p className="[font-family:'Inter',Helvetica] text-[10px] font-bold uppercase tracking-[0.8px] text-[#a296b6]">Skill cap</p>
              <p className="[font-family:'Inter',Helvetica] text-2xl font-black text-[#f7f4fb]">{path.maxSkills}</p>
            </div>
          </div>
        </header>

        <div className="relative mt-5 flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by category">
          {filters.map((f) => {
            const active = filter === f;
            const color = f === "all" ? path.accent : CATEGORY_META[f].color;
            const label = f === "all" ? "All" : CATEGORY_META[f].label;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 [font-family:'Inter',Helvetica] text-xs font-bold transition-colors ${
                  active ? "text-[#09060d]" : "border-[#1a1424] bg-[#0d0913] text-[#a296b6] hover:text-[#f7f4fb]"
                }`}
                style={active ? { background: color, borderColor: color } : undefined}
              >
                {f !== "all" && <span className="h-1.5 w-1.5 rounded-full" style={{ background: active ? "#09060d" : color }} aria-hidden />}
                {label}
                <span className={active ? "opacity-70" : "text-[#5c5270]"}>{counts[f]}</span>
              </button>
            );
          })}
        </div>

        <ol className="relative mt-6 ml-3 border-l border-[#1a1424] sm:ml-4">
          {groups.map(([lv, skills]) => {
            const reached = lv <= level;
            return (
              <li key={`${path.id}-${lv}`} className="relative pb-8 pl-7 last:pb-0 sm:pl-9">
                <button
                  type="button"
                  onClick={() => onLevel(lv)}
                  title={`Set the simulator to Level ${lv}`}
                  className="absolute -left-[15px] top-0 flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 bg-[#060507] [font-family:'Inter',Helvetica] text-[11px] font-black transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c3b2df]/50"
                  style={{
                    borderColor: reached ? path.accent : "#2a2338",
                    color: reached ? "#09060d" : "#a296b6",
                    background: reached ? path.accent : "#060507",
                    boxShadow: reached ? `0 0 16px ${path.accent}66` : undefined,
                  }}
                >
                  {lv}
                </button>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-3">
                  <h3 className="[font-family:'Inter',Helvetica] text-lg font-black tracking-[-0.4px] text-[#f7f4fb]">Level {lv}</h3>
                  <span
                    className="[font-family:'Inter',Helvetica] text-xs font-bold"
                    style={{ color: reached ? path.accent : "#a296b6" }}
                  >
                    {reached ? "Reached" : `${lv - level} level${lv - level === 1 ? "" : "s"} away`}
                  </span>
                  <span className="[font-family:'Inter',Helvetica] text-xs text-[#5c5270]">
                    {skills.length} skill{skills.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {skills.map((s) => (
                    <SkillCard key={s.id} skill={s} unlocked={reached} accent={path.accent} />
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
        {groups.length === 0 && (
          <p className="mt-6 [font-family:'Inter',Helvetica] text-sm text-[#a296b6]">No skills in this category on the {path.name} path.</p>
        )}
      </div>
    </section>
  );
};
