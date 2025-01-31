import { useRef } from "react"
import { Cylinder, Torus, Sphere, Line, Cone, Ring, Box, Icosahedron } from "@react-three/drei"
import type { GroupProps } from "@react-three/fiber"
import type { Group } from "three"
import React from "react"

interface ScienceItemProps extends GroupProps {
  color?: string
  type: "structure" | "magnet" | "flask" | "tube" | "bulb"
}

export function ScienceItem({ color = "white", type, ...props }: ScienceItemProps) {
  const groupRef = useRef<Group>(null)

  // 分子構造体 - 水分子H2Oをモチーフにした構造
  const Structure = () => (
    <group>
      {/* 酸素原子（中心） */}
      <Sphere args={[0.5, 64, 64]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#ff3333"
          metalness={0.3}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
        />
      </Sphere>
      {/* 水素原子（2つ） */}
      {[
        [-0.7, 0.4, 0],
        [0.7, 0.4, 0],
      ].map((pos, i) => (
        <group key={i}>
          <Sphere args={[0.25, 32, 32]} position={pos as [number, number, number]}>
            <meshPhysicalMaterial
              color="#8888ff"
              metalness={0.3}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </Sphere>
          {/* 共有結合を表す電子雲 */}
          <Icosahedron args={[0.15]} position={[pos[0] * 0.6, pos[1] * 0.6, pos[2]]}>
            <meshPhysicalMaterial
              color="#44aaff"
              transparent
              opacity={0.3}
              transmission={0.6}
              thickness={0.5}
              roughness={0}
            />
          </Icosahedron>
          {/* 結合線 */}
          <Line points={[[0, 0, 0], pos as [number, number, number]]} color="#ffffff" lineWidth={3} segments dashed={false} />
        </group>
      ))}
      {/* 電子軌道を表現 */}
      <group rotation={[0, Math.PI / 4, 0]}>
        <Torus args={[0.8, 0.02, 16, 100]}>
          <meshStandardMaterial color="#4444ff" transparent opacity={0.3} />
        </Torus>
      </group>
    </group>
  )

  // U字磁石 - より物理的な表現
  const Magnet = () => (
    <group>
      {/* 磁石本体 */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        {/* メインボディ */}
        <Torus args={[1, 0.25, 32, 32]} rotation={[0, 0, Math.PI]}>
          <meshStandardMaterial color="#505050" metalness={0.9} roughness={0.2} envMapIntensity={1} />
        </Torus>
        {/* 磁極の詳細表現 */}
        {[1, -1].map((x, i) => (
          <group key={i} position={[x, 0, -0.5]}>
            {/* 極の本体 */}
            <Cylinder args={[0.35, 0.35, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color={i === 0 ? "#ff2222" : "#2222ff"} metalness={0.8} roughness={0.2} />
            </Cylinder>
            {/* 極の縁取り */}
            <Ring args={[0.25, 0.35, 32]} position={[0, 0, 0.6]}>
              <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.1} />
            </Ring>
            {/* 磁力線を表現（半透明の円環） */}
            {Array.from({ length: 3 }).map((_, j) => (
              <Ring
                key={j}
                args={[0.4 + j * 0.2, 0.41 + j * 0.2, 32]}
                position={[0, 0, 0.7]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <meshStandardMaterial color={i === 0 ? "#ff6666" : "#6666ff"} transparent opacity={0.2 - j * 0.05} />
              </Ring>
            ))}
          </group>
        ))}
      </group>
      {/* 台座（より詳細な表現） */}
      <group position={[0, -1.2, 0]}>
        <Box args={[3, 0.2, 1]}>
          <meshStandardMaterial color="#404040" metalness={0.7} roughness={0.3} />
        </Box>
        {/* 台座の装飾的な溝 */}
        <Box args={[2.8, 0.22, 0.9]} position={[0, 0.01, 0]}>
          <meshStandardMaterial color="#303030" metalness={0.8} roughness={0.2} />
        </Box>
      </group>
    </group>
  )

  // 三角フラスコ - より精密なガラス表現と内容物
  const Flask = () => (
    <group>
      {/* フラスコの本体 */}
      <Cone args={[1.2, 2.4, 32, 1, true]} position={[0, -0.5, 0]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          thickness={0.2}
          roughness={0.1}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.3}
        />
      </Cone>
      {/* 内容物（液体） */}
      <Cone args={[1.15, 1.2, 32, 1, true]} position={[0, -1.1, 0]}>
        <meshPhysicalMaterial
          color={color}
          transmission={0.6}
          thickness={0.5}
          roughness={0}
          ior={1.4}
          transparent
          opacity={0.8}
        />
      </Cone>
      {/* 首の部分（より詳細） */}
      <group position={[0, 0.7, 0]}>
        <Cylinder args={[0.2, 0.25, 1.2, 32]}>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.9}
            thickness={0.2}
            roughness={0.1}
            ior={1.5}
            transparent
            opacity={0.3}
          />
        </Cylinder>
        {/* 首の縁（二重リング） */}
        <group position={[0, 0.6, 0]}>
          <Ring args={[0.19, 0.25, 32]}>
            <meshStandardMaterial color="#dddddd" metalness={0.5} roughness={0.2} />
          </Ring>
          <Ring args={[0.18, 0.22, 32]} position={[0, 0.05, 0]}>
            <meshStandardMaterial color="#bbbbbb" metalness={0.6} roughness={0.2} />
          </Ring>
        </group>
      </group>
      {/* 液面の反射効果 */}
      <pointLight position={[0, -1.1, 0]} intensity={0.2} color={color} distance={1.5} />
    </group>
  )

  // 試験管 - より精密なガラス表現と内容物の動的表現
  const Tube = () => (
    <group rotation={[Math.PI / 12, 0, 0]}>
      {/* 試験管本体 */}
      <Cylinder args={[0.3, 0.3, 2.5, 32, 1, true]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          thickness={0.1}
          roughness={0.1}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.3}
        />
      </Cylinder>
      {/* 試験管の底（二重構造） */}
      <group position={[0, -1.25, 0]}>
        <Cylinder args={[0.3, 0.3, 0.1, 32]}>
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} thickness={0.3} roughness={0.1} ior={1.5} />
        </Cylinder>
        <Cylinder args={[0.28, 0.28, 0.12, 32]} position={[0, 0.01, 0]}>
          <meshStandardMaterial color="#dddddd" metalness={0.5} roughness={0.2} />
        </Cylinder>
      </group>
      {/* 試験管の縁（二重リング） */}
      <group position={[0, 1.25, 0]}>
        <Ring args={[0.25, 0.3, 32]}>
          <meshStandardMaterial color="#dddddd" metalness={0.5} roughness={0.2} />
        </Ring>
        <Ring args={[0.24, 0.28, 32]} position={[0, 0.02, 0]}>
          <meshStandardMaterial color="#bbbbbb" metalness={0.6} roughness={0.2} />
        </Ring>
      </group>
      {/* 内容物（液体と気泡効果） */}
      <group position={[0, -0.75, 0]}>
        <Cylinder args={[0.28, 0.28, 1]}>
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.8}
            transmission={0.3}
            thickness={0.5}
            roughness={0}
            ior={1.4}
          />
        </Cylinder>
        {/* 気泡効果 */}
        {Array.from({ length: 5 }).map((_, i) => (
          <Sphere
            key={i}
            args={[0.03]}
            position={[
              Math.sin((i * Math.PI * 2) / 5) * 0.15,
              Math.random() * 0.5 - 0.25,
              Math.cos((i * Math.PI * 2) / 5) * 0.15,
            ]}
          >
            <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
          </Sphere>
        ))}
      </group>
      {/* 液面の光沢効果 */}
      <pointLight position={[0, -0.25, 0]} intensity={0.2} color={color} distance={1} />
    </group>
  )

  // 電球 - より詳細な構造と発光効果
  const Bulb = () => (
    <group>
      {/* 電球本体（二重構造） */}
      <Sphere args={[0.8, 64, 64]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          thickness={0.02}
          roughness={0}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.5}
          transparent
          opacity={0.3}
        />
      </Sphere>
      <Sphere args={[0.79, 64, 64]}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.95}
          thickness={0.01}
          roughness={0}
          clearcoat={1}
          ior={1.5}
          transparent
          opacity={0.2}
        />
      </Sphere>
      {/* フィラメント（より複雑な構造） */}
      <group position={[0, 0, 0]} scale={0.5}>
        {/* メインフィラメント */}
        <Line
          points={[
            [-0.5, 0, 0],
            [-0.3, 0.2, 0],
            [0, -0.2, 0],
            [0.3, 0.2, 0],
            [0.5, 0, 0],
          ]}
          color={color}
          lineWidth={3}
        />
        {/* サポートワイヤー */}
        {[-0.4, 0, 0.4].map((x, i) => (
          <Line
            key={i}
            points={[
              [x, -0.3, 0],
              [x, -0.8, 0],
            ]}
            color="#888888"
            lineWidth={2}
          />
        ))}
      </group>
      {/* 口金部分（より詳細） */}
      <group position={[0, -0.8, 0]}>
        {/* メインの口金 */}
        <Cylinder args={[0.3, 0.4, 0.2, 32]}>
          <meshStandardMaterial
            color="#d4af37" // 真鍮色
            metalness={0.9}
            roughness={0.3}
          />
        </Cylinder>
        {/* ネジ山の表現 */}
        <group position={[0, -0.3, 0]}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Cylinder key={i} args={[0.25, 0.25, 0.08, 32]} position={[0, i * 0.1, 0]}>
              <meshStandardMaterial color="#b4941f" metalness={0.9} roughness={0.4} />
            </Cylinder>
          ))}
        </group>
        {/* 接点 */}
        <Cylinder args={[0.15, 0.15, 0.1, 32]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="#cccccc" metalness={1} roughness={0.2} />
        </Cylinder>
      </group>
      {/* 発光効果 */}
      <pointLight position={[0, 0, 0]} intensity={1} color={color} distance={3} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" distance={1.5} />
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

