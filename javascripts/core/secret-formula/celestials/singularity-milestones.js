"use strict";

// Used for UI purposes to give different theming for different kinds of upgrades
const LAITELA_UPGRADE_DIRECTION = {
  SELF_BOOST: 0,
  BOOSTS_MAIN: 1,
  BOOSTS_LAITELA: 2
};

GameDatabase.celestials.singularityMilestones = {
  // Infinite
  continuumMult: {
    start: 1,
    repeat: 125,
    limit: 0,
    description: "Continuum percentage multiplier",
    effect: completions => completions * 0.01,
    effectFormat: x => formatX(1 + x, 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.BOOSTS_MAIN,
  },
  darkMatterMult: {
    start: 2,
    repeat: 20,
    limit: 0,
    description: "Dark Matter production multiplier",
    effect: completions => Math.pow(1.5, completions),
    effectFormat: x => formatX(x, 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  darkEnergyMult: {
    start: 3,
    repeat: 30,
    limit: 0,
    description: "Dark Energy production multiplier",
    effect: completions => Math.pow(2, completions),
    effectFormat: x => formatX(x),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  darkDimensionCostReduction: {
    start: 4,
    repeat: 40,
    limit: 0,
    description: "Dark Matter Dimension upgrades are cheaper",
    effect: completions => Math.pow(0.7, completions),
    effectFormat: x => formatPercents(x, 1, 1),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  singularityMult: {
    id: 5,
    start: 50,
    repeat: 1000,
    limit: 0,
    description: "You gain more Singularities",
    effect: completions => Math.pow(2, completions),
    effectFormat: x => formatX(x, 2, 0),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  darkDimensionIntervalReduction: {
    start: 10,
    repeat: 100,
    limit: 0,
    description: "Dark Matter Dimension interval decrease",
    effect: completions => Math.pow(0.9, completions),
    effectFormat: x => formatX(x, 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  // Limited
  ascensionIntervalScaling: {
    start: 25,
    repeat: 2400,
    limit: 7,
    description: "Dark Matter Dimensions Ascension increases the interval less",
    effect: completions => [10000, 8700, 7500, 6400, 5400, 4500, 3700, 3000][completions],
    effectFormat: x => `×${formatInt(x)}`,
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  autoCondense: {
    start: 8,
    repeat: 80,
    limit: 8,
    description: "Automatically condense Singularities when reaching a threshold above the cap",
    effect: completions => [Infinity, 1.3, 1.22, 1.15, 1.1, 1.06, 1.03, 1.01, 1][completions],
    effectFormat: x => `Cap ${formatX(x, 2, 2)}`,
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  darkDimensionAutobuyers: {
    start: 30,
    repeat: 170,
    limit: 4,
    description: "Dark Matter Dimension Autobuyers",
    effect: completions => completions,
    effectFormat: x => ((x === 0) ? "No autobuyers" : `Autobuy up to DMD ${x}`),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  darkAutobuyerSpeed: {
    start: 45,
    repeat: 150,
    limit: 8,
    description: "All Dark Matter Dimension Autobuyers trigger faster",
    effect: completions => [30, 20, 15, 10, 5, 3, 2, 1, 0][completions],
    effectFormat: x => `${formatInt(x)}s`,
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  autoAscend: {
    start: 65,
    repeat: 10000,
    limit: 4,
    description: "[Placeholder milestone to replace auto-ascend]",
    effect: completions => completions,
    effectFormat: x => x,
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  improvedSingularityCap: {
    start: 150,
    repeat: 10000,
    limit: 4,
    description: "Increased Singularity gain per cap increase",
    effect: completions => 12 + 2 * completions,
    effectFormat: x => `${formatX(x)}`,
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  // Unique
  darkFromTesseracts: {
    start: 100,
    repeat: 0,
    limit: 1,
    description: "Tesseracts boost Dark Matter and Dark Energy production",
    effect: () => Math.pow(1.1, player.celestials.enslaved.tesseracts),
    effectFormat: x => formatX(x, 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.BOOSTS_LAITELA,
  },
  dilatedTimeFromSingularities: {
    start: 1e4,
    repeat: 0,
    limit: 1,
    description: "Singularities improve the repeatable Dilated Time multiplier upgrade",
    // Note that at ~2.15x this causes a runaway purely because of cost scaling
    effect: () => 1 + Math.clampMax(Math.log10(player.celestials.laitela.singularities) / 100, 0.8),
    effectFormat: x => `${formatX(2)} ➜ ${formatX(2 * Math.clampMin(x, 1), 2, 2)}`,
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.BOOSTS_MAIN,
  },
  darkFromGlyphLevel: {
    start: 1e6,
    repeat: 0,
    limit: 1,
    description: "Boost Dark Matter and Dark Energy production based on highest glyph level",
    effect: () => Math.clampMin((player.bestGlyphLevel - 10000) / 2000, 1),
    effectFormat: x => formatX(x, 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.BOOSTS_LAITELA,
  },
  gamespeedFromSingularities: {
    start: 1e8,
    repeat: 0,
    limit: 1,
    description: "Singularities boost game speed",
    effect: () => Math.clampMin(Math.pow(Math.log10(player.celestials.laitela.singularities), 4), 1),
    effectFormat: x => formatX(x, 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.BOOSTS_MAIN,
  },
  darkFromTheorems: {
    start: 1e10,
    repeat: 0,
    limit: 1,
    description: "Time Theorems boost Dark Matter and Dark Energy gain",
    effect: () => Math.sqrt(Math.clampMin((player.timestudy.theorem.log10() - 900) / 100, 1)),
    effectFormat: x => formatX(x, 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.BOOSTS_LAITELA,
  },
  dim4Generation: {
    start: 1e12,
    repeat: 0,
    limit: 1,
    description: "Annihilation multiplier generates 4th Dark Matter Dimensions",
    effect: () => Laitela.darkMatterMult,
    effectFormat: x => `${format(x, 2, 1)}/s (real-time)`,
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  darkFromDM4: {
    start: 1e14,
    repeat: 0,
    limit: 1,
    description: "4th Dark Matter Dimension amount boosts Dark Matter and Dark Energy gain",
    effect: () => Math.clampMin(MatterDimension(4).amount.pow(0.1).toNumber(), 1),
    effectFormat: x => formatX(x, 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.SELF_BOOST,
  },
  theoremPowerFromSingularities: {
    start: 1e16,
    repeat: 0,
    limit: 1,
    description: "Singularities give a power effect to Time Theorem gain",
    effect: () => 1 + Math.log10(1 + player.celestials.laitela.singularities) / 20,
    effectFormat: x => formatPow(x, 2, 3),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.BOOSTS_MAIN,
  },
  darkFromGamespeed: {
    start: 1e18,
    repeat: 0,
    limit: 1,
    description: "Gamespeed boosts Dark Matter and Dark Energy production",
    effect: () => Math.clampMin(Math.log10(getGameSpeedupFactor()) / 25 - 5, 1),
    effectFormat: x => formatX(x, 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.BOOSTS_LAITELA,
  },
  glyphLevelFromSingularities: {
    start: 1e20,
    repeat: 0,
    limit: 1,
    description: "Singularities boost pre-instability glyph level",
    effect: () => 1 + Math.log10(player.celestials.laitela.singularities) / 40,
    effectFormat: x => formatX(Math.clampMin(x, 1), 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.BOOSTS_MAIN,
  },
  darkFromDilatedTime: {
    start: 1e22,
    repeat: 0,
    limit: 1,
    description: "Dilated Time boosts Dark Matter production",
    effect: () => Math.pow(1.3, Decimal.log10(player.dilation.dilatedTime.plus(1)) / 1000),
    effectFormat: x => formatX(x, 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.BOOSTS_LAITELA,
  },
  tesseractMultFromSingularities: {
    start: 1e24,
    repeat: 0,
    limit: 1,
    description: "Singularities make Tesseracts stronger",
    effect: () => 1 + Math.log10(player.celestials.laitela.singularities) / 80,
    effectFormat: x => formatX(Math.clampMin(x, 1), 2, 2),
    upgradeDirection: LAITELA_UPGRADE_DIRECTION.BOOSTS_MAIN,
  }
};
