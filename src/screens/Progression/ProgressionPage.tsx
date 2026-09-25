import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteNav, type SectionLink } from "../../components/SiteNav";
import { MAX_LEVEL, PATHS, pathById, type PathId } from "../../data/progression";
import { LevelSimulator } from "./sections/LevelSimulator";
import { PathPicker } from "./sections/PathPicker";
import { ProgressionHero } from "./sections/ProgressionHero";
import { SkillTree } from "./sections/SkillTree";
import { SlotCharts } from "./sections/SlotCharts";
import { XpGuide } from "./sections/XpGuide";

const SECTIONS: SectionLink[] = [
  { href: "#paths", label: "Paths" },
  { href: "#level-simulator", label: "Simulator" },
  { href: "#how-to-level", label: "Levelling" },
  { href: "#skill-tree", label: "Skills" },
  { href: "#slots", label: "Slots" },
];

const DEFAULT_PATH: PathId = "faction";
const DEFAULT_LEVEL = 10;

const isPathId = (value: string | null): value is PathId => PATHS.some((p) => p.id === value);
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/**
 * Skills & Levelling tab. The chosen path and level live in the query string
 * (?path=faction&lvl=12) so a specific view can be shared or bookmarked.
 */
export const ProgressionPage = (): JSX.Element => {
  const [params, setParams] = useSearchParams();

  const rawPath = params.get("path");
  const pathId: PathId = isPathId(rawPath) ? rawPath : DEFAULT_PATH;
  const rawLevel = Number(params.get("lvl"));
  const level = params.has("lvl") && Number.isFinite(rawLevel) ? clamp(Math.round(rawLevel), 0, MAX_LEVEL) : DEFAULT_LEVEL;
  const path = pathById(pathId);

  const update = useCallback(
    (next: { path?: PathId; level?: number }) => {
      setParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (next.path) p.set("path", next.path);
          if (next.level !== undefined) p.set("lvl", String(clamp(next.level, 0, MAX_LEVEL)));
          return p;
        },
        { replace: true },
      );
    },
    [setParams],
  );
  const setPath = useCallback((id: PathId) => update({ path: id }), [update]);
  const setLevel = useCallback((lvl: number) => update({ level: lvl }), [update]);

  useEffect(() => {
    const previous = document.title;
    document.title = "The Ends V3 — Skills & Levelling";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main id="top" className="w-full bg-[#060507] text-[#f7f5f2]">
      <style>{`
        @keyframes progFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes progPop {
          0% { transform: scale(0.97); box-shadow: 0 0 0 0 var(--glow, rgba(195,178,223,0.4)); }
          70% { box-shadow: 0 0 0 12px rgba(0,0,0,0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,0,0,0); }
        }
        @keyframes progShimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        .prog-fade { animation: progFadeUp 0.4s ease both; }
        .prog-pop { animation: progPop 0.55s ease; }
        .prog-shimmer {
          background-size: 200% 100%;
          animation: progShimmer 6s linear infinite;
        }
        .prog-range { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 999px; background: #1a1424; outline: none; }
        .prog-range::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none; height: 26px; width: 26px; border-radius: 999px;
          background: var(--thumb, #c3b2df); border: 3px solid #060507; box-shadow: 0 0 0 2px var(--thumb, #c3b2df), 0 6px 18px rgba(0,0,0,0.5);
          cursor: pointer; transition: transform 0.15s ease;
        }
        .prog-range::-webkit-slider-thumb:hover { transform: scale(1.08); }
        .prog-range::-moz-range-thumb {
          height: 26px; width: 26px; border-radius: 999px; background: var(--thumb, #c3b2df);
          border: 3px solid #060507; box-shadow: 0 0 0 2px var(--thumb, #c3b2df), 0 6px 18px rgba(0,0,0,0.5); cursor: pointer;
        }
        .prog-range::-moz-range-track { height: 6px; border-radius: 999px; background: #1a1424; }
        .prog-range:focus-visible { box-shadow: 0 0 0 3px rgba(195,178,223,0.35); }
        @media (prefers-reduced-motion: reduce) {
          .prog-fade, .prog-pop, .prog-shimmer { animation: none; }
        }
      `}</style>
      <SiteNav sections={SECTIONS} />
      <ProgressionHero path={path} level={level} />
      <PathPicker selected={pathId} onSelect={setPath} />
      <LevelSimulator path={path} level={level} onLevel={setLevel} />
      <XpGuide path={path} level={level} onLevel={setLevel} />
      <SkillTree path={path} level={level} onLevel={setLevel} />
      <SlotCharts path={path} level={level} onPath={setPath} onLevel={setLevel} />
      <SiteFooter />
    </main>
  );
};
