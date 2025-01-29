import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";

type BoxProps = {
  position: [number, number, number];
  onDragStateChange: (isDragging: boolean) => void;
  onCollide: () => void;
  objectsRef: React.RefObject<THREE.Mesh>[]; // 衝突判定用のオブジェクトリスト
};

const DraggableBox: React.FC<BoxProps> = ({ position, onDragStateChange, onCollide, objectsRef }) => {
  const boxRef = useRef<THREE.Mesh>(null!);
  const { raycaster, mouse, camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [intersectionPoint, setIntersectionPoint] = useState(new THREE.Vector3());
  const sensitivity = 1.05;

  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    setIsDragging(true);
    onDragStateChange(true);

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(boxRef.current!);
    if (intersects.length > 0) {
      setIntersectionPoint(intersects[0].point.clone());
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    onDragStateChange(false);
  };

  const handlePointerMove = (event: any) => {
    if (!isDragging) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const plane = new THREE.Plane();
    plane.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new THREE.Vector3()),
      intersectionPoint
    );

    const newPosition = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, newPosition);

    if (newPosition) {
      const currentPosition = boxRef.current!.position;
      const delta = newPosition.clone().sub(intersectionPoint);
      currentPosition.add(delta.multiplyScalar(sensitivity));
      boxRef.current!.position.copy(currentPosition);
      setIntersectionPoint(newPosition.clone());
    }
  };

  // **🎯 修正: 位置と半径で衝突判定**
  useFrame(() => {
    if (!boxRef.current) return;

    const boxPosition = boxRef.current.position;
    const boxRadius = 0.5; // 1辺の長さが1なので半径は0.5

    for (const objRef of objectsRef) {
      if (!objRef.current || objRef.current === boxRef.current) continue;

      const otherPosition = objRef.current.position;
      const otherRadius = 0.5; // 1辺の長さが1なので半径は0.5

      // 2つの物体の中心間の距離を計算
      const distance = boxPosition.distanceTo(otherPosition);

      // 距離が2つの物体の半径の合計より小さい場合、衝突と判定
      if (distance < boxRadius + otherRadius) {
        console.log("衝突しました！");

        // 衝突時の処理
        onCollide();

        // 衝突時に色を変更
        boxRef.current.material.color.set(0xff0000); // 赤に変更
        objRef.current.material.color.set(0xff0000); // 赤に変更

        // 反発処理（オブジェクトを少し動かす）
        const delta = new THREE.Vector3();
        delta.subVectors(boxPosition, otherPosition);
        delta.normalize().multiplyScalar(0.1);
        boxRef.current.position.add(delta); // 少し反発
        objRef.current.position.sub(delta); // 相手を反発

        // 反発後の色を元に戻す（任意）
        setTimeout(() => {
          boxRef.current.material.color.set(0xffa500); // 元の色に戻す
          objRef.current.material.color.set(0xffa500); // 元の色に戻す
        }, 200);
      }
    }
  });

  return (
    <mesh
      ref={boxRef}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default DraggableBox;
