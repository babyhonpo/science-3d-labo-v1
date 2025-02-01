import React from "react";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Background from "../components/Backgroud";
import DraggableBox from "../components/DraggableBox";
import DraggableSphere from "../components/DraggableSphere";
import { DraggableObject, ObjectType } from "../types/types";
import SelectForm from "../forms/SelectForm";
import * as THREE from "three";

const Home = () => {
  const [isDragging, setIsDragging] = useState(false); // ドラッグ状態を管理
  const [selectedItems, setSelectedItems] = useState<
    { id: number; type: ObjectType }[]
  >([]); // 表示中のアイテムを管理
  // すべてのオブジェクトのrefを格納するリスト
  const objectRefs = useRef<Map<number, DraggableObject>>(new Map());

  // アイテム追加ボタンがクリックされたときのオブジェクトを追加
  const handleAddItem = useCallback((type: ObjectType) => {
    setSelectedItems((prevItems) => {
      const newItem = { id: prevItems.length + 1, type };
      const updatedItems = [...prevItems, newItem];

      // 追加後、即座にobjectRefs.currentを更新
      objectRefs.current.set(newItem.id, {
        id: newItem.id,
        type: newItem.type,
        mesh: React.createRef<THREE.Mesh>(),
        position: new THREE.Vector3(),
        radius: 1,
      });

      console.log(
        "✅ 追加されたオブジェクト:",
        objectRefs.current.get(newItem.id)
      );

      return updatedItems;
    });
  }, []);

  useEffect(() => {
    if (selectedItems.length === 0) {
      console.log("⚠️ `selectedItems` が空のため `useEffect()` をスキップ");
      return;
    }

    console.log("📌 `selectedItems` 更新:", selectedItems);
    console.log("📌 `objectRefs.current` 追加前:", [...objectRefs.current]); // 追加前の状態を出力

    let isUpdated = false;
    selectedItems.forEach(({ id, type }) => {
      console.log(`🔍 検証: id=${id}, type=${type} のオブジェクトを追加予定`);
      if (!objectRefs.current.has(id)) {
        objectRefs.current.set(id, {
          id,
          type,
          mesh: React.createRef<THREE.Mesh>(),
          position: new THREE.Vector3(0, 0, 0), // ランダムな初期位置の予定 (後でカメラがいる近くに変更)
          radius: 1,
        });
        isUpdated = true;
      }
    });

    if (isUpdated) {
      console.log("📌 `objectsRef.current` 更新後:", [
        ...objectRefs.current.entries(),
      ]);
    }
  }, [selectedItems]);

  // オブジェクトを描画
  const renderObjects = useMemo(() => {
    console.log("🔍 `useMemo` 実行 - objectRefs:", [
      ...objectRefs.current.entries(),
    ]);

    return selectedItems.map(({ id, type }) => {
      const refData = objectRefs.current.get(id);
      console.log("🔍 get(id) の結果:", refData);

      if (!refData) {
        console.warn(
          `⚠️ 'refData' が未設定です。再レンダリングを待機 - id: ${id}`
        );
        return null;
      }

      return type === "box" ? (
        <DraggableBox
          key={id}
          refData={refData}
          position={[
            refData.position.x,
            refData.position.y,
            refData.position.z,
          ]}
          onDragStateChange={setIsDragging}
          onCollide={() => console.log(`衝突検出: ${type} (ID: ${id})`)}
          objectsRef={objectRefs.current}
        />
      ) : (
        <DraggableSphere
          key={id}
          refData={refData}
          position={[
            refData.position.x,
            refData.position.y,
            refData.position.z,
          ]}
          onDragStateChange={setIsDragging}
          onCollide={() => console.log(`衝突検出: ${type} (ID: ${id})`)}
          objectsRef={objectRefs.current}
        />
      );
    });
  }, [selectedItems, objectRefs.current.size]);

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

        {/* DraggableBoxを条件付きで表示
        {selectedItems
          .filter((item) => item === "1") // "1" のみをフィルタリング
          .map((_, filteredIndex) => (
            <DraggaSpreBox
              key={filteredIndex} // フィルタ後のインデックスを使用
              position={[filteredIndex * 2, 0, 0]} // 位置を調整
              onDragStateChange={setIsDragging} onCollide={function (): void {
                throw new Error("Function not implemented.");
              } } objectsRef={[]}              // ref={ref}
              // objectsRef={objectRefs.current}
              // onCollide={() => console.log("カーソルに接触！")}
            />
          ))} */}

        {renderObjects}
      </Canvas>

      {/* SelectFormに状態更新関数を渡す */}
      <SelectForm onAddItem={handleAddItem} />
    </div>
  );
};

export default Home;
