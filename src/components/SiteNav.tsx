import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { asset } from "../lib/asset";

export interface SectionLink {
  href: string;
  label: string;
}

const pageTabs = [
  { to: "/", label: "Illegal Area Guide", short: "Guide" },
  { to: "/progression", label: "Skills & Levelling", short: "Skills" },
  { to: "/rules", label: "Rules of Engagement", short: "Rules" },
  { to: "/faction-tiers", label: "Faction Tiers", short: "Tiers" },
];

interface SiteNavProps {
  /** In-page anchors for the current page, shown on the right of the bar. */
  sections: SectionLink[];
}

/**
 * Fixed top bar: the two site tabs on the left, the current page's section
 * links on the right. Transparent over the hero, frosted once you scroll.
 */
export const SiteNav = ({ sections }: SiteNavProps): JSX.Element => {
  const { pathname } = useLocation();
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActive("");
    const targets = sections
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (onScreen) setActive(`#${onScreen.target.id}`);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    targets.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [sections, pathname]);

  return (
    <div className="fixed inset-x-0 top-0 z-40">
      <nav
        aria-label="Site"
        className={`border-b transition-colors duration-300 ${
          solid
            ? "border-[#1a1424] bg-[#060507]/85 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center gap-3 px-4 sm:px-6 md:px-8">
          <NavLink to="/" className="flex shrink-0 items-center gap-2" aria-label="The Ends V3 home">
            <img src={asset("windycity-128.png")} alt="" width={28} height={28} className="h-7 w-7" />
            <span className="hidden [font-family:'Inter',Helvetica] text-sm font-black tracking-[-0.3px] text-[#f7f4fb] md:inline">
              The Ends V3
            </span>
          </NavLink>

          <div
            className="flex shrink-0 items-center gap-0.5 rounded-lg border border-[#1a1424] bg-[#0b0711]/80 p-0.5"
            role="tablist"
            aria-label="Pages"
          >
            {pageTabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                end
                role="tab"
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-md px-3 py-1.5 [font-family:'Inter',Helvetica] text-[13px] font-bold transition-colors ${
                    isActive ? "bg-[#c3b2df] text-[#09060d]" : "text-[#a296b6] hover:text-[#f7f4fb]"
                  }`
                }
              >
                <span className="sm:hidden">{tab.short}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-1 overflow-x-auto">
            {sections.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-lg px-2.5 py-2 [font-family:'Inter',Helvetica] text-[13px] font-bold transition-colors sm:px-3 ${
                  active === l.href
                    ? "bg-[#1a1424] text-[#f7f4fb]"
                    : "text-[#a296b6] hover:bg-[#1a1424] hover:text-[#f7f4fb]"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};
