// **衝突ルールをオブジェクトのペアとして管理**
export const collisionRules = new Map<
  string, // "box-sphere" のような文字列のキー
  string
>([
  ["Tc-Rh", "Bom"],
  ["Rh-Tc", "Bom"],
  ["B-C", "Bom"],
  ["C-B", "Bom"],
  ["Al-Si", "EnergyBurst"],
  ["Si-Al", "EnergyBurst"],
  ["Ga-Ge", "ToxicGasEffect"],
  ["Ge-Ga", "ToxicGasEffect"],
  ["In-Sn", "SmokeEffect"],
  ["Sn-In", "SmokeEffect"],

]);

// **衝突結果を取得**
export const getCollisionResult = (
  typeA: string,
  typeB: string
): string | null => {
  // **キーを統一するためにソート**
  const key = [typeA, typeB].sort().join("-"); // "box-sphere"
  return collisionRules.get(key) || null;
};
