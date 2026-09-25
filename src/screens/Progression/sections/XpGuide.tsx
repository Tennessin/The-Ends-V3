import { useState } from "react";
import {
  ATTRIBUTE_POINT_MILESTONES,
  CHAT_XP_PER_HOUR,
  GARAGE_SLOTS,
  INVENTORY_SLOTS,
  LEVEL_HOURS,
  LEVEL_XP,
  MAX_LEVEL,
  SKILL_POINT_MILESTONES,
  STARTING_AP,
  XP_SOURCES,
  attributePointsAtLevel,
  skillPointsAtLevel,
  type PathInfo,
} from "../../../data/progression";

interface Props {
  path: PathInfo;
  level: number;
  onLevel: (level: number) => void;
}

const fmt = (n: number) => n.toLocaleString("en-GB");

const STEPS = [
  {
    n: "01",
    title: "Earn XP by playing in character",
    body: `Roleplay chat is the engine: any /s, /l, /sh, /w, /me, /do, /to or /tol message pays 39 XP, once every 15 minutes. Hit every window and that is ${CHAT_XP_PER_HOUR} XP an hour. Kills add a little on top.`,
  },
  {
    n: "02",
    title: "Cross a threshold, level up",
    body: "Levels are fixed XP walls (600 for Level 1, 39,312 for Level 30). The moment you cross one you get a chat message, your points land, and your garage and inventory sizes update on the spot.",
  },
  {
    n: "03",
    title: "Spend points in /skills",
    body: "Open /skills in game. Skills cost 1 to 4 skill points each and need their level. Attribute points go into Shooting, Strength, Driving and Stamina, and get pricier the higher the stat.",
  },
];

const RULES = [
  { k: "Creator picks", v: "Skills marked as creator picks were offered when you made your character. If you did not tick them then, you can never buy them. Everything else opens to anyone once they hit the level." },
  { k: "Skill caps", v: "Faction characters can own 3 skills, Illegal Civilians 7, Civilians 10. Choose with the whole ladder in mind." },
  { k: "XP goes down too", v: "Every firearm hit that lands on you costs 500 XP, at most once a minute. Drop under a threshold and you lose the level, and your garage and inventory shrink with it." },
  { k: "Faction-wide skills", v: "Skills your faction has unlocked are shared with every member automatically when they load in." },
  { k: "Restart lock", v: "The /skills menu locks 10 minutes before a scheduled restart so purchases cannot be lost." },
  { k: "Check progress", v: "Type /level in chat to see your XP and how much is left to the next level. /playtime shows total hours." },
];

