import React from "react";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Background from "../components/Backgroud";
import DraggableBox from "../components/DraggableBox";
import DraggaSpreBox from "../components/DraggableSphere";
import SelectForm from "../forms/SelectForm";

const Home = () => {
  const [isDragging, setIsDragging] = useState(false); // ドラッグ状態を管理
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // 表示中のアイテムを管理

  const handleAddItem = (item: string) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  };

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

        {/* DraggableBoxを条件付きで表示 */}
        {selectedItems
          .filter((item) => item === "1") // "1" のみをフィルタリング
          .map((_, filteredIndex) => (
            <DraggaSpreBox
              key={filteredIndex} // フィルタ後のインデックスを使用
              position={[filteredIndex * 2, 0, 0]} // 位置を調整
              onDragStateChange={setIsDragging}
            />
          ))}

        {selectedItems
          .filter((item) => item === "2") // "1" のみをフィルタリング
          .map((_, filteredIndex) => (
            <DraggableBox
              key={filteredIndex}
              position={[filteredIndex * 2, 2, 0]}
              onDragStateChange={setIsDragging}
            />
          ))}
      </Canvas>

      {/* SelectFormに状態更新関数を渡す */}
      <SelectForm onAddItem={handleAddItem} />
    </div>
  );
};

export default Home;
