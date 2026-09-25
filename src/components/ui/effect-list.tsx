import { parseDrugEffects } from "../../lib/effects";

interface EffectListProps {
  description: string;
  /** Card layout: fewer chips, no intro; modal layout: everything. */
  variant?: "compact" | "full";
}

const MAX_COMPACT = 2;

function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="shrink-0">
      <path d="M5 1.5v7M1.5 5h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden className="shrink-0">
      <path d="M1.5 5h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function DiceIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" />
      <circle cx="15.5" cy="8.5" r="1.4" fill="currentColor" />
      <circle cx="8.5" cy="15.5" r="1.4" fill="currentColor" />
      <circle cx="15.5" cy="15.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

const tone = {
  pro: {
    label: "PRO",
    head: "text-[#4ade80]",
    chip: "border-[#4ade80]/25 bg-[#4ade80]/[0.08] text-[#d7f7e3]",
    icon: "bg-[#4ade80]/20 text-[#4ade80]",
  },
  con: {
    label: "CON",
    head: "text-[#f87171]",
    chip: "border-[#f87171]/25 bg-[#f87171]/[0.08] text-[#fbdada]",
    icon: "bg-[#f87171]/20 text-[#f87171]",
  },
} as const;

function Group({
  kind,
  items,
  compact,
}: {
  kind: "pro" | "con";
  items: string[];
  compact: boolean;
}) {
  const t = tone[kind];
  const shown = compact ? items.slice(0, MAX_COMPACT) : items;
  const hidden = items.length - shown.length;
  const rolled = items.length > 1;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <span className={`[font-family:'Inter',Helvetica] text-[10px] font-black tracking-[1.2px] ${t.head}`}>
          {t.label}
        </span>
        {items.length === 0 ? (
          <span className="[font-family:'Inter',Helvetica] text-[11px] text-[#a296b6]">
            {kind === "pro" ? "No upside" : "No downside"}
          </span>
        ) : rolled ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-[#1a1424] bg-[#0d0913] px-1.5 py-0.5 [font-family:'Inter',Helvetica] text-[10px] font-bold text-[#a296b6]">
            <DiceIcon />1 of {items.length}
          </span>
        ) : null}
      </div>
      {shown.length > 0 && (
        <ul className="flex flex-col gap-1">
          {shown.map((effect) => (
            <li
              key={effect}
              className={`flex items-start gap-2 rounded-md border px-2.5 py-1.5 [font-family:'Inter',Helvetica] text-[12px] font-semibold leading-snug ${t.chip}`}
            >
              <span className={`mt-[3px] inline-flex h-3.5 w-3.5 items-center justify-center rounded-full ${t.icon}`}>
                {kind === "pro" ? <PlusIcon /> : <MinusIcon />}
              </span>
              <span>{effect}</span>
            </li>
          ))}
          {hidden > 0 && (
            <li className="[font-family:'Inter',Helvetica] text-[11px] font-bold text-[#a296b6]">
              +{hidden} more…
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

/** PRO / CON chips for a drug description. Falls back to plain text for unwired items. */
export function EffectList({ description, variant = "compact" }: EffectListProps): JSX.Element {
  const fx = parseDrugEffects(description);
  const compact = variant === "compact";

  if (fx.plain) {
    return (
      <p className={`[font-family:'Inter',Helvetica] text-sm leading-[22px] text-[#a296b6] ${compact ? "line-clamp-3" : ""}`}>
        {fx.intro}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {!compact && fx.intro && (
        <p className="[font-family:'Inter',Helvetica] text-sm leading-[22px] text-[#a296b6]">{fx.intro}</p>
      )}
      <div className={compact ? "flex flex-col gap-2.5" : "grid grid-cols-1 gap-3 sm:grid-cols-2"}>
        <Group kind="pro" items={fx.pros} compact={compact} />
        <Group kind="con" items={fx.cons} compact={compact} />
      </div>
      {(fx.addiction || (!compact && fx.notes.length > 0)) && (
        <div className="flex flex-wrap items-center gap-2">
          {fx.addiction && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/10 px-2 py-0.5 [font-family:'Inter',Helvetica] text-[10px] font-bold text-[#fde68a]">
              ⚠ {fx.addiction}
            </span>
          )}
          {!compact &&
            fx.notes.map((n) => (
              <span key={n} className="[font-family:'Inter',Helvetica] text-[11px] text-[#a296b6]">
                {n}.
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
