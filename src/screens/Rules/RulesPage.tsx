import { useEffect, useMemo, useState } from "react";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteNav, type SectionLink } from "../../components/SiteNav";
import { RULES_INTRO, RULE_SECTIONS, TOTAL_RULES } from "../../data/rules";
import { asset } from "../../lib/asset";
import { FactionTiersGuide } from "./FactionTiersGuide";

const SECTIONS: SectionLink[] = [
  { href: "#faction-tiers", label: "Faction tiers" },
  { href: "#rules-list", label: "All rules" },
];

const URL_RE = /(https?:\/\/[^\s)]+)/g;

/** Turns bare URLs inside a rule into links; everything else stays text. */
const renderText = (text: string) =>
  text.split(URL_RE).map((part, i) =>
    URL_RE.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noreferrer"
        className="break-all font-bold text-[#c3b2df] underline decoration-[#c3b2df]/40 underline-offset-2 hover:decoration-[#c3b2df]"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

const highlight = (text: string, query: string) => {
  if (!query) return renderText(text);
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx < 0) return renderText(text);
  return (
    <>
      {renderText(text.slice(0, idx))}
      <mark className="rounded bg-[#c3b2df]/30 px-0.5 text-[#f7f4fb]">{text.slice(idx, idx + query.length)}</mark>
      {renderText(text.slice(idx + query.length))}
    </>
  );
};

