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

  //es
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

  // **🎯 修正: Bounding Sphere で衝突検出**
  useFrame(() => {
    if (!boxRef.current) return;
    // 1️⃣ `boundingSphere` を取得（`geometry.computeBoundingSphere()` を毎フレーム実行）
    boxRef.current.geometry.computeBoundingSphere();
    const sphere1 = new THREE.Sphere(boxRef.current.position, boxRef.current.geometry.boundingSphere?.radius || 1);

    for (const objRef of objectsRef) {
      if (!objRef.current || objRef.current === boxRef.current) continue;

      // 2️⃣ 相手の `boundingSphere` も取得
      objRef.current.geometry.computeBoundingSphere();
      const sphere2 = new THREE.Sphere(objRef.current.position, objRef.current.geometry.boundingSphere?.radius || 1);

      // 3️⃣ `intersectsSphere()` を使用して衝突判定
      if (sphere1.intersectsSphere(sphere2)) {
        console.log("Sphere に衝突しました！");
        onCollide();
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
