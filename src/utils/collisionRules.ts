// **衝突ルールをオブジェクトのペアとして管理**
export const collisionRules = new Map<
  string, // "box-sphere" のような文字列のキー
  string
>([
  ["N-O", "Bom"], ["O-N", "Bom"],

  ["Cl-H", "EnergyBurst"], ["H-Cl", "EnergyBurst"],

  ["Al-Si", "EnergyBurst"], // 任せる
  ["Si-Al", "EnergyBurst"], // 任せる
  ["Ga-Ge", "ToxicGasEffect"], // 任せる
  ["Ge-Ga", "ToxicGasEffect"], // 任せる

  ["H-H", "ToxicGasEffect"],

  ["C-O", "SmokeEffect"], ["O-C", "SmokeEffect"],
  ["S-O", "SmokeEffect"], ["O-S", "SmokeEffect"],
  ["P-O", "SmokeEffect"], ["O-P", "SmokeEffect"],
  ["Mg-O", "SmokeEffect"], ["O-Mg", "SmokeEffect"],

  ["H-O", "LightningEffect"], ["O-H", "LightningEffect"],
  ["Na-S", "LightningEffect"], ["S-Na", "LightningEffect"],
  ["Ni-Cd", "LightningEffect"], ["Cd-Ni", "LightningEffect"]

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
