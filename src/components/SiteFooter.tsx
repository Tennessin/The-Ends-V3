import { Link } from "react-router-dom";
import { catalogItems } from "../data/items";
import { MAX_LEVEL, TOTAL_UNIQUE_SKILLS } from "../data/progression";

const count = (type: string) => catalogItems.filter((i) => i.type === type).length;

const linkClass =
  "rounded-lg border border-[#1a1424] bg-[#0b0711] px-4 py-2 [font-family:'Inter',Helvetica] text-xs font-bold text-[#f7f4fb] transition-colors hover:border-[#c3b2df]/40";

export const SiteFooter = (): JSX.Element => (
  <footer className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-6 sm:px-6 md:px-8">
    <div className="h-[3px] w-full bg-[#1a1424]" />
    <div className="flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
      <div>
        <p className="[font-family:'Inter',Helvetica] text-sm font-black tracking-[-0.3px] text-[#f7f4fb]">
          The Ends V3 · Illegal Area
        </p>
        <p className="[font-family:'Inter',Helvetica] text-xs text-[#a296b6]">
          {count("weapon")} guns · {count("knife")} knives · {count("drug")} drugs · {TOTAL_UNIQUE_SKILLS} skills over{" "}
          {MAX_LEVEL} levels. Everything mirrors the live server; if the game differs from this site, the game is
          right and this site needs updating.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Link to="/" className={linkClass}>
          Illegal Area Guide
        </Link>
        <Link to="/progression" className={linkClass}>
          Skills & Levelling
        </Link>
        <Link to="/rules" className={linkClass}>
          Rules of Engagement
        </Link>
        <a href="#top" className={linkClass}>
          Back to top ↑
        </a>
      </div>
    </div>
  </footer>
);
