// 物質作成モード

const rule = (types: string[], result: string) =>
  [types.sort().join("-"), result] as const;

export const creationModeRules = new Map<string, string>([
  rule(["H", "H"], "H2"), //水素ガス
  rule(["O", "O"], "O2"), //酸素

  rule(["Fi", "LightningEffect"], "SpawnH2O"), // 電気分解でH2個とO1個生成

  rule(["H", "H", "O"], "H2O"), //水
  rule(["N", "H", "H", "H"], "NH3"), //アンモニア
  rule(["Na", "Cl"], "NaCl"), //塩
  rule(["Fe", "S"], "FeS"), //硫化鉱物
  rule(["Al", "Al", "O", "O", "O"], "Al2O3"), //サファイア
  // rule(["Si", "O", "O"], "GlassShardsFall"), //ガラス
  // rule(["Si", "O2"], "GlassShardsFall"), //test

  // 以下は元素の玉を生成
  rule(["H", "H", "O"], "H2O"),
  rule(["H", "H", "S"], "H2S"),
  rule(["Ca", "H", "H"], "CaH2"),
  rule(["Mg", "H", "H"], "MgH2"),
  rule(["Ti", "H", "H"], "TiH2"),
  rule(["Zr", "H", "H"], "ZrH2"),
  rule(["C", "H", "H", "H", "H"], "CH4"),
  rule(["C", "O", "O"], "CO2"),
  rule(["S", "O", "O"], "SO2"),
  rule(["Fe", "Fe", "O", "O", "O"], "Fe2O3"),
  rule(["Ca", "C", "O", "O", "O"], "CaCO3"),
  rule(["Ca", "Cl", "Cl"], "CaCl2"),
  rule(["Al", "Cl", "Cl", "Cl"], "AlCl3"),
  rule(["C", "C", "H", "H", "H", "H", "H", "H"], "C2H6"),
  rule(["C", "C", "H", "H", "H", "H"], "C2H4"),
  rule(["C", "H", "H", "H", "O", "H"], "CH3OH"),
  rule(["S", "O", "O", "O"], "SO3"),
  rule(["N", "O", "O"], "NO2"),
]);
