import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

type BoxProps = {
  position: [x: number, y: number, z: number];
  onDragStateChange: (isDragging: boolean) => void;
};
const DraggableBox: React.FC<BoxProps> = (props) => {
  const boxRef = useRef<THREE.Mesh>(null!);
  const { raycaster, mouse, camera } = useThree(); // Three.jsの基本ツールを取得
  const [isDragging, setIsDragging] = useState(false); // ドラッグ中かどうかの状態
  const [intersectionPoint, setIntersectionPoint] = useState(new THREE.Vector3()); // マウスクリック時の交点を記録
  const sensitivity = 1.05; // マウス感度の調整係数

  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    setIsDragging(true);
    props.onDragStateChange(true); // 親にドラッグ開始を通知
    console.log("Dragging started");

    // マウスクリック位置を計算
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // ボックスの交差点を計算
    const intersects = raycaster.intersectObject(boxRef.current!);
    if (intersects.length > 0) {
      setIntersectionPoint(intersects[0].point.clone()); // 初期交差点を記録
    }
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

    // カメラ方向の光線に沿った位置を計算
    const plane = new THREE.Plane(); // 任意の平面（カメラ視線基準）
    plane.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new THREE.Vector3()),
      intersectionPoint
    ); // 平面を視線方向で初期化

    const newPosition = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, newPosition); // 光線と平面の交点を計算

    if (newPosition) {
      const currentPosition = boxRef.current!.position;

  // `newPosition` をクローンして差分を計算
  const delta = newPosition.clone().sub(intersectionPoint);

  // 感度を適用して現在位置を更新
  currentPosition.add(delta.multiplyScalar(sensitivity));

  // ボックスの位置をコピー
  boxRef.current!.position.copy(currentPosition);

  // 次フレーム用に基準点を更新
  setIntersectionPoint(newPosition.clone());
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

export default DraggableBox;
