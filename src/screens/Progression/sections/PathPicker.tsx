import { PATHS, SKILLS, type PathId } from "../../../data/progression";

interface Props {
  selected: PathId;
  onSelect: (id: PathId) => void;
}

const money = (n: number) => `£${n.toLocaleString("en-GB")}`;

const ATTRIBUTES: { key: keyof (typeof PATHS)[number]["attributeCaps"]; label: string }[] = [
  { key: "shooting", label: "Shooting" },
  { key: "strength", label: "Strength" },
  { key: "driving", label: "Driving" },
  { key: "stamina", label: "Stamina" },
];

/** Three big radio cards: the character-creator archetypes collapse into these paths server-side. */
export const PathPicker = ({ selected, onSelect }: Props): JSX.Element => (
  <section id="paths" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-2 pt-6 sm:px-3">
    <div className="flex flex-col gap-2 px-2 pb-4 sm:px-4">
      <p className="[font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#c3b2df]">
        STEP 1 · PICK A PATH
      </p>
      <h2 className="[font-family:'Inter',Helvetica] text-[32px] font-black leading-[1.05] tracking-[-1.4px] text-[#f7f4fb] sm:text-[36px]">
        Your character type decides the whole ladder
      </h2>
      <p className="max-w-[820px] [font-family:'Inter',Helvetica] text-[15px] leading-[25.5px] text-[#a296b6]">
        The archetype you chose in the character creator maps to one of three progression paths. Each has its own
        skill tree, skill cap, gun level, cash cap, attribute caps and slot tables. Everything below follows the
        path you select here.
      </p>
    </div>

    <div role="radiogroup" aria-label="Progression path" className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {PATHS.map((path) => {
        const active = path.id === selected;
        const tree = SKILLS[path.id];
        const totalCost = tree.reduce((s, sk) => s + sk.cost, 0);
        return (
          <button
            key={path.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(path.id)}
            className={`group relative flex flex-col items-start gap-3 overflow-hidden rounded-lg border p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060507] ${
              active ? "bg-[#0d0913]" : "border-[#1a1424] bg-[#0b0711] hover:border-[#2a2338]"
            }`}
            style={{
              borderColor: active ? path.accent : undefined,
              boxShadow: active ? `0 0 0 1px ${path.accent}, 0 18px 48px -24px ${path.accent}` : undefined,
              ["--tw-ring-color" as string]: path.accent,
            }}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-300"
              style={{ background: path.accent, opacity: active ? 0.22 : 0.06 }}
              aria-hidden
            />
            <div className="relative flex w-full items-start justify-between gap-3">
              <div>
                <h3 className="[font-family:'Inter',Helvetica] text-[22px] font-black tracking-[-0.6px] text-[#f7f4fb]">
                  {path.name}
                </h3>
                <p className="pt-0.5 [font-family:'Inter',Helvetica] text-xs font-bold text-[#a296b6]">
                  {path.archetypes.join(" · ")}
                </p>
              </div>
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
                style={{ borderColor: active ? path.accent : "#2a2338", background: active ? path.accent : "transparent" }}
                aria-hidden
              >
                {active && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="#09060d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </div>
            <p className="relative [font-family:'Inter',Helvetica] text-sm leading-[22px] text-[#a296b6]">{path.blurb}</p>

            <dl className="relative grid w-full grid-cols-2 gap-2">
              {[
                { k: "Skills in tree", v: `${tree.length} (${totalCost} SP to buy all)` },
                { k: "Max owned at once", v: String(path.maxSkills) },
                { k: "Firearms unlock", v: `Level ${path.weaponLevel}` },
                { k: "Cash cap", v: money(path.moneyLimit) },
              ].map((s) => (
                <div key={s.k} className="rounded-md border border-[#1a1424] bg-[#060507]/70 px-3 py-2">
                  <dt className="[font-family:'Inter',Helvetica] text-[10px] font-bold uppercase tracking-[0.7px] text-[#a296b6]">
                    {s.k}
                  </dt>
                  <dd className="[font-family:'Inter',Helvetica] text-sm font-black text-[#f7f4fb]">{s.v}</dd>
                </div>
              ))}
            </dl>

            <div className="relative w-full">
              <p className="[font-family:'Inter',Helvetica] text-[10px] font-bold uppercase tracking-[0.7px] text-[#a296b6]">
                Attribute caps
              </p>
              <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1.5">
                {ATTRIBUTES.map((a) => {
                  const cap = path.attributeCaps[a.key];
                  return (
                    <div key={a.key} className="flex items-center gap-2">
                      <span className="w-14 shrink-0 [font-family:'Inter',Helvetica] text-[11px] font-bold text-[#a296b6]">
                        {a.label}
                      </span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1a1424]">
                        <div className="h-full rounded-full" style={{ width: `${cap}%`, background: path.accent }} />
                      </div>
                      <span className="w-6 text-right [font-family:'Inter',Helvetica] text-[11px] font-black text-[#f7f4fb]">
                        {cap}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </section>
);
