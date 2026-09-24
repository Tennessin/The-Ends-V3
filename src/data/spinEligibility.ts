// Mirrors Config.Drugs in zyke_drugdealer (crackrocks, cocaine, clingedketrocks, heroin).
export const NOKIA_PHONE_ITEM_IDS = [
  "heroin",
  "cocaine",
  "clinged-ket-rocks",
  "crack-rocks",
] as const;

export const NOKIA_PHONE_DESCRIPTION =
  "Can be sold to NPC customers via the Nokia Phone.";
export const NOKIA_PHONE_PRICE = "£ UNKNOWN";
export const NOKIA_PHONE_TAGS = ["Nokia Phone", "NPC Sale"] as const;

const nokiaPhoneItemIds = new Set<string>(NOKIA_PHONE_ITEM_IDS);

type CatalogRuleItem = {
  id: string;
  type: string;
};

export const isNokiaPhoneItem = (item: CatalogRuleItem): boolean =>
  item.type === "drug" && nokiaPhoneItemIds.has(item.id);

export const isSpinEligible = (item: CatalogRuleItem): boolean =>
  !isNokiaPhoneItem(item);