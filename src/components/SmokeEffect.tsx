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
  position = [0, 0, -5], 
  duration = 5000, // 5秒後に削除
  onComplete 
}) => {
  const particlesRef = useRef<THREE.Sprite[]>([]);
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
        (Math.random() - 0.5) * 0.05,  // 横方向の動き
        Math.random() * 0.05 + 0.05,     // ゆっくりと立ち上がる上方向
        (Math.random() - 0.5) * 0.05,   // 前後方向の動き
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
    if (!isActive) return;

    particleData.forEach((p, i) => {
      p.angle += p.angleSpeed;

      // 立ち上がりの動き（さらにゆっくり）
      p.position.x += p.velocity.x + Math.sin(p.angle) * 0.05;
      p.position.y += p.velocity.y;
      p.position.z += p.velocity.z;

      // 上に立ち上がるような力を加える（重力を無視して上方向に動かす）
      p.velocity.y += 0.0005;  // 上方向にゆっくりと加速（煙がゆっくり上に向かう）

      p.size *= p.expansion;
      p.velocity.x += (Math.random() - 0.5) * 0.01;
      p.velocity.y *= 1.01;

      // フェードアウト（透明度を時間経過で減少させる）
      p.life -= 0.005;  // ライフが少しずつ減少
      p.opacity = Math.max(p.life * 0.8, 0);

      if (p.life <= 0) {
        p.opacity = 0;
      }

      // スプライトの位置とサイズを更新
      const sprite = particlesRef.current[i];
      if (sprite) {
        sprite.position.set(p.position.x, p.position.y, p.position.z);
        sprite.scale.set(p.size, p.size, 1);
        sprite.material.opacity = p.opacity;
      }
    });
  });

  // `isActive` が false のときは何も描画しない
  if (!isActive) return null;

  return (
    <>
      {particleData.map((_, index) => {
        const sprite = new THREE.Sprite(
          new THREE.SpriteMaterial({
            color: new THREE.Color(0x212121), // 煙の色（グレー）
            transparent: true,
            blending: THREE.AdditiveBlending,
            opacity: 0.5,
          })
        );

        // 初期位置を設定
        sprite.position.set(
          particleData[index].position.x,
          particleData[index].position.y - 1, // y座標を少し下げる
          particleData[index].position.z
        );
        sprite.scale.set(particleData[index].size, particleData[index].size, 1);

        particlesRef.current.push(sprite);

        return <primitive key={index} object={sprite} />;
      })}
    </>
  );
};

export default SmokeEffect;
