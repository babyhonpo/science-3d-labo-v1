import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame, ThreeEvent, useThree } from "@react-three/fiber";
import { DraggableObject } from "../types/types";

type Props = {
  refData: DraggableObject;
  position: [number, number, number];
  onDragStateChange: (isDragging: boolean) => void;
  onCollide: (idA: string, idB: string) => void;
  objectsRef: Map<string, DraggableObject>;
  children: React.ReactNode;
};

const DraggableBase: React.FC<Props> = ({
  refData,
  position,
  onDragStateChange,
  onCollide,
  objectsRef,
  children,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [isDragging, setIsDragging] = useState(false);
  const previousMousePos = useRef(new THREE.Vector2());
  const dragOffset = useRef(new THREE.Vector3());
  const { camera, raycaster, mouse } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;
    if (!isDragging) {
      groupRef.current.position.set(
        refData.position.x,
        refData.position.y,
        refData.position.z
      );
    }
  }, [refData.position, isDragging]);

  useFrame(() => {
    if (groupRef.current) {
      refData.position.copy(groupRef.current.position);
    }

    // 衝突判定
    Array.from(objectsRef.values()).forEach((obj) => {
      if (obj.id !== refData.id && checkCollision(refData, obj)) {
        onCollide(refData.id, obj.id);
      }
    });
  });

  // **マウスが押された時の処理**
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    setIsDragging(true);
    onDragStateChange(true);
    previousMousePos.current.set(event.clientX, event.clientY);

    if (groupRef.current) {
      const worldPosition = new THREE.Vector3();
      groupRef.current.getWorldPosition(worldPosition);
      dragOffset.current.subVectors(worldPosition, event.point);
    }
  };

  // **マウスドラッグで `x, y` 軸を移動**
  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDragging || !groupRef.current) return;

    // `Raycaster` を使ってスクリーン座標を `Three.js` のワールド座標に変換
    raycaster.setFromCamera(mouse, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersectPoint);

    const newPosition = new THREE.Vector3().subVectors(
      intersectPoint,
      dragOffset.current
    );

    groupRef.current.position.lerp(newPosition, 0.8);
    refData.position.copy(groupRef.current.position);
  };

  // **マウスホイールで `z軸` を移動**
  const handleWheel = (event: ThreeEvent<WheelEvent>) => {
    if (!groupRef.current) return;

    const deltaZ = event.deltaY * -0.01;
    groupRef.current.position.z += deltaZ;
    refData.position.copy(groupRef.current.position);
  };

  // **マウスボタンを離したら移動を終了**
  const handlePointerUp = () => {
    setIsDragging(false);
    onDragStateChange(false);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onWheel={handleWheel} // ✅ マウスホイールのイベントを追加
    >
      {children}
    </group>
  );
};

// **衝突判定関数**
const checkCollision = (objA: DraggableObject, objB: DraggableObject): boolean => {
  const radiusA = objA.radius || 1;
  const radiusB = objB.radius || 1;
  const distance = objA.position.distanceTo(objB.position);

  const dz = Math.abs(objA.position.z - objB.position.z);
  return distance < radiusA + radiusB && dz < radiusA + radiusB;
};

export default DraggableBase;
