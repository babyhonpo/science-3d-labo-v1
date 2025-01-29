import React, { useRef, useState,useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";

type BoxProps = {
  position: [number, number, number];
  onDragStateChange: (isDragging: boolean) => void;
  onCollide: () => void;
  objectsRef: { mesh: React.RefObject<THREE.Mesh>; position: THREE.Vector3; radius: number }[]; // 衝突判定用のオブジェクトリスト
  refData: { mesh: React.MutableRefObject<THREE.Mesh | null>; position: THREE.Vector3; radius: number };
};

const DraggableBox: React.FC<BoxProps> = ({ position, onDragStateChange, onCollide, objectsRef, refData }) => {
  const boxRef = useRef<THREE.Mesh>(null!);
  const { raycaster, mouse, camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [intersectionPoint, setIntersectionPoint] = useState(new THREE.Vector3());
  const sensitivity = 1.05;

  // ✅ `boxRef.current` を `refData.mesh.current` にセット
  useEffect(() => {
    if (refData.mesh.current === null) {
      refData.mesh.current = boxRef.current; // ✅ `current` にセット
    }
  }, []);

  // ✅ `boundingSphere` がない場合に計算
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.geometry.computeBoundingSphere();
    }
  }, []);

    //eslint-disable-next-line
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

  // オブジェクトを動かしているコード
  //eslint-disable-next-line
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

  useFrame(() => {
    if (!boxRef.current) return;
    if (!refData.mesh.current) return;
  
    // ✅ `refData.position` に現在のオブジェクトの位置をコピー
    refData.position.copy(boxRef.current.position);
  
    // ✅ `boundingSphere` がない場合に `computeBoundingSphere()` を実行
    if (boxRef.current.geometry.boundingSphere) {
      boxRef.current.geometry.computeBoundingSphere();
    }

    refData.radius = boxRef.current.geometry.boundingSphere?.radius || 1;

    const sphere1 = new THREE.Sphere(refData.position, refData.radius);
  
    for (const obj of objectsRef) {
      if (!obj.mesh.current || obj.mesh.current === boxRef.current) continue;
  
      obj.position.copy(obj.mesh.current.position);
      obj.radius = obj.mesh.current.geometry.boundingSphere?.radius || 1;
  
      const sphere2 = new THREE.Sphere(obj.position, obj.radius);
  
      if (sphere1.intersectsSphere(sphere2)) {
        console.log("⚠️ 衝突検出！");
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
