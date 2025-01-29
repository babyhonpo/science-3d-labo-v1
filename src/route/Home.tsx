import React from "react";
import { useState, useRef,useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Background from "../components/Backgroud";
import DraggableBox from "../components/DraggableBox";
// import DraggaSpreBox from "../components/DraggableSphere";
import SelectForm from "../forms/SelectForm";
import * as THREE from "three";

const Home = () => {
  const [isDragging, setIsDragging] = useState(false); // ドラッグ状態を管理
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // 表示中のアイテムを管理

  // すべてのオブジェクトのrefを格納するリスト
const objectRefs = useRef<{mesh: React.RefObject<THREE.Mesh>, position: THREE.Vector3, radius: number }[]>([]); // 衝突判定用のオブジェクトリスト

useEffect(() => {
  console.log("📌 `selectedItems` 更新:", selectedItems);
  console.log("📌 `objectRefs.current` 追加前:", [...objectRefs.current]); // 追加前の状態を出力
  while (objectRefs.current.length < selectedItems.length) {
    const newRef = {
      mesh: React.createRef<THREE.Mesh>(), // ✅ `createRef()` で作成
      position: new THREE.Vector3(),
      radius: 1
    };
    objectRefs.current.push(newRef);
  }
  console.log("📌 `objectsRef.current` 追加後:", [...objectRefs.current]); // 追加後の状態を出力
}, [selectedItems]);

  // 選択フォームからアイテムを追加する関数
  const handleAddItem = (item: string) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  };

  useEffect(() => {
  console.log("📌 `selectedItems` 更新:", selectedItems);
  console.log("📌 `objectsRef.current` 追加前:", [...objectRefs.current]);

  while (objectRefs.current.length < selectedItems.length) {
    objectRefs.current.push({
      mesh: React.createRef<THREE.Mesh>(),
      position: new THREE.Vector3(),
      radius: 1
    });
  }

  console.log("📌 `objectsRef.current` 追加後:", [...objectRefs.current]);
}, [selectedItems]);

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


        {selectedItems
          .filter((item) => item === "2") // "1" のみをフィルタリング
          .map((_, filteredIndex) => {

            console.log(`📌 Rendering DraggableBox - index: ${filteredIndex}`);
            console.log("📌 `objectsRef.current`:", [...objectRefs.current]);
            console.log("📌 `objectsRef.current.length`:", objectRefs.current.length);

            if (!objectRefs.current[filteredIndex]) {
              console.error("🚨 `objectsRef.current[filteredIndex]` が `undefined` です！", filteredIndex);
            } else {
              console.log("✅ `refData` として渡すデータ:", objectRefs.current[filteredIndex]);
            }


            return (
            <DraggableBox
              key={filteredIndex}
              position={[2, 2, 0]}
              onDragStateChange={setIsDragging}
              objectsRef={objectRefs.current}
              onCollide={() => console.log("球体が衝突しました！")}
              refData={objectRefs.current[filteredIndex]} // position と radius を渡す
            />
          );
        })}
      </Canvas>

      {/* SelectFormに状態更新関数を渡す */}
      <SelectForm onAddItem={handleAddItem} />
    </div>
  );
};

export default Home;
