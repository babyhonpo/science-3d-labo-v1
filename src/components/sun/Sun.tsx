"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import React from "react"

export type SunProps = {
  position?: [number, number, number]
  size?: number
  intensity?: number
  color?: string
  rotationSpeed?: number
}

/**
 * 3D太陽コンポーネント - より赤く、強い発光効果を持つバージョン
 *
 * @example
 * \`\`\`tsx
 * <Canvas>
 *   <Sun position={[0, 0, 0]} size={1.5} intensity={2.2} color="#ff5500" rotationSpeed={0.2} />
 *   <OrbitControls />
 * </Canvas>
 * \`\`\`
 */
export default function Sun({
  position = [0, 0, 0],
  size = 1,
  intensity = 2.2, // 発光強度を上げた
  color = "#ff5500", // より赤みの強い色に変更
  rotationSpeed = 0.2,
}: SunProps) {
  const sunRef = useRef<THREE.Mesh>(null)
  const coronaRef = useRef<THREE.Mesh>(null)
  const sunLightRef = useRef<THREE.PointLight>(null)
  const outerGlowRef = useRef<THREE.Mesh>(null)

  // 太陽のテクスチャを生成
  const sunTexture = useMemo(() => generateSunTexture(512), [])
  const normalMap = useMemo(() => generateSunNormalMap(512), [])

  // 太陽の表面シェーダーマテリアル
  const sunMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: sunTexture,
      normalMap: normalMap,
      emissive: new THREE.Color(color),
      emissiveMap: sunTexture,
      emissiveIntensity: intensity * 1.2, // 発光強度を上げた
      roughness: 0.6, // 表面の粗さを少し下げて、より光沢のある見た目に
      metalness: 0.1, // 金属感を少し上げて、より反射するように
    })
  }, [sunTexture, normalMap, color, intensity])

  // コロナ（太陽の外側の発光部分）のマテリアル
  const coronaMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        intensity: { value: intensity },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float intensity;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        float noise(vec3 p) {
          return fract(sin(dot(p, vec3(12.9898, 78.233, 45.5432))) * 43758.5453);
        }
        
        void main() {
          // 中心からの距離を計算
          float dist = length(vPosition);
          
          // 時間に基づく揺らぎ
          float noiseVal = noise(vPosition * 2.5 + vec3(0.0, 0.0, time * 0.2));
          
          // 外側に行くほど透明に（ただし透明度の減衰を緩やかに）
          float alpha = smoothstep(1.0, 1.8, 1.0 / dist) * intensity * 1.3;
          
          // 揺らぎを追加
          alpha *= 0.8 + noiseVal * 0.5;
          
          // 色を計算（外側ほど赤っぽく）
          vec3 finalColor = mix(color, vec3(1.0, 0.2, 0.0), smoothstep(0.7, 1.5, dist));
          
          // 発光効果を強化
          finalColor *= 1.2 + sin(time * 0.5 + dist * 5.0) * 0.1;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [color, intensity])

  // 外側の発光エフェクト用マテリアル
  const outerGlowMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        intensity: { value: intensity },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float intensity;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // 中心からの距離を計算
          float dist = length(vPosition);
          
          // 外側に行くほど透明に
          float alpha = smoothstep(1.0, 2.5, 1.0 / dist) * intensity * 0.4;
          
          // 時間による脈動効果
          alpha *= 0.7 + sin(time * 0.3) * 0.1;
          
          // 赤みの強い発光色
          vec3 glowColor = mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 0.1, 0.0), smoothstep(0.0, 1.0, dist));
          
          gl_FragColor = vec4(glowColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [color, intensity])

  // アニメーション
  useFrame((state) => {
    if (sunRef.current) {
      // 太陽の自転
      sunRef.current.rotation.y += rotationSpeed * 0.01
    }

    if (coronaRef.current && coronaMaterial.uniforms) {
      // コロナの時間更新
      coronaMaterial.uniforms.time.value = state.clock.elapsedTime

      // コロナをゆっくり回転
      coronaRef.current.rotation.y -= rotationSpeed * 0.005
      coronaRef.current.rotation.z += rotationSpeed * 0.003
    }

    if (outerGlowRef.current && outerGlowMaterial.uniforms) {
      // 外側発光の時間更新
      outerGlowMaterial.uniforms.time.value = state.clock.elapsedTime

      // 外側発光をゆっくり回転（コロナとは逆方向に）
      outerGlowRef.current.rotation.y += rotationSpeed * 0.003
      outerGlowRef.current.rotation.z -= rotationSpeed * 0.002
    }

    if (sunLightRef.current) {
      // 光の強度をより大きく変動させる
      const flickerAmount = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 0.95
      sunLightRef.current.intensity = intensity * 3 * flickerAmount // 光の強度を上げた
    }
  })

  return (
    <group position={position}>
      {/* 太陽本体 */}
      <mesh ref={sunRef} scale={[size, size, size]}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={sunMaterial} attach="material" />
      </mesh>

      {/* コロナ（太陽の外側の発光部分） */}
      <mesh ref={coronaRef} scale={[size * 1.5, size * 1.5, size * 1.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={coronaMaterial} attach="material" />
      </mesh>

      {/* 外側の発光エフェクト（より広範囲） */}
      <mesh ref={outerGlowRef} scale={[size * 2.5, size * 2.5, size * 2.5]}>
        <sphereGeometry args={[1, 24, 24]} />
        <primitive object={outerGlowMaterial} attach="material" />
      </mesh>

      {/* 太陽光 */}
      <pointLight ref={sunLightRef} color={color} intensity={intensity * 3} distance={150} decay={1.8} />

      {/* 追加の環境光 - 全体的な発光感を強化 */}
      <ambientLight color={color} intensity={intensity * 0.2} />

      {/* 太陽フレア（ランダムな位置に配置） - より大きく、より明るく */}
      {Array.from({ length: 7 }).map((_, i) => {
        // フレアの数を増やした
        const angle = Math.random() * Math.PI * 2
        const radius = size * 1.05
        const flareSize = size * (0.25 + Math.random() * 0.4) // フレアサイズを大きく
        const x = Math.cos(angle) * radius
        const y = (Math.random() - 0.5) * size * 0.6
        const z = Math.sin(angle) * radius

        return (
          <mesh key={i} position={[x, y, z]} scale={[flareSize, flareSize, flareSize]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial
              color={color}
              transparent={true}
              opacity={0.8} // 不透明度を上げた
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )
      })}
    </group>
  )
}

/**
 * 太陽のテクスチャを生成する関数 - より赤みを強調
 * @param size テクスチャのサイズ（ピクセル）
 * @returns 生成されたテクスチャ
 */
function generateSunTexture(size: number): THREE.Texture {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext("2d")

  if (!context) {
    throw new Error("Canvas 2D context could not be created")
  }

  // グラデーション背景 - より赤みの強いグラデーションに変更
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, "#fff0c0") // 中心は明るい黄色
  gradient.addColorStop(0.4, "#ffaa50") // 中間はオレンジ
  gradient.addColorStop(0.7, "#ff6a30") // 赤みの強いオレンジ
  gradient.addColorStop(1, "#e62200") // 外側は濃い赤

  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  // ノイズパターンを追加
  addNoisePattern(context, size, 0.15)

  // 太陽の表面の細かい模様を追加
  addSunSurfaceDetails(context, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  return texture
}

/**
 * 太陽の法線マップを生成する関数
 * @param size テクスチャのサイズ（ピクセル）
 * @returns 生成された法線マップ
 */
function generateSunNormalMap(size: number): THREE.Texture {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext("2d")

  if (!context) {
    throw new Error("Canvas 2D context could not be created")
  }

  // 基本的な灰色の背景（法線マップの中立色）
  context.fillStyle = "#8080ff" // 法線マップの中立色（RGB: 128, 128, 255）
  context.fillRect(0, 0, size, size)

  // 太陽表面の凹凸を表現 - より強いコントラストに
  for (let i = 0; i < 120; i++) {
    // 凹凸の数を増やした
    const x = Math.random() * size
    const y = Math.random() * size
    const radius = 10 + Math.random() * 50 // より大きな凹凸も含める

    const gradient = context.createRadialGradient(x, y, 0, x, y, radius)

    // ランダムな法線の方向を生成 - より強いコントラスト
    const r = Math.floor(Math.random() * 60 + 90) // より広い範囲の値
    const g = Math.floor(Math.random() * 60 + 90)
    const b = 255 // 青は常に最大（上向き）

    gradient.addColorStop(0, `rgb(${r}, ${g}, ${b})`)
    gradient.addColorStop(1, "#8080ff") // 外側は中立色に戻る

    context.fillStyle = gradient
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  return texture
}

/**
 * キャンバスにノイズパターンを追加する関数
 * @param context キャンバスコンテキスト
 * @param size キャンバスサイズ
 * @param intensity ノイズの強度（0-1）
 */
function addNoisePattern(context: CanvasRenderingContext2D, size: number, intensity = 0.1) {
  const imageData = context.getImageData(0, 0, size, size)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * intensity * 255

    data[i] = Math.min(255, Math.max(0, data[i] + noise)) // R
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise)) // G
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise)) // B
  }

  context.putImageData(imageData, 0, 0)
}

