import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame, ThreeEvent, useThree } from "@react-three/fiber";
import { DraggableObject } from "../types/types";
import { Vector3 } from "three";

type Props = {
  refData: DraggableObject;
  position: Vector3;
  onDragStateChange: (isDragging: boolean) => void;
  onCollide: (ids: string[]) => void;
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
  const intersectionPoint = useRef(new THREE.Vector3());
  const { camera, raycaster, mouse } = useThree();
  const sensitivity = 1.05; // マウス感度調整
  // const moveSpeed = 0.05; // 移動スピード調整

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

    const collidingIds: string[] = [];

    objectsRef.forEach((obj) => {
      if (obj.id !== refData.id && checkCollision(refData, obj)) {
        collidingIds.push(obj.id);
      }
    });

    if (collidingIds.length >= 1) {
      const allIds = [refData.id, ...collidingIds];

      console.log("💥 衝突検出:", allIds);

      onCollide(allIds);
    }
  });

  // **マウスが押された時の処理**
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setIsDragging(true);
    onDragStateChange(true);

    // マウスのクリック位置を取得
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // オブジェクトとの交差点を記録
    const intersects = raycaster.intersectObject(groupRef.current, true);
    if (intersects.length > 0) {
      intersectionPoint.current.copy(intersects[0].point);
    }
  };

  // **マウスドラッグで `x, y` 軸を移動**
  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDragging || !groupRef.current) return;

    // マウスの新しい位置を取得
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // カメラの視線方向を考慮した `仮想の平面` を作成
    const plane = new THREE.Plane();
    plane.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new THREE.Vector3()),
      intersectionPoint.current
    );

    // 平面との交差点を取得
    const newPosition = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, newPosition)) {
      const delta = newPosition.clone().sub(intersectionPoint.current);
      groupRef.current.position.add(delta.multiplyScalar(sensitivity));
      refData.position.copy(groupRef.current.position);

      // 次フレームの基準点を更新
      intersectionPoint.current.copy(newPosition);
    }
  };

  // **マウスホイールで `カメラの方向` に移動**
  const handleWheel = (event: ThreeEvent<WheelEvent>) => {
    if (!groupRef.current) return;

    const delta = event.deltaY * -0.02; // ホイール感度調整
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    // XZ 平面でのみ移動するように Y 軸の影響をカット
    cameraDirection.y = 0;
    cameraDirection.normalize().multiplyScalar(delta);

    // オブジェクトの移動
    groupRef.current.position.add(cameraDirection);
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
      onWheel={handleWheel} // マウスホイールのイベントを追加
    >
      {children}
    </group>
  );
};

// **衝突判定関数**
const checkCollision = (
  objA: DraggableObject,
  objB: DraggableObject
): boolean => {
  const radiusA = objA.radius || 1;
  const radiusB = objB.radius || 1;
  const distance = objA.position.distanceTo(objB.position);

  const dz = Math.abs(objA.position.z - objB.position.z);
  return distance < radiusA + radiusB && dz < radiusA + radiusB;
};

export default DraggableBase;
