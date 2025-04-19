import React, { useMemo, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, PerspectiveCamera } from "@react-three/drei";
import Background from "../components/Backgroud";
import FreeCamera from "../components/FreeCamera";
import DraggableSphere from "../components/DraggableSphere";
import ExplosionEffect from "../components/ExplosionEffect";
import { EnergyBurst } from "../components/EnergyBurst";
import { LightningEffect } from "../components/LightningEffect";
import SmokeEffect from "../components/SmokeEffect";
import ToxicGasEffect from "../components/ToxicGasEffect";
import { SceneCanvasProps } from "../types/types";
import { getCollisionResult } from "../utils/collisionRules";
import * as THREE from "three";
import FireEffect from "./FireEffectConsolidated";
import AmmoniaBottle from "./AmmoniaBottle";
import GlassShardsFall from "./GlassShardsFall";
import WaterSphere from "./WaterSphere";


/**
 * @param {SceneCanvas} props - シーンに必要なprops群
 * @param {React.MutableRefObject<Map<string, DraggableObject>>} props.objectRefs - オブジェクト参照マップ
 * @param {string[]} props.selectedItems - 選択されたアイテムのIDリスト
 * @param {(isDragging: boolean) => void} props.setIsDragging - ドラッグ中かどうかを設定する関数
 * @param {(ids: string[]) => void} props.handleCollision - 衝突判定後の処理を行う関数
 * @param {boolean} props.isModalOpen - 周期表モーダル開閉状態
 *
 * @returns {JSX.Element} 3Dシーンを描画するCanvas
 */
export const SceneCanvas = ({
  objectRefs,
  selectedItems,
  setIsDragging,
  handleCollision,
  mode,
  isModalOpen,
  // onAddItem,
  cameraRef,
}: SceneCanvasProps) => {
  const handleCollisionExtended = useCallback(
    (ids: string[]) => {
      const symbols = ids.map(
        (id) => objectRefs.current.get(id)?.objInfo.symbol || ""
      );
      const result = getCollisionResult(symbols, mode);

      // 通常の生成処理
      if (result) {
        if (mode === "creation") {
          if (result === "SpawnHO" ) {
            const sourceObj = objectRefs.current.get(ids[0]);
            if (!sourceObj) return;

            const basePos = sourceObj.position ?? new THREE.Vector3(0, 0, 0);

            const spawnOffsets = [
              new THREE.Vector3(-1, 0, 0),
              new THREE.Vector3(1, 0, 0),
              new THREE.Vector3(0, 1, 0),
              new THREE.Vector3(0, -1, 0),
            ];
            const elements = ["H", "H", "O", "O"];

            elements.forEach((symbol, i) => {
              const newId = '${symbol}-${Date.now()}';
              const newPos = basePos.clone().add(spawnOffsets[i]);

              objectRefs.current.set(newId, {
                id: newId,
                position: newPos,
                objInfo: {
                  symbol: symbol,
                  name: symbol,
                  color: symbol === "H" ? "#00ffff" : "#ff6600",
                },
                mesh: sourceObj.mesh,
                radius: sourceObj.radius,
              })
            })
            return;
          }
          // 通常の生成処理
          if (result) {
          const newId = `${result}-${Date.now()}`;
          const sourceObj = objectRefs.current.get(ids[0]);
          if (!sourceObj) return;

          const basePos = sourceObj.position ?? new THREE.Vector3(0, 0, 0);
          const baseColor = sourceObj.objInfo.color;
          const mesh = sourceObj.mesh;
          const radius = sourceObj.radius;

          objectRefs.current.set(newId, {
            id: newId,
            position: basePos,
            objInfo: {
              symbol: result,
              name: result,
              color: baseColor,
            },
            mesh,
            radius,
          });
        }
      }

        handleCollision?.(ids);
      }
    },
    [objectRefs, mode, handleCollision]
  );

  const renderObjects = useMemo(() => {
    return selectedItems.map((id) => {
      const refData = objectRefs.current.get(id);
      if (!refData) return null;

      switch (refData.objInfo.symbol) {
        case "Bom":
          return <ExplosionEffect key={id} position={refData.position} />;
        case "EnergyBurst":
          return <EnergyBurst key={id} />;
        case "ToxicGasEffect":
          return <ToxicGasEffect key={id} position={refData.position} />;
        case "SmokeEffect":
          return <SmokeEffect key={id} />;
        case "LightningEffect":
          return <LightningEffect
            key={id}
            position={refData.position}
            refData={refData}
            onDragStateChange={setIsDragging}
            onCollide={handleCollisionExtended}
            objectsRef={objectRefs.current}
          />
        case "Fi":
          return (
            <FireEffect
              key={id}
              position={refData.position}
              refData={refData}
              onDragStateChange={setIsDragging}
              onCollide={handleCollisionExtended}
              objectsRef={objectRefs.current}
            />
          );
        case "AmmoniaEffect":
          return <AmmoniaBottle key={id} />;
        case "GlassShardsFall":
          return <GlassShardsFall key={id} position={refData.position} />;

        default:
          return (
            <DraggableSphere
              key={id}
              refData={refData}
              position={refData.position}
              onDragStateChange={setIsDragging}
              objectsRef={objectRefs.current}
              onCollide={handleCollisionExtended}
              objInfo={refData.objInfo}
            />
          );
      }
    });
  }, [selectedItems, objectRefs, setIsDragging, handleCollisionExtended]);

  return (
    <Canvas>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 0]}
      />
      <color attach="background" args={["#000"]} />
      <Stars
        radius={100} // 星が配置される球体の半径
        depth={50} // 星の奥行きの深さ
        count={7000} // 星の数
        factor={4} // 星の大きさの係数
        saturation={0} // 彩度（0で白色）
        fade // フェードエフェクトを有効化
        speed={0.5} // アニメーションの速度
      />
      <ambientLight />
      <pointLight position={[100, 10, 10]} />
      {/* 環境光 */}
      <ambientLight intensity={0.5} />
      {/* 平行光源 */}
      <directionalLight
        castShadow
        position={[0, 20, 20]}
        intensity={2} // 光の強さ
        shadow-mapSize={[1024, 1024]}
      />
      {/* 地面 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -190, 0]}
        receiveShadow
      >
        <planeGeometry args={[1000, 1000]} />
        {/* <meshStandardMaterial color={0xc0c0c0} /> */}
      </mesh>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[0, 20, 20]}
        intensity={2}
        shadow-mapSize={[1024, 1024]}
      />
      {/* カメラ制御 */}
      {/* <OrbitControls enabled={!isDragging} /> */}
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[0, 20, 20]} intensity={2} />
      <Background />
      {renderObjects}
      {/* <ExplosionEffect position={new THREE.Vector3(0, 0, 0)} /> */}
      <FreeCamera isModalOpen={isModalOpen} />
      {/* <WaterSphere /> */}
      <LightningEffect
        key="lightning-test"
        position={new THREE.Vector3(0, 0, 0)} // お好みの位置に
        refData={{
        id: "lightning-test",
        position: new THREE.Vector3(0, 0, 0),
        objInfo: {
        symbol: "LightningEffect",
        name: "LightningEffect",
        color: "#ffff00",
    },
    mesh: React.createRef<THREE.Mesh>(),
    radius: 1,
  }}
  onDragStateChange={() => {}}
  onCollide={() => {}}
  objectsRef={new Map()}
/>
    </Canvas>
  );
};
