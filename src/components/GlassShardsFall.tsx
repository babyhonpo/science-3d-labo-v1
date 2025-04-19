import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface GlassShardsFallProps {
  position?: THREE.Vector3;
}

// ガラスの破片を表す型
type GlassShard = {
  geometry: THREE.BufferGeometry;
  material: THREE.MeshPhysicalMaterial;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  landed: boolean;
  landingTime: number | null;
  opacity: number;
  fadeOut: boolean;
  bounceVelocity: number;
  id: number;
};

export function GlassShardsFall({
  position = new THREE.Vector3(0, 0, 0),
}: GlassShardsFallProps) {
  const { scene } = useThree();
  const shardsRef = useRef<GlassShard[]>([]);
  const startTimeRef = useRef<number>(Date.now());
  const isCreatingShardsRef = useRef<boolean>(true);
  const [initialized, setInitialized] = useState(false);

  // 破片を作成する関数
  const createGlassShard = () => {
    // ランダムな形状タイプを選択
    const type = Math.floor(Math.random() * 3);
    let geometry: THREE.BufferGeometry;

    if (type === 0) {
      // 四面体ベース
      geometry = new THREE.TetrahedronGeometry(1, 0);
      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] *= 0.5 + Math.random() * 1.0;
        positions[i + 1] *= 0.5 + Math.random() * 1.0;
        positions[i + 2] *= 0.5 + Math.random() * 1.0;
        if (Math.random() > 0.7) {
          positions[i] *= Math.random() > 0.5 ? 1.5 : 0.5;
          positions[i + 1] *= Math.random() > 0.5 ? 1.5 : 0.5;
          positions[i + 2] *= Math.random() > 0.5 ? 1.5 : 0.5;
        }
      }
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] *= 0.2 + Math.random() * 0.2;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    } else if (type === 1) {
      // 立方体ベース
      geometry = new THREE.BoxGeometry(
        0.5 + Math.random() * 0.5,
        0.01 + Math.random() * 0.04,
        0.5 + Math.random() * 0.5
      );
      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += (Math.random() - 0.5) * 0.3;
        positions[i + 1] += (Math.random() - 0.5) * 0.01;
        positions[i + 2] += (Math.random() - 0.5) * 0.3;
        if (Math.random() > 0.7) {
          positions[i] *= Math.random() > 0.5 ? 1.3 : 0.7;
          positions[i + 2] *= Math.random() > 0.5 ? 1.3 : 0.7;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    } else {
      // 平らなポリゴン
      const shape = new THREE.Shape();
      const startX = (Math.random() - 0.5) * 0.5;
      const startY = (Math.random() - 0.5) * 0.5;
      shape.moveTo(startX, startY);

      const vertexCount = Math.floor(Math.random() * 5) + 3;
      for (let i = 0; i < vertexCount; i++) {
        const angle = (i / vertexCount) * Math.PI * 2;
        const radius = 0.5 + Math.random() * 0.7;
        const jitter = Math.random() > 0.7 ? 1.5 : 0.8;
        const x =
          Math.cos(angle) * radius * jitter + (Math.random() - 0.5) * 0.3;
        const y =
          Math.sin(angle) * radius * jitter + (Math.random() - 0.5) * 0.3;
        shape.lineTo(x, y);
      }
      shape.lineTo(startX, startY);

      const extrudeSettings = {
        steps: 1,
        depth: 0.01 + Math.random() * 0.04,
        bevelEnabled: true,
        bevelThickness: 0.01 + Math.random() * 0.02,
        bevelSize: 0.01 + Math.random() * 0.02,
        bevelSegments: 1,
      };

      geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }

    // ガラス素材
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      roughness: 0.03,
      thickness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      ior: 1.5,
      transparent: true,
      opacity: 0.8,
    });

    // 位置のオフセットを計算
    const offsetX = (Math.random() - 0.5) * 15;
    const offsetY = 10;
    const offsetZ = (Math.random() - 0.5) * 15;

    // 最終的な位置を計算（ベース位置 + オフセット）
    const finalPosition = new THREE.Vector3(
      position.x + offsetX,
      position.y + offsetY,
      position.z + offsetZ
    );

    const randomRotation = new THREE.Euler(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    const size = 0.5 + Math.random() * 1.0;
    const scale = new THREE.Vector3(size, size, size);

    return {
      geometry,
      material,
      position: finalPosition,
      rotation: randomRotation,
      scale,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        -0.15 - Math.random() * 0.2,
        (Math.random() - 0.5) * 0.05
      ),
      angularVelocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      ),
      landed: false,
      landingTime: null,
      opacity: 0.8,
      fadeOut: false,
      bounceVelocity: 0,
      id: Math.random(),
    };
  };

  // 初期化
  useEffect(() => {
    if (initialized) return;

    startTimeRef.current = Date.now();
    isCreatingShardsRef.current = true;
    shardsRef.current = [];
    setInitialized(true);

    // クリーンアップ関数
    return () => {
      // 破片のジオメトリとマテリアルを破棄
      shardsRef.current.forEach((shard) => {
        shard.geometry.dispose();
        shard.material.dispose();
      });
      shardsRef.current = [];
    };
  }, [initialized]);

  // アニメーションフレーム
  useFrame(() => {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTimeRef.current) / 1000; // 経過時間（秒）

    // 最初の5秒間だけ破片を作成
    if (elapsedTime < 5 && isCreatingShardsRef.current) {
      if (Math.random() > 0.7) {
        const count = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < count; i++) {
          shardsRef.current.push(createGlassShard());
        }
      }
    } else if (elapsedTime >= 5) {
      isCreatingShardsRef.current = false;
    }

    // 破片のアニメーションを更新
    for (let i = shardsRef.current.length - 1; i >= 0; i--) {
      const shard = shardsRef.current[i];

      if (!shard.landed) {
        // 落下中
        shard.position.add(shard.velocity);
        shard.rotation.x += shard.angularVelocity.x;
        shard.rotation.y += shard.angularVelocity.y;
        shard.rotation.z += shard.angularVelocity.z;

        // 床との衝突検出
        if (shard.position.y <= -4.95 + shard.scale.y * 0.1) {
          shard.landed = true;
          shard.landingTime = elapsedTime;
          shard.bounceVelocity = Math.random() * 0.05 + 0.02;
          shard.position.y = -4.95 + shard.scale.y * 0.1;
        }
      } else {
        // 着地後
        const timeOnGround = elapsedTime - (shard.landingTime || 0);

        // 10秒後にフェードアウト開始
        if (timeOnGround >= 10 && !shard.fadeOut) {
          shard.fadeOut = true;
        }

        // フェードアウト処理
        if (shard.fadeOut) {
          shard.opacity -= 0.02;
          if (shard.opacity <= 0) {
            shardsRef.current.splice(i, 1);
            continue;
          }
          shard.material.opacity = Math.max(0, shard.opacity);
        }

        // バウンス効果
        if (shard.bounceVelocity > 0.001) {
          shard.position.y += shard.bounceVelocity;
          shard.bounceVelocity -= 0.002;

          if (shard.position.y < -4.95 + shard.scale.y * 0.1) {
            shard.position.y = -4.95 + shard.scale.y * 0.1;
            shard.bounceVelocity = -shard.bounceVelocity * 0.4;
          }

          // 着地後の小さな回転
          shard.rotation.x += shard.angularVelocity.x * 0.1;
          shard.rotation.y += shard.angularVelocity.y * 0.1;
          shard.rotation.z += shard.angularVelocity.z * 0.1;
        } else {
          shard.bounceVelocity = 0;
        }
      }
    }
  });

  return (
    <group>
      {shardsRef.current.map((shard) => (
        <mesh
          key={shard.id}
          geometry={shard.geometry}
          material={shard.material}
          position={[shard.position.x, shard.position.y, shard.position.z]}
          rotation={[shard.rotation.x, shard.rotation.y, shard.rotation.z]}
          scale={[shard.scale.x, shard.scale.y, shard.scale.z]}
          castShadow
        />
      ))}
    </group>
  );
}

export default GlassShardsFall;
