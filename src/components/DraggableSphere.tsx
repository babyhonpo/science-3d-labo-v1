import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

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
    const intersectPoint = raycaster.ray.intersectPlane(
      plane,
      new THREE.Vector3()
    );
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
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default DraggableBox;
