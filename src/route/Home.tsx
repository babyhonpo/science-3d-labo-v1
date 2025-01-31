import React from "react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Background from "../components/Backgroud";
import DraggableBox from "../components/DraggableBox";
import DraggableSphere from "../components/DraggableSphere";
import DraggableCylinder from "../components/DraggableCylinder";
import { DraggableObject, ObjectType } from "../types/types";
import SelectForm from "../forms/SelectForm";
import * as THREE from "three";
// import { getCollisionComponent } from "../utils/collisionRules";
// import { getComponentFromType } from "../utils/componentMapping.ts";
import { getCollisionResult } from "../utils/collisionRules";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [isDragging, setIsDragging] = useState(false); // ドラッグ状態を管理
  const [selectedItems, setSelectedItems] = useState<{ id: string; type: ObjectType; position: THREE.Vector3 }[]>([]);
  // すべてのオブジェクトのrefを格納するリスト
  const objectRefs = useRef<Map<string, DraggableObject>>(new Map());

  // アイテム追加ボタンがクリックされたときのオブジェクトを追加
  const handleAddItem = useCallback((type: ObjectType) => {
    setSelectedItems((prevItems) => {
      const newId = uuidv4();
      const newItem = {
        id: newId,
        type,
        position: new THREE.Vector3()
      };
      const updatedItems = [...prevItems, newItem];

      // 追加後、即座にobjectRefs.currentを更新
      objectRefs.current.set(newId, {
        id: newId,
        type: newItem.type,
        mesh: React.createRef<THREE.Mesh>(),
        position: new THREE.Vector3(),
        radius: 1
      });

      // console.log("✅ 追加されたオブジェクト:", objectRefs.current.get(newItem.id));

      return updatedItems;
    });
  }, []);

// 衝突処理
  const handleCollision = (
    idA: string,
    idB: string,
  ) => {
    setSelectedItems((prevItems) => {
      // console.log("🔍 handleCollision 前のアイテム:", prevItems);

      // **両方のアイテムが `prevItems` にあるかチェック**
    if (!prevItems.some(item => item.id === idA) || !prevItems.some(item => item.id === idB)) {
      // console.log("❌ 衝突対象のアイテムが見つからないためスキップ");
      return prevItems;
    }

      const itemA = prevItems.find((item) => item.id === idA);
      const itemB = prevItems.find((item) => item.id === idB);

    if (!itemA || !itemB) {
      // **どちらかが見つからない場合はそのまま返す**
      // console.log("❌ アイテムが見つからないため、何もしない");
      return [...prevItems];
    }
    // console.log(`💥 ${itemA.type} と ${itemB.type} が衝突 → getCollisionResult へ`);
    const newType = getCollisionResult(itemA.type, itemB.type);
    // console.log(`✅ 衝突結果: ${newType}`);

    if(!newType) {
      console.log("❌ 衝突ルールが適用されなかった");
      return [...prevItems]; // 衝突結果がない場合は何もしない
    }

    // **新しい `id` を最大値 +1 にする**
    const newId = uuidv4();

    // // 衝突したアイテムを削除
    // const filteredItems = prevItems.filter(
    //   item => item.id !== idA && item.id !== idB
    // );

    // **衝突した位置の中間地点に新しいアイテムを配置**
    const newPosition = itemA.position.clone().lerp(itemB.position, 0.5);

    const newItem = {
      id: newId,  // **IDの付与を確認**
      type: newType,
      position: newPosition,
    };


    // console.log("📌 追加される新しいオブジェクト:", newItem);

    // objectRefs.current.set(newId, {
    //   id: newId,
    //   type: newType,
    //   mesh: React.createRef<THREE.Mesh>(),
    //   position: new THREE.Vector3(newPosition.x, newPosition.y, newPosition.z),
    //   radius: 1,
    // });

    return prevItems.filter(item => item.id !== idA && item.id !== idB).concat(newItem);
    });
  };


  useEffect(() => {
    if (selectedItems.length === 0) {
      // console.log("⚠️ `selectedItems` が空のため `useEffect()` をスキップ");
      return;
    }

    // console.log("📌 `selectedItems` 更新:", selectedItems);
    // console.log("📌 `objectRefs.current` 追加前:", [...objectRefs.current]); // 追加前の状態を出力

    let isUpdated = false;
    selectedItems.forEach(({ id, type }) => {
      // console.log(`🔍 検証: id=${id}, type=${type} のオブジェクトを追加予定`);
      if (!objectRefs.current.has(id)) {
        objectRefs.current.set(id, {
          id,
          type,
          mesh: React.createRef<THREE.Mesh>(),
          position: new THREE.Vector3(0, 0, 0), // ランダムな初期位置の予定 (後でカメラがいる近くに変更)
          radius: 1
        });
        isUpdated = true;
      }
    });

  if (isUpdated) {
      // console.log("📌 `objectsRef.current` 更新後:", [...objectRefs.current.entries()]);
    }
}, [selectedItems]);

// オブジェクトを描画
const renderObjects = useMemo(() => {
  // console.log("🔍 `useMemo` 実行 - objectRefs:", [...objectRefs.current.entries()]);

  return selectedItems.map(({ id, type}) => {
    const refData = objectRefs.current.get(id);
    // console.log("🔍 get(id) の結果:", refData);


    if (!refData) {
      // console.warn(`⚠️ 'refData' が未設定です。再レンダリングを待機 - id: ${id}`);
      return <mesh key={id} position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="gray" />
        </mesh>;
    }

    const props = {
      refData,
      position: [refData.position.x, refData.position.y, refData.position.z],
      onDragStateChange: setIsDragging,
      objectsRef: objectRefs.current,
      onCollide: handleCollision,
    };

    return type === "box" ? <DraggableBox key={id} {...props} /> :
    type === "sphere" ? <DraggableSphere key={id} {...props} /> :
    type === "cylinder" ? <DraggableCylinder key={id} {...props} />
    : null;
  });
},  [selectedItems, objectRefs.current.size]);


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

      </Canvas>

      {/* SelectFormに状態更新関数を渡す */}
      <SelectForm onAddItem={handleAddItem} />
    </div>
  );
};

export default Home;
