import { useId } from "react";
import {
  GARAGE_SLOTS,
  INVENTORY_SLOTS,
  MAX_LEVEL,
  PATHS,
  slotSteps,
  type PathId,
  type PathInfo,
} from "../../../data/progression";

interface Props {
  path: PathInfo;
  level: number;
  onPath: (id: PathId) => void;
  onLevel: (level: number) => void;
}

const W = 640;
const H = 250;
const PL = 34;
const PR = 14;
const PT = 18;
const PB = 30;
const innerW = W - PL - PR;
const innerH = H - PT - PB;

const xStart = (lv: number) => PL + ((lv - 1) / MAX_LEVEL) * innerW;
const xEnd = (lv: number) => PL + (lv / MAX_LEVEL) * innerW;
const xMid = (lv: number) => (xStart(lv) + xEnd(lv)) / 2;

interface ChartProps {
  id: string;
  title: string;
  unit: string;
  tables: Record<PathId, number[]>;
  path: PathInfo;
  level: number;
  onPath: (id: PathId) => void;
  onLevel: (level: number) => void;
  note: string;
}

const StepChart = ({ id, title, unit, tables, path, level, onPath, onLevel, note }: ChartProps) => {
  const gradId = useId();
  const maxVal = Math.max(...Object.values(tables).flat());
  const tickStep = maxVal <= 10 ? 2 : maxVal <= 30 ? 5 : 10;
  const top = Math.ceil(maxVal / tickStep) * tickStep;
  const y = (v: number) => PT + (1 - v / top) * innerH;
  const ticks = Array.from({ length: top / tickStep + 1 }, (_, i) => i * tickStep);

  const line = (table: number[]) => {
    let d = `M ${xStart(1)} ${y(table[0])}`;
    for (let i = 0; i < table.length; i++) {
      d += ` H ${xEnd(i + 1)}`;
      if (i + 1 < table.length) d += ` V ${y(table[i + 1])}`;
    }
    return d;
  };
  const area = (table: number[]) => `${line(table)} V ${y(0)} H ${xStart(1)} Z`;

  const lv = Math.min(Math.max(level, 1), MAX_LEVEL);
  const current = tables[path.id][lv - 1];
  const steps = slotSteps(tables[path.id]);

  const onChartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const guess = Math.floor(((px - PL) / innerW) * MAX_LEVEL) + 1;
    onLevel(Math.min(MAX_LEVEL, Math.max(1, guess)));
  };

  return (
    <div className="rounded-lg border border-[#1a1424] bg-[#0b0711] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="[font-family:'Inter',Helvetica] text-xl font-black tracking-[-0.5px] text-[#f7f4fb]">{title}</h3>
          <p className="pt-1 [font-family:'Inter',Helvetica] text-sm leading-[21px] text-[#a296b6]">{note}</p>
        </div>
        <div className="shrink-0 rounded-md border border-[#1a1424] bg-[#0d0913] px-3.5 py-2 text-right">
          <p className="[font-family:'Inter',Helvetica] text-[10px] font-bold uppercase tracking-[0.7px] text-[#a296b6]">
            {path.name} · Lv {lv}
          </p>
          <p className="[font-family:'Inter',Helvetica] text-2xl font-black leading-none text-[#f7f4fb]">
            {current} <span className="text-xs font-bold text-[#a296b6]">{unit}</span>
          </p>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-4 w-full cursor-crosshair"
        role="img"
        aria-labelledby={`${id}-title`}
        onClick={onChartClick}
      >
        <title id={`${id}-title`}>
          {title} by level for {path.name}: {steps.map((s) => `Level ${s.level} ${s.value}`).join(", ")}
        </title>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={path.accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={path.accent} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PL} x2={W - PR} y1={y(t)} y2={y(t)} stroke="#1a1424" strokeWidth="1" />
            <text x={PL - 6} y={y(t) + 3.5} textAnchor="end" fontSize="10" fontWeight="700" fill="#a296b6" fontFamily="Inter, Helvetica, sans-serif">
              {t}
            </text>
          </g>
        ))}
        {[1, 5, 10, 15, 20, 25, 30].map((n) => (
          <text key={n} x={xMid(n)} y={H - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="#a296b6" fontFamily="Inter, Helvetica, sans-serif">
            Lv {n}
          </text>
        ))}
        {PATHS.filter((p) => p.id !== path.id).map((p) => (
          <path key={p.id} d={line(tables[p.id])} fill="none" stroke={p.accent} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.45" />
        ))}
        <path d={area(tables[path.id])} fill={`url(#${gradId})`} style={{ transition: "d 0.4s ease" }} />
        <path d={line(tables[path.id])} fill="none" stroke={path.accent} strokeWidth="3" strokeLinejoin="round" style={{ transition: "d 0.4s ease" }} />
        <line x1={xMid(lv)} x2={xMid(lv)} y1={PT} y2={H - PB} stroke="#f7f4fb" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" style={{ transition: "x1 0.3s ease, x2 0.3s ease" }} />
        <circle cx={xMid(lv)} cy={y(current)} r="6" fill={path.accent} stroke="#060507" strokeWidth="2.5" style={{ transition: "cx 0.3s ease, cy 0.3s ease" }} />
      </svg>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {PATHS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onPath(p.id)}
            aria-pressed={p.id === path.id}
            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 [font-family:'Inter',Helvetica] text-[11px] font-bold transition-colors ${
              p.id === path.id ? "border-[#1a1424] bg-[#0d0913] text-[#f7f4fb]" : "border-transparent text-[#a296b6] hover:text-[#f7f4fb]"
            }`}
          >
            <span className="h-2 w-4 rounded-full" style={{ background: p.accent, opacity: p.id === path.id ? 1 : 0.5 }} aria-hidden />
            {p.name}
            <span className="text-[#5c5270]">
              {tables[p.id][0]}→{tables[p.id][MAX_LEVEL - 1]}
            </span>
          </button>
        ))}
      </div>

      <ol className="mt-3 flex flex-wrap gap-1.5">
        {steps.map((s, i) => {
          const end = i + 1 < steps.length ? steps[i + 1].level - 1 : MAX_LEVEL;
          const active = lv >= s.level && lv <= end;
          return (
            <li key={s.level}>
              <button
                type="button"
                onClick={() => onLevel(s.level)}
                className={`rounded-md border px-2.5 py-1.5 [font-family:'Inter',Helvetica] text-xs transition-colors ${
                  active ? "border-transparent text-[#09060d]" : "border-[#1a1424] bg-[#0d0913] text-[#a296b6] hover:text-[#f7f4fb]"
                }`}
                style={active ? { background: path.accent } : undefined}
              >
                <span className="font-bold">{s.level === end ? `Lv ${s.level}` : `Lv ${s.level}–${end}`}</span>
                <span className={active ? "opacity-80" : "text-[#5c5270]"}> · </span>
                <span className="font-black">{s.value}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export const SlotCharts = ({ path, level, onPath, onLevel }: Props): JSX.Element => (
  <section id="slots" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-2 py-8 sm:px-3">
    <div className="flex flex-col gap-2 px-2 pb-5 sm:px-4">
      <p className="[font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#c3b2df]">
        STEP 5 · GARAGE &amp; INVENTORY
      </p>
      <h2 className="[font-family:'Inter',Helvetica] text-[32px] font-black leading-[1.05] tracking-[-1.4px] text-[#f7f4fb] sm:text-[36px]">
        Your slots grow with your level
      </h2>
      <p className="max-w-[820px] [font-family:'Inter',Helvetica] text-[15px] leading-[25.5px] text-[#a296b6]">
        Both tables come straight from the server. Slots update the moment you level up, and shrink again if you
        lose a level. Click anywhere on a chart to move the simulator to that level; the dashed lines show the other
        two paths for comparison.
      </p>
    </div>
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <StepChart
        id="garage-chart"
        title="Garage slots"
        unit="vehicles"
        tables={GARAGE_SLOTS}
        path={path}
        level={level}
        onPath={onPath}
        onLevel={onLevel}
        note="How many vehicles you can keep in your garage. Jumps every five levels. Faction members with the Improvement skill get one extra slot on top."
      />
      <StepChart
        id="inventory-chart"
        title="Inventory slots"
        unit="slots"
        tables={INVENTORY_SLOTS}
        path={path}
        level={level}
        onPath={onPath}
        onLevel={onLevel}
        note="Your personal inventory size. Grows by one slot roughly every two levels, with a double step at Level 30. Illegal Civilians start and finish biggest."
      />
    </div>
  </section>
);
