import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ObjectType } from "../types/types";

type Propss = {
    onAddItem: (type: ObjectType, position: THREE.Vector3) => void;
    onAddItemToFront: (fn: (type: ObjectType) => void) => void;
}


export const SceneCanvasInner = ({ onAddItem, onAddItemToFront }: Propss) => {
    const { camera } = useThree();

    useEffect(() => {
        const addItemInFront = (type: ObjectType) => {
            const direction = new THREE.Vector3();
            camera.getWorldDirection(direction); // カメラの向きを取得

            const distance = 5;
            const spawnPosition = new THREE.Vector3()
            .copy(camera.position)
            .add(direction.multiplyScalar(distance));

            onAddItem(type, spawnPosition);
    };

    onAddItemToFront(addItemInFront);
    }, [camera, onAddItem, onAddItemToFront]);

    return null;
}