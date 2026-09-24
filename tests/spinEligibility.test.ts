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
  { id: "heroin", name: "Heroin", type: "drug" },
  { id: "cocaine", name: "Cocaine", type: "drug" },
  { id: "clinged-ket-rocks", name: "Clinged Ket Rocks", type: "drug" },
  { id: "crack-rocks", name: "Crack Rocks", type: "drug" },
] as const;

test("identifies every Nokia phone drug", () => {
  assert.deepEqual([...NOKIA_PHONE_ITEM_IDS].sort(), nokiaItems.map((item) => item.id).sort());
  for (const item of nokiaItems) assert.equal(isNokiaPhoneItem(item), true);
});

test("excludes Nokia phone drugs from spins", () => {
  for (const item of nokiaItems) assert.equal(isSpinEligible(item), false);
  assert.equal(isSpinEligible({ id: "ketamine", name: "Ketamine", type: "drug" }), true);
  assert.equal(isSpinEligible({ id: "xanax", name: "Xanax", type: "drug" }), true);
  assert.equal(isSpinEligible({ id: "canik", name: "Canik", type: "weapon" }), true);
});

test("describes Nokia phone drugs as NPC sale items", () => {
  assert.equal(NOKIA_PHONE_DESCRIPTION, "Can be sold to NPC customers via the Nokia Phone.");
  assert.equal(NOKIA_PHONE_PRICE, "£ UNKNOWN");
  assert.deepEqual([...NOKIA_PHONE_TAGS], ["Nokia Phone", "NPC Sale"]);
});
