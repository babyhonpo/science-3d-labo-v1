"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SmokeEffectProps {
  position?: [number, number, number];
  duration?: number; // エフェクトが継続する時間（ミリ秒）
  onComplete?: () => void; // エフェクト完了時のコールバック
}

const SmokeEffect: React.FC<SmokeEffectProps> = ({
  position = [0, 0,-5], 
  duration = 5000, // 5秒後に削除
  onComplete 
}) => {
  const particlesRef = useRef<THREE.BufferAttribute>(null);
  const opacityRef = useRef<THREE.BufferAttribute>(null);
  const [isActive, setIsActive] = useState(true);

  const maxParticles = 200;

  // 一定時間後にエフェクトを削除
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false);
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  // パーティクルデータ
  const particleData = useMemo(() => {
    return new Array(maxParticles).fill(null).map(() => ({
      position: new THREE.Vector3(
        position[0] + (Math.random() - 0.5) * 5,
        position[1] + Math.random() * 2,
        position[2] + (Math.random() - 0.5) * 5,
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        Math.random() * 0.05 + 0.02,
        (Math.random() - 0.5) * 0.1,
      ),
      size: Math.random() * 2 + 1,
      life: 1,
      opacity: Math.random() * 0.8 + 0.2,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.05,
      expansion: 1.01 + Math.random() * 0.02,
    }));
  }, [position]);

  useFrame(() => {
    if (!particlesRef.current || !opacityRef.current || !isActive) return;

    const positions = particlesRef.current.array as Float32Array;
    const opacities = opacityRef.current.array as Float32Array;

    particleData.forEach((p, i) => {
      p.angle += p.angleSpeed;
      p.position.x += p.velocity.x + Math.sin(p.angle) * 0.1;
      p.position.y += p.velocity.y;
      p.position.z += p.velocity.z;

      p.size *= p.expansion;
      p.velocity.x += (Math.random() - 0.5) * 0.01;
      p.velocity.y *= 1.01;

      // フェードアウト
      p.life -= 0.01; 
      p.opacity = Math.max(p.life * 0.8, 0);

      if (p.life <= 0) {
        p.opacity = 0;
      }

      const index = i * 3;
      positions[index] = p.position.x;
      positions[index + 1] = p.position.y;
      positions[index + 2] = p.position.z;

      opacities[i] = p.opacity;
    });

    particlesRef.current.needsUpdate = true;
    opacityRef.current.needsUpdate = true;
  });

  // `isActive` が false のときは何も描画しない
  if (!isActive) return null;

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={particlesRef}
          attach="attributes-position"
          count={particleData.length}
          array={new Float32Array(particleData.length * 3)}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          ref={opacityRef}
          attach="attributes-opacity"
          count={particleData.length}
          array={new Float32Array(particleData.length)}
          itemSize={1}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        color="white"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default SmokeEffect;
