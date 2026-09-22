export const NOKIA_PHONE_ITEM_IDS = [
  "ketamine",
  "heroin",
  "bolivian-coke-28g",
  "clinged-ket-rocks",
  "crack-rocks",
] as const;

export const NOKIA_PHONE_DESCRIPTION =
  "Sold to NPCs via Nokia Phone. This item has no player perks.";
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