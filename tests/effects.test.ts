import test from "node:test";
import assert from "node:assert/strict";

import { parseDrugEffects } from "../src/lib/effects.ts";

test("splits PRO / CON alternatives and pulls out notes", () => {
  const fx = parseDrugEffects(
    "Codeine for lean (pour with Phenergan + a drink). PRO: +10 Armor (reactive), Take Cover skill or Tazer Resistance skill until restart. CON: -10% Speed until restart or Munchies for 240s. 5% addiction chance.",
  );
  assert.equal(fx.intro, "Codeine for lean (pour with Phenergan + a drink)");
  assert.deepEqual(fx.pros, ["+10 Armor (reactive)", "Take Cover skill", "Tazer Resistance skill until restart"]);
  assert.deepEqual(fx.cons, ["-10% Speed until restart", "Munchies for 240s"]);
  assert.equal(fx.addiction, "5% addiction chance");
  assert.deepEqual(fx.notes, []);
  assert.equal(fx.rolled, true);
  assert.equal(fx.plain, false);
});

test("handles no-upside and no-downside items", () => {
  const k2 = parseDrugEffects("No upside. CON: Health locked to 75% until restart.");
  assert.equal(k2.intro, "");
  assert.deepEqual(k2.pros, []);
  assert.deepEqual(k2.cons, ["Health locked to 75% until restart"]);

  const oxy = parseDrugEffects("PRO: +25% Health instantly. No downside.");
  assert.deepEqual(oxy.pros, ["+25% Health instantly"]);
  assert.deepEqual(oxy.cons, []);
  assert.deepEqual(oxy.notes, []);
  assert.equal(oxy.rolled, false);
});

test("keeps trailing remarks as notes", () => {
  const whip = parseDrugEffects(
    "Fill a balloon (3-5 puffs). PRO: +15% Stamina Regen for 180s or removes worst screenshake. CON: blurred vision for 120s or stamina drain while running for 120s. Effects roll once per balloon.",
  );
  assert.deepEqual(whip.notes, ["Effects roll once per balloon"]);
  assert.equal(whip.intro, "Fill a balloon (3-5 puffs)");
});

test("prose mentions of PRO/CON without colons stay plain", () => {
  for (const text of [
    "Sold to NPC customers via the Nokia Phone. Using it has no PRO / CON effect.",
    "Weed strain (hybrid). Roll it or pack a bong: stress relief + high only, no PRO/CON roll.",
  ]) {
    const fx = parseDrugEffects(text);
    assert.equal(fx.plain, true, text);
    assert.deepEqual(fx.pros, []);
    assert.deepEqual(fx.cons, []);
  }
});

test("strips the weed 'each roll gives -' lead-in", () => {
  const fx = parseDrugEffects(
    "Weed strain (hybrid). On top of the smoking high, each roll gives - PRO: 5% Health Regen for 180s or removes worst screenshake. CON: -15% Stamina Regen for 180s or Munchies for 180s.",
  );
  assert.equal(fx.intro, "Weed strain (hybrid). On top of the smoking high");
  assert.equal(fx.pros.length, 2);
});

test("unwired items are plain", () => {
  const fx = parseDrugEffects("Not currently wired to the effect engine - no PRO/CON roll.");
  assert.equal(fx.plain, true);
  assert.deepEqual(fx.pros, []);
});
