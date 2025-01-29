import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Mesh } from 'three';

function ExplodingSphere() {
  const sphereRef = useRef<Mesh | null>(null);

  // アニメーションフレームでスケールを変更
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.scale.set(1 + time * 0.5, 1 + time * 0.5, 1 + time * 0.5);
      if (time > 2) {
        sphereRef.current.scale.set(1, 1, 1); // リセット
        clock.start(); // アニメーションを再スタート
      }
    }
  });

  return (
    <Sphere args={[1, 32, 32]} ref={sphereRef}>
      <meshStandardMaterial emissive="orange" emissiveIntensity={1.5} />
    </Sphere>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      {/* 環境光 */}
      <ambientLight intensity={0.5} />
      {/* ポイントライト */}
      <pointLight position={[10, 10, 10]} intensity={1} />
      <ExplodingSphere />
    </Canvas>
  );
}
