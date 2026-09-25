import { Link } from "react-router-dom";
import { catalogItems } from "../../../../data/items";
import { MAX_LEVEL, TOTAL_UNIQUE_SKILLS } from "../../../../data/progression";
import { asset } from "../../../../lib/asset";

const secondaryCtaClass =
  "inline-flex h-auto shrink-0 items-center gap-2 rounded-lg border border-[#1a1424] bg-[#0b0711b8] px-6 py-3.5 [font-family:'Inter',Helvetica] text-[15px] font-bold leading-normal tracking-[0] text-[#f7f4fb] backdrop-blur-[5px] transition-colors hover:border-[#c3b2df]/40 hover:bg-[#0b0711]/90 [-webkit-backdrop-filter:blur(5px)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c3b2df]/40";

function IconViewAllWeapons() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g clipPath="url(#hero_clip_view_weapons)">
        <path
          d="M9 16.5V8.99999M15.2025 13.7025L16.5 15M15.75 7.87349V5.99999C15.7495 5.46464 15.4636 4.97016 15 4.70249L9.75 1.70249C9.2859 1.43454 8.7141 1.43454 8.25 1.70249L3 4.70249C2.53637 4.97016 2.25055 5.46464 2.25 5.99999V12C2.25082 12.5351 2.53661 13.0292 3 13.2967L8.25 16.2967C8.71397 16.5649 9.28576 16.5652 9.75 16.2975L10.485 15.8782"
          stroke="#f7f4fb"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.4675 5.25001L9 9.00001L15.5325 5.25001M5.625 3.20251L12.3727 7.06351"
          stroke="#f7f4fb"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12.375C12 13.4098 12.8402 14.25 13.875 14.25C14.9098 14.25 15.75 13.4098 15.75 12.375C15.75 11.3402 14.9098 10.5 13.875 10.5C12.8402 10.5 12 11.3402 12 12.375V12.375"
          stroke="#f7f4fb"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="hero_clip_view_weapons">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function IconDice() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M3 7.5H9C9.83 7.5 10.5 8.17 10.5 9V15C10.5 15.83 9.83 16.5 9 16.5H3C2.17 16.5 1.5 15.83 1.5 15V9C1.5 8.17 2.17 7.5 3 7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.44 10.5L16.07 7.88C16.64 7.24 16.64 6.26 16.07 5.63L12.32 1.94C11.68 1.36 10.7 1.36 10.07 1.94L7.5 4.5M4.5 13.5H4.51M7.5 10.5H7.51M11.25 4.5H11.26M13.5 6.75H13.51"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFolder() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4H10L12 6H20C20.55 6 21.021 6.196 21.413 6.588C21.805 6.98 22.0007 7.45067 22 8V18C22 18.55 21.8043 19.021 21.413 19.413C21.0217 19.805 20.5507 20.0007 20 20H4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconChart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const countType = (type: string) => catalogItems.filter((i) => i.type === type).length;

const stats = [
  { value: String(countType("weapon")), label: "Guns" },
  { value: String(countType("knife")), label: "Knives" },
  { value: String(countType("drug")), label: "Drugs" },
  { value: String(TOTAL_UNIQUE_SKILLS), label: `Skills · ${MAX_LEVEL} levels` },
];

export const IllegalAreaHeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full">
        {/* Background art. WebP (~10% of the original PNG weight); the two side panels only load on wide screens. */}
        <div className="absolute inset-0 opacity-[0.42]" aria-hidden>
          <img
            className="absolute left-1/2 top-0 hidden h-[843px] w-[878px] -translate-x-[27%] object-cover lg:block"
            alt=""
            src={asset("rectangle-1722.webp")}
            width={878}
            height={843}
            decoding="async"
          />
          <img
            className="absolute right-0 top-0 hidden h-[702px] w-[560px] object-cover xl:block"
            alt=""
            src={asset("rectangle-1723.webp")}
            width={560}
            height={702}
            loading="lazy"
            decoding="async"
          />
          <img
            className="absolute left-0 top-0 h-full max-w-[338px] object-cover"
            alt=""
            src={asset("rectangle-middle.webp")}
            width={338}
            height={843}
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.53)_0%,rgba(5,6,7,0.3)_40%,rgba(5,6,7,0.47)_100%)] opacity-50" aria-hidden />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.22)_0%,rgba(5,7,10,0.58)_58%,rgba(5,7,10,0.85)_100%)]" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-start px-4 pb-16 pt-[88px] sm:px-6 md:px-8 md:pb-20 md:pt-[104px]">
          <header className="flex w-full max-w-[860px] flex-col items-start">
            <img
              className="h-[120px] w-[120px] drop-shadow-[0_8px_24px_rgba(195,178,223,0.25)] sm:h-[150px] sm:w-[150px]"
              alt="The Ends Roleplay"
              src={asset("windycity-512.webp")}
              width={150}
              height={150}
              decoding="async"
            />
            <p className="pt-6 [font-family:'Inter',Helvetica] text-xs font-bold tracking-[0.96px] text-[#c3b2df]">
              THE ENDS V3 · LONDON ROLEPLAY
            </p>
            <h1 className="pt-3 [font-family:'Inter',Helvetica] text-[40px] font-black leading-[1.02] tracking-[-2.4px] text-[#f7f4fb] sm:text-[52px] md:text-7xl md:tracking-[-3.60px]">
              The Illegal Area Guide
            </h1>
            <p className="max-w-[660px] pt-4 [font-family:'Inter',Helvetica] text-base font-normal leading-[27.2px] text-[#a296b6]">
              Everything the illegal side of The Ends can hand you: what the supply-drop wheel can roll, which
              faction skills unlock at each level, every gun, knife and drug with its real numbers, and how
              attribute upgrades are priced.
            </p>
            <nav aria-label="Jump to a section" className="pt-7">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#supply-drop"
                  className="inline-flex h-auto items-center gap-2 rounded-lg bg-[#c3b2df] px-6 py-3.5 [font-family:'Inter',Helvetica] text-[15px] font-bold text-[#09060d] transition-colors hover:bg-[#d4c6ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c3b2df]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060507]"
                >
                  <IconDice />
                  Open supply drop
                </a>
                <a href="#weapon-catalog" className={secondaryCtaClass}>
                  <IconViewAllWeapons />
                  View all guns
                </a>
                <Link to="/progression" className={secondaryCtaClass}>
                  <IconFolder />
                  Skills &amp; Levelling
                </Link>
                <a href="#windy-attributes" className={secondaryCtaClass}>
                  <IconChart />
                  Attributes
                </a>
              </div>
            </nav>
          </header>

          <dl className="mt-12 grid w-full max-w-[760px] grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-[#1a1424] bg-[#0b0711]/70 px-4 py-3 backdrop-blur-[4px]"
              >
                <dt className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[0.8px] text-[#a296b6]">
                  {s.label}
                </dt>
                <dd className="[font-family:'Inter',Helvetica] text-2xl font-black tracking-[-1px] text-[#f7f4fb]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
