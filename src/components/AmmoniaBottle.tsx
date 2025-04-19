"use client"

import React,{ useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, ContactShadows, Text, MeshTransmissionMaterial } from "@react-three/drei"
import { Group, Mesh } from "three"



export default function AmmoniaBottle() {
    return (
      <group>
        <Bottle />
        <Text position={[0, -3.5, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
          NH₃ (アンモニア)
        </Text>
        <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={1.5} far={4} />
        <Environment preset="studio" />
        <OrbitControls minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2} />
      </group>
    );
}

function Bottle() {
  const bottleRef = useRef<Group>(null)
  const liquidRef = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (bottleRef.current) {
      bottleRef.current.rotation.y = Math.sin(t / 4) * 0.3
    }

    // Subtle movement for the liquid
    if (liquidRef.current) {
      liquidRef.current.position.y = Math.sin(t * 2) * 0.05 - 0.2
    }
  })

  return (
    <group ref={bottleRef} position={[0, -1, 0]}>
      {/* Bottle */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 3, 32, 1, true]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={0.3}
          thickness={0.2}
          chromaticAberration={0.05}
          anisotropy={0.1}
          envMapIntensity={1}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
          ior={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Bottle bottom */}
      <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.2}
          chromaticAberration={0.05}
          clearcoat={1}
          color="#ffffff"
          ior={1.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Bottle neck */}
      <mesh position={[0, 1.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.7, 0.4, 32]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.2}
          chromaticAberration={0.05}
          clearcoat={1}
          color="#ffffff"
          ior={1.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Bottle cap */}
      <mesh position={[0, 2.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.3, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Ammonia liquid */}
      <mesh ref={liquidRef} position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.9, 0.9, 2, 32]} />
        <meshPhysicalMaterial
          color="#f0f5c0"
          transmission={0.9}
          thickness={1}
          roughness={0}
          ior={1.4}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Ammonia gas bubbles */}
      <Bubbles />
    </group>
  )
}

function Bubbles() {
  const bubblesRef = useRef<Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Animate each bubble child
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((bubble, i) => {
        // Move bubbles upward
        bubble.position.y += 0.01 + Math.random() * 0.01

        // Random horizontal movement
        bubble.position.x += Math.sin(t * 2 + i) * 0.002
        bubble.position.z += Math.cos(t * 2 + i) * 0.002

        // Reset bubbles that reach the top
        if (bubble.position.y > 1) {
          bubble.position.y = -0.8
          bubble.position.x = (Math.random() - 0.5) * 1.2
          bubble.position.z = (Math.random() - 0.5) * 1.2
        }
      })
    }
  })

  return (
    <group ref={bubblesRef}>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh
          key={i}
          position={[(Math.random() - 0.5) * 1.2, -0.8 + Math.random() * 1.6, (Math.random() - 0.5) * 1.2]}
          scale={0.05 + Math.random() * 0.1}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshPhysicalMaterial
            color="#f0f5c0"
            transmission={0.9}
            thickness={0.5}
            roughness={0}
            ior={1.4}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}
