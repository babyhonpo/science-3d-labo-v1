import React,{ useMemo } from "react";
import { Canvas} from "@react-three/fiber";
import { Stars } from "@react-three/drei"
import Background from "../components/Backgroud";
import FreeCamera from "../components/FreeCamera";
import DraggableSphere from "../components/DraggableSphere";
import ExplosionEffect from "../components/ExplosionEffect";
import { EnergyBurst } from "../components/EnergyBurst";
import { LightningEffect } from "../components/LightningEffect";
import SmokeEffect from "../components/SmokeEffect";
import ToxicGasEffect from "../components/ToxicGasEffect";
import { SceneCanvasProps } from "../types/types"
import { SceneCanvasInner } from "./SceneCanvasInner";

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
    isModalOpen,
    onAddItem,
    onAddItemToFront,
}: SceneCanvasProps) => {



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
                    return <SmokeEffect key={id}  />;
                case "LightningEffect":
                    return <LightningEffect key={id} position={refData.position} />;
                default:
                    return (
                        <DraggableSphere
                            key={id}
                            refData={refData}
                            position={refData.position}
                            onDragStateChange={setIsDragging}
                            objectsRef={objectRefs.current}
                            onCollide={handleCollision}
                            objInfo={refData.objInfo}
                        />
                    );
                }
            });
        },  [selectedItems, objectRefs, setIsDragging, handleCollision]);

    return(
        <Canvas camera={{ position: [0, 5, 10] }}>
            <SceneCanvasInner
                onAddItem={onAddItem}
                onAddItemToFront={onAddItemToFront}
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
        </Canvas>
    )
};