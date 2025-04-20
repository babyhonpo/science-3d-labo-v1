// 元素反応モード

const rule = (types: string[], effect: string) =>
  [types.sort().join("-"), effect] as const;

// **衝突ルール**
export const reactionModeRules = new Map<string, string>([
  rule(["N", "O"], "ToxicGasEffect"),
  rule(["Fe", "H"], "EnergyBurst"),

  rule(["Cl", "H"], "ToxicGasEffect"),
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
]);
