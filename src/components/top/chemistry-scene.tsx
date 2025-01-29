"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll, Environment, Stars } from "@react-three/drei"
import { ScienceItem } from "./science-items"
import * as THREE from "three"
import React from "react"

function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const scroll = useScroll()
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const lastScrollOffset = useRef(0)

  // 色の設定（5色）- より明るい色調に調整
  const colors = useMemo(
    () => [
      "#ff3366", // ピンク
      "#66ff99", // より明るいライムグリーン
      "#66aaff", // より明るいブルー
      "#ffaa44", // より明るいオレンジ
      "#bb66ff", // より明るいパープル
    ],
    [],
  )

  // 初期位置の設定（画面いっぱいに配置）
  const items = useMemo(
    () => [
      { type: "structure", position: [-10, 6, 0] }, // 左上
      { type: "magnet", position: [10, 6, 0] }, // 右上
      { type: "flask", position: [0, 0, 0] }, // 中央
      { type: "tube", position: [-10, -6, 0] }, // 左下
      { type: "bulb", position: [10, -6, 0] }, // 右下
    ],
    [],
  )

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // スクロール速度を計算
    const currentOffset = scroll.offset
    const velocity = (currentOffset - lastScrollOffset.current) / delta
    lastScrollOffset.current = currentOffset

    // スクロール速度を滑らかに更新
    const smoothedVelocity = THREE.MathUtils.lerp(scrollVelocity, Math.abs(velocity) * 2, 0.1)
    setScrollVelocity(smoothedVelocity)

    // 基本の回転速度（スクロールしていない時）
    const baseRotationSpeed = 0.1

    // スクロール速度に基づいて加速
    const acceleratedSpeed = baseRotationSpeed + smoothedVelocity

    // グループ全体の回転
    groupRef.current.rotation.y += acceleratedSpeed * delta

    // 各分子の個別のアニメーション
    groupRef.current.children.forEach((child, i) => {
      // スクロール速度に応じた回転
      child.rotation.x += acceleratedSpeed * delta * (i + 1) * 0.2
      child.rotation.z += acceleratedSpeed * delta * (i + 1) * 0.15

      // スクロール速度に応じた位置の変化
      const time = state.clock.getElapsedTime()
      const posIndex = i % items.length
      const basePos = items[posIndex].position

      // スクロール速度に応じて振幅を変更
      const amplitude = 0.5 + smoothedVelocity * 0.2

      child.position.x = basePos[0] + Math.sin(time + i) * amplitude
      child.position.y = basePos[1] + Math.cos(time + i) * amplitude
      child.position.z = basePos[2] + Math.sin(time * 0.5 + i) * amplitude
    })
  })

  return (
    <>
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />
      <group ref={groupRef}>
        {items.map((item, i) => (
          <ScienceItem
            key={i}
            type={item.type as "structure" | "magnet" | "flask" | "tube" | "bulb"}
            position={item.position}
            rotation-y={(i * Math.PI) / 2.5}
            color={colors[i]}
            scale={2}
          />
        ))}
      </group>
    </>
  )
}

export default function ChemistryScene() {
  return (
    <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
      <color attach="background" args={["#000"]} />
      <fog attach="fog" args={["#000", 15, 50]} /> {/* フォグの開始距離を調整 */}
      <ScrollControls pages={3} distance={1} damping={0.3}>
        <Scene />
      </ScrollControls>
      <Environment preset="warehouse" /> {/* より明るい環境マップに変更 */}
      <ambientLight intensity={1.5} /> {/* 環境光を強く */}
      <pointLight position={[10, 10, 10]} intensity={2} color="#fff" /> {/* ライトを強く */}
      <pointLight position={[-10, -10, -10]} intensity={2} color="#fff" /> {/* ライトを強く */}
      <pointLight position={[0, 0, 10]} intensity={1.5} color="#fff" /> {/* 正面からのライトを追加 */}
    </Canvas>
  )
}

