import React, { useRef, useState, useEffect } from 'react';
import * as THREE from "three";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { DraggableObject } from "../types/types";

type Props = {
    refData: DraggableObject;
    position: [number, number, number];
    onDragStateChange: (isDragging: boolean) => void;
    onCollide: () => void;
    objectsRef: Map<number, DraggableObject>;
    children: React.ReactNode;  // ボックスやスフィアをラップするため
};

const DraggableBase: React.FC<Props> = ({ refData, position, onDragStateChange, onCollide, objectsRef, children }) => {
    const groupRef = useRef<THREE.Group>(null!);
    const [isDragging, setIsDragging] = useState(false);
    const prevPosition = useRef(new THREE.Vector3()); // 慣性処理用
    const velocity = useRef(new THREE.Vector3());
    const dragOffset = useRef(new THREE.Vector3()); // マウスのクリック位置とオブジェクトのオフセットを保存

    // 初期位置を設定
    useEffect(() => {
        if (!groupRef.current) return;
        if (!isDragging) {
            groupRef.current.position.set(refData.position.x, refData.position.y, refData.position.z);
        }
    }, [refData.position, isDragging]);

    // Three.jsのオブジェクトとrefData.positionを同期
    useFrame(() => {
        if (groupRef.current) {
            if (!isDragging) {
                // オブジェクトがドラッグされていないときのみ、位置を同期
                refData.position.add(velocity.current.multiplyScalar(0.95)); // 減速
            } else {
                // 移動中は refData.position を Three.js のオブジェクトの位置と同期
                refData.position.copy(groupRef.current.position);
            }
        }

        // 衝突判定
        Array.from(objectsRef.values()).forEach((obj) => {
            if (obj.id !== refData.id && checkCollision(refData, obj)) {
                onCollide();
            }
        });

        // 慣性
        // if (!isDragging) {
        //     refData.position.add(velocity.current.multiplyScalar(0.95)); // だんだん減速
        // }

        // 次フレームのために速度を計算
        // velocity.current.subVectors(refData.position, prevPosition.current);
        // prevPosition.current.copy(refData.position);
    });


    const handlePointerDown = (event: ThreeEvent<PointerEvent> ) => {
        setIsDragging(true);
        onDragStateChange(true);

        if (groupRef.current) {
            // マウスのクリック位置とオブジェクトの現在位置の差分を計算
            const mousePos = new THREE.Vector3(event.point.x, event.point.y, event.point.z);
            dragOffset.current.subVectors(mousePos, groupRef.current.position);
        }
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        onDragStateChange(false);
    };

    //eslint-disable-next-line
    const handlePointerMove = (event: any) => {
        // `camera` の視点を考慮して動くようにする
        if (isDragging && groupRef.current) {
            const sensitivity = 0.8; // マウス感度の設定

            // `Three.js` の座標に基づいた相対移動
            const mousePos = new THREE.Vector3(event.point.x, event.point.y, event.point.z);
            const newPosition = new THREE.Vector3().subVectors(mousePos, dragOffset.current);


        // ワールド座標に変換
        groupRef.current.position.lerp(newPosition, sensitivity);
        refData.position.copy(groupRef.current.position);
        }
    };


    return (
        <group ref={groupRef}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
        >
            {children}
        </group>
    );
};


// 衝突判定関数
const checkCollision = (objA: DraggableObject, objB: DraggableObject): boolean => {
    const radiusA = objA.radius || 1; // デフォルト値
    const radiusB = objB.radius || 1;
    const distance = objA.position.distanceTo(objB.position);

    // z軸方向を考慮
    const dz = Math.abs(objA.position.z - objB.position.z);
    return distance < radiusA + radiusB && dz < radiusA + radiusB;
};

export default DraggableBase;
