import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";
import Background from "../components/Backgroud";
import DraggableSphere from "../components/DraggableSphere";
import { DraggableObject, ObjectType } from "../types/types";
import { getCollisionResult } from "../utils/collisionRules";
import FreeCamera from "../components/FreeCamera";
import PeriodicTable from "../components/PeriodicTable";
import Button from "@mui/material/Button";
import { Box, Modal } from "@mui/material";
// import { useObjInfo } from "../hooks/useObjInfo";

const Home = () => {
  // すべてのオブジェクトのrefを格納するリスト
  const objectRefs = useRef<Map<string, DraggableObject>>(new Map());
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false); // ドラッグ状態を管理
  // const { objInfo, setObjInfo } = useObjInfo();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // アイテム追加ボタンがクリックされたときのオブジェクトを追加
  const handleAddItem = useCallback((type: ObjectType) => {
    const id = uuidv4();
    const newObj: DraggableObject = {
      id,
      objInfo: type, // ここで type を直接格納
      mesh: React.createRef<THREE.Mesh>(),
      position: new THREE.Vector3(),
      radius: 1,
    };

    objectRefs.current.set(id, newObj);
    setSelectedItems((prev) => [...prev, id]);
  }, []);

  const handleCollision = (idA: string, idB: string) => {
    const objA = objectRefs.current.get(idA);
    const objB = objectRefs.current.get(idB);

    if (!objA || !objB) return;

    // Ensure symbols are defined before proceeding
    const symbolA = objA.objInfo.symbol;
    const symbolB = objB.objInfo.symbol;
    if (!symbolA || !symbolB) return;

    const newType = getCollisionResult(symbolA, symbolB);
    if (newType === null) return;

    const newPosition = objA.position.clone().lerp(objB.position, 0.5); // ✅ 先に `position` を取得
    objectRefs.current.delete(idA);
    objectRefs.current.delete(idB);

    const newId = uuidv4();
    // **衝突した位置の中間地点に新しいアイテムを配置**

    const newObj: DraggableObject = {
      id: newId,
      objInfo: newType,
      mesh: React.createRef<THREE.Mesh>(),
      position: newPosition,
      radius: 1,
    };

    objectRefs.current.set(newId, newObj);
    setSelectedItems((prev) => [
      ...prev.filter((id) => id !== idA && id !== idB),
      newId,
    ]); // ✅ 配列順を明示
  };
  useEffect(() => {
    setSelectedItems(Array.from(objectRefs.current.keys())); // ✅ `objectRefs` を `selectedItems` に同期
  }, [objectRefs.current]);

  const renderObjects = useMemo(() => {
    return selectedItems.map((id) => {
      const refData = objectRefs.current.get(id);
      if (!refData) return null;

      return (
        <DraggableSphere
          key={id}
          refData={refData}
          position={refData.position}
          onDragStateChange={setIsDragging}
          objectsRef={objectRefs.current}
          onCollide={handleCollision}
          cameraRef={React.createRef<THREE.Camera>()}
          objInfo={refData.objInfo} // ここで refData の objInfo を正しく渡す
        />
      );
    });
  }, [selectedItems, objectRefs.current]);

  return (
    // 画面いっぱいにCanvasが表示されるようdivでラップしている
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
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
        {/* <ExplosionEffect position={new THREE.Vector3(0, 0, 0)} /> */}
        <FreeCamera isDragging={isDragging} /> {/* ✅ カメラ操作を追加 */}
      </Canvas>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          position: "absolute",
          top: "90%",
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            fontSize: "1.4rem",
          }}
        >
          周期表を開く
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={"70%"}
          margin={"auto"}
          sx={{
            position: "relative",
            top: "10%",
          }}
        >
          <PeriodicTable onAddItem={handleAddItem} />
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
