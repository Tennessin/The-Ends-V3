/**
 * Turns a drug description like
 *   "Codeine for lean. PRO: +10 Armor, Take Cover skill or Tazer Resistance skill until restart.
 *    CON: -10% Speed until restart or Munchies for 240s. 5% addiction chance."
 * into structured data the UI can render as PRO / CON chips.
 *
 * Alternatives inside a PRO or CON clause ("A or B", "A, B or C") are separate
 * entries: the effect engine rolls ONE of them per use.
 */
export interface DrugEffects {
  /** Flavour text before the PRO/CON block (may be empty). */
  intro: string;
  pros: string[];
  cons: string[];
  /** Trailing remarks after the CON clause, e.g. "Effects roll once per balloon." */
  notes: string[];
  /** "5% addiction chance" pulled out of the notes, if present. */
  addiction?: string;
  /** True when more than one PRO or CON alternative exists (one is rolled). */
  rolled: boolean;
  /** True when the text carries no PRO/CON block at all. */
  plain: boolean;
}

// Colon form only: "PRO / CON effect" and "no PRO/CON roll" in prose must stay plain text.
const PRO_RE = /\bPRO:\s*/;
const CON_RE = /\bCON:\s*/;

const cleanIntro = (s: string): string =>
  s
    .replace(/each roll gives\s*-?\s*$/i, "")
    .replace(/[\s\-–—:,.]+$/g, "")
    .trim();

const splitSentences = (s: string): string[] =>
  s
    .split(/(?<=[a-z0-9)%])\.\s+(?=[A-Z0-9+\-])/)
    .map((p) => p.trim().replace(/\.$/, ""))
    .filter(Boolean);

const splitAlternatives = (clause: string): string[] =>
  clause
    .replace(/\.$/, "")
    .split(/\s*,\s*or\s+|\s+or\s+|\s*,\s*/)
    .map((p) => p.trim())
    .filter(Boolean);

export function parseDrugEffects(description: string): DrugEffects {
  const text = description.trim();
  const proMatch = PRO_RE.exec(text);
  const conMatch = CON_RE.exec(text);

  if (!proMatch && !conMatch) {
    return { intro: text, pros: [], cons: [], notes: [], rolled: false, plain: true };
  }

  const firstIdx = Math.min(proMatch?.index ?? Infinity, conMatch?.index ?? Infinity);
  let intro = cleanIntro(text.slice(0, firstIdx));

  let pros: string[] = [];
  let cons: string[] = [];
  let notes: string[] = [];

  if (proMatch) {
    const start = proMatch.index + proMatch[0].length;
    const end = conMatch && conMatch.index > proMatch.index ? conMatch.index : text.length;
    const [clause, ...rest] = splitSentences(text.slice(start, end));
    pros = clause ? splitAlternatives(clause) : [];
    notes.push(...rest);
  }
  if (conMatch) {
    const start = conMatch.index + conMatch[0].length;
    const end = proMatch && proMatch.index > conMatch.index ? proMatch.index : text.length;
    const [clause, ...rest] = splitSentences(text.slice(start, end));
    cons = clause ? splitAlternatives(clause) : [];
    notes.push(...rest);
  }

  // "No upside." / "No downside." live in the intro or notes; they are implied by empty lists.
  const isNoSide = (s: string) => /^no (upside|downside)$/i.test(s.replace(/\.$/, ""));
  if (isNoSide(intro)) intro = "";
  notes = notes.filter((n) => !isNoSide(n));

  let addiction: string | undefined;
  notes = notes.filter((n) => {
    if (/addiction chance/i.test(n)) {
      addiction = n;
      return false;
    }
    return true;
  });

  return {
    intro,
    pros,
    cons,
    notes,
    addiction,
    rolled: pros.length > 1 || cons.length > 1,
    plain: false,
  };
}
