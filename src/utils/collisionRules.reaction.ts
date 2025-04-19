// 元素反応モード

const rule = (types: string[], effect: string) =>
  [types.sort().join("-"), effect] as const;

// **衝突ルール**
export const reactionModeRules = new Map<string, string>([
  rule(["N", "O"], "Bom"),
  rule(["Fi", "H"], "ToxicGasEffect"),

  rule(["Cl", "H"], "EnergyBurst"),
  rule(["Al", "Si"], "EnergyBurst"),

  rule(["Ga", "Ge"], "ToxicGasEffect"),
  rule(["H", "Cl"], "ToxicGasEffect"),
  rule(["H", "I"], "ToxicGasEffect"),

  rule(["C", "O"], "SmokeEffect"),
  rule(["S", "O"], "SmokeEffect"),
  rule(["P", "O"], "SmokeEffect"),
  rule(["Mg", "O"], "SmokeEffect"),
  rule(["Na", "Cl"], "SmokeEffect"),
  rule(["C", "H"], "SmokeEffect"),
  rule(["H", "O"], "SmokeEffect"),
  rule(["N", "H"], "SmokeEffect"),
  rule(["H", "F"], "SmokeEffect"),
  rule(["H", "Br"], "SmokeEffect"),

  rule(["Na", "S"], "LightningEffect"),
  rule(["Ni", "Cd"], "LightningEffect"),
  rule(["Fe", "S"], "LightningEffect"),
  rule(["Al", "O"], "LightningEffect"),
  rule(["Li", "H"], "LightningEffect"),
  rule(["Na", "H"], "LightningEffect"),

  rule(["Ru", "Ru", "Ru"], "LightningEffect"),
  rule(["H", "Ru", "Ru"], "ToxicGasEffect"),
  rule(["H", "Fe", "Co", "Ru"], "ToxicGasEffect"),

  rule(["H", "H", "O"], "H2O"), //水
  rule(["N", "H", "H", "H"], "NH3"), //アンモニア
  rule(["Na", "Cl"], "NaCl"), //塩
  rule(["Fe", "S"], "FeS"), //硫化鉱物
  rule(["Al", "Al", "O", "O", "O"], "Al2O3"), //サファイア
  rule(["Si", "O", "O"], "GlassShardsFall"), //ガラス
  rule(["Si", "O2"], "GlassShardsFall"), //test
]);