export const RulesPage = (): JSX.Element => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>(RULE_SECTIONS[0].id);

  useEffect(() => {
    const previous = document.title;
    document.title = "The Ends V3 — Rules of Engagement";
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const targets = RULE_SECTIONS.map((s) => document.getElementById(`rule-${s.id}`)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (onScreen) setActive(onScreen.target.id.replace(/^rule-/, ""));
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1] },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [query]);

  const q = query.trim();
  const filtered = useMemo(() => {
    if (!q) return RULE_SECTIONS.map((s) => ({ section: s, rules: s.rules.map((r, i) => ({ r, n: i + 1 })) }));
    const lower = q.toLowerCase();
    return RULE_SECTIONS.map((s) => ({
      section: s,
      rules: s.rules.map((r, i) => ({ r, n: i + 1 })).filter(({ r }) => r.toLowerCase().includes(lower)),
    })).filter((s) => s.rules.length > 0 || s.section.title.toLowerCase().includes(lower));
  }, [q]);
  const shown = filtered.reduce((n, s) => n + s.rules.length, 0);

  return (
    <main id="top" className="w-full bg-[#060507] text-[#f7f5f2]">
      <SiteNav sections={SECTIONS} />

      <section className="relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 480px at 10% -10%, rgba(248,113,113,0.22), transparent 60%), radial-gradient(700px 420px at 90% 10%, rgba(195,178,223,0.16), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-start px-4 pb-10 pt-[88px] sm:px-6 md:px-8 md:pt-[104px]">
          <div className="flex items-center gap-4">
            <img
              className="h-[84px] w-[84px] drop-shadow-[0_8px_24px_rgba(195,178,223,0.25)] sm:h-[104px] sm:w-[104px]"
              alt="The Ends Roleplay"
              src={asset("windycity-512.webp")}
              width={104}
              height={104}
              decoding="async"
            />
            <div>
              <p className="[font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#c3b2df]">
                THE ENDS V3 · FACTION MANAGEMENT
              </p>
              <h1 className="pt-2 [font-family:'Inter',Helvetica] text-[40px] font-black leading-[1.02] tracking-[-2.2px] text-[#f7f4fb] sm:text-[52px] md:text-[64px] md:tracking-[-3px]">
                Rules of Engagement
              </h1>
            </div>
          </div>
          <p className="max-w-[760px] pt-5 [font-family:'Inter',Helvetica] text-base leading-[27.2px] text-[#a296b6]">
            {RULES_INTRO}
          </p>
          <dl className="mt-8 grid w-full max-w-[640px] grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { v: String(RULE_SECTIONS.length), k: "Sections" },
              { v: String(TOTAL_RULES), k: "Rules" },
              { v: "4", k: "Faction tiers" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-[#1a1424] bg-[#0b0711]/70 px-4 py-3 backdrop-blur-[4px]">
                <dt className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[0.8px] text-[#a296b6]">
                  {s.k}
                </dt>
                <dd className="[font-family:'Inter',Helvetica] text-2xl font-black tracking-[-1px] text-[#f7f4fb]">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FactionTiersGuide />

      <section id="rules-list" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-2 pb-10 sm:px-3">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <label htmlFor="rules-search" className="sr-only">
              Search the rules
            </label>
            <input
              id="rules-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search rules…"
              className="w-full rounded-lg border border-[#1a1424] bg-[#0b0711] px-3.5 py-2.5 [font-family:'Inter',Helvetica] text-sm text-[#f7f4fb] placeholder:text-[#5c5270] focus:border-[#c3b2df]/50 focus:outline-none"
            />
            <p className="pt-2 [font-family:'Inter',Helvetica] text-xs text-[#a296b6]" aria-live="polite">
              {q ? `${shown} of ${TOTAL_RULES} rules match` : `${TOTAL_RULES} rules in ${RULE_SECTIONS.length} sections`}
            </p>
            <nav aria-label="Rule sections" className="mt-3 hidden lg:block">
              <ol className="flex flex-col gap-0.5">
                {RULE_SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#rule-${s.id}`}
                      className={`flex items-baseline gap-2 rounded-md px-2.5 py-1.5 [font-family:'Inter',Helvetica] text-[13px] font-bold transition-colors ${
                        active === s.id ? "bg-[#1a1424] text-[#f7f4fb]" : "text-[#a296b6] hover:bg-[#0d0913] hover:text-[#f7f4fb]"
                      }`}
                    >
                      <span className="w-5 shrink-0 text-right text-[11px] text-[#c3b2df]">{i + 1}</span>
                      <span>{s.title}</span>
                      <span className="ml-auto text-[11px] text-[#5c5270]">{s.rules.length}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="flex flex-col gap-5">
            {filtered.length === 0 && (
              <p className="rounded-lg border border-[#1a1424] bg-[#0b0711] p-5 [font-family:'Inter',Helvetica] text-sm text-[#a296b6]">
                No rule mentions "{q}".{" "}
                <button type="button" onClick={() => setQuery("")} className="font-bold text-[#c3b2df] underline">
                  Clear search
                </button>
              </p>
            )}
            {filtered.map(({ section, rules }) => {
              const sectionNo = RULE_SECTIONS.indexOf(section) + 1;
              return (
                <section
                  key={section.id}
                  id={`rule-${section.id}`}
                  className="scroll-mt-20 rounded-lg border border-[#1a1424] bg-[#060507] p-5 sm:p-6"
                >
                  <header className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#c3b2df] [font-family:'Inter',Helvetica] text-lg font-black text-[#09060d]">
                      {sectionNo}
                    </span>
                    <div>
                      <h2 className="[font-family:'Inter',Helvetica] text-[24px] font-black leading-tight tracking-[-0.8px] text-[#f7f4fb] sm:text-[28px]">
                        {section.title}
                      </h2>
                      <p className="pt-0.5 [font-family:'Inter',Helvetica] text-xs font-bold text-[#a296b6]">
                        {section.rules.length} rule{section.rules.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </header>
                  {section.intro && (
                    <p className="mt-4 rounded-md border border-dashed border-[#2a2338] px-4 py-3 [font-family:'Inter',Helvetica] text-sm leading-[22px] text-[#a296b6]">
                      {section.intro}
                    </p>
                  )}
                  <ol className="mt-4 flex flex-col gap-2">
                    {rules.map(({ r, n }) => (
                      <li
                        key={n}
                        id={`rule-${section.id}-${n}`}
                        className="grid grid-cols-[52px_minmax(0,1fr)] gap-3 rounded-md border border-[#1a1424] bg-[#0d0913] px-4 py-3.5 transition-colors hover:border-[#2a2338] sm:grid-cols-[60px_minmax(0,1fr)]"
                      >
                        <a
                          href={`#rule-${section.id}-${n}`}
                          className="[font-family:'Inter',Helvetica] text-sm font-black tracking-[-0.3px] text-[#c3b2df] hover:underline"
                          aria-label={`Rule ${sectionNo}.${n}`}
                        >
                          {sectionNo}.{n}
                        </a>
                        <p className="[font-family:'Inter',Helvetica] text-sm leading-[23px] text-[#e2dbef]">{highlight(r, q)}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};
