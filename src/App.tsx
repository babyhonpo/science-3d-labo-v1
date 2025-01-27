import { useRef, useState,useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import React from "react";

import * as THREE from "three";
import { OrbitControls, Text } from "@react-three/drei";
// import BoxComponent from "./BoxComponent";
// import MouseControls from "./MouseControls";

const InputOnMesh: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isFocused) {
      if (event.key === "Backspace") {
        setInputText((prev) => prev.slice(0, -1)); // 文字を削除
      } else if (event.key.length === 1) {
        setInputText((prev) => prev + event.key); // 入力文字を追加
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused]);

  return (
    <mesh
      position={[0, -5, 0]}
      onPointerDown={() => setIsFocused(true)} // クリックでフォーカスを取得
      onPointerMissed={() => setIsFocused(false)} // クリックを外したらフォーカスを外す
    >
      <planeGeometry args={[3, 1]} />
      <meshStandardMaterial color={isFocused ? "lightblue" : "white"} />

      {/* テキストを表示 */}
      <Text
        color="black"
        fontSize={0.3}
        anchorX="left"
        anchorY="middle"
        position={[-1.4, 0, 0.1]}
      >
        {inputText || "クリックして入力"}
      </Text>
    </mesh>
  );
};

const FormOnMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas"); // DOMに直接作成する
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 背景を描画
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // テキストを描画
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("名前:", 10, 30);
    ctx.fillText("メール:", 10, 70);

    // ボックスを描画
    ctx.strokeStyle = "black";
    ctx.strokeRect(70, 10, 200, 30); // 名前入力エリア
    ctx.strokeRect(70, 50, 200, 30); // メール入力エリア

    // CanvasTextureを作成して状態に設定
    setTexture(new THREE.CanvasTexture(canvas));
  }, []);

  if (!texture) return null; // テクスチャが準備できるまで何も描画しない

  return (
    <mesh position={[0, 2, 0]}>
      {/* 平面にCanvasTextureを適用 */}
      <planeGeometry args={[3, 2]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const SignBoard: React.FC<{ position: [x: number, y: number, z: number]; text: string }> = ({
  position,
  text,
}) => {
  return (
    <group position={position}>
      {/* 看板の背景 */}
      <mesh>
        <planeGeometry args={[5, 1.5]} />
        <meshStandardMaterial color="brown" />
      </mesh>

      {/* 看板の文字 */}
      <Text
        position={[0, 0, 0.1]} // 少し前に出す
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

type GraphFieldProps = {
  data: { x: number; y: number; z?: number }[]; // データ形式を指定
};

const GraphField: React.FC<GraphFieldProps> = ({ data }) => {
  const graphRef = useRef<THREE.Group>(null!);

  // データをThree.jsの座標形式に変換
  const points: THREE.Vector3[] = data.map((point) =>
    new THREE.Vector3(point.x, point.y, point.z || 0) // zが未指定の場合は0をデフォルト
  );
  // ライン用のジオメトリを作成
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group ref={graphRef} position={[1, 1, 0]} rotation={[-Math.PI / 1, 0, 0]}>
      {/* グラフの背景としての平面 */}
      <mesh position={[3, 0, 0]}>
        <planeGeometry args={[7, 6]} />
        <meshStandardMaterial color="lightblue" side={THREE.DoubleSide} />
      </mesh>

      {/* グラフのライン */}
      <line>
        <bufferGeometry attach="geometry" {...lineGeometry} />
        <lineBasicMaterial attach="material" color="blue" />
      </line>

      {/* グラフの点 */}
      {points.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))}
    </group>
  );
};


type BoxProps = {
  position: [x: number, y: number, z: number];
  onDragStateChange: (isDragging: boolean) => void;
};
const DraggableBox: React.FC<BoxProps> = (props) => {
  const boxRef = useRef<THREE.Mesh>(null!);
  const { raycaster, mouse, camera, gl } = useThree(); // Three.jsの基本ツールを取得
  const [isDragging, setIsDragging] = useState(false); // ドラッグ中かどうかの状態
  const [offset, setOffset] = useState(new THREE.Vector3()); // ボックスの位置オフセット

  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    setIsDragging(true);
    props.onDragStateChange(true); // 親にドラッグ開始を通知
    console.log("Dragging started");

    // ボックスとカメラ前の平面の交差点を計算
    const intersects = raycaster.intersectObject(boxRef.current!);
    if (intersects.length > 0) {
      const intersectPoint = intersects[0].point;
      setOffset(intersectPoint.clone().sub(boxRef.current!.position));
    }
    // カメラ操作を無効化
    // gl.domElement.style.pointerEvents = "none"; // OrbitControlsを無効化
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    props.onDragStateChange(false); // 親にドラッグ終了を通知
    console.log("Dragging ended");
  };

  const handlePointerMove = (event: any) => {
    if (!isDragging) return;

    // マウス位置をThree.jsの座標系に変換
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // 平面と光線の交差点を計算
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = raycaster.ray.intersectPlane(plane, new THREE.Vector3());
    if (intersectPoint) {
      boxRef.current!.position.copy(intersectPoint.sub(offset)); // ボックスの位置を更新
    }
  };

  return (
    <mesh
      {...props}
      ref={boxRef}
      onPointerDown={handlePointerDown} // ドラッグ開始
      onPointerUp={handlePointerUp} // ドラッグ終了
      onPointerMove={handlePointerMove} // マウス移動で位置更新
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};


const Box: React.FC<BoxProps> = (props) => {
  const mesh = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => (mesh.current.rotation.x += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const Home = () => {

  const orbitRef = useRef<any>();
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
      {/* <Box position={[-1.2, 0, 0]} /> */}
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

      {/* 空 */}
      <mesh>
        <sphereGeometry args={[10000, 32, 32]} />
        <shaderMaterial
          attach="material"
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform float offset;
            uniform float exponent;
            varying vec2 vUv;

            void main() {
              float h = normalize(vUv.y + offset) * exponent;
              gl_FragColor = vec4(mix(bottomColor, topColor, h), 1.0);
            }
          `}
          uniforms={{
            topColor: { value: new THREE.Color(0x87ceeb) },
            bottomColor: { value: new THREE.Color(0xffffff) },
            offset: { value: 0.0 },
            exponent: { value: 0.6 },
          }}
          side={THREE.BackSide}
        />
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

      <InputOnMesh />

    </Canvas>

    {/* HTMLフォーム */}
    <form
        style={{
          position: "absolute",
          top: "80%",
          left: "20%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>フォーム入力</h2>
        <div style={{ marginBottom: "10px" }}>
          <label>
            名前:
            <input
              type="text"
              style={{
                marginLeft: "10px",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            メール:
            <input
              type="email"
              style={{
                marginLeft: "10px",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          送信
        </button>
      </form>
    
  </div>
);
};

export default Home;
