import React,{ useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface CollisionEffectProps {
  position: THREE.Vector3
  color?: string
  particleCount?: number
}

export default function CollisionEffect({ position, color = "#ffaa00", particleCount = 100 }: CollisionEffectProps) {
  const particles = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = position.x + (Math.random() - 0.5) * 0.5
      positions[i * 3 + 1] = position.y + (Math.random() - 0.5) * 0.5
      positions[i * 3 + 2] = position.z + (Math.random() - 0.5) * 0.5
    }
    return positions
  }, [particleCount, position])

  useFrame((state) => {
    if (particles.current) {
      const positions = particles.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3
        const iy = i * 3 + 1
        const iz = i * 3 + 2

        // Oscillate particles around their initial position
        positions[ix] = particlesPosition[ix] + Math.sin(state.clock.elapsedTime * 10 + i) * 0.02
        positions[iy] = particlesPosition[iy] + Math.cos(state.clock.elapsedTime * 10 + i) * 0.02
        positions[iz] = particlesPosition[iz] + Math.sin(state.clock.elapsedTime * 10 + i * 0.5) * 0.02
      }
      particles.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} transparent opacity={0.8} />
    </points>
  )
}

