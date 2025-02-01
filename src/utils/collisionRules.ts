// **衝突ルールをオブジェクトのペアとして管理**
export const collisionRules = new Map<
    string, // "box-sphere" のような文字列のキー
    string
>([
    ["Tc-Rh", "explosioneffect"],
    ["Rh-Tc", "ac"],
    ["B-C", "Tc"],
    ["C-B", "Tc"],
]);

// **衝突結果を取得**
export const getCollisionResult = (
    typeA: string,
    typeB: string
): string | null => {
    // **キーを統一するためにソート**
    const key = [typeA, typeB].sort().join("-"); // "box-sphere"
    console.log(typeA, typeB);
    console.log("衝突しました");
    return collisionRules.get(key) || null;
};
