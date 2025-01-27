import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function BoxComponent() {
  const boxRef = useRef<any>();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (boxRef.current) {
    //   boxRef.current.rotation.x += 0.05;
    //   boxRef.current.rotation.y += 0.05;
    }
  });

  return (
    <mesh
      ref={boxRef}
      position={[0, 50, 0]}
      castShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusGeometry args={[10, 5, 4, 50]} /> {/* [半径, チューブ径, 円周分割数, チューブ分割数] */}
      <meshStandardMaterial color={hovered ? "red" : "blue"} wireframe />
    </mesh>
  );
}
