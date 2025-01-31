import React,{ useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"
import * as THREE from "three"
import ExplosionEffect from "./ExplosionEffect"
import CollisionEffect from "./CollisionEffect"

function CollisionObjects() {
  const sphere1 = useRef<THREE.Mesh>(null!)
  const sphere2 = useRef<THREE.Mesh>(null!)
  const [collisionPoint, setCollisionPoint] = useState<THREE.Vector3 | null>(null)
  const [explosion, setExplosion] = useState<THREE.Vector3 | null>(null)
  const lastCollisionTime = useRef(0)

  useFrame((state) => {
    if (sphere1.current && sphere2.current) {
      // Move spheres
      sphere1.current.position.x = Math.sin(state.clock.elapsedTime * 2) * 1.5
      sphere2.current.position.x = Math.sin(state.clock.elapsedTime * 2 + Math.PI) * 1.5

      // Check for collision
      const distance = sphere1.current.position.distanceTo(sphere2.current.position)
      const currentTime = state.clock.getElapsedTime()

      if (distance < 1) {
        const point = new THREE.Vector3()
          .addVectors(sphere1.current.position, sphere2.current.position)
          .multiplyScalar(0.5)
        setCollisionPoint(point)

        // Trigger explosion if it's been more than 1 second since the last explosion
        if (currentTime - lastCollisionTime.current > 1) {
          setExplosion(point)
          lastCollisionTime.current = currentTime
        }
      } else {
        setCollisionPoint(null)
      }
    }
  })

  useEffect(() => {
    if (explosion) {
      const timer = setTimeout(() => setExplosion(null), 1000) // Remove explosion after 1 second
      return () => clearTimeout(timer)
    }
  }, [explosion])

  return (
    <>
      <Sphere ref={sphere1} args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="red" />
      </Sphere>
      <Sphere ref={sphere2} args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="blue" />
      </Sphere>
      {collisionPoint && <CollisionEffect position={collisionPoint} />}
      {explosion && <ExplosionEffect position={explosion} />}
    </>
  )
}

export default function CollisionScene() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <CollisionObjects />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

