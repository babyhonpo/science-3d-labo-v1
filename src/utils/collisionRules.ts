import { DraggableBox } from "../components/DraggableBox";
import { DraggableSphere } from "../components/DraggableSphere";
import { DraggableCylinder } from "../components/DraggableCylinder";
import { DraggableProps } from "../types/types";

// **ObjectType に対応するコンポーネントのマッピング**
export const componentMapping: Record<string, React.FC<DraggableProps>> = {
    box: DraggableBox,
    sphere: DraggableSphere,
    cylinder: DraggableCylinder,
};

// **衝突ルールをオブジェクトのペアとして管理**
export const collisionRules = new Map<
    string, // "box-sphere" のような文字列のキー
    string
>([
    ["Tc-Rh", "box"],
    ["Rh-Tc", "box"],
]);

// **衝突結果を取得**
export const getCollisionResult = (
    typeA: string,
    typeB: string
): string | null => {
    // **キーを統一するためにソート**
    const key = [typeA, typeB].sort().join("-"); // "box-sphere"
    console.log(typeA, typeB);
    return collisionRules.get(key) || null;
};

// **ObjectType からコンポーネントを取得**
export const getComponentFromType = (
    type: string):
    React.FC<DraggableProps> =>
    {
    return componentMapping[type];
};

