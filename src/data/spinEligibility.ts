export const NOKIA_PHONE_ITEM_IDS = [
  "ketamine",
  "bolivian-coke-28g",
  "clinged-ket-rocks",
  "crack-rocks",
] as const;

const nokiaPhoneItemIds = new Set<string>(NOKIA_PHONE_ITEM_IDS);

type CatalogRuleItem = {
  id: string;
  type: string;
};

export const isNokiaPhoneItem = (item: CatalogRuleItem): boolean =>
  item.type === "drug" && nokiaPhoneItemIds.has(item.id);

export const isSpinEligible = (item: CatalogRuleItem): boolean =>
  !isNokiaPhoneItem(item);