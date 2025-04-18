// 物質作成モード

const rule = (types: string[], result: string) =>
[types.sort().join("-"), result] as const;

export const creationModeRules = new Map<string, string>([
    rule(["H", "H", "o"], "H2O"),
]);
