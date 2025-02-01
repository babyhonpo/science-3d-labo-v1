import React from "react";
// import * as THREE from "three";
import DraggableBase from "./DraggableBase";
import { DraggableProps } from "../types/types";

// 水のマテリアルのプロパティ
const waterMaterialProps = {
    color: "#1E90FF",
    roughness: 0.1, //表面の粗さ
    metalness: 0.1, //金属度
    transmission: 0.1, // 透過度
    clearcoat: 0.6, // 表面の反射
    clearcoatRoughness: 0.3, //反射層の粗さ
};

// type Props = {
//     refData: DraggableObject;
//     position: [number, number, number];
//     onDragStateChange: (isDragging: boolean) => void;
//     onCollide: () => void;
//     objectsRef: Map<number, DraggableObject>;
// };

export const DraggableSphere: React.FC<DraggableProps> = (props) => {
    return (
        <DraggableBase {...props}>
            <mesh ref={props.refData.mesh}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshPhysicalMaterial {...waterMaterialProps} />
            </mesh>
        </DraggableBase>
    );
};

export default DraggableSphere;