import { useRef } from "react"
import { Sphere, Line } from "@react-three/drei"
import * as THREE from "three"
import type { GroupProps } from "@react-three/fiber"
import React from "react"

interface MoleculeProps extends GroupProps {
  color?: string
}

export function Molecule({ color = "white", ...props }: MoleculeProps) {
  const groupRef = useRef<THREE.Group>(null);

  // より複雑な分子構造の座標
  const points = [
    new THREE.Vector3(-0.5, 0, 0),
    new THREE.Vector3(0.5, 0, 0),
    new THREE.Vector3(0, 0.866, 0),
    new THREE.Vector3(0, 0, 0.866),
  ]

  return (
    <group ref={groupRef} {...props}>
      {/* 原子を表す球体 */}
      {points.map((point, i) => (
        <group key={i} position={[point.x, point.y, point.z]}>
          <Sphere args={[0.3, 32, 32]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </group>
      ))}

      {/* 結合を表す線 */}
      {points.map((point, i) =>
        points.slice(i + 1).map((endPoint, j) => (
          <Line
            key={`${i}-${j}`}
            points={[
              [point.x, point.y, point.z],
              [endPoint.x, endPoint.y, endPoint.z],
            ]}
            color={color}
            lineWidth={3}
          />
        )),
      )}
    </group>
  )
}

