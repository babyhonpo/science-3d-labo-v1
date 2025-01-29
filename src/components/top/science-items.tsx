import { useRef } from "react"
import { Cylinder, Torus, Sphere, Line, Cone, Ring, Box } from "@react-three/drei"
import * as THREE from "three"
import type { GroupProps } from "@react-three/fiber"
import React from "react"
import { Group } from 'three';

interface ScienceItemProps extends GroupProps {
  color?: string
  type: "structure" | "magnet" | "flask" | "tube" | "bulb"
}

export function ScienceItem({ color = "white", type, ...props }: ScienceItemProps) {
        const groupRef = useRef<Group>(null);

  // 構造体 - より複雑な分子構造
  const Structure = () => (
    <group>
      {/* 中心の大きな分子 */}
      <Sphere args={[0.4, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      </Sphere>
      {/* 周囲の小さな分子 */}
      {[
        {x:-0.8,y: 0.8, z:0},
        {x:0,y: -0.8, z:0.8},
        {x:0,y: -0.8, z:-0.8},
      ].map((pos: { x: number; y: number; z: number }, i) => (
        <group key={i}>
          <Sphere args={[0.25, 24, 24]} position={new THREE.Vector3(pos.x, pos.y, pos.z)}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
          <Line points={[pos.x, pos.y, pos.z]} color={color} lineWidth={3} />
        </group>
      ))}
    </group>
  )

  // U字磁石 - より詳細な形状
  const Magnet = () => (
    <group>
      {/* 磁石本体 */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <Torus args={[1, 0.2, 32, 32]} rotation={[0, 0, Math.PI]}>
          <meshStandardMaterial color="#707070" metalness={0.9} roughness={0.3} />
        </Torus>
        {/* 磁極の詳細な表現 */}
        {[1, -1].map((x, i) => (
          <group key={i} position={[x, 0, -0.5]}>
            <Cylinder args={[0.3, 0.3, 1]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color={i === 0 ? "#ff4444" : "#4444ff"} metalness={0.7} roughness={0.3} />
            </Cylinder>
            {/* 極の縁取り */}
            <Ring args={[0.2, 0.3, 32]} position={[0, 0, 0.5]}>
              <meshStandardMaterial color="#505050" metalness={0.9} roughness={0.2} />
            </Ring>
          </group>
        ))}
      </group>
      {/* 台座 */}
      <Box args={[3, 0.2, 1]} position={[0, -1.2, 0]}>
        <meshStandardMaterial color="#505050" metalness={0.7} roughness={0.3} />
      </Box>
    </group>
  )

  // 三角フラスコ - より精密なガラス表現
  const Flask = () => (
    <group>
      {/* フラスコの本体 */}
      <Cone args={[1.2, 2.4, 3, 1, true]} position={[0, -0.5, 0]}>
        <meshPhysicalMaterial
          color={color}
          transmission={0.9}
          thickness={0.2}
          roughness={0.1}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Cone>
      {/* 首の部分 */}
      <group position={[0, 0.7, 0]}>
        <Cylinder args={[0.2, 0.25, 1.2, 32]}>
          <meshPhysicalMaterial color={color} transmission={0.9} thickness={0.2} roughness={0.1} ior={1.5} />
        </Cylinder>
        {/* 首の縁 */}
        <Ring args={[0.2, 0.25, 32]} position={[0, 0.6, 0]}>
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
        </Ring>
      </group>
    </group>
  )

  // 試験管 - より精密なガラス表現
  const Tube = () => (
    <group rotation={[Math.PI / 12, 0, 0]}>
      {/* 試験管本体 */}
      <Cylinder args={[0.3, 0.3, 2.5, 32, 1, true]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color={color}
          transmission={0.9}
          thickness={0.1}
          roughness={0.1}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Cylinder>
      {/* 試験管の底 */}
      <Cylinder args={[0.3, 0.3, 0.1, 32]} position={[0, -1.25, 0]}>
        <meshPhysicalMaterial color={color} transmission={0.9} thickness={0.3} roughness={0.1} ior={1.5} />
      </Cylinder>
      {/* 試験管の縁 */}
      <Ring args={[0.25, 0.3, 32]} position={[0, 1.25, 0]}>
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </Ring>
      {/* 内容物の表現 */}
      <Cylinder args={[0.28, 0.28, 1]} position={[0, -0.75, 0]}>
        <meshStandardMaterial
          color={`#${color}`}
          transparent
          opacity={0.7}
          emissive={`#${color}`}
          emissiveIntensity={0.2}
        />
      </Cylinder>
    </group>
  )

  // 電球 - より詳細な構造
  const Bulb = () => (
    <group>
      {/* 電球本体 */}
      <Sphere args={[0.8, 32, 32]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          thickness={0.02}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.5}
        />
      </Sphere>
      {/* フィラメント */}
      <group position={[0, 0, 0]} scale={0.5}>
        <Line
          points={[
            [-0.5, 0, 0],
            [-0.3, 0.2, 0],
            [0.3, -0.2, 0],
            [0.5, 0, 0],
          ]}
          color={color}
          lineWidth={3}
        />
      </group>
      {/* 口金部分 */}
      <group position={[0, -0.8, 0]}>
        <Cylinder args={[0.3, 0.4, 0.2, 32]}>
          <meshStandardMaterial color="#b0b0b0" metalness={0.9} roughness={0.2} />
        </Cylinder>
        <Cylinder args={[0.25, 0.25, 0.4, 32]} position={[0, -0.3, 0]}>
          <meshStandardMaterial color="#808080" metalness={0.9} roughness={0.3} />
        </Cylinder>
      </group>
      {/* 内部の光源 */}
      <pointLight position={[0, 0, 0]} intensity={0.5} color={color} distance={3} />
    </group>
  )

  const ItemComponent = {
    structure: Structure,
    magnet: Magnet,
    flask: Flask,
    tube: Tube,
    bulb: Bulb,
  }[type]

  return (
    <group ref={groupRef} {...props}>
      <ItemComponent />
    </group>
  )
}

