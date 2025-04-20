// 元素反応モード

const rule = (types: string[], effect: string) =>
  [types.sort().join("-"), effect] as const;

// **衝突ルール**
export const reactionModeRules = new Map<string, string>([
  rule(["Fi", "H"], "ToxicGasEffect"),
  rule(["Cu", "Cl", "Cl"], "LightningEffect"), // 電気化合物
  rule(["O", "O", "C"], "CO2"),
  rule(["H", "H", "O"], "H2O"), //水
  rule(["N", "H", "H", "H"], "NH3"), //アンモニア
  rule(["Na", "Cl"], "NaCl"), //塩
  rule(["Fe", "S"], "FeS"), //硫化鉱物
  rule(["Al", "Al", "O", "O", "O"], "Al2O3"), //サファイア
  rule(["Si", "O", "O"], "GlassShardsFall"), //ガラス
  rule(["Si", "O2"], "GlassShardsFall"), //test
]);
