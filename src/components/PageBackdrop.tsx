import { PAGE_BACKGROUNDS, type PageBackgroundKey } from "../data/pageBackgrounds";
import { asset } from "../lib/asset";

/** Hero background art for a page: the image plus the same dark overlays the home hero uses. */
export const PageBackdrop = ({ page }: { page: PageBackgroundKey }): JSX.Element => (
  <>
    <div className="pointer-events-none absolute inset-0 opacity-[0.42]" aria-hidden>
      <img
        className="h-full w-full object-cover object-top"
        alt=""
        src={asset(PAGE_BACKGROUNDS[page])}
        decoding="async"
      />
    </div>
    <div
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.53)_0%,rgba(5,6,7,0.3)_40%,rgba(5,6,7,0.47)_100%)] opacity-50"
      aria-hidden
    />
    <div
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.22)_0%,rgba(5,7,10,0.58)_58%,rgba(5,7,10,0.85)_100%)]"
      aria-hidden
    />
  </>
);
