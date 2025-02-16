import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import React from "react"

interface ToxicGasEffectProps {
  position: THREE.Vector3
}

export default function ToxicGasEffect({ position }: ToxicGasEffectProps) {
  const particles = useRef<THREE.Points>(null!)

  // パーティクルの数をさらに増やす
  const count = 2000

  // 音声再生処理を追加**
  useEffect(() => {
    const sound = new Audio("/explosion1.mp3");

    const playSound = () => {
      sound.volume = 1;
      sound.currentTime = 0; // 毎回最初から再生
      sound.play().catch((error) => console.error("音声再生エラー:", error));
    };

    // クリックするたびに音を再生
    document.addEventListener("click", playSound);

    return () => {
      document.removeEventListener("click", playSound);
    };
  }, []);

  // パーティクルのプロパティを初期化
  const particleProps = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const lifetimes = new Float32Array(count)
    const sizes = new Float32Array(count)
    const opacities = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // より広い範囲にパーティクルを分布
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 1.5 // 半径を大きく
      const height = (Math.random() - 0.5) * 0.8
      positions[i * 3] = position.x + Math.cos(angle) * radius
      positions[i * 3 + 1] = position.y + height
      positions[i * 3 + 2] = position.z + Math.sin(angle) * radius

      // よりゆっくりとした上昇
      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = Math.random() * 0.04 + 0.01
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02

      // より長い寿命とバリエーション
      lifetimes[i] = Math.random() * 4 + 3
      sizes[i] = Math.random() * 0.5 + 0.3 // サイズをさらに大きく
      opacities[i] = Math.random() * 0.7 + 0.3 // より高い不透明度
    }

    return {
      positions,
      velocities,
      lifetimes,
      sizes,
      opacities,
      initialLifetimes: [...lifetimes],
    }
  }, [position])

  // パーティクルの更新
  useFrame((state, delta) => {
    if (!particles.current) return

    const positionArray = particles.current.geometry.attributes.position.array as Float32Array

    const newPositions = new Float32Array(count * 3)
    const newSizes = new Float32Array(count)
    const newOpacities = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // 速度に基づいて位置を更新
      newPositions[i * 3] = positionArray[i * 3] + particleProps.velocities[i * 3]
      newPositions[i * 3 + 1] = positionArray[i * 3 + 1] + particleProps.velocities[i * 3 + 1]
      newPositions[i * 3 + 2] = positionArray[i * 3 + 2] + particleProps.velocities[i * 3 + 2]

      // より強い渦効果
      const swirl = 0.08
      const dx = newPositions[i * 3] - position.x
      const dz = newPositions[i * 3 + 2] - position.z
      particleProps.velocities[i * 3] += -dz * swirl * delta
      particleProps.velocities[i * 3 + 2] += dx * swirl * delta

      // 寿命の更新
      // particleProps.lifetimes[i] -= delta

      // サイズと不透明度の更新
      const lifeRatio = particleProps.lifetimes[i] / particleProps.initialLifetimes[i]
      newSizes[i] = particleProps.sizes[i] * (0.7 + lifeRatio * 0.3) // サイズの減衰を緩やかに
      newOpacities[i] = particleProps.opacities[i] * (0.8 + lifeRatio * 0.2) // 不透明度の減衰も緩やかに

      // パーティクルのリセット
      if (particleProps.lifetimes[i] <= 0) {
        const angle = Math.random() * Math.PI * 2
        const radius = Math.random() * 1.5
        const height = (Math.random() - 0.5) * 0.8
        newPositions[i * 3] = position.x + Math.cos(angle) * radius
        newPositions[i * 3 + 1] = position.y + height
        newPositions[i * 3 + 2] = position.z + Math.sin(angle) * radius
        particleProps.lifetimes[i] = particleProps.initialLifetimes[i]
        newOpacities[i] = particleProps.opacities[i]
      }

      // より緩やかな減衰
      particleProps.velocities[i * 3] *= 0.995
      particleProps.velocities[i * 3 + 1] *= 0.995
      particleProps.velocities[i * 3 + 2] *= 0.995
    }

    // 属性の更新
    particles.current.geometry.setAttribute("position", new THREE.Float32BufferAttribute(newPositions, 3))
    particles.current.geometry.setAttribute("size", new THREE.Float32BufferAttribute(newSizes, 1))
    particles.current.geometry.setAttribute("opacity", new THREE.Float32BufferAttribute(newOpacities, 1))
  })

  // パーティクルの初期化
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(particleProps.positions, 3))
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(particleProps.sizes, 1))
    geometry.setAttribute("opacity", new THREE.Float32BufferAttribute(particleProps.opacities, 1))
    return geometry
  }, [particleProps.positions, particleProps.sizes, particleProps.opacities])


  // カスタムシェーダーマテリアル
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float size;
        attribute float opacity;
        varying float vOpacity;
        void main() {
          vOpacity = opacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (400.0 / -mvPosition.z); // ポイントサイズを大きく
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        void main() {
          float r = length(gl_PointCoord - vec2(0.5));
          if (r > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, r) * vOpacity;

          // 赤色のグラデーション
          vec3 baseColor = vec3(0.9, 0.1, 0.1);  // 濃い赤
          vec3 glowColor = vec3(1.0, 0.3, 0.2);  // 明るい赤
          vec3 color = mix(baseColor, glowColor, alpha * 0.5);

          // より高い不透明度
          gl_FragColor = vec4(color, alpha * 0.8);
        }
      `,
    })
  }, [])

  return <points ref={particles} geometry={particleGeometry} material={material} />
}

