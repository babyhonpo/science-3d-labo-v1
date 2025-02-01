import React,{ useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ExplosionEffectProps {
  position: THREE.Vector3
  color?: string
  particleCount?: number
}

export default function ExplosionEffect({ position, color = "#ff4000", particleCount = 1000 }: ExplosionEffectProps) {
  const particles = useRef<THREE.Points>(null!)
  const clock = useRef(new THREE.Clock())

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      positions[i * 3] = position.x + radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = position.y + radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = position.z + radius * Math.cos(phi)
    }
    return positions
  }, [particleCount, position])

  const particlesVelocity = useMemo(() => {
    const velocities = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const speed = Math.random() * 5 + 2
      velocities[i * 3] = (Math.random() - 0.5) * speed
      velocities[i * 3 + 1] = (Math.random() - 0.5) * speed
      velocities[i * 3 + 2] = (Math.random() - 0.5) * speed
    }
    return velocities
  }, [particleCount])

  useFrame((state, delta) => {
    if (particles.current) {
      const positions = particles.current.geometry.attributes.position.array as Float32Array
      const time = clock.current.getElapsedTime()

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3
        const iy = i * 3 + 1
        const iz = i * 3 + 2

        // Update particle positions
        positions[ix] += particlesVelocity[ix] * delta
        positions[iy] += particlesVelocity[iy] * delta
        positions[iz] += particlesVelocity[iz] * delta

        // Add some turbulence
        positions[ix] += Math.sin(time * 2 + i) * 0.02
        positions[iy] += Math.cos(time * 2 + i) * 0.02
        positions[iz] += Math.sin(time * 2 + i * 0.5) * 0.02
      }

      particles.current.geometry.attributes.position.needsUpdate = true

      // Fade out particles over time
      const material = particles.current.material as THREE.PointsMaterial
      material.opacity = Math.max(0, 1 - time * 0.5)
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
      <pointsMaterial size={0.1} color={color} transparent opacity={1} />
    </points>
  )
}

