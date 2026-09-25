import { useMemo, type CSSProperties } from "react";
import {
  ATTRIBUTE_POINT_MILESTONES,
  CHAT_XP_PER_HOUR,
  GARAGE_SLOTS,
  INVENTORY_SLOTS,
  LEVEL_HOURS,
  MAX_LEVEL,
  SKILLS,
  SKILL_POINT_MILESTONES,
  STARTING_AP,
  attributePointsAtLevel,
  garageSlotsAt,
  inventorySlotsAt,
  skillPointsAtLevel,
  slotSteps,
  xpForLevel,
  type PathInfo,
} from "../../../data/progression";

interface Props {
  path: PathInfo;
  level: number;
  onLevel: (level: number) => void;
}

const fmt = (n: number) => n.toLocaleString("en-GB");
const QUICK_LEVELS = [1, 5, 10, 15, 20, 25, 30];
const RING_R = 58;
const RING_C = 2 * Math.PI * RING_R;

interface TileProps {
  label: string;
  value: string;
  sub?: string;
  accent: string;
  hot?: boolean;
  animKey: string;
}

const Tile = ({ label, value, sub, accent, hot, animKey }: TileProps) => (
  <div
    key={animKey}
    className={`relative overflow-hidden rounded-lg border bg-[#0d0913] p-4 ${hot ? "prog-pop" : ""}`}
    style={{ borderColor: hot ? accent : "#1a1424", "--glow": `${accent}66` } as CSSProperties}
  >
    {hot && (
      <span
        className="absolute right-3 top-3 rounded-md px-1.5 py-0.5 [font-family:'Inter',Helvetica] text-[10px] font-black uppercase tracking-[0.6px]"
        style={{ color: accent, background: `${accent}22` }}
      >
        New
      </span>
    )}
    <p className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[0.8px] text-[#a296b6]">{label}</p>
    <p className="mt-1 [font-family:'Inter',Helvetica] text-[28px] font-black leading-none tracking-[-1px] text-[#f7f4fb]">
      {value}
    </p>
    {sub && <p className="mt-1.5 [font-family:'Inter',Helvetica] text-xs leading-[18px] text-[#a296b6]">{sub}</p>}
  </div>
);

export const LevelSimulator = ({ path, level, onLevel }: Props): JSX.Element => {
  const d = useMemo(() => {
    const lv = Math.max(0, Math.min(MAX_LEVEL, level));
    const xp = xpForLevel(lv);
    const nextXp = lv < MAX_LEVEL ? xpForLevel(lv + 1) : null;
    const hours = lv > 0 ? LEVEL_HOURS[lv - 1] : 0;

    const sp = skillPointsAtLevel(lv);
    const spHere = SKILL_POINT_MILESTONES.find((m) => m.level === lv)?.points ?? 0;
    const nextSp = SKILL_POINT_MILESTONES.find((m) => m.level > lv);
    const ap = attributePointsAtLevel(lv);
    const apHere = ATTRIBUTE_POINT_MILESTONES.find((m) => m.level === lv)?.points ?? 0;
    const nextAp = ATTRIBUTE_POINT_MILESTONES.find((m) => m.level > lv);

    const garage = garageSlotsAt(path.id, lv);
    const garagePrev = garageSlotsAt(path.id, lv - 1);
    const garageNext = slotSteps(GARAGE_SLOTS[path.id]).find((s) => s.level > lv);
    const inv = inventorySlotsAt(path.id, lv);
    const invPrev = inventorySlotsAt(path.id, lv - 1);
    const invNext = slotSteps(INVENTORY_SLOTS[path.id]).find((s) => s.level > lv);

    const tree = SKILLS[path.id];
    const available = tree.filter((s) => s.level <= lv);
    const newSkills = tree.filter((s) => s.level === lv);
    const nextSkill = tree.find((s) => s.level > lv);
    const guns = lv >= path.weaponLevel;

    const candidates = [
      nextSp?.level,
      nextAp?.level,
      garageNext?.level,
      invNext?.level,
      nextSkill?.level,
      lv < path.weaponLevel ? path.weaponLevel : undefined,
    ].filter((n): n is number => typeof n === "number");
    const nextUnlock = candidates.length ? Math.min(...candidates) : null;
    const chatHours = nextXp !== null ? (nextXp - xp) / CHAT_XP_PER_HOUR : null;

    const feed: { tone: "skill" | "points" | "slot" | "gun"; text: string; sub: string }[] = [];
    newSkills.forEach((s) =>
      feed.push({
        tone: "skill",
        text: `${s.name} can be bought`,
        sub: `${s.cost} SP · ${s.creatorOnly ? "creator pick only" : "open to everyone"}`,
      }),
    );
    if (spHere) feed.push({ tone: "points", text: `+${spHere} skill points`, sub: `${sp} earned in total so far` });
    if (apHere) feed.push({ tone: "points", text: `+${apHere} attribute points`, sub: `${ap} from levels, plus ${STARTING_AP} at creation` });
    if (garage !== garagePrev) feed.push({ tone: "slot", text: `Garage grows to ${garage} slots`, sub: `up from ${garagePrev}` });
    if (inv !== invPrev) feed.push({ tone: "slot", text: `Inventory grows to ${inv} slots`, sub: `up from ${invPrev}` });
    if (lv === path.weaponLevel) feed.push({ tone: "gun", text: "Firearms unlocked", sub: `${path.name} gun level reached` });

    return {
      lv, xp, nextXp, hours, sp, spHere, nextSp, ap, apHere, nextAp, garage, garagePrev, garageNext, inv, invPrev, invNext,
      tree, available, guns, nextUnlock, chatHours, feed,
    };
  }, [path, level]);

  const ringOffset = RING_C * (1 - d.lv / MAX_LEVEL);
  const toneColor: Record<string, string> = { skill: path.accent, points: "#c3b2df", slot: "#34d399", gun: "#f87171" };

  return (
    <section id="level-simulator" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-2 py-8 sm:px-3">
      <div className="relative overflow-hidden rounded-lg border border-[#1a1424] bg-[#060507] p-5 sm:p-7">
        <div
          className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl transition-colors duration-700"
          style={{ background: path.accent }}
          aria-hidden
        />
        <header className="relative flex flex-col gap-2 pb-6">
          <p className="[font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#c3b2df]">
            STEP 2 · LEVEL SIMULATOR
          </p>
          <h2 className="[font-family:'Inter',Helvetica] text-[32px] font-black leading-[1.05] tracking-[-1.4px] text-[#f7f4fb] sm:text-[36px]">
            Drag the level. Watch what unlocks.
          </h2>
          <p className="max-w-[820px] [font-family:'Inter',Helvetica] text-[15px] leading-[25.5px] text-[#a296b6]">
            Every number here is what a <span className="font-bold" style={{ color: path.accent }}>{path.name}</span>{" "}
            character actually has at that level: XP needed, points banked, garage and inventory size, and which
            skills are on the table.
          </p>
        </header>

        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          {/* Left: dial + slider */}
          <div className="flex flex-col gap-5 rounded-lg border border-[#1a1424] bg-[#0b0711] p-5">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="relative h-[148px] w-[148px] shrink-0">
                <svg viewBox="0 0 148 148" className="h-full w-full" aria-hidden>
                  <circle cx="74" cy="74" r={RING_R} fill="none" stroke="#1a1424" strokeWidth="10" />
                  <circle
                    cx="74"
                    cy="74"
                    r={RING_R}
                    fill="none"
                    stroke={path.accent}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={RING_C}
                    strokeDashoffset={ringOffset}
                    transform="rotate(-90 74 74)"
                    style={{ transition: "stroke-dashoffset 0.45s ease, stroke 0.4s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="[font-family:'Inter',Helvetica] text-[10px] font-bold uppercase tracking-[1px] text-[#a296b6]">
                    Level
                  </span>
                  <span className="[font-family:'Inter',Helvetica] text-[44px] font-black leading-none tracking-[-2px] text-[#f7f4fb]">
                    {d.lv}
                  </span>
                  <span className="[font-family:'Inter',Helvetica] text-[10px] font-bold text-[#a296b6]">of {MAX_LEVEL}</span>
                </div>
              </div>
              <dl className="grid w-full min-w-0 flex-1 grid-cols-1 gap-2">
                <div className="rounded-md border border-[#1a1424] bg-[#0d0913] px-3 py-2">
                  <dt className="[font-family:'Inter',Helvetica] text-[10px] font-bold uppercase tracking-[0.7px] text-[#a296b6]">
                    XP to reach this level
                  </dt>
                  <dd className="[font-family:'Inter',Helvetica] text-lg font-black text-[#f7f4fb]">{fmt(d.xp)} XP</dd>
                </div>
                <div className="rounded-md border border-[#1a1424] bg-[#0d0913] px-3 py-2">
                  <dt className="[font-family:'Inter',Helvetica] text-[10px] font-bold uppercase tracking-[0.7px] text-[#a296b6]">
                    Typical playtime
                  </dt>
                  <dd className="[font-family:'Inter',Helvetica] text-lg font-black text-[#f7f4fb]">≈ {d.hours} h</dd>
                </div>
                <div className="rounded-md border border-[#1a1424] bg-[#0d0913] px-3 py-2">
                  <dt className="[font-family:'Inter',Helvetica] text-[10px] font-bold uppercase tracking-[0.7px] text-[#a296b6]">
                    Next level
                  </dt>
                  <dd className="[font-family:'Inter',Helvetica] text-lg font-black text-[#f7f4fb]">
                    {d.nextXp !== null ? (
                      <>
                        +{fmt(d.nextXp - d.xp)} XP
                        <span className="block text-xs font-bold text-[#a296b6] sm:inline sm:pl-1.5">
                          ≈ {d.chatHours?.toFixed(1)} h of RP chat
                        </span>
                      </>
                    ) : (
                      "Max level"
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <div className="flex items-center justify-between pb-2">
                <label htmlFor="level-range" className="[font-family:'Inter',Helvetica] text-xs font-bold text-[#a296b6]">
                  Level slider
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onLevel(d.lv - 1)}
                    disabled={d.lv <= 0}
                    aria-label="One level down"
                    className="h-8 w-8 rounded-md border border-[#1a1424] bg-[#0d0913] [font-family:'Inter',Helvetica] text-sm font-black text-[#f7f4fb] transition-colors hover:border-[#c3b2df]/40 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={() => onLevel(d.lv + 1)}
                    disabled={d.lv >= MAX_LEVEL}
                    aria-label="One level up"
                    className="h-8 w-8 rounded-md border border-[#1a1424] bg-[#0d0913] [font-family:'Inter',Helvetica] text-sm font-black text-[#f7f4fb] transition-colors hover:border-[#c3b2df]/40 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
              <input
                id="level-range"
                type="range"
                min={0}
                max={MAX_LEVEL}
                step={1}
                value={d.lv}
                onChange={(e) => onLevel(Number(e.target.value))}
                aria-valuetext={`Level ${d.lv}`}
                className="prog-range w-full"
                style={{ "--thumb": path.accent } as CSSProperties}
              />
              <div className="relative mt-2 h-5" aria-hidden>
                {SKILL_POINT_MILESTONES.map((m) => (
                  <span
                    key={`sp-${m.level}`}
                    title={`+${m.points} skill points at Level ${m.level}`}
                    className="absolute top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                    style={{ left: `${(m.level / MAX_LEVEL) * 100}%`, background: m.level <= d.lv ? path.accent : "#2a2338" }}
                  />
                ))}
                {[0, 5, 10, 15, 20, 25, 30].map((n) => (
                  <span
                    key={n}
                    className="absolute top-2 -translate-x-1/2 [font-family:'Inter',Helvetica] text-[10px] font-bold text-[#a296b6]"
                    style={{ left: `${(n / MAX_LEVEL) * 100}%` }}
                  >
                    {n}
                  </span>
                ))}
              </div>
              <p className="pt-1 [font-family:'Inter',Helvetica] text-[11px] text-[#a296b6]">
                Dots mark levels that hand out skill points.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {QUICK_LEVELS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onLevel(n)}
                  aria-pressed={d.lv === n}
                  className={`rounded-md border px-3 py-1.5 [font-family:'Inter',Helvetica] text-xs font-bold transition-colors ${
                    d.lv === n ? "text-[#09060d]" : "border-[#1a1424] bg-[#0d0913] text-[#a296b6] hover:text-[#f7f4fb]"
                  }`}
                  style={d.lv === n ? { background: path.accent, borderColor: path.accent } : undefined}
                >
                  Lv {n}
                </button>
              ))}
            </div>
          </div>

          {/* Right: readouts + feed */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Tile
                animKey={`sp-${path.id}-${d.lv}`}
                label="Skill points"
                value={String(d.sp)}
                sub={d.spHere ? `+${d.spHere} at this level` : d.nextSp ? `next +${d.nextSp.points} at Lv ${d.nextSp.level}` : "all milestones banked"}
                accent={path.accent}
                hot={d.spHere > 0}
              />
              <Tile
                animKey={`ap-${path.id}-${d.lv}`}
                label="Attribute points"
                value={String(STARTING_AP + d.ap)}
                sub={d.apHere ? `+${d.apHere} at this level` : d.nextAp ? `next +${d.nextAp.points} at Lv ${d.nextAp.level}` : `${STARTING_AP} at creation + ${d.ap}`}
                accent={path.accent}
                hot={d.apHere > 0}
              />
              <Tile
                animKey={`sk-${path.id}-${d.lv}`}
                label="Skills unlockable"
                value={`${d.available.length} / ${d.tree.length}`}
                sub={`own up to ${path.maxSkills} at once`}
                accent={path.accent}
                hot={d.tree.some((s) => s.level === d.lv)}
              />
              <Tile
                animKey={`ga-${path.id}-${d.lv}`}
                label="Garage slots"
                value={String(d.garage)}
                sub={d.garage !== d.garagePrev ? `up from ${d.garagePrev}` : d.garageNext ? `next ${d.garageNext.value} at Lv ${d.garageNext.level}` : "maxed"}
                accent="#34d399"
                hot={d.garage !== d.garagePrev}
              />
              <Tile
                animKey={`in-${path.id}-${d.lv}`}
                label="Inventory slots"
                value={String(d.inv)}
                sub={d.inv !== d.invPrev ? `up from ${d.invPrev}` : d.invNext ? `next ${d.invNext.value} at Lv ${d.invNext.level}` : "maxed"}
                accent="#34d399"
                hot={d.inv !== d.invPrev}
              />
              <Tile
                animKey={`gu-${path.id}-${d.lv}`}
                label="Firearms"
                value={d.guns ? "Unlocked" : "Locked"}
                sub={d.guns ? `since Level ${path.weaponLevel}` : `unlock at Level ${path.weaponLevel}`}
                accent="#f87171"
                hot={d.lv === path.weaponLevel}
              />
            </div>

            <div className="flex-1 rounded-lg border border-[#1a1424] bg-[#0b0711] p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="[font-family:'Inter',Helvetica] text-sm font-black tracking-[-0.2px] text-[#f7f4fb]">
                  New at Level {d.lv}
                </h3>
                {d.nextUnlock !== null && (
                  <button
                    type="button"
                    onClick={() => onLevel(d.nextUnlock as number)}
                    className="rounded-md border border-[#1a1424] px-2.5 py-1 [font-family:'Inter',Helvetica] text-xs font-bold transition-colors hover:border-[#c3b2df]/40"
                    style={{ color: path.accent }}
                  >
                    Next unlock: Lv {d.nextUnlock} →
                  </button>
                )}
              </div>
              {d.feed.length > 0 ? (
                <ul key={`${path.id}-${d.lv}`} className="prog-fade mt-3 flex flex-col gap-2">
                  {d.feed.map((f, i) => (
                    <li
                      key={`${f.text}-${i}`}
                      className="flex items-start gap-3 rounded-md border border-[#1a1424] bg-[#0d0913] px-3 py-2.5"
                      style={{ boxShadow: `inset 3px 0 0 ${toneColor[f.tone]}` }}
                    >
                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full"
                        style={{ background: toneColor[f.tone], boxShadow: `0 0 10px ${toneColor[f.tone]}` }}
                        aria-hidden
                      />
                      <div>
                        <p className="[font-family:'Inter',Helvetica] text-sm font-bold text-[#f7f4fb]">{f.text}</p>
                        <p className="[font-family:'Inter',Helvetica] text-xs text-[#a296b6]">{f.sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 [font-family:'Inter',Helvetica] text-sm leading-[22px] text-[#a296b6]">
                  {d.lv === 0
                    ? "A fresh character: no skill points yet, and the first skill (Nametags) needs Level 3."
                    : d.nextUnlock !== null
                      ? `Nothing new at this level. Keep grinding: the next unlock lands at Level ${d.nextUnlock}.`
                      : "Nothing left to unlock. You have maxed the ladder."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
