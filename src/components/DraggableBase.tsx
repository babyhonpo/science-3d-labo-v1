import React, { useRef, useState, useEffect } from 'react';
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
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
    const prevPosition = useRef(new THREE.Vector3());
    const velocity = useRef(new THREE.Vector3());

    // 初期位置を設定
    useEffect(() => {
        if (groupRef.current) {
            groupRef.current.position.set(...position);
            refData.position.set(...position);
        }
    })

    // Three.jsのオブジェクトとrefData.positionを同期
    useFrame(() => {
        if (refData.mesh.current && groupRef.current) {
            groupRef.current.position.copy(refData.position);
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

    const handlePointerDown = () => {
        setIsDragging(true);
        onDragStateChange(true);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
        onDragStateChange(false);
    };

    //eslint-disable-next-line
    const handlePointerMove = (event: any) => {
        if (isDragging && groupRef.current) {
            const delta = new THREE.Vector3(event.movementX * 0.01, -event.movementY * 0.01, 0);
            groupRef.current.position.add(delta);  // ✅ Three.js の座標を更新
            refData.position.copy(groupRef.current.position);  // ✅ refData も更新
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
    const radiusA = objA.radius || 1; // ✅ デフォルト値
    const radiusB = objB.radius || 1;
    const distance = objA.position.distanceTo(objB.position);
    return distance < radiusA + radiusB;
};

export default DraggableBase;
