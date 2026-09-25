/**
 * Drop codes: a roll result packed into a short string an owner can paste in
 * game as `/factiondrop <playerId> <code>` to hand out everything at once.
 *
 * Format (before base64url):  E1|<tier>|<id>:<qty>,<id>:<qty>,...|<checksum>
 *   E1        version
 *   tier      1, 2 or 3 (player-facing number)
 *   id        catalog item id (the server maps it to the inventory item)
 *   qty       number of items (guns/knives 1, drugs 50/100/150)
 *   checksum  2 hex chars so a typo is rejected instead of giving the wrong thing
 * Decoding lives in rk_factions/server/ends_ext.lua. Keep the two in sync.
 */

export interface DropLine {
  id: string;
  qty: number;
}

const checksum = (s: string): string => {
  let h = 7;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 65521;
  return (h % 256).toString(16).padStart(2, "0");
};

const toBase64Url = (s: string): string =>
  btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export const encodeDropCode = (tierNumber: number, lines: DropLine[]): string => {
  const body = `E1|${tierNumber}|${lines.map((l) => `${l.id}:${l.qty}`).join(",")}`;
  return toBase64Url(`${body}|${checksum(body)}`);
};

/** Parse the numeric part of a quantity label such as "x100". */
export const quantityLabelToNumber = (label: string): number => {
  const n = parseInt(label.replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
};
