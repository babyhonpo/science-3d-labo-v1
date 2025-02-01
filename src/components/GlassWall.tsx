import React from "react";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const GlassWall = ({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) => {
  const glassRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh ref={glassRef} position={position} rotation={rotation}>
      {/* ガラスの面 */}
      <planeGeometry args={[10, 10]} />
      <meshPhysicalMaterial
        transparent
        opacity={0.3} // 透明度を設定（0.0 ~ 1.0）
        transmission={1.0} // 屈折率（0.0 ~ 1.0, 1.0でリアルなガラス感）
        reflectivity={0.5} // 反射率（0.0 ~ 1.0）
        roughness={0.05} // 表面の粗さ（0に近いと滑らか）
        ior={1.5} // 屈折率（ガラスは 1.5 ~ 1.7）
        color="white" // ガラスの色（薄く白にするとガラス感UP）
        side={THREE.DoubleSide} // 両面レンダリング
      />
    </mesh>
  );
};

export default GlassWall;
