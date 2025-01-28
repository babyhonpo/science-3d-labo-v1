import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { OrbitControls } from "@react-three/drei";
// import BoxComponent from "./BoxComponent";
// import MouseControls from "./MouseControls";
import GraphField from "./components/GraphField";
import InputOnMesh from "./components/InputOnMesh";
import FormOnMesh from "./components/FormOnMesh";
import SignBoard from "./components/SignBoard";
import DraggableBox from "./components/DraggableBox";
import SimpleBox from "./components/SimpleBox";
import Background from "./components/Backgroud";
import HtmlForm from "./forms/HtmlForm";

const Home = () => {

  // const orbitRef = useRef<any>();
  const [isDragging, setIsDragging] = useState(false); // ドラッグ状態を管理

  // 折れ線グラフ用の任意のデータ
  const graphData = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 3, y: 3 },
    { x: 4, y: 0 },
    { x: 5, y: 2 },
    { x: 6, y: -3 },
  ];

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
      <SimpleBox position={[-1.2, 6, 0]} />
      {/* <Box position={[1.2, 0, 0]} /> */}

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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -190, 0]} receiveShadow>
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial color={0xc0c0c0} />
      </mesh>

      {/* 箱 */}
      {/* <BoxComponent /> */}

      {/* マウス制御 */}
      {/* <MouseControls /> */}

      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[0, 20, 20]}
        intensity={2}
        shadow-mapSize={[1024, 1024]}
      />

      {/* 看板 */}
      <SignBoard position={[5, 5, 0]} text="グラフ表示" />
      <SignBoard position={[5, -3, 0]} text="データ値に注意！" />

      {/* カメラ制御 */}
      <OrbitControls enabled={!isDragging} />
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[0, 20, 20]} intensity={2} />

      {/* ドラッグ可能なBox */}
      {/* <DraggableBox position={[-1, 0, 0]} onDragStateChange={setIsDragging} /> */}
      <DraggableBox position={[1, 0, 0]} onDragStateChange={setIsDragging} />

      {/* 任意のデータを渡して折れ線グラフを描画 */}
        <GraphField data={graphData} />

      {/* FormのMesh */}
      <FormOnMesh />

      {/* 背景 (しかし、作られてないので、作る必要あり) */}
      <Background />

      <InputOnMesh />

    </Canvas>

    <HtmlForm />

  </div>
);
};

export default Home;
