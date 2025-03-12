const rule = (types: string[], effect: string) =>
  [types.sort().join("-"), effect] as const;

// **衝突ルール**
export const collisionRules = new Map<string,string>([
  rule(["N", "O"], "Bom"),

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

  rule(["Ru", "Ru", "Ru"], "SuperLightningEffect"),
]);

// **衝突結果を取得**
export const getCollisionResult = (
  types: string[] // ["O", "N"] ["H", "O", "H"]など
) : string | null => {
  const key = [...types].sort().join("-");
  return collisionRules.get(key) || null;
}
