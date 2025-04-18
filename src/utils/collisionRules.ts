import { creationModeRules } from "./collisionRules.creation";
import { reactionModeRules } from "./collisionRules.reaction";

// **衝突ルール**
export const collisionRules = new Map<string, string>([
  rule(["N", "O"], "Bom"),

  rule(["Cl", "H"], "EnergyBurst"),
  rule(["Al", "Si"], "EnergyBurst"),

  rule(["Ga", "Ge"], "ToxicGasEffect"),
  rule(["H", "Cl"], "ToxicGasEffect"),
  rule(["H", "I"], "ToxicGasEffect"),

  rule(["H", "H"], "SmokeEffect"),
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

  // H2を使用したもの
  rule(["H2", "O"], "SmokeEffect"), //仮
  rule(["H2", "O2"], "SmokeEffect"),
  rule(["H2", "S"], "ToxicGasEffect"),
  rule(["Ca", "H2"], "SmokeEffect"),
  rule(["Mg", "H2"], "SmokeEffect"),
  rule(["Ti", "H2"], "SmokeEffect"),
  rule(["Zr", "H2"], "SmokeEffect"),

  rule(["Na", "S"], "LightningEffect"),
  rule(["Ni", "Cd"], "LightningEffect"),
  rule(["Fe", "S"], "LightningEffect"),
  rule(["Al", "O"], "LightningEffect"),
  rule(["Si", "O"], "LightningEffect"),
  rule(["Li", "H"], "LightningEffect"),
  rule(["Na", "H"], "LightningEffect"),

  rule(["Ru", "Ru", "Ru"], "LightningEffect"),
  rule(["H", "Ru", "Ru"], "ToxicGasEffect"),
  rule(["H", "Fe", "Co", "Ru"], "ToxicGasEffect"),
]);

// モードの型定義
export type CollisionMode = "creation" | "reaction";

export const collisionRulesByMode: Record<CollisionMode, Map<string, string>> = {
  creation: creationModeRules,
  reaction: reactionModeRules,
};

// **衝突結果を取得**
export const getCollisionResult = (
  types: string[],
  mode: CollisionMode,
) : string | null => {
  const key = [...types].sort().join("-");
  // console.log(getCollisionResult(["H", "H"], "reaction"));
  return collisionRulesByMode[mode].get(key) || null;
}
