import { DraggableBox } from "../components/DraggableBox";
import { DraggableSphere } from "../components/DraggableSphere";
import { DraggableCylinder } from "../components/DraggableCylinder";
import { ObjectType, DraggableProps } from "../types/types";

// **ObjectType に対応するコンポーネントのマッピング**
export const componentMapping: Record<ObjectType, React.FC<DraggableProps>> = {
    box: DraggableBox,
    sphere: DraggableSphere,
    cylinder: DraggableCylinder,
};

// **衝突ルールをオブジェクトのペアとして管理**
export const collisionRules = new Map<
    string, // "box-sphere" のような文字列のキー
    ObjectType
>([
    ["box-sphere", "cylinder"],
    ["sphere-box", "cylinder"], // 入れ替えも考慮
    ["cylinder-box", "sphere"],
    ["box-cylinder", "sphere"],
    ["sphere-sphere", "box"],
    ["sphere-sphere", "box"],
    ["pyramid-sphere", "explosion"],
    ["sphere-pyramid", "explosion"],
]);

// **衝突結果を取得**
export const getCollisionResult = (
    typeA: ObjectType,
    typeB: ObjectType
): ObjectType | null => {
    // **キーを統一するためにソート**
    const key = [typeA, typeB].sort().join("-"); // "box-sphere"

    return collisionRules.get(key) || null;
};

// **ObjectType からコンポーネントを取得**
export const getComponentFromType = (type: ObjectType): React.FC<DraggableProps> => {
    return componentMapping[type];
};

// // **2つのコンポーネントを受け取り、衝突時に生成されるオブジェクト取得**
// export const getCollisionResult = (
//     CompA: React.FC<DraggableProps>,
//     CompB: React.FC<DraggableProps>
// ): React.FC<DraggableProps> | null => {
//     for (const [key, result] of collisionRules.entries()) {
//         if (key.has(CompA) && key.has(CompB)) {
//             return result;
//         }
//     }
//     return null;
// };
