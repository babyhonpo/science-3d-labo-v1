import { creationModeRules } from "./collisionRules.creation";
import { reactionModeRules } from "./collisionRules.reaction";

// モードのの型定義
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