/**
 * 太陽表面の細かい模様を追加する関数 - より赤みを強調
 * @param context キャンバスコンテキスト
 * @param size キャンバスサイズ
 */
function addSunSurfaceDetails(context: CanvasRenderingContext2D, size: number) {
  // 太陽の黒点
  for (let i = 0; i < 12; i++) {
    // 黒点の数を増やした
    const x = Math.random() * size
    const y = Math.random() * size
    const radius = 5 + Math.random() * 20 // より大きな黒点も含める

    const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.8)") // より濃い黒点
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

    context.fillStyle = gradient
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  // 太陽の明るい部分（フレア）- より赤みを強調
  for (let i = 0; i < 25; i++) {
    // フレアの数を増やした
    const x = Math.random() * size
    const y = Math.random() * size
    const radius = 5 + Math.random() * 25 // より大きなフレアも含める

    const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
    // より赤みの強いフレア
    gradient.addColorStop(0, "rgba(255, 200, 150, 0.6)")
    gradient.addColorStop(1, "rgba(255, 100, 50, 0)")

    context.fillStyle = gradient
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }

  // 赤みの強い領域を追加
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const radius = 10 + Math.random() * 30

    const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, "rgba(255, 50, 0, 0.4)")
    gradient.addColorStop(1, "rgba(255, 50, 0, 0)")

    context.fillStyle = gradient
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }
}
