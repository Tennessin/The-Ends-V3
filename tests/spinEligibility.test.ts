import test from "node:test";
import assert from "node:assert/strict";

import {
  NOKIA_PHONE_DESCRIPTION,
  NOKIA_PHONE_ITEM_IDS,
  NOKIA_PHONE_PRICE,
  NOKIA_PHONE_TAGS,
  isNokiaPhoneItem,
  isSpinEligible,
} from "../src/data/spinEligibility.ts";

const nokiaItems = [
  { id: "ketamine", name: "Ketamine", type: "drug" },
  { id: "heroin", name: "Heroin", type: "drug" },
  { id: "bolivian-coke-28g", name: "Bolivian Coke 28g", type: "drug" },
  { id: "clinged-ket-rocks", name: "Clinged Ket Rocks", type: "drug" },
  { id: "crack-rocks", name: "Crack Rocks", type: "drug" },
] as const;

test("identifies every Nokia phone drug", () => {
  assert.deepEqual([...NOKIA_PHONE_ITEM_IDS].sort(), nokiaItems.map((item) => item.id).sort());
  for (const item of nokiaItems) assert.equal(isNokiaPhoneItem(item), true);
});

test("excludes Nokia phone drugs from spins", () => {
  for (const item of nokiaItems) assert.equal(isSpinEligible(item), false);
  assert.equal(isSpinEligible({ id: "cocaine", name: "Cocaine", type: "drug" }), true);
  assert.equal(isSpinEligible({ id: "canik", name: "Canik", type: "weapon" }), true);
});

test("describes Nokia phone drugs as NPC sale items without perks", () => {
  assert.equal(NOKIA_PHONE_DESCRIPTION, "Sold to NPCs via Nokia Phone. This item has no player perks.");
  assert.equal(NOKIA_PHONE_PRICE, "£ UNKNOWN");
  assert.deepEqual([...NOKIA_PHONE_TAGS], ["Nokia Phone", "NPC Sale"]);
});
