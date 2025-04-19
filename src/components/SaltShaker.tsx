"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import React from "react";

export default function SaltShaker() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <SaltBottle />
        <OrbitControls enableZoom={true} enablePan={true} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

function SaltBottle() {
  const bottleRef = useRef<THREE.Group | null>(null); 
  const [hovered, setHovered] = useState(false);

  // ラベル用のテクスチャを作成
  const labelTexture = useTexture("../public/label.png");

  // Example usage: Apply the texture to a plane as a label
  <mesh position={[0, 0, 1.3]}>
    <planeGeometry args={[1.2, 0.6]} />
    <meshStandardMaterial map={labelTexture} transparent={true} />
  </mesh>

  useFrame(() => {
    if (bottleRef.current) {
      bottleRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group
      ref={bottleRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* 赤いキャップ */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
        <meshStandardMaterial color="#e32636" roughness={0.3} />
      </mesh>

      {/* ガラス瓶 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 2.5, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.6}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>

      {/* 塩 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 2.3, 32]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
      </mesh>

      {/* ラベル */}
      <group position={[0, 0, 0.66]} rotation={[0, 0, 0]}>
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.25}
          color="red"
          font="/fonts/Geist-Bold.ttf"
          anchorX="center"
          anchorY="middle"
        >
          食卓塩
        </Text>

        <Text
          position={[0, 0, 0]}
          fontSize={0.15}
          color="red"
          font="/fonts/Geist-Regular.ttf"
          anchorX="center"
          anchorY="middle"
        >
          TABLE SALT
        </Text>

        {/* 赤い三角ロゴ */}
        <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.3, 0.3, 3]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
    </group>
  );
}