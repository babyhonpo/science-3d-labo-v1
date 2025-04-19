// 元素反応モード

const rule = (types: string[], effect: string) =>
    [types.sort().join("-"), effect] as const;

  // **衝突ルール**
  export const reactionModeRules = new Map<string,string>([
    rule(["N", "O"], "Bom"),
    rule(["H", "H"], "Bom"),

    rule(["Cl", "H"], "EnergyBurst"),
    rule(["Al", "Si"], "EnergyBurst"),

    rule(["Ga", "Ge"], "ToxicGasEffect"),
    rule(["H", "H"], "ToxicGasEffect"),
  
    rule(["C", "O"], "SmokeEffect"),
    rule(["S", "O"], "SmokeEffect"),
    rule(["P", "O"], "SmokeEffect"),
    rule(["Mg", "O"], "SmokeEffect"),
  
    rule(["H", "O"], "LightningEffect"),
    rule(["Na", "S"], "LightningEffect"),
    rule(["Ni", "Cd"], "LightningEffect"),
  
    rule(["Ru", "Ru", "Ru"], "LightningEffect"),
    rule(["H", "Ru", "Ru"], "ToxicGasEffect"),
    rule(["H", "Fe", "Co", "Ru"], "ToxicGasEffect"),

    rule(["H","S"], "AmmoniaEffect"),
  ]);