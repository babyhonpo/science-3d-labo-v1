import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";
import Background from "../components/Backgroud";
import DraggableBox from "../components/DraggableBox";
import DraggableSphere from "../components/DraggableSphere";
import DraggableCylinder from "../components/DraggableCylinder";
import DraggablePyramid from "../components/DraggablePyramid";
import { DraggableObject, ObjectType } from "../types/types";
import SelectForm from "../forms/SelectForm";
import { getCollisionResult } from "../utils/collisionRules";
import FreeCamera from "../components/FreeCamera";
import GlassWall from "../components/GlassWall";

const Home = () => {

  // すべてのオブジェクトのrefを格納するリスト
  const objectRefs = useRef<Map<string, DraggableObject>>(new Map());
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false); // ドラッグ状態を管理


  // アイテム追加ボタンがクリックされたときのオブジェクトを追加
  const handleAddItem = useCallback((type: ObjectType) => {

    const id = uuidv4();
    const newObj: DraggableObject = {
      id,
      type,
      mesh: React.createRef<THREE.Mesh>(),
      position: new THREE.Vector3(),
      radius: 1
    };

    objectRefs.current.set(id, newObj);
  setSelectedItems((prev) => [...prev, id]);

  }, []);

// 衝突処理
  const handleCollision = (idA: string, idB: string,) => {
    const objA = objectRefs.current.get(idA);
    const objB = objectRefs.current.get(idB);

    if (!objA || !objB) return;

    const newType = getCollisionResult(objA.type, objB.type);
    if (newType === null) return;

    const newPosition = objA.position.clone().lerp(objB.position, 0.5); // ✅ 先に `position` を取得
    objectRefs.current.delete(idA);
    objectRefs.current.delete(idB);

    const newId = uuidv4();
    // **衝突した位置の中間地点に新しいアイテムを配置**

    const newObj: DraggableObject = {
      id: newId,
      type: newType,
      mesh: React.createRef<THREE.Mesh>(),
      position: newPosition,
      radius: 1,
    };

    objectRefs.current.set(newId, newObj);
    setSelectedItems((prev) => [...prev.filter((id) => id !== idA && id !== idB), newId]);  // ✅ 配列順を明示
};

useEffect(() => {
  setSelectedItems(Array.from(objectRefs.current.keys()));  // ✅ `objectRefs` を `selectedItems` に同期
}, [objectRefs.current]);


const renderObjects = useMemo(() => {
  return selectedItems.map((id) => {
    const refData = objectRefs.current.get(id);
    if (!refData) return null;

    const props = {
      refData,
      position: refData.position,
      onDragStateChange: setIsDragging,
      objectsRef: objectRefs.current,
      onCollide: handleCollision,
      cameraRef: React.createRef<THREE.Camera>(),
      children: null,
    };


    return refData.type === "box" ? <DraggableBox key={id} {...props} /> :
    refData.type === "sphere" ? <DraggableSphere key={id} {...props} /> :
    refData.type === "cylinder" ? <DraggableCylinder key={id} {...props} />:
    refData.type === "pyramid" ? <DraggablePyramid key={id} {...props} />: null;
});
}, [selectedItems, objectRefs.current]);


  return (
    // 画面いっぱいにCanvasが表示されるようdivでラップしている
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
      // shadows
      // camera={{ position: [0, 0, 1000], fov: 45 }}
      // style={{ width: "100vw", height: "100vh" }}
      >
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
        <OrbitControls enabled={!isDragging} />
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[0, 20, 20]} intensity={2} />

        {/* 背景 (しかし、作られてないので、作る必要あり) */}
        <Background />

        {renderObjects}


        <FreeCamera isDragging={isDragging} /> {/* ✅ カメラ操作を追加 */}

        <GlassWall position={[0, 0, -5]} /> {/* 奥側 */}
        <GlassWall position={[0, 0, 5]} />  {/* 手前側 */}
        <GlassWall position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} /> {/* 左側 */}
        <GlassWall position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} /> {/* 右側 */}
        
      </Canvas>

      {/* SelectFormに状態更新関数を渡す */}
      <SelectForm onAddItem={handleAddItem} />
    </div>
  );
};

export default Home;
