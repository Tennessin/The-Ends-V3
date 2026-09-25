import test from "node:test";
import assert from "node:assert/strict";

import {
  GARAGE_SLOTS,
  INVENTORY_SLOTS,
  LEVEL_HOURS,
  LEVEL_XP,
  MAX_LEVEL,
  PATHS,
  SKILLS,
  TOTAL_ATTRIBUTE_POINTS,
  TOTAL_SKILL_POINTS,
  TOTAL_UNIQUE_SKILLS,
  attributePointsAtLevel,
  garageSlotsAt,
  inventorySlotsAt,
  levelForXp,
  skillPointsAtLevel,
  slotSteps,
  xpForLevel,
} from "../src/data/progression.ts";

test("level thresholds match the server's calculateLevel()", () => {
  assert.equal(LEVEL_XP.length, MAX_LEVEL);
  assert.equal(LEVEL_HOURS.length, MAX_LEVEL);
  assert.equal(levelForXp(0), 0);
  assert.equal(levelForXp(599), 0);
  assert.equal(levelForXp(600), 1);
  assert.equal(levelForXp(9359), 9);
  assert.equal(levelForXp(9360), 10);
  assert.equal(levelForXp(39312), 30);
  assert.equal(levelForXp(1_000_000), 30);
  assert.equal(xpForLevel(0), 0);
  assert.equal(xpForLevel(1), 600);
  assert.equal(xpForLevel(30), 39312);
  // Thresholds must be strictly increasing or the level maths breaks.
  for (let i = 1; i < LEVEL_XP.length; i++) assert.ok(LEVEL_XP[i] > LEVEL_XP[i - 1], `level ${i + 1}`);
});

test("point milestones add up to the config totals", () => {
  assert.equal(skillPointsAtLevel(0), 0);
  assert.equal(skillPointsAtLevel(3), 2);
  assert.equal(skillPointsAtLevel(10), 9);
  assert.equal(TOTAL_SKILL_POINTS, 26);
  assert.equal(attributePointsAtLevel(2), 10);
  assert.equal(attributePointsAtLevel(10), 70);
  assert.equal(TOTAL_ATTRIBUTE_POINTS, 210);
});

test("slot tables cover all 30 levels and never shrink", () => {
  for (const path of PATHS) {
    for (const table of [GARAGE_SLOTS[path.id], INVENTORY_SLOTS[path.id]]) {
      assert.equal(table.length, MAX_LEVEL, path.id);
      for (let i = 1; i < table.length; i++) assert.ok(table[i] >= table[i - 1], `${path.id} level ${i + 1}`);
    }
  }
  assert.equal(garageSlotsAt("civilian", 1), 3);
  assert.equal(garageSlotsAt("civilian", 6), 6);
  assert.equal(garageSlotsAt("civilian", 30), 25);
  assert.equal(garageSlotsAt("faction", 30), 8);
  assert.equal(inventorySlotsAt("faction", 1), 12);
  assert.equal(inventorySlotsAt("illegalcivilians", 30), 30);
  // Out-of-range levels clamp instead of throwing.
  assert.equal(garageSlotsAt("civilian", 0), 3);
  assert.equal(garageSlotsAt("civilian", 99), 25);
  assert.deepEqual(slotSteps(GARAGE_SLOTS.faction), [
    { level: 1, value: 2 },
    { level: 6, value: 3 },
    { level: 11, value: 4 },
    { level: 16, value: 5 },
    { level: 21, value: 6 },
    { level: 26, value: 8 },
  ]);
});

test("skill trees are sorted by level and sized like the server config", () => {
  assert.equal(SKILLS.faction.length, 16);
  assert.equal(SKILLS.civilian.length, 14);
  assert.equal(SKILLS.illegalcivilians.length, 16);
  assert.equal(TOTAL_UNIQUE_SKILLS, 27);
  for (const path of PATHS) {
    const tree = SKILLS[path.id];
    for (let i = 1; i < tree.length; i++) assert.ok(tree[i].level >= tree[i - 1].level, `${path.id} ${tree[i].id}`);
    for (const s of tree) {
      assert.ok(s.cost >= 1 && s.cost <= 4, s.id);
      assert.ok(s.level >= 1 && s.level <= MAX_LEVEL, s.id);
    }
    assert.ok(tree.every((s) => s.level !== 3 || s.id === "Nametags"), "level 3 is Nametags only");
  }
  // Creator-pick flags come from Config.CreatorSkills.
  assert.equal(SKILLS.faction.find((s) => s.id === "Nametags")?.creatorOnly, false);
  assert.equal(SKILLS.faction.find((s) => s.id === "HeadshotKings")?.creatorOnly, true);
  assert.equal(SKILLS.civilian.find((s) => s.id === "Reputation")?.creatorOnly, false);
});
