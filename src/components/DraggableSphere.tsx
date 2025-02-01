import React from "react";
import { Text } from "@react-three/drei";
import DraggableBase from "./DraggableBase";
import { DraggableProps } from "../types/types";
import { useObjInfo } from "../hooks/useObjInfo";

export const DraggableSphere: React.FC<DraggableProps> = (props) => {
  const { setObjInfo } = useObjInfo();

  // symbol が存在しない場合は何もレンダリングしない
  if (!props.objInfo?.symbol) {
    return null;
  }

  const waterMaterialProps = {
    color: props.objInfo.color,
    roughness: 0.1, // 表面の粗さ
    metalness: 0.1, // 金属度
    transmission: 0.1, // 透過度
    clearcoat: 0.6, // 表面の反射
    clearcoatRoughness: 0.3, // 反射層の粗さ
  };

  return (
    <DraggableBase {...props}>
      <mesh ref={props.refData.mesh}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial {...waterMaterialProps} />
      </mesh>

      {/* 文字を表示 */}
      <Text
        position={[0, 0, 0.55]} // 球の表面に配置
        fontSize={0.2} // 文字のサイズ
        color="black" // 文字の色
        anchorX="center"
        anchorY="middle"
      >
        {props.objInfo.symbol}
      </Text>
    </DraggableBase>
  );
};

export default DraggableSphere;
