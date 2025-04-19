"use client"

import { useRef, useMemo, useEffect } from "react"
import { extend, useFrame, useThree } from "@react-three/fiber"
import { PerspectiveCamera, shaderMaterial } from "@react-three/drei"
import * as THREE from "three"
import React from "react"
import { useDraggable } from "../hooks/useDraggable"

// シェーダーマテリアルの型定義
type FireMaterialImpl = {
  new (): JSX.IntrinsicElements['shaderMaterial'] & { uniforms: { uTime: { value: number } } }
}

type CoreFireMaterialImpl = {
  new (): JSX.IntrinsicElements['shaderMaterial'] & { uniforms: { uTime: { value: number } } }
}

// 炎のシェーダーマテリアル
const FireMaterial = shaderMaterial(
    {
        uTime: 0,
    },
    // 頂点シェーダー
    `
  uniform float uTime;
  attribute float size;
  varying vec3 vPosition;
  varying float vSize;
  
  void main() {
    vPosition = position;
    vSize = size;
    
    // 上に行くほど上昇速度を上げる
    float yOffset = position.y > 0.0 ? position.y * 0.2 : 0.0;
    vec3 pos = position;
    
    // 炎の形状を作る
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (50.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
    // フラグメントシェーダー
    `
  uniform float uTime;
  varying vec3 vPosition;
  varying float vSize;
  
  // ノイズ関数
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  // 改良版ノイズ関数
  float improvedNoise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
      mix(noise(ip), noise(ip+vec2(1.0,0.0)), u.x),
      mix(noise(ip+vec2(0.0,1.0)), noise(ip+vec2(1.0,1.0)), u.x),
      u.y);
    return res*res;
  }
  
  // 炎の色を計算する関数
  vec3 fireColor(float y) {
    // 炎の色のグラデーション - より明るい黄色を中心に
    vec3 brightYellow = vec3(1.0, 1.0, 0.7);
    vec3 yellow = vec3(1.0, 0.9, 0.0);
    vec3 orange = vec3(1.0, 0.5, 0.0);
    vec3 red = vec3(1.0, 0.0, 0.0);
    vec3 darkRed = vec3(0.5, 0.0, 0.0);
    vec3 black = vec3(0.0, 0.0, 0.0);
    
    // 高さに応じて色を変える
    float t = clamp((y + 1.0) / 2.0, 0.0, 1.0);
    
    vec3 color;
    if (t < 0.2) {
      color = mix(black, darkRed, t / 0.2);
    } else if (t < 0.4) {
      color = mix(darkRed, red, (t - 0.2) / 0.2);
    } else if (t < 0.7) {
      color = mix(red, orange, (t - 0.4) / 0.3);
    } else if (t < 0.9) {
      color = mix(orange, yellow, (t - 0.7) / 0.2);
    } else {
      color = mix(yellow, brightYellow, (t - 0.9) / 0.1);
    }
    
    return color;
  }
  
  void main() {
    // パーティクルの形状をより炎らしく
    vec2 uv = gl_PointCoord.xy - 0.5;
    float dist = length(uv);
    
    // 時間とともに変化するノイズ（ゆっくり変化）
    float timeScale = uTime * 0.3; // 時間スケールを遅く
    float noiseVal = improvedNoise(uv * 4.0 + vec2(timeScale, vPosition.y * 1.5));
    
    // 炎のような不規則な形状
    float noiseFactor = noiseVal * 0.15; // ノイズの影響を小さく
    float edge = 0.5 + noiseFactor;
    
    // 不規則な形状のパーティクル
    if (dist > edge - 0.05) {
      float alpha = 1.0 - smoothstep(edge - 0.05, edge, dist);
      if (alpha < 0.05) discard;
    }
    
    // 炎の色を計算
    vec3 color = fireColor(vPosition.y);
    
    // 中心ほど明るく
    float intensity = 1.0 - dist * 2.0;
    intensity = pow(intensity, 1.2);
    
    // 上に行くほど透明に
    float alpha = smoothstep(1.0, -0.5, vPosition.y) * intensity;
    
    // 時間によって明るさを変化させる（より穏やかに）
    float flicker = sin(uTime * 5.0 + vPosition.y * 10.0) * 0.08 + 0.92; // フリッカーを弱く
    flicker *= 1.0 + improvedNoise(vec2(uTime * 2.5, vPosition.y * 5.0)) * 0.15; // ノイズの影響も小さく
    
    // 中心部分をより明るく
    float centerGlow = 1.0 - length(vec2(vPosition.x, vPosition.z)) * 2.0;
    centerGlow = max(0.0, centerGlow);
    centerGlow = pow(centerGlow, 2.0) * 0.5 + 0.5;
    
    gl_FragColor = vec4(color * intensity * flicker * centerGlow, alpha);
  }
  `
) as unknown as FireMaterialImpl

// 炎の芯用のシェーダーマテリアル
const CoreFireMaterial = shaderMaterial(
    {
        uTime: 0,
    },
    // 頂点シェーダー
    `
  uniform float uTime;
  attribute float size;
  varying vec3 vPosition;
  varying float vSize;
  
  void main() {
    vPosition = position;
    vSize = size;
    
    vec3 pos = position;
    
    // 炎の芯の形状を作る
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (40.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
    // フラグメントシェーダー
    `
  uniform float uTime;
  varying vec3 vPosition;
  varying float vSize;
  
  // ノイズ関数
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  // 改良版ノイズ関数
  float improvedNoise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
      mix(noise(ip), noise(ip+vec2(1.0,0.0)), u.x),
      mix(noise(ip+vec2(0.0,1.0)), noise(ip+vec2(1.0,1.0)), u.x),
      u.y);
    return res*res;
  }
  
  // 炎の芯の色を計算する関数
  vec3 coreFireColor(float y) {
    // 芯の色を調整
    vec3 brightYellow = vec3(1.0, 0.95, 0.6);
    vec3 yellow = vec3(1.0, 0.85, 0.0);
    vec3 orange = vec3(1.0, 0.5, 0.0);
    vec3 deepOrange = vec3(0.9, 0.3, 0.0);
    
    // 高さに応じて色を変える
    float t = clamp((y + 1.0) / 2.0, 0.0, 1.0);
    
    vec3 color;
    if (t < 0.3) {
      color = mix(deepOrange, orange, t / 0.3);
    } else if (t < 0.7) {
      color = mix(orange, yellow, (t - 0.3) / 0.4);
    } else {
      color = mix(yellow, brightYellow, (t - 0.7) / 0.3);
    }
    
    return color;
  }
  
  void main() {
    // パーティクルの形状
    vec2 uv = gl_PointCoord.xy - 0.5;
    float dist = length(uv);
    
    // 時間とともに変化するノイズ（ゆっくり変化）
    float timeScale = uTime * 0.4; // 時間スケールを遅く
    float noiseVal = improvedNoise(uv * 2.5 + vec2(timeScale, vPosition.y * 1.5));
    
    // 芯は比較的滑らかな形状
    float noiseFactor = noiseVal * 0.08; // ノイズの影響をさらに小さく
    float edge = 0.5 + noiseFactor;
    
    // 滑らかな形状のパーティクル
    if (dist > edge - 0.1) {
      float alpha = 1.0 - smoothstep(edge - 0.1, edge, dist);
      if (alpha < 0.05) discard;
    }
    
    // 炎の芯の色を計算
    vec3 color = coreFireColor(vPosition.y);
    
    // 中心ほど明るく
    float intensity = 1.0 - dist * 1.8;
    intensity = pow(intensity, 1.2);
    
    // 上に行くほど透明に（芯は下部ほど不透明）
    float alpha = smoothstep(1.0, -0.2, vPosition.y) * intensity;
    
    // 時間によって明るさを変化させる（より穏やかに）
    float flicker = sin(uTime * 4.0 + vPosition.y * 8.0) * 0.05 + 0.95; // フリッカーをさらに弱く
    flicker *= 1.0 + improvedNoise(vec2(uTime * 1.5, vPosition.y * 4.0)) * 0.1; // ノイズの影響も小さく
    
    // 芯の明るさを調整
    gl_FragColor = vec4(color * intensity * flicker * 1.2, alpha * 0.8);
  }
  `
) as unknown as CoreFireMaterialImpl

// カスタムコンポーネント宣言
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      fireMaterial: JSX.IntrinsicElements['shaderMaterial'];
      coreFireMaterial: JSX.IntrinsicElements['shaderMaterial'];
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

// マテリアルを拡張
extend({ FireMaterial, CoreFireMaterial })

// パーティクル情報の型定義
interface ParticleInfo {
  time: number;
  factor: number;
  speed: number;
  x: number;
  y: number;
  z: number;
  radius: number;
  angle: number;
}

// 炎の芯部分
function FireCore() {
  const coreRef = useRef<THREE.Points>(null)

  // 芯のパーティクル数
  const coreCount = 2000

  // 芯のパーティクルの初期設定
  const coreParticles = useMemo(() => {
    const temp: ParticleInfo[] = []
    for (let i = 0; i < coreCount; i++) {
      const time = Math.random() * 100
      const factor = 20 + Math.random() * 100
      // 上昇速度を遅く
      const speed = 0.01 + Math.random() / 200

      // より細い円形の分布
      const radius = Math.random() * 0.15
      const angle = Math.random() * Math.PI * 2
      const x = Math.cos(angle) * radius * (Math.random() * 0.2 + 0.8)
      const z = Math.sin(angle) * radius * (Math.random() * 0.2 + 0.8)

      // 高さをランダムに分布
      const y = Math.random() * 2 - 1

      temp.push({ time, factor, speed, x, y, z, radius, angle })
    }
    return temp
  }, [coreCount])

  // 芯のパーティクルの位置データを作成
  const [corePositions, coreSizes] = useMemo(() => {
    const positions = new Float32Array(coreCount * 3)
    const sizes = new Float32Array(coreCount)

    for (let i = 0; i < coreCount; i++) {
      const i3 = i * 3
      positions[i3] = coreParticles[i].x
      positions[i3 + 1] = coreParticles[i].y
      positions[i3 + 2] = coreParticles[i].z

      // 芯のパーティクルサイズ
      const heightFactor = 1.0 - (coreParticles[i].y + 1) / 2
      sizes[i] = (Math.random() * 0.6 + 1.0) * (heightFactor * 0.3 + 0.7) * 1.5
    }

    return [positions, sizes]
  }, [coreCount, coreParticles])

  // 芯のアニメーション
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (!coreRef.current) return

    const positions = coreRef.current.geometry.attributes.position.array as Float32Array
    const sizes = coreRef.current.geometry.attributes.size.array as Float32Array

    for (let i = 0, j = 0; i < coreCount; i++, j += 3) {
      const { speed, radius, angle } = coreParticles[i]

      // 上昇する動き（速度を遅く）
      const curTime = time * speed + coreParticles[i].time

      // Y軸方向に上昇（速度を遅く）
      positions[j + 1] += 0.01 + Math.random() * 0.005

      // 芯の揺らぎ（より小さい揺らぎ）
      const wobbleAmount = 0.005
      const wobbleX = Math.sin(curTime * 1.5) * wobbleAmount
      const wobbleZ = Math.cos(curTime * 1.5) * wobbleAmount

      // 渦巻き効果と揺らぎを組み合わせる（渦巻きを弱く）
      const spiralSpeed = 0.4
      const spiralRadius = radius * (1.0 - positions[j + 1] / 4.0)

      const newAngle = angle + curTime * spiralSpeed
      positions[j] = Math.cos(newAngle) * spiralRadius + wobbleX
      positions[j + 2] = Math.sin(newAngle) * spiralRadius + wobbleZ

      // パーティクルが上に行くほど小さくなる（ゆっくり小さくなる）
      sizes[i] = Math.max(0, sizes[i] - 0.005 * Math.random())

      // パーティクルが上に行きすぎたら再生成
      if (positions[j + 1] > 2) {
        // 下部から再生成
        positions[j + 1] = -1 + Math.random() * 0.3

        // 円形の分布を維持
        const newRadius = Math.random() * 0.15
        const newAngle = Math.random() * Math.PI * 2
        positions[j] = Math.cos(newAngle) * newRadius * (Math.random() * 0.2 + 0.8)
        positions[j + 2] = Math.sin(newAngle) * newRadius * (Math.random() * 0.2 + 0.8)

        // 新しい半径と角度を保存
        coreParticles[i].radius = newRadius
        coreParticles[i].angle = newAngle

        // サイズをリセット
        const heightFactor = 1.0 - (positions[j + 1] + 1) / 2
        sizes[i] = (Math.random() * 0.6 + 1.0) * (heightFactor * 0.3 + 0.7) * 1.5
      }
    }

    coreRef.current.geometry.attributes.position.needsUpdate = true
    coreRef.current.geometry.attributes.size.needsUpdate = true

    // マテリアルのuTimeを更新
    if (coreRef.current.material instanceof THREE.ShaderMaterial) {
      coreRef.current.material.uniforms.uTime.value = time
    }
  })

  return (
    <points ref={coreRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={corePositions.length / 3}
          array={corePositions}
          itemSize={3}
        />
        <bufferAttribute attach="attributes-size" count={coreSizes.length} array={coreSizes} itemSize={1} />
      </bufferGeometry>
      <coreFireMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function Fire() {
  const fireRef = useRef<THREE.Points>(null)
  useThree()

  // パーティクルの数
  const count = 12000

  //音声再生処理
  useEffect(() => {
    const audio = new Audio("/fire.mp3")
    audio.loop = true
    audio.volume = 0.2
    audio.play()

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, []);

  // パーティクルの初期設定
  const particles = useMemo(() => {
    const temp: ParticleInfo[] = []
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100
      const factor = 20 + Math.random() * 100
      // 上昇速度を遅く
      const speed = 0.005 + Math.random() / 300

      // 円形の分布にする
      const radius = Math.random() * 0.5
      const angle = Math.random() * Math.PI * 2
      const x = Math.cos(angle) * radius * (Math.random() * 0.3 + 0.7)
      const z = Math.sin(angle) * radius * (Math.random() * 0.3 + 0.7)

      // 高さをランダムに分布
      const y = Math.random() * 2 - 1

      temp.push({ time, factor, speed, x, y, z, radius, angle })
    }
    return temp
  }, [count])

  // パーティクルの位置データを作成
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = particles[i].x
      positions[i3 + 1] = particles[i].y
      positions[i3 + 2] = particles[i].z

      // パーティクルサイズ
      const heightFactor = 1.0 - (particles[i].y + 1) / 2
      // 中心に近いほど大きく
      const centerFactor = 1.0 - particles[i].radius / 0.5
      sizes[i] = (Math.random() * 0.8 + 1.2) * (heightFactor * 0.5 + 0.5) * (centerFactor * 0.5 + 0.5) * 2
    }

    return [positions, sizes]
  }, [count, particles])

  // アニメーション
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (!fireRef.current) return

    const positions = fireRef.current.geometry.attributes.position.array as Float32Array
    const sizes = fireRef.current.geometry.attributes.size.array as Float32Array

    for (let i = 0, j = 0; i < count; i++, j += 3) {
      const { speed, radius, angle } = particles[i]

      // 上昇する動き
      const curTime = time * speed + particles[i].time

      // Y軸方向に上昇させる（速度を遅く）
      const baseSpeed = 0.008 // 基本速度を遅く
      const randomSpeed = Math.random() * 0.004 // ランダム要素も小さく
      const heightFactor = Math.min(1.0, (positions[j + 1] + 1) / 2)
      positions[j + 1] += (baseSpeed + randomSpeed) * (1 + heightFactor * 0.3) // 上昇加速も抑える

      // 実際の炎のような不規則な揺らぎ（揺らぎを小さく）
      // 風の影響をシミュレート（弱い風）
      const windStrength = 0.02
      const windFrequency = 0.1
      const windDirection = Math.sin(time * windFrequency) * windStrength

      // 高さに応じて揺らぎを大きくする（揺れを抑える）
      const heightWobbleFactor = Math.max(0, positions[j + 1]) * 1.5
      const wobbleX = Math.sin(curTime * 1.5 + positions[j + 1] * 3) * 0.015 * heightWobbleFactor
      const wobbleZ = Math.cos(curTime * 1.8 + positions[j + 1] * 3) * 0.015 * heightWobbleFactor

      // 渦巻き効果と揺らぎを組み合わせる（渦巻きを弱く）
      const spiralSpeed = 0.3
      const spiralRadius = radius * (1.0 - positions[j + 1] / 4.0)

      // 渦巻き効果と揺らぎを組み合わせる
      const newAngle = angle + curTime * spiralSpeed
      positions[j] = Math.cos(newAngle) * spiralRadius + wobbleX + windDirection
      positions[j + 2] = Math.sin(newAngle) * spiralRadius + wobbleZ

      // パーティクルが上に行くほど小さくなる（ゆっくり小さくなる）
      sizes[i] = Math.max(0, sizes[i] - 0.005 * Math.random())

      // パーティクルが上に行きすぎたら再生成
      if (positions[j + 1] > 2) {
        // 下部から再生成
        positions[j + 1] = -1 + Math.random() * 0.3

        // 円形の分布を維持
        const newRadius = Math.random() * 0.5
        const newAngle = Math.random() * Math.PI * 2
        positions[j] = Math.cos(newAngle) * newRadius * (Math.random() * 0.3 + 0.7)
        positions[j + 2] = Math.sin(newAngle) * newRadius * (Math.random() * 0.3 + 0.7)

        // 新しい半径と角度を保存
        particles[i].radius = newRadius
        particles[i].angle = newAngle

        // サイズをリセット
        const heightFactor = 1.0 - (positions[j + 1] + 1) / 2
        const centerFactor = 1.0 - newRadius / 0.5
        sizes[i] = (Math.random() * 0.8 + 1.2) * (heightFactor * 0.5 + 0.5) * (centerFactor * 0.5 + 0.5) * 2
      }
    }

    fireRef.current.geometry.attributes.position.needsUpdate = true
    fireRef.current.geometry.attributes.size.needsUpdate = true

    // マテリアルのuTimeを更新
    if (fireRef.current.material instanceof THREE.ShaderMaterial) {
      fireRef.current.material.uniforms.uTime.value = time
    }
  })

  return (
    <points ref={fireRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <fireMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

export default function FireEffect({ position }: { position: THREE.Vector3}) {
  // カメラの初期位置を設定
  const { ref, bind } = useDraggable<THREE.Group>()
  return (
    <group position={position} ref={ref} {...(bind() as JSX.IntrinsicElements['group'])}>
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 0]} intensity={2} color="#ff7700" />
      {/* <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={45} /> */}
      <Fire />
      <FireCore />
    </group>
  )
}