export const XpGuide = ({ path, level, onLevel }: Props): JSX.Element => {
  const [showAll, setShowAll] = useState(false);

  const rows = LEVEL_XP.map((xp, i) => {
    const lv = i + 1;
    return {
      lv,
      xp,
      hours: LEVEL_HOURS[i],
      sp: SKILL_POINT_MILESTONES.find((m) => m.level === lv)?.points ?? 0,
      spTotal: skillPointsAtLevel(lv),
      ap: ATTRIBUTE_POINT_MILESTONES.find((m) => m.level === lv)?.points ?? 0,
      apTotal: attributePointsAtLevel(lv),
      garage: GARAGE_SLOTS[path.id][i],
      garageUp: i === 0 || GARAGE_SLOTS[path.id][i] !== GARAGE_SLOTS[path.id][i - 1],
      inv: INVENTORY_SLOTS[path.id][i],
      invUp: i === 0 || INVENTORY_SLOTS[path.id][i] !== INVENTORY_SLOTS[path.id][i - 1],
      guns: lv === path.weaponLevel,
    };
  });
  const visibleRows = showAll ? rows : rows.filter((r) => r.sp || r.ap || r.garageUp || r.invUp || r.guns || r.lv === level || r.lv === MAX_LEVEL);

  return (
    <section id="how-to-level" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-2 py-8 sm:px-3">
      <div className="flex flex-col gap-2 px-2 pb-5 sm:px-4">
        <p className="[font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#c3b2df]">
          STEP 3 · HOW TO LEVEL UP
        </p>
        <h2 className="[font-family:'Inter',Helvetica] text-[32px] font-black leading-[1.05] tracking-[-1.4px] text-[#f7f4fb] sm:text-[36px]">
          Talk, survive, cross the line
        </h2>
        <p className="max-w-[820px] [font-family:'Inter',Helvetica] text-[15px] leading-[25.5px] text-[#a296b6]">
          There is no XP for jobs or grinding. Levels reward time spent roleplaying and staying alive; getting shot is
          the only thing that takes XP away.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.n} className="relative overflow-hidden rounded-lg border border-[#1a1424] bg-[#0b0711] p-5">
            <span
              className="absolute -right-2 -top-4 [font-family:'Inter',Helvetica] text-[88px] font-black leading-none tracking-[-4px] opacity-[0.08]"
              style={{ color: path.accent }}
              aria-hidden
            >
              {s.n}
            </span>
            <p className="[font-family:'Inter',Helvetica] text-[11px] font-black tracking-[1px]" style={{ color: path.accent }}>
              STEP {s.n}
            </p>
            <h3 className="pt-1.5 [font-family:'Inter',Helvetica] text-lg font-black tracking-[-0.4px] text-[#f7f4fb]">{s.title}</h3>
            <p className="pt-2 [font-family:'Inter',Helvetica] text-sm leading-[22px] text-[#a296b6]">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="rounded-lg border border-[#1a1424] bg-[#060507] p-5">
          <h3 className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[1px] text-[#c3b2df]">
            Where XP comes from
          </h3>
          <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {XP_SOURCES.map((src) => {
              const gain = src.kind === "gain";
              const color = gain ? "#4ade80" : "#f87171";
              return (
                <li
                  key={src.title}
                  className="rounded-md border border-[#1a1424] bg-[#0d0913] p-3.5"
                  style={{ boxShadow: `inset 3px 0 0 ${color}` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="[font-family:'Inter',Helvetica] text-sm font-black text-[#f7f4fb]">{src.title}</p>
                    <span
                      className="rounded-md px-2 py-0.5 [font-family:'Inter',Helvetica] text-xs font-black"
                      style={{ color, background: `${color}1f` }}
                    >
                      {src.amount}
                    </span>
                  </div>
                  <p className="pt-1.5 [font-family:'Inter',Helvetica] text-xs leading-[19px] text-[#a296b6]">{src.detail}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 rounded-md border border-dashed border-[#2a2338] px-3.5 py-3">
            <p className="[font-family:'Inter',Helvetica] text-xs leading-[19px] text-[#a296b6]">
              <span className="font-black text-[#f7f4fb]">Worked example:</span> one RP message every 15 minutes is{" "}
              {CHAT_XP_PER_HOUR} XP an hour. Level 10 needs {fmt(LEVEL_XP[9])} XP, so about {LEVEL_HOURS[9]} hours of
              consistent roleplay. One unlucky shootout where you take four hits in four minutes costs 2,000 XP,
              roughly 13 hours of chat.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-[#1a1424] bg-[#060507] p-5">
          <h3 className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[1px] text-[#c3b2df]">
            The rules that catch people out
          </h3>
          <dl className="mt-3 flex flex-col gap-2.5">
            {RULES.map((r) => (
              <div key={r.k} className="rounded-md border border-[#1a1424] bg-[#0d0913] px-3.5 py-3">
                <dt className="[font-family:'Inter',Helvetica] text-sm font-black text-[#f7f4fb]">{r.k}</dt>
                <dd className="pt-1 [font-family:'Inter',Helvetica] text-xs leading-[19px] text-[#a296b6]">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-[#1a1424] bg-[#060507] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[1px] text-[#c3b2df]">
              The full ladder · {path.name}
            </h3>
            <p className="pt-1 [font-family:'Inter',Helvetica] text-sm text-[#a296b6]">
              Click a row to load it into the simulator. Highlighted cells are where something changes. Attribute
              points shown are on top of the {STARTING_AP} you get at creation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-pressed={showAll}
            className="self-start rounded-md border border-[#1a1424] bg-[#0d0913] px-3 py-1.5 [font-family:'Inter',Helvetica] text-xs font-bold text-[#a296b6] transition-colors hover:text-[#f7f4fb]"
          >
            {showAll ? "Show milestones only" : "Show all 30 levels"}
          </button>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse [font-family:'Inter',Helvetica] text-sm">
            <thead>
              <tr className="text-left text-[10px] font-bold uppercase tracking-[0.8px] text-[#a296b6]">
                {["Level", "XP to reach", "≈ Hours", "Skill pts", "Attr pts", "Garage", "Inventory", "Notes"].map((h) => (
                  <th key={h} className="border-b border-[#1a1424] px-3 py-2 font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r) => {
                const selected = r.lv === level;
                return (
                  <tr
                    key={r.lv}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected}
                    onClick={() => onLevel(r.lv)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onLevel(r.lv);
                      }
                    }}
                    className={`cursor-pointer border-b border-[#1a1424]/70 transition-colors focus-visible:outline-none ${
                      selected ? "bg-[#0d0913]" : "hover:bg-[#0b0711]"
                    }`}
                    style={selected ? { boxShadow: `inset 3px 0 0 ${path.accent}` } : undefined}
                  >
                    <td className="px-3 py-2 font-black text-[#f7f4fb]">{r.lv}</td>
                    <td className="px-3 py-2 text-[#dbd2eb]">{fmt(r.xp)}</td>
                    <td className="px-3 py-2 text-[#a296b6]">{r.hours}</td>
                    <td className="px-3 py-2">
                      {r.sp ? (
                        <span className="font-black" style={{ color: path.accent }}>
                          +{r.sp} <span className="text-xs font-bold text-[#a296b6]">({r.spTotal})</span>
                        </span>
                      ) : (
                        <span className="text-[#5c5270]">{r.spTotal}</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {r.ap ? (
                        <span className="font-black text-[#c3b2df]">
                          +{r.ap} <span className="text-xs font-bold text-[#a296b6]">({r.apTotal})</span>
                        </span>
                      ) : (
                        <span className="text-[#5c5270]">{r.apTotal}</span>
                      )}
                    </td>
                    <td className={`px-3 py-2 ${r.garageUp ? "font-black text-[#34d399]" : "text-[#5c5270]"}`}>{r.garage}</td>
                    <td className={`px-3 py-2 ${r.invUp ? "font-black text-[#34d399]" : "text-[#5c5270]"}`}>{r.inv}</td>
                    <td className="px-3 py-2 text-xs text-[#a296b6]">
                      {r.guns ? <span className="font-black text-[#f87171]">Firearms unlock</span> : r.lv === MAX_LEVEL ? "Max level" : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
